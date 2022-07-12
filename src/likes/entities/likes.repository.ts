import { EntityRepository, Repository } from 'typeorm';
import { Likes } from './likes.entity';

@EntityRepository(Likes)
export class LikesRepository extends Repository<Likes> { }