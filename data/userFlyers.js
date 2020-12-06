const mongoCollections = require("./mongoCollections");
const flyers = mongoCollections.userFlyers;
const uuid = require("node-uuid");

function isValidString(string) {
    if (string === undefined) {
        throw "Input is not a valid string";
    }
    if (typeof (string) !== "string") {
        throw "Input is not a valid string";
    }
    return true;
}

let get = async function get(id) {
    if (!id) throw "You must provide an id to search for";
    const flyersCollection = await flyers();

    const flyer = await flyersCollection.findOne({ _id: id });
    if (flyer === null) throw "No user flyer exists with that id";

    return flyer;
}

module.exports = {
    get
};