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
export declare class VerifyTX {
    private _app;
    private options;
    private static instance;
    static getInstance(): VerifyTX;
    /**
     * View vob
     * @param id vob id
     */
    view(id: string): Promise<any>;
    /**
     * Get vobs
     * @param filter
     */
    vobs(filter: object | any): Promise<any>;
    update(id: string, data: object): Promise<any>;
    /**
     * Delete vob
     * @param id vob id
     */
    delete(id: string): Promise<any>;
    /**
     * Reverify Vob
     * @param id reverify vob
     */
    reverify(id: string): Promise<any>;
    /**
     * Request a new VOB
     * @param data VOB data
     */
    verify(data: object): Promise<any>;
    /**
     * View vob coverage history
     * @param id vob id
     */
    history(id: string): Promise<any>;
    /**
     * Available relations
     */
    relations(): Promise<any>;
    /**
     * Get available providers
     * @param search optional provider search
     */
    providers(search?: string): Promise<any>;
    /**
     * Authorize api requests
     */
    authorize(options: IOptions): Promise<IAuthorize>;
    /**
     * Refresh access token
     */
    refresh(): Promise<IAuthorize>;
    /**
     * Request wrapper
     * @param options Axos Request config
     */
    private _request;
}
export {};
