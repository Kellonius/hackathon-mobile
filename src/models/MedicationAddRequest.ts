export class MedicationAddRequest {
    userId: number;
    name: string;
    medName: string;
    dosage: string;
    time: string;

    constructor(init?: MedicationAddRequest) {
        Object.assign(this,init);
    }
}