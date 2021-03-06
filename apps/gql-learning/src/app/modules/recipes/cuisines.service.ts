import { CuisineEntity, PaginatedCuisine } from '@gql-learning/db/entities/cuisine.entity';
import { paginate } from '@gql-learning/db/misc/paginate';
import { PaginationCursorArgs } from '@gql-learning/db/misc/pagination-args';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CuisinesService {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(CuisineEntity)
    private cuisineRepository: Repository<CuisineEntity>,
  ) {}

  async create(name: string): Promise<CuisineEntity> {
    const cuisine = this.cuisineRepository.create({ name });
    const insertionResults = await this.cuisineRepository.insert(cuisine);
    if (insertionResults) {
      this.logger.log(insertionResults);
    }
    return cuisine;
  }

  async findAll(findOptions?: FindManyOptions<CuisineEntity>): Promise<CuisineEntity[]> {
    return await this.cuisineRepository.find(findOptions);
  }

  async paginated(pagination: PaginationCursorArgs): Promise<PaginatedCuisine> {
    const query = this.cuisineRepository.createQueryBuilder().select();
    const output = await paginate(query, pagination);
    return output;
  }
}
