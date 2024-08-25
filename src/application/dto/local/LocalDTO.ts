export class LocalDTO {
    constructor(
        public id: number,
        public country: string,
        public state: string,
        public city: string,
        public street: string,
        public zip_code: number,
        public number: number,
        public description: string,
        public groups_id: number,
        public created_at: string,
        public updated_at: string
    ) { }
}