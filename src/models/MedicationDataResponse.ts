export class MedicationDataResponse {

    MedicationId: number;
    GenericName: string;
    MedicalName: string;


    constructor(init?: MedicationDataResponse) {
        Object.assign(this,init);
    }
}