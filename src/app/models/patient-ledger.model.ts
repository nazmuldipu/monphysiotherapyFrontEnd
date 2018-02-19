import { Patient } from "./patient.model";

export class PatientLedger {
    constructor(
        public id?: number,
        public date?: Date,
        public explanation?: string,
        public ref?: number,
        public debit?: number,
        public credit?: number,
        public balance?: number,
        public paid?: boolean,

        public patient?: Patient
        ) { }
}
