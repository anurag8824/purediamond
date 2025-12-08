"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackRoutes = void 0;
const express_1 = require("express");
const Icasino_1 = require("../controllers/Icasino");
class CallbackRoutes {
    constructor() {
        this.casCallBackController = new Icasino_1.CasCallbackController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // this.router.post('/get-balance', this.casCallBackController.getbalance)
        // this.router.post('/get-bet-request', this.casCallBackController.getBetrequest)
        // this.router.post('/get-win-request', this.casCallBackController.getCreditRequest)
        // callback 
        this.router.post('/get-balance', this.casCallBackController.getbalance);
        this.router.post('/get-bet-request', this.casCallBackController.getBetrequest);
        this.router.post('/get-rollback-request', this.casCallBackController.getrollback);
        this.router.post('/get-win-request', this.casCallBackController.getCreditRequest);
    }
}
exports.CallbackRoutes = CallbackRoutes;
//# sourceMappingURL=intcasino.js.map