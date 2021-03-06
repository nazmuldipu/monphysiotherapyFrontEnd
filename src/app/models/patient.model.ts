export class Patient {
    constructor(
        public id?: number,
        public name?: string,
        public age?: string,
        public date?: Date,
        public phone?: string,
        public chiefComplain?: string,
        public pastHistory?: string,
        public pastMedicalHistory?: string,
        public onExaminaton?: string,
        public soiling?: boolean,
        public redness?: boolean,
        public tender?: boolean,
        public movement?: string,
        public rom?: string,
        public prescribeFee?: number,
        public sessionFee?: number,
        public balance?: number,
        public due?: number,
        public requiredTests?: string[],
        public treatments?: string[],
        public advices?: string[],
        public medications?: string[],
    ) { }
}
