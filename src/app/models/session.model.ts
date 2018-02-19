export class PSession {
    constructor(
        public id?: number,
        public date?: Date,
        public chiefComplain?: string,
        public sessionNumber?: number,
        public treatments?: string,
        public comments?: string,
        public sessionFee?: number,
    ) { }
}
