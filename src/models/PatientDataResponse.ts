export class PatientDataResponse {
    firstName: string;
    lastName: string;
    email: string;
    Gender: String;
    DOB: string;

    constructor(init?: PatientDataResponse) {
        Object.assign(this,init);
    }
}