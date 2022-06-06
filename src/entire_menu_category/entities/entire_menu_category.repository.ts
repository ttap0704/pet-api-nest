import { EntityRepository, Repository } from 'typeorm';
import { EntireMenuCategory } from './entire_menu_category.entity';

@EntityRepository(EntireMenuCategory)
export class EntireMenuCategoryRepository extends Repository<EntireMenuCategory> { }