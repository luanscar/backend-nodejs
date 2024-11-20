import type { IRepository } from '@shared/domain/repository.interface';
import type { User } from 'domain/entities/user.entity';

export interface IUserRepository<T> extends IRepository<T> {
    findByEmail(email: string): Promise<User | null>;
}
