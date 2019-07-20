export class MedicationDataRequest {
    id: number;

    constructor(init?: MedicationDataRequest) {
        Object.assign(this,init);
    }
}