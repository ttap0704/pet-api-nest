import { EntityRepository, Repository } from 'typeorm';
import { UsersToken } from './users_token.entity';

@EntityRepository(UsersToken)
export class UsersTokenRepository extends Repository<UsersToken> { }