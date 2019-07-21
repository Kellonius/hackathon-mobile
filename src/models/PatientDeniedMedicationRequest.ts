export class PatientDeniedMedicationRequest {
    ScriptId: string;
    Reason: string;

    constructor(init?: PatientDeniedMedicationRequest) {
        Object.assign(this,init);
    }
}