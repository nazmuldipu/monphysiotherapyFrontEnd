export class Cashbook {
    constructor(
        public id?: number,
        public date?: Date,
        public explanation?: string,
        public ref?: number,
        public debit?: number,
        public credit?: number,
        public balance?: number,
 
        ) { }
}