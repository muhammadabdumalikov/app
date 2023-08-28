import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';

@Injectable()
export class KnexService {
  instance: Knex;

  constructor() {
    this.instance = knex({
      client: 'postgresql',
      debug: false,
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: Number(process.env.PGPORT),
        application_name: `edo ${new Date().getTime()}`,
      },
      pool: {
        min: 1,
        max: Number(process.env.MAX_POOL) || 75,
      },
    });
  }
}
