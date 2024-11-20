import type { IUser } from '@domain/interfaces/user.interface';

export interface SignUpInputDTO {
    name: string;
    email: string;
    password: string;
}

export interface SignUpOutputDTO {
    user: IUser;
}
