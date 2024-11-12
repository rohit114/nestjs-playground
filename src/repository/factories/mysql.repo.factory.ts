import { Pool } from 'mysql2/promise';
import { UserMysqlRepo } from '../impls/user.repo.impl';
import { IUserRepo } from '../interfaces';

export class MySqlRepoFactory {
    static getUserRepo(pool: Pool): IUserRepo {
        return new UserMysqlRepo(pool);
    }
}
