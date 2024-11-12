import { MySqlRepoFactory } from 'src/repository/factories';
import { IUserRepo } from 'src/repository/interfaces';
import { mysqlPool } from '../config/mysql.config';
import { BaseManager } from './base.manager';

class RepoManager extends BaseManager {
  public readonly userRepo: IUserRepo;

  constructor() {
    super('RepoManager');

    this.logger.info('MANAGER::INIT', 'REPOSITORY');

    this.userRepo = MySqlRepoFactory.getUserRepo(mysqlPool);

    this.logger.info('MANAGER::INITIALIZED', 'REPOSITORY');
  }
}

let repoManager = new RepoManager();

export default repoManager;
