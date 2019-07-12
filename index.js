"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class VerifyTX {
    constructor() {
        this._app = {};
    }
    static getInstance() {
        if (!VerifyTX.instance) {
            VerifyTX.instance = new VerifyTX();
        }
        return VerifyTX.instance;
    }
    /**
     * View vob
     * @param id vob id
     */
    view(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("GET", `${this.options.api}/vobs/view/${id}`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Get vobs
     * @param filter
     */
    vobs(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qs = Object.keys(filter).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(filter[k])}`).join('&');
                return yield this._request("GET", `${this.options.api}/vobs?${qs}`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("PUT", `${this.options.api}/vobs/update`, Object.assign({}, data, { _id: id }));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Delete vob
     * @param id vob id
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("DELETE", `${this.options.api}/vobs/delete/${id}`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Reverify Vob
     * @param id reverify vob
     */
    reverify(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("GET", `${this.options.api}/vobs/reverify/${id}`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Request a new VOB
     * @param data VOB data
     */
    verify(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("POST", `${this.options.api}/vobs/verify`, data);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * View vob coverage history
     * @param id vob id
     */
    history(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("GET", `${this.options.api}/vobs/history/${id}`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Available relations
     */
    relations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("GET", `${this.options.api}/vobs/relations`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Get available providers
     * @param search optional provider search
     */
    providers(search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._request("GET", `${this.options.api}/payers` + (search ? `/search/${search}` : ``));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Authorize api requests
     */
    authorize(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.options = options;
                this._app = yield this._request("POST", `${this.options.api}/oauth/token`, {
                    grant_type: "password",
                    username: this.options.username,
                    password: this.options.password,
                    client_id: this.options.client_id,
                });
                return this._app;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    /**
     * Refresh access token
     */
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._app = yield this._request("POST", `${this.options.api}/oauth/token`, {
                    grant_type: "refresh_token",
                    refresh_token: this._app.refresh_token,
                    client_secret: this.options.client_secret,
                    client_id: this.options.client_id,
                });
                return this._app;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    /**
     * Request wrapper
     * @param options Axos Request config
     */
    _request(method, url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.request({
                    headers: this._app.access_token ? {
                        "Authorization": `Bearer ${this._app.access_token}`,
                    } : {},
                    method: method,
                    url,
                    data
                });
                return response.data.message;
            }
            catch (error) {
                throw new Error(error.response.data.message.error || error.response.data.message || error);
            }
        });
    }
}
exports.VerifyTX = VerifyTX;
