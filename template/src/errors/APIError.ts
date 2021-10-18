export class APIError extends Error {
    statusCode: number;
    statusText: string;

    constructor(statusCode: number, statusText: string) {
        super();
        this.name = "APIError";
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}
