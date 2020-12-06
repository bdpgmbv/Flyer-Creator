const mongoCollections = require("./mongoCollections");
const users = mongoCollections.users;
const xss = require("xss");
const uuid = require("node-uuid");

function isValidString(inputString) {
    if (inputString === undefined) {
        throw "Input is not a valid string";
    }
    if (typeof (inputString) !== "string") {
        throw "Input is not a valid string";
    }
    return true;
}

let get = async function get(id) {
    if (!id) throw "You must provide an id to search for";

    const usersCollection = await users();

    const user = usersCollection.findOne({ _id: id });
    if (user === null) throw "No user exists with that id";

    return user;
}

let create = async function create(firstName, lastName, email, hashedPassword) {
    isValidString(firstName);
    isValidString(lastName);
    isValidString(email);
    isValidString(hashedPassword);

    let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (!pattern.test(email)) {
        throw "Invalid email. Register will fail";
    }

    const usersCollection = await users();
    let existingUser = await usersCollection.findOne({ email: email });
    if (existingUser !== null) throw "User already exist with the email";

    let newUser = {
        _id: uuid.v4(),
        firstName: xss(firstName),
        lastName: xss(lastName),
        email: email,
        hashedPassword: hashedPassword,
        flyers: []
    };

    const insertedInfo = await usersCollection.insertOne(newUser);
    if (insertedInfo.insertedCount === 0) throw "Could not add user";

    const insertedUserId = insertedInfo.insertedId;
    const insertedUser = await get(insertedUserId);
    return insertedUser;
}

let getByEmail = async function getByEmail(email) {
    isValidString(email);

    const usersCollection = await users();
    const user = await usersCollection.findOne({ email: email });

    if (user === null) throw "No user exist with that email";
    return user;
}

let addFlyer = async function addFlyer(id, flyerId){
    if (!id) throw "You must provide an id to add a flyer to";
    isValidString(flyerId);
    const usersCollection = await users();

    return usersCollection
      .updateOne({ _id: id }, { $addToSet: { flyers: flyerId } })
      .then(function() {
        return get(id);
      });
}

module.exports = {
    create,
    get,
    getByEmail,
    addFlyer
};