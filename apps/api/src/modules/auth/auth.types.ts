export interface RegisterDto {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface LoginDto {
    email: string;
    password: string;
}
