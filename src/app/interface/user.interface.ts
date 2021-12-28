export interface User {
    name: string,
    surname: string,
    id: number,
    role: 'user' | 'admin',
    email:string,
    address:string,
    country:string,
    city:string,
    cap:number,
    password: string
}