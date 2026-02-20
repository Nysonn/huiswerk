declare module 'connect-pg-simple' {
  import { RequestHandler } from 'express';
  import session from 'express-session';
  import { Pool } from 'pg';

  interface ConnectPgSimpleOptions {
    pool?: Pool;
    pgPromise?: any;
    conString?: string;
    conObject?: any;
    tableName?: string;
    schemaName?: string;
    ttl?: number;
    disableTouch?: boolean;
    createTableIfMissing?: boolean;
    pruneSessionInterval?: number | false;
    errorLog?: (...args: any[]) => void;
  }

  function connectPgSimple(
    session: typeof import('express-session')
  ): {
    new (options?: ConnectPgSimpleOptions): session.Store;
  };

  export = connectPgSimple;
}
