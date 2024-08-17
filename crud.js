"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOne = exports.readAll = exports.create = void 0;
function create(client, 
// The document to be inserted
// If no document is provided, a default example document will be inserted
document
// to be removed
) {
    if (document === void 0) { document = {
        title: "Example Webpage",
        url: "https://example.com",
        content: "This is an example webpage content.",
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var database, collection, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 3, 5]);
                    // Connect the client to the server
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect the client to the server
                    _a.sent();
                    database = client.db("hackathon");
                    collection = database.collection("webpages");
                    return [4 /*yield*/, collection.insertOne(document)];
                case 2:
                    result = _a.sent();
                    console.log("A document was inserted with the _id: ".concat(result.insertedId));
                    return [2 /*return*/, result];
                case 3: 
                // Ensures that the client will close when you finish/error
                return [4 /*yield*/, client.close()];
                case 4:
                    // Ensures that the client will close when you finish/error
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function readAll(client) {
    return __awaiter(this, void 0, void 0, function () {
        var database, collection, allDocuments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 3, 5]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    database = client.db("hackathon");
                    collection = database.collection("webpages");
                    return [4 /*yield*/, collection.find({}).toArray()];
                case 2:
                    allDocuments = _a.sent();
                    return [2 /*return*/, allDocuments];
                case 3: return [4 /*yield*/, client.close()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.readAll = readAll;
function readOne(client, query) {
    if (query === void 0) { query = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var database, collection, oneDocument;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 3, 5]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    database = client.db("hackathon");
                    collection = database.collection("webpages");
                    return [4 /*yield*/, collection.findOne(query)];
                case 2:
                    oneDocument = _a.sent();
                    return [2 /*return*/, oneDocument];
                case 3: return [4 /*yield*/, client.close()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.readOne = readOne;
