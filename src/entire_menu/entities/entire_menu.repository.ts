import { EntityRepository, Repository } from 'typeorm';
import { EntireMenu } from './entire_menu.entity';

@EntityRepository(EntireMenu)
export class EntireMenuRepository extends Repository<EntireMenu> { }