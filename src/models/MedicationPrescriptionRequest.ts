export class MedicationPrescriptionRequest {
userId: number;
medicationId: number;

constructor(init?: MedicationPrescriptionRequest) {
    Object.assign(this, init);
}
}