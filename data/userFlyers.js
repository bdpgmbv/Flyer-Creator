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

let updateElement = async function updateElement(id, elementid, text, color, size) {
    if (!id) throw "You must provide an id to search for";
    if (!isValidNum(elementid) || elementid < 0 || elementid > 3) throw "You must provide an element id to update";
    isValidString(text);
    isValidString(color);
    isValidString(size);

    const flyersCollection = await flyers();

    const flyer = await get(id);

    let newElements = flyer.elements;
    newElements[elementid] = {
        text: text,
        color: color,
        size: size
    };

    return flyersCollection
        .updateOne({ _id: id }, { $set: { elements: newElements } })
        .then(function () {
            return get(id);
        });
}

let create = async function create(background, elements) {
    isValidString(background);
    if (!elements) throw "You must provide elements";
    const flyersCollection = await flyers();

    let newFlyer = {
        _id: uuid.v4(),
        background: background,
        elements: elements
    };

    const insertInfo = await flyersCollection.insertOne(newFlyer);
    if (insertInfo.insertedCount === 0) throw "Could not add flyer";

    const newId = insertInfo.insertedId;
    const flyer = await get(newId);
    return flyer;
}

module.exports = {
    get,
    updateElement,
    create
};