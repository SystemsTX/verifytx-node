"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTX = void 0;
const axios_1 = __importDefault(require("axios"));
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
    async view(id) {
        try {
            return await this._request("GET", `${this.options.api}/vobs/${id}`);
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Get vobs
     * @param filter
     */
    async vobs(filter) {
        try {
            const qs = Object.keys(filter).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(filter[k])}`).join('&');
            return await this._request("GET", `${this.options.api}/vobs?${qs}`);
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async update(id, data) {
        try {
            return await this._request("PUT", `${this.options.api}/vobs/${id}`, data);
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Delete vob
     * @param id vob id
     */
    async delete(id) {
        try {
            return await this._request("DELETE", `${this.options.api}/vobs/delete/${id}`);
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Reverify Vob
     * @param id reverify vob
     */
    async reverify(id) {
        try {
            return await this._request("POST", `${this.options.api}/vobs/verify`, { _id: id });
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Request a new VOB
     * @param data VOB data
     */
    async verify(data) {
        try {
            return await this._request("POST", `${this.options.api}/vobs/verify`, data);
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * View vob coverage history
     * @param id vob id
     */
    async history(id) {
        try {
            return await this._request("GET", `${this.options.api}/vobs/${id}/history`);
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Available relations
     */
    async relations() {
        try {
            return await this._request("GET", `${this.options.api}/vobs/relations`);
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Get available providers
     * @param search optional provider search
     */
    async providers(search) {
        try {
            return await this._request("GET", `${this.options.api}/payers` + (search ? `/search/${search}` : ``));
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Authorize api requests
     */
    async authorize(options) {
        try {
            this.options = options;
            this._app = await this._request("POST", `${this.options.api}/oauth/token`, {
                grant_type: "password",
                username: this.options.username,
                password: this.options.password,
                client_id: this.options.client_id,
            });
            return this._app;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Refresh access token
     */
    async refresh() {
        try {
            this._app = await this._request("POST", `${this.options.api}/oauth/token`, {
                grant_type: "refresh_token",
                refresh_token: this._app.refresh_token,
                client_secret: this.options.client_secret,
                client_id: this.options.client_id,
            });
            return this._app;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    /**
     * Request wrapper
     * @param options Axos Request config
     */
    async _request(method, url, data) {
        try {
            const response = await axios_1.default.request({
                headers: this._app.access_token ? {
                    "Authorization": `Bearer ${this._app.access_token}`,
                } : {},
                method: method,
                url,
                data
            });
            return response.data;
        }
        catch (error) {
            throw new Error(error.response.data.error || error.response.data.message || error);
        }
    }
}
exports.VerifyTX = VerifyTX;
