import type { User } from '@domain/entities/user.entity';

export interface IAuthService {
    generateToken(user: User): Promise<string>;
}
