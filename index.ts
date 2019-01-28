
import axios, { AxiosRequestConfig } from "axios";
interface IOptions {
	api?: string;
	grant_type?: string;
	username: string;
	password: string;
	client_id: string;
	client_secret: string;
}

interface IAuthorize {
	access_token?: string;
	refresh_token?: string;
	user?: string;
	account?: string;
}

export class VerifyTX {
	private _app: IAuthorize = {};
	private options: IOptions;
	private static instance: VerifyTX;

	public static getInstance() {
		if (!VerifyTX.instance) {
			VerifyTX.instance = new VerifyTX();
		}
		return VerifyTX.instance;
	}

	/**
	 * View vob
	 * @param id vob id
	 */
	public async view(id: string) {
		try {
			return await this._request("GET", `${this.options.api}/vobs/view/${id}`);
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Get vobs
	 * @param filter 
	 */
	public async vobs(filter: object | any) {
		try {
			const qs = Object.keys(filter).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(filter[k])}`).join('&');
			return await this._request("GET", `${this.options.api}/vobs?${qs}`);
		} catch (error) {
			throw new Error(error);
		}
	}


	public async update(id: string, data: object) {
		try {
			return await this._request("PUT", `${this.options.api}/vobs/update`, Object.assign({}, data, { _id: id }));
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Delete vob
	 * @param id vob id
	 */
	public async delete(id: string) {
		try {
			return await this._request("DELETE", `${this.options.api}/vobs/delete/${id}`);
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Reverify Vob
	 * @param id reverify vob
	 */
	public async reverify(id: string) {
		try {
			return await this._request("GET", `${this.options.api}/vobs/reverify/${id}`);
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Request a new VOB
	 * @param data VOB data
	 */
	public async verify(data: object) {
		try {
			return await this._request("POST", `${this.options.api}/vobs/verify`, data);
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * View vob coverage history
	 * @param id vob id
	 */
	public async history(id: string) {
		try {
			return await this._request("GET", `${this.options.api}/vobs/history/${id}`);
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Available relations
	 */
	public async relations() {
		try {
			return await this._request("GET", `${this.options.api}/vobs/relations`);
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Get available providers
	 * @param search optional provider search
	 */
	public async providers(search?: string) {
		try {
			return await this._request("GET", `${this.options.api}/payers` + search ? `/search/${search}` : ``);
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 * Authorize api requests
	 */
	public async authorize(options: IOptions) {
		try {
			this.options = options;
			this._app = await this._request("POST", `${this.options.api}/oauth/token`, {
				grant_type: "password",
				username: this.options.username,
				password: this.options.password,
				client_id: this.options.client_id,

			});

			return this._app;

		} catch (err) {
			throw new Error(err);
		}
	}
	/**
	 * Refresh access token
	 */
	public async refresh() {
		try {
			this._app = await this._request("POST", `${this.options.api}/oauth/token`, {
				grant_type: "refresh_token",
				refresh_token: this._app.refresh_token,
				client_secret: this.options.client_secret,
				client_id: this.options.client_id,

			});

			return this._app;

		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Request wrapper
	 * @param options Axos Request config
	 */
	private async _request(method: string, url: string, data?: any) {
		try {
			const response = await axios.request({
				headers: this._app.access_token ? {
					"Authorization": `Bearer ${this._app.access_token}`,
				} : {},
				method,
				url,
				data
			});
			return response.data.message;
		} catch (error) {
			throw new Error(error.response.data.message.error || error.response.data.message || error);
		}
	}
}
