import { User } from 'domain/entities/user.entity';
import type { IUser } from 'domain/interfaces/user.interface';

class UserFactory {
    public static create(organizationData: IUser): User {
        return new User(organizationData);
    }

    public static recreate(organizationData: IUser): User {
        return new User(organizationData);
    }
}

export { UserFactory };
