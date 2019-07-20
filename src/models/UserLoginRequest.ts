export class UserLoginRequest {
    email: string;
    password: string;

    constructor(init?: UserLoginRequest) {
        Object.assign(this,init);
    }
}