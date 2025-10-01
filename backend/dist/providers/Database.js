"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const Locals_1 = __importDefault(require("./Locals"));
const Log_1 = __importDefault(require("../middlewares/Log"));
const recachegoose_1 = __importDefault(require("recachegoose"));
class Database {
    // Initialize your database pool
    static init() {
        const dsn = Locals_1.default.config().mongooseUrl + `?retryWrites=false&replicaSet=myReplicaSet`;
        ///const dsn = Locals.config().mongooseUrl
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            retryWrites: false,
            useCreateIndex: true,
        };
        mongoose_1.default.Promise = bluebird_1.default;
        //mongoose.set('useCreateIndex', true);
        this.redisCache();
        mongoose_1.default.connect(dsn, options, (error) => {
            // handle the error case
            if (error) {
                Log_1.default.info('Failed to connect to the Mongo server!!');
                console.log(error);
                throw error;
            }
            else {
                Log_1.default.info('connected to mongo server at: ' + dsn);
            }
        });
    }
}
exports.Database = Database;
Database.redisCache = () => {
    (0, recachegoose_1.default)(mongoose_1.default, {
        engine: 'redis',
        port: +process.env.REDIS_QUEUE_PORT,
        host: process.env.REDIS_QUEUE_HOST,
    });
};
Database.getInstance = () => {
    return mongoose_1.default.connection;
};
exports.default = mongoose_1.default;
//# sourceMappingURL=Database.js.map