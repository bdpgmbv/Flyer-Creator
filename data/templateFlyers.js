const mongoCollections = require("../data/mongoCollections");
const flyers = mongoCollections.templateFlyers;
const uuid = require("node-uuid");

function isValidString(input) {
    if (input === undefined) {
        throw "Input is not a valid string";
    }
    if (typeof (input) !== "string") {
        throw "Input is not a valid string";
    }
    return true;
}

let create = async function create(background, elements) {
    isValidString(background);
    if (elements.length != 4) {
        "You must provide an elements array and it must be of size 4";
    }

    const flyersCollection = await flyers();
    let newFlyer = {
        _id: uuid.v4(),
        background: background,
        elements: elements
    }

    const insertedInfo = await flyersCollection.insertOne(newFlyer);
    if (insertedInfo.insertedCount === 0) throw "Could not add Flyer";

    const newId = insertedInfo.insertedId;

    const insertedFlyer = await get(newId);
    return insertedFlyer
}

let get = async function get(id) {
    if(!id) throw "You must provide an id to search for";

    const flyersCollection = await flyers();
    const flyer = flyersCollection.findOne({_id:id});

    if(flyer === null) throw "No template flyer exist with that id";
    return flyer;
}

let getAll = async function getAll(){
    const flyersCollection = await flyers();
    const allFlyers = await flyersCollection.find({}).toArray();
    return allFlyers;
}

module.exports = {
    create,
    get,
    getAll
};


// result after the insertOne Operation
// Line 28 console.log(insertedInfo); 
// insertedInfo
// CommandResult {
//   result: { n: 1, ok: 1 },
//   connection: Connection {
//     _events: [Object: null prototype] {
//       error: [Function],
//       close: [Function],
//       timeout: [Function],
//       parseError: [Function],
//       message: [Function]
//     },
//     _eventsCount: 5,
//     _maxListeners: undefined,
//     id: 0,
//     options: {
//       host: 'localhost',
//       port: 27017,
//       size: 5,
//       minSize: 0,
//       connectionTimeout: 10000,
//       socketTimeout: 0,
//       keepAlive: true,
//       keepAliveInitialDelay: 120000,
//       noDelay: true,
//       ssl: false,
//       checkServerIdentity: true,
//       ca: null,
//       crl: null,
//       cert: null,
//       key: null,
//       passphrase: null,
//       rejectUnauthorized: true,
//       promoteLongs: true,
//       promoteValues: true,
//       promoteBuffers: false,
//       reconnect: true,
//       reconnectInterval: 1000,
//       reconnectTries: 30,
//       domainsEnabled: false,
//       legacyCompatMode: true,
//       metadata: [Object],
//       disconnectHandler: [Store],
//       cursorFactory: [Function: Cursor],
//       emitError: true,
//       monitorCommands: false,
//       promiseLibrary: [Function: Promise],
//       servers: [Array],
//       caseTranslate: true,
//       useNewUrlParser: true,
//       sslValidate: true,
//       dbName: 'test',
//       socketTimeoutMS: 0,
//       connectTimeoutMS: 10000,
//       retryWrites: true,
//       useRecoveryToken: true,
//       readPreference: [ReadPreference],
//       bson: BSON {}
//     },
//     logger: Logger { className: 'Connection' },
//     bson: BSON {},
//     tag: undefined,
//     maxBsonMessageSize: 67108864,
//     port: 27017,
//     host: 'localhost',
//     socketTimeout: 0,
//     keepAlive: true,
//     keepAliveInitialDelay: 0,
//     connectionTimeout: 10000,
//     responseOptions: { promoteLongs: true, promoteValues: true, promoteBuffers: false },
//     flushing: false,
//     queue: [],
//     writeStream: null,
//     destroyed: false,
//     timedOut: false,
//     hashedName: '29bafad3b32b11dc7ce934204952515ea5984b3c',
//     workItems: [],
//     socket: Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'localhost',
//       _readableState: [ReadableState],
//       readable: true,
//       _events: [Object: null prototype],
//       _eventsCount: 5,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       writable: true,
//       allowHalfOpen: false,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: null,
//       _server: null,
//       timeout: 0,
//       [Symbol(asyncId)]: 4,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(kSetNoDelay)]: true,
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: -1,
//         _idlePrev: null,
//         _idleNext: null,
//         _idleStart: 155,
//         _onTimeout: null,
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: true,
//         [Symbol(refed)]: false,
//         [Symbol(asyncId)]: 12,
//         [Symbol(triggerId)]: 10
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     buffer: null,
//     sizeOfMessage: 0,
//     bytesRead: 0,
//     stubBuffer: null,
//     ismaster: {
//       ismaster: true,
//       topologyVersion: [Object],
//       maxBsonObjectSize: 16777216,
//       maxMessageSizeBytes: 48000000,
//       maxWriteBatchSize: 100000,
//       localTime: 2020-12-04T01:30:03.438Z,
//       logicalSessionTimeoutMinutes: 30,
//       connectionId: 31,
//       minWireVersion: 0,
//       maxWireVersion: 9,
//       readOnly: false,
//       ok: 1
//     },
//     lastIsMasterMS: 4,
//     [Symbol(kCapture)]: false
//   },
//   message: BinMsg {
//     parsed: true,
//     raw: <Buffer 2d 00 00 00 07 04 00 00 02 00 00 00 dd 07 00 00 00 00 00 00 00 18 00 00 00 10 6e 00 01 00 00 00 01 6f 6b 00 00 00 00 00 00 00 f0 3f 00>,
//     data: <Buffer 00 00 00 00 00 18 00 00 00 10 6e 00 01 00 00 00 01 6f 6b 00 00 00 00 00 00 00 f0 3f 00>,
//     bson: BSON {},
//     opts: { promoteLongs: true, promoteValues: true, promoteBuffers: false },
//     length: 45,
//     requestId: 1031,
//     responseTo: 2,
//     opCode: 2013,
//     fromCompressed: undefined,
//     responseFlags: 0,
//     checksumPresent: false,
//     moreToCome: false,
//     exhaustAllowed: false,
//     promoteLongs: true,
//     promoteValues: true,
//     promoteBuffers: false,
//     documents: [ [Object] ],
//     index: 29,
//     hashedName: '29bafad3b32b11dc7ce934204952515ea5984b3c'
//   },
//   ops: [
//     {
//       _id: '44f7bad0-856a-4177-b90a-67a8e38faf17',
//       background: 'andrej-lisakov-679177-unsplash.jpg',
//       elements: [Array]
//     }
//   ],
//   insertedCount: 1,
//   insertedId: '44f7bad0-856a-4177-b90a-67a8e38faf17'
// }