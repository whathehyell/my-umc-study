export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class NotFoundError extends Error {
    errorCode = "NOT_FOUND";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class BadRequestError extends Error {
    errorCode = "BAD_REQUEST";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class ForbiddenError extends Error {
    errorCode = "F403";
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}