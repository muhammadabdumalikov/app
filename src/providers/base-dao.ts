import { Knex } from 'knex';
import { KnexService } from './knex.service';
import ObjectID from 'bson-objectid';

export interface IBaseQuery<T> {
  getById(id: string, columns: string[]): Knex.QueryBuilder<T>;

  updateById(id: string, value: T): Knex.QueryBuilder<T>;

  insert(
    value: T,
    options: { returning?: string[]; generateId: boolean },
  ): Knex.QueryBuilder<T>;
}

export class KnexBaseRepo {
  knexService: KnexService;

  constructor() {
    this.knexService = new KnexService();
  }

  get knex() {
    return this.knexService.instance;
  }

  generateRecordId() {
    return new ObjectID().str;
  }
}

export class BaseRepo<T> extends KnexBaseRepo implements IBaseQuery<T> {
  tableName: string;

  constructor(_tableName: string) {
    super();
    this.tableName = _tableName;
  }

  get getTableName() {
    return this.tableName;
  }

  getById(id: string, columns: string[] = ['*']): Knex.QueryBuilder<T, any> {
    return this.knexService.instance
      .select(columns)
      .from(this.getTableName)
      .where('id', id)
      .first();
  }

  updateById(
    id: string,
    value: T,
    returning: string[] = ['*'],
  ): Knex.QueryBuilder<T, any> {
    return this.knexService
      .instance(this.getTableName)
      .update(value)
      .where('id', id)
      .returning(returning);
  }

  insert(
    value: T,
    options: { returning?: string[]; generateId: boolean },
  ): Knex.QueryBuilder<T, any> {
    const { generateId = true, returning = ['*'] } = options;

    if (generateId && !value['id']) {
      value['id'] = this.generateRecordId();
    }

    return this.knexService
      .instance(this.getTableName)
      .insert(value)
      .returning(returning);
  }
}
