export class MedicationDataRequest {
    patientId: number;

    constructor(init?: MedicationDataRequest) {
        Object.assign(this,init);
    }
}