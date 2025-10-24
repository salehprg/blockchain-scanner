
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model BlockchainConfigs
 * 
 */
export type BlockchainConfigs = $Result.DefaultSelection<Prisma.$BlockchainConfigsPayload>
/**
 * Model BlockchainContracts
 * 
 */
export type BlockchainContracts = $Result.DefaultSelection<Prisma.$BlockchainContractsPayload>
/**
 * Model NFTOwners
 * 
 */
export type NFTOwners = $Result.DefaultSelection<Prisma.$NFTOwnersPayload>
/**
 * Model ContractLogs
 * 
 */
export type ContractLogs = $Result.DefaultSelection<Prisma.$ContractLogsPayload>
/**
 * Model NFTs
 * 
 */
export type NFTs = $Result.DefaultSelection<Prisma.$NFTsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more BlockchainConfigs
 * const blockchainConfigs = await prisma.blockchainConfigs.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more BlockchainConfigs
   * const blockchainConfigs = await prisma.blockchainConfigs.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.blockchainConfigs`: Exposes CRUD operations for the **BlockchainConfigs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlockchainConfigs
    * const blockchainConfigs = await prisma.blockchainConfigs.findMany()
    * ```
    */
  get blockchainConfigs(): Prisma.BlockchainConfigsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blockchainContracts`: Exposes CRUD operations for the **BlockchainContracts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlockchainContracts
    * const blockchainContracts = await prisma.blockchainContracts.findMany()
    * ```
    */
  get blockchainContracts(): Prisma.BlockchainContractsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nFTOwners`: Exposes CRUD operations for the **NFTOwners** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NFTOwners
    * const nFTOwners = await prisma.nFTOwners.findMany()
    * ```
    */
  get nFTOwners(): Prisma.NFTOwnersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contractLogs`: Exposes CRUD operations for the **ContractLogs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractLogs
    * const contractLogs = await prisma.contractLogs.findMany()
    * ```
    */
  get contractLogs(): Prisma.ContractLogsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nFTs`: Exposes CRUD operations for the **NFTs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NFTs
    * const nFTs = await prisma.nFTs.findMany()
    * ```
    */
  get nFTs(): Prisma.NFTsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    BlockchainConfigs: 'BlockchainConfigs',
    BlockchainContracts: 'BlockchainContracts',
    NFTOwners: 'NFTOwners',
    ContractLogs: 'ContractLogs',
    NFTs: 'NFTs'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "blockchainConfigs" | "blockchainContracts" | "nFTOwners" | "contractLogs" | "nFTs"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      BlockchainConfigs: {
        payload: Prisma.$BlockchainConfigsPayload<ExtArgs>
        fields: Prisma.BlockchainConfigsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockchainConfigsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockchainConfigsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>
          }
          findFirst: {
            args: Prisma.BlockchainConfigsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockchainConfigsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>
          }
          findMany: {
            args: Prisma.BlockchainConfigsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>[]
          }
          create: {
            args: Prisma.BlockchainConfigsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>
          }
          createMany: {
            args: Prisma.BlockchainConfigsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockchainConfigsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>[]
          }
          delete: {
            args: Prisma.BlockchainConfigsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>
          }
          update: {
            args: Prisma.BlockchainConfigsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>
          }
          deleteMany: {
            args: Prisma.BlockchainConfigsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockchainConfigsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlockchainConfigsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>[]
          }
          upsert: {
            args: Prisma.BlockchainConfigsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainConfigsPayload>
          }
          aggregate: {
            args: Prisma.BlockchainConfigsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlockchainConfigs>
          }
          groupBy: {
            args: Prisma.BlockchainConfigsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockchainConfigsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockchainConfigsCountArgs<ExtArgs>
            result: $Utils.Optional<BlockchainConfigsCountAggregateOutputType> | number
          }
        }
      }
      BlockchainContracts: {
        payload: Prisma.$BlockchainContractsPayload<ExtArgs>
        fields: Prisma.BlockchainContractsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockchainContractsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockchainContractsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>
          }
          findFirst: {
            args: Prisma.BlockchainContractsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockchainContractsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>
          }
          findMany: {
            args: Prisma.BlockchainContractsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>[]
          }
          create: {
            args: Prisma.BlockchainContractsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>
          }
          createMany: {
            args: Prisma.BlockchainContractsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockchainContractsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>[]
          }
          delete: {
            args: Prisma.BlockchainContractsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>
          }
          update: {
            args: Prisma.BlockchainContractsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>
          }
          deleteMany: {
            args: Prisma.BlockchainContractsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockchainContractsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlockchainContractsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>[]
          }
          upsert: {
            args: Prisma.BlockchainContractsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockchainContractsPayload>
          }
          aggregate: {
            args: Prisma.BlockchainContractsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlockchainContracts>
          }
          groupBy: {
            args: Prisma.BlockchainContractsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockchainContractsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockchainContractsCountArgs<ExtArgs>
            result: $Utils.Optional<BlockchainContractsCountAggregateOutputType> | number
          }
        }
      }
      NFTOwners: {
        payload: Prisma.$NFTOwnersPayload<ExtArgs>
        fields: Prisma.NFTOwnersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NFTOwnersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NFTOwnersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>
          }
          findFirst: {
            args: Prisma.NFTOwnersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NFTOwnersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>
          }
          findMany: {
            args: Prisma.NFTOwnersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>[]
          }
          create: {
            args: Prisma.NFTOwnersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>
          }
          createMany: {
            args: Prisma.NFTOwnersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NFTOwnersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>[]
          }
          delete: {
            args: Prisma.NFTOwnersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>
          }
          update: {
            args: Prisma.NFTOwnersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>
          }
          deleteMany: {
            args: Prisma.NFTOwnersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NFTOwnersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NFTOwnersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>[]
          }
          upsert: {
            args: Prisma.NFTOwnersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTOwnersPayload>
          }
          aggregate: {
            args: Prisma.NFTOwnersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNFTOwners>
          }
          groupBy: {
            args: Prisma.NFTOwnersGroupByArgs<ExtArgs>
            result: $Utils.Optional<NFTOwnersGroupByOutputType>[]
          }
          count: {
            args: Prisma.NFTOwnersCountArgs<ExtArgs>
            result: $Utils.Optional<NFTOwnersCountAggregateOutputType> | number
          }
        }
      }
      ContractLogs: {
        payload: Prisma.$ContractLogsPayload<ExtArgs>
        fields: Prisma.ContractLogsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractLogsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractLogsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>
          }
          findFirst: {
            args: Prisma.ContractLogsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractLogsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>
          }
          findMany: {
            args: Prisma.ContractLogsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>[]
          }
          create: {
            args: Prisma.ContractLogsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>
          }
          createMany: {
            args: Prisma.ContractLogsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractLogsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>[]
          }
          delete: {
            args: Prisma.ContractLogsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>
          }
          update: {
            args: Prisma.ContractLogsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>
          }
          deleteMany: {
            args: Prisma.ContractLogsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractLogsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContractLogsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>[]
          }
          upsert: {
            args: Prisma.ContractLogsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractLogsPayload>
          }
          aggregate: {
            args: Prisma.ContractLogsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractLogs>
          }
          groupBy: {
            args: Prisma.ContractLogsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractLogsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractLogsCountArgs<ExtArgs>
            result: $Utils.Optional<ContractLogsCountAggregateOutputType> | number
          }
        }
      }
      NFTs: {
        payload: Prisma.$NFTsPayload<ExtArgs>
        fields: Prisma.NFTsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NFTsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NFTsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>
          }
          findFirst: {
            args: Prisma.NFTsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NFTsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>
          }
          findMany: {
            args: Prisma.NFTsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>[]
          }
          create: {
            args: Prisma.NFTsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>
          }
          createMany: {
            args: Prisma.NFTsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NFTsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>[]
          }
          delete: {
            args: Prisma.NFTsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>
          }
          update: {
            args: Prisma.NFTsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>
          }
          deleteMany: {
            args: Prisma.NFTsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NFTsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NFTsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>[]
          }
          upsert: {
            args: Prisma.NFTsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NFTsPayload>
          }
          aggregate: {
            args: Prisma.NFTsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNFTs>
          }
          groupBy: {
            args: Prisma.NFTsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NFTsGroupByOutputType>[]
          }
          count: {
            args: Prisma.NFTsCountArgs<ExtArgs>
            result: $Utils.Optional<NFTsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    blockchainConfigs?: BlockchainConfigsOmit
    blockchainContracts?: BlockchainContractsOmit
    nFTOwners?: NFTOwnersOmit
    contractLogs?: ContractLogsOmit
    nFTs?: NFTsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type NFTsCountOutputType
   */

  export type NFTsCountOutputType = {
    NFTOwners: number
  }

  export type NFTsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    NFTOwners?: boolean | NFTsCountOutputTypeCountNFTOwnersArgs
  }

  // Custom InputTypes
  /**
   * NFTsCountOutputType without action
   */
  export type NFTsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTsCountOutputType
     */
    select?: NFTsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NFTsCountOutputType without action
   */
  export type NFTsCountOutputTypeCountNFTOwnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NFTOwnersWhereInput
  }


  /**
   * Models
   */

  /**
   * Model BlockchainConfigs
   */

  export type AggregateBlockchainConfigs = {
    _count: BlockchainConfigsCountAggregateOutputType | null
    _avg: BlockchainConfigsAvgAggregateOutputType | null
    _sum: BlockchainConfigsSumAggregateOutputType | null
    _min: BlockchainConfigsMinAggregateOutputType | null
    _max: BlockchainConfigsMaxAggregateOutputType | null
  }

  export type BlockchainConfigsAvgAggregateOutputType = {
    chainId: number | null
  }

  export type BlockchainConfigsSumAggregateOutputType = {
    chainId: number | null
  }

  export type BlockchainConfigsMinAggregateOutputType = {
    id: string | null
    chainId: number | null
    rpcUrlBase: string | null
    rpcUrlAlter: string | null
  }

  export type BlockchainConfigsMaxAggregateOutputType = {
    id: string | null
    chainId: number | null
    rpcUrlBase: string | null
    rpcUrlAlter: string | null
  }

  export type BlockchainConfigsCountAggregateOutputType = {
    id: number
    chainId: number
    rpcUrlBase: number
    rpcUrlAlter: number
    _all: number
  }


  export type BlockchainConfigsAvgAggregateInputType = {
    chainId?: true
  }

  export type BlockchainConfigsSumAggregateInputType = {
    chainId?: true
  }

  export type BlockchainConfigsMinAggregateInputType = {
    id?: true
    chainId?: true
    rpcUrlBase?: true
    rpcUrlAlter?: true
  }

  export type BlockchainConfigsMaxAggregateInputType = {
    id?: true
    chainId?: true
    rpcUrlBase?: true
    rpcUrlAlter?: true
  }

  export type BlockchainConfigsCountAggregateInputType = {
    id?: true
    chainId?: true
    rpcUrlBase?: true
    rpcUrlAlter?: true
    _all?: true
  }

  export type BlockchainConfigsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockchainConfigs to aggregate.
     */
    where?: BlockchainConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainConfigs to fetch.
     */
    orderBy?: BlockchainConfigsOrderByWithRelationInput | BlockchainConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockchainConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlockchainConfigs
    **/
    _count?: true | BlockchainConfigsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockchainConfigsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockchainConfigsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockchainConfigsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockchainConfigsMaxAggregateInputType
  }

  export type GetBlockchainConfigsAggregateType<T extends BlockchainConfigsAggregateArgs> = {
        [P in keyof T & keyof AggregateBlockchainConfigs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlockchainConfigs[P]>
      : GetScalarType<T[P], AggregateBlockchainConfigs[P]>
  }




  export type BlockchainConfigsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockchainConfigsWhereInput
    orderBy?: BlockchainConfigsOrderByWithAggregationInput | BlockchainConfigsOrderByWithAggregationInput[]
    by: BlockchainConfigsScalarFieldEnum[] | BlockchainConfigsScalarFieldEnum
    having?: BlockchainConfigsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockchainConfigsCountAggregateInputType | true
    _avg?: BlockchainConfigsAvgAggregateInputType
    _sum?: BlockchainConfigsSumAggregateInputType
    _min?: BlockchainConfigsMinAggregateInputType
    _max?: BlockchainConfigsMaxAggregateInputType
  }

  export type BlockchainConfigsGroupByOutputType = {
    id: string
    chainId: number
    rpcUrlBase: string
    rpcUrlAlter: string | null
    _count: BlockchainConfigsCountAggregateOutputType | null
    _avg: BlockchainConfigsAvgAggregateOutputType | null
    _sum: BlockchainConfigsSumAggregateOutputType | null
    _min: BlockchainConfigsMinAggregateOutputType | null
    _max: BlockchainConfigsMaxAggregateOutputType | null
  }

  type GetBlockchainConfigsGroupByPayload<T extends BlockchainConfigsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockchainConfigsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockchainConfigsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockchainConfigsGroupByOutputType[P]>
            : GetScalarType<T[P], BlockchainConfigsGroupByOutputType[P]>
        }
      >
    >


  export type BlockchainConfigsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chainId?: boolean
    rpcUrlBase?: boolean
    rpcUrlAlter?: boolean
  }, ExtArgs["result"]["blockchainConfigs"]>

  export type BlockchainConfigsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chainId?: boolean
    rpcUrlBase?: boolean
    rpcUrlAlter?: boolean
  }, ExtArgs["result"]["blockchainConfigs"]>

  export type BlockchainConfigsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chainId?: boolean
    rpcUrlBase?: boolean
    rpcUrlAlter?: boolean
  }, ExtArgs["result"]["blockchainConfigs"]>

  export type BlockchainConfigsSelectScalar = {
    id?: boolean
    chainId?: boolean
    rpcUrlBase?: boolean
    rpcUrlAlter?: boolean
  }

  export type BlockchainConfigsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chainId" | "rpcUrlBase" | "rpcUrlAlter", ExtArgs["result"]["blockchainConfigs"]>

  export type $BlockchainConfigsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlockchainConfigs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chainId: number
      rpcUrlBase: string
      rpcUrlAlter: string | null
    }, ExtArgs["result"]["blockchainConfigs"]>
    composites: {}
  }

  type BlockchainConfigsGetPayload<S extends boolean | null | undefined | BlockchainConfigsDefaultArgs> = $Result.GetResult<Prisma.$BlockchainConfigsPayload, S>

  type BlockchainConfigsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlockchainConfigsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlockchainConfigsCountAggregateInputType | true
    }

  export interface BlockchainConfigsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlockchainConfigs'], meta: { name: 'BlockchainConfigs' } }
    /**
     * Find zero or one BlockchainConfigs that matches the filter.
     * @param {BlockchainConfigsFindUniqueArgs} args - Arguments to find a BlockchainConfigs
     * @example
     * // Get one BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockchainConfigsFindUniqueArgs>(args: SelectSubset<T, BlockchainConfigsFindUniqueArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlockchainConfigs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlockchainConfigsFindUniqueOrThrowArgs} args - Arguments to find a BlockchainConfigs
     * @example
     * // Get one BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockchainConfigsFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockchainConfigsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlockchainConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainConfigsFindFirstArgs} args - Arguments to find a BlockchainConfigs
     * @example
     * // Get one BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockchainConfigsFindFirstArgs>(args?: SelectSubset<T, BlockchainConfigsFindFirstArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlockchainConfigs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainConfigsFindFirstOrThrowArgs} args - Arguments to find a BlockchainConfigs
     * @example
     * // Get one BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockchainConfigsFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockchainConfigsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlockchainConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainConfigsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.findMany()
     * 
     * // Get first 10 BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockchainConfigsWithIdOnly = await prisma.blockchainConfigs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlockchainConfigsFindManyArgs>(args?: SelectSubset<T, BlockchainConfigsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlockchainConfigs.
     * @param {BlockchainConfigsCreateArgs} args - Arguments to create a BlockchainConfigs.
     * @example
     * // Create one BlockchainConfigs
     * const BlockchainConfigs = await prisma.blockchainConfigs.create({
     *   data: {
     *     // ... data to create a BlockchainConfigs
     *   }
     * })
     * 
     */
    create<T extends BlockchainConfigsCreateArgs>(args: SelectSubset<T, BlockchainConfigsCreateArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlockchainConfigs.
     * @param {BlockchainConfigsCreateManyArgs} args - Arguments to create many BlockchainConfigs.
     * @example
     * // Create many BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockchainConfigsCreateManyArgs>(args?: SelectSubset<T, BlockchainConfigsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlockchainConfigs and returns the data saved in the database.
     * @param {BlockchainConfigsCreateManyAndReturnArgs} args - Arguments to create many BlockchainConfigs.
     * @example
     * // Create many BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlockchainConfigs and only return the `id`
     * const blockchainConfigsWithIdOnly = await prisma.blockchainConfigs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockchainConfigsCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockchainConfigsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlockchainConfigs.
     * @param {BlockchainConfigsDeleteArgs} args - Arguments to delete one BlockchainConfigs.
     * @example
     * // Delete one BlockchainConfigs
     * const BlockchainConfigs = await prisma.blockchainConfigs.delete({
     *   where: {
     *     // ... filter to delete one BlockchainConfigs
     *   }
     * })
     * 
     */
    delete<T extends BlockchainConfigsDeleteArgs>(args: SelectSubset<T, BlockchainConfigsDeleteArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlockchainConfigs.
     * @param {BlockchainConfigsUpdateArgs} args - Arguments to update one BlockchainConfigs.
     * @example
     * // Update one BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockchainConfigsUpdateArgs>(args: SelectSubset<T, BlockchainConfigsUpdateArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlockchainConfigs.
     * @param {BlockchainConfigsDeleteManyArgs} args - Arguments to filter BlockchainConfigs to delete.
     * @example
     * // Delete a few BlockchainConfigs
     * const { count } = await prisma.blockchainConfigs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockchainConfigsDeleteManyArgs>(args?: SelectSubset<T, BlockchainConfigsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockchainConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainConfigsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockchainConfigsUpdateManyArgs>(args: SelectSubset<T, BlockchainConfigsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockchainConfigs and returns the data updated in the database.
     * @param {BlockchainConfigsUpdateManyAndReturnArgs} args - Arguments to update many BlockchainConfigs.
     * @example
     * // Update many BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlockchainConfigs and only return the `id`
     * const blockchainConfigsWithIdOnly = await prisma.blockchainConfigs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlockchainConfigsUpdateManyAndReturnArgs>(args: SelectSubset<T, BlockchainConfigsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlockchainConfigs.
     * @param {BlockchainConfigsUpsertArgs} args - Arguments to update or create a BlockchainConfigs.
     * @example
     * // Update or create a BlockchainConfigs
     * const blockchainConfigs = await prisma.blockchainConfigs.upsert({
     *   create: {
     *     // ... data to create a BlockchainConfigs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlockchainConfigs we want to update
     *   }
     * })
     */
    upsert<T extends BlockchainConfigsUpsertArgs>(args: SelectSubset<T, BlockchainConfigsUpsertArgs<ExtArgs>>): Prisma__BlockchainConfigsClient<$Result.GetResult<Prisma.$BlockchainConfigsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlockchainConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainConfigsCountArgs} args - Arguments to filter BlockchainConfigs to count.
     * @example
     * // Count the number of BlockchainConfigs
     * const count = await prisma.blockchainConfigs.count({
     *   where: {
     *     // ... the filter for the BlockchainConfigs we want to count
     *   }
     * })
    **/
    count<T extends BlockchainConfigsCountArgs>(
      args?: Subset<T, BlockchainConfigsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockchainConfigsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlockchainConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainConfigsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlockchainConfigsAggregateArgs>(args: Subset<T, BlockchainConfigsAggregateArgs>): Prisma.PrismaPromise<GetBlockchainConfigsAggregateType<T>>

    /**
     * Group by BlockchainConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainConfigsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlockchainConfigsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockchainConfigsGroupByArgs['orderBy'] }
        : { orderBy?: BlockchainConfigsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlockchainConfigsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockchainConfigsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlockchainConfigs model
   */
  readonly fields: BlockchainConfigsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlockchainConfigs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockchainConfigsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlockchainConfigs model
   */
  interface BlockchainConfigsFieldRefs {
    readonly id: FieldRef<"BlockchainConfigs", 'String'>
    readonly chainId: FieldRef<"BlockchainConfigs", 'Int'>
    readonly rpcUrlBase: FieldRef<"BlockchainConfigs", 'String'>
    readonly rpcUrlAlter: FieldRef<"BlockchainConfigs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BlockchainConfigs findUnique
   */
  export type BlockchainConfigsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainConfigs to fetch.
     */
    where: BlockchainConfigsWhereUniqueInput
  }

  /**
   * BlockchainConfigs findUniqueOrThrow
   */
  export type BlockchainConfigsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainConfigs to fetch.
     */
    where: BlockchainConfigsWhereUniqueInput
  }

  /**
   * BlockchainConfigs findFirst
   */
  export type BlockchainConfigsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainConfigs to fetch.
     */
    where?: BlockchainConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainConfigs to fetch.
     */
    orderBy?: BlockchainConfigsOrderByWithRelationInput | BlockchainConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockchainConfigs.
     */
    cursor?: BlockchainConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockchainConfigs.
     */
    distinct?: BlockchainConfigsScalarFieldEnum | BlockchainConfigsScalarFieldEnum[]
  }

  /**
   * BlockchainConfigs findFirstOrThrow
   */
  export type BlockchainConfigsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainConfigs to fetch.
     */
    where?: BlockchainConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainConfigs to fetch.
     */
    orderBy?: BlockchainConfigsOrderByWithRelationInput | BlockchainConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockchainConfigs.
     */
    cursor?: BlockchainConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockchainConfigs.
     */
    distinct?: BlockchainConfigsScalarFieldEnum | BlockchainConfigsScalarFieldEnum[]
  }

  /**
   * BlockchainConfigs findMany
   */
  export type BlockchainConfigsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainConfigs to fetch.
     */
    where?: BlockchainConfigsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainConfigs to fetch.
     */
    orderBy?: BlockchainConfigsOrderByWithRelationInput | BlockchainConfigsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlockchainConfigs.
     */
    cursor?: BlockchainConfigsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainConfigs.
     */
    skip?: number
    distinct?: BlockchainConfigsScalarFieldEnum | BlockchainConfigsScalarFieldEnum[]
  }

  /**
   * BlockchainConfigs create
   */
  export type BlockchainConfigsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * The data needed to create a BlockchainConfigs.
     */
    data: XOR<BlockchainConfigsCreateInput, BlockchainConfigsUncheckedCreateInput>
  }

  /**
   * BlockchainConfigs createMany
   */
  export type BlockchainConfigsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlockchainConfigs.
     */
    data: BlockchainConfigsCreateManyInput | BlockchainConfigsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlockchainConfigs createManyAndReturn
   */
  export type BlockchainConfigsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * The data used to create many BlockchainConfigs.
     */
    data: BlockchainConfigsCreateManyInput | BlockchainConfigsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlockchainConfigs update
   */
  export type BlockchainConfigsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * The data needed to update a BlockchainConfigs.
     */
    data: XOR<BlockchainConfigsUpdateInput, BlockchainConfigsUncheckedUpdateInput>
    /**
     * Choose, which BlockchainConfigs to update.
     */
    where: BlockchainConfigsWhereUniqueInput
  }

  /**
   * BlockchainConfigs updateMany
   */
  export type BlockchainConfigsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlockchainConfigs.
     */
    data: XOR<BlockchainConfigsUpdateManyMutationInput, BlockchainConfigsUncheckedUpdateManyInput>
    /**
     * Filter which BlockchainConfigs to update
     */
    where?: BlockchainConfigsWhereInput
    /**
     * Limit how many BlockchainConfigs to update.
     */
    limit?: number
  }

  /**
   * BlockchainConfigs updateManyAndReturn
   */
  export type BlockchainConfigsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * The data used to update BlockchainConfigs.
     */
    data: XOR<BlockchainConfigsUpdateManyMutationInput, BlockchainConfigsUncheckedUpdateManyInput>
    /**
     * Filter which BlockchainConfigs to update
     */
    where?: BlockchainConfigsWhereInput
    /**
     * Limit how many BlockchainConfigs to update.
     */
    limit?: number
  }

  /**
   * BlockchainConfigs upsert
   */
  export type BlockchainConfigsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * The filter to search for the BlockchainConfigs to update in case it exists.
     */
    where: BlockchainConfigsWhereUniqueInput
    /**
     * In case the BlockchainConfigs found by the `where` argument doesn't exist, create a new BlockchainConfigs with this data.
     */
    create: XOR<BlockchainConfigsCreateInput, BlockchainConfigsUncheckedCreateInput>
    /**
     * In case the BlockchainConfigs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockchainConfigsUpdateInput, BlockchainConfigsUncheckedUpdateInput>
  }

  /**
   * BlockchainConfigs delete
   */
  export type BlockchainConfigsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
    /**
     * Filter which BlockchainConfigs to delete.
     */
    where: BlockchainConfigsWhereUniqueInput
  }

  /**
   * BlockchainConfigs deleteMany
   */
  export type BlockchainConfigsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockchainConfigs to delete
     */
    where?: BlockchainConfigsWhereInput
    /**
     * Limit how many BlockchainConfigs to delete.
     */
    limit?: number
  }

  /**
   * BlockchainConfigs without action
   */
  export type BlockchainConfigsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainConfigs
     */
    select?: BlockchainConfigsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainConfigs
     */
    omit?: BlockchainConfigsOmit<ExtArgs> | null
  }


  /**
   * Model BlockchainContracts
   */

  export type AggregateBlockchainContracts = {
    _count: BlockchainContractsCountAggregateOutputType | null
    _avg: BlockchainContractsAvgAggregateOutputType | null
    _sum: BlockchainContractsSumAggregateOutputType | null
    _min: BlockchainContractsMinAggregateOutputType | null
    _max: BlockchainContractsMaxAggregateOutputType | null
  }

  export type BlockchainContractsAvgAggregateOutputType = {
    chainId: number | null
  }

  export type BlockchainContractsSumAggregateOutputType = {
    chainId: number | null
  }

  export type BlockchainContractsMinAggregateOutputType = {
    id: string | null
    contractAddress: string | null
    contractType: string | null
    chainId: number | null
    lastSyncBlock: string | null
    lastSyncTime: Date | null
  }

  export type BlockchainContractsMaxAggregateOutputType = {
    id: string | null
    contractAddress: string | null
    contractType: string | null
    chainId: number | null
    lastSyncBlock: string | null
    lastSyncTime: Date | null
  }

  export type BlockchainContractsCountAggregateOutputType = {
    id: number
    contractAddress: number
    contractType: number
    chainId: number
    lastSyncBlock: number
    lastSyncTime: number
    _all: number
  }


  export type BlockchainContractsAvgAggregateInputType = {
    chainId?: true
  }

  export type BlockchainContractsSumAggregateInputType = {
    chainId?: true
  }

  export type BlockchainContractsMinAggregateInputType = {
    id?: true
    contractAddress?: true
    contractType?: true
    chainId?: true
    lastSyncBlock?: true
    lastSyncTime?: true
  }

  export type BlockchainContractsMaxAggregateInputType = {
    id?: true
    contractAddress?: true
    contractType?: true
    chainId?: true
    lastSyncBlock?: true
    lastSyncTime?: true
  }

  export type BlockchainContractsCountAggregateInputType = {
    id?: true
    contractAddress?: true
    contractType?: true
    chainId?: true
    lastSyncBlock?: true
    lastSyncTime?: true
    _all?: true
  }

  export type BlockchainContractsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockchainContracts to aggregate.
     */
    where?: BlockchainContractsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainContracts to fetch.
     */
    orderBy?: BlockchainContractsOrderByWithRelationInput | BlockchainContractsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockchainContractsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlockchainContracts
    **/
    _count?: true | BlockchainContractsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockchainContractsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockchainContractsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockchainContractsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockchainContractsMaxAggregateInputType
  }

  export type GetBlockchainContractsAggregateType<T extends BlockchainContractsAggregateArgs> = {
        [P in keyof T & keyof AggregateBlockchainContracts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlockchainContracts[P]>
      : GetScalarType<T[P], AggregateBlockchainContracts[P]>
  }




  export type BlockchainContractsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockchainContractsWhereInput
    orderBy?: BlockchainContractsOrderByWithAggregationInput | BlockchainContractsOrderByWithAggregationInput[]
    by: BlockchainContractsScalarFieldEnum[] | BlockchainContractsScalarFieldEnum
    having?: BlockchainContractsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockchainContractsCountAggregateInputType | true
    _avg?: BlockchainContractsAvgAggregateInputType
    _sum?: BlockchainContractsSumAggregateInputType
    _min?: BlockchainContractsMinAggregateInputType
    _max?: BlockchainContractsMaxAggregateInputType
  }

  export type BlockchainContractsGroupByOutputType = {
    id: string
    contractAddress: string
    contractType: string
    chainId: number
    lastSyncBlock: string | null
    lastSyncTime: Date | null
    _count: BlockchainContractsCountAggregateOutputType | null
    _avg: BlockchainContractsAvgAggregateOutputType | null
    _sum: BlockchainContractsSumAggregateOutputType | null
    _min: BlockchainContractsMinAggregateOutputType | null
    _max: BlockchainContractsMaxAggregateOutputType | null
  }

  type GetBlockchainContractsGroupByPayload<T extends BlockchainContractsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockchainContractsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockchainContractsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockchainContractsGroupByOutputType[P]>
            : GetScalarType<T[P], BlockchainContractsGroupByOutputType[P]>
        }
      >
    >


  export type BlockchainContractsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractAddress?: boolean
    contractType?: boolean
    chainId?: boolean
    lastSyncBlock?: boolean
    lastSyncTime?: boolean
  }, ExtArgs["result"]["blockchainContracts"]>

  export type BlockchainContractsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractAddress?: boolean
    contractType?: boolean
    chainId?: boolean
    lastSyncBlock?: boolean
    lastSyncTime?: boolean
  }, ExtArgs["result"]["blockchainContracts"]>

  export type BlockchainContractsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractAddress?: boolean
    contractType?: boolean
    chainId?: boolean
    lastSyncBlock?: boolean
    lastSyncTime?: boolean
  }, ExtArgs["result"]["blockchainContracts"]>

  export type BlockchainContractsSelectScalar = {
    id?: boolean
    contractAddress?: boolean
    contractType?: boolean
    chainId?: boolean
    lastSyncBlock?: boolean
    lastSyncTime?: boolean
  }

  export type BlockchainContractsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contractAddress" | "contractType" | "chainId" | "lastSyncBlock" | "lastSyncTime", ExtArgs["result"]["blockchainContracts"]>

  export type $BlockchainContractsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlockchainContracts"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contractAddress: string
      contractType: string
      chainId: number
      lastSyncBlock: string | null
      lastSyncTime: Date | null
    }, ExtArgs["result"]["blockchainContracts"]>
    composites: {}
  }

  type BlockchainContractsGetPayload<S extends boolean | null | undefined | BlockchainContractsDefaultArgs> = $Result.GetResult<Prisma.$BlockchainContractsPayload, S>

  type BlockchainContractsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlockchainContractsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlockchainContractsCountAggregateInputType | true
    }

  export interface BlockchainContractsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlockchainContracts'], meta: { name: 'BlockchainContracts' } }
    /**
     * Find zero or one BlockchainContracts that matches the filter.
     * @param {BlockchainContractsFindUniqueArgs} args - Arguments to find a BlockchainContracts
     * @example
     * // Get one BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockchainContractsFindUniqueArgs>(args: SelectSubset<T, BlockchainContractsFindUniqueArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlockchainContracts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlockchainContractsFindUniqueOrThrowArgs} args - Arguments to find a BlockchainContracts
     * @example
     * // Get one BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockchainContractsFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockchainContractsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlockchainContracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainContractsFindFirstArgs} args - Arguments to find a BlockchainContracts
     * @example
     * // Get one BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockchainContractsFindFirstArgs>(args?: SelectSubset<T, BlockchainContractsFindFirstArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlockchainContracts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainContractsFindFirstOrThrowArgs} args - Arguments to find a BlockchainContracts
     * @example
     * // Get one BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockchainContractsFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockchainContractsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlockchainContracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainContractsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.findMany()
     * 
     * // Get first 10 BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockchainContractsWithIdOnly = await prisma.blockchainContracts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlockchainContractsFindManyArgs>(args?: SelectSubset<T, BlockchainContractsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlockchainContracts.
     * @param {BlockchainContractsCreateArgs} args - Arguments to create a BlockchainContracts.
     * @example
     * // Create one BlockchainContracts
     * const BlockchainContracts = await prisma.blockchainContracts.create({
     *   data: {
     *     // ... data to create a BlockchainContracts
     *   }
     * })
     * 
     */
    create<T extends BlockchainContractsCreateArgs>(args: SelectSubset<T, BlockchainContractsCreateArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlockchainContracts.
     * @param {BlockchainContractsCreateManyArgs} args - Arguments to create many BlockchainContracts.
     * @example
     * // Create many BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockchainContractsCreateManyArgs>(args?: SelectSubset<T, BlockchainContractsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlockchainContracts and returns the data saved in the database.
     * @param {BlockchainContractsCreateManyAndReturnArgs} args - Arguments to create many BlockchainContracts.
     * @example
     * // Create many BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlockchainContracts and only return the `id`
     * const blockchainContractsWithIdOnly = await prisma.blockchainContracts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockchainContractsCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockchainContractsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlockchainContracts.
     * @param {BlockchainContractsDeleteArgs} args - Arguments to delete one BlockchainContracts.
     * @example
     * // Delete one BlockchainContracts
     * const BlockchainContracts = await prisma.blockchainContracts.delete({
     *   where: {
     *     // ... filter to delete one BlockchainContracts
     *   }
     * })
     * 
     */
    delete<T extends BlockchainContractsDeleteArgs>(args: SelectSubset<T, BlockchainContractsDeleteArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlockchainContracts.
     * @param {BlockchainContractsUpdateArgs} args - Arguments to update one BlockchainContracts.
     * @example
     * // Update one BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockchainContractsUpdateArgs>(args: SelectSubset<T, BlockchainContractsUpdateArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlockchainContracts.
     * @param {BlockchainContractsDeleteManyArgs} args - Arguments to filter BlockchainContracts to delete.
     * @example
     * // Delete a few BlockchainContracts
     * const { count } = await prisma.blockchainContracts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockchainContractsDeleteManyArgs>(args?: SelectSubset<T, BlockchainContractsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockchainContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainContractsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockchainContractsUpdateManyArgs>(args: SelectSubset<T, BlockchainContractsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockchainContracts and returns the data updated in the database.
     * @param {BlockchainContractsUpdateManyAndReturnArgs} args - Arguments to update many BlockchainContracts.
     * @example
     * // Update many BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlockchainContracts and only return the `id`
     * const blockchainContractsWithIdOnly = await prisma.blockchainContracts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlockchainContractsUpdateManyAndReturnArgs>(args: SelectSubset<T, BlockchainContractsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlockchainContracts.
     * @param {BlockchainContractsUpsertArgs} args - Arguments to update or create a BlockchainContracts.
     * @example
     * // Update or create a BlockchainContracts
     * const blockchainContracts = await prisma.blockchainContracts.upsert({
     *   create: {
     *     // ... data to create a BlockchainContracts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlockchainContracts we want to update
     *   }
     * })
     */
    upsert<T extends BlockchainContractsUpsertArgs>(args: SelectSubset<T, BlockchainContractsUpsertArgs<ExtArgs>>): Prisma__BlockchainContractsClient<$Result.GetResult<Prisma.$BlockchainContractsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlockchainContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainContractsCountArgs} args - Arguments to filter BlockchainContracts to count.
     * @example
     * // Count the number of BlockchainContracts
     * const count = await prisma.blockchainContracts.count({
     *   where: {
     *     // ... the filter for the BlockchainContracts we want to count
     *   }
     * })
    **/
    count<T extends BlockchainContractsCountArgs>(
      args?: Subset<T, BlockchainContractsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockchainContractsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlockchainContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainContractsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlockchainContractsAggregateArgs>(args: Subset<T, BlockchainContractsAggregateArgs>): Prisma.PrismaPromise<GetBlockchainContractsAggregateType<T>>

    /**
     * Group by BlockchainContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockchainContractsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlockchainContractsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockchainContractsGroupByArgs['orderBy'] }
        : { orderBy?: BlockchainContractsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlockchainContractsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockchainContractsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlockchainContracts model
   */
  readonly fields: BlockchainContractsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlockchainContracts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockchainContractsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlockchainContracts model
   */
  interface BlockchainContractsFieldRefs {
    readonly id: FieldRef<"BlockchainContracts", 'String'>
    readonly contractAddress: FieldRef<"BlockchainContracts", 'String'>
    readonly contractType: FieldRef<"BlockchainContracts", 'String'>
    readonly chainId: FieldRef<"BlockchainContracts", 'Int'>
    readonly lastSyncBlock: FieldRef<"BlockchainContracts", 'String'>
    readonly lastSyncTime: FieldRef<"BlockchainContracts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlockchainContracts findUnique
   */
  export type BlockchainContractsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainContracts to fetch.
     */
    where: BlockchainContractsWhereUniqueInput
  }

  /**
   * BlockchainContracts findUniqueOrThrow
   */
  export type BlockchainContractsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainContracts to fetch.
     */
    where: BlockchainContractsWhereUniqueInput
  }

  /**
   * BlockchainContracts findFirst
   */
  export type BlockchainContractsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainContracts to fetch.
     */
    where?: BlockchainContractsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainContracts to fetch.
     */
    orderBy?: BlockchainContractsOrderByWithRelationInput | BlockchainContractsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockchainContracts.
     */
    cursor?: BlockchainContractsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockchainContracts.
     */
    distinct?: BlockchainContractsScalarFieldEnum | BlockchainContractsScalarFieldEnum[]
  }

  /**
   * BlockchainContracts findFirstOrThrow
   */
  export type BlockchainContractsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainContracts to fetch.
     */
    where?: BlockchainContractsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainContracts to fetch.
     */
    orderBy?: BlockchainContractsOrderByWithRelationInput | BlockchainContractsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockchainContracts.
     */
    cursor?: BlockchainContractsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockchainContracts.
     */
    distinct?: BlockchainContractsScalarFieldEnum | BlockchainContractsScalarFieldEnum[]
  }

  /**
   * BlockchainContracts findMany
   */
  export type BlockchainContractsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * Filter, which BlockchainContracts to fetch.
     */
    where?: BlockchainContractsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockchainContracts to fetch.
     */
    orderBy?: BlockchainContractsOrderByWithRelationInput | BlockchainContractsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlockchainContracts.
     */
    cursor?: BlockchainContractsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockchainContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockchainContracts.
     */
    skip?: number
    distinct?: BlockchainContractsScalarFieldEnum | BlockchainContractsScalarFieldEnum[]
  }

  /**
   * BlockchainContracts create
   */
  export type BlockchainContractsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * The data needed to create a BlockchainContracts.
     */
    data: XOR<BlockchainContractsCreateInput, BlockchainContractsUncheckedCreateInput>
  }

  /**
   * BlockchainContracts createMany
   */
  export type BlockchainContractsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlockchainContracts.
     */
    data: BlockchainContractsCreateManyInput | BlockchainContractsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlockchainContracts createManyAndReturn
   */
  export type BlockchainContractsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * The data used to create many BlockchainContracts.
     */
    data: BlockchainContractsCreateManyInput | BlockchainContractsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlockchainContracts update
   */
  export type BlockchainContractsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * The data needed to update a BlockchainContracts.
     */
    data: XOR<BlockchainContractsUpdateInput, BlockchainContractsUncheckedUpdateInput>
    /**
     * Choose, which BlockchainContracts to update.
     */
    where: BlockchainContractsWhereUniqueInput
  }

  /**
   * BlockchainContracts updateMany
   */
  export type BlockchainContractsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlockchainContracts.
     */
    data: XOR<BlockchainContractsUpdateManyMutationInput, BlockchainContractsUncheckedUpdateManyInput>
    /**
     * Filter which BlockchainContracts to update
     */
    where?: BlockchainContractsWhereInput
    /**
     * Limit how many BlockchainContracts to update.
     */
    limit?: number
  }

  /**
   * BlockchainContracts updateManyAndReturn
   */
  export type BlockchainContractsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * The data used to update BlockchainContracts.
     */
    data: XOR<BlockchainContractsUpdateManyMutationInput, BlockchainContractsUncheckedUpdateManyInput>
    /**
     * Filter which BlockchainContracts to update
     */
    where?: BlockchainContractsWhereInput
    /**
     * Limit how many BlockchainContracts to update.
     */
    limit?: number
  }

  /**
   * BlockchainContracts upsert
   */
  export type BlockchainContractsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * The filter to search for the BlockchainContracts to update in case it exists.
     */
    where: BlockchainContractsWhereUniqueInput
    /**
     * In case the BlockchainContracts found by the `where` argument doesn't exist, create a new BlockchainContracts with this data.
     */
    create: XOR<BlockchainContractsCreateInput, BlockchainContractsUncheckedCreateInput>
    /**
     * In case the BlockchainContracts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockchainContractsUpdateInput, BlockchainContractsUncheckedUpdateInput>
  }

  /**
   * BlockchainContracts delete
   */
  export type BlockchainContractsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
    /**
     * Filter which BlockchainContracts to delete.
     */
    where: BlockchainContractsWhereUniqueInput
  }

  /**
   * BlockchainContracts deleteMany
   */
  export type BlockchainContractsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockchainContracts to delete
     */
    where?: BlockchainContractsWhereInput
    /**
     * Limit how many BlockchainContracts to delete.
     */
    limit?: number
  }

  /**
   * BlockchainContracts without action
   */
  export type BlockchainContractsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockchainContracts
     */
    select?: BlockchainContractsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockchainContracts
     */
    omit?: BlockchainContractsOmit<ExtArgs> | null
  }


  /**
   * Model NFTOwners
   */

  export type AggregateNFTOwners = {
    _count: NFTOwnersCountAggregateOutputType | null
    _avg: NFTOwnersAvgAggregateOutputType | null
    _sum: NFTOwnersSumAggregateOutputType | null
    _min: NFTOwnersMinAggregateOutputType | null
    _max: NFTOwnersMaxAggregateOutputType | null
  }

  export type NFTOwnersAvgAggregateOutputType = {
    count: number | null
  }

  export type NFTOwnersSumAggregateOutputType = {
    count: number | null
  }

  export type NFTOwnersMinAggregateOutputType = {
    id: string | null
    contractId: string | null
    ownerAddress: string | null
    contractAddress: string | null
    tokenId: string | null
    count: number | null
    lastTransactionHash: string | null
    lastSyncTime: Date | null
  }

  export type NFTOwnersMaxAggregateOutputType = {
    id: string | null
    contractId: string | null
    ownerAddress: string | null
    contractAddress: string | null
    tokenId: string | null
    count: number | null
    lastTransactionHash: string | null
    lastSyncTime: Date | null
  }

  export type NFTOwnersCountAggregateOutputType = {
    id: number
    contractId: number
    ownerAddress: number
    contractAddress: number
    tokenId: number
    count: number
    lastTransactionHash: number
    lastSyncTime: number
    _all: number
  }


  export type NFTOwnersAvgAggregateInputType = {
    count?: true
  }

  export type NFTOwnersSumAggregateInputType = {
    count?: true
  }

  export type NFTOwnersMinAggregateInputType = {
    id?: true
    contractId?: true
    ownerAddress?: true
    contractAddress?: true
    tokenId?: true
    count?: true
    lastTransactionHash?: true
    lastSyncTime?: true
  }

  export type NFTOwnersMaxAggregateInputType = {
    id?: true
    contractId?: true
    ownerAddress?: true
    contractAddress?: true
    tokenId?: true
    count?: true
    lastTransactionHash?: true
    lastSyncTime?: true
  }

  export type NFTOwnersCountAggregateInputType = {
    id?: true
    contractId?: true
    ownerAddress?: true
    contractAddress?: true
    tokenId?: true
    count?: true
    lastTransactionHash?: true
    lastSyncTime?: true
    _all?: true
  }

  export type NFTOwnersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NFTOwners to aggregate.
     */
    where?: NFTOwnersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTOwners to fetch.
     */
    orderBy?: NFTOwnersOrderByWithRelationInput | NFTOwnersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NFTOwnersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTOwners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NFTOwners
    **/
    _count?: true | NFTOwnersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NFTOwnersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NFTOwnersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NFTOwnersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NFTOwnersMaxAggregateInputType
  }

  export type GetNFTOwnersAggregateType<T extends NFTOwnersAggregateArgs> = {
        [P in keyof T & keyof AggregateNFTOwners]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNFTOwners[P]>
      : GetScalarType<T[P], AggregateNFTOwners[P]>
  }




  export type NFTOwnersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NFTOwnersWhereInput
    orderBy?: NFTOwnersOrderByWithAggregationInput | NFTOwnersOrderByWithAggregationInput[]
    by: NFTOwnersScalarFieldEnum[] | NFTOwnersScalarFieldEnum
    having?: NFTOwnersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NFTOwnersCountAggregateInputType | true
    _avg?: NFTOwnersAvgAggregateInputType
    _sum?: NFTOwnersSumAggregateInputType
    _min?: NFTOwnersMinAggregateInputType
    _max?: NFTOwnersMaxAggregateInputType
  }

  export type NFTOwnersGroupByOutputType = {
    id: string
    contractId: string
    ownerAddress: string
    contractAddress: string
    tokenId: string
    count: number
    lastTransactionHash: string | null
    lastSyncTime: Date | null
    _count: NFTOwnersCountAggregateOutputType | null
    _avg: NFTOwnersAvgAggregateOutputType | null
    _sum: NFTOwnersSumAggregateOutputType | null
    _min: NFTOwnersMinAggregateOutputType | null
    _max: NFTOwnersMaxAggregateOutputType | null
  }

  type GetNFTOwnersGroupByPayload<T extends NFTOwnersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NFTOwnersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NFTOwnersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NFTOwnersGroupByOutputType[P]>
            : GetScalarType<T[P], NFTOwnersGroupByOutputType[P]>
        }
      >
    >


  export type NFTOwnersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    ownerAddress?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    count?: boolean
    lastTransactionHash?: boolean
    lastSyncTime?: boolean
    nft?: boolean | NFTOwners$nftArgs<ExtArgs>
  }, ExtArgs["result"]["nFTOwners"]>

  export type NFTOwnersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    ownerAddress?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    count?: boolean
    lastTransactionHash?: boolean
    lastSyncTime?: boolean
    nft?: boolean | NFTOwners$nftArgs<ExtArgs>
  }, ExtArgs["result"]["nFTOwners"]>

  export type NFTOwnersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    ownerAddress?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    count?: boolean
    lastTransactionHash?: boolean
    lastSyncTime?: boolean
    nft?: boolean | NFTOwners$nftArgs<ExtArgs>
  }, ExtArgs["result"]["nFTOwners"]>

  export type NFTOwnersSelectScalar = {
    id?: boolean
    contractId?: boolean
    ownerAddress?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    count?: boolean
    lastTransactionHash?: boolean
    lastSyncTime?: boolean
  }

  export type NFTOwnersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contractId" | "ownerAddress" | "contractAddress" | "tokenId" | "count" | "lastTransactionHash" | "lastSyncTime", ExtArgs["result"]["nFTOwners"]>
  export type NFTOwnersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nft?: boolean | NFTOwners$nftArgs<ExtArgs>
  }
  export type NFTOwnersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nft?: boolean | NFTOwners$nftArgs<ExtArgs>
  }
  export type NFTOwnersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nft?: boolean | NFTOwners$nftArgs<ExtArgs>
  }

  export type $NFTOwnersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NFTOwners"
    objects: {
      nft: Prisma.$NFTsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contractId: string
      ownerAddress: string
      contractAddress: string
      tokenId: string
      count: number
      lastTransactionHash: string | null
      lastSyncTime: Date | null
    }, ExtArgs["result"]["nFTOwners"]>
    composites: {}
  }

  type NFTOwnersGetPayload<S extends boolean | null | undefined | NFTOwnersDefaultArgs> = $Result.GetResult<Prisma.$NFTOwnersPayload, S>

  type NFTOwnersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NFTOwnersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NFTOwnersCountAggregateInputType | true
    }

  export interface NFTOwnersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NFTOwners'], meta: { name: 'NFTOwners' } }
    /**
     * Find zero or one NFTOwners that matches the filter.
     * @param {NFTOwnersFindUniqueArgs} args - Arguments to find a NFTOwners
     * @example
     * // Get one NFTOwners
     * const nFTOwners = await prisma.nFTOwners.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NFTOwnersFindUniqueArgs>(args: SelectSubset<T, NFTOwnersFindUniqueArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NFTOwners that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NFTOwnersFindUniqueOrThrowArgs} args - Arguments to find a NFTOwners
     * @example
     * // Get one NFTOwners
     * const nFTOwners = await prisma.nFTOwners.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NFTOwnersFindUniqueOrThrowArgs>(args: SelectSubset<T, NFTOwnersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NFTOwners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTOwnersFindFirstArgs} args - Arguments to find a NFTOwners
     * @example
     * // Get one NFTOwners
     * const nFTOwners = await prisma.nFTOwners.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NFTOwnersFindFirstArgs>(args?: SelectSubset<T, NFTOwnersFindFirstArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NFTOwners that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTOwnersFindFirstOrThrowArgs} args - Arguments to find a NFTOwners
     * @example
     * // Get one NFTOwners
     * const nFTOwners = await prisma.nFTOwners.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NFTOwnersFindFirstOrThrowArgs>(args?: SelectSubset<T, NFTOwnersFindFirstOrThrowArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NFTOwners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTOwnersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NFTOwners
     * const nFTOwners = await prisma.nFTOwners.findMany()
     * 
     * // Get first 10 NFTOwners
     * const nFTOwners = await prisma.nFTOwners.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nFTOwnersWithIdOnly = await prisma.nFTOwners.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NFTOwnersFindManyArgs>(args?: SelectSubset<T, NFTOwnersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NFTOwners.
     * @param {NFTOwnersCreateArgs} args - Arguments to create a NFTOwners.
     * @example
     * // Create one NFTOwners
     * const NFTOwners = await prisma.nFTOwners.create({
     *   data: {
     *     // ... data to create a NFTOwners
     *   }
     * })
     * 
     */
    create<T extends NFTOwnersCreateArgs>(args: SelectSubset<T, NFTOwnersCreateArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NFTOwners.
     * @param {NFTOwnersCreateManyArgs} args - Arguments to create many NFTOwners.
     * @example
     * // Create many NFTOwners
     * const nFTOwners = await prisma.nFTOwners.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NFTOwnersCreateManyArgs>(args?: SelectSubset<T, NFTOwnersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NFTOwners and returns the data saved in the database.
     * @param {NFTOwnersCreateManyAndReturnArgs} args - Arguments to create many NFTOwners.
     * @example
     * // Create many NFTOwners
     * const nFTOwners = await prisma.nFTOwners.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NFTOwners and only return the `id`
     * const nFTOwnersWithIdOnly = await prisma.nFTOwners.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NFTOwnersCreateManyAndReturnArgs>(args?: SelectSubset<T, NFTOwnersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NFTOwners.
     * @param {NFTOwnersDeleteArgs} args - Arguments to delete one NFTOwners.
     * @example
     * // Delete one NFTOwners
     * const NFTOwners = await prisma.nFTOwners.delete({
     *   where: {
     *     // ... filter to delete one NFTOwners
     *   }
     * })
     * 
     */
    delete<T extends NFTOwnersDeleteArgs>(args: SelectSubset<T, NFTOwnersDeleteArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NFTOwners.
     * @param {NFTOwnersUpdateArgs} args - Arguments to update one NFTOwners.
     * @example
     * // Update one NFTOwners
     * const nFTOwners = await prisma.nFTOwners.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NFTOwnersUpdateArgs>(args: SelectSubset<T, NFTOwnersUpdateArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NFTOwners.
     * @param {NFTOwnersDeleteManyArgs} args - Arguments to filter NFTOwners to delete.
     * @example
     * // Delete a few NFTOwners
     * const { count } = await prisma.nFTOwners.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NFTOwnersDeleteManyArgs>(args?: SelectSubset<T, NFTOwnersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NFTOwners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTOwnersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NFTOwners
     * const nFTOwners = await prisma.nFTOwners.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NFTOwnersUpdateManyArgs>(args: SelectSubset<T, NFTOwnersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NFTOwners and returns the data updated in the database.
     * @param {NFTOwnersUpdateManyAndReturnArgs} args - Arguments to update many NFTOwners.
     * @example
     * // Update many NFTOwners
     * const nFTOwners = await prisma.nFTOwners.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NFTOwners and only return the `id`
     * const nFTOwnersWithIdOnly = await prisma.nFTOwners.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NFTOwnersUpdateManyAndReturnArgs>(args: SelectSubset<T, NFTOwnersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NFTOwners.
     * @param {NFTOwnersUpsertArgs} args - Arguments to update or create a NFTOwners.
     * @example
     * // Update or create a NFTOwners
     * const nFTOwners = await prisma.nFTOwners.upsert({
     *   create: {
     *     // ... data to create a NFTOwners
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NFTOwners we want to update
     *   }
     * })
     */
    upsert<T extends NFTOwnersUpsertArgs>(args: SelectSubset<T, NFTOwnersUpsertArgs<ExtArgs>>): Prisma__NFTOwnersClient<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NFTOwners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTOwnersCountArgs} args - Arguments to filter NFTOwners to count.
     * @example
     * // Count the number of NFTOwners
     * const count = await prisma.nFTOwners.count({
     *   where: {
     *     // ... the filter for the NFTOwners we want to count
     *   }
     * })
    **/
    count<T extends NFTOwnersCountArgs>(
      args?: Subset<T, NFTOwnersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NFTOwnersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NFTOwners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTOwnersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NFTOwnersAggregateArgs>(args: Subset<T, NFTOwnersAggregateArgs>): Prisma.PrismaPromise<GetNFTOwnersAggregateType<T>>

    /**
     * Group by NFTOwners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTOwnersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NFTOwnersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NFTOwnersGroupByArgs['orderBy'] }
        : { orderBy?: NFTOwnersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NFTOwnersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNFTOwnersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NFTOwners model
   */
  readonly fields: NFTOwnersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NFTOwners.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NFTOwnersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nft<T extends NFTOwners$nftArgs<ExtArgs> = {}>(args?: Subset<T, NFTOwners$nftArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NFTOwners model
   */
  interface NFTOwnersFieldRefs {
    readonly id: FieldRef<"NFTOwners", 'String'>
    readonly contractId: FieldRef<"NFTOwners", 'String'>
    readonly ownerAddress: FieldRef<"NFTOwners", 'String'>
    readonly contractAddress: FieldRef<"NFTOwners", 'String'>
    readonly tokenId: FieldRef<"NFTOwners", 'String'>
    readonly count: FieldRef<"NFTOwners", 'Int'>
    readonly lastTransactionHash: FieldRef<"NFTOwners", 'String'>
    readonly lastSyncTime: FieldRef<"NFTOwners", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NFTOwners findUnique
   */
  export type NFTOwnersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * Filter, which NFTOwners to fetch.
     */
    where: NFTOwnersWhereUniqueInput
  }

  /**
   * NFTOwners findUniqueOrThrow
   */
  export type NFTOwnersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * Filter, which NFTOwners to fetch.
     */
    where: NFTOwnersWhereUniqueInput
  }

  /**
   * NFTOwners findFirst
   */
  export type NFTOwnersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * Filter, which NFTOwners to fetch.
     */
    where?: NFTOwnersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTOwners to fetch.
     */
    orderBy?: NFTOwnersOrderByWithRelationInput | NFTOwnersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NFTOwners.
     */
    cursor?: NFTOwnersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTOwners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NFTOwners.
     */
    distinct?: NFTOwnersScalarFieldEnum | NFTOwnersScalarFieldEnum[]
  }

  /**
   * NFTOwners findFirstOrThrow
   */
  export type NFTOwnersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * Filter, which NFTOwners to fetch.
     */
    where?: NFTOwnersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTOwners to fetch.
     */
    orderBy?: NFTOwnersOrderByWithRelationInput | NFTOwnersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NFTOwners.
     */
    cursor?: NFTOwnersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTOwners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NFTOwners.
     */
    distinct?: NFTOwnersScalarFieldEnum | NFTOwnersScalarFieldEnum[]
  }

  /**
   * NFTOwners findMany
   */
  export type NFTOwnersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * Filter, which NFTOwners to fetch.
     */
    where?: NFTOwnersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTOwners to fetch.
     */
    orderBy?: NFTOwnersOrderByWithRelationInput | NFTOwnersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NFTOwners.
     */
    cursor?: NFTOwnersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTOwners.
     */
    skip?: number
    distinct?: NFTOwnersScalarFieldEnum | NFTOwnersScalarFieldEnum[]
  }

  /**
   * NFTOwners create
   */
  export type NFTOwnersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * The data needed to create a NFTOwners.
     */
    data: XOR<NFTOwnersCreateInput, NFTOwnersUncheckedCreateInput>
  }

  /**
   * NFTOwners createMany
   */
  export type NFTOwnersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NFTOwners.
     */
    data: NFTOwnersCreateManyInput | NFTOwnersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NFTOwners createManyAndReturn
   */
  export type NFTOwnersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * The data used to create many NFTOwners.
     */
    data: NFTOwnersCreateManyInput | NFTOwnersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NFTOwners update
   */
  export type NFTOwnersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * The data needed to update a NFTOwners.
     */
    data: XOR<NFTOwnersUpdateInput, NFTOwnersUncheckedUpdateInput>
    /**
     * Choose, which NFTOwners to update.
     */
    where: NFTOwnersWhereUniqueInput
  }

  /**
   * NFTOwners updateMany
   */
  export type NFTOwnersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NFTOwners.
     */
    data: XOR<NFTOwnersUpdateManyMutationInput, NFTOwnersUncheckedUpdateManyInput>
    /**
     * Filter which NFTOwners to update
     */
    where?: NFTOwnersWhereInput
    /**
     * Limit how many NFTOwners to update.
     */
    limit?: number
  }

  /**
   * NFTOwners updateManyAndReturn
   */
  export type NFTOwnersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * The data used to update NFTOwners.
     */
    data: XOR<NFTOwnersUpdateManyMutationInput, NFTOwnersUncheckedUpdateManyInput>
    /**
     * Filter which NFTOwners to update
     */
    where?: NFTOwnersWhereInput
    /**
     * Limit how many NFTOwners to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NFTOwners upsert
   */
  export type NFTOwnersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * The filter to search for the NFTOwners to update in case it exists.
     */
    where: NFTOwnersWhereUniqueInput
    /**
     * In case the NFTOwners found by the `where` argument doesn't exist, create a new NFTOwners with this data.
     */
    create: XOR<NFTOwnersCreateInput, NFTOwnersUncheckedCreateInput>
    /**
     * In case the NFTOwners was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NFTOwnersUpdateInput, NFTOwnersUncheckedUpdateInput>
  }

  /**
   * NFTOwners delete
   */
  export type NFTOwnersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    /**
     * Filter which NFTOwners to delete.
     */
    where: NFTOwnersWhereUniqueInput
  }

  /**
   * NFTOwners deleteMany
   */
  export type NFTOwnersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NFTOwners to delete
     */
    where?: NFTOwnersWhereInput
    /**
     * Limit how many NFTOwners to delete.
     */
    limit?: number
  }

  /**
   * NFTOwners.nft
   */
  export type NFTOwners$nftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    where?: NFTsWhereInput
  }

  /**
   * NFTOwners without action
   */
  export type NFTOwnersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
  }


  /**
   * Model ContractLogs
   */

  export type AggregateContractLogs = {
    _count: ContractLogsCountAggregateOutputType | null
    _avg: ContractLogsAvgAggregateOutputType | null
    _sum: ContractLogsSumAggregateOutputType | null
    _min: ContractLogsMinAggregateOutputType | null
    _max: ContractLogsMaxAggregateOutputType | null
  }

  export type ContractLogsAvgAggregateOutputType = {
    chainId: number | null
    logIndex: number | null
  }

  export type ContractLogsSumAggregateOutputType = {
    chainId: number | null
    logIndex: number | null
  }

  export type ContractLogsMinAggregateOutputType = {
    id: string | null
    contractId: string | null
    chainId: number | null
    contractAddress: string | null
    blockNumber: string | null
    transactionHash: string | null
    logIndex: number | null
    eventType: string | null
    fromAddress: string | null
    toAddress: string | null
    operatorAddress: string | null
    tokenId: string | null
    value: string | null
    loggedAt: Date | null
  }

  export type ContractLogsMaxAggregateOutputType = {
    id: string | null
    contractId: string | null
    chainId: number | null
    contractAddress: string | null
    blockNumber: string | null
    transactionHash: string | null
    logIndex: number | null
    eventType: string | null
    fromAddress: string | null
    toAddress: string | null
    operatorAddress: string | null
    tokenId: string | null
    value: string | null
    loggedAt: Date | null
  }

  export type ContractLogsCountAggregateOutputType = {
    id: number
    contractId: number
    chainId: number
    contractAddress: number
    blockNumber: number
    transactionHash: number
    logIndex: number
    eventType: number
    fromAddress: number
    toAddress: number
    operatorAddress: number
    tokenId: number
    value: number
    loggedAt: number
    _all: number
  }


  export type ContractLogsAvgAggregateInputType = {
    chainId?: true
    logIndex?: true
  }

  export type ContractLogsSumAggregateInputType = {
    chainId?: true
    logIndex?: true
  }

  export type ContractLogsMinAggregateInputType = {
    id?: true
    contractId?: true
    chainId?: true
    contractAddress?: true
    blockNumber?: true
    transactionHash?: true
    logIndex?: true
    eventType?: true
    fromAddress?: true
    toAddress?: true
    operatorAddress?: true
    tokenId?: true
    value?: true
    loggedAt?: true
  }

  export type ContractLogsMaxAggregateInputType = {
    id?: true
    contractId?: true
    chainId?: true
    contractAddress?: true
    blockNumber?: true
    transactionHash?: true
    logIndex?: true
    eventType?: true
    fromAddress?: true
    toAddress?: true
    operatorAddress?: true
    tokenId?: true
    value?: true
    loggedAt?: true
  }

  export type ContractLogsCountAggregateInputType = {
    id?: true
    contractId?: true
    chainId?: true
    contractAddress?: true
    blockNumber?: true
    transactionHash?: true
    logIndex?: true
    eventType?: true
    fromAddress?: true
    toAddress?: true
    operatorAddress?: true
    tokenId?: true
    value?: true
    loggedAt?: true
    _all?: true
  }

  export type ContractLogsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractLogs to aggregate.
     */
    where?: ContractLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractLogs to fetch.
     */
    orderBy?: ContractLogsOrderByWithRelationInput | ContractLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractLogs
    **/
    _count?: true | ContractLogsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContractLogsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContractLogsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractLogsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractLogsMaxAggregateInputType
  }

  export type GetContractLogsAggregateType<T extends ContractLogsAggregateArgs> = {
        [P in keyof T & keyof AggregateContractLogs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractLogs[P]>
      : GetScalarType<T[P], AggregateContractLogs[P]>
  }




  export type ContractLogsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractLogsWhereInput
    orderBy?: ContractLogsOrderByWithAggregationInput | ContractLogsOrderByWithAggregationInput[]
    by: ContractLogsScalarFieldEnum[] | ContractLogsScalarFieldEnum
    having?: ContractLogsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractLogsCountAggregateInputType | true
    _avg?: ContractLogsAvgAggregateInputType
    _sum?: ContractLogsSumAggregateInputType
    _min?: ContractLogsMinAggregateInputType
    _max?: ContractLogsMaxAggregateInputType
  }

  export type ContractLogsGroupByOutputType = {
    id: string
    contractId: string
    chainId: number
    contractAddress: string
    blockNumber: string
    transactionHash: string
    logIndex: number
    eventType: string
    fromAddress: string | null
    toAddress: string | null
    operatorAddress: string | null
    tokenId: string | null
    value: string | null
    loggedAt: Date
    _count: ContractLogsCountAggregateOutputType | null
    _avg: ContractLogsAvgAggregateOutputType | null
    _sum: ContractLogsSumAggregateOutputType | null
    _min: ContractLogsMinAggregateOutputType | null
    _max: ContractLogsMaxAggregateOutputType | null
  }

  type GetContractLogsGroupByPayload<T extends ContractLogsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractLogsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractLogsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractLogsGroupByOutputType[P]>
            : GetScalarType<T[P], ContractLogsGroupByOutputType[P]>
        }
      >
    >


  export type ContractLogsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    chainId?: boolean
    contractAddress?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    logIndex?: boolean
    eventType?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    operatorAddress?: boolean
    tokenId?: boolean
    value?: boolean
    loggedAt?: boolean
  }, ExtArgs["result"]["contractLogs"]>

  export type ContractLogsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    chainId?: boolean
    contractAddress?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    logIndex?: boolean
    eventType?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    operatorAddress?: boolean
    tokenId?: boolean
    value?: boolean
    loggedAt?: boolean
  }, ExtArgs["result"]["contractLogs"]>

  export type ContractLogsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    chainId?: boolean
    contractAddress?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    logIndex?: boolean
    eventType?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    operatorAddress?: boolean
    tokenId?: boolean
    value?: boolean
    loggedAt?: boolean
  }, ExtArgs["result"]["contractLogs"]>

  export type ContractLogsSelectScalar = {
    id?: boolean
    contractId?: boolean
    chainId?: boolean
    contractAddress?: boolean
    blockNumber?: boolean
    transactionHash?: boolean
    logIndex?: boolean
    eventType?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    operatorAddress?: boolean
    tokenId?: boolean
    value?: boolean
    loggedAt?: boolean
  }

  export type ContractLogsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contractId" | "chainId" | "contractAddress" | "blockNumber" | "transactionHash" | "logIndex" | "eventType" | "fromAddress" | "toAddress" | "operatorAddress" | "tokenId" | "value" | "loggedAt", ExtArgs["result"]["contractLogs"]>

  export type $ContractLogsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractLogs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contractId: string
      chainId: number
      contractAddress: string
      blockNumber: string
      transactionHash: string
      logIndex: number
      eventType: string
      fromAddress: string | null
      toAddress: string | null
      operatorAddress: string | null
      tokenId: string | null
      value: string | null
      loggedAt: Date
    }, ExtArgs["result"]["contractLogs"]>
    composites: {}
  }

  type ContractLogsGetPayload<S extends boolean | null | undefined | ContractLogsDefaultArgs> = $Result.GetResult<Prisma.$ContractLogsPayload, S>

  type ContractLogsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContractLogsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContractLogsCountAggregateInputType | true
    }

  export interface ContractLogsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractLogs'], meta: { name: 'ContractLogs' } }
    /**
     * Find zero or one ContractLogs that matches the filter.
     * @param {ContractLogsFindUniqueArgs} args - Arguments to find a ContractLogs
     * @example
     * // Get one ContractLogs
     * const contractLogs = await prisma.contractLogs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractLogsFindUniqueArgs>(args: SelectSubset<T, ContractLogsFindUniqueArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContractLogs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractLogsFindUniqueOrThrowArgs} args - Arguments to find a ContractLogs
     * @example
     * // Get one ContractLogs
     * const contractLogs = await prisma.contractLogs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractLogsFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractLogsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractLogsFindFirstArgs} args - Arguments to find a ContractLogs
     * @example
     * // Get one ContractLogs
     * const contractLogs = await prisma.contractLogs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractLogsFindFirstArgs>(args?: SelectSubset<T, ContractLogsFindFirstArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractLogs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractLogsFindFirstOrThrowArgs} args - Arguments to find a ContractLogs
     * @example
     * // Get one ContractLogs
     * const contractLogs = await prisma.contractLogs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractLogsFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractLogsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContractLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractLogsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractLogs
     * const contractLogs = await prisma.contractLogs.findMany()
     * 
     * // Get first 10 ContractLogs
     * const contractLogs = await prisma.contractLogs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractLogsWithIdOnly = await prisma.contractLogs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractLogsFindManyArgs>(args?: SelectSubset<T, ContractLogsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContractLogs.
     * @param {ContractLogsCreateArgs} args - Arguments to create a ContractLogs.
     * @example
     * // Create one ContractLogs
     * const ContractLogs = await prisma.contractLogs.create({
     *   data: {
     *     // ... data to create a ContractLogs
     *   }
     * })
     * 
     */
    create<T extends ContractLogsCreateArgs>(args: SelectSubset<T, ContractLogsCreateArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContractLogs.
     * @param {ContractLogsCreateManyArgs} args - Arguments to create many ContractLogs.
     * @example
     * // Create many ContractLogs
     * const contractLogs = await prisma.contractLogs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractLogsCreateManyArgs>(args?: SelectSubset<T, ContractLogsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContractLogs and returns the data saved in the database.
     * @param {ContractLogsCreateManyAndReturnArgs} args - Arguments to create many ContractLogs.
     * @example
     * // Create many ContractLogs
     * const contractLogs = await prisma.contractLogs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContractLogs and only return the `id`
     * const contractLogsWithIdOnly = await prisma.contractLogs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractLogsCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractLogsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContractLogs.
     * @param {ContractLogsDeleteArgs} args - Arguments to delete one ContractLogs.
     * @example
     * // Delete one ContractLogs
     * const ContractLogs = await prisma.contractLogs.delete({
     *   where: {
     *     // ... filter to delete one ContractLogs
     *   }
     * })
     * 
     */
    delete<T extends ContractLogsDeleteArgs>(args: SelectSubset<T, ContractLogsDeleteArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContractLogs.
     * @param {ContractLogsUpdateArgs} args - Arguments to update one ContractLogs.
     * @example
     * // Update one ContractLogs
     * const contractLogs = await prisma.contractLogs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractLogsUpdateArgs>(args: SelectSubset<T, ContractLogsUpdateArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContractLogs.
     * @param {ContractLogsDeleteManyArgs} args - Arguments to filter ContractLogs to delete.
     * @example
     * // Delete a few ContractLogs
     * const { count } = await prisma.contractLogs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractLogsDeleteManyArgs>(args?: SelectSubset<T, ContractLogsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractLogsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractLogs
     * const contractLogs = await prisma.contractLogs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractLogsUpdateManyArgs>(args: SelectSubset<T, ContractLogsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractLogs and returns the data updated in the database.
     * @param {ContractLogsUpdateManyAndReturnArgs} args - Arguments to update many ContractLogs.
     * @example
     * // Update many ContractLogs
     * const contractLogs = await prisma.contractLogs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContractLogs and only return the `id`
     * const contractLogsWithIdOnly = await prisma.contractLogs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContractLogsUpdateManyAndReturnArgs>(args: SelectSubset<T, ContractLogsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContractLogs.
     * @param {ContractLogsUpsertArgs} args - Arguments to update or create a ContractLogs.
     * @example
     * // Update or create a ContractLogs
     * const contractLogs = await prisma.contractLogs.upsert({
     *   create: {
     *     // ... data to create a ContractLogs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractLogs we want to update
     *   }
     * })
     */
    upsert<T extends ContractLogsUpsertArgs>(args: SelectSubset<T, ContractLogsUpsertArgs<ExtArgs>>): Prisma__ContractLogsClient<$Result.GetResult<Prisma.$ContractLogsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContractLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractLogsCountArgs} args - Arguments to filter ContractLogs to count.
     * @example
     * // Count the number of ContractLogs
     * const count = await prisma.contractLogs.count({
     *   where: {
     *     // ... the filter for the ContractLogs we want to count
     *   }
     * })
    **/
    count<T extends ContractLogsCountArgs>(
      args?: Subset<T, ContractLogsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractLogsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractLogsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContractLogsAggregateArgs>(args: Subset<T, ContractLogsAggregateArgs>): Prisma.PrismaPromise<GetContractLogsAggregateType<T>>

    /**
     * Group by ContractLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractLogsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContractLogsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractLogsGroupByArgs['orderBy'] }
        : { orderBy?: ContractLogsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContractLogsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractLogsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractLogs model
   */
  readonly fields: ContractLogsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractLogs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractLogsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContractLogs model
   */
  interface ContractLogsFieldRefs {
    readonly id: FieldRef<"ContractLogs", 'String'>
    readonly contractId: FieldRef<"ContractLogs", 'String'>
    readonly chainId: FieldRef<"ContractLogs", 'Int'>
    readonly contractAddress: FieldRef<"ContractLogs", 'String'>
    readonly blockNumber: FieldRef<"ContractLogs", 'String'>
    readonly transactionHash: FieldRef<"ContractLogs", 'String'>
    readonly logIndex: FieldRef<"ContractLogs", 'Int'>
    readonly eventType: FieldRef<"ContractLogs", 'String'>
    readonly fromAddress: FieldRef<"ContractLogs", 'String'>
    readonly toAddress: FieldRef<"ContractLogs", 'String'>
    readonly operatorAddress: FieldRef<"ContractLogs", 'String'>
    readonly tokenId: FieldRef<"ContractLogs", 'String'>
    readonly value: FieldRef<"ContractLogs", 'String'>
    readonly loggedAt: FieldRef<"ContractLogs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContractLogs findUnique
   */
  export type ContractLogsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * Filter, which ContractLogs to fetch.
     */
    where: ContractLogsWhereUniqueInput
  }

  /**
   * ContractLogs findUniqueOrThrow
   */
  export type ContractLogsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * Filter, which ContractLogs to fetch.
     */
    where: ContractLogsWhereUniqueInput
  }

  /**
   * ContractLogs findFirst
   */
  export type ContractLogsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * Filter, which ContractLogs to fetch.
     */
    where?: ContractLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractLogs to fetch.
     */
    orderBy?: ContractLogsOrderByWithRelationInput | ContractLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractLogs.
     */
    cursor?: ContractLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractLogs.
     */
    distinct?: ContractLogsScalarFieldEnum | ContractLogsScalarFieldEnum[]
  }

  /**
   * ContractLogs findFirstOrThrow
   */
  export type ContractLogsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * Filter, which ContractLogs to fetch.
     */
    where?: ContractLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractLogs to fetch.
     */
    orderBy?: ContractLogsOrderByWithRelationInput | ContractLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractLogs.
     */
    cursor?: ContractLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractLogs.
     */
    distinct?: ContractLogsScalarFieldEnum | ContractLogsScalarFieldEnum[]
  }

  /**
   * ContractLogs findMany
   */
  export type ContractLogsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * Filter, which ContractLogs to fetch.
     */
    where?: ContractLogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractLogs to fetch.
     */
    orderBy?: ContractLogsOrderByWithRelationInput | ContractLogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractLogs.
     */
    cursor?: ContractLogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractLogs.
     */
    skip?: number
    distinct?: ContractLogsScalarFieldEnum | ContractLogsScalarFieldEnum[]
  }

  /**
   * ContractLogs create
   */
  export type ContractLogsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * The data needed to create a ContractLogs.
     */
    data: XOR<ContractLogsCreateInput, ContractLogsUncheckedCreateInput>
  }

  /**
   * ContractLogs createMany
   */
  export type ContractLogsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractLogs.
     */
    data: ContractLogsCreateManyInput | ContractLogsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractLogs createManyAndReturn
   */
  export type ContractLogsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * The data used to create many ContractLogs.
     */
    data: ContractLogsCreateManyInput | ContractLogsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractLogs update
   */
  export type ContractLogsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * The data needed to update a ContractLogs.
     */
    data: XOR<ContractLogsUpdateInput, ContractLogsUncheckedUpdateInput>
    /**
     * Choose, which ContractLogs to update.
     */
    where: ContractLogsWhereUniqueInput
  }

  /**
   * ContractLogs updateMany
   */
  export type ContractLogsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractLogs.
     */
    data: XOR<ContractLogsUpdateManyMutationInput, ContractLogsUncheckedUpdateManyInput>
    /**
     * Filter which ContractLogs to update
     */
    where?: ContractLogsWhereInput
    /**
     * Limit how many ContractLogs to update.
     */
    limit?: number
  }

  /**
   * ContractLogs updateManyAndReturn
   */
  export type ContractLogsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * The data used to update ContractLogs.
     */
    data: XOR<ContractLogsUpdateManyMutationInput, ContractLogsUncheckedUpdateManyInput>
    /**
     * Filter which ContractLogs to update
     */
    where?: ContractLogsWhereInput
    /**
     * Limit how many ContractLogs to update.
     */
    limit?: number
  }

  /**
   * ContractLogs upsert
   */
  export type ContractLogsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * The filter to search for the ContractLogs to update in case it exists.
     */
    where: ContractLogsWhereUniqueInput
    /**
     * In case the ContractLogs found by the `where` argument doesn't exist, create a new ContractLogs with this data.
     */
    create: XOR<ContractLogsCreateInput, ContractLogsUncheckedCreateInput>
    /**
     * In case the ContractLogs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractLogsUpdateInput, ContractLogsUncheckedUpdateInput>
  }

  /**
   * ContractLogs delete
   */
  export type ContractLogsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
    /**
     * Filter which ContractLogs to delete.
     */
    where: ContractLogsWhereUniqueInput
  }

  /**
   * ContractLogs deleteMany
   */
  export type ContractLogsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractLogs to delete
     */
    where?: ContractLogsWhereInput
    /**
     * Limit how many ContractLogs to delete.
     */
    limit?: number
  }

  /**
   * ContractLogs without action
   */
  export type ContractLogsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractLogs
     */
    select?: ContractLogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractLogs
     */
    omit?: ContractLogsOmit<ExtArgs> | null
  }


  /**
   * Model NFTs
   */

  export type AggregateNFTs = {
    _count: NFTsCountAggregateOutputType | null
    _min: NFTsMinAggregateOutputType | null
    _max: NFTsMaxAggregateOutputType | null
  }

  export type NFTsMinAggregateOutputType = {
    id: string | null
    contractId: string | null
    contractAddress: string | null
    tokenId: string | null
    tokenUri: string | null
    metadataUpdated: boolean | null
    lastMetadataSyncTime: Date | null
    name: string | null
    description: string | null
    image: string | null
    externalUrl: string | null
  }

  export type NFTsMaxAggregateOutputType = {
    id: string | null
    contractId: string | null
    contractAddress: string | null
    tokenId: string | null
    tokenUri: string | null
    metadataUpdated: boolean | null
    lastMetadataSyncTime: Date | null
    name: string | null
    description: string | null
    image: string | null
    externalUrl: string | null
  }

  export type NFTsCountAggregateOutputType = {
    id: number
    contractId: number
    contractAddress: number
    tokenId: number
    tokenUri: number
    metadataUpdated: number
    lastMetadataSyncTime: number
    name: number
    description: number
    image: number
    externalUrl: number
    attributes: number
    raw: number
    _all: number
  }


  export type NFTsMinAggregateInputType = {
    id?: true
    contractId?: true
    contractAddress?: true
    tokenId?: true
    tokenUri?: true
    metadataUpdated?: true
    lastMetadataSyncTime?: true
    name?: true
    description?: true
    image?: true
    externalUrl?: true
  }

  export type NFTsMaxAggregateInputType = {
    id?: true
    contractId?: true
    contractAddress?: true
    tokenId?: true
    tokenUri?: true
    metadataUpdated?: true
    lastMetadataSyncTime?: true
    name?: true
    description?: true
    image?: true
    externalUrl?: true
  }

  export type NFTsCountAggregateInputType = {
    id?: true
    contractId?: true
    contractAddress?: true
    tokenId?: true
    tokenUri?: true
    metadataUpdated?: true
    lastMetadataSyncTime?: true
    name?: true
    description?: true
    image?: true
    externalUrl?: true
    attributes?: true
    raw?: true
    _all?: true
  }

  export type NFTsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NFTs to aggregate.
     */
    where?: NFTsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTs to fetch.
     */
    orderBy?: NFTsOrderByWithRelationInput | NFTsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NFTsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NFTs
    **/
    _count?: true | NFTsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NFTsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NFTsMaxAggregateInputType
  }

  export type GetNFTsAggregateType<T extends NFTsAggregateArgs> = {
        [P in keyof T & keyof AggregateNFTs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNFTs[P]>
      : GetScalarType<T[P], AggregateNFTs[P]>
  }




  export type NFTsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NFTsWhereInput
    orderBy?: NFTsOrderByWithAggregationInput | NFTsOrderByWithAggregationInput[]
    by: NFTsScalarFieldEnum[] | NFTsScalarFieldEnum
    having?: NFTsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NFTsCountAggregateInputType | true
    _min?: NFTsMinAggregateInputType
    _max?: NFTsMaxAggregateInputType
  }

  export type NFTsGroupByOutputType = {
    id: string
    contractId: string
    contractAddress: string
    tokenId: string
    tokenUri: string | null
    metadataUpdated: boolean
    lastMetadataSyncTime: Date | null
    name: string | null
    description: string | null
    image: string | null
    externalUrl: string | null
    attributes: JsonValue | null
    raw: JsonValue | null
    _count: NFTsCountAggregateOutputType | null
    _min: NFTsMinAggregateOutputType | null
    _max: NFTsMaxAggregateOutputType | null
  }

  type GetNFTsGroupByPayload<T extends NFTsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NFTsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NFTsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NFTsGroupByOutputType[P]>
            : GetScalarType<T[P], NFTsGroupByOutputType[P]>
        }
      >
    >


  export type NFTsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    tokenUri?: boolean
    metadataUpdated?: boolean
    lastMetadataSyncTime?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    externalUrl?: boolean
    attributes?: boolean
    raw?: boolean
    NFTOwners?: boolean | NFTs$NFTOwnersArgs<ExtArgs>
    _count?: boolean | NFTsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nFTs"]>

  export type NFTsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    tokenUri?: boolean
    metadataUpdated?: boolean
    lastMetadataSyncTime?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    externalUrl?: boolean
    attributes?: boolean
    raw?: boolean
  }, ExtArgs["result"]["nFTs"]>

  export type NFTsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    tokenUri?: boolean
    metadataUpdated?: boolean
    lastMetadataSyncTime?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    externalUrl?: boolean
    attributes?: boolean
    raw?: boolean
  }, ExtArgs["result"]["nFTs"]>

  export type NFTsSelectScalar = {
    id?: boolean
    contractId?: boolean
    contractAddress?: boolean
    tokenId?: boolean
    tokenUri?: boolean
    metadataUpdated?: boolean
    lastMetadataSyncTime?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    externalUrl?: boolean
    attributes?: boolean
    raw?: boolean
  }

  export type NFTsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contractId" | "contractAddress" | "tokenId" | "tokenUri" | "metadataUpdated" | "lastMetadataSyncTime" | "name" | "description" | "image" | "externalUrl" | "attributes" | "raw", ExtArgs["result"]["nFTs"]>
  export type NFTsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    NFTOwners?: boolean | NFTs$NFTOwnersArgs<ExtArgs>
    _count?: boolean | NFTsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NFTsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NFTsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NFTsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NFTs"
    objects: {
      NFTOwners: Prisma.$NFTOwnersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contractId: string
      contractAddress: string
      tokenId: string
      tokenUri: string | null
      metadataUpdated: boolean
      lastMetadataSyncTime: Date | null
      name: string | null
      description: string | null
      image: string | null
      externalUrl: string | null
      attributes: Prisma.JsonValue | null
      raw: Prisma.JsonValue | null
    }, ExtArgs["result"]["nFTs"]>
    composites: {}
  }

  type NFTsGetPayload<S extends boolean | null | undefined | NFTsDefaultArgs> = $Result.GetResult<Prisma.$NFTsPayload, S>

  type NFTsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NFTsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NFTsCountAggregateInputType | true
    }

  export interface NFTsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NFTs'], meta: { name: 'NFTs' } }
    /**
     * Find zero or one NFTs that matches the filter.
     * @param {NFTsFindUniqueArgs} args - Arguments to find a NFTs
     * @example
     * // Get one NFTs
     * const nFTs = await prisma.nFTs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NFTsFindUniqueArgs>(args: SelectSubset<T, NFTsFindUniqueArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NFTs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NFTsFindUniqueOrThrowArgs} args - Arguments to find a NFTs
     * @example
     * // Get one NFTs
     * const nFTs = await prisma.nFTs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NFTsFindUniqueOrThrowArgs>(args: SelectSubset<T, NFTsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NFTs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTsFindFirstArgs} args - Arguments to find a NFTs
     * @example
     * // Get one NFTs
     * const nFTs = await prisma.nFTs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NFTsFindFirstArgs>(args?: SelectSubset<T, NFTsFindFirstArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NFTs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTsFindFirstOrThrowArgs} args - Arguments to find a NFTs
     * @example
     * // Get one NFTs
     * const nFTs = await prisma.nFTs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NFTsFindFirstOrThrowArgs>(args?: SelectSubset<T, NFTsFindFirstOrThrowArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NFTs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NFTs
     * const nFTs = await prisma.nFTs.findMany()
     * 
     * // Get first 10 NFTs
     * const nFTs = await prisma.nFTs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nFTsWithIdOnly = await prisma.nFTs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NFTsFindManyArgs>(args?: SelectSubset<T, NFTsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NFTs.
     * @param {NFTsCreateArgs} args - Arguments to create a NFTs.
     * @example
     * // Create one NFTs
     * const NFTs = await prisma.nFTs.create({
     *   data: {
     *     // ... data to create a NFTs
     *   }
     * })
     * 
     */
    create<T extends NFTsCreateArgs>(args: SelectSubset<T, NFTsCreateArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NFTs.
     * @param {NFTsCreateManyArgs} args - Arguments to create many NFTs.
     * @example
     * // Create many NFTs
     * const nFTs = await prisma.nFTs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NFTsCreateManyArgs>(args?: SelectSubset<T, NFTsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NFTs and returns the data saved in the database.
     * @param {NFTsCreateManyAndReturnArgs} args - Arguments to create many NFTs.
     * @example
     * // Create many NFTs
     * const nFTs = await prisma.nFTs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NFTs and only return the `id`
     * const nFTsWithIdOnly = await prisma.nFTs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NFTsCreateManyAndReturnArgs>(args?: SelectSubset<T, NFTsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NFTs.
     * @param {NFTsDeleteArgs} args - Arguments to delete one NFTs.
     * @example
     * // Delete one NFTs
     * const NFTs = await prisma.nFTs.delete({
     *   where: {
     *     // ... filter to delete one NFTs
     *   }
     * })
     * 
     */
    delete<T extends NFTsDeleteArgs>(args: SelectSubset<T, NFTsDeleteArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NFTs.
     * @param {NFTsUpdateArgs} args - Arguments to update one NFTs.
     * @example
     * // Update one NFTs
     * const nFTs = await prisma.nFTs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NFTsUpdateArgs>(args: SelectSubset<T, NFTsUpdateArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NFTs.
     * @param {NFTsDeleteManyArgs} args - Arguments to filter NFTs to delete.
     * @example
     * // Delete a few NFTs
     * const { count } = await prisma.nFTs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NFTsDeleteManyArgs>(args?: SelectSubset<T, NFTsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NFTs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NFTs
     * const nFTs = await prisma.nFTs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NFTsUpdateManyArgs>(args: SelectSubset<T, NFTsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NFTs and returns the data updated in the database.
     * @param {NFTsUpdateManyAndReturnArgs} args - Arguments to update many NFTs.
     * @example
     * // Update many NFTs
     * const nFTs = await prisma.nFTs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NFTs and only return the `id`
     * const nFTsWithIdOnly = await prisma.nFTs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NFTsUpdateManyAndReturnArgs>(args: SelectSubset<T, NFTsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NFTs.
     * @param {NFTsUpsertArgs} args - Arguments to update or create a NFTs.
     * @example
     * // Update or create a NFTs
     * const nFTs = await prisma.nFTs.upsert({
     *   create: {
     *     // ... data to create a NFTs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NFTs we want to update
     *   }
     * })
     */
    upsert<T extends NFTsUpsertArgs>(args: SelectSubset<T, NFTsUpsertArgs<ExtArgs>>): Prisma__NFTsClient<$Result.GetResult<Prisma.$NFTsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NFTs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTsCountArgs} args - Arguments to filter NFTs to count.
     * @example
     * // Count the number of NFTs
     * const count = await prisma.nFTs.count({
     *   where: {
     *     // ... the filter for the NFTs we want to count
     *   }
     * })
    **/
    count<T extends NFTsCountArgs>(
      args?: Subset<T, NFTsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NFTsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NFTs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NFTsAggregateArgs>(args: Subset<T, NFTsAggregateArgs>): Prisma.PrismaPromise<GetNFTsAggregateType<T>>

    /**
     * Group by NFTs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NFTsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NFTsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NFTsGroupByArgs['orderBy'] }
        : { orderBy?: NFTsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NFTsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNFTsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NFTs model
   */
  readonly fields: NFTsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NFTs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NFTsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    NFTOwners<T extends NFTs$NFTOwnersArgs<ExtArgs> = {}>(args?: Subset<T, NFTs$NFTOwnersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NFTOwnersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NFTs model
   */
  interface NFTsFieldRefs {
    readonly id: FieldRef<"NFTs", 'String'>
    readonly contractId: FieldRef<"NFTs", 'String'>
    readonly contractAddress: FieldRef<"NFTs", 'String'>
    readonly tokenId: FieldRef<"NFTs", 'String'>
    readonly tokenUri: FieldRef<"NFTs", 'String'>
    readonly metadataUpdated: FieldRef<"NFTs", 'Boolean'>
    readonly lastMetadataSyncTime: FieldRef<"NFTs", 'DateTime'>
    readonly name: FieldRef<"NFTs", 'String'>
    readonly description: FieldRef<"NFTs", 'String'>
    readonly image: FieldRef<"NFTs", 'String'>
    readonly externalUrl: FieldRef<"NFTs", 'String'>
    readonly attributes: FieldRef<"NFTs", 'Json'>
    readonly raw: FieldRef<"NFTs", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * NFTs findUnique
   */
  export type NFTsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * Filter, which NFTs to fetch.
     */
    where: NFTsWhereUniqueInput
  }

  /**
   * NFTs findUniqueOrThrow
   */
  export type NFTsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * Filter, which NFTs to fetch.
     */
    where: NFTsWhereUniqueInput
  }

  /**
   * NFTs findFirst
   */
  export type NFTsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * Filter, which NFTs to fetch.
     */
    where?: NFTsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTs to fetch.
     */
    orderBy?: NFTsOrderByWithRelationInput | NFTsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NFTs.
     */
    cursor?: NFTsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NFTs.
     */
    distinct?: NFTsScalarFieldEnum | NFTsScalarFieldEnum[]
  }

  /**
   * NFTs findFirstOrThrow
   */
  export type NFTsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * Filter, which NFTs to fetch.
     */
    where?: NFTsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTs to fetch.
     */
    orderBy?: NFTsOrderByWithRelationInput | NFTsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NFTs.
     */
    cursor?: NFTsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NFTs.
     */
    distinct?: NFTsScalarFieldEnum | NFTsScalarFieldEnum[]
  }

  /**
   * NFTs findMany
   */
  export type NFTsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * Filter, which NFTs to fetch.
     */
    where?: NFTsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NFTs to fetch.
     */
    orderBy?: NFTsOrderByWithRelationInput | NFTsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NFTs.
     */
    cursor?: NFTsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NFTs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NFTs.
     */
    skip?: number
    distinct?: NFTsScalarFieldEnum | NFTsScalarFieldEnum[]
  }

  /**
   * NFTs create
   */
  export type NFTsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * The data needed to create a NFTs.
     */
    data: XOR<NFTsCreateInput, NFTsUncheckedCreateInput>
  }

  /**
   * NFTs createMany
   */
  export type NFTsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NFTs.
     */
    data: NFTsCreateManyInput | NFTsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NFTs createManyAndReturn
   */
  export type NFTsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * The data used to create many NFTs.
     */
    data: NFTsCreateManyInput | NFTsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NFTs update
   */
  export type NFTsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * The data needed to update a NFTs.
     */
    data: XOR<NFTsUpdateInput, NFTsUncheckedUpdateInput>
    /**
     * Choose, which NFTs to update.
     */
    where: NFTsWhereUniqueInput
  }

  /**
   * NFTs updateMany
   */
  export type NFTsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NFTs.
     */
    data: XOR<NFTsUpdateManyMutationInput, NFTsUncheckedUpdateManyInput>
    /**
     * Filter which NFTs to update
     */
    where?: NFTsWhereInput
    /**
     * Limit how many NFTs to update.
     */
    limit?: number
  }

  /**
   * NFTs updateManyAndReturn
   */
  export type NFTsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * The data used to update NFTs.
     */
    data: XOR<NFTsUpdateManyMutationInput, NFTsUncheckedUpdateManyInput>
    /**
     * Filter which NFTs to update
     */
    where?: NFTsWhereInput
    /**
     * Limit how many NFTs to update.
     */
    limit?: number
  }

  /**
   * NFTs upsert
   */
  export type NFTsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * The filter to search for the NFTs to update in case it exists.
     */
    where: NFTsWhereUniqueInput
    /**
     * In case the NFTs found by the `where` argument doesn't exist, create a new NFTs with this data.
     */
    create: XOR<NFTsCreateInput, NFTsUncheckedCreateInput>
    /**
     * In case the NFTs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NFTsUpdateInput, NFTsUncheckedUpdateInput>
  }

  /**
   * NFTs delete
   */
  export type NFTsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
    /**
     * Filter which NFTs to delete.
     */
    where: NFTsWhereUniqueInput
  }

  /**
   * NFTs deleteMany
   */
  export type NFTsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NFTs to delete
     */
    where?: NFTsWhereInput
    /**
     * Limit how many NFTs to delete.
     */
    limit?: number
  }

  /**
   * NFTs.NFTOwners
   */
  export type NFTs$NFTOwnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTOwners
     */
    select?: NFTOwnersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTOwners
     */
    omit?: NFTOwnersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTOwnersInclude<ExtArgs> | null
    where?: NFTOwnersWhereInput
    orderBy?: NFTOwnersOrderByWithRelationInput | NFTOwnersOrderByWithRelationInput[]
    cursor?: NFTOwnersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NFTOwnersScalarFieldEnum | NFTOwnersScalarFieldEnum[]
  }

  /**
   * NFTs without action
   */
  export type NFTsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NFTs
     */
    select?: NFTsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NFTs
     */
    omit?: NFTsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NFTsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BlockchainConfigsScalarFieldEnum: {
    id: 'id',
    chainId: 'chainId',
    rpcUrlBase: 'rpcUrlBase',
    rpcUrlAlter: 'rpcUrlAlter'
  };

  export type BlockchainConfigsScalarFieldEnum = (typeof BlockchainConfigsScalarFieldEnum)[keyof typeof BlockchainConfigsScalarFieldEnum]


  export const BlockchainContractsScalarFieldEnum: {
    id: 'id',
    contractAddress: 'contractAddress',
    contractType: 'contractType',
    chainId: 'chainId',
    lastSyncBlock: 'lastSyncBlock',
    lastSyncTime: 'lastSyncTime'
  };

  export type BlockchainContractsScalarFieldEnum = (typeof BlockchainContractsScalarFieldEnum)[keyof typeof BlockchainContractsScalarFieldEnum]


  export const NFTOwnersScalarFieldEnum: {
    id: 'id',
    contractId: 'contractId',
    ownerAddress: 'ownerAddress',
    contractAddress: 'contractAddress',
    tokenId: 'tokenId',
    count: 'count',
    lastTransactionHash: 'lastTransactionHash',
    lastSyncTime: 'lastSyncTime'
  };

  export type NFTOwnersScalarFieldEnum = (typeof NFTOwnersScalarFieldEnum)[keyof typeof NFTOwnersScalarFieldEnum]


  export const ContractLogsScalarFieldEnum: {
    id: 'id',
    contractId: 'contractId',
    chainId: 'chainId',
    contractAddress: 'contractAddress',
    blockNumber: 'blockNumber',
    transactionHash: 'transactionHash',
    logIndex: 'logIndex',
    eventType: 'eventType',
    fromAddress: 'fromAddress',
    toAddress: 'toAddress',
    operatorAddress: 'operatorAddress',
    tokenId: 'tokenId',
    value: 'value',
    loggedAt: 'loggedAt'
  };

  export type ContractLogsScalarFieldEnum = (typeof ContractLogsScalarFieldEnum)[keyof typeof ContractLogsScalarFieldEnum]


  export const NFTsScalarFieldEnum: {
    id: 'id',
    contractId: 'contractId',
    contractAddress: 'contractAddress',
    tokenId: 'tokenId',
    tokenUri: 'tokenUri',
    metadataUpdated: 'metadataUpdated',
    lastMetadataSyncTime: 'lastMetadataSyncTime',
    name: 'name',
    description: 'description',
    image: 'image',
    externalUrl: 'externalUrl',
    attributes: 'attributes',
    raw: 'raw'
  };

  export type NFTsScalarFieldEnum = (typeof NFTsScalarFieldEnum)[keyof typeof NFTsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BlockchainConfigsWhereInput = {
    AND?: BlockchainConfigsWhereInput | BlockchainConfigsWhereInput[]
    OR?: BlockchainConfigsWhereInput[]
    NOT?: BlockchainConfigsWhereInput | BlockchainConfigsWhereInput[]
    id?: UuidFilter<"BlockchainConfigs"> | string
    chainId?: IntFilter<"BlockchainConfigs"> | number
    rpcUrlBase?: StringFilter<"BlockchainConfigs"> | string
    rpcUrlAlter?: StringNullableFilter<"BlockchainConfigs"> | string | null
  }

  export type BlockchainConfigsOrderByWithRelationInput = {
    id?: SortOrder
    chainId?: SortOrder
    rpcUrlBase?: SortOrder
    rpcUrlAlter?: SortOrderInput | SortOrder
  }

  export type BlockchainConfigsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chainId?: number
    AND?: BlockchainConfigsWhereInput | BlockchainConfigsWhereInput[]
    OR?: BlockchainConfigsWhereInput[]
    NOT?: BlockchainConfigsWhereInput | BlockchainConfigsWhereInput[]
    rpcUrlBase?: StringFilter<"BlockchainConfigs"> | string
    rpcUrlAlter?: StringNullableFilter<"BlockchainConfigs"> | string | null
  }, "id" | "chainId">

  export type BlockchainConfigsOrderByWithAggregationInput = {
    id?: SortOrder
    chainId?: SortOrder
    rpcUrlBase?: SortOrder
    rpcUrlAlter?: SortOrderInput | SortOrder
    _count?: BlockchainConfigsCountOrderByAggregateInput
    _avg?: BlockchainConfigsAvgOrderByAggregateInput
    _max?: BlockchainConfigsMaxOrderByAggregateInput
    _min?: BlockchainConfigsMinOrderByAggregateInput
    _sum?: BlockchainConfigsSumOrderByAggregateInput
  }

  export type BlockchainConfigsScalarWhereWithAggregatesInput = {
    AND?: BlockchainConfigsScalarWhereWithAggregatesInput | BlockchainConfigsScalarWhereWithAggregatesInput[]
    OR?: BlockchainConfigsScalarWhereWithAggregatesInput[]
    NOT?: BlockchainConfigsScalarWhereWithAggregatesInput | BlockchainConfigsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BlockchainConfigs"> | string
    chainId?: IntWithAggregatesFilter<"BlockchainConfigs"> | number
    rpcUrlBase?: StringWithAggregatesFilter<"BlockchainConfigs"> | string
    rpcUrlAlter?: StringNullableWithAggregatesFilter<"BlockchainConfigs"> | string | null
  }

  export type BlockchainContractsWhereInput = {
    AND?: BlockchainContractsWhereInput | BlockchainContractsWhereInput[]
    OR?: BlockchainContractsWhereInput[]
    NOT?: BlockchainContractsWhereInput | BlockchainContractsWhereInput[]
    id?: UuidFilter<"BlockchainContracts"> | string
    contractAddress?: StringFilter<"BlockchainContracts"> | string
    contractType?: StringFilter<"BlockchainContracts"> | string
    chainId?: IntFilter<"BlockchainContracts"> | number
    lastSyncBlock?: StringNullableFilter<"BlockchainContracts"> | string | null
    lastSyncTime?: DateTimeNullableFilter<"BlockchainContracts"> | Date | string | null
  }

  export type BlockchainContractsOrderByWithRelationInput = {
    id?: SortOrder
    contractAddress?: SortOrder
    contractType?: SortOrder
    chainId?: SortOrder
    lastSyncBlock?: SortOrderInput | SortOrder
    lastSyncTime?: SortOrderInput | SortOrder
  }

  export type BlockchainContractsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractAddress?: string
    AND?: BlockchainContractsWhereInput | BlockchainContractsWhereInput[]
    OR?: BlockchainContractsWhereInput[]
    NOT?: BlockchainContractsWhereInput | BlockchainContractsWhereInput[]
    contractType?: StringFilter<"BlockchainContracts"> | string
    chainId?: IntFilter<"BlockchainContracts"> | number
    lastSyncBlock?: StringNullableFilter<"BlockchainContracts"> | string | null
    lastSyncTime?: DateTimeNullableFilter<"BlockchainContracts"> | Date | string | null
  }, "id" | "contractAddress">

  export type BlockchainContractsOrderByWithAggregationInput = {
    id?: SortOrder
    contractAddress?: SortOrder
    contractType?: SortOrder
    chainId?: SortOrder
    lastSyncBlock?: SortOrderInput | SortOrder
    lastSyncTime?: SortOrderInput | SortOrder
    _count?: BlockchainContractsCountOrderByAggregateInput
    _avg?: BlockchainContractsAvgOrderByAggregateInput
    _max?: BlockchainContractsMaxOrderByAggregateInput
    _min?: BlockchainContractsMinOrderByAggregateInput
    _sum?: BlockchainContractsSumOrderByAggregateInput
  }

  export type BlockchainContractsScalarWhereWithAggregatesInput = {
    AND?: BlockchainContractsScalarWhereWithAggregatesInput | BlockchainContractsScalarWhereWithAggregatesInput[]
    OR?: BlockchainContractsScalarWhereWithAggregatesInput[]
    NOT?: BlockchainContractsScalarWhereWithAggregatesInput | BlockchainContractsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BlockchainContracts"> | string
    contractAddress?: StringWithAggregatesFilter<"BlockchainContracts"> | string
    contractType?: StringWithAggregatesFilter<"BlockchainContracts"> | string
    chainId?: IntWithAggregatesFilter<"BlockchainContracts"> | number
    lastSyncBlock?: StringNullableWithAggregatesFilter<"BlockchainContracts"> | string | null
    lastSyncTime?: DateTimeNullableWithAggregatesFilter<"BlockchainContracts"> | Date | string | null
  }

  export type NFTOwnersWhereInput = {
    AND?: NFTOwnersWhereInput | NFTOwnersWhereInput[]
    OR?: NFTOwnersWhereInput[]
    NOT?: NFTOwnersWhereInput | NFTOwnersWhereInput[]
    id?: UuidFilter<"NFTOwners"> | string
    contractId?: UuidFilter<"NFTOwners"> | string
    ownerAddress?: StringFilter<"NFTOwners"> | string
    contractAddress?: StringFilter<"NFTOwners"> | string
    tokenId?: StringFilter<"NFTOwners"> | string
    count?: IntFilter<"NFTOwners"> | number
    lastTransactionHash?: StringNullableFilter<"NFTOwners"> | string | null
    lastSyncTime?: DateTimeNullableFilter<"NFTOwners"> | Date | string | null
    nft?: XOR<NFTsNullableScalarRelationFilter, NFTsWhereInput> | null
  }

  export type NFTOwnersOrderByWithRelationInput = {
    id?: SortOrder
    contractId?: SortOrder
    ownerAddress?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    count?: SortOrder
    lastTransactionHash?: SortOrderInput | SortOrder
    lastSyncTime?: SortOrderInput | SortOrder
    nft?: NFTsOrderByWithRelationInput
  }

  export type NFTOwnersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NFTOwnersWhereInput | NFTOwnersWhereInput[]
    OR?: NFTOwnersWhereInput[]
    NOT?: NFTOwnersWhereInput | NFTOwnersWhereInput[]
    contractId?: UuidFilter<"NFTOwners"> | string
    ownerAddress?: StringFilter<"NFTOwners"> | string
    contractAddress?: StringFilter<"NFTOwners"> | string
    tokenId?: StringFilter<"NFTOwners"> | string
    count?: IntFilter<"NFTOwners"> | number
    lastTransactionHash?: StringNullableFilter<"NFTOwners"> | string | null
    lastSyncTime?: DateTimeNullableFilter<"NFTOwners"> | Date | string | null
    nft?: XOR<NFTsNullableScalarRelationFilter, NFTsWhereInput> | null
  }, "id">

  export type NFTOwnersOrderByWithAggregationInput = {
    id?: SortOrder
    contractId?: SortOrder
    ownerAddress?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    count?: SortOrder
    lastTransactionHash?: SortOrderInput | SortOrder
    lastSyncTime?: SortOrderInput | SortOrder
    _count?: NFTOwnersCountOrderByAggregateInput
    _avg?: NFTOwnersAvgOrderByAggregateInput
    _max?: NFTOwnersMaxOrderByAggregateInput
    _min?: NFTOwnersMinOrderByAggregateInput
    _sum?: NFTOwnersSumOrderByAggregateInput
  }

  export type NFTOwnersScalarWhereWithAggregatesInput = {
    AND?: NFTOwnersScalarWhereWithAggregatesInput | NFTOwnersScalarWhereWithAggregatesInput[]
    OR?: NFTOwnersScalarWhereWithAggregatesInput[]
    NOT?: NFTOwnersScalarWhereWithAggregatesInput | NFTOwnersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"NFTOwners"> | string
    contractId?: UuidWithAggregatesFilter<"NFTOwners"> | string
    ownerAddress?: StringWithAggregatesFilter<"NFTOwners"> | string
    contractAddress?: StringWithAggregatesFilter<"NFTOwners"> | string
    tokenId?: StringWithAggregatesFilter<"NFTOwners"> | string
    count?: IntWithAggregatesFilter<"NFTOwners"> | number
    lastTransactionHash?: StringNullableWithAggregatesFilter<"NFTOwners"> | string | null
    lastSyncTime?: DateTimeNullableWithAggregatesFilter<"NFTOwners"> | Date | string | null
  }

  export type ContractLogsWhereInput = {
    AND?: ContractLogsWhereInput | ContractLogsWhereInput[]
    OR?: ContractLogsWhereInput[]
    NOT?: ContractLogsWhereInput | ContractLogsWhereInput[]
    id?: UuidFilter<"ContractLogs"> | string
    contractId?: UuidFilter<"ContractLogs"> | string
    chainId?: IntFilter<"ContractLogs"> | number
    contractAddress?: StringFilter<"ContractLogs"> | string
    blockNumber?: StringFilter<"ContractLogs"> | string
    transactionHash?: StringFilter<"ContractLogs"> | string
    logIndex?: IntFilter<"ContractLogs"> | number
    eventType?: StringFilter<"ContractLogs"> | string
    fromAddress?: StringNullableFilter<"ContractLogs"> | string | null
    toAddress?: StringNullableFilter<"ContractLogs"> | string | null
    operatorAddress?: StringNullableFilter<"ContractLogs"> | string | null
    tokenId?: StringNullableFilter<"ContractLogs"> | string | null
    value?: StringNullableFilter<"ContractLogs"> | string | null
    loggedAt?: DateTimeFilter<"ContractLogs"> | Date | string
  }

  export type ContractLogsOrderByWithRelationInput = {
    id?: SortOrder
    contractId?: SortOrder
    chainId?: SortOrder
    contractAddress?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    logIndex?: SortOrder
    eventType?: SortOrder
    fromAddress?: SortOrderInput | SortOrder
    toAddress?: SortOrderInput | SortOrder
    operatorAddress?: SortOrderInput | SortOrder
    tokenId?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    loggedAt?: SortOrder
  }

  export type ContractLogsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionHash_logIndex?: ContractLogsTransactionHashLogIndexCompoundUniqueInput
    AND?: ContractLogsWhereInput | ContractLogsWhereInput[]
    OR?: ContractLogsWhereInput[]
    NOT?: ContractLogsWhereInput | ContractLogsWhereInput[]
    contractId?: UuidFilter<"ContractLogs"> | string
    chainId?: IntFilter<"ContractLogs"> | number
    contractAddress?: StringFilter<"ContractLogs"> | string
    blockNumber?: StringFilter<"ContractLogs"> | string
    transactionHash?: StringFilter<"ContractLogs"> | string
    logIndex?: IntFilter<"ContractLogs"> | number
    eventType?: StringFilter<"ContractLogs"> | string
    fromAddress?: StringNullableFilter<"ContractLogs"> | string | null
    toAddress?: StringNullableFilter<"ContractLogs"> | string | null
    operatorAddress?: StringNullableFilter<"ContractLogs"> | string | null
    tokenId?: StringNullableFilter<"ContractLogs"> | string | null
    value?: StringNullableFilter<"ContractLogs"> | string | null
    loggedAt?: DateTimeFilter<"ContractLogs"> | Date | string
  }, "id" | "transactionHash_logIndex">

  export type ContractLogsOrderByWithAggregationInput = {
    id?: SortOrder
    contractId?: SortOrder
    chainId?: SortOrder
    contractAddress?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    logIndex?: SortOrder
    eventType?: SortOrder
    fromAddress?: SortOrderInput | SortOrder
    toAddress?: SortOrderInput | SortOrder
    operatorAddress?: SortOrderInput | SortOrder
    tokenId?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    loggedAt?: SortOrder
    _count?: ContractLogsCountOrderByAggregateInput
    _avg?: ContractLogsAvgOrderByAggregateInput
    _max?: ContractLogsMaxOrderByAggregateInput
    _min?: ContractLogsMinOrderByAggregateInput
    _sum?: ContractLogsSumOrderByAggregateInput
  }

  export type ContractLogsScalarWhereWithAggregatesInput = {
    AND?: ContractLogsScalarWhereWithAggregatesInput | ContractLogsScalarWhereWithAggregatesInput[]
    OR?: ContractLogsScalarWhereWithAggregatesInput[]
    NOT?: ContractLogsScalarWhereWithAggregatesInput | ContractLogsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ContractLogs"> | string
    contractId?: UuidWithAggregatesFilter<"ContractLogs"> | string
    chainId?: IntWithAggregatesFilter<"ContractLogs"> | number
    contractAddress?: StringWithAggregatesFilter<"ContractLogs"> | string
    blockNumber?: StringWithAggregatesFilter<"ContractLogs"> | string
    transactionHash?: StringWithAggregatesFilter<"ContractLogs"> | string
    logIndex?: IntWithAggregatesFilter<"ContractLogs"> | number
    eventType?: StringWithAggregatesFilter<"ContractLogs"> | string
    fromAddress?: StringNullableWithAggregatesFilter<"ContractLogs"> | string | null
    toAddress?: StringNullableWithAggregatesFilter<"ContractLogs"> | string | null
    operatorAddress?: StringNullableWithAggregatesFilter<"ContractLogs"> | string | null
    tokenId?: StringNullableWithAggregatesFilter<"ContractLogs"> | string | null
    value?: StringNullableWithAggregatesFilter<"ContractLogs"> | string | null
    loggedAt?: DateTimeWithAggregatesFilter<"ContractLogs"> | Date | string
  }

  export type NFTsWhereInput = {
    AND?: NFTsWhereInput | NFTsWhereInput[]
    OR?: NFTsWhereInput[]
    NOT?: NFTsWhereInput | NFTsWhereInput[]
    id?: UuidFilter<"NFTs"> | string
    contractId?: UuidFilter<"NFTs"> | string
    contractAddress?: StringFilter<"NFTs"> | string
    tokenId?: StringFilter<"NFTs"> | string
    tokenUri?: StringNullableFilter<"NFTs"> | string | null
    metadataUpdated?: BoolFilter<"NFTs"> | boolean
    lastMetadataSyncTime?: DateTimeNullableFilter<"NFTs"> | Date | string | null
    name?: StringNullableFilter<"NFTs"> | string | null
    description?: StringNullableFilter<"NFTs"> | string | null
    image?: StringNullableFilter<"NFTs"> | string | null
    externalUrl?: StringNullableFilter<"NFTs"> | string | null
    attributes?: JsonNullableFilter<"NFTs">
    raw?: JsonNullableFilter<"NFTs">
    NFTOwners?: NFTOwnersListRelationFilter
  }

  export type NFTsOrderByWithRelationInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    tokenUri?: SortOrderInput | SortOrder
    metadataUpdated?: SortOrder
    lastMetadataSyncTime?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    externalUrl?: SortOrderInput | SortOrder
    attributes?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    NFTOwners?: NFTOwnersOrderByRelationAggregateInput
  }

  export type NFTsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractAddress_tokenId?: NFTsContractAddressTokenIdCompoundUniqueInput
    AND?: NFTsWhereInput | NFTsWhereInput[]
    OR?: NFTsWhereInput[]
    NOT?: NFTsWhereInput | NFTsWhereInput[]
    contractId?: UuidFilter<"NFTs"> | string
    contractAddress?: StringFilter<"NFTs"> | string
    tokenId?: StringFilter<"NFTs"> | string
    tokenUri?: StringNullableFilter<"NFTs"> | string | null
    metadataUpdated?: BoolFilter<"NFTs"> | boolean
    lastMetadataSyncTime?: DateTimeNullableFilter<"NFTs"> | Date | string | null
    name?: StringNullableFilter<"NFTs"> | string | null
    description?: StringNullableFilter<"NFTs"> | string | null
    image?: StringNullableFilter<"NFTs"> | string | null
    externalUrl?: StringNullableFilter<"NFTs"> | string | null
    attributes?: JsonNullableFilter<"NFTs">
    raw?: JsonNullableFilter<"NFTs">
    NFTOwners?: NFTOwnersListRelationFilter
  }, "id" | "contractAddress_tokenId">

  export type NFTsOrderByWithAggregationInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    tokenUri?: SortOrderInput | SortOrder
    metadataUpdated?: SortOrder
    lastMetadataSyncTime?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    externalUrl?: SortOrderInput | SortOrder
    attributes?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    _count?: NFTsCountOrderByAggregateInput
    _max?: NFTsMaxOrderByAggregateInput
    _min?: NFTsMinOrderByAggregateInput
  }

  export type NFTsScalarWhereWithAggregatesInput = {
    AND?: NFTsScalarWhereWithAggregatesInput | NFTsScalarWhereWithAggregatesInput[]
    OR?: NFTsScalarWhereWithAggregatesInput[]
    NOT?: NFTsScalarWhereWithAggregatesInput | NFTsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"NFTs"> | string
    contractId?: UuidWithAggregatesFilter<"NFTs"> | string
    contractAddress?: StringWithAggregatesFilter<"NFTs"> | string
    tokenId?: StringWithAggregatesFilter<"NFTs"> | string
    tokenUri?: StringNullableWithAggregatesFilter<"NFTs"> | string | null
    metadataUpdated?: BoolWithAggregatesFilter<"NFTs"> | boolean
    lastMetadataSyncTime?: DateTimeNullableWithAggregatesFilter<"NFTs"> | Date | string | null
    name?: StringNullableWithAggregatesFilter<"NFTs"> | string | null
    description?: StringNullableWithAggregatesFilter<"NFTs"> | string | null
    image?: StringNullableWithAggregatesFilter<"NFTs"> | string | null
    externalUrl?: StringNullableWithAggregatesFilter<"NFTs"> | string | null
    attributes?: JsonNullableWithAggregatesFilter<"NFTs">
    raw?: JsonNullableWithAggregatesFilter<"NFTs">
  }

  export type BlockchainConfigsCreateInput = {
    id?: string
    chainId: number
    rpcUrlBase: string
    rpcUrlAlter?: string | null
  }

  export type BlockchainConfigsUncheckedCreateInput = {
    id?: string
    chainId: number
    rpcUrlBase: string
    rpcUrlAlter?: string | null
  }

  export type BlockchainConfigsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    rpcUrlBase?: StringFieldUpdateOperationsInput | string
    rpcUrlAlter?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlockchainConfigsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    rpcUrlBase?: StringFieldUpdateOperationsInput | string
    rpcUrlAlter?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlockchainConfigsCreateManyInput = {
    id?: string
    chainId: number
    rpcUrlBase: string
    rpcUrlAlter?: string | null
  }

  export type BlockchainConfigsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    rpcUrlBase?: StringFieldUpdateOperationsInput | string
    rpcUrlAlter?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlockchainConfigsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    rpcUrlBase?: StringFieldUpdateOperationsInput | string
    rpcUrlAlter?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlockchainContractsCreateInput = {
    id?: string
    contractAddress: string
    contractType: string
    chainId: number
    lastSyncBlock?: string | null
    lastSyncTime?: Date | string | null
  }

  export type BlockchainContractsUncheckedCreateInput = {
    id?: string
    contractAddress: string
    contractType: string
    chainId: number
    lastSyncBlock?: string | null
    lastSyncTime?: Date | string | null
  }

  export type BlockchainContractsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    contractType?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    lastSyncBlock?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BlockchainContractsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    contractType?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    lastSyncBlock?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BlockchainContractsCreateManyInput = {
    id?: string
    contractAddress: string
    contractType: string
    chainId: number
    lastSyncBlock?: string | null
    lastSyncTime?: Date | string | null
  }

  export type BlockchainContractsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    contractType?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    lastSyncBlock?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BlockchainContractsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    contractType?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    lastSyncBlock?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NFTOwnersCreateInput = {
    id?: string
    contractId: string
    ownerAddress: string
    count: number
    lastTransactionHash?: string | null
    lastSyncTime?: Date | string | null
    nft?: NFTsCreateNestedOneWithoutNFTOwnersInput
  }

  export type NFTOwnersUncheckedCreateInput = {
    id?: string
    contractId: string
    ownerAddress: string
    contractAddress: string
    tokenId: string
    count: number
    lastTransactionHash?: string | null
    lastSyncTime?: Date | string | null
  }

  export type NFTOwnersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nft?: NFTsUpdateOneWithoutNFTOwnersNestedInput
  }

  export type NFTOwnersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NFTOwnersCreateManyInput = {
    id?: string
    contractId: string
    ownerAddress: string
    contractAddress: string
    tokenId: string
    count: number
    lastTransactionHash?: string | null
    lastSyncTime?: Date | string | null
  }

  export type NFTOwnersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NFTOwnersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ContractLogsCreateInput = {
    id?: string
    contractId: string
    chainId: number
    contractAddress: string
    blockNumber: string
    transactionHash: string
    logIndex: number
    eventType: string
    fromAddress?: string | null
    toAddress?: string | null
    operatorAddress?: string | null
    tokenId?: string | null
    value?: string | null
    loggedAt: Date | string
  }

  export type ContractLogsUncheckedCreateInput = {
    id?: string
    contractId: string
    chainId: number
    contractAddress: string
    blockNumber: string
    transactionHash: string
    logIndex: number
    eventType: string
    fromAddress?: string | null
    toAddress?: string | null
    operatorAddress?: string | null
    tokenId?: string | null
    value?: string | null
    loggedAt: Date | string
  }

  export type ContractLogsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    blockNumber?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    logIndex?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    operatorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractLogsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    blockNumber?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    logIndex?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    operatorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractLogsCreateManyInput = {
    id?: string
    contractId: string
    chainId: number
    contractAddress: string
    blockNumber: string
    transactionHash: string
    logIndex: number
    eventType: string
    fromAddress?: string | null
    toAddress?: string | null
    operatorAddress?: string | null
    tokenId?: string | null
    value?: string | null
    loggedAt: Date | string
  }

  export type ContractLogsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    blockNumber?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    logIndex?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    operatorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractLogsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    blockNumber?: StringFieldUpdateOperationsInput | string
    transactionHash?: StringFieldUpdateOperationsInput | string
    logIndex?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: NullableStringFieldUpdateOperationsInput | string | null
    operatorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NFTsCreateInput = {
    id?: string
    contractId: string
    contractAddress: string
    tokenId: string
    tokenUri?: string | null
    metadataUpdated?: boolean
    lastMetadataSyncTime?: Date | string | null
    name?: string | null
    description?: string | null
    image?: string | null
    externalUrl?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
    NFTOwners?: NFTOwnersCreateNestedManyWithoutNftInput
  }

  export type NFTsUncheckedCreateInput = {
    id?: string
    contractId: string
    contractAddress: string
    tokenId: string
    tokenUri?: string | null
    metadataUpdated?: boolean
    lastMetadataSyncTime?: Date | string | null
    name?: string | null
    description?: string | null
    image?: string | null
    externalUrl?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
    NFTOwners?: NFTOwnersUncheckedCreateNestedManyWithoutNftInput
  }

  export type NFTsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tokenUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUpdated?: BoolFieldUpdateOperationsInput | boolean
    lastMetadataSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
    NFTOwners?: NFTOwnersUpdateManyWithoutNftNestedInput
  }

  export type NFTsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tokenUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUpdated?: BoolFieldUpdateOperationsInput | boolean
    lastMetadataSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
    NFTOwners?: NFTOwnersUncheckedUpdateManyWithoutNftNestedInput
  }

  export type NFTsCreateManyInput = {
    id?: string
    contractId: string
    contractAddress: string
    tokenId: string
    tokenUri?: string | null
    metadataUpdated?: boolean
    lastMetadataSyncTime?: Date | string | null
    name?: string | null
    description?: string | null
    image?: string | null
    externalUrl?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NFTsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tokenUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUpdated?: BoolFieldUpdateOperationsInput | boolean
    lastMetadataSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NFTsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tokenUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUpdated?: BoolFieldUpdateOperationsInput | boolean
    lastMetadataSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BlockchainConfigsCountOrderByAggregateInput = {
    id?: SortOrder
    chainId?: SortOrder
    rpcUrlBase?: SortOrder
    rpcUrlAlter?: SortOrder
  }

  export type BlockchainConfigsAvgOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type BlockchainConfigsMaxOrderByAggregateInput = {
    id?: SortOrder
    chainId?: SortOrder
    rpcUrlBase?: SortOrder
    rpcUrlAlter?: SortOrder
  }

  export type BlockchainConfigsMinOrderByAggregateInput = {
    id?: SortOrder
    chainId?: SortOrder
    rpcUrlBase?: SortOrder
    rpcUrlAlter?: SortOrder
  }

  export type BlockchainConfigsSumOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BlockchainContractsCountOrderByAggregateInput = {
    id?: SortOrder
    contractAddress?: SortOrder
    contractType?: SortOrder
    chainId?: SortOrder
    lastSyncBlock?: SortOrder
    lastSyncTime?: SortOrder
  }

  export type BlockchainContractsAvgOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type BlockchainContractsMaxOrderByAggregateInput = {
    id?: SortOrder
    contractAddress?: SortOrder
    contractType?: SortOrder
    chainId?: SortOrder
    lastSyncBlock?: SortOrder
    lastSyncTime?: SortOrder
  }

  export type BlockchainContractsMinOrderByAggregateInput = {
    id?: SortOrder
    contractAddress?: SortOrder
    contractType?: SortOrder
    chainId?: SortOrder
    lastSyncBlock?: SortOrder
    lastSyncTime?: SortOrder
  }

  export type BlockchainContractsSumOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NFTsNullableScalarRelationFilter = {
    is?: NFTsWhereInput | null
    isNot?: NFTsWhereInput | null
  }

  export type NFTOwnersCountOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    ownerAddress?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    count?: SortOrder
    lastTransactionHash?: SortOrder
    lastSyncTime?: SortOrder
  }

  export type NFTOwnersAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type NFTOwnersMaxOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    ownerAddress?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    count?: SortOrder
    lastTransactionHash?: SortOrder
    lastSyncTime?: SortOrder
  }

  export type NFTOwnersMinOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    ownerAddress?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    count?: SortOrder
    lastTransactionHash?: SortOrder
    lastSyncTime?: SortOrder
  }

  export type NFTOwnersSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ContractLogsTransactionHashLogIndexCompoundUniqueInput = {
    transactionHash: string
    logIndex: number
  }

  export type ContractLogsCountOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    chainId?: SortOrder
    contractAddress?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    logIndex?: SortOrder
    eventType?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    operatorAddress?: SortOrder
    tokenId?: SortOrder
    value?: SortOrder
    loggedAt?: SortOrder
  }

  export type ContractLogsAvgOrderByAggregateInput = {
    chainId?: SortOrder
    logIndex?: SortOrder
  }

  export type ContractLogsMaxOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    chainId?: SortOrder
    contractAddress?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    logIndex?: SortOrder
    eventType?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    operatorAddress?: SortOrder
    tokenId?: SortOrder
    value?: SortOrder
    loggedAt?: SortOrder
  }

  export type ContractLogsMinOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    chainId?: SortOrder
    contractAddress?: SortOrder
    blockNumber?: SortOrder
    transactionHash?: SortOrder
    logIndex?: SortOrder
    eventType?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    operatorAddress?: SortOrder
    tokenId?: SortOrder
    value?: SortOrder
    loggedAt?: SortOrder
  }

  export type ContractLogsSumOrderByAggregateInput = {
    chainId?: SortOrder
    logIndex?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NFTOwnersListRelationFilter = {
    every?: NFTOwnersWhereInput
    some?: NFTOwnersWhereInput
    none?: NFTOwnersWhereInput
  }

  export type NFTOwnersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NFTsContractAddressTokenIdCompoundUniqueInput = {
    contractAddress: string
    tokenId: string
  }

  export type NFTsCountOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    tokenUri?: SortOrder
    metadataUpdated?: SortOrder
    lastMetadataSyncTime?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    externalUrl?: SortOrder
    attributes?: SortOrder
    raw?: SortOrder
  }

  export type NFTsMaxOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    tokenUri?: SortOrder
    metadataUpdated?: SortOrder
    lastMetadataSyncTime?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    externalUrl?: SortOrder
  }

  export type NFTsMinOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractAddress?: SortOrder
    tokenId?: SortOrder
    tokenUri?: SortOrder
    metadataUpdated?: SortOrder
    lastMetadataSyncTime?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    externalUrl?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NFTsCreateNestedOneWithoutNFTOwnersInput = {
    create?: XOR<NFTsCreateWithoutNFTOwnersInput, NFTsUncheckedCreateWithoutNFTOwnersInput>
    connectOrCreate?: NFTsCreateOrConnectWithoutNFTOwnersInput
    connect?: NFTsWhereUniqueInput
  }

  export type NFTsUpdateOneWithoutNFTOwnersNestedInput = {
    create?: XOR<NFTsCreateWithoutNFTOwnersInput, NFTsUncheckedCreateWithoutNFTOwnersInput>
    connectOrCreate?: NFTsCreateOrConnectWithoutNFTOwnersInput
    upsert?: NFTsUpsertWithoutNFTOwnersInput
    disconnect?: NFTsWhereInput | boolean
    delete?: NFTsWhereInput | boolean
    connect?: NFTsWhereUniqueInput
    update?: XOR<XOR<NFTsUpdateToOneWithWhereWithoutNFTOwnersInput, NFTsUpdateWithoutNFTOwnersInput>, NFTsUncheckedUpdateWithoutNFTOwnersInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NFTOwnersCreateNestedManyWithoutNftInput = {
    create?: XOR<NFTOwnersCreateWithoutNftInput, NFTOwnersUncheckedCreateWithoutNftInput> | NFTOwnersCreateWithoutNftInput[] | NFTOwnersUncheckedCreateWithoutNftInput[]
    connectOrCreate?: NFTOwnersCreateOrConnectWithoutNftInput | NFTOwnersCreateOrConnectWithoutNftInput[]
    createMany?: NFTOwnersCreateManyNftInputEnvelope
    connect?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
  }

  export type NFTOwnersUncheckedCreateNestedManyWithoutNftInput = {
    create?: XOR<NFTOwnersCreateWithoutNftInput, NFTOwnersUncheckedCreateWithoutNftInput> | NFTOwnersCreateWithoutNftInput[] | NFTOwnersUncheckedCreateWithoutNftInput[]
    connectOrCreate?: NFTOwnersCreateOrConnectWithoutNftInput | NFTOwnersCreateOrConnectWithoutNftInput[]
    createMany?: NFTOwnersCreateManyNftInputEnvelope
    connect?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NFTOwnersUpdateManyWithoutNftNestedInput = {
    create?: XOR<NFTOwnersCreateWithoutNftInput, NFTOwnersUncheckedCreateWithoutNftInput> | NFTOwnersCreateWithoutNftInput[] | NFTOwnersUncheckedCreateWithoutNftInput[]
    connectOrCreate?: NFTOwnersCreateOrConnectWithoutNftInput | NFTOwnersCreateOrConnectWithoutNftInput[]
    upsert?: NFTOwnersUpsertWithWhereUniqueWithoutNftInput | NFTOwnersUpsertWithWhereUniqueWithoutNftInput[]
    createMany?: NFTOwnersCreateManyNftInputEnvelope
    set?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    disconnect?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    delete?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    connect?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    update?: NFTOwnersUpdateWithWhereUniqueWithoutNftInput | NFTOwnersUpdateWithWhereUniqueWithoutNftInput[]
    updateMany?: NFTOwnersUpdateManyWithWhereWithoutNftInput | NFTOwnersUpdateManyWithWhereWithoutNftInput[]
    deleteMany?: NFTOwnersScalarWhereInput | NFTOwnersScalarWhereInput[]
  }

  export type NFTOwnersUncheckedUpdateManyWithoutNftNestedInput = {
    create?: XOR<NFTOwnersCreateWithoutNftInput, NFTOwnersUncheckedCreateWithoutNftInput> | NFTOwnersCreateWithoutNftInput[] | NFTOwnersUncheckedCreateWithoutNftInput[]
    connectOrCreate?: NFTOwnersCreateOrConnectWithoutNftInput | NFTOwnersCreateOrConnectWithoutNftInput[]
    upsert?: NFTOwnersUpsertWithWhereUniqueWithoutNftInput | NFTOwnersUpsertWithWhereUniqueWithoutNftInput[]
    createMany?: NFTOwnersCreateManyNftInputEnvelope
    set?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    disconnect?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    delete?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    connect?: NFTOwnersWhereUniqueInput | NFTOwnersWhereUniqueInput[]
    update?: NFTOwnersUpdateWithWhereUniqueWithoutNftInput | NFTOwnersUpdateWithWhereUniqueWithoutNftInput[]
    updateMany?: NFTOwnersUpdateManyWithWhereWithoutNftInput | NFTOwnersUpdateManyWithWhereWithoutNftInput[]
    deleteMany?: NFTOwnersScalarWhereInput | NFTOwnersScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NFTsCreateWithoutNFTOwnersInput = {
    id?: string
    contractId: string
    contractAddress: string
    tokenId: string
    tokenUri?: string | null
    metadataUpdated?: boolean
    lastMetadataSyncTime?: Date | string | null
    name?: string | null
    description?: string | null
    image?: string | null
    externalUrl?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NFTsUncheckedCreateWithoutNFTOwnersInput = {
    id?: string
    contractId: string
    contractAddress: string
    tokenId: string
    tokenUri?: string | null
    metadataUpdated?: boolean
    lastMetadataSyncTime?: Date | string | null
    name?: string | null
    description?: string | null
    image?: string | null
    externalUrl?: string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NFTsCreateOrConnectWithoutNFTOwnersInput = {
    where: NFTsWhereUniqueInput
    create: XOR<NFTsCreateWithoutNFTOwnersInput, NFTsUncheckedCreateWithoutNFTOwnersInput>
  }

  export type NFTsUpsertWithoutNFTOwnersInput = {
    update: XOR<NFTsUpdateWithoutNFTOwnersInput, NFTsUncheckedUpdateWithoutNFTOwnersInput>
    create: XOR<NFTsCreateWithoutNFTOwnersInput, NFTsUncheckedCreateWithoutNFTOwnersInput>
    where?: NFTsWhereInput
  }

  export type NFTsUpdateToOneWithWhereWithoutNFTOwnersInput = {
    where?: NFTsWhereInput
    data: XOR<NFTsUpdateWithoutNFTOwnersInput, NFTsUncheckedUpdateWithoutNFTOwnersInput>
  }

  export type NFTsUpdateWithoutNFTOwnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tokenUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUpdated?: BoolFieldUpdateOperationsInput | boolean
    lastMetadataSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NFTsUncheckedUpdateWithoutNFTOwnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tokenUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUpdated?: BoolFieldUpdateOperationsInput | boolean
    lastMetadataSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    externalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    attributes?: NullableJsonNullValueInput | InputJsonValue
    raw?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NFTOwnersCreateWithoutNftInput = {
    id?: string
    contractId: string
    ownerAddress: string
    count: number
    lastTransactionHash?: string | null
    lastSyncTime?: Date | string | null
  }

  export type NFTOwnersUncheckedCreateWithoutNftInput = {
    id?: string
    contractId: string
    ownerAddress: string
    count: number
    lastTransactionHash?: string | null
    lastSyncTime?: Date | string | null
  }

  export type NFTOwnersCreateOrConnectWithoutNftInput = {
    where: NFTOwnersWhereUniqueInput
    create: XOR<NFTOwnersCreateWithoutNftInput, NFTOwnersUncheckedCreateWithoutNftInput>
  }

  export type NFTOwnersCreateManyNftInputEnvelope = {
    data: NFTOwnersCreateManyNftInput | NFTOwnersCreateManyNftInput[]
    skipDuplicates?: boolean
  }

  export type NFTOwnersUpsertWithWhereUniqueWithoutNftInput = {
    where: NFTOwnersWhereUniqueInput
    update: XOR<NFTOwnersUpdateWithoutNftInput, NFTOwnersUncheckedUpdateWithoutNftInput>
    create: XOR<NFTOwnersCreateWithoutNftInput, NFTOwnersUncheckedCreateWithoutNftInput>
  }

  export type NFTOwnersUpdateWithWhereUniqueWithoutNftInput = {
    where: NFTOwnersWhereUniqueInput
    data: XOR<NFTOwnersUpdateWithoutNftInput, NFTOwnersUncheckedUpdateWithoutNftInput>
  }

  export type NFTOwnersUpdateManyWithWhereWithoutNftInput = {
    where: NFTOwnersScalarWhereInput
    data: XOR<NFTOwnersUpdateManyMutationInput, NFTOwnersUncheckedUpdateManyWithoutNftInput>
  }

  export type NFTOwnersScalarWhereInput = {
    AND?: NFTOwnersScalarWhereInput | NFTOwnersScalarWhereInput[]
    OR?: NFTOwnersScalarWhereInput[]
    NOT?: NFTOwnersScalarWhereInput | NFTOwnersScalarWhereInput[]
    id?: UuidFilter<"NFTOwners"> | string
    contractId?: UuidFilter<"NFTOwners"> | string
    ownerAddress?: StringFilter<"NFTOwners"> | string
    contractAddress?: StringFilter<"NFTOwners"> | string
    tokenId?: StringFilter<"NFTOwners"> | string
    count?: IntFilter<"NFTOwners"> | number
    lastTransactionHash?: StringNullableFilter<"NFTOwners"> | string | null
    lastSyncTime?: DateTimeNullableFilter<"NFTOwners"> | Date | string | null
  }

  export type NFTOwnersCreateManyNftInput = {
    id?: string
    contractId: string
    ownerAddress: string
    count: number
    lastTransactionHash?: string | null
    lastSyncTime?: Date | string | null
  }

  export type NFTOwnersUpdateWithoutNftInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NFTOwnersUncheckedUpdateWithoutNftInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NFTOwnersUncheckedUpdateManyWithoutNftInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    ownerAddress?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastTransactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}