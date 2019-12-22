
export class ResponseDefinition {
    payload?: Object
    statusCode!: number;

    constructor(json?: Object, statusCode: number = 200) {
        this.statusCode = statusCode
        this.payload = json
    }

    isPayloadDefined() {
        return this.payload !== undefined;
    }
}

export class HttpError {
    errorObject!: Object
    statusCode!: number;

    constructor(errorObject: Object, statusCode: number = 400) {
        this.statusCode = statusCode
        this.errorObject = errorObject
    }
}