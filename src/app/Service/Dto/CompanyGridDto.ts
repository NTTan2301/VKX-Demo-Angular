export interface CompanyGridDto{
    id: number;
    name: string;
    adress: string;
    phone: string;
    email: string;
    image?: string; // vì API không trả về, nên để optional
}