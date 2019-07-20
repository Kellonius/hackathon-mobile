export class ScriptModel {
    ScriptId: number;
    MedicationId: number;
    MedicationTime: string;
    MedicationRoute: string;
    PrescribedBy: string;
    Phone: string;
    Email: string;
    Dosage: string;
    DateIssued: string;
    DateFilled: string;
    DatePickedUp: string;

    constructor(init?: ScriptModel) {
        Object.assign(this, init);
    }
}