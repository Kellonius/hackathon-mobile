export class PatientUpdateRequest {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    Gender: string;
    DOB: string;

    constructor(init?: PatientUpdateRequest) {
        Object.assign(this,init);
    }
}