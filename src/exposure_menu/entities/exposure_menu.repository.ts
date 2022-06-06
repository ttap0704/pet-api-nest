import { EntityRepository, Repository } from 'typeorm';
import { ExposureMenu } from './exposure_menu.entity';

@EntityRepository(ExposureMenu)
export class ExposureMenuRepository extends Repository<ExposureMenu> { }