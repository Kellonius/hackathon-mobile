import { ScriptModel } from "./ScriptModel";

export class PatientDataResponse {
    firstName: string;
    lastName: string;
    email: string;
    Gender: string;
    DOB: string;
    Scripts: ScriptModel[];

    constructor(init?: PatientDataResponse) {
        Object.assign(this,init);
    }
}