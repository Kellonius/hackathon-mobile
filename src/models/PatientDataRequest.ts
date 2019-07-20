export class PatientDataRequest {
    userEmail: string;

    constructor(init?: PatientDataRequest) {
        Object.assign(this,init);
    }
}