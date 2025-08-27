
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
 * Model ambalajlar
 * 
 */
export type ambalajlar = $Result.DefaultSelection<Prisma.$ambalajlarPayload>
/**
 * Model faturalar
 * 
 */
export type faturalar = $Result.DefaultSelection<Prisma.$faturalarPayload>
/**
 * Model komisyoncular
 * 
 */
export type komisyoncular = $Result.DefaultSelection<Prisma.$komisyoncularPayload>
/**
 * Model mal_kabul_records
 * 
 */
export type mal_kabul_records = $Result.DefaultSelection<Prisma.$mal_kabul_recordsPayload>
/**
 * Model mustahsil
 * 
 */
export type mustahsil = $Result.DefaultSelection<Prisma.$mustahsilPayload>
/**
 * Model ozel_firmalar
 * 
 */
export type ozel_firmalar = $Result.DefaultSelection<Prisma.$ozel_firmalarPayload>
/**
 * Model ureticiler
 * 
 */
export type ureticiler = $Result.DefaultSelection<Prisma.$ureticilerPayload>
/**
 * Model urunler
 * 
 */
export type urunler = $Result.DefaultSelection<Prisma.$urunlerPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model malKabulRecords
 * 
 */
export type malKabulRecords = $Result.DefaultSelection<Prisma.$malKabulRecordsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AmbalajTipi: {
  PALET: 'PALET',
  PLASTIK_KASA: 'PLASTIK_KASA',
  KARTON_KASA: 'KARTON_KASA'
};

export type AmbalajTipi = (typeof AmbalajTipi)[keyof typeof AmbalajTipi]


export const Gender: {
  ERKEK: 'ERKEK',
  KADIN: 'KADIN'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const ProductStatus: {
  FATURA_BEKLIYOR: 'FATURA_BEKLIYOR',
  FATURALANDI: 'FATURALANDI',
  NETLENDI: 'NETLENDI',
  TAMAMLANDI: 'TAMAMLANDI',
  IPTAL: 'IPTAL'
};

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]


export const SaticiTipi: {
  OZEL_FIRMA: 'OZEL_FIRMA',
  MUSTAHSIL: 'MUSTAHSIL',
  KOMISYONCU: 'KOMISYONCU'
};

export type SaticiTipi = (typeof SaticiTipi)[keyof typeof SaticiTipi]


export const Status: {
  AKTIF: 'AKTIF',
  PASIF: 'PASIF'
};

export type Status = (typeof Status)[keyof typeof Status]


export const UserRole: {
  ADMIN: 'ADMIN',
  MAL_KABULCU: 'MAL_KABULCU',
  MUHASEBE: 'MUHASEBE',
  SATIN_ALMACI: 'SATIN_ALMACI'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type AmbalajTipi = $Enums.AmbalajTipi

export const AmbalajTipi: typeof $Enums.AmbalajTipi

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type ProductStatus = $Enums.ProductStatus

export const ProductStatus: typeof $Enums.ProductStatus

export type SaticiTipi = $Enums.SaticiTipi

export const SaticiTipi: typeof $Enums.SaticiTipi

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Ambalajlars
 * const ambalajlars = await prisma.ambalajlar.findMany()
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
   * // Fetch zero or more Ambalajlars
   * const ambalajlars = await prisma.ambalajlar.findMany()
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * `prisma.ambalajlar`: Exposes CRUD operations for the **ambalajlar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ambalajlars
    * const ambalajlars = await prisma.ambalajlar.findMany()
    * ```
    */
  get ambalajlar(): Prisma.ambalajlarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.faturalar`: Exposes CRUD operations for the **faturalar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Faturalars
    * const faturalars = await prisma.faturalar.findMany()
    * ```
    */
  get faturalar(): Prisma.faturalarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.komisyoncular`: Exposes CRUD operations for the **komisyoncular** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Komisyonculars
    * const komisyonculars = await prisma.komisyoncular.findMany()
    * ```
    */
  get komisyoncular(): Prisma.komisyoncularDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mal_kabul_records`: Exposes CRUD operations for the **mal_kabul_records** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mal_kabul_records
    * const mal_kabul_records = await prisma.mal_kabul_records.findMany()
    * ```
    */
  get mal_kabul_records(): Prisma.mal_kabul_recordsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mustahsil`: Exposes CRUD operations for the **mustahsil** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mustahsils
    * const mustahsils = await prisma.mustahsil.findMany()
    * ```
    */
  get mustahsil(): Prisma.mustahsilDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ozel_firmalar`: Exposes CRUD operations for the **ozel_firmalar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ozel_firmalars
    * const ozel_firmalars = await prisma.ozel_firmalar.findMany()
    * ```
    */
  get ozel_firmalar(): Prisma.ozel_firmalarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ureticiler`: Exposes CRUD operations for the **ureticiler** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ureticilers
    * const ureticilers = await prisma.ureticiler.findMany()
    * ```
    */
  get ureticiler(): Prisma.ureticilerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.urunler`: Exposes CRUD operations for the **urunler** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Urunlers
    * const urunlers = await prisma.urunler.findMany()
    * ```
    */
  get urunler(): Prisma.urunlerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.malKabulRecords`: Exposes CRUD operations for the **malKabulRecords** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MalKabulRecords
    * const malKabulRecords = await prisma.malKabulRecords.findMany()
    * ```
    */
  get malKabulRecords(): Prisma.malKabulRecordsDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    ambalajlar: 'ambalajlar',
    faturalar: 'faturalar',
    komisyoncular: 'komisyoncular',
    mal_kabul_records: 'mal_kabul_records',
    mustahsil: 'mustahsil',
    ozel_firmalar: 'ozel_firmalar',
    ureticiler: 'ureticiler',
    urunler: 'urunler',
    users: 'users',
    malKabulRecords: 'malKabulRecords'
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
      modelProps: "ambalajlar" | "faturalar" | "komisyoncular" | "mal_kabul_records" | "mustahsil" | "ozel_firmalar" | "ureticiler" | "urunler" | "users" | "malKabulRecords"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ambalajlar: {
        payload: Prisma.$ambalajlarPayload<ExtArgs>
        fields: Prisma.ambalajlarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ambalajlarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ambalajlarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>
          }
          findFirst: {
            args: Prisma.ambalajlarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ambalajlarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>
          }
          findMany: {
            args: Prisma.ambalajlarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>[]
          }
          create: {
            args: Prisma.ambalajlarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>
          }
          createMany: {
            args: Prisma.ambalajlarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ambalajlarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>[]
          }
          delete: {
            args: Prisma.ambalajlarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>
          }
          update: {
            args: Prisma.ambalajlarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>
          }
          deleteMany: {
            args: Prisma.ambalajlarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ambalajlarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ambalajlarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>[]
          }
          upsert: {
            args: Prisma.ambalajlarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ambalajlarPayload>
          }
          aggregate: {
            args: Prisma.AmbalajlarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAmbalajlar>
          }
          groupBy: {
            args: Prisma.ambalajlarGroupByArgs<ExtArgs>
            result: $Utils.Optional<AmbalajlarGroupByOutputType>[]
          }
          count: {
            args: Prisma.ambalajlarCountArgs<ExtArgs>
            result: $Utils.Optional<AmbalajlarCountAggregateOutputType> | number
          }
        }
      }
      faturalar: {
        payload: Prisma.$faturalarPayload<ExtArgs>
        fields: Prisma.faturalarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.faturalarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.faturalarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>
          }
          findFirst: {
            args: Prisma.faturalarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.faturalarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>
          }
          findMany: {
            args: Prisma.faturalarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>[]
          }
          create: {
            args: Prisma.faturalarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>
          }
          createMany: {
            args: Prisma.faturalarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.faturalarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>[]
          }
          delete: {
            args: Prisma.faturalarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>
          }
          update: {
            args: Prisma.faturalarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>
          }
          deleteMany: {
            args: Prisma.faturalarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.faturalarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.faturalarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>[]
          }
          upsert: {
            args: Prisma.faturalarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$faturalarPayload>
          }
          aggregate: {
            args: Prisma.FaturalarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFaturalar>
          }
          groupBy: {
            args: Prisma.faturalarGroupByArgs<ExtArgs>
            result: $Utils.Optional<FaturalarGroupByOutputType>[]
          }
          count: {
            args: Prisma.faturalarCountArgs<ExtArgs>
            result: $Utils.Optional<FaturalarCountAggregateOutputType> | number
          }
        }
      }
      komisyoncular: {
        payload: Prisma.$komisyoncularPayload<ExtArgs>
        fields: Prisma.komisyoncularFieldRefs
        operations: {
          findUnique: {
            args: Prisma.komisyoncularFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.komisyoncularFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>
          }
          findFirst: {
            args: Prisma.komisyoncularFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.komisyoncularFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>
          }
          findMany: {
            args: Prisma.komisyoncularFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>[]
          }
          create: {
            args: Prisma.komisyoncularCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>
          }
          createMany: {
            args: Prisma.komisyoncularCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.komisyoncularCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>[]
          }
          delete: {
            args: Prisma.komisyoncularDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>
          }
          update: {
            args: Prisma.komisyoncularUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>
          }
          deleteMany: {
            args: Prisma.komisyoncularDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.komisyoncularUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.komisyoncularUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>[]
          }
          upsert: {
            args: Prisma.komisyoncularUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$komisyoncularPayload>
          }
          aggregate: {
            args: Prisma.KomisyoncularAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKomisyoncular>
          }
          groupBy: {
            args: Prisma.komisyoncularGroupByArgs<ExtArgs>
            result: $Utils.Optional<KomisyoncularGroupByOutputType>[]
          }
          count: {
            args: Prisma.komisyoncularCountArgs<ExtArgs>
            result: $Utils.Optional<KomisyoncularCountAggregateOutputType> | number
          }
        }
      }
      mal_kabul_records: {
        payload: Prisma.$mal_kabul_recordsPayload<ExtArgs>
        fields: Prisma.mal_kabul_recordsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mal_kabul_recordsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mal_kabul_recordsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>
          }
          findFirst: {
            args: Prisma.mal_kabul_recordsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mal_kabul_recordsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>
          }
          findMany: {
            args: Prisma.mal_kabul_recordsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>[]
          }
          create: {
            args: Prisma.mal_kabul_recordsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>
          }
          createMany: {
            args: Prisma.mal_kabul_recordsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mal_kabul_recordsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>[]
          }
          delete: {
            args: Prisma.mal_kabul_recordsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>
          }
          update: {
            args: Prisma.mal_kabul_recordsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>
          }
          deleteMany: {
            args: Prisma.mal_kabul_recordsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mal_kabul_recordsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mal_kabul_recordsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>[]
          }
          upsert: {
            args: Prisma.mal_kabul_recordsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mal_kabul_recordsPayload>
          }
          aggregate: {
            args: Prisma.Mal_kabul_recordsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMal_kabul_records>
          }
          groupBy: {
            args: Prisma.mal_kabul_recordsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Mal_kabul_recordsGroupByOutputType>[]
          }
          count: {
            args: Prisma.mal_kabul_recordsCountArgs<ExtArgs>
            result: $Utils.Optional<Mal_kabul_recordsCountAggregateOutputType> | number
          }
        }
      }
      mustahsil: {
        payload: Prisma.$mustahsilPayload<ExtArgs>
        fields: Prisma.mustahsilFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mustahsilFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mustahsilFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>
          }
          findFirst: {
            args: Prisma.mustahsilFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mustahsilFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>
          }
          findMany: {
            args: Prisma.mustahsilFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>[]
          }
          create: {
            args: Prisma.mustahsilCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>
          }
          createMany: {
            args: Prisma.mustahsilCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mustahsilCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>[]
          }
          delete: {
            args: Prisma.mustahsilDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>
          }
          update: {
            args: Prisma.mustahsilUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>
          }
          deleteMany: {
            args: Prisma.mustahsilDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mustahsilUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mustahsilUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>[]
          }
          upsert: {
            args: Prisma.mustahsilUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mustahsilPayload>
          }
          aggregate: {
            args: Prisma.MustahsilAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMustahsil>
          }
          groupBy: {
            args: Prisma.mustahsilGroupByArgs<ExtArgs>
            result: $Utils.Optional<MustahsilGroupByOutputType>[]
          }
          count: {
            args: Prisma.mustahsilCountArgs<ExtArgs>
            result: $Utils.Optional<MustahsilCountAggregateOutputType> | number
          }
        }
      }
      ozel_firmalar: {
        payload: Prisma.$ozel_firmalarPayload<ExtArgs>
        fields: Prisma.ozel_firmalarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ozel_firmalarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ozel_firmalarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>
          }
          findFirst: {
            args: Prisma.ozel_firmalarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ozel_firmalarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>
          }
          findMany: {
            args: Prisma.ozel_firmalarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>[]
          }
          create: {
            args: Prisma.ozel_firmalarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>
          }
          createMany: {
            args: Prisma.ozel_firmalarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ozel_firmalarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>[]
          }
          delete: {
            args: Prisma.ozel_firmalarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>
          }
          update: {
            args: Prisma.ozel_firmalarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>
          }
          deleteMany: {
            args: Prisma.ozel_firmalarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ozel_firmalarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ozel_firmalarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>[]
          }
          upsert: {
            args: Prisma.ozel_firmalarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ozel_firmalarPayload>
          }
          aggregate: {
            args: Prisma.Ozel_firmalarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOzel_firmalar>
          }
          groupBy: {
            args: Prisma.ozel_firmalarGroupByArgs<ExtArgs>
            result: $Utils.Optional<Ozel_firmalarGroupByOutputType>[]
          }
          count: {
            args: Prisma.ozel_firmalarCountArgs<ExtArgs>
            result: $Utils.Optional<Ozel_firmalarCountAggregateOutputType> | number
          }
        }
      }
      ureticiler: {
        payload: Prisma.$ureticilerPayload<ExtArgs>
        fields: Prisma.ureticilerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ureticilerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ureticilerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>
          }
          findFirst: {
            args: Prisma.ureticilerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ureticilerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>
          }
          findMany: {
            args: Prisma.ureticilerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>[]
          }
          create: {
            args: Prisma.ureticilerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>
          }
          createMany: {
            args: Prisma.ureticilerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ureticilerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>[]
          }
          delete: {
            args: Prisma.ureticilerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>
          }
          update: {
            args: Prisma.ureticilerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>
          }
          deleteMany: {
            args: Prisma.ureticilerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ureticilerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ureticilerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>[]
          }
          upsert: {
            args: Prisma.ureticilerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ureticilerPayload>
          }
          aggregate: {
            args: Prisma.UreticilerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUreticiler>
          }
          groupBy: {
            args: Prisma.ureticilerGroupByArgs<ExtArgs>
            result: $Utils.Optional<UreticilerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ureticilerCountArgs<ExtArgs>
            result: $Utils.Optional<UreticilerCountAggregateOutputType> | number
          }
        }
      }
      urunler: {
        payload: Prisma.$urunlerPayload<ExtArgs>
        fields: Prisma.urunlerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.urunlerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.urunlerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>
          }
          findFirst: {
            args: Prisma.urunlerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.urunlerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>
          }
          findMany: {
            args: Prisma.urunlerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>[]
          }
          create: {
            args: Prisma.urunlerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>
          }
          createMany: {
            args: Prisma.urunlerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.urunlerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>[]
          }
          delete: {
            args: Prisma.urunlerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>
          }
          update: {
            args: Prisma.urunlerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>
          }
          deleteMany: {
            args: Prisma.urunlerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.urunlerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.urunlerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>[]
          }
          upsert: {
            args: Prisma.urunlerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$urunlerPayload>
          }
          aggregate: {
            args: Prisma.UrunlerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUrunler>
          }
          groupBy: {
            args: Prisma.urunlerGroupByArgs<ExtArgs>
            result: $Utils.Optional<UrunlerGroupByOutputType>[]
          }
          count: {
            args: Prisma.urunlerCountArgs<ExtArgs>
            result: $Utils.Optional<UrunlerCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      malKabulRecords: {
        payload: Prisma.$malKabulRecordsPayload<ExtArgs>
        fields: Prisma.malKabulRecordsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.malKabulRecordsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.malKabulRecordsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>
          }
          findFirst: {
            args: Prisma.malKabulRecordsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.malKabulRecordsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>
          }
          findMany: {
            args: Prisma.malKabulRecordsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>[]
          }
          create: {
            args: Prisma.malKabulRecordsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>
          }
          createMany: {
            args: Prisma.malKabulRecordsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.malKabulRecordsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>[]
          }
          delete: {
            args: Prisma.malKabulRecordsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>
          }
          update: {
            args: Prisma.malKabulRecordsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>
          }
          deleteMany: {
            args: Prisma.malKabulRecordsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.malKabulRecordsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.malKabulRecordsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>[]
          }
          upsert: {
            args: Prisma.malKabulRecordsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$malKabulRecordsPayload>
          }
          aggregate: {
            args: Prisma.MalKabulRecordsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMalKabulRecords>
          }
          groupBy: {
            args: Prisma.malKabulRecordsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MalKabulRecordsGroupByOutputType>[]
          }
          count: {
            args: Prisma.malKabulRecordsCountArgs<ExtArgs>
            result: $Utils.Optional<MalKabulRecordsCountAggregateOutputType> | number
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
    ambalajlar?: ambalajlarOmit
    faturalar?: faturalarOmit
    komisyoncular?: komisyoncularOmit
    mal_kabul_records?: mal_kabul_recordsOmit
    mustahsil?: mustahsilOmit
    ozel_firmalar?: ozel_firmalarOmit
    ureticiler?: ureticilerOmit
    urunler?: urunlerOmit
    users?: usersOmit
    malKabulRecords?: malKabulRecordsOmit
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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type AmbalajlarCountOutputType
   */

  export type AmbalajlarCountOutputType = {
    mal_kabul_records: number
  }

  export type AmbalajlarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | AmbalajlarCountOutputTypeCountMal_kabul_recordsArgs
  }

  // Custom InputTypes
  /**
   * AmbalajlarCountOutputType without action
   */
  export type AmbalajlarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AmbalajlarCountOutputType
     */
    select?: AmbalajlarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AmbalajlarCountOutputType without action
   */
  export type AmbalajlarCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }


  /**
   * Count Type FaturalarCountOutputType
   */

  export type FaturalarCountOutputType = {
    mal_kabul_records: number
  }

  export type FaturalarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | FaturalarCountOutputTypeCountMal_kabul_recordsArgs
  }

  // Custom InputTypes
  /**
   * FaturalarCountOutputType without action
   */
  export type FaturalarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaturalarCountOutputType
     */
    select?: FaturalarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FaturalarCountOutputType without action
   */
  export type FaturalarCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }


  /**
   * Count Type KomisyoncularCountOutputType
   */

  export type KomisyoncularCountOutputType = {
    mal_kabul_records: number
    ureticiler: number
  }

  export type KomisyoncularCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | KomisyoncularCountOutputTypeCountMal_kabul_recordsArgs
    ureticiler?: boolean | KomisyoncularCountOutputTypeCountUreticilerArgs
  }

  // Custom InputTypes
  /**
   * KomisyoncularCountOutputType without action
   */
  export type KomisyoncularCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KomisyoncularCountOutputType
     */
    select?: KomisyoncularCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KomisyoncularCountOutputType without action
   */
  export type KomisyoncularCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }

  /**
   * KomisyoncularCountOutputType without action
   */
  export type KomisyoncularCountOutputTypeCountUreticilerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ureticilerWhereInput
  }


  /**
   * Count Type MustahsilCountOutputType
   */

  export type MustahsilCountOutputType = {
    mal_kabul_records: number
  }

  export type MustahsilCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | MustahsilCountOutputTypeCountMal_kabul_recordsArgs
  }

  // Custom InputTypes
  /**
   * MustahsilCountOutputType without action
   */
  export type MustahsilCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MustahsilCountOutputType
     */
    select?: MustahsilCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MustahsilCountOutputType without action
   */
  export type MustahsilCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }


  /**
   * Count Type Ozel_firmalarCountOutputType
   */

  export type Ozel_firmalarCountOutputType = {
    mal_kabul_records: number
  }

  export type Ozel_firmalarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | Ozel_firmalarCountOutputTypeCountMal_kabul_recordsArgs
  }

  // Custom InputTypes
  /**
   * Ozel_firmalarCountOutputType without action
   */
  export type Ozel_firmalarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ozel_firmalarCountOutputType
     */
    select?: Ozel_firmalarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Ozel_firmalarCountOutputType without action
   */
  export type Ozel_firmalarCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }


  /**
   * Count Type UreticilerCountOutputType
   */

  export type UreticilerCountOutputType = {
    mal_kabul_records: number
  }

  export type UreticilerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | UreticilerCountOutputTypeCountMal_kabul_recordsArgs
  }

  // Custom InputTypes
  /**
   * UreticilerCountOutputType without action
   */
  export type UreticilerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UreticilerCountOutputType
     */
    select?: UreticilerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UreticilerCountOutputType without action
   */
  export type UreticilerCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }


  /**
   * Count Type UrunlerCountOutputType
   */

  export type UrunlerCountOutputType = {
    mal_kabul_records: number
  }

  export type UrunlerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | UrunlerCountOutputTypeCountMal_kabul_recordsArgs
  }

  // Custom InputTypes
  /**
   * UrunlerCountOutputType without action
   */
  export type UrunlerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrunlerCountOutputType
     */
    select?: UrunlerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UrunlerCountOutputType without action
   */
  export type UrunlerCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    mal_kabul_records: number
    faturalar: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | UsersCountOutputTypeCountMal_kabul_recordsArgs
    faturalar?: boolean | UsersCountOutputTypeCountFaturalarArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountMal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountFaturalarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: faturalarWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ambalajlar
   */

  export type AggregateAmbalajlar = {
    _count: AmbalajlarCountAggregateOutputType | null
    _avg: AmbalajlarAvgAggregateOutputType | null
    _sum: AmbalajlarSumAggregateOutputType | null
    _min: AmbalajlarMinAggregateOutputType | null
    _max: AmbalajlarMaxAggregateOutputType | null
  }

  export type AmbalajlarAvgAggregateOutputType = {
    daraKg: number | null
  }

  export type AmbalajlarSumAggregateOutputType = {
    daraKg: number | null
  }

  export type AmbalajlarMinAggregateOutputType = {
    id: string | null
    ad: string | null
    tipi: string | null
    daraKg: number | null
    aciklama: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AmbalajlarMaxAggregateOutputType = {
    id: string | null
    ad: string | null
    tipi: string | null
    daraKg: number | null
    aciklama: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AmbalajlarCountAggregateOutputType = {
    id: number
    ad: number
    tipi: number
    daraKg: number
    aciklama: number
    durum: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AmbalajlarAvgAggregateInputType = {
    daraKg?: true
  }

  export type AmbalajlarSumAggregateInputType = {
    daraKg?: true
  }

  export type AmbalajlarMinAggregateInputType = {
    id?: true
    ad?: true
    tipi?: true
    daraKg?: true
    aciklama?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AmbalajlarMaxAggregateInputType = {
    id?: true
    ad?: true
    tipi?: true
    daraKg?: true
    aciklama?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AmbalajlarCountAggregateInputType = {
    id?: true
    ad?: true
    tipi?: true
    daraKg?: true
    aciklama?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AmbalajlarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ambalajlar to aggregate.
     */
    where?: ambalajlarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ambalajlars to fetch.
     */
    orderBy?: ambalajlarOrderByWithRelationInput | ambalajlarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ambalajlarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ambalajlars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ambalajlars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ambalajlars
    **/
    _count?: true | AmbalajlarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AmbalajlarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AmbalajlarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AmbalajlarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AmbalajlarMaxAggregateInputType
  }

  export type GetAmbalajlarAggregateType<T extends AmbalajlarAggregateArgs> = {
        [P in keyof T & keyof AggregateAmbalajlar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAmbalajlar[P]>
      : GetScalarType<T[P], AggregateAmbalajlar[P]>
  }




  export type ambalajlarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ambalajlarWhereInput
    orderBy?: ambalajlarOrderByWithAggregationInput | ambalajlarOrderByWithAggregationInput[]
    by: AmbalajlarScalarFieldEnum[] | AmbalajlarScalarFieldEnum
    having?: ambalajlarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AmbalajlarCountAggregateInputType | true
    _avg?: AmbalajlarAvgAggregateInputType
    _sum?: AmbalajlarSumAggregateInputType
    _min?: AmbalajlarMinAggregateInputType
    _max?: AmbalajlarMaxAggregateInputType
  }

  export type AmbalajlarGroupByOutputType = {
    id: string
    ad: string
    tipi: string
    daraKg: number
    aciklama: string | null
    durum: string
    createdAt: Date | null
    updatedAt: Date | null
    _count: AmbalajlarCountAggregateOutputType | null
    _avg: AmbalajlarAvgAggregateOutputType | null
    _sum: AmbalajlarSumAggregateOutputType | null
    _min: AmbalajlarMinAggregateOutputType | null
    _max: AmbalajlarMaxAggregateOutputType | null
  }

  type GetAmbalajlarGroupByPayload<T extends ambalajlarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AmbalajlarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AmbalajlarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AmbalajlarGroupByOutputType[P]>
            : GetScalarType<T[P], AmbalajlarGroupByOutputType[P]>
        }
      >
    >


  export type ambalajlarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mal_kabul_records?: boolean | ambalajlar$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | AmbalajlarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ambalajlar"]>

  export type ambalajlarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ambalajlar"]>

  export type ambalajlarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ambalajlar"]>

  export type ambalajlarSelectScalar = {
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ambalajlarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "tipi" | "daraKg" | "aciklama" | "durum" | "createdAt" | "updatedAt", ExtArgs["result"]["ambalajlar"]>
  export type ambalajlarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | ambalajlar$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | AmbalajlarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ambalajlarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ambalajlarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ambalajlarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ambalajlar"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ad: string
      tipi: string
      daraKg: number
      aciklama: string | null
      durum: string
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["ambalajlar"]>
    composites: {}
  }

  type ambalajlarGetPayload<S extends boolean | null | undefined | ambalajlarDefaultArgs> = $Result.GetResult<Prisma.$ambalajlarPayload, S>

  type ambalajlarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ambalajlarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AmbalajlarCountAggregateInputType | true
    }

  export interface ambalajlarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ambalajlar'], meta: { name: 'ambalajlar' } }
    /**
     * Find zero or one Ambalajlar that matches the filter.
     * @param {ambalajlarFindUniqueArgs} args - Arguments to find a Ambalajlar
     * @example
     * // Get one Ambalajlar
     * const ambalajlar = await prisma.ambalajlar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ambalajlarFindUniqueArgs>(args: SelectSubset<T, ambalajlarFindUniqueArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ambalajlar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ambalajlarFindUniqueOrThrowArgs} args - Arguments to find a Ambalajlar
     * @example
     * // Get one Ambalajlar
     * const ambalajlar = await prisma.ambalajlar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ambalajlarFindUniqueOrThrowArgs>(args: SelectSubset<T, ambalajlarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ambalajlar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ambalajlarFindFirstArgs} args - Arguments to find a Ambalajlar
     * @example
     * // Get one Ambalajlar
     * const ambalajlar = await prisma.ambalajlar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ambalajlarFindFirstArgs>(args?: SelectSubset<T, ambalajlarFindFirstArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ambalajlar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ambalajlarFindFirstOrThrowArgs} args - Arguments to find a Ambalajlar
     * @example
     * // Get one Ambalajlar
     * const ambalajlar = await prisma.ambalajlar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ambalajlarFindFirstOrThrowArgs>(args?: SelectSubset<T, ambalajlarFindFirstOrThrowArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ambalajlars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ambalajlarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ambalajlars
     * const ambalajlars = await prisma.ambalajlar.findMany()
     * 
     * // Get first 10 Ambalajlars
     * const ambalajlars = await prisma.ambalajlar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ambalajlarWithIdOnly = await prisma.ambalajlar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ambalajlarFindManyArgs>(args?: SelectSubset<T, ambalajlarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ambalajlar.
     * @param {ambalajlarCreateArgs} args - Arguments to create a Ambalajlar.
     * @example
     * // Create one Ambalajlar
     * const Ambalajlar = await prisma.ambalajlar.create({
     *   data: {
     *     // ... data to create a Ambalajlar
     *   }
     * })
     * 
     */
    create<T extends ambalajlarCreateArgs>(args: SelectSubset<T, ambalajlarCreateArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ambalajlars.
     * @param {ambalajlarCreateManyArgs} args - Arguments to create many Ambalajlars.
     * @example
     * // Create many Ambalajlars
     * const ambalajlar = await prisma.ambalajlar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ambalajlarCreateManyArgs>(args?: SelectSubset<T, ambalajlarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ambalajlars and returns the data saved in the database.
     * @param {ambalajlarCreateManyAndReturnArgs} args - Arguments to create many Ambalajlars.
     * @example
     * // Create many Ambalajlars
     * const ambalajlar = await prisma.ambalajlar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ambalajlars and only return the `id`
     * const ambalajlarWithIdOnly = await prisma.ambalajlar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ambalajlarCreateManyAndReturnArgs>(args?: SelectSubset<T, ambalajlarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ambalajlar.
     * @param {ambalajlarDeleteArgs} args - Arguments to delete one Ambalajlar.
     * @example
     * // Delete one Ambalajlar
     * const Ambalajlar = await prisma.ambalajlar.delete({
     *   where: {
     *     // ... filter to delete one Ambalajlar
     *   }
     * })
     * 
     */
    delete<T extends ambalajlarDeleteArgs>(args: SelectSubset<T, ambalajlarDeleteArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ambalajlar.
     * @param {ambalajlarUpdateArgs} args - Arguments to update one Ambalajlar.
     * @example
     * // Update one Ambalajlar
     * const ambalajlar = await prisma.ambalajlar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ambalajlarUpdateArgs>(args: SelectSubset<T, ambalajlarUpdateArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ambalajlars.
     * @param {ambalajlarDeleteManyArgs} args - Arguments to filter Ambalajlars to delete.
     * @example
     * // Delete a few Ambalajlars
     * const { count } = await prisma.ambalajlar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ambalajlarDeleteManyArgs>(args?: SelectSubset<T, ambalajlarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ambalajlars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ambalajlarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ambalajlars
     * const ambalajlar = await prisma.ambalajlar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ambalajlarUpdateManyArgs>(args: SelectSubset<T, ambalajlarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ambalajlars and returns the data updated in the database.
     * @param {ambalajlarUpdateManyAndReturnArgs} args - Arguments to update many Ambalajlars.
     * @example
     * // Update many Ambalajlars
     * const ambalajlar = await prisma.ambalajlar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ambalajlars and only return the `id`
     * const ambalajlarWithIdOnly = await prisma.ambalajlar.updateManyAndReturn({
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
    updateManyAndReturn<T extends ambalajlarUpdateManyAndReturnArgs>(args: SelectSubset<T, ambalajlarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ambalajlar.
     * @param {ambalajlarUpsertArgs} args - Arguments to update or create a Ambalajlar.
     * @example
     * // Update or create a Ambalajlar
     * const ambalajlar = await prisma.ambalajlar.upsert({
     *   create: {
     *     // ... data to create a Ambalajlar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ambalajlar we want to update
     *   }
     * })
     */
    upsert<T extends ambalajlarUpsertArgs>(args: SelectSubset<T, ambalajlarUpsertArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ambalajlars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ambalajlarCountArgs} args - Arguments to filter Ambalajlars to count.
     * @example
     * // Count the number of Ambalajlars
     * const count = await prisma.ambalajlar.count({
     *   where: {
     *     // ... the filter for the Ambalajlars we want to count
     *   }
     * })
    **/
    count<T extends ambalajlarCountArgs>(
      args?: Subset<T, ambalajlarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AmbalajlarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ambalajlar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajlarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AmbalajlarAggregateArgs>(args: Subset<T, AmbalajlarAggregateArgs>): Prisma.PrismaPromise<GetAmbalajlarAggregateType<T>>

    /**
     * Group by Ambalajlar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ambalajlarGroupByArgs} args - Group by arguments.
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
      T extends ambalajlarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ambalajlarGroupByArgs['orderBy'] }
        : { orderBy?: ambalajlarGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ambalajlarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAmbalajlarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ambalajlar model
   */
  readonly fields: ambalajlarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ambalajlar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ambalajlarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends ambalajlar$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, ambalajlar$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ambalajlar model
   */
  interface ambalajlarFieldRefs {
    readonly id: FieldRef<"ambalajlar", 'String'>
    readonly ad: FieldRef<"ambalajlar", 'String'>
    readonly tipi: FieldRef<"ambalajlar", 'String'>
    readonly daraKg: FieldRef<"ambalajlar", 'Float'>
    readonly aciklama: FieldRef<"ambalajlar", 'String'>
    readonly durum: FieldRef<"ambalajlar", 'String'>
    readonly createdAt: FieldRef<"ambalajlar", 'DateTime'>
    readonly updatedAt: FieldRef<"ambalajlar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ambalajlar findUnique
   */
  export type ambalajlarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * Filter, which ambalajlar to fetch.
     */
    where: ambalajlarWhereUniqueInput
  }

  /**
   * ambalajlar findUniqueOrThrow
   */
  export type ambalajlarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * Filter, which ambalajlar to fetch.
     */
    where: ambalajlarWhereUniqueInput
  }

  /**
   * ambalajlar findFirst
   */
  export type ambalajlarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * Filter, which ambalajlar to fetch.
     */
    where?: ambalajlarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ambalajlars to fetch.
     */
    orderBy?: ambalajlarOrderByWithRelationInput | ambalajlarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ambalajlars.
     */
    cursor?: ambalajlarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ambalajlars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ambalajlars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ambalajlars.
     */
    distinct?: AmbalajlarScalarFieldEnum | AmbalajlarScalarFieldEnum[]
  }

  /**
   * ambalajlar findFirstOrThrow
   */
  export type ambalajlarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * Filter, which ambalajlar to fetch.
     */
    where?: ambalajlarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ambalajlars to fetch.
     */
    orderBy?: ambalajlarOrderByWithRelationInput | ambalajlarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ambalajlars.
     */
    cursor?: ambalajlarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ambalajlars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ambalajlars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ambalajlars.
     */
    distinct?: AmbalajlarScalarFieldEnum | AmbalajlarScalarFieldEnum[]
  }

  /**
   * ambalajlar findMany
   */
  export type ambalajlarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * Filter, which ambalajlars to fetch.
     */
    where?: ambalajlarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ambalajlars to fetch.
     */
    orderBy?: ambalajlarOrderByWithRelationInput | ambalajlarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ambalajlars.
     */
    cursor?: ambalajlarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ambalajlars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ambalajlars.
     */
    skip?: number
    distinct?: AmbalajlarScalarFieldEnum | AmbalajlarScalarFieldEnum[]
  }

  /**
   * ambalajlar create
   */
  export type ambalajlarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * The data needed to create a ambalajlar.
     */
    data: XOR<ambalajlarCreateInput, ambalajlarUncheckedCreateInput>
  }

  /**
   * ambalajlar createMany
   */
  export type ambalajlarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ambalajlars.
     */
    data: ambalajlarCreateManyInput | ambalajlarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ambalajlar createManyAndReturn
   */
  export type ambalajlarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * The data used to create many ambalajlars.
     */
    data: ambalajlarCreateManyInput | ambalajlarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ambalajlar update
   */
  export type ambalajlarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * The data needed to update a ambalajlar.
     */
    data: XOR<ambalajlarUpdateInput, ambalajlarUncheckedUpdateInput>
    /**
     * Choose, which ambalajlar to update.
     */
    where: ambalajlarWhereUniqueInput
  }

  /**
   * ambalajlar updateMany
   */
  export type ambalajlarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ambalajlars.
     */
    data: XOR<ambalajlarUpdateManyMutationInput, ambalajlarUncheckedUpdateManyInput>
    /**
     * Filter which ambalajlars to update
     */
    where?: ambalajlarWhereInput
    /**
     * Limit how many ambalajlars to update.
     */
    limit?: number
  }

  /**
   * ambalajlar updateManyAndReturn
   */
  export type ambalajlarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * The data used to update ambalajlars.
     */
    data: XOR<ambalajlarUpdateManyMutationInput, ambalajlarUncheckedUpdateManyInput>
    /**
     * Filter which ambalajlars to update
     */
    where?: ambalajlarWhereInput
    /**
     * Limit how many ambalajlars to update.
     */
    limit?: number
  }

  /**
   * ambalajlar upsert
   */
  export type ambalajlarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * The filter to search for the ambalajlar to update in case it exists.
     */
    where: ambalajlarWhereUniqueInput
    /**
     * In case the ambalajlar found by the `where` argument doesn't exist, create a new ambalajlar with this data.
     */
    create: XOR<ambalajlarCreateInput, ambalajlarUncheckedCreateInput>
    /**
     * In case the ambalajlar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ambalajlarUpdateInput, ambalajlarUncheckedUpdateInput>
  }

  /**
   * ambalajlar delete
   */
  export type ambalajlarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    /**
     * Filter which ambalajlar to delete.
     */
    where: ambalajlarWhereUniqueInput
  }

  /**
   * ambalajlar deleteMany
   */
  export type ambalajlarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ambalajlars to delete
     */
    where?: ambalajlarWhereInput
    /**
     * Limit how many ambalajlars to delete.
     */
    limit?: number
  }

  /**
   * ambalajlar.mal_kabul_records
   */
  export type ambalajlar$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * ambalajlar without action
   */
  export type ambalajlarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
  }


  /**
   * Model faturalar
   */

  export type AggregateFaturalar = {
    _count: FaturalarCountAggregateOutputType | null
    _avg: FaturalarAvgAggregateOutputType | null
    _sum: FaturalarSumAggregateOutputType | null
    _min: FaturalarMinAggregateOutputType | null
    _max: FaturalarMaxAggregateOutputType | null
  }

  export type FaturalarAvgAggregateOutputType = {
    toplamTutar: number | null
    kdvOrani: number | null
    kdvTutari: number | null
    genelToplam: number | null
  }

  export type FaturalarSumAggregateOutputType = {
    toplamTutar: number | null
    kdvOrani: number | null
    kdvTutari: number | null
    genelToplam: number | null
  }

  export type FaturalarMinAggregateOutputType = {
    id: string | null
    faturaNo: string | null
    tarih: Date | null
    toplamTutar: number | null
    kdvOrani: number | null
    kdvTutari: number | null
    genelToplam: number | null
    notlar: string | null
    satinAlmaciId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaturalarMaxAggregateOutputType = {
    id: string | null
    faturaNo: string | null
    tarih: Date | null
    toplamTutar: number | null
    kdvOrani: number | null
    kdvTutari: number | null
    genelToplam: number | null
    notlar: string | null
    satinAlmaciId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FaturalarCountAggregateOutputType = {
    id: number
    faturaNo: number
    tarih: number
    toplamTutar: number
    kdvOrani: number
    kdvTutari: number
    genelToplam: number
    notlar: number
    satinAlmaciId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FaturalarAvgAggregateInputType = {
    toplamTutar?: true
    kdvOrani?: true
    kdvTutari?: true
    genelToplam?: true
  }

  export type FaturalarSumAggregateInputType = {
    toplamTutar?: true
    kdvOrani?: true
    kdvTutari?: true
    genelToplam?: true
  }

  export type FaturalarMinAggregateInputType = {
    id?: true
    faturaNo?: true
    tarih?: true
    toplamTutar?: true
    kdvOrani?: true
    kdvTutari?: true
    genelToplam?: true
    notlar?: true
    satinAlmaciId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaturalarMaxAggregateInputType = {
    id?: true
    faturaNo?: true
    tarih?: true
    toplamTutar?: true
    kdvOrani?: true
    kdvTutari?: true
    genelToplam?: true
    notlar?: true
    satinAlmaciId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FaturalarCountAggregateInputType = {
    id?: true
    faturaNo?: true
    tarih?: true
    toplamTutar?: true
    kdvOrani?: true
    kdvTutari?: true
    genelToplam?: true
    notlar?: true
    satinAlmaciId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FaturalarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which faturalar to aggregate.
     */
    where?: faturalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faturalars to fetch.
     */
    orderBy?: faturalarOrderByWithRelationInput | faturalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: faturalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faturalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faturalars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned faturalars
    **/
    _count?: true | FaturalarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FaturalarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FaturalarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FaturalarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FaturalarMaxAggregateInputType
  }

  export type GetFaturalarAggregateType<T extends FaturalarAggregateArgs> = {
        [P in keyof T & keyof AggregateFaturalar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFaturalar[P]>
      : GetScalarType<T[P], AggregateFaturalar[P]>
  }




  export type faturalarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: faturalarWhereInput
    orderBy?: faturalarOrderByWithAggregationInput | faturalarOrderByWithAggregationInput[]
    by: FaturalarScalarFieldEnum[] | FaturalarScalarFieldEnum
    having?: faturalarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FaturalarCountAggregateInputType | true
    _avg?: FaturalarAvgAggregateInputType
    _sum?: FaturalarSumAggregateInputType
    _min?: FaturalarMinAggregateInputType
    _max?: FaturalarMaxAggregateInputType
  }

  export type FaturalarGroupByOutputType = {
    id: string
    faturaNo: string
    tarih: Date | null
    toplamTutar: number
    kdvOrani: number | null
    kdvTutari: number
    genelToplam: number
    notlar: string | null
    satinAlmaciId: string
    createdAt: Date | null
    updatedAt: Date | null
    _count: FaturalarCountAggregateOutputType | null
    _avg: FaturalarAvgAggregateOutputType | null
    _sum: FaturalarSumAggregateOutputType | null
    _min: FaturalarMinAggregateOutputType | null
    _max: FaturalarMaxAggregateOutputType | null
  }

  type GetFaturalarGroupByPayload<T extends faturalarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FaturalarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FaturalarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FaturalarGroupByOutputType[P]>
            : GetScalarType<T[P], FaturalarGroupByOutputType[P]>
        }
      >
    >


  export type faturalarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faturaNo?: boolean
    tarih?: boolean
    toplamTutar?: boolean
    kdvOrani?: boolean
    kdvTutari?: boolean
    genelToplam?: boolean
    notlar?: boolean
    satinAlmaciId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mal_kabul_records?: boolean | faturalar$mal_kabul_recordsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | FaturalarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faturalar"]>

  export type faturalarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faturaNo?: boolean
    tarih?: boolean
    toplamTutar?: boolean
    kdvOrani?: boolean
    kdvTutari?: boolean
    genelToplam?: boolean
    notlar?: boolean
    satinAlmaciId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faturalar"]>

  export type faturalarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faturaNo?: boolean
    tarih?: boolean
    toplamTutar?: boolean
    kdvOrani?: boolean
    kdvTutari?: boolean
    genelToplam?: boolean
    notlar?: boolean
    satinAlmaciId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faturalar"]>

  export type faturalarSelectScalar = {
    id?: boolean
    faturaNo?: boolean
    tarih?: boolean
    toplamTutar?: boolean
    kdvOrani?: boolean
    kdvTutari?: boolean
    genelToplam?: boolean
    notlar?: boolean
    satinAlmaciId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type faturalarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "faturaNo" | "tarih" | "toplamTutar" | "kdvOrani" | "kdvTutari" | "genelToplam" | "notlar" | "satinAlmaciId" | "createdAt" | "updatedAt", ExtArgs["result"]["faturalar"]>
  export type faturalarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | faturalar$mal_kabul_recordsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | FaturalarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type faturalarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type faturalarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $faturalarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "faturalar"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      faturaNo: string
      tarih: Date | null
      toplamTutar: number
      kdvOrani: number | null
      kdvTutari: number
      genelToplam: number
      notlar: string | null
      satinAlmaciId: string
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["faturalar"]>
    composites: {}
  }

  type faturalarGetPayload<S extends boolean | null | undefined | faturalarDefaultArgs> = $Result.GetResult<Prisma.$faturalarPayload, S>

  type faturalarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<faturalarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FaturalarCountAggregateInputType | true
    }

  export interface faturalarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['faturalar'], meta: { name: 'faturalar' } }
    /**
     * Find zero or one Faturalar that matches the filter.
     * @param {faturalarFindUniqueArgs} args - Arguments to find a Faturalar
     * @example
     * // Get one Faturalar
     * const faturalar = await prisma.faturalar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends faturalarFindUniqueArgs>(args: SelectSubset<T, faturalarFindUniqueArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Faturalar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {faturalarFindUniqueOrThrowArgs} args - Arguments to find a Faturalar
     * @example
     * // Get one Faturalar
     * const faturalar = await prisma.faturalar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends faturalarFindUniqueOrThrowArgs>(args: SelectSubset<T, faturalarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Faturalar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {faturalarFindFirstArgs} args - Arguments to find a Faturalar
     * @example
     * // Get one Faturalar
     * const faturalar = await prisma.faturalar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends faturalarFindFirstArgs>(args?: SelectSubset<T, faturalarFindFirstArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Faturalar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {faturalarFindFirstOrThrowArgs} args - Arguments to find a Faturalar
     * @example
     * // Get one Faturalar
     * const faturalar = await prisma.faturalar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends faturalarFindFirstOrThrowArgs>(args?: SelectSubset<T, faturalarFindFirstOrThrowArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Faturalars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {faturalarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Faturalars
     * const faturalars = await prisma.faturalar.findMany()
     * 
     * // Get first 10 Faturalars
     * const faturalars = await prisma.faturalar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const faturalarWithIdOnly = await prisma.faturalar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends faturalarFindManyArgs>(args?: SelectSubset<T, faturalarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Faturalar.
     * @param {faturalarCreateArgs} args - Arguments to create a Faturalar.
     * @example
     * // Create one Faturalar
     * const Faturalar = await prisma.faturalar.create({
     *   data: {
     *     // ... data to create a Faturalar
     *   }
     * })
     * 
     */
    create<T extends faturalarCreateArgs>(args: SelectSubset<T, faturalarCreateArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Faturalars.
     * @param {faturalarCreateManyArgs} args - Arguments to create many Faturalars.
     * @example
     * // Create many Faturalars
     * const faturalar = await prisma.faturalar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends faturalarCreateManyArgs>(args?: SelectSubset<T, faturalarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Faturalars and returns the data saved in the database.
     * @param {faturalarCreateManyAndReturnArgs} args - Arguments to create many Faturalars.
     * @example
     * // Create many Faturalars
     * const faturalar = await prisma.faturalar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Faturalars and only return the `id`
     * const faturalarWithIdOnly = await prisma.faturalar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends faturalarCreateManyAndReturnArgs>(args?: SelectSubset<T, faturalarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Faturalar.
     * @param {faturalarDeleteArgs} args - Arguments to delete one Faturalar.
     * @example
     * // Delete one Faturalar
     * const Faturalar = await prisma.faturalar.delete({
     *   where: {
     *     // ... filter to delete one Faturalar
     *   }
     * })
     * 
     */
    delete<T extends faturalarDeleteArgs>(args: SelectSubset<T, faturalarDeleteArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Faturalar.
     * @param {faturalarUpdateArgs} args - Arguments to update one Faturalar.
     * @example
     * // Update one Faturalar
     * const faturalar = await prisma.faturalar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends faturalarUpdateArgs>(args: SelectSubset<T, faturalarUpdateArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Faturalars.
     * @param {faturalarDeleteManyArgs} args - Arguments to filter Faturalars to delete.
     * @example
     * // Delete a few Faturalars
     * const { count } = await prisma.faturalar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends faturalarDeleteManyArgs>(args?: SelectSubset<T, faturalarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faturalars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {faturalarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Faturalars
     * const faturalar = await prisma.faturalar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends faturalarUpdateManyArgs>(args: SelectSubset<T, faturalarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faturalars and returns the data updated in the database.
     * @param {faturalarUpdateManyAndReturnArgs} args - Arguments to update many Faturalars.
     * @example
     * // Update many Faturalars
     * const faturalar = await prisma.faturalar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Faturalars and only return the `id`
     * const faturalarWithIdOnly = await prisma.faturalar.updateManyAndReturn({
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
    updateManyAndReturn<T extends faturalarUpdateManyAndReturnArgs>(args: SelectSubset<T, faturalarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Faturalar.
     * @param {faturalarUpsertArgs} args - Arguments to update or create a Faturalar.
     * @example
     * // Update or create a Faturalar
     * const faturalar = await prisma.faturalar.upsert({
     *   create: {
     *     // ... data to create a Faturalar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Faturalar we want to update
     *   }
     * })
     */
    upsert<T extends faturalarUpsertArgs>(args: SelectSubset<T, faturalarUpsertArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Faturalars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {faturalarCountArgs} args - Arguments to filter Faturalars to count.
     * @example
     * // Count the number of Faturalars
     * const count = await prisma.faturalar.count({
     *   where: {
     *     // ... the filter for the Faturalars we want to count
     *   }
     * })
    **/
    count<T extends faturalarCountArgs>(
      args?: Subset<T, faturalarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FaturalarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Faturalar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturalarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FaturalarAggregateArgs>(args: Subset<T, FaturalarAggregateArgs>): Prisma.PrismaPromise<GetFaturalarAggregateType<T>>

    /**
     * Group by Faturalar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {faturalarGroupByArgs} args - Group by arguments.
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
      T extends faturalarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: faturalarGroupByArgs['orderBy'] }
        : { orderBy?: faturalarGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, faturalarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaturalarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the faturalar model
   */
  readonly fields: faturalarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for faturalar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__faturalarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends faturalar$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, faturalar$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the faturalar model
   */
  interface faturalarFieldRefs {
    readonly id: FieldRef<"faturalar", 'String'>
    readonly faturaNo: FieldRef<"faturalar", 'String'>
    readonly tarih: FieldRef<"faturalar", 'DateTime'>
    readonly toplamTutar: FieldRef<"faturalar", 'Float'>
    readonly kdvOrani: FieldRef<"faturalar", 'Float'>
    readonly kdvTutari: FieldRef<"faturalar", 'Float'>
    readonly genelToplam: FieldRef<"faturalar", 'Float'>
    readonly notlar: FieldRef<"faturalar", 'String'>
    readonly satinAlmaciId: FieldRef<"faturalar", 'String'>
    readonly createdAt: FieldRef<"faturalar", 'DateTime'>
    readonly updatedAt: FieldRef<"faturalar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * faturalar findUnique
   */
  export type faturalarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * Filter, which faturalar to fetch.
     */
    where: faturalarWhereUniqueInput
  }

  /**
   * faturalar findUniqueOrThrow
   */
  export type faturalarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * Filter, which faturalar to fetch.
     */
    where: faturalarWhereUniqueInput
  }

  /**
   * faturalar findFirst
   */
  export type faturalarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * Filter, which faturalar to fetch.
     */
    where?: faturalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faturalars to fetch.
     */
    orderBy?: faturalarOrderByWithRelationInput | faturalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for faturalars.
     */
    cursor?: faturalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faturalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faturalars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of faturalars.
     */
    distinct?: FaturalarScalarFieldEnum | FaturalarScalarFieldEnum[]
  }

  /**
   * faturalar findFirstOrThrow
   */
  export type faturalarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * Filter, which faturalar to fetch.
     */
    where?: faturalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faturalars to fetch.
     */
    orderBy?: faturalarOrderByWithRelationInput | faturalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for faturalars.
     */
    cursor?: faturalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faturalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faturalars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of faturalars.
     */
    distinct?: FaturalarScalarFieldEnum | FaturalarScalarFieldEnum[]
  }

  /**
   * faturalar findMany
   */
  export type faturalarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * Filter, which faturalars to fetch.
     */
    where?: faturalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faturalars to fetch.
     */
    orderBy?: faturalarOrderByWithRelationInput | faturalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing faturalars.
     */
    cursor?: faturalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faturalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faturalars.
     */
    skip?: number
    distinct?: FaturalarScalarFieldEnum | FaturalarScalarFieldEnum[]
  }

  /**
   * faturalar create
   */
  export type faturalarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * The data needed to create a faturalar.
     */
    data: XOR<faturalarCreateInput, faturalarUncheckedCreateInput>
  }

  /**
   * faturalar createMany
   */
  export type faturalarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many faturalars.
     */
    data: faturalarCreateManyInput | faturalarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * faturalar createManyAndReturn
   */
  export type faturalarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * The data used to create many faturalars.
     */
    data: faturalarCreateManyInput | faturalarCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * faturalar update
   */
  export type faturalarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * The data needed to update a faturalar.
     */
    data: XOR<faturalarUpdateInput, faturalarUncheckedUpdateInput>
    /**
     * Choose, which faturalar to update.
     */
    where: faturalarWhereUniqueInput
  }

  /**
   * faturalar updateMany
   */
  export type faturalarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update faturalars.
     */
    data: XOR<faturalarUpdateManyMutationInput, faturalarUncheckedUpdateManyInput>
    /**
     * Filter which faturalars to update
     */
    where?: faturalarWhereInput
    /**
     * Limit how many faturalars to update.
     */
    limit?: number
  }

  /**
   * faturalar updateManyAndReturn
   */
  export type faturalarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * The data used to update faturalars.
     */
    data: XOR<faturalarUpdateManyMutationInput, faturalarUncheckedUpdateManyInput>
    /**
     * Filter which faturalars to update
     */
    where?: faturalarWhereInput
    /**
     * Limit how many faturalars to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * faturalar upsert
   */
  export type faturalarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * The filter to search for the faturalar to update in case it exists.
     */
    where: faturalarWhereUniqueInput
    /**
     * In case the faturalar found by the `where` argument doesn't exist, create a new faturalar with this data.
     */
    create: XOR<faturalarCreateInput, faturalarUncheckedCreateInput>
    /**
     * In case the faturalar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<faturalarUpdateInput, faturalarUncheckedUpdateInput>
  }

  /**
   * faturalar delete
   */
  export type faturalarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    /**
     * Filter which faturalar to delete.
     */
    where: faturalarWhereUniqueInput
  }

  /**
   * faturalar deleteMany
   */
  export type faturalarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which faturalars to delete
     */
    where?: faturalarWhereInput
    /**
     * Limit how many faturalars to delete.
     */
    limit?: number
  }

  /**
   * faturalar.mal_kabul_records
   */
  export type faturalar$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * faturalar without action
   */
  export type faturalarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
  }


  /**
   * Model komisyoncular
   */

  export type AggregateKomisyoncular = {
    _count: KomisyoncularCountAggregateOutputType | null
    _min: KomisyoncularMinAggregateOutputType | null
    _max: KomisyoncularMaxAggregateOutputType | null
  }

  export type KomisyoncularMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    dukkanAdi: string | null
    durum: string | null
    komisyonNo: string | null
    komisyonKodu: string | null
    sehir: string | null
    vkn: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
  }

  export type KomisyoncularMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    dukkanAdi: string | null
    durum: string | null
    komisyonNo: string | null
    komisyonKodu: string | null
    sehir: string | null
    vkn: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
  }

  export type KomisyoncularCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    dukkanAdi: number
    durum: number
    komisyonNo: number
    komisyonKodu: number
    sehir: number
    vkn: number
    yetkiliAdi: number
    yetkiliTelefon: number
    _all: number
  }


  export type KomisyoncularMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    dukkanAdi?: true
    durum?: true
    komisyonNo?: true
    komisyonKodu?: true
    sehir?: true
    vkn?: true
    yetkiliAdi?: true
    yetkiliTelefon?: true
  }

  export type KomisyoncularMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    dukkanAdi?: true
    durum?: true
    komisyonNo?: true
    komisyonKodu?: true
    sehir?: true
    vkn?: true
    yetkiliAdi?: true
    yetkiliTelefon?: true
  }

  export type KomisyoncularCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    dukkanAdi?: true
    durum?: true
    komisyonNo?: true
    komisyonKodu?: true
    sehir?: true
    vkn?: true
    yetkiliAdi?: true
    yetkiliTelefon?: true
    _all?: true
  }

  export type KomisyoncularAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which komisyoncular to aggregate.
     */
    where?: komisyoncularWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of komisyonculars to fetch.
     */
    orderBy?: komisyoncularOrderByWithRelationInput | komisyoncularOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: komisyoncularWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` komisyonculars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` komisyonculars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned komisyonculars
    **/
    _count?: true | KomisyoncularCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KomisyoncularMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KomisyoncularMaxAggregateInputType
  }

  export type GetKomisyoncularAggregateType<T extends KomisyoncularAggregateArgs> = {
        [P in keyof T & keyof AggregateKomisyoncular]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKomisyoncular[P]>
      : GetScalarType<T[P], AggregateKomisyoncular[P]>
  }




  export type komisyoncularGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: komisyoncularWhereInput
    orderBy?: komisyoncularOrderByWithAggregationInput | komisyoncularOrderByWithAggregationInput[]
    by: KomisyoncularScalarFieldEnum[] | KomisyoncularScalarFieldEnum
    having?: komisyoncularScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KomisyoncularCountAggregateInputType | true
    _min?: KomisyoncularMinAggregateInputType
    _max?: KomisyoncularMaxAggregateInputType
  }

  export type KomisyoncularGroupByOutputType = {
    id: string
    createdAt: Date | null
    updatedAt: Date | null
    dukkanAdi: string
    durum: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    _count: KomisyoncularCountAggregateOutputType | null
    _min: KomisyoncularMinAggregateOutputType | null
    _max: KomisyoncularMaxAggregateOutputType | null
  }

  type GetKomisyoncularGroupByPayload<T extends komisyoncularGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KomisyoncularGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KomisyoncularGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KomisyoncularGroupByOutputType[P]>
            : GetScalarType<T[P], KomisyoncularGroupByOutputType[P]>
        }
      >
    >


  export type komisyoncularSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dukkanAdi?: boolean
    durum?: boolean
    komisyonNo?: boolean
    komisyonKodu?: boolean
    sehir?: boolean
    vkn?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
    mal_kabul_records?: boolean | komisyoncular$mal_kabul_recordsArgs<ExtArgs>
    ureticiler?: boolean | komisyoncular$ureticilerArgs<ExtArgs>
    _count?: boolean | KomisyoncularCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["komisyoncular"]>

  export type komisyoncularSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dukkanAdi?: boolean
    durum?: boolean
    komisyonNo?: boolean
    komisyonKodu?: boolean
    sehir?: boolean
    vkn?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
  }, ExtArgs["result"]["komisyoncular"]>

  export type komisyoncularSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dukkanAdi?: boolean
    durum?: boolean
    komisyonNo?: boolean
    komisyonKodu?: boolean
    sehir?: boolean
    vkn?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
  }, ExtArgs["result"]["komisyoncular"]>

  export type komisyoncularSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dukkanAdi?: boolean
    durum?: boolean
    komisyonNo?: boolean
    komisyonKodu?: boolean
    sehir?: boolean
    vkn?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
  }

  export type komisyoncularOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "dukkanAdi" | "durum" | "komisyonNo" | "komisyonKodu" | "sehir" | "vkn" | "yetkiliAdi" | "yetkiliTelefon", ExtArgs["result"]["komisyoncular"]>
  export type komisyoncularInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | komisyoncular$mal_kabul_recordsArgs<ExtArgs>
    ureticiler?: boolean | komisyoncular$ureticilerArgs<ExtArgs>
    _count?: boolean | KomisyoncularCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type komisyoncularIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type komisyoncularIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $komisyoncularPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "komisyoncular"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
      ureticiler: Prisma.$ureticilerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date | null
      updatedAt: Date | null
      dukkanAdi: string
      durum: string
      komisyonNo: string
      komisyonKodu: string
      sehir: string
      vkn: string | null
      yetkiliAdi: string | null
      yetkiliTelefon: string | null
    }, ExtArgs["result"]["komisyoncular"]>
    composites: {}
  }

  type komisyoncularGetPayload<S extends boolean | null | undefined | komisyoncularDefaultArgs> = $Result.GetResult<Prisma.$komisyoncularPayload, S>

  type komisyoncularCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<komisyoncularFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KomisyoncularCountAggregateInputType | true
    }

  export interface komisyoncularDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['komisyoncular'], meta: { name: 'komisyoncular' } }
    /**
     * Find zero or one Komisyoncular that matches the filter.
     * @param {komisyoncularFindUniqueArgs} args - Arguments to find a Komisyoncular
     * @example
     * // Get one Komisyoncular
     * const komisyoncular = await prisma.komisyoncular.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends komisyoncularFindUniqueArgs>(args: SelectSubset<T, komisyoncularFindUniqueArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Komisyoncular that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {komisyoncularFindUniqueOrThrowArgs} args - Arguments to find a Komisyoncular
     * @example
     * // Get one Komisyoncular
     * const komisyoncular = await prisma.komisyoncular.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends komisyoncularFindUniqueOrThrowArgs>(args: SelectSubset<T, komisyoncularFindUniqueOrThrowArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Komisyoncular that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {komisyoncularFindFirstArgs} args - Arguments to find a Komisyoncular
     * @example
     * // Get one Komisyoncular
     * const komisyoncular = await prisma.komisyoncular.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends komisyoncularFindFirstArgs>(args?: SelectSubset<T, komisyoncularFindFirstArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Komisyoncular that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {komisyoncularFindFirstOrThrowArgs} args - Arguments to find a Komisyoncular
     * @example
     * // Get one Komisyoncular
     * const komisyoncular = await prisma.komisyoncular.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends komisyoncularFindFirstOrThrowArgs>(args?: SelectSubset<T, komisyoncularFindFirstOrThrowArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Komisyonculars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {komisyoncularFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Komisyonculars
     * const komisyonculars = await prisma.komisyoncular.findMany()
     * 
     * // Get first 10 Komisyonculars
     * const komisyonculars = await prisma.komisyoncular.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const komisyoncularWithIdOnly = await prisma.komisyoncular.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends komisyoncularFindManyArgs>(args?: SelectSubset<T, komisyoncularFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Komisyoncular.
     * @param {komisyoncularCreateArgs} args - Arguments to create a Komisyoncular.
     * @example
     * // Create one Komisyoncular
     * const Komisyoncular = await prisma.komisyoncular.create({
     *   data: {
     *     // ... data to create a Komisyoncular
     *   }
     * })
     * 
     */
    create<T extends komisyoncularCreateArgs>(args: SelectSubset<T, komisyoncularCreateArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Komisyonculars.
     * @param {komisyoncularCreateManyArgs} args - Arguments to create many Komisyonculars.
     * @example
     * // Create many Komisyonculars
     * const komisyoncular = await prisma.komisyoncular.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends komisyoncularCreateManyArgs>(args?: SelectSubset<T, komisyoncularCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Komisyonculars and returns the data saved in the database.
     * @param {komisyoncularCreateManyAndReturnArgs} args - Arguments to create many Komisyonculars.
     * @example
     * // Create many Komisyonculars
     * const komisyoncular = await prisma.komisyoncular.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Komisyonculars and only return the `id`
     * const komisyoncularWithIdOnly = await prisma.komisyoncular.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends komisyoncularCreateManyAndReturnArgs>(args?: SelectSubset<T, komisyoncularCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Komisyoncular.
     * @param {komisyoncularDeleteArgs} args - Arguments to delete one Komisyoncular.
     * @example
     * // Delete one Komisyoncular
     * const Komisyoncular = await prisma.komisyoncular.delete({
     *   where: {
     *     // ... filter to delete one Komisyoncular
     *   }
     * })
     * 
     */
    delete<T extends komisyoncularDeleteArgs>(args: SelectSubset<T, komisyoncularDeleteArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Komisyoncular.
     * @param {komisyoncularUpdateArgs} args - Arguments to update one Komisyoncular.
     * @example
     * // Update one Komisyoncular
     * const komisyoncular = await prisma.komisyoncular.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends komisyoncularUpdateArgs>(args: SelectSubset<T, komisyoncularUpdateArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Komisyonculars.
     * @param {komisyoncularDeleteManyArgs} args - Arguments to filter Komisyonculars to delete.
     * @example
     * // Delete a few Komisyonculars
     * const { count } = await prisma.komisyoncular.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends komisyoncularDeleteManyArgs>(args?: SelectSubset<T, komisyoncularDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Komisyonculars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {komisyoncularUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Komisyonculars
     * const komisyoncular = await prisma.komisyoncular.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends komisyoncularUpdateManyArgs>(args: SelectSubset<T, komisyoncularUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Komisyonculars and returns the data updated in the database.
     * @param {komisyoncularUpdateManyAndReturnArgs} args - Arguments to update many Komisyonculars.
     * @example
     * // Update many Komisyonculars
     * const komisyoncular = await prisma.komisyoncular.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Komisyonculars and only return the `id`
     * const komisyoncularWithIdOnly = await prisma.komisyoncular.updateManyAndReturn({
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
    updateManyAndReturn<T extends komisyoncularUpdateManyAndReturnArgs>(args: SelectSubset<T, komisyoncularUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Komisyoncular.
     * @param {komisyoncularUpsertArgs} args - Arguments to update or create a Komisyoncular.
     * @example
     * // Update or create a Komisyoncular
     * const komisyoncular = await prisma.komisyoncular.upsert({
     *   create: {
     *     // ... data to create a Komisyoncular
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Komisyoncular we want to update
     *   }
     * })
     */
    upsert<T extends komisyoncularUpsertArgs>(args: SelectSubset<T, komisyoncularUpsertArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Komisyonculars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {komisyoncularCountArgs} args - Arguments to filter Komisyonculars to count.
     * @example
     * // Count the number of Komisyonculars
     * const count = await prisma.komisyoncular.count({
     *   where: {
     *     // ... the filter for the Komisyonculars we want to count
     *   }
     * })
    **/
    count<T extends komisyoncularCountArgs>(
      args?: Subset<T, komisyoncularCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KomisyoncularCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Komisyoncular.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncularAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KomisyoncularAggregateArgs>(args: Subset<T, KomisyoncularAggregateArgs>): Prisma.PrismaPromise<GetKomisyoncularAggregateType<T>>

    /**
     * Group by Komisyoncular.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {komisyoncularGroupByArgs} args - Group by arguments.
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
      T extends komisyoncularGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: komisyoncularGroupByArgs['orderBy'] }
        : { orderBy?: komisyoncularGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, komisyoncularGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKomisyoncularGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the komisyoncular model
   */
  readonly fields: komisyoncularFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for komisyoncular.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__komisyoncularClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends komisyoncular$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, komisyoncular$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ureticiler<T extends komisyoncular$ureticilerArgs<ExtArgs> = {}>(args?: Subset<T, komisyoncular$ureticilerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the komisyoncular model
   */
  interface komisyoncularFieldRefs {
    readonly id: FieldRef<"komisyoncular", 'String'>
    readonly createdAt: FieldRef<"komisyoncular", 'DateTime'>
    readonly updatedAt: FieldRef<"komisyoncular", 'DateTime'>
    readonly dukkanAdi: FieldRef<"komisyoncular", 'String'>
    readonly durum: FieldRef<"komisyoncular", 'String'>
    readonly komisyonNo: FieldRef<"komisyoncular", 'String'>
    readonly komisyonKodu: FieldRef<"komisyoncular", 'String'>
    readonly sehir: FieldRef<"komisyoncular", 'String'>
    readonly vkn: FieldRef<"komisyoncular", 'String'>
    readonly yetkiliAdi: FieldRef<"komisyoncular", 'String'>
    readonly yetkiliTelefon: FieldRef<"komisyoncular", 'String'>
  }
    

  // Custom InputTypes
  /**
   * komisyoncular findUnique
   */
  export type komisyoncularFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * Filter, which komisyoncular to fetch.
     */
    where: komisyoncularWhereUniqueInput
  }

  /**
   * komisyoncular findUniqueOrThrow
   */
  export type komisyoncularFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * Filter, which komisyoncular to fetch.
     */
    where: komisyoncularWhereUniqueInput
  }

  /**
   * komisyoncular findFirst
   */
  export type komisyoncularFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * Filter, which komisyoncular to fetch.
     */
    where?: komisyoncularWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of komisyonculars to fetch.
     */
    orderBy?: komisyoncularOrderByWithRelationInput | komisyoncularOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for komisyonculars.
     */
    cursor?: komisyoncularWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` komisyonculars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` komisyonculars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of komisyonculars.
     */
    distinct?: KomisyoncularScalarFieldEnum | KomisyoncularScalarFieldEnum[]
  }

  /**
   * komisyoncular findFirstOrThrow
   */
  export type komisyoncularFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * Filter, which komisyoncular to fetch.
     */
    where?: komisyoncularWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of komisyonculars to fetch.
     */
    orderBy?: komisyoncularOrderByWithRelationInput | komisyoncularOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for komisyonculars.
     */
    cursor?: komisyoncularWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` komisyonculars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` komisyonculars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of komisyonculars.
     */
    distinct?: KomisyoncularScalarFieldEnum | KomisyoncularScalarFieldEnum[]
  }

  /**
   * komisyoncular findMany
   */
  export type komisyoncularFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * Filter, which komisyonculars to fetch.
     */
    where?: komisyoncularWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of komisyonculars to fetch.
     */
    orderBy?: komisyoncularOrderByWithRelationInput | komisyoncularOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing komisyonculars.
     */
    cursor?: komisyoncularWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` komisyonculars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` komisyonculars.
     */
    skip?: number
    distinct?: KomisyoncularScalarFieldEnum | KomisyoncularScalarFieldEnum[]
  }

  /**
   * komisyoncular create
   */
  export type komisyoncularCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * The data needed to create a komisyoncular.
     */
    data: XOR<komisyoncularCreateInput, komisyoncularUncheckedCreateInput>
  }

  /**
   * komisyoncular createMany
   */
  export type komisyoncularCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many komisyonculars.
     */
    data: komisyoncularCreateManyInput | komisyoncularCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * komisyoncular createManyAndReturn
   */
  export type komisyoncularCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * The data used to create many komisyonculars.
     */
    data: komisyoncularCreateManyInput | komisyoncularCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * komisyoncular update
   */
  export type komisyoncularUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * The data needed to update a komisyoncular.
     */
    data: XOR<komisyoncularUpdateInput, komisyoncularUncheckedUpdateInput>
    /**
     * Choose, which komisyoncular to update.
     */
    where: komisyoncularWhereUniqueInput
  }

  /**
   * komisyoncular updateMany
   */
  export type komisyoncularUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update komisyonculars.
     */
    data: XOR<komisyoncularUpdateManyMutationInput, komisyoncularUncheckedUpdateManyInput>
    /**
     * Filter which komisyonculars to update
     */
    where?: komisyoncularWhereInput
    /**
     * Limit how many komisyonculars to update.
     */
    limit?: number
  }

  /**
   * komisyoncular updateManyAndReturn
   */
  export type komisyoncularUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * The data used to update komisyonculars.
     */
    data: XOR<komisyoncularUpdateManyMutationInput, komisyoncularUncheckedUpdateManyInput>
    /**
     * Filter which komisyonculars to update
     */
    where?: komisyoncularWhereInput
    /**
     * Limit how many komisyonculars to update.
     */
    limit?: number
  }

  /**
   * komisyoncular upsert
   */
  export type komisyoncularUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * The filter to search for the komisyoncular to update in case it exists.
     */
    where: komisyoncularWhereUniqueInput
    /**
     * In case the komisyoncular found by the `where` argument doesn't exist, create a new komisyoncular with this data.
     */
    create: XOR<komisyoncularCreateInput, komisyoncularUncheckedCreateInput>
    /**
     * In case the komisyoncular was found with the provided `where` argument, update it with this data.
     */
    update: XOR<komisyoncularUpdateInput, komisyoncularUncheckedUpdateInput>
  }

  /**
   * komisyoncular delete
   */
  export type komisyoncularDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    /**
     * Filter which komisyoncular to delete.
     */
    where: komisyoncularWhereUniqueInput
  }

  /**
   * komisyoncular deleteMany
   */
  export type komisyoncularDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which komisyonculars to delete
     */
    where?: komisyoncularWhereInput
    /**
     * Limit how many komisyonculars to delete.
     */
    limit?: number
  }

  /**
   * komisyoncular.mal_kabul_records
   */
  export type komisyoncular$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * komisyoncular.ureticiler
   */
  export type komisyoncular$ureticilerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    where?: ureticilerWhereInput
    orderBy?: ureticilerOrderByWithRelationInput | ureticilerOrderByWithRelationInput[]
    cursor?: ureticilerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UreticilerScalarFieldEnum | UreticilerScalarFieldEnum[]
  }

  /**
   * komisyoncular without action
   */
  export type komisyoncularDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
  }


  /**
   * Model mal_kabul_records
   */

  export type AggregateMal_kabul_records = {
    _count: Mal_kabul_recordsCountAggregateOutputType | null
    _avg: Mal_kabul_recordsAvgAggregateOutputType | null
    _sum: Mal_kabul_recordsSumAggregateOutputType | null
    _min: Mal_kabul_recordsMinAggregateOutputType | null
    _max: Mal_kabul_recordsMaxAggregateOutputType | null
  }

  export type Mal_kabul_recordsAvgAggregateOutputType = {
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type Mal_kabul_recordsSumAggregateOutputType = {
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type Mal_kabul_recordsMinAggregateOutputType = {
    id: string | null
    tarih: Date | null
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    status: string | null
    notlar: string | null
    malKabulcuId: string | null
    komisyoncuId: string | null
    ureticiId: string | null
    urunId: string | null
    faturaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    fisNo: string | null
    mustahsilId: string | null
    ozelFirmaId: string | null
    saticiTipi: string | null
    ambalajId: string | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type Mal_kabul_recordsMaxAggregateOutputType = {
    id: string | null
    tarih: Date | null
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    status: string | null
    notlar: string | null
    malKabulcuId: string | null
    komisyoncuId: string | null
    ureticiId: string | null
    urunId: string | null
    faturaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    fisNo: string | null
    mustahsilId: string | null
    ozelFirmaId: string | null
    saticiTipi: string | null
    ambalajId: string | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type Mal_kabul_recordsCountAggregateOutputType = {
    id: number
    tarih: number
    miktar: number
    birimFiyat: number
    toplamFiyat: number
    status: number
    notlar: number
    malKabulcuId: number
    komisyoncuId: number
    ureticiId: number
    urunId: number
    faturaId: number
    createdAt: number
    updatedAt: number
    fisNo: number
    mustahsilId: number
    ozelFirmaId: number
    saticiTipi: number
    ambalajId: number
    paletSayisi: number
    kasaSayisi: number
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaKg: number
    fireKg: number
    cikmaFireKg: number
    netKg: number
    _all: number
  }


  export type Mal_kabul_recordsAvgAggregateInputType = {
    miktar?: true
    birimFiyat?: true
    toplamFiyat?: true
    paletSayisi?: true
    kasaSayisi?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    cikmaFireKg?: true
    netKg?: true
  }

  export type Mal_kabul_recordsSumAggregateInputType = {
    miktar?: true
    birimFiyat?: true
    toplamFiyat?: true
    paletSayisi?: true
    kasaSayisi?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    cikmaFireKg?: true
    netKg?: true
  }

  export type Mal_kabul_recordsMinAggregateInputType = {
    id?: true
    tarih?: true
    miktar?: true
    birimFiyat?: true
    toplamFiyat?: true
    status?: true
    notlar?: true
    malKabulcuId?: true
    komisyoncuId?: true
    ureticiId?: true
    urunId?: true
    faturaId?: true
    createdAt?: true
    updatedAt?: true
    fisNo?: true
    mustahsilId?: true
    ozelFirmaId?: true
    saticiTipi?: true
    ambalajId?: true
    paletSayisi?: true
    kasaSayisi?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    cikmaFireKg?: true
    netKg?: true
  }

  export type Mal_kabul_recordsMaxAggregateInputType = {
    id?: true
    tarih?: true
    miktar?: true
    birimFiyat?: true
    toplamFiyat?: true
    status?: true
    notlar?: true
    malKabulcuId?: true
    komisyoncuId?: true
    ureticiId?: true
    urunId?: true
    faturaId?: true
    createdAt?: true
    updatedAt?: true
    fisNo?: true
    mustahsilId?: true
    ozelFirmaId?: true
    saticiTipi?: true
    ambalajId?: true
    paletSayisi?: true
    kasaSayisi?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    cikmaFireKg?: true
    netKg?: true
  }

  export type Mal_kabul_recordsCountAggregateInputType = {
    id?: true
    tarih?: true
    miktar?: true
    birimFiyat?: true
    toplamFiyat?: true
    status?: true
    notlar?: true
    malKabulcuId?: true
    komisyoncuId?: true
    ureticiId?: true
    urunId?: true
    faturaId?: true
    createdAt?: true
    updatedAt?: true
    fisNo?: true
    mustahsilId?: true
    ozelFirmaId?: true
    saticiTipi?: true
    ambalajId?: true
    paletSayisi?: true
    kasaSayisi?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    cikmaFireKg?: true
    netKg?: true
    _all?: true
  }

  export type Mal_kabul_recordsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mal_kabul_records to aggregate.
     */
    where?: mal_kabul_recordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mal_kabul_records to fetch.
     */
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mal_kabul_recordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mal_kabul_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mal_kabul_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mal_kabul_records
    **/
    _count?: true | Mal_kabul_recordsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Mal_kabul_recordsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Mal_kabul_recordsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Mal_kabul_recordsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Mal_kabul_recordsMaxAggregateInputType
  }

  export type GetMal_kabul_recordsAggregateType<T extends Mal_kabul_recordsAggregateArgs> = {
        [P in keyof T & keyof AggregateMal_kabul_records]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMal_kabul_records[P]>
      : GetScalarType<T[P], AggregateMal_kabul_records[P]>
  }




  export type mal_kabul_recordsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithAggregationInput | mal_kabul_recordsOrderByWithAggregationInput[]
    by: Mal_kabul_recordsScalarFieldEnum[] | Mal_kabul_recordsScalarFieldEnum
    having?: mal_kabul_recordsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Mal_kabul_recordsCountAggregateInputType | true
    _avg?: Mal_kabul_recordsAvgAggregateInputType
    _sum?: Mal_kabul_recordsSumAggregateInputType
    _min?: Mal_kabul_recordsMinAggregateInputType
    _max?: Mal_kabul_recordsMaxAggregateInputType
  }

  export type Mal_kabul_recordsGroupByOutputType = {
    id: string
    tarih: Date | null
    miktar: number
    birimFiyat: number | null
    toplamFiyat: number | null
    status: string
    notlar: string | null
    malKabulcuId: string
    komisyoncuId: string | null
    ureticiId: string | null
    urunId: string
    faturaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    fisNo: string
    mustahsilId: string | null
    ozelFirmaId: string | null
    saticiTipi: string
    ambalajId: string | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
    _count: Mal_kabul_recordsCountAggregateOutputType | null
    _avg: Mal_kabul_recordsAvgAggregateOutputType | null
    _sum: Mal_kabul_recordsSumAggregateOutputType | null
    _min: Mal_kabul_recordsMinAggregateOutputType | null
    _max: Mal_kabul_recordsMaxAggregateOutputType | null
  }

  type GetMal_kabul_recordsGroupByPayload<T extends mal_kabul_recordsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Mal_kabul_recordsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Mal_kabul_recordsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Mal_kabul_recordsGroupByOutputType[P]>
            : GetScalarType<T[P], Mal_kabul_recordsGroupByOutputType[P]>
        }
      >
    >


  export type mal_kabul_recordsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tarih?: boolean
    miktar?: boolean
    birimFiyat?: boolean
    toplamFiyat?: boolean
    status?: boolean
    notlar?: boolean
    malKabulcuId?: boolean
    komisyoncuId?: boolean
    ureticiId?: boolean
    urunId?: boolean
    faturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fisNo?: boolean
    mustahsilId?: boolean
    ozelFirmaId?: boolean
    saticiTipi?: boolean
    ambalajId?: boolean
    paletSayisi?: boolean
    kasaSayisi?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    cikmaFireKg?: boolean
    netKg?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    komisyoncular?: boolean | mal_kabul_records$komisyoncularArgs<ExtArgs>
    ureticiler?: boolean | mal_kabul_records$ureticilerArgs<ExtArgs>
    urunler?: boolean | urunlerDefaultArgs<ExtArgs>
    faturalar?: boolean | mal_kabul_records$faturalarArgs<ExtArgs>
    mustahsil?: boolean | mal_kabul_records$mustahsilArgs<ExtArgs>
    ozel_firmalar?: boolean | mal_kabul_records$ozel_firmalarArgs<ExtArgs>
    ambalajlar?: boolean | mal_kabul_records$ambalajlarArgs<ExtArgs>
  }, ExtArgs["result"]["mal_kabul_records"]>

  export type mal_kabul_recordsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tarih?: boolean
    miktar?: boolean
    birimFiyat?: boolean
    toplamFiyat?: boolean
    status?: boolean
    notlar?: boolean
    malKabulcuId?: boolean
    komisyoncuId?: boolean
    ureticiId?: boolean
    urunId?: boolean
    faturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fisNo?: boolean
    mustahsilId?: boolean
    ozelFirmaId?: boolean
    saticiTipi?: boolean
    ambalajId?: boolean
    paletSayisi?: boolean
    kasaSayisi?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    cikmaFireKg?: boolean
    netKg?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    komisyoncular?: boolean | mal_kabul_records$komisyoncularArgs<ExtArgs>
    ureticiler?: boolean | mal_kabul_records$ureticilerArgs<ExtArgs>
    urunler?: boolean | urunlerDefaultArgs<ExtArgs>
    faturalar?: boolean | mal_kabul_records$faturalarArgs<ExtArgs>
    mustahsil?: boolean | mal_kabul_records$mustahsilArgs<ExtArgs>
    ozel_firmalar?: boolean | mal_kabul_records$ozel_firmalarArgs<ExtArgs>
    ambalajlar?: boolean | mal_kabul_records$ambalajlarArgs<ExtArgs>
  }, ExtArgs["result"]["mal_kabul_records"]>

  export type mal_kabul_recordsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tarih?: boolean
    miktar?: boolean
    birimFiyat?: boolean
    toplamFiyat?: boolean
    status?: boolean
    notlar?: boolean
    malKabulcuId?: boolean
    komisyoncuId?: boolean
    ureticiId?: boolean
    urunId?: boolean
    faturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fisNo?: boolean
    mustahsilId?: boolean
    ozelFirmaId?: boolean
    saticiTipi?: boolean
    ambalajId?: boolean
    paletSayisi?: boolean
    kasaSayisi?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    cikmaFireKg?: boolean
    netKg?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    komisyoncular?: boolean | mal_kabul_records$komisyoncularArgs<ExtArgs>
    ureticiler?: boolean | mal_kabul_records$ureticilerArgs<ExtArgs>
    urunler?: boolean | urunlerDefaultArgs<ExtArgs>
    faturalar?: boolean | mal_kabul_records$faturalarArgs<ExtArgs>
    mustahsil?: boolean | mal_kabul_records$mustahsilArgs<ExtArgs>
    ozel_firmalar?: boolean | mal_kabul_records$ozel_firmalarArgs<ExtArgs>
    ambalajlar?: boolean | mal_kabul_records$ambalajlarArgs<ExtArgs>
  }, ExtArgs["result"]["mal_kabul_records"]>

  export type mal_kabul_recordsSelectScalar = {
    id?: boolean
    tarih?: boolean
    miktar?: boolean
    birimFiyat?: boolean
    toplamFiyat?: boolean
    status?: boolean
    notlar?: boolean
    malKabulcuId?: boolean
    komisyoncuId?: boolean
    ureticiId?: boolean
    urunId?: boolean
    faturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fisNo?: boolean
    mustahsilId?: boolean
    ozelFirmaId?: boolean
    saticiTipi?: boolean
    ambalajId?: boolean
    paletSayisi?: boolean
    kasaSayisi?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    cikmaFireKg?: boolean
    netKg?: boolean
  }

  export type mal_kabul_recordsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tarih" | "miktar" | "birimFiyat" | "toplamFiyat" | "status" | "notlar" | "malKabulcuId" | "komisyoncuId" | "ureticiId" | "urunId" | "faturaId" | "createdAt" | "updatedAt" | "fisNo" | "mustahsilId" | "ozelFirmaId" | "saticiTipi" | "ambalajId" | "paletSayisi" | "kasaSayisi" | "brutKg" | "daraKg" | "girisKg" | "cikmaKg" | "fireKg" | "cikmaFireKg" | "netKg", ExtArgs["result"]["mal_kabul_records"]>
  export type mal_kabul_recordsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    komisyoncular?: boolean | mal_kabul_records$komisyoncularArgs<ExtArgs>
    ureticiler?: boolean | mal_kabul_records$ureticilerArgs<ExtArgs>
    urunler?: boolean | urunlerDefaultArgs<ExtArgs>
    faturalar?: boolean | mal_kabul_records$faturalarArgs<ExtArgs>
    mustahsil?: boolean | mal_kabul_records$mustahsilArgs<ExtArgs>
    ozel_firmalar?: boolean | mal_kabul_records$ozel_firmalarArgs<ExtArgs>
    ambalajlar?: boolean | mal_kabul_records$ambalajlarArgs<ExtArgs>
  }
  export type mal_kabul_recordsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    komisyoncular?: boolean | mal_kabul_records$komisyoncularArgs<ExtArgs>
    ureticiler?: boolean | mal_kabul_records$ureticilerArgs<ExtArgs>
    urunler?: boolean | urunlerDefaultArgs<ExtArgs>
    faturalar?: boolean | mal_kabul_records$faturalarArgs<ExtArgs>
    mustahsil?: boolean | mal_kabul_records$mustahsilArgs<ExtArgs>
    ozel_firmalar?: boolean | mal_kabul_records$ozel_firmalarArgs<ExtArgs>
    ambalajlar?: boolean | mal_kabul_records$ambalajlarArgs<ExtArgs>
  }
  export type mal_kabul_recordsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    komisyoncular?: boolean | mal_kabul_records$komisyoncularArgs<ExtArgs>
    ureticiler?: boolean | mal_kabul_records$ureticilerArgs<ExtArgs>
    urunler?: boolean | urunlerDefaultArgs<ExtArgs>
    faturalar?: boolean | mal_kabul_records$faturalarArgs<ExtArgs>
    mustahsil?: boolean | mal_kabul_records$mustahsilArgs<ExtArgs>
    ozel_firmalar?: boolean | mal_kabul_records$ozel_firmalarArgs<ExtArgs>
    ambalajlar?: boolean | mal_kabul_records$ambalajlarArgs<ExtArgs>
  }

  export type $mal_kabul_recordsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "mal_kabul_records"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      komisyoncular: Prisma.$komisyoncularPayload<ExtArgs> | null
      ureticiler: Prisma.$ureticilerPayload<ExtArgs> | null
      urunler: Prisma.$urunlerPayload<ExtArgs>
      faturalar: Prisma.$faturalarPayload<ExtArgs> | null
      mustahsil: Prisma.$mustahsilPayload<ExtArgs> | null
      ozel_firmalar: Prisma.$ozel_firmalarPayload<ExtArgs> | null
      ambalajlar: Prisma.$ambalajlarPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tarih: Date | null
      miktar: number
      birimFiyat: number | null
      toplamFiyat: number | null
      status: string
      notlar: string | null
      malKabulcuId: string
      komisyoncuId: string | null
      ureticiId: string | null
      urunId: string
      faturaId: string | null
      createdAt: Date | null
      updatedAt: Date | null
      fisNo: string
      mustahsilId: string | null
      ozelFirmaId: string | null
      saticiTipi: string
      ambalajId: string | null
      paletSayisi: number | null
      kasaSayisi: number | null
      brutKg: number | null
      daraKg: number | null
      girisKg: number | null
      cikmaKg: number | null
      fireKg: number | null
      cikmaFireKg: number | null
      netKg: number | null
    }, ExtArgs["result"]["mal_kabul_records"]>
    composites: {}
  }

  type mal_kabul_recordsGetPayload<S extends boolean | null | undefined | mal_kabul_recordsDefaultArgs> = $Result.GetResult<Prisma.$mal_kabul_recordsPayload, S>

  type mal_kabul_recordsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mal_kabul_recordsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Mal_kabul_recordsCountAggregateInputType | true
    }

  export interface mal_kabul_recordsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['mal_kabul_records'], meta: { name: 'mal_kabul_records' } }
    /**
     * Find zero or one Mal_kabul_records that matches the filter.
     * @param {mal_kabul_recordsFindUniqueArgs} args - Arguments to find a Mal_kabul_records
     * @example
     * // Get one Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mal_kabul_recordsFindUniqueArgs>(args: SelectSubset<T, mal_kabul_recordsFindUniqueArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mal_kabul_records that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mal_kabul_recordsFindUniqueOrThrowArgs} args - Arguments to find a Mal_kabul_records
     * @example
     * // Get one Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mal_kabul_recordsFindUniqueOrThrowArgs>(args: SelectSubset<T, mal_kabul_recordsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mal_kabul_records that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mal_kabul_recordsFindFirstArgs} args - Arguments to find a Mal_kabul_records
     * @example
     * // Get one Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mal_kabul_recordsFindFirstArgs>(args?: SelectSubset<T, mal_kabul_recordsFindFirstArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mal_kabul_records that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mal_kabul_recordsFindFirstOrThrowArgs} args - Arguments to find a Mal_kabul_records
     * @example
     * // Get one Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mal_kabul_recordsFindFirstOrThrowArgs>(args?: SelectSubset<T, mal_kabul_recordsFindFirstOrThrowArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mal_kabul_records that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mal_kabul_recordsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.findMany()
     * 
     * // Get first 10 Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mal_kabul_recordsWithIdOnly = await prisma.mal_kabul_records.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends mal_kabul_recordsFindManyArgs>(args?: SelectSubset<T, mal_kabul_recordsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mal_kabul_records.
     * @param {mal_kabul_recordsCreateArgs} args - Arguments to create a Mal_kabul_records.
     * @example
     * // Create one Mal_kabul_records
     * const Mal_kabul_records = await prisma.mal_kabul_records.create({
     *   data: {
     *     // ... data to create a Mal_kabul_records
     *   }
     * })
     * 
     */
    create<T extends mal_kabul_recordsCreateArgs>(args: SelectSubset<T, mal_kabul_recordsCreateArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mal_kabul_records.
     * @param {mal_kabul_recordsCreateManyArgs} args - Arguments to create many Mal_kabul_records.
     * @example
     * // Create many Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mal_kabul_recordsCreateManyArgs>(args?: SelectSubset<T, mal_kabul_recordsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mal_kabul_records and returns the data saved in the database.
     * @param {mal_kabul_recordsCreateManyAndReturnArgs} args - Arguments to create many Mal_kabul_records.
     * @example
     * // Create many Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mal_kabul_records and only return the `id`
     * const mal_kabul_recordsWithIdOnly = await prisma.mal_kabul_records.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mal_kabul_recordsCreateManyAndReturnArgs>(args?: SelectSubset<T, mal_kabul_recordsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mal_kabul_records.
     * @param {mal_kabul_recordsDeleteArgs} args - Arguments to delete one Mal_kabul_records.
     * @example
     * // Delete one Mal_kabul_records
     * const Mal_kabul_records = await prisma.mal_kabul_records.delete({
     *   where: {
     *     // ... filter to delete one Mal_kabul_records
     *   }
     * })
     * 
     */
    delete<T extends mal_kabul_recordsDeleteArgs>(args: SelectSubset<T, mal_kabul_recordsDeleteArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mal_kabul_records.
     * @param {mal_kabul_recordsUpdateArgs} args - Arguments to update one Mal_kabul_records.
     * @example
     * // Update one Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mal_kabul_recordsUpdateArgs>(args: SelectSubset<T, mal_kabul_recordsUpdateArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mal_kabul_records.
     * @param {mal_kabul_recordsDeleteManyArgs} args - Arguments to filter Mal_kabul_records to delete.
     * @example
     * // Delete a few Mal_kabul_records
     * const { count } = await prisma.mal_kabul_records.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mal_kabul_recordsDeleteManyArgs>(args?: SelectSubset<T, mal_kabul_recordsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mal_kabul_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mal_kabul_recordsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mal_kabul_recordsUpdateManyArgs>(args: SelectSubset<T, mal_kabul_recordsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mal_kabul_records and returns the data updated in the database.
     * @param {mal_kabul_recordsUpdateManyAndReturnArgs} args - Arguments to update many Mal_kabul_records.
     * @example
     * // Update many Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mal_kabul_records and only return the `id`
     * const mal_kabul_recordsWithIdOnly = await prisma.mal_kabul_records.updateManyAndReturn({
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
    updateManyAndReturn<T extends mal_kabul_recordsUpdateManyAndReturnArgs>(args: SelectSubset<T, mal_kabul_recordsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mal_kabul_records.
     * @param {mal_kabul_recordsUpsertArgs} args - Arguments to update or create a Mal_kabul_records.
     * @example
     * // Update or create a Mal_kabul_records
     * const mal_kabul_records = await prisma.mal_kabul_records.upsert({
     *   create: {
     *     // ... data to create a Mal_kabul_records
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mal_kabul_records we want to update
     *   }
     * })
     */
    upsert<T extends mal_kabul_recordsUpsertArgs>(args: SelectSubset<T, mal_kabul_recordsUpsertArgs<ExtArgs>>): Prisma__mal_kabul_recordsClient<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mal_kabul_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mal_kabul_recordsCountArgs} args - Arguments to filter Mal_kabul_records to count.
     * @example
     * // Count the number of Mal_kabul_records
     * const count = await prisma.mal_kabul_records.count({
     *   where: {
     *     // ... the filter for the Mal_kabul_records we want to count
     *   }
     * })
    **/
    count<T extends mal_kabul_recordsCountArgs>(
      args?: Subset<T, mal_kabul_recordsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Mal_kabul_recordsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mal_kabul_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Mal_kabul_recordsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Mal_kabul_recordsAggregateArgs>(args: Subset<T, Mal_kabul_recordsAggregateArgs>): Prisma.PrismaPromise<GetMal_kabul_recordsAggregateType<T>>

    /**
     * Group by Mal_kabul_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mal_kabul_recordsGroupByArgs} args - Group by arguments.
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
      T extends mal_kabul_recordsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mal_kabul_recordsGroupByArgs['orderBy'] }
        : { orderBy?: mal_kabul_recordsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, mal_kabul_recordsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMal_kabul_recordsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the mal_kabul_records model
   */
  readonly fields: mal_kabul_recordsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for mal_kabul_records.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mal_kabul_recordsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    komisyoncular<T extends mal_kabul_records$komisyoncularArgs<ExtArgs> = {}>(args?: Subset<T, mal_kabul_records$komisyoncularArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ureticiler<T extends mal_kabul_records$ureticilerArgs<ExtArgs> = {}>(args?: Subset<T, mal_kabul_records$ureticilerArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    urunler<T extends urunlerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, urunlerDefaultArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    faturalar<T extends mal_kabul_records$faturalarArgs<ExtArgs> = {}>(args?: Subset<T, mal_kabul_records$faturalarArgs<ExtArgs>>): Prisma__faturalarClient<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mustahsil<T extends mal_kabul_records$mustahsilArgs<ExtArgs> = {}>(args?: Subset<T, mal_kabul_records$mustahsilArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ozel_firmalar<T extends mal_kabul_records$ozel_firmalarArgs<ExtArgs> = {}>(args?: Subset<T, mal_kabul_records$ozel_firmalarArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ambalajlar<T extends mal_kabul_records$ambalajlarArgs<ExtArgs> = {}>(args?: Subset<T, mal_kabul_records$ambalajlarArgs<ExtArgs>>): Prisma__ambalajlarClient<$Result.GetResult<Prisma.$ambalajlarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the mal_kabul_records model
   */
  interface mal_kabul_recordsFieldRefs {
    readonly id: FieldRef<"mal_kabul_records", 'String'>
    readonly tarih: FieldRef<"mal_kabul_records", 'DateTime'>
    readonly miktar: FieldRef<"mal_kabul_records", 'Float'>
    readonly birimFiyat: FieldRef<"mal_kabul_records", 'Float'>
    readonly toplamFiyat: FieldRef<"mal_kabul_records", 'Float'>
    readonly status: FieldRef<"mal_kabul_records", 'String'>
    readonly notlar: FieldRef<"mal_kabul_records", 'String'>
    readonly malKabulcuId: FieldRef<"mal_kabul_records", 'String'>
    readonly komisyoncuId: FieldRef<"mal_kabul_records", 'String'>
    readonly ureticiId: FieldRef<"mal_kabul_records", 'String'>
    readonly urunId: FieldRef<"mal_kabul_records", 'String'>
    readonly faturaId: FieldRef<"mal_kabul_records", 'String'>
    readonly createdAt: FieldRef<"mal_kabul_records", 'DateTime'>
    readonly updatedAt: FieldRef<"mal_kabul_records", 'DateTime'>
    readonly fisNo: FieldRef<"mal_kabul_records", 'String'>
    readonly mustahsilId: FieldRef<"mal_kabul_records", 'String'>
    readonly ozelFirmaId: FieldRef<"mal_kabul_records", 'String'>
    readonly saticiTipi: FieldRef<"mal_kabul_records", 'String'>
    readonly ambalajId: FieldRef<"mal_kabul_records", 'String'>
    readonly paletSayisi: FieldRef<"mal_kabul_records", 'Int'>
    readonly kasaSayisi: FieldRef<"mal_kabul_records", 'Int'>
    readonly brutKg: FieldRef<"mal_kabul_records", 'Float'>
    readonly daraKg: FieldRef<"mal_kabul_records", 'Float'>
    readonly girisKg: FieldRef<"mal_kabul_records", 'Float'>
    readonly cikmaKg: FieldRef<"mal_kabul_records", 'Float'>
    readonly fireKg: FieldRef<"mal_kabul_records", 'Float'>
    readonly cikmaFireKg: FieldRef<"mal_kabul_records", 'Float'>
    readonly netKg: FieldRef<"mal_kabul_records", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * mal_kabul_records findUnique
   */
  export type mal_kabul_recordsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * Filter, which mal_kabul_records to fetch.
     */
    where: mal_kabul_recordsWhereUniqueInput
  }

  /**
   * mal_kabul_records findUniqueOrThrow
   */
  export type mal_kabul_recordsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * Filter, which mal_kabul_records to fetch.
     */
    where: mal_kabul_recordsWhereUniqueInput
  }

  /**
   * mal_kabul_records findFirst
   */
  export type mal_kabul_recordsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * Filter, which mal_kabul_records to fetch.
     */
    where?: mal_kabul_recordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mal_kabul_records to fetch.
     */
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mal_kabul_records.
     */
    cursor?: mal_kabul_recordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mal_kabul_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mal_kabul_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mal_kabul_records.
     */
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * mal_kabul_records findFirstOrThrow
   */
  export type mal_kabul_recordsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * Filter, which mal_kabul_records to fetch.
     */
    where?: mal_kabul_recordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mal_kabul_records to fetch.
     */
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mal_kabul_records.
     */
    cursor?: mal_kabul_recordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mal_kabul_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mal_kabul_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mal_kabul_records.
     */
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * mal_kabul_records findMany
   */
  export type mal_kabul_recordsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * Filter, which mal_kabul_records to fetch.
     */
    where?: mal_kabul_recordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mal_kabul_records to fetch.
     */
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mal_kabul_records.
     */
    cursor?: mal_kabul_recordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mal_kabul_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mal_kabul_records.
     */
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * mal_kabul_records create
   */
  export type mal_kabul_recordsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * The data needed to create a mal_kabul_records.
     */
    data: XOR<mal_kabul_recordsCreateInput, mal_kabul_recordsUncheckedCreateInput>
  }

  /**
   * mal_kabul_records createMany
   */
  export type mal_kabul_recordsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many mal_kabul_records.
     */
    data: mal_kabul_recordsCreateManyInput | mal_kabul_recordsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mal_kabul_records createManyAndReturn
   */
  export type mal_kabul_recordsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * The data used to create many mal_kabul_records.
     */
    data: mal_kabul_recordsCreateManyInput | mal_kabul_recordsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * mal_kabul_records update
   */
  export type mal_kabul_recordsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * The data needed to update a mal_kabul_records.
     */
    data: XOR<mal_kabul_recordsUpdateInput, mal_kabul_recordsUncheckedUpdateInput>
    /**
     * Choose, which mal_kabul_records to update.
     */
    where: mal_kabul_recordsWhereUniqueInput
  }

  /**
   * mal_kabul_records updateMany
   */
  export type mal_kabul_recordsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update mal_kabul_records.
     */
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyInput>
    /**
     * Filter which mal_kabul_records to update
     */
    where?: mal_kabul_recordsWhereInput
    /**
     * Limit how many mal_kabul_records to update.
     */
    limit?: number
  }

  /**
   * mal_kabul_records updateManyAndReturn
   */
  export type mal_kabul_recordsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * The data used to update mal_kabul_records.
     */
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyInput>
    /**
     * Filter which mal_kabul_records to update
     */
    where?: mal_kabul_recordsWhereInput
    /**
     * Limit how many mal_kabul_records to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * mal_kabul_records upsert
   */
  export type mal_kabul_recordsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * The filter to search for the mal_kabul_records to update in case it exists.
     */
    where: mal_kabul_recordsWhereUniqueInput
    /**
     * In case the mal_kabul_records found by the `where` argument doesn't exist, create a new mal_kabul_records with this data.
     */
    create: XOR<mal_kabul_recordsCreateInput, mal_kabul_recordsUncheckedCreateInput>
    /**
     * In case the mal_kabul_records was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mal_kabul_recordsUpdateInput, mal_kabul_recordsUncheckedUpdateInput>
  }

  /**
   * mal_kabul_records delete
   */
  export type mal_kabul_recordsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    /**
     * Filter which mal_kabul_records to delete.
     */
    where: mal_kabul_recordsWhereUniqueInput
  }

  /**
   * mal_kabul_records deleteMany
   */
  export type mal_kabul_recordsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mal_kabul_records to delete
     */
    where?: mal_kabul_recordsWhereInput
    /**
     * Limit how many mal_kabul_records to delete.
     */
    limit?: number
  }

  /**
   * mal_kabul_records.komisyoncular
   */
  export type mal_kabul_records$komisyoncularArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    where?: komisyoncularWhereInput
  }

  /**
   * mal_kabul_records.ureticiler
   */
  export type mal_kabul_records$ureticilerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    where?: ureticilerWhereInput
  }

  /**
   * mal_kabul_records.faturalar
   */
  export type mal_kabul_records$faturalarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    where?: faturalarWhereInput
  }

  /**
   * mal_kabul_records.mustahsil
   */
  export type mal_kabul_records$mustahsilArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    where?: mustahsilWhereInput
  }

  /**
   * mal_kabul_records.ozel_firmalar
   */
  export type mal_kabul_records$ozel_firmalarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    where?: ozel_firmalarWhereInput
  }

  /**
   * mal_kabul_records.ambalajlar
   */
  export type mal_kabul_records$ambalajlarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ambalajlar
     */
    select?: ambalajlarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ambalajlar
     */
    omit?: ambalajlarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ambalajlarInclude<ExtArgs> | null
    where?: ambalajlarWhereInput
  }

  /**
   * mal_kabul_records without action
   */
  export type mal_kabul_recordsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
  }


  /**
   * Model mustahsil
   */

  export type AggregateMustahsil = {
    _count: MustahsilCountAggregateOutputType | null
    _min: MustahsilMinAggregateOutputType | null
    _max: MustahsilMaxAggregateOutputType | null
  }

  export type MustahsilMinAggregateOutputType = {
    id: string | null
    ad: string | null
    soyad: string | null
    dogumTarihi: Date | null
    tcKimlikNo: string | null
    mustahsilNo: string | null
    iletisim: string | null
    bankaAdi: string | null
    ibanAdresi: string | null
    adres: string | null
    cinsiyet: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MustahsilMaxAggregateOutputType = {
    id: string | null
    ad: string | null
    soyad: string | null
    dogumTarihi: Date | null
    tcKimlikNo: string | null
    mustahsilNo: string | null
    iletisim: string | null
    bankaAdi: string | null
    ibanAdresi: string | null
    adres: string | null
    cinsiyet: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MustahsilCountAggregateOutputType = {
    id: number
    ad: number
    soyad: number
    dogumTarihi: number
    tcKimlikNo: number
    mustahsilNo: number
    iletisim: number
    bankaAdi: number
    ibanAdresi: number
    adres: number
    cinsiyet: number
    durum: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MustahsilMinAggregateInputType = {
    id?: true
    ad?: true
    soyad?: true
    dogumTarihi?: true
    tcKimlikNo?: true
    mustahsilNo?: true
    iletisim?: true
    bankaAdi?: true
    ibanAdresi?: true
    adres?: true
    cinsiyet?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MustahsilMaxAggregateInputType = {
    id?: true
    ad?: true
    soyad?: true
    dogumTarihi?: true
    tcKimlikNo?: true
    mustahsilNo?: true
    iletisim?: true
    bankaAdi?: true
    ibanAdresi?: true
    adres?: true
    cinsiyet?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MustahsilCountAggregateInputType = {
    id?: true
    ad?: true
    soyad?: true
    dogumTarihi?: true
    tcKimlikNo?: true
    mustahsilNo?: true
    iletisim?: true
    bankaAdi?: true
    ibanAdresi?: true
    adres?: true
    cinsiyet?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MustahsilAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mustahsil to aggregate.
     */
    where?: mustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mustahsils to fetch.
     */
    orderBy?: mustahsilOrderByWithRelationInput | mustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mustahsils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mustahsils
    **/
    _count?: true | MustahsilCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MustahsilMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MustahsilMaxAggregateInputType
  }

  export type GetMustahsilAggregateType<T extends MustahsilAggregateArgs> = {
        [P in keyof T & keyof AggregateMustahsil]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMustahsil[P]>
      : GetScalarType<T[P], AggregateMustahsil[P]>
  }




  export type mustahsilGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mustahsilWhereInput
    orderBy?: mustahsilOrderByWithAggregationInput | mustahsilOrderByWithAggregationInput[]
    by: MustahsilScalarFieldEnum[] | MustahsilScalarFieldEnum
    having?: mustahsilScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MustahsilCountAggregateInputType | true
    _min?: MustahsilMinAggregateInputType
    _max?: MustahsilMaxAggregateInputType
  }

  export type MustahsilGroupByOutputType = {
    id: string
    ad: string
    soyad: string
    dogumTarihi: Date
    tcKimlikNo: string
    mustahsilNo: string
    iletisim: string | null
    bankaAdi: string | null
    ibanAdresi: string | null
    adres: string | null
    cinsiyet: string
    durum: string
    createdAt: Date | null
    updatedAt: Date | null
    _count: MustahsilCountAggregateOutputType | null
    _min: MustahsilMinAggregateOutputType | null
    _max: MustahsilMaxAggregateOutputType | null
  }

  type GetMustahsilGroupByPayload<T extends mustahsilGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MustahsilGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MustahsilGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MustahsilGroupByOutputType[P]>
            : GetScalarType<T[P], MustahsilGroupByOutputType[P]>
        }
      >
    >


  export type mustahsilSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    soyad?: boolean
    dogumTarihi?: boolean
    tcKimlikNo?: boolean
    mustahsilNo?: boolean
    iletisim?: boolean
    bankaAdi?: boolean
    ibanAdresi?: boolean
    adres?: boolean
    cinsiyet?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mal_kabul_records?: boolean | mustahsil$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | MustahsilCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mustahsil"]>

  export type mustahsilSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    soyad?: boolean
    dogumTarihi?: boolean
    tcKimlikNo?: boolean
    mustahsilNo?: boolean
    iletisim?: boolean
    bankaAdi?: boolean
    ibanAdresi?: boolean
    adres?: boolean
    cinsiyet?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mustahsil"]>

  export type mustahsilSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    soyad?: boolean
    dogumTarihi?: boolean
    tcKimlikNo?: boolean
    mustahsilNo?: boolean
    iletisim?: boolean
    bankaAdi?: boolean
    ibanAdresi?: boolean
    adres?: boolean
    cinsiyet?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mustahsil"]>

  export type mustahsilSelectScalar = {
    id?: boolean
    ad?: boolean
    soyad?: boolean
    dogumTarihi?: boolean
    tcKimlikNo?: boolean
    mustahsilNo?: boolean
    iletisim?: boolean
    bankaAdi?: boolean
    ibanAdresi?: boolean
    adres?: boolean
    cinsiyet?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type mustahsilOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "soyad" | "dogumTarihi" | "tcKimlikNo" | "mustahsilNo" | "iletisim" | "bankaAdi" | "ibanAdresi" | "adres" | "cinsiyet" | "durum" | "createdAt" | "updatedAt", ExtArgs["result"]["mustahsil"]>
  export type mustahsilInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | mustahsil$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | MustahsilCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type mustahsilIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type mustahsilIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mustahsilPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "mustahsil"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ad: string
      soyad: string
      dogumTarihi: Date
      tcKimlikNo: string
      mustahsilNo: string
      iletisim: string | null
      bankaAdi: string | null
      ibanAdresi: string | null
      adres: string | null
      cinsiyet: string
      durum: string
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["mustahsil"]>
    composites: {}
  }

  type mustahsilGetPayload<S extends boolean | null | undefined | mustahsilDefaultArgs> = $Result.GetResult<Prisma.$mustahsilPayload, S>

  type mustahsilCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mustahsilFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MustahsilCountAggregateInputType | true
    }

  export interface mustahsilDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['mustahsil'], meta: { name: 'mustahsil' } }
    /**
     * Find zero or one Mustahsil that matches the filter.
     * @param {mustahsilFindUniqueArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mustahsilFindUniqueArgs>(args: SelectSubset<T, mustahsilFindUniqueArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mustahsil that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mustahsilFindUniqueOrThrowArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mustahsilFindUniqueOrThrowArgs>(args: SelectSubset<T, mustahsilFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mustahsil that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mustahsilFindFirstArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mustahsilFindFirstArgs>(args?: SelectSubset<T, mustahsilFindFirstArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mustahsil that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mustahsilFindFirstOrThrowArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mustahsilFindFirstOrThrowArgs>(args?: SelectSubset<T, mustahsilFindFirstOrThrowArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mustahsils that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mustahsilFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mustahsils
     * const mustahsils = await prisma.mustahsil.findMany()
     * 
     * // Get first 10 Mustahsils
     * const mustahsils = await prisma.mustahsil.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mustahsilWithIdOnly = await prisma.mustahsil.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends mustahsilFindManyArgs>(args?: SelectSubset<T, mustahsilFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mustahsil.
     * @param {mustahsilCreateArgs} args - Arguments to create a Mustahsil.
     * @example
     * // Create one Mustahsil
     * const Mustahsil = await prisma.mustahsil.create({
     *   data: {
     *     // ... data to create a Mustahsil
     *   }
     * })
     * 
     */
    create<T extends mustahsilCreateArgs>(args: SelectSubset<T, mustahsilCreateArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mustahsils.
     * @param {mustahsilCreateManyArgs} args - Arguments to create many Mustahsils.
     * @example
     * // Create many Mustahsils
     * const mustahsil = await prisma.mustahsil.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mustahsilCreateManyArgs>(args?: SelectSubset<T, mustahsilCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mustahsils and returns the data saved in the database.
     * @param {mustahsilCreateManyAndReturnArgs} args - Arguments to create many Mustahsils.
     * @example
     * // Create many Mustahsils
     * const mustahsil = await prisma.mustahsil.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mustahsils and only return the `id`
     * const mustahsilWithIdOnly = await prisma.mustahsil.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mustahsilCreateManyAndReturnArgs>(args?: SelectSubset<T, mustahsilCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mustahsil.
     * @param {mustahsilDeleteArgs} args - Arguments to delete one Mustahsil.
     * @example
     * // Delete one Mustahsil
     * const Mustahsil = await prisma.mustahsil.delete({
     *   where: {
     *     // ... filter to delete one Mustahsil
     *   }
     * })
     * 
     */
    delete<T extends mustahsilDeleteArgs>(args: SelectSubset<T, mustahsilDeleteArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mustahsil.
     * @param {mustahsilUpdateArgs} args - Arguments to update one Mustahsil.
     * @example
     * // Update one Mustahsil
     * const mustahsil = await prisma.mustahsil.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mustahsilUpdateArgs>(args: SelectSubset<T, mustahsilUpdateArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mustahsils.
     * @param {mustahsilDeleteManyArgs} args - Arguments to filter Mustahsils to delete.
     * @example
     * // Delete a few Mustahsils
     * const { count } = await prisma.mustahsil.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mustahsilDeleteManyArgs>(args?: SelectSubset<T, mustahsilDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mustahsils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mustahsilUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mustahsils
     * const mustahsil = await prisma.mustahsil.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mustahsilUpdateManyArgs>(args: SelectSubset<T, mustahsilUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mustahsils and returns the data updated in the database.
     * @param {mustahsilUpdateManyAndReturnArgs} args - Arguments to update many Mustahsils.
     * @example
     * // Update many Mustahsils
     * const mustahsil = await prisma.mustahsil.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mustahsils and only return the `id`
     * const mustahsilWithIdOnly = await prisma.mustahsil.updateManyAndReturn({
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
    updateManyAndReturn<T extends mustahsilUpdateManyAndReturnArgs>(args: SelectSubset<T, mustahsilUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mustahsil.
     * @param {mustahsilUpsertArgs} args - Arguments to update or create a Mustahsil.
     * @example
     * // Update or create a Mustahsil
     * const mustahsil = await prisma.mustahsil.upsert({
     *   create: {
     *     // ... data to create a Mustahsil
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mustahsil we want to update
     *   }
     * })
     */
    upsert<T extends mustahsilUpsertArgs>(args: SelectSubset<T, mustahsilUpsertArgs<ExtArgs>>): Prisma__mustahsilClient<$Result.GetResult<Prisma.$mustahsilPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mustahsils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mustahsilCountArgs} args - Arguments to filter Mustahsils to count.
     * @example
     * // Count the number of Mustahsils
     * const count = await prisma.mustahsil.count({
     *   where: {
     *     // ... the filter for the Mustahsils we want to count
     *   }
     * })
    **/
    count<T extends mustahsilCountArgs>(
      args?: Subset<T, mustahsilCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MustahsilCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mustahsil.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MustahsilAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MustahsilAggregateArgs>(args: Subset<T, MustahsilAggregateArgs>): Prisma.PrismaPromise<GetMustahsilAggregateType<T>>

    /**
     * Group by Mustahsil.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mustahsilGroupByArgs} args - Group by arguments.
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
      T extends mustahsilGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mustahsilGroupByArgs['orderBy'] }
        : { orderBy?: mustahsilGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, mustahsilGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMustahsilGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the mustahsil model
   */
  readonly fields: mustahsilFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for mustahsil.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mustahsilClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends mustahsil$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, mustahsil$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the mustahsil model
   */
  interface mustahsilFieldRefs {
    readonly id: FieldRef<"mustahsil", 'String'>
    readonly ad: FieldRef<"mustahsil", 'String'>
    readonly soyad: FieldRef<"mustahsil", 'String'>
    readonly dogumTarihi: FieldRef<"mustahsil", 'DateTime'>
    readonly tcKimlikNo: FieldRef<"mustahsil", 'String'>
    readonly mustahsilNo: FieldRef<"mustahsil", 'String'>
    readonly iletisim: FieldRef<"mustahsil", 'String'>
    readonly bankaAdi: FieldRef<"mustahsil", 'String'>
    readonly ibanAdresi: FieldRef<"mustahsil", 'String'>
    readonly adres: FieldRef<"mustahsil", 'String'>
    readonly cinsiyet: FieldRef<"mustahsil", 'String'>
    readonly durum: FieldRef<"mustahsil", 'String'>
    readonly createdAt: FieldRef<"mustahsil", 'DateTime'>
    readonly updatedAt: FieldRef<"mustahsil", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * mustahsil findUnique
   */
  export type mustahsilFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * Filter, which mustahsil to fetch.
     */
    where: mustahsilWhereUniqueInput
  }

  /**
   * mustahsil findUniqueOrThrow
   */
  export type mustahsilFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * Filter, which mustahsil to fetch.
     */
    where: mustahsilWhereUniqueInput
  }

  /**
   * mustahsil findFirst
   */
  export type mustahsilFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * Filter, which mustahsil to fetch.
     */
    where?: mustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mustahsils to fetch.
     */
    orderBy?: mustahsilOrderByWithRelationInput | mustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mustahsils.
     */
    cursor?: mustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mustahsils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mustahsils.
     */
    distinct?: MustahsilScalarFieldEnum | MustahsilScalarFieldEnum[]
  }

  /**
   * mustahsil findFirstOrThrow
   */
  export type mustahsilFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * Filter, which mustahsil to fetch.
     */
    where?: mustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mustahsils to fetch.
     */
    orderBy?: mustahsilOrderByWithRelationInput | mustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mustahsils.
     */
    cursor?: mustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mustahsils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mustahsils.
     */
    distinct?: MustahsilScalarFieldEnum | MustahsilScalarFieldEnum[]
  }

  /**
   * mustahsil findMany
   */
  export type mustahsilFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * Filter, which mustahsils to fetch.
     */
    where?: mustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mustahsils to fetch.
     */
    orderBy?: mustahsilOrderByWithRelationInput | mustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mustahsils.
     */
    cursor?: mustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mustahsils.
     */
    skip?: number
    distinct?: MustahsilScalarFieldEnum | MustahsilScalarFieldEnum[]
  }

  /**
   * mustahsil create
   */
  export type mustahsilCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * The data needed to create a mustahsil.
     */
    data: XOR<mustahsilCreateInput, mustahsilUncheckedCreateInput>
  }

  /**
   * mustahsil createMany
   */
  export type mustahsilCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many mustahsils.
     */
    data: mustahsilCreateManyInput | mustahsilCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mustahsil createManyAndReturn
   */
  export type mustahsilCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * The data used to create many mustahsils.
     */
    data: mustahsilCreateManyInput | mustahsilCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * mustahsil update
   */
  export type mustahsilUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * The data needed to update a mustahsil.
     */
    data: XOR<mustahsilUpdateInput, mustahsilUncheckedUpdateInput>
    /**
     * Choose, which mustahsil to update.
     */
    where: mustahsilWhereUniqueInput
  }

  /**
   * mustahsil updateMany
   */
  export type mustahsilUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update mustahsils.
     */
    data: XOR<mustahsilUpdateManyMutationInput, mustahsilUncheckedUpdateManyInput>
    /**
     * Filter which mustahsils to update
     */
    where?: mustahsilWhereInput
    /**
     * Limit how many mustahsils to update.
     */
    limit?: number
  }

  /**
   * mustahsil updateManyAndReturn
   */
  export type mustahsilUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * The data used to update mustahsils.
     */
    data: XOR<mustahsilUpdateManyMutationInput, mustahsilUncheckedUpdateManyInput>
    /**
     * Filter which mustahsils to update
     */
    where?: mustahsilWhereInput
    /**
     * Limit how many mustahsils to update.
     */
    limit?: number
  }

  /**
   * mustahsil upsert
   */
  export type mustahsilUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * The filter to search for the mustahsil to update in case it exists.
     */
    where: mustahsilWhereUniqueInput
    /**
     * In case the mustahsil found by the `where` argument doesn't exist, create a new mustahsil with this data.
     */
    create: XOR<mustahsilCreateInput, mustahsilUncheckedCreateInput>
    /**
     * In case the mustahsil was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mustahsilUpdateInput, mustahsilUncheckedUpdateInput>
  }

  /**
   * mustahsil delete
   */
  export type mustahsilDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
    /**
     * Filter which mustahsil to delete.
     */
    where: mustahsilWhereUniqueInput
  }

  /**
   * mustahsil deleteMany
   */
  export type mustahsilDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mustahsils to delete
     */
    where?: mustahsilWhereInput
    /**
     * Limit how many mustahsils to delete.
     */
    limit?: number
  }

  /**
   * mustahsil.mal_kabul_records
   */
  export type mustahsil$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * mustahsil without action
   */
  export type mustahsilDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mustahsil
     */
    select?: mustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mustahsil
     */
    omit?: mustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mustahsilInclude<ExtArgs> | null
  }


  /**
   * Model ozel_firmalar
   */

  export type AggregateOzel_firmalar = {
    _count: Ozel_firmalarCountAggregateOutputType | null
    _min: Ozel_firmalarMinAggregateOutputType | null
    _max: Ozel_firmalarMaxAggregateOutputType | null
  }

  export type Ozel_firmalarMinAggregateOutputType = {
    id: string | null
    firmaAdi: string | null
    firmaNo: string | null
    vkn: string | null
    vergiDairesi: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    sehir: string | null
    adres: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Ozel_firmalarMaxAggregateOutputType = {
    id: string | null
    firmaAdi: string | null
    firmaNo: string | null
    vkn: string | null
    vergiDairesi: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    sehir: string | null
    adres: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Ozel_firmalarCountAggregateOutputType = {
    id: number
    firmaAdi: number
    firmaNo: number
    vkn: number
    vergiDairesi: number
    yetkiliAdi: number
    yetkiliTelefon: number
    sehir: number
    adres: number
    durum: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Ozel_firmalarMinAggregateInputType = {
    id?: true
    firmaAdi?: true
    firmaNo?: true
    vkn?: true
    vergiDairesi?: true
    yetkiliAdi?: true
    yetkiliTelefon?: true
    sehir?: true
    adres?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Ozel_firmalarMaxAggregateInputType = {
    id?: true
    firmaAdi?: true
    firmaNo?: true
    vkn?: true
    vergiDairesi?: true
    yetkiliAdi?: true
    yetkiliTelefon?: true
    sehir?: true
    adres?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Ozel_firmalarCountAggregateInputType = {
    id?: true
    firmaAdi?: true
    firmaNo?: true
    vkn?: true
    vergiDairesi?: true
    yetkiliAdi?: true
    yetkiliTelefon?: true
    sehir?: true
    adres?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Ozel_firmalarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ozel_firmalar to aggregate.
     */
    where?: ozel_firmalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ozel_firmalars to fetch.
     */
    orderBy?: ozel_firmalarOrderByWithRelationInput | ozel_firmalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ozel_firmalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ozel_firmalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ozel_firmalars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ozel_firmalars
    **/
    _count?: true | Ozel_firmalarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Ozel_firmalarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Ozel_firmalarMaxAggregateInputType
  }

  export type GetOzel_firmalarAggregateType<T extends Ozel_firmalarAggregateArgs> = {
        [P in keyof T & keyof AggregateOzel_firmalar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOzel_firmalar[P]>
      : GetScalarType<T[P], AggregateOzel_firmalar[P]>
  }




  export type ozel_firmalarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ozel_firmalarWhereInput
    orderBy?: ozel_firmalarOrderByWithAggregationInput | ozel_firmalarOrderByWithAggregationInput[]
    by: Ozel_firmalarScalarFieldEnum[] | Ozel_firmalarScalarFieldEnum
    having?: ozel_firmalarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Ozel_firmalarCountAggregateInputType | true
    _min?: Ozel_firmalarMinAggregateInputType
    _max?: Ozel_firmalarMaxAggregateInputType
  }

  export type Ozel_firmalarGroupByOutputType = {
    id: string
    firmaAdi: string
    firmaNo: string
    vkn: string | null
    vergiDairesi: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    sehir: string
    adres: string | null
    durum: string
    createdAt: Date | null
    updatedAt: Date | null
    _count: Ozel_firmalarCountAggregateOutputType | null
    _min: Ozel_firmalarMinAggregateOutputType | null
    _max: Ozel_firmalarMaxAggregateOutputType | null
  }

  type GetOzel_firmalarGroupByPayload<T extends ozel_firmalarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Ozel_firmalarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ozel_firmalarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ozel_firmalarGroupByOutputType[P]>
            : GetScalarType<T[P], Ozel_firmalarGroupByOutputType[P]>
        }
      >
    >


  export type ozel_firmalarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firmaAdi?: boolean
    firmaNo?: boolean
    vkn?: boolean
    vergiDairesi?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
    sehir?: boolean
    adres?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mal_kabul_records?: boolean | ozel_firmalar$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | Ozel_firmalarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ozel_firmalar"]>

  export type ozel_firmalarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firmaAdi?: boolean
    firmaNo?: boolean
    vkn?: boolean
    vergiDairesi?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
    sehir?: boolean
    adres?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ozel_firmalar"]>

  export type ozel_firmalarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firmaAdi?: boolean
    firmaNo?: boolean
    vkn?: boolean
    vergiDairesi?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
    sehir?: boolean
    adres?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ozel_firmalar"]>

  export type ozel_firmalarSelectScalar = {
    id?: boolean
    firmaAdi?: boolean
    firmaNo?: boolean
    vkn?: boolean
    vergiDairesi?: boolean
    yetkiliAdi?: boolean
    yetkiliTelefon?: boolean
    sehir?: boolean
    adres?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ozel_firmalarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firmaAdi" | "firmaNo" | "vkn" | "vergiDairesi" | "yetkiliAdi" | "yetkiliTelefon" | "sehir" | "adres" | "durum" | "createdAt" | "updatedAt", ExtArgs["result"]["ozel_firmalar"]>
  export type ozel_firmalarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | ozel_firmalar$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | Ozel_firmalarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ozel_firmalarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ozel_firmalarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ozel_firmalarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ozel_firmalar"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firmaAdi: string
      firmaNo: string
      vkn: string | null
      vergiDairesi: string | null
      yetkiliAdi: string | null
      yetkiliTelefon: string | null
      sehir: string
      adres: string | null
      durum: string
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["ozel_firmalar"]>
    composites: {}
  }

  type ozel_firmalarGetPayload<S extends boolean | null | undefined | ozel_firmalarDefaultArgs> = $Result.GetResult<Prisma.$ozel_firmalarPayload, S>

  type ozel_firmalarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ozel_firmalarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Ozel_firmalarCountAggregateInputType | true
    }

  export interface ozel_firmalarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ozel_firmalar'], meta: { name: 'ozel_firmalar' } }
    /**
     * Find zero or one Ozel_firmalar that matches the filter.
     * @param {ozel_firmalarFindUniqueArgs} args - Arguments to find a Ozel_firmalar
     * @example
     * // Get one Ozel_firmalar
     * const ozel_firmalar = await prisma.ozel_firmalar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ozel_firmalarFindUniqueArgs>(args: SelectSubset<T, ozel_firmalarFindUniqueArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ozel_firmalar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ozel_firmalarFindUniqueOrThrowArgs} args - Arguments to find a Ozel_firmalar
     * @example
     * // Get one Ozel_firmalar
     * const ozel_firmalar = await prisma.ozel_firmalar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ozel_firmalarFindUniqueOrThrowArgs>(args: SelectSubset<T, ozel_firmalarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ozel_firmalar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ozel_firmalarFindFirstArgs} args - Arguments to find a Ozel_firmalar
     * @example
     * // Get one Ozel_firmalar
     * const ozel_firmalar = await prisma.ozel_firmalar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ozel_firmalarFindFirstArgs>(args?: SelectSubset<T, ozel_firmalarFindFirstArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ozel_firmalar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ozel_firmalarFindFirstOrThrowArgs} args - Arguments to find a Ozel_firmalar
     * @example
     * // Get one Ozel_firmalar
     * const ozel_firmalar = await prisma.ozel_firmalar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ozel_firmalarFindFirstOrThrowArgs>(args?: SelectSubset<T, ozel_firmalarFindFirstOrThrowArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ozel_firmalars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ozel_firmalarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ozel_firmalars
     * const ozel_firmalars = await prisma.ozel_firmalar.findMany()
     * 
     * // Get first 10 Ozel_firmalars
     * const ozel_firmalars = await prisma.ozel_firmalar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ozel_firmalarWithIdOnly = await prisma.ozel_firmalar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ozel_firmalarFindManyArgs>(args?: SelectSubset<T, ozel_firmalarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ozel_firmalar.
     * @param {ozel_firmalarCreateArgs} args - Arguments to create a Ozel_firmalar.
     * @example
     * // Create one Ozel_firmalar
     * const Ozel_firmalar = await prisma.ozel_firmalar.create({
     *   data: {
     *     // ... data to create a Ozel_firmalar
     *   }
     * })
     * 
     */
    create<T extends ozel_firmalarCreateArgs>(args: SelectSubset<T, ozel_firmalarCreateArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ozel_firmalars.
     * @param {ozel_firmalarCreateManyArgs} args - Arguments to create many Ozel_firmalars.
     * @example
     * // Create many Ozel_firmalars
     * const ozel_firmalar = await prisma.ozel_firmalar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ozel_firmalarCreateManyArgs>(args?: SelectSubset<T, ozel_firmalarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ozel_firmalars and returns the data saved in the database.
     * @param {ozel_firmalarCreateManyAndReturnArgs} args - Arguments to create many Ozel_firmalars.
     * @example
     * // Create many Ozel_firmalars
     * const ozel_firmalar = await prisma.ozel_firmalar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ozel_firmalars and only return the `id`
     * const ozel_firmalarWithIdOnly = await prisma.ozel_firmalar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ozel_firmalarCreateManyAndReturnArgs>(args?: SelectSubset<T, ozel_firmalarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ozel_firmalar.
     * @param {ozel_firmalarDeleteArgs} args - Arguments to delete one Ozel_firmalar.
     * @example
     * // Delete one Ozel_firmalar
     * const Ozel_firmalar = await prisma.ozel_firmalar.delete({
     *   where: {
     *     // ... filter to delete one Ozel_firmalar
     *   }
     * })
     * 
     */
    delete<T extends ozel_firmalarDeleteArgs>(args: SelectSubset<T, ozel_firmalarDeleteArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ozel_firmalar.
     * @param {ozel_firmalarUpdateArgs} args - Arguments to update one Ozel_firmalar.
     * @example
     * // Update one Ozel_firmalar
     * const ozel_firmalar = await prisma.ozel_firmalar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ozel_firmalarUpdateArgs>(args: SelectSubset<T, ozel_firmalarUpdateArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ozel_firmalars.
     * @param {ozel_firmalarDeleteManyArgs} args - Arguments to filter Ozel_firmalars to delete.
     * @example
     * // Delete a few Ozel_firmalars
     * const { count } = await prisma.ozel_firmalar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ozel_firmalarDeleteManyArgs>(args?: SelectSubset<T, ozel_firmalarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ozel_firmalars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ozel_firmalarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ozel_firmalars
     * const ozel_firmalar = await prisma.ozel_firmalar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ozel_firmalarUpdateManyArgs>(args: SelectSubset<T, ozel_firmalarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ozel_firmalars and returns the data updated in the database.
     * @param {ozel_firmalarUpdateManyAndReturnArgs} args - Arguments to update many Ozel_firmalars.
     * @example
     * // Update many Ozel_firmalars
     * const ozel_firmalar = await prisma.ozel_firmalar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ozel_firmalars and only return the `id`
     * const ozel_firmalarWithIdOnly = await prisma.ozel_firmalar.updateManyAndReturn({
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
    updateManyAndReturn<T extends ozel_firmalarUpdateManyAndReturnArgs>(args: SelectSubset<T, ozel_firmalarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ozel_firmalar.
     * @param {ozel_firmalarUpsertArgs} args - Arguments to update or create a Ozel_firmalar.
     * @example
     * // Update or create a Ozel_firmalar
     * const ozel_firmalar = await prisma.ozel_firmalar.upsert({
     *   create: {
     *     // ... data to create a Ozel_firmalar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ozel_firmalar we want to update
     *   }
     * })
     */
    upsert<T extends ozel_firmalarUpsertArgs>(args: SelectSubset<T, ozel_firmalarUpsertArgs<ExtArgs>>): Prisma__ozel_firmalarClient<$Result.GetResult<Prisma.$ozel_firmalarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ozel_firmalars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ozel_firmalarCountArgs} args - Arguments to filter Ozel_firmalars to count.
     * @example
     * // Count the number of Ozel_firmalars
     * const count = await prisma.ozel_firmalar.count({
     *   where: {
     *     // ... the filter for the Ozel_firmalars we want to count
     *   }
     * })
    **/
    count<T extends ozel_firmalarCountArgs>(
      args?: Subset<T, ozel_firmalarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Ozel_firmalarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ozel_firmalar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ozel_firmalarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Ozel_firmalarAggregateArgs>(args: Subset<T, Ozel_firmalarAggregateArgs>): Prisma.PrismaPromise<GetOzel_firmalarAggregateType<T>>

    /**
     * Group by Ozel_firmalar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ozel_firmalarGroupByArgs} args - Group by arguments.
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
      T extends ozel_firmalarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ozel_firmalarGroupByArgs['orderBy'] }
        : { orderBy?: ozel_firmalarGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ozel_firmalarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOzel_firmalarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ozel_firmalar model
   */
  readonly fields: ozel_firmalarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ozel_firmalar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ozel_firmalarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends ozel_firmalar$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, ozel_firmalar$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ozel_firmalar model
   */
  interface ozel_firmalarFieldRefs {
    readonly id: FieldRef<"ozel_firmalar", 'String'>
    readonly firmaAdi: FieldRef<"ozel_firmalar", 'String'>
    readonly firmaNo: FieldRef<"ozel_firmalar", 'String'>
    readonly vkn: FieldRef<"ozel_firmalar", 'String'>
    readonly vergiDairesi: FieldRef<"ozel_firmalar", 'String'>
    readonly yetkiliAdi: FieldRef<"ozel_firmalar", 'String'>
    readonly yetkiliTelefon: FieldRef<"ozel_firmalar", 'String'>
    readonly sehir: FieldRef<"ozel_firmalar", 'String'>
    readonly adres: FieldRef<"ozel_firmalar", 'String'>
    readonly durum: FieldRef<"ozel_firmalar", 'String'>
    readonly createdAt: FieldRef<"ozel_firmalar", 'DateTime'>
    readonly updatedAt: FieldRef<"ozel_firmalar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ozel_firmalar findUnique
   */
  export type ozel_firmalarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * Filter, which ozel_firmalar to fetch.
     */
    where: ozel_firmalarWhereUniqueInput
  }

  /**
   * ozel_firmalar findUniqueOrThrow
   */
  export type ozel_firmalarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * Filter, which ozel_firmalar to fetch.
     */
    where: ozel_firmalarWhereUniqueInput
  }

  /**
   * ozel_firmalar findFirst
   */
  export type ozel_firmalarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * Filter, which ozel_firmalar to fetch.
     */
    where?: ozel_firmalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ozel_firmalars to fetch.
     */
    orderBy?: ozel_firmalarOrderByWithRelationInput | ozel_firmalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ozel_firmalars.
     */
    cursor?: ozel_firmalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ozel_firmalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ozel_firmalars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ozel_firmalars.
     */
    distinct?: Ozel_firmalarScalarFieldEnum | Ozel_firmalarScalarFieldEnum[]
  }

  /**
   * ozel_firmalar findFirstOrThrow
   */
  export type ozel_firmalarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * Filter, which ozel_firmalar to fetch.
     */
    where?: ozel_firmalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ozel_firmalars to fetch.
     */
    orderBy?: ozel_firmalarOrderByWithRelationInput | ozel_firmalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ozel_firmalars.
     */
    cursor?: ozel_firmalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ozel_firmalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ozel_firmalars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ozel_firmalars.
     */
    distinct?: Ozel_firmalarScalarFieldEnum | Ozel_firmalarScalarFieldEnum[]
  }

  /**
   * ozel_firmalar findMany
   */
  export type ozel_firmalarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * Filter, which ozel_firmalars to fetch.
     */
    where?: ozel_firmalarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ozel_firmalars to fetch.
     */
    orderBy?: ozel_firmalarOrderByWithRelationInput | ozel_firmalarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ozel_firmalars.
     */
    cursor?: ozel_firmalarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ozel_firmalars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ozel_firmalars.
     */
    skip?: number
    distinct?: Ozel_firmalarScalarFieldEnum | Ozel_firmalarScalarFieldEnum[]
  }

  /**
   * ozel_firmalar create
   */
  export type ozel_firmalarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * The data needed to create a ozel_firmalar.
     */
    data: XOR<ozel_firmalarCreateInput, ozel_firmalarUncheckedCreateInput>
  }

  /**
   * ozel_firmalar createMany
   */
  export type ozel_firmalarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ozel_firmalars.
     */
    data: ozel_firmalarCreateManyInput | ozel_firmalarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ozel_firmalar createManyAndReturn
   */
  export type ozel_firmalarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * The data used to create many ozel_firmalars.
     */
    data: ozel_firmalarCreateManyInput | ozel_firmalarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ozel_firmalar update
   */
  export type ozel_firmalarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * The data needed to update a ozel_firmalar.
     */
    data: XOR<ozel_firmalarUpdateInput, ozel_firmalarUncheckedUpdateInput>
    /**
     * Choose, which ozel_firmalar to update.
     */
    where: ozel_firmalarWhereUniqueInput
  }

  /**
   * ozel_firmalar updateMany
   */
  export type ozel_firmalarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ozel_firmalars.
     */
    data: XOR<ozel_firmalarUpdateManyMutationInput, ozel_firmalarUncheckedUpdateManyInput>
    /**
     * Filter which ozel_firmalars to update
     */
    where?: ozel_firmalarWhereInput
    /**
     * Limit how many ozel_firmalars to update.
     */
    limit?: number
  }

  /**
   * ozel_firmalar updateManyAndReturn
   */
  export type ozel_firmalarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * The data used to update ozel_firmalars.
     */
    data: XOR<ozel_firmalarUpdateManyMutationInput, ozel_firmalarUncheckedUpdateManyInput>
    /**
     * Filter which ozel_firmalars to update
     */
    where?: ozel_firmalarWhereInput
    /**
     * Limit how many ozel_firmalars to update.
     */
    limit?: number
  }

  /**
   * ozel_firmalar upsert
   */
  export type ozel_firmalarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * The filter to search for the ozel_firmalar to update in case it exists.
     */
    where: ozel_firmalarWhereUniqueInput
    /**
     * In case the ozel_firmalar found by the `where` argument doesn't exist, create a new ozel_firmalar with this data.
     */
    create: XOR<ozel_firmalarCreateInput, ozel_firmalarUncheckedCreateInput>
    /**
     * In case the ozel_firmalar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ozel_firmalarUpdateInput, ozel_firmalarUncheckedUpdateInput>
  }

  /**
   * ozel_firmalar delete
   */
  export type ozel_firmalarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
    /**
     * Filter which ozel_firmalar to delete.
     */
    where: ozel_firmalarWhereUniqueInput
  }

  /**
   * ozel_firmalar deleteMany
   */
  export type ozel_firmalarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ozel_firmalars to delete
     */
    where?: ozel_firmalarWhereInput
    /**
     * Limit how many ozel_firmalars to delete.
     */
    limit?: number
  }

  /**
   * ozel_firmalar.mal_kabul_records
   */
  export type ozel_firmalar$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * ozel_firmalar without action
   */
  export type ozel_firmalarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ozel_firmalar
     */
    select?: ozel_firmalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ozel_firmalar
     */
    omit?: ozel_firmalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ozel_firmalarInclude<ExtArgs> | null
  }


  /**
   * Model ureticiler
   */

  export type AggregateUreticiler = {
    _count: UreticilerCountAggregateOutputType | null
    _min: UreticilerMinAggregateOutputType | null
    _max: UreticilerMaxAggregateOutputType | null
  }

  export type UreticilerMinAggregateOutputType = {
    id: string | null
    ad: string | null
    createdAt: Date | null
    updatedAt: Date | null
    cinsiyet: string | null
    dogumTarihi: Date | null
    iletisim: string | null
    komisyoncuId: string | null
    sehir: string | null
    soyad: string | null
    tcNo: string | null
    durum: string | null
  }

  export type UreticilerMaxAggregateOutputType = {
    id: string | null
    ad: string | null
    createdAt: Date | null
    updatedAt: Date | null
    cinsiyet: string | null
    dogumTarihi: Date | null
    iletisim: string | null
    komisyoncuId: string | null
    sehir: string | null
    soyad: string | null
    tcNo: string | null
    durum: string | null
  }

  export type UreticilerCountAggregateOutputType = {
    id: number
    ad: number
    createdAt: number
    updatedAt: number
    cinsiyet: number
    dogumTarihi: number
    iletisim: number
    komisyoncuId: number
    sehir: number
    soyad: number
    tcNo: number
    durum: number
    _all: number
  }


  export type UreticilerMinAggregateInputType = {
    id?: true
    ad?: true
    createdAt?: true
    updatedAt?: true
    cinsiyet?: true
    dogumTarihi?: true
    iletisim?: true
    komisyoncuId?: true
    sehir?: true
    soyad?: true
    tcNo?: true
    durum?: true
  }

  export type UreticilerMaxAggregateInputType = {
    id?: true
    ad?: true
    createdAt?: true
    updatedAt?: true
    cinsiyet?: true
    dogumTarihi?: true
    iletisim?: true
    komisyoncuId?: true
    sehir?: true
    soyad?: true
    tcNo?: true
    durum?: true
  }

  export type UreticilerCountAggregateInputType = {
    id?: true
    ad?: true
    createdAt?: true
    updatedAt?: true
    cinsiyet?: true
    dogumTarihi?: true
    iletisim?: true
    komisyoncuId?: true
    sehir?: true
    soyad?: true
    tcNo?: true
    durum?: true
    _all?: true
  }

  export type UreticilerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ureticiler to aggregate.
     */
    where?: ureticilerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ureticilers to fetch.
     */
    orderBy?: ureticilerOrderByWithRelationInput | ureticilerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ureticilerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ureticilers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ureticilers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ureticilers
    **/
    _count?: true | UreticilerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UreticilerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UreticilerMaxAggregateInputType
  }

  export type GetUreticilerAggregateType<T extends UreticilerAggregateArgs> = {
        [P in keyof T & keyof AggregateUreticiler]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUreticiler[P]>
      : GetScalarType<T[P], AggregateUreticiler[P]>
  }




  export type ureticilerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ureticilerWhereInput
    orderBy?: ureticilerOrderByWithAggregationInput | ureticilerOrderByWithAggregationInput[]
    by: UreticilerScalarFieldEnum[] | UreticilerScalarFieldEnum
    having?: ureticilerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UreticilerCountAggregateInputType | true
    _min?: UreticilerMinAggregateInputType
    _max?: UreticilerMaxAggregateInputType
  }

  export type UreticilerGroupByOutputType = {
    id: string
    ad: string
    createdAt: Date | null
    updatedAt: Date | null
    cinsiyet: string
    dogumTarihi: Date | null
    iletisim: string | null
    komisyoncuId: string | null
    sehir: string
    soyad: string
    tcNo: string | null
    durum: string
    _count: UreticilerCountAggregateOutputType | null
    _min: UreticilerMinAggregateOutputType | null
    _max: UreticilerMaxAggregateOutputType | null
  }

  type GetUreticilerGroupByPayload<T extends ureticilerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UreticilerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UreticilerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UreticilerGroupByOutputType[P]>
            : GetScalarType<T[P], UreticilerGroupByOutputType[P]>
        }
      >
    >


  export type ureticilerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
    durum?: boolean
    mal_kabul_records?: boolean | ureticiler$mal_kabul_recordsArgs<ExtArgs>
    komisyoncular?: boolean | ureticiler$komisyoncularArgs<ExtArgs>
    _count?: boolean | UreticilerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ureticiler"]>

  export type ureticilerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
    durum?: boolean
    komisyoncular?: boolean | ureticiler$komisyoncularArgs<ExtArgs>
  }, ExtArgs["result"]["ureticiler"]>

  export type ureticilerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
    durum?: boolean
    komisyoncular?: boolean | ureticiler$komisyoncularArgs<ExtArgs>
  }, ExtArgs["result"]["ureticiler"]>

  export type ureticilerSelectScalar = {
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
    durum?: boolean
  }

  export type ureticilerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "createdAt" | "updatedAt" | "cinsiyet" | "dogumTarihi" | "iletisim" | "komisyoncuId" | "sehir" | "soyad" | "tcNo" | "durum", ExtArgs["result"]["ureticiler"]>
  export type ureticilerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | ureticiler$mal_kabul_recordsArgs<ExtArgs>
    komisyoncular?: boolean | ureticiler$komisyoncularArgs<ExtArgs>
    _count?: boolean | UreticilerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ureticilerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    komisyoncular?: boolean | ureticiler$komisyoncularArgs<ExtArgs>
  }
  export type ureticilerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    komisyoncular?: boolean | ureticiler$komisyoncularArgs<ExtArgs>
  }

  export type $ureticilerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ureticiler"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
      komisyoncular: Prisma.$komisyoncularPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ad: string
      createdAt: Date | null
      updatedAt: Date | null
      cinsiyet: string
      dogumTarihi: Date | null
      iletisim: string | null
      komisyoncuId: string | null
      sehir: string
      soyad: string
      tcNo: string | null
      durum: string
    }, ExtArgs["result"]["ureticiler"]>
    composites: {}
  }

  type ureticilerGetPayload<S extends boolean | null | undefined | ureticilerDefaultArgs> = $Result.GetResult<Prisma.$ureticilerPayload, S>

  type ureticilerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ureticilerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UreticilerCountAggregateInputType | true
    }

  export interface ureticilerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ureticiler'], meta: { name: 'ureticiler' } }
    /**
     * Find zero or one Ureticiler that matches the filter.
     * @param {ureticilerFindUniqueArgs} args - Arguments to find a Ureticiler
     * @example
     * // Get one Ureticiler
     * const ureticiler = await prisma.ureticiler.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ureticilerFindUniqueArgs>(args: SelectSubset<T, ureticilerFindUniqueArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ureticiler that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ureticilerFindUniqueOrThrowArgs} args - Arguments to find a Ureticiler
     * @example
     * // Get one Ureticiler
     * const ureticiler = await prisma.ureticiler.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ureticilerFindUniqueOrThrowArgs>(args: SelectSubset<T, ureticilerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ureticiler that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ureticilerFindFirstArgs} args - Arguments to find a Ureticiler
     * @example
     * // Get one Ureticiler
     * const ureticiler = await prisma.ureticiler.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ureticilerFindFirstArgs>(args?: SelectSubset<T, ureticilerFindFirstArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ureticiler that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ureticilerFindFirstOrThrowArgs} args - Arguments to find a Ureticiler
     * @example
     * // Get one Ureticiler
     * const ureticiler = await prisma.ureticiler.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ureticilerFindFirstOrThrowArgs>(args?: SelectSubset<T, ureticilerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ureticilers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ureticilerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ureticilers
     * const ureticilers = await prisma.ureticiler.findMany()
     * 
     * // Get first 10 Ureticilers
     * const ureticilers = await prisma.ureticiler.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ureticilerWithIdOnly = await prisma.ureticiler.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ureticilerFindManyArgs>(args?: SelectSubset<T, ureticilerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ureticiler.
     * @param {ureticilerCreateArgs} args - Arguments to create a Ureticiler.
     * @example
     * // Create one Ureticiler
     * const Ureticiler = await prisma.ureticiler.create({
     *   data: {
     *     // ... data to create a Ureticiler
     *   }
     * })
     * 
     */
    create<T extends ureticilerCreateArgs>(args: SelectSubset<T, ureticilerCreateArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ureticilers.
     * @param {ureticilerCreateManyArgs} args - Arguments to create many Ureticilers.
     * @example
     * // Create many Ureticilers
     * const ureticiler = await prisma.ureticiler.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ureticilerCreateManyArgs>(args?: SelectSubset<T, ureticilerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ureticilers and returns the data saved in the database.
     * @param {ureticilerCreateManyAndReturnArgs} args - Arguments to create many Ureticilers.
     * @example
     * // Create many Ureticilers
     * const ureticiler = await prisma.ureticiler.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ureticilers and only return the `id`
     * const ureticilerWithIdOnly = await prisma.ureticiler.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ureticilerCreateManyAndReturnArgs>(args?: SelectSubset<T, ureticilerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ureticiler.
     * @param {ureticilerDeleteArgs} args - Arguments to delete one Ureticiler.
     * @example
     * // Delete one Ureticiler
     * const Ureticiler = await prisma.ureticiler.delete({
     *   where: {
     *     // ... filter to delete one Ureticiler
     *   }
     * })
     * 
     */
    delete<T extends ureticilerDeleteArgs>(args: SelectSubset<T, ureticilerDeleteArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ureticiler.
     * @param {ureticilerUpdateArgs} args - Arguments to update one Ureticiler.
     * @example
     * // Update one Ureticiler
     * const ureticiler = await prisma.ureticiler.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ureticilerUpdateArgs>(args: SelectSubset<T, ureticilerUpdateArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ureticilers.
     * @param {ureticilerDeleteManyArgs} args - Arguments to filter Ureticilers to delete.
     * @example
     * // Delete a few Ureticilers
     * const { count } = await prisma.ureticiler.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ureticilerDeleteManyArgs>(args?: SelectSubset<T, ureticilerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ureticilers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ureticilerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ureticilers
     * const ureticiler = await prisma.ureticiler.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ureticilerUpdateManyArgs>(args: SelectSubset<T, ureticilerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ureticilers and returns the data updated in the database.
     * @param {ureticilerUpdateManyAndReturnArgs} args - Arguments to update many Ureticilers.
     * @example
     * // Update many Ureticilers
     * const ureticiler = await prisma.ureticiler.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ureticilers and only return the `id`
     * const ureticilerWithIdOnly = await prisma.ureticiler.updateManyAndReturn({
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
    updateManyAndReturn<T extends ureticilerUpdateManyAndReturnArgs>(args: SelectSubset<T, ureticilerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ureticiler.
     * @param {ureticilerUpsertArgs} args - Arguments to update or create a Ureticiler.
     * @example
     * // Update or create a Ureticiler
     * const ureticiler = await prisma.ureticiler.upsert({
     *   create: {
     *     // ... data to create a Ureticiler
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ureticiler we want to update
     *   }
     * })
     */
    upsert<T extends ureticilerUpsertArgs>(args: SelectSubset<T, ureticilerUpsertArgs<ExtArgs>>): Prisma__ureticilerClient<$Result.GetResult<Prisma.$ureticilerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ureticilers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ureticilerCountArgs} args - Arguments to filter Ureticilers to count.
     * @example
     * // Count the number of Ureticilers
     * const count = await prisma.ureticiler.count({
     *   where: {
     *     // ... the filter for the Ureticilers we want to count
     *   }
     * })
    **/
    count<T extends ureticilerCountArgs>(
      args?: Subset<T, ureticilerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UreticilerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ureticiler.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticilerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UreticilerAggregateArgs>(args: Subset<T, UreticilerAggregateArgs>): Prisma.PrismaPromise<GetUreticilerAggregateType<T>>

    /**
     * Group by Ureticiler.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ureticilerGroupByArgs} args - Group by arguments.
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
      T extends ureticilerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ureticilerGroupByArgs['orderBy'] }
        : { orderBy?: ureticilerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ureticilerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUreticilerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ureticiler model
   */
  readonly fields: ureticilerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ureticiler.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ureticilerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends ureticiler$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, ureticiler$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    komisyoncular<T extends ureticiler$komisyoncularArgs<ExtArgs> = {}>(args?: Subset<T, ureticiler$komisyoncularArgs<ExtArgs>>): Prisma__komisyoncularClient<$Result.GetResult<Prisma.$komisyoncularPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ureticiler model
   */
  interface ureticilerFieldRefs {
    readonly id: FieldRef<"ureticiler", 'String'>
    readonly ad: FieldRef<"ureticiler", 'String'>
    readonly createdAt: FieldRef<"ureticiler", 'DateTime'>
    readonly updatedAt: FieldRef<"ureticiler", 'DateTime'>
    readonly cinsiyet: FieldRef<"ureticiler", 'String'>
    readonly dogumTarihi: FieldRef<"ureticiler", 'DateTime'>
    readonly iletisim: FieldRef<"ureticiler", 'String'>
    readonly komisyoncuId: FieldRef<"ureticiler", 'String'>
    readonly sehir: FieldRef<"ureticiler", 'String'>
    readonly soyad: FieldRef<"ureticiler", 'String'>
    readonly tcNo: FieldRef<"ureticiler", 'String'>
    readonly durum: FieldRef<"ureticiler", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ureticiler findUnique
   */
  export type ureticilerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * Filter, which ureticiler to fetch.
     */
    where: ureticilerWhereUniqueInput
  }

  /**
   * ureticiler findUniqueOrThrow
   */
  export type ureticilerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * Filter, which ureticiler to fetch.
     */
    where: ureticilerWhereUniqueInput
  }

  /**
   * ureticiler findFirst
   */
  export type ureticilerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * Filter, which ureticiler to fetch.
     */
    where?: ureticilerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ureticilers to fetch.
     */
    orderBy?: ureticilerOrderByWithRelationInput | ureticilerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ureticilers.
     */
    cursor?: ureticilerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ureticilers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ureticilers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ureticilers.
     */
    distinct?: UreticilerScalarFieldEnum | UreticilerScalarFieldEnum[]
  }

  /**
   * ureticiler findFirstOrThrow
   */
  export type ureticilerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * Filter, which ureticiler to fetch.
     */
    where?: ureticilerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ureticilers to fetch.
     */
    orderBy?: ureticilerOrderByWithRelationInput | ureticilerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ureticilers.
     */
    cursor?: ureticilerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ureticilers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ureticilers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ureticilers.
     */
    distinct?: UreticilerScalarFieldEnum | UreticilerScalarFieldEnum[]
  }

  /**
   * ureticiler findMany
   */
  export type ureticilerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * Filter, which ureticilers to fetch.
     */
    where?: ureticilerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ureticilers to fetch.
     */
    orderBy?: ureticilerOrderByWithRelationInput | ureticilerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ureticilers.
     */
    cursor?: ureticilerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ureticilers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ureticilers.
     */
    skip?: number
    distinct?: UreticilerScalarFieldEnum | UreticilerScalarFieldEnum[]
  }

  /**
   * ureticiler create
   */
  export type ureticilerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * The data needed to create a ureticiler.
     */
    data: XOR<ureticilerCreateInput, ureticilerUncheckedCreateInput>
  }

  /**
   * ureticiler createMany
   */
  export type ureticilerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ureticilers.
     */
    data: ureticilerCreateManyInput | ureticilerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ureticiler createManyAndReturn
   */
  export type ureticilerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * The data used to create many ureticilers.
     */
    data: ureticilerCreateManyInput | ureticilerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ureticiler update
   */
  export type ureticilerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * The data needed to update a ureticiler.
     */
    data: XOR<ureticilerUpdateInput, ureticilerUncheckedUpdateInput>
    /**
     * Choose, which ureticiler to update.
     */
    where: ureticilerWhereUniqueInput
  }

  /**
   * ureticiler updateMany
   */
  export type ureticilerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ureticilers.
     */
    data: XOR<ureticilerUpdateManyMutationInput, ureticilerUncheckedUpdateManyInput>
    /**
     * Filter which ureticilers to update
     */
    where?: ureticilerWhereInput
    /**
     * Limit how many ureticilers to update.
     */
    limit?: number
  }

  /**
   * ureticiler updateManyAndReturn
   */
  export type ureticilerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * The data used to update ureticilers.
     */
    data: XOR<ureticilerUpdateManyMutationInput, ureticilerUncheckedUpdateManyInput>
    /**
     * Filter which ureticilers to update
     */
    where?: ureticilerWhereInput
    /**
     * Limit how many ureticilers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ureticiler upsert
   */
  export type ureticilerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * The filter to search for the ureticiler to update in case it exists.
     */
    where: ureticilerWhereUniqueInput
    /**
     * In case the ureticiler found by the `where` argument doesn't exist, create a new ureticiler with this data.
     */
    create: XOR<ureticilerCreateInput, ureticilerUncheckedCreateInput>
    /**
     * In case the ureticiler was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ureticilerUpdateInput, ureticilerUncheckedUpdateInput>
  }

  /**
   * ureticiler delete
   */
  export type ureticilerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
    /**
     * Filter which ureticiler to delete.
     */
    where: ureticilerWhereUniqueInput
  }

  /**
   * ureticiler deleteMany
   */
  export type ureticilerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ureticilers to delete
     */
    where?: ureticilerWhereInput
    /**
     * Limit how many ureticilers to delete.
     */
    limit?: number
  }

  /**
   * ureticiler.mal_kabul_records
   */
  export type ureticiler$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * ureticiler.komisyoncular
   */
  export type ureticiler$komisyoncularArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the komisyoncular
     */
    select?: komisyoncularSelect<ExtArgs> | null
    /**
     * Omit specific fields from the komisyoncular
     */
    omit?: komisyoncularOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: komisyoncularInclude<ExtArgs> | null
    where?: komisyoncularWhereInput
  }

  /**
   * ureticiler without action
   */
  export type ureticilerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ureticiler
     */
    select?: ureticilerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ureticiler
     */
    omit?: ureticilerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ureticilerInclude<ExtArgs> | null
  }


  /**
   * Model urunler
   */

  export type AggregateUrunler = {
    _count: UrunlerCountAggregateOutputType | null
    _min: UrunlerMinAggregateOutputType | null
    _max: UrunlerMaxAggregateOutputType | null
  }

  export type UrunlerMinAggregateOutputType = {
    id: string | null
    ad: string | null
    stokKodu: string | null
    kategori: string | null
    birim: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UrunlerMaxAggregateOutputType = {
    id: string | null
    ad: string | null
    stokKodu: string | null
    kategori: string | null
    birim: string | null
    durum: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UrunlerCountAggregateOutputType = {
    id: number
    ad: number
    stokKodu: number
    kategori: number
    birim: number
    durum: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UrunlerMinAggregateInputType = {
    id?: true
    ad?: true
    stokKodu?: true
    kategori?: true
    birim?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UrunlerMaxAggregateInputType = {
    id?: true
    ad?: true
    stokKodu?: true
    kategori?: true
    birim?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UrunlerCountAggregateInputType = {
    id?: true
    ad?: true
    stokKodu?: true
    kategori?: true
    birim?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UrunlerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which urunler to aggregate.
     */
    where?: urunlerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of urunlers to fetch.
     */
    orderBy?: urunlerOrderByWithRelationInput | urunlerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: urunlerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` urunlers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` urunlers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned urunlers
    **/
    _count?: true | UrunlerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UrunlerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UrunlerMaxAggregateInputType
  }

  export type GetUrunlerAggregateType<T extends UrunlerAggregateArgs> = {
        [P in keyof T & keyof AggregateUrunler]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUrunler[P]>
      : GetScalarType<T[P], AggregateUrunler[P]>
  }




  export type urunlerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: urunlerWhereInput
    orderBy?: urunlerOrderByWithAggregationInput | urunlerOrderByWithAggregationInput[]
    by: UrunlerScalarFieldEnum[] | UrunlerScalarFieldEnum
    having?: urunlerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UrunlerCountAggregateInputType | true
    _min?: UrunlerMinAggregateInputType
    _max?: UrunlerMaxAggregateInputType
  }

  export type UrunlerGroupByOutputType = {
    id: string
    ad: string
    stokKodu: string
    kategori: string | null
    birim: string
    durum: string
    createdAt: Date | null
    updatedAt: Date | null
    _count: UrunlerCountAggregateOutputType | null
    _min: UrunlerMinAggregateOutputType | null
    _max: UrunlerMaxAggregateOutputType | null
  }

  type GetUrunlerGroupByPayload<T extends urunlerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UrunlerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UrunlerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UrunlerGroupByOutputType[P]>
            : GetScalarType<T[P], UrunlerGroupByOutputType[P]>
        }
      >
    >


  export type urunlerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mal_kabul_records?: boolean | urunler$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | UrunlerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["urunler"]>

  export type urunlerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urunler"]>

  export type urunlerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urunler"]>

  export type urunlerSelectScalar = {
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type urunlerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "stokKodu" | "kategori" | "birim" | "durum" | "createdAt" | "updatedAt", ExtArgs["result"]["urunler"]>
  export type urunlerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | urunler$mal_kabul_recordsArgs<ExtArgs>
    _count?: boolean | UrunlerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type urunlerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type urunlerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $urunlerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "urunler"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ad: string
      stokKodu: string
      kategori: string | null
      birim: string
      durum: string
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["urunler"]>
    composites: {}
  }

  type urunlerGetPayload<S extends boolean | null | undefined | urunlerDefaultArgs> = $Result.GetResult<Prisma.$urunlerPayload, S>

  type urunlerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<urunlerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UrunlerCountAggregateInputType | true
    }

  export interface urunlerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['urunler'], meta: { name: 'urunler' } }
    /**
     * Find zero or one Urunler that matches the filter.
     * @param {urunlerFindUniqueArgs} args - Arguments to find a Urunler
     * @example
     * // Get one Urunler
     * const urunler = await prisma.urunler.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends urunlerFindUniqueArgs>(args: SelectSubset<T, urunlerFindUniqueArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Urunler that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {urunlerFindUniqueOrThrowArgs} args - Arguments to find a Urunler
     * @example
     * // Get one Urunler
     * const urunler = await prisma.urunler.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends urunlerFindUniqueOrThrowArgs>(args: SelectSubset<T, urunlerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Urunler that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {urunlerFindFirstArgs} args - Arguments to find a Urunler
     * @example
     * // Get one Urunler
     * const urunler = await prisma.urunler.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends urunlerFindFirstArgs>(args?: SelectSubset<T, urunlerFindFirstArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Urunler that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {urunlerFindFirstOrThrowArgs} args - Arguments to find a Urunler
     * @example
     * // Get one Urunler
     * const urunler = await prisma.urunler.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends urunlerFindFirstOrThrowArgs>(args?: SelectSubset<T, urunlerFindFirstOrThrowArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Urunlers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {urunlerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Urunlers
     * const urunlers = await prisma.urunler.findMany()
     * 
     * // Get first 10 Urunlers
     * const urunlers = await prisma.urunler.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const urunlerWithIdOnly = await prisma.urunler.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends urunlerFindManyArgs>(args?: SelectSubset<T, urunlerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Urunler.
     * @param {urunlerCreateArgs} args - Arguments to create a Urunler.
     * @example
     * // Create one Urunler
     * const Urunler = await prisma.urunler.create({
     *   data: {
     *     // ... data to create a Urunler
     *   }
     * })
     * 
     */
    create<T extends urunlerCreateArgs>(args: SelectSubset<T, urunlerCreateArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Urunlers.
     * @param {urunlerCreateManyArgs} args - Arguments to create many Urunlers.
     * @example
     * // Create many Urunlers
     * const urunler = await prisma.urunler.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends urunlerCreateManyArgs>(args?: SelectSubset<T, urunlerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Urunlers and returns the data saved in the database.
     * @param {urunlerCreateManyAndReturnArgs} args - Arguments to create many Urunlers.
     * @example
     * // Create many Urunlers
     * const urunler = await prisma.urunler.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Urunlers and only return the `id`
     * const urunlerWithIdOnly = await prisma.urunler.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends urunlerCreateManyAndReturnArgs>(args?: SelectSubset<T, urunlerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Urunler.
     * @param {urunlerDeleteArgs} args - Arguments to delete one Urunler.
     * @example
     * // Delete one Urunler
     * const Urunler = await prisma.urunler.delete({
     *   where: {
     *     // ... filter to delete one Urunler
     *   }
     * })
     * 
     */
    delete<T extends urunlerDeleteArgs>(args: SelectSubset<T, urunlerDeleteArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Urunler.
     * @param {urunlerUpdateArgs} args - Arguments to update one Urunler.
     * @example
     * // Update one Urunler
     * const urunler = await prisma.urunler.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends urunlerUpdateArgs>(args: SelectSubset<T, urunlerUpdateArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Urunlers.
     * @param {urunlerDeleteManyArgs} args - Arguments to filter Urunlers to delete.
     * @example
     * // Delete a few Urunlers
     * const { count } = await prisma.urunler.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends urunlerDeleteManyArgs>(args?: SelectSubset<T, urunlerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Urunlers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {urunlerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Urunlers
     * const urunler = await prisma.urunler.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends urunlerUpdateManyArgs>(args: SelectSubset<T, urunlerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Urunlers and returns the data updated in the database.
     * @param {urunlerUpdateManyAndReturnArgs} args - Arguments to update many Urunlers.
     * @example
     * // Update many Urunlers
     * const urunler = await prisma.urunler.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Urunlers and only return the `id`
     * const urunlerWithIdOnly = await prisma.urunler.updateManyAndReturn({
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
    updateManyAndReturn<T extends urunlerUpdateManyAndReturnArgs>(args: SelectSubset<T, urunlerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Urunler.
     * @param {urunlerUpsertArgs} args - Arguments to update or create a Urunler.
     * @example
     * // Update or create a Urunler
     * const urunler = await prisma.urunler.upsert({
     *   create: {
     *     // ... data to create a Urunler
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Urunler we want to update
     *   }
     * })
     */
    upsert<T extends urunlerUpsertArgs>(args: SelectSubset<T, urunlerUpsertArgs<ExtArgs>>): Prisma__urunlerClient<$Result.GetResult<Prisma.$urunlerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Urunlers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {urunlerCountArgs} args - Arguments to filter Urunlers to count.
     * @example
     * // Count the number of Urunlers
     * const count = await prisma.urunler.count({
     *   where: {
     *     // ... the filter for the Urunlers we want to count
     *   }
     * })
    **/
    count<T extends urunlerCountArgs>(
      args?: Subset<T, urunlerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UrunlerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Urunler.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunlerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UrunlerAggregateArgs>(args: Subset<T, UrunlerAggregateArgs>): Prisma.PrismaPromise<GetUrunlerAggregateType<T>>

    /**
     * Group by Urunler.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {urunlerGroupByArgs} args - Group by arguments.
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
      T extends urunlerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: urunlerGroupByArgs['orderBy'] }
        : { orderBy?: urunlerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, urunlerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUrunlerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the urunler model
   */
  readonly fields: urunlerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for urunler.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__urunlerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends urunler$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, urunler$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the urunler model
   */
  interface urunlerFieldRefs {
    readonly id: FieldRef<"urunler", 'String'>
    readonly ad: FieldRef<"urunler", 'String'>
    readonly stokKodu: FieldRef<"urunler", 'String'>
    readonly kategori: FieldRef<"urunler", 'String'>
    readonly birim: FieldRef<"urunler", 'String'>
    readonly durum: FieldRef<"urunler", 'String'>
    readonly createdAt: FieldRef<"urunler", 'DateTime'>
    readonly updatedAt: FieldRef<"urunler", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * urunler findUnique
   */
  export type urunlerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * Filter, which urunler to fetch.
     */
    where: urunlerWhereUniqueInput
  }

  /**
   * urunler findUniqueOrThrow
   */
  export type urunlerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * Filter, which urunler to fetch.
     */
    where: urunlerWhereUniqueInput
  }

  /**
   * urunler findFirst
   */
  export type urunlerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * Filter, which urunler to fetch.
     */
    where?: urunlerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of urunlers to fetch.
     */
    orderBy?: urunlerOrderByWithRelationInput | urunlerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for urunlers.
     */
    cursor?: urunlerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` urunlers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` urunlers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of urunlers.
     */
    distinct?: UrunlerScalarFieldEnum | UrunlerScalarFieldEnum[]
  }

  /**
   * urunler findFirstOrThrow
   */
  export type urunlerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * Filter, which urunler to fetch.
     */
    where?: urunlerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of urunlers to fetch.
     */
    orderBy?: urunlerOrderByWithRelationInput | urunlerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for urunlers.
     */
    cursor?: urunlerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` urunlers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` urunlers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of urunlers.
     */
    distinct?: UrunlerScalarFieldEnum | UrunlerScalarFieldEnum[]
  }

  /**
   * urunler findMany
   */
  export type urunlerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * Filter, which urunlers to fetch.
     */
    where?: urunlerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of urunlers to fetch.
     */
    orderBy?: urunlerOrderByWithRelationInput | urunlerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing urunlers.
     */
    cursor?: urunlerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` urunlers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` urunlers.
     */
    skip?: number
    distinct?: UrunlerScalarFieldEnum | UrunlerScalarFieldEnum[]
  }

  /**
   * urunler create
   */
  export type urunlerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * The data needed to create a urunler.
     */
    data: XOR<urunlerCreateInput, urunlerUncheckedCreateInput>
  }

  /**
   * urunler createMany
   */
  export type urunlerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many urunlers.
     */
    data: urunlerCreateManyInput | urunlerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * urunler createManyAndReturn
   */
  export type urunlerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * The data used to create many urunlers.
     */
    data: urunlerCreateManyInput | urunlerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * urunler update
   */
  export type urunlerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * The data needed to update a urunler.
     */
    data: XOR<urunlerUpdateInput, urunlerUncheckedUpdateInput>
    /**
     * Choose, which urunler to update.
     */
    where: urunlerWhereUniqueInput
  }

  /**
   * urunler updateMany
   */
  export type urunlerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update urunlers.
     */
    data: XOR<urunlerUpdateManyMutationInput, urunlerUncheckedUpdateManyInput>
    /**
     * Filter which urunlers to update
     */
    where?: urunlerWhereInput
    /**
     * Limit how many urunlers to update.
     */
    limit?: number
  }

  /**
   * urunler updateManyAndReturn
   */
  export type urunlerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * The data used to update urunlers.
     */
    data: XOR<urunlerUpdateManyMutationInput, urunlerUncheckedUpdateManyInput>
    /**
     * Filter which urunlers to update
     */
    where?: urunlerWhereInput
    /**
     * Limit how many urunlers to update.
     */
    limit?: number
  }

  /**
   * urunler upsert
   */
  export type urunlerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * The filter to search for the urunler to update in case it exists.
     */
    where: urunlerWhereUniqueInput
    /**
     * In case the urunler found by the `where` argument doesn't exist, create a new urunler with this data.
     */
    create: XOR<urunlerCreateInput, urunlerUncheckedCreateInput>
    /**
     * In case the urunler was found with the provided `where` argument, update it with this data.
     */
    update: XOR<urunlerUpdateInput, urunlerUncheckedUpdateInput>
  }

  /**
   * urunler delete
   */
  export type urunlerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
    /**
     * Filter which urunler to delete.
     */
    where: urunlerWhereUniqueInput
  }

  /**
   * urunler deleteMany
   */
  export type urunlerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which urunlers to delete
     */
    where?: urunlerWhereInput
    /**
     * Limit how many urunlers to delete.
     */
    limit?: number
  }

  /**
   * urunler.mal_kabul_records
   */
  export type urunler$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * urunler without action
   */
  export type urunlerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the urunler
     */
    select?: urunlerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the urunler
     */
    omit?: urunlerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: urunlerInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    createdAt: Date | null
    updatedAt: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mal_kabul_records?: boolean | users$mal_kabul_recordsArgs<ExtArgs>
    faturalar?: boolean | users$faturalarArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mal_kabul_records?: boolean | users$mal_kabul_recordsArgs<ExtArgs>
    faturalar?: boolean | users$faturalarArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      mal_kabul_records: Prisma.$mal_kabul_recordsPayload<ExtArgs>[]
      faturalar: Prisma.$faturalarPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      password: string
      role: string
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
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
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mal_kabul_records<T extends users$mal_kabul_recordsArgs<ExtArgs> = {}>(args?: Subset<T, users$mal_kabul_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mal_kabul_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    faturalar<T extends users$faturalarArgs<ExtArgs> = {}>(args?: Subset<T, users$faturalarArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$faturalarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly firstName: FieldRef<"users", 'String'>
    readonly lastName: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.mal_kabul_records
   */
  export type users$mal_kabul_recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mal_kabul_records
     */
    select?: mal_kabul_recordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mal_kabul_records
     */
    omit?: mal_kabul_recordsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mal_kabul_recordsInclude<ExtArgs> | null
    where?: mal_kabul_recordsWhereInput
    orderBy?: mal_kabul_recordsOrderByWithRelationInput | mal_kabul_recordsOrderByWithRelationInput[]
    cursor?: mal_kabul_recordsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Mal_kabul_recordsScalarFieldEnum | Mal_kabul_recordsScalarFieldEnum[]
  }

  /**
   * users.faturalar
   */
  export type users$faturalarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faturalar
     */
    select?: faturalarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the faturalar
     */
    omit?: faturalarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: faturalarInclude<ExtArgs> | null
    where?: faturalarWhereInput
    orderBy?: faturalarOrderByWithRelationInput | faturalarOrderByWithRelationInput[]
    cursor?: faturalarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FaturalarScalarFieldEnum | FaturalarScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model malKabulRecords
   */

  export type AggregateMalKabulRecords = {
    _count: MalKabulRecordsCountAggregateOutputType | null
    _avg: MalKabulRecordsAvgAggregateOutputType | null
    _sum: MalKabulRecordsSumAggregateOutputType | null
    _min: MalKabulRecordsMinAggregateOutputType | null
    _max: MalKabulRecordsMaxAggregateOutputType | null
  }

  export type MalKabulRecordsAvgAggregateOutputType = {
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    netKg: number | null
  }

  export type MalKabulRecordsSumAggregateOutputType = {
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    netKg: number | null
  }

  export type MalKabulRecordsMinAggregateOutputType = {
    id: string | null
    fisNo: string | null
    tarih: Date | null
    saticiTipi: string | null
    saticiId: string | null
    urunId: string | null
    ureticiId: string | null
    ambalajId: string | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    netKg: number | null
    urunDurumu: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MalKabulRecordsMaxAggregateOutputType = {
    id: string | null
    fisNo: string | null
    tarih: Date | null
    saticiTipi: string | null
    saticiId: string | null
    urunId: string | null
    ureticiId: string | null
    ambalajId: string | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaKg: number | null
    fireKg: number | null
    netKg: number | null
    urunDurumu: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MalKabulRecordsCountAggregateOutputType = {
    id: number
    fisNo: number
    tarih: number
    saticiTipi: number
    saticiId: number
    urunId: number
    ureticiId: number
    ambalajId: number
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaKg: number
    fireKg: number
    netKg: number
    urunDurumu: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MalKabulRecordsAvgAggregateInputType = {
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    netKg?: true
  }

  export type MalKabulRecordsSumAggregateInputType = {
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    netKg?: true
  }

  export type MalKabulRecordsMinAggregateInputType = {
    id?: true
    fisNo?: true
    tarih?: true
    saticiTipi?: true
    saticiId?: true
    urunId?: true
    ureticiId?: true
    ambalajId?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    netKg?: true
    urunDurumu?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MalKabulRecordsMaxAggregateInputType = {
    id?: true
    fisNo?: true
    tarih?: true
    saticiTipi?: true
    saticiId?: true
    urunId?: true
    ureticiId?: true
    ambalajId?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    netKg?: true
    urunDurumu?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MalKabulRecordsCountAggregateInputType = {
    id?: true
    fisNo?: true
    tarih?: true
    saticiTipi?: true
    saticiId?: true
    urunId?: true
    ureticiId?: true
    ambalajId?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaKg?: true
    fireKg?: true
    netKg?: true
    urunDurumu?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MalKabulRecordsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which malKabulRecords to aggregate.
     */
    where?: malKabulRecordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of malKabulRecords to fetch.
     */
    orderBy?: malKabulRecordsOrderByWithRelationInput | malKabulRecordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: malKabulRecordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` malKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` malKabulRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned malKabulRecords
    **/
    _count?: true | MalKabulRecordsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MalKabulRecordsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MalKabulRecordsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MalKabulRecordsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MalKabulRecordsMaxAggregateInputType
  }

  export type GetMalKabulRecordsAggregateType<T extends MalKabulRecordsAggregateArgs> = {
        [P in keyof T & keyof AggregateMalKabulRecords]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMalKabulRecords[P]>
      : GetScalarType<T[P], AggregateMalKabulRecords[P]>
  }




  export type malKabulRecordsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: malKabulRecordsWhereInput
    orderBy?: malKabulRecordsOrderByWithAggregationInput | malKabulRecordsOrderByWithAggregationInput[]
    by: MalKabulRecordsScalarFieldEnum[] | MalKabulRecordsScalarFieldEnum
    having?: malKabulRecordsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MalKabulRecordsCountAggregateInputType | true
    _avg?: MalKabulRecordsAvgAggregateInputType
    _sum?: MalKabulRecordsSumAggregateInputType
    _min?: MalKabulRecordsMinAggregateInputType
    _max?: MalKabulRecordsMaxAggregateInputType
  }

  export type MalKabulRecordsGroupByOutputType = {
    id: string
    fisNo: string
    tarih: Date
    saticiTipi: string
    saticiId: string
    urunId: string
    ureticiId: string
    ambalajId: string
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaKg: number
    fireKg: number
    netKg: number
    urunDurumu: string
    userId: string
    createdAt: Date | null
    updatedAt: Date | null
    _count: MalKabulRecordsCountAggregateOutputType | null
    _avg: MalKabulRecordsAvgAggregateOutputType | null
    _sum: MalKabulRecordsSumAggregateOutputType | null
    _min: MalKabulRecordsMinAggregateOutputType | null
    _max: MalKabulRecordsMaxAggregateOutputType | null
  }

  type GetMalKabulRecordsGroupByPayload<T extends malKabulRecordsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MalKabulRecordsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MalKabulRecordsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MalKabulRecordsGroupByOutputType[P]>
            : GetScalarType<T[P], MalKabulRecordsGroupByOutputType[P]>
        }
      >
    >


  export type malKabulRecordsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fisNo?: boolean
    tarih?: boolean
    saticiTipi?: boolean
    saticiId?: boolean
    urunId?: boolean
    ureticiId?: boolean
    ambalajId?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    netKg?: boolean
    urunDurumu?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["malKabulRecords"]>

  export type malKabulRecordsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fisNo?: boolean
    tarih?: boolean
    saticiTipi?: boolean
    saticiId?: boolean
    urunId?: boolean
    ureticiId?: boolean
    ambalajId?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    netKg?: boolean
    urunDurumu?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["malKabulRecords"]>

  export type malKabulRecordsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fisNo?: boolean
    tarih?: boolean
    saticiTipi?: boolean
    saticiId?: boolean
    urunId?: boolean
    ureticiId?: boolean
    ambalajId?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    netKg?: boolean
    urunDurumu?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["malKabulRecords"]>

  export type malKabulRecordsSelectScalar = {
    id?: boolean
    fisNo?: boolean
    tarih?: boolean
    saticiTipi?: boolean
    saticiId?: boolean
    urunId?: boolean
    ureticiId?: boolean
    ambalajId?: boolean
    brutKg?: boolean
    daraKg?: boolean
    girisKg?: boolean
    cikmaKg?: boolean
    fireKg?: boolean
    netKg?: boolean
    urunDurumu?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type malKabulRecordsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fisNo" | "tarih" | "saticiTipi" | "saticiId" | "urunId" | "ureticiId" | "ambalajId" | "brutKg" | "daraKg" | "girisKg" | "cikmaKg" | "fireKg" | "netKg" | "urunDurumu" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["malKabulRecords"]>

  export type $malKabulRecordsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "malKabulRecords"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fisNo: string
      tarih: Date
      saticiTipi: string
      saticiId: string
      urunId: string
      ureticiId: string
      ambalajId: string
      brutKg: number
      daraKg: number
      girisKg: number
      cikmaKg: number
      fireKg: number
      netKg: number
      urunDurumu: string
      userId: string
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["malKabulRecords"]>
    composites: {}
  }

  type malKabulRecordsGetPayload<S extends boolean | null | undefined | malKabulRecordsDefaultArgs> = $Result.GetResult<Prisma.$malKabulRecordsPayload, S>

  type malKabulRecordsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<malKabulRecordsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MalKabulRecordsCountAggregateInputType | true
    }

  export interface malKabulRecordsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['malKabulRecords'], meta: { name: 'malKabulRecords' } }
    /**
     * Find zero or one MalKabulRecords that matches the filter.
     * @param {malKabulRecordsFindUniqueArgs} args - Arguments to find a MalKabulRecords
     * @example
     * // Get one MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends malKabulRecordsFindUniqueArgs>(args: SelectSubset<T, malKabulRecordsFindUniqueArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MalKabulRecords that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {malKabulRecordsFindUniqueOrThrowArgs} args - Arguments to find a MalKabulRecords
     * @example
     * // Get one MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends malKabulRecordsFindUniqueOrThrowArgs>(args: SelectSubset<T, malKabulRecordsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MalKabulRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {malKabulRecordsFindFirstArgs} args - Arguments to find a MalKabulRecords
     * @example
     * // Get one MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends malKabulRecordsFindFirstArgs>(args?: SelectSubset<T, malKabulRecordsFindFirstArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MalKabulRecords that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {malKabulRecordsFindFirstOrThrowArgs} args - Arguments to find a MalKabulRecords
     * @example
     * // Get one MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends malKabulRecordsFindFirstOrThrowArgs>(args?: SelectSubset<T, malKabulRecordsFindFirstOrThrowArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MalKabulRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {malKabulRecordsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.findMany()
     * 
     * // Get first 10 MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const malKabulRecordsWithIdOnly = await prisma.malKabulRecords.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends malKabulRecordsFindManyArgs>(args?: SelectSubset<T, malKabulRecordsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MalKabulRecords.
     * @param {malKabulRecordsCreateArgs} args - Arguments to create a MalKabulRecords.
     * @example
     * // Create one MalKabulRecords
     * const MalKabulRecords = await prisma.malKabulRecords.create({
     *   data: {
     *     // ... data to create a MalKabulRecords
     *   }
     * })
     * 
     */
    create<T extends malKabulRecordsCreateArgs>(args: SelectSubset<T, malKabulRecordsCreateArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MalKabulRecords.
     * @param {malKabulRecordsCreateManyArgs} args - Arguments to create many MalKabulRecords.
     * @example
     * // Create many MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends malKabulRecordsCreateManyArgs>(args?: SelectSubset<T, malKabulRecordsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MalKabulRecords and returns the data saved in the database.
     * @param {malKabulRecordsCreateManyAndReturnArgs} args - Arguments to create many MalKabulRecords.
     * @example
     * // Create many MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MalKabulRecords and only return the `id`
     * const malKabulRecordsWithIdOnly = await prisma.malKabulRecords.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends malKabulRecordsCreateManyAndReturnArgs>(args?: SelectSubset<T, malKabulRecordsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MalKabulRecords.
     * @param {malKabulRecordsDeleteArgs} args - Arguments to delete one MalKabulRecords.
     * @example
     * // Delete one MalKabulRecords
     * const MalKabulRecords = await prisma.malKabulRecords.delete({
     *   where: {
     *     // ... filter to delete one MalKabulRecords
     *   }
     * })
     * 
     */
    delete<T extends malKabulRecordsDeleteArgs>(args: SelectSubset<T, malKabulRecordsDeleteArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MalKabulRecords.
     * @param {malKabulRecordsUpdateArgs} args - Arguments to update one MalKabulRecords.
     * @example
     * // Update one MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends malKabulRecordsUpdateArgs>(args: SelectSubset<T, malKabulRecordsUpdateArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MalKabulRecords.
     * @param {malKabulRecordsDeleteManyArgs} args - Arguments to filter MalKabulRecords to delete.
     * @example
     * // Delete a few MalKabulRecords
     * const { count } = await prisma.malKabulRecords.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends malKabulRecordsDeleteManyArgs>(args?: SelectSubset<T, malKabulRecordsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MalKabulRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {malKabulRecordsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends malKabulRecordsUpdateManyArgs>(args: SelectSubset<T, malKabulRecordsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MalKabulRecords and returns the data updated in the database.
     * @param {malKabulRecordsUpdateManyAndReturnArgs} args - Arguments to update many MalKabulRecords.
     * @example
     * // Update many MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MalKabulRecords and only return the `id`
     * const malKabulRecordsWithIdOnly = await prisma.malKabulRecords.updateManyAndReturn({
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
    updateManyAndReturn<T extends malKabulRecordsUpdateManyAndReturnArgs>(args: SelectSubset<T, malKabulRecordsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MalKabulRecords.
     * @param {malKabulRecordsUpsertArgs} args - Arguments to update or create a MalKabulRecords.
     * @example
     * // Update or create a MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecords.upsert({
     *   create: {
     *     // ... data to create a MalKabulRecords
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MalKabulRecords we want to update
     *   }
     * })
     */
    upsert<T extends malKabulRecordsUpsertArgs>(args: SelectSubset<T, malKabulRecordsUpsertArgs<ExtArgs>>): Prisma__malKabulRecordsClient<$Result.GetResult<Prisma.$malKabulRecordsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MalKabulRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {malKabulRecordsCountArgs} args - Arguments to filter MalKabulRecords to count.
     * @example
     * // Count the number of MalKabulRecords
     * const count = await prisma.malKabulRecords.count({
     *   where: {
     *     // ... the filter for the MalKabulRecords we want to count
     *   }
     * })
    **/
    count<T extends malKabulRecordsCountArgs>(
      args?: Subset<T, malKabulRecordsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MalKabulRecordsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MalKabulRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MalKabulRecordsAggregateArgs>(args: Subset<T, MalKabulRecordsAggregateArgs>): Prisma.PrismaPromise<GetMalKabulRecordsAggregateType<T>>

    /**
     * Group by MalKabulRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {malKabulRecordsGroupByArgs} args - Group by arguments.
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
      T extends malKabulRecordsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: malKabulRecordsGroupByArgs['orderBy'] }
        : { orderBy?: malKabulRecordsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, malKabulRecordsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMalKabulRecordsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the malKabulRecords model
   */
  readonly fields: malKabulRecordsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for malKabulRecords.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__malKabulRecordsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the malKabulRecords model
   */
  interface malKabulRecordsFieldRefs {
    readonly id: FieldRef<"malKabulRecords", 'String'>
    readonly fisNo: FieldRef<"malKabulRecords", 'String'>
    readonly tarih: FieldRef<"malKabulRecords", 'DateTime'>
    readonly saticiTipi: FieldRef<"malKabulRecords", 'String'>
    readonly saticiId: FieldRef<"malKabulRecords", 'String'>
    readonly urunId: FieldRef<"malKabulRecords", 'String'>
    readonly ureticiId: FieldRef<"malKabulRecords", 'String'>
    readonly ambalajId: FieldRef<"malKabulRecords", 'String'>
    readonly brutKg: FieldRef<"malKabulRecords", 'Float'>
    readonly daraKg: FieldRef<"malKabulRecords", 'Float'>
    readonly girisKg: FieldRef<"malKabulRecords", 'Float'>
    readonly cikmaKg: FieldRef<"malKabulRecords", 'Float'>
    readonly fireKg: FieldRef<"malKabulRecords", 'Float'>
    readonly netKg: FieldRef<"malKabulRecords", 'Float'>
    readonly urunDurumu: FieldRef<"malKabulRecords", 'String'>
    readonly userId: FieldRef<"malKabulRecords", 'String'>
    readonly createdAt: FieldRef<"malKabulRecords", 'DateTime'>
    readonly updatedAt: FieldRef<"malKabulRecords", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * malKabulRecords findUnique
   */
  export type malKabulRecordsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * Filter, which malKabulRecords to fetch.
     */
    where: malKabulRecordsWhereUniqueInput
  }

  /**
   * malKabulRecords findUniqueOrThrow
   */
  export type malKabulRecordsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * Filter, which malKabulRecords to fetch.
     */
    where: malKabulRecordsWhereUniqueInput
  }

  /**
   * malKabulRecords findFirst
   */
  export type malKabulRecordsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * Filter, which malKabulRecords to fetch.
     */
    where?: malKabulRecordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of malKabulRecords to fetch.
     */
    orderBy?: malKabulRecordsOrderByWithRelationInput | malKabulRecordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for malKabulRecords.
     */
    cursor?: malKabulRecordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` malKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` malKabulRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of malKabulRecords.
     */
    distinct?: MalKabulRecordsScalarFieldEnum | MalKabulRecordsScalarFieldEnum[]
  }

  /**
   * malKabulRecords findFirstOrThrow
   */
  export type malKabulRecordsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * Filter, which malKabulRecords to fetch.
     */
    where?: malKabulRecordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of malKabulRecords to fetch.
     */
    orderBy?: malKabulRecordsOrderByWithRelationInput | malKabulRecordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for malKabulRecords.
     */
    cursor?: malKabulRecordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` malKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` malKabulRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of malKabulRecords.
     */
    distinct?: MalKabulRecordsScalarFieldEnum | MalKabulRecordsScalarFieldEnum[]
  }

  /**
   * malKabulRecords findMany
   */
  export type malKabulRecordsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * Filter, which malKabulRecords to fetch.
     */
    where?: malKabulRecordsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of malKabulRecords to fetch.
     */
    orderBy?: malKabulRecordsOrderByWithRelationInput | malKabulRecordsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing malKabulRecords.
     */
    cursor?: malKabulRecordsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` malKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` malKabulRecords.
     */
    skip?: number
    distinct?: MalKabulRecordsScalarFieldEnum | MalKabulRecordsScalarFieldEnum[]
  }

  /**
   * malKabulRecords create
   */
  export type malKabulRecordsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * The data needed to create a malKabulRecords.
     */
    data: XOR<malKabulRecordsCreateInput, malKabulRecordsUncheckedCreateInput>
  }

  /**
   * malKabulRecords createMany
   */
  export type malKabulRecordsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many malKabulRecords.
     */
    data: malKabulRecordsCreateManyInput | malKabulRecordsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * malKabulRecords createManyAndReturn
   */
  export type malKabulRecordsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * The data used to create many malKabulRecords.
     */
    data: malKabulRecordsCreateManyInput | malKabulRecordsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * malKabulRecords update
   */
  export type malKabulRecordsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * The data needed to update a malKabulRecords.
     */
    data: XOR<malKabulRecordsUpdateInput, malKabulRecordsUncheckedUpdateInput>
    /**
     * Choose, which malKabulRecords to update.
     */
    where: malKabulRecordsWhereUniqueInput
  }

  /**
   * malKabulRecords updateMany
   */
  export type malKabulRecordsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update malKabulRecords.
     */
    data: XOR<malKabulRecordsUpdateManyMutationInput, malKabulRecordsUncheckedUpdateManyInput>
    /**
     * Filter which malKabulRecords to update
     */
    where?: malKabulRecordsWhereInput
    /**
     * Limit how many malKabulRecords to update.
     */
    limit?: number
  }

  /**
   * malKabulRecords updateManyAndReturn
   */
  export type malKabulRecordsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * The data used to update malKabulRecords.
     */
    data: XOR<malKabulRecordsUpdateManyMutationInput, malKabulRecordsUncheckedUpdateManyInput>
    /**
     * Filter which malKabulRecords to update
     */
    where?: malKabulRecordsWhereInput
    /**
     * Limit how many malKabulRecords to update.
     */
    limit?: number
  }

  /**
   * malKabulRecords upsert
   */
  export type malKabulRecordsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * The filter to search for the malKabulRecords to update in case it exists.
     */
    where: malKabulRecordsWhereUniqueInput
    /**
     * In case the malKabulRecords found by the `where` argument doesn't exist, create a new malKabulRecords with this data.
     */
    create: XOR<malKabulRecordsCreateInput, malKabulRecordsUncheckedCreateInput>
    /**
     * In case the malKabulRecords was found with the provided `where` argument, update it with this data.
     */
    update: XOR<malKabulRecordsUpdateInput, malKabulRecordsUncheckedUpdateInput>
  }

  /**
   * malKabulRecords delete
   */
  export type malKabulRecordsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
    /**
     * Filter which malKabulRecords to delete.
     */
    where: malKabulRecordsWhereUniqueInput
  }

  /**
   * malKabulRecords deleteMany
   */
  export type malKabulRecordsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which malKabulRecords to delete
     */
    where?: malKabulRecordsWhereInput
    /**
     * Limit how many malKabulRecords to delete.
     */
    limit?: number
  }

  /**
   * malKabulRecords without action
   */
  export type malKabulRecordsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the malKabulRecords
     */
    select?: malKabulRecordsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the malKabulRecords
     */
    omit?: malKabulRecordsOmit<ExtArgs> | null
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


  export const AmbalajlarScalarFieldEnum: {
    id: 'id',
    ad: 'ad',
    tipi: 'tipi',
    daraKg: 'daraKg',
    aciklama: 'aciklama',
    durum: 'durum',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AmbalajlarScalarFieldEnum = (typeof AmbalajlarScalarFieldEnum)[keyof typeof AmbalajlarScalarFieldEnum]


  export const FaturalarScalarFieldEnum: {
    id: 'id',
    faturaNo: 'faturaNo',
    tarih: 'tarih',
    toplamTutar: 'toplamTutar',
    kdvOrani: 'kdvOrani',
    kdvTutari: 'kdvTutari',
    genelToplam: 'genelToplam',
    notlar: 'notlar',
    satinAlmaciId: 'satinAlmaciId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FaturalarScalarFieldEnum = (typeof FaturalarScalarFieldEnum)[keyof typeof FaturalarScalarFieldEnum]


  export const KomisyoncularScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    dukkanAdi: 'dukkanAdi',
    durum: 'durum',
    komisyonNo: 'komisyonNo',
    komisyonKodu: 'komisyonKodu',
    sehir: 'sehir',
    vkn: 'vkn',
    yetkiliAdi: 'yetkiliAdi',
    yetkiliTelefon: 'yetkiliTelefon'
  };

  export type KomisyoncularScalarFieldEnum = (typeof KomisyoncularScalarFieldEnum)[keyof typeof KomisyoncularScalarFieldEnum]


  export const Mal_kabul_recordsScalarFieldEnum: {
    id: 'id',
    tarih: 'tarih',
    miktar: 'miktar',
    birimFiyat: 'birimFiyat',
    toplamFiyat: 'toplamFiyat',
    status: 'status',
    notlar: 'notlar',
    malKabulcuId: 'malKabulcuId',
    komisyoncuId: 'komisyoncuId',
    ureticiId: 'ureticiId',
    urunId: 'urunId',
    faturaId: 'faturaId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    fisNo: 'fisNo',
    mustahsilId: 'mustahsilId',
    ozelFirmaId: 'ozelFirmaId',
    saticiTipi: 'saticiTipi',
    ambalajId: 'ambalajId',
    paletSayisi: 'paletSayisi',
    kasaSayisi: 'kasaSayisi',
    brutKg: 'brutKg',
    daraKg: 'daraKg',
    girisKg: 'girisKg',
    cikmaKg: 'cikmaKg',
    fireKg: 'fireKg',
    cikmaFireKg: 'cikmaFireKg',
    netKg: 'netKg'
  };

  export type Mal_kabul_recordsScalarFieldEnum = (typeof Mal_kabul_recordsScalarFieldEnum)[keyof typeof Mal_kabul_recordsScalarFieldEnum]


  export const MustahsilScalarFieldEnum: {
    id: 'id',
    ad: 'ad',
    soyad: 'soyad',
    dogumTarihi: 'dogumTarihi',
    tcKimlikNo: 'tcKimlikNo',
    mustahsilNo: 'mustahsilNo',
    iletisim: 'iletisim',
    bankaAdi: 'bankaAdi',
    ibanAdresi: 'ibanAdresi',
    adres: 'adres',
    cinsiyet: 'cinsiyet',
    durum: 'durum',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MustahsilScalarFieldEnum = (typeof MustahsilScalarFieldEnum)[keyof typeof MustahsilScalarFieldEnum]


  export const Ozel_firmalarScalarFieldEnum: {
    id: 'id',
    firmaAdi: 'firmaAdi',
    firmaNo: 'firmaNo',
    vkn: 'vkn',
    vergiDairesi: 'vergiDairesi',
    yetkiliAdi: 'yetkiliAdi',
    yetkiliTelefon: 'yetkiliTelefon',
    sehir: 'sehir',
    adres: 'adres',
    durum: 'durum',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Ozel_firmalarScalarFieldEnum = (typeof Ozel_firmalarScalarFieldEnum)[keyof typeof Ozel_firmalarScalarFieldEnum]


  export const UreticilerScalarFieldEnum: {
    id: 'id',
    ad: 'ad',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    cinsiyet: 'cinsiyet',
    dogumTarihi: 'dogumTarihi',
    iletisim: 'iletisim',
    komisyoncuId: 'komisyoncuId',
    sehir: 'sehir',
    soyad: 'soyad',
    tcNo: 'tcNo',
    durum: 'durum'
  };

  export type UreticilerScalarFieldEnum = (typeof UreticilerScalarFieldEnum)[keyof typeof UreticilerScalarFieldEnum]


  export const UrunlerScalarFieldEnum: {
    id: 'id',
    ad: 'ad',
    stokKodu: 'stokKodu',
    kategori: 'kategori',
    birim: 'birim',
    durum: 'durum',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UrunlerScalarFieldEnum = (typeof UrunlerScalarFieldEnum)[keyof typeof UrunlerScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const MalKabulRecordsScalarFieldEnum: {
    id: 'id',
    fisNo: 'fisNo',
    tarih: 'tarih',
    saticiTipi: 'saticiTipi',
    saticiId: 'saticiId',
    urunId: 'urunId',
    ureticiId: 'ureticiId',
    ambalajId: 'ambalajId',
    brutKg: 'brutKg',
    daraKg: 'daraKg',
    girisKg: 'girisKg',
    cikmaKg: 'cikmaKg',
    fireKg: 'fireKg',
    netKg: 'netKg',
    urunDurumu: 'urunDurumu',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MalKabulRecordsScalarFieldEnum = (typeof MalKabulRecordsScalarFieldEnum)[keyof typeof MalKabulRecordsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ambalajlarWhereInput = {
    AND?: ambalajlarWhereInput | ambalajlarWhereInput[]
    OR?: ambalajlarWhereInput[]
    NOT?: ambalajlarWhereInput | ambalajlarWhereInput[]
    id?: StringFilter<"ambalajlar"> | string
    ad?: StringFilter<"ambalajlar"> | string
    tipi?: StringFilter<"ambalajlar"> | string
    daraKg?: FloatFilter<"ambalajlar"> | number
    aciklama?: StringNullableFilter<"ambalajlar"> | string | null
    durum?: StringFilter<"ambalajlar"> | string
    createdAt?: DateTimeNullableFilter<"ambalajlar"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"ambalajlar"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }

  export type ambalajlarOrderByWithRelationInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrderInput | SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
  }

  export type ambalajlarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ambalajlarWhereInput | ambalajlarWhereInput[]
    OR?: ambalajlarWhereInput[]
    NOT?: ambalajlarWhereInput | ambalajlarWhereInput[]
    ad?: StringFilter<"ambalajlar"> | string
    tipi?: StringFilter<"ambalajlar"> | string
    daraKg?: FloatFilter<"ambalajlar"> | number
    aciklama?: StringNullableFilter<"ambalajlar"> | string | null
    durum?: StringFilter<"ambalajlar"> | string
    createdAt?: DateTimeNullableFilter<"ambalajlar"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"ambalajlar"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }, "id">

  export type ambalajlarOrderByWithAggregationInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrderInput | SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: ambalajlarCountOrderByAggregateInput
    _avg?: ambalajlarAvgOrderByAggregateInput
    _max?: ambalajlarMaxOrderByAggregateInput
    _min?: ambalajlarMinOrderByAggregateInput
    _sum?: ambalajlarSumOrderByAggregateInput
  }

  export type ambalajlarScalarWhereWithAggregatesInput = {
    AND?: ambalajlarScalarWhereWithAggregatesInput | ambalajlarScalarWhereWithAggregatesInput[]
    OR?: ambalajlarScalarWhereWithAggregatesInput[]
    NOT?: ambalajlarScalarWhereWithAggregatesInput | ambalajlarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ambalajlar"> | string
    ad?: StringWithAggregatesFilter<"ambalajlar"> | string
    tipi?: StringWithAggregatesFilter<"ambalajlar"> | string
    daraKg?: FloatWithAggregatesFilter<"ambalajlar"> | number
    aciklama?: StringNullableWithAggregatesFilter<"ambalajlar"> | string | null
    durum?: StringWithAggregatesFilter<"ambalajlar"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ambalajlar"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"ambalajlar"> | Date | string | null
  }

  export type faturalarWhereInput = {
    AND?: faturalarWhereInput | faturalarWhereInput[]
    OR?: faturalarWhereInput[]
    NOT?: faturalarWhereInput | faturalarWhereInput[]
    id?: StringFilter<"faturalar"> | string
    faturaNo?: StringFilter<"faturalar"> | string
    tarih?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    toplamTutar?: FloatFilter<"faturalar"> | number
    kdvOrani?: FloatNullableFilter<"faturalar"> | number | null
    kdvTutari?: FloatFilter<"faturalar"> | number
    genelToplam?: FloatFilter<"faturalar"> | number
    notlar?: StringNullableFilter<"faturalar"> | string | null
    satinAlmaciId?: StringFilter<"faturalar"> | string
    createdAt?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type faturalarOrderByWithRelationInput = {
    id?: SortOrder
    faturaNo?: SortOrder
    tarih?: SortOrderInput | SortOrder
    toplamTutar?: SortOrder
    kdvOrani?: SortOrderInput | SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
    notlar?: SortOrderInput | SortOrder
    satinAlmaciId?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
  }

  export type faturalarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    faturaNo?: string
    AND?: faturalarWhereInput | faturalarWhereInput[]
    OR?: faturalarWhereInput[]
    NOT?: faturalarWhereInput | faturalarWhereInput[]
    tarih?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    toplamTutar?: FloatFilter<"faturalar"> | number
    kdvOrani?: FloatNullableFilter<"faturalar"> | number | null
    kdvTutari?: FloatFilter<"faturalar"> | number
    genelToplam?: FloatFilter<"faturalar"> | number
    notlar?: StringNullableFilter<"faturalar"> | string | null
    satinAlmaciId?: StringFilter<"faturalar"> | string
    createdAt?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "faturaNo">

  export type faturalarOrderByWithAggregationInput = {
    id?: SortOrder
    faturaNo?: SortOrder
    tarih?: SortOrderInput | SortOrder
    toplamTutar?: SortOrder
    kdvOrani?: SortOrderInput | SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
    notlar?: SortOrderInput | SortOrder
    satinAlmaciId?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: faturalarCountOrderByAggregateInput
    _avg?: faturalarAvgOrderByAggregateInput
    _max?: faturalarMaxOrderByAggregateInput
    _min?: faturalarMinOrderByAggregateInput
    _sum?: faturalarSumOrderByAggregateInput
  }

  export type faturalarScalarWhereWithAggregatesInput = {
    AND?: faturalarScalarWhereWithAggregatesInput | faturalarScalarWhereWithAggregatesInput[]
    OR?: faturalarScalarWhereWithAggregatesInput[]
    NOT?: faturalarScalarWhereWithAggregatesInput | faturalarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"faturalar"> | string
    faturaNo?: StringWithAggregatesFilter<"faturalar"> | string
    tarih?: DateTimeNullableWithAggregatesFilter<"faturalar"> | Date | string | null
    toplamTutar?: FloatWithAggregatesFilter<"faturalar"> | number
    kdvOrani?: FloatNullableWithAggregatesFilter<"faturalar"> | number | null
    kdvTutari?: FloatWithAggregatesFilter<"faturalar"> | number
    genelToplam?: FloatWithAggregatesFilter<"faturalar"> | number
    notlar?: StringNullableWithAggregatesFilter<"faturalar"> | string | null
    satinAlmaciId?: StringWithAggregatesFilter<"faturalar"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"faturalar"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"faturalar"> | Date | string | null
  }

  export type komisyoncularWhereInput = {
    AND?: komisyoncularWhereInput | komisyoncularWhereInput[]
    OR?: komisyoncularWhereInput[]
    NOT?: komisyoncularWhereInput | komisyoncularWhereInput[]
    id?: StringFilter<"komisyoncular"> | string
    createdAt?: DateTimeNullableFilter<"komisyoncular"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"komisyoncular"> | Date | string | null
    dukkanAdi?: StringFilter<"komisyoncular"> | string
    durum?: StringFilter<"komisyoncular"> | string
    komisyonNo?: StringFilter<"komisyoncular"> | string
    komisyonKodu?: StringFilter<"komisyoncular"> | string
    sehir?: StringFilter<"komisyoncular"> | string
    vkn?: StringNullableFilter<"komisyoncular"> | string | null
    yetkiliAdi?: StringNullableFilter<"komisyoncular"> | string | null
    yetkiliTelefon?: StringNullableFilter<"komisyoncular"> | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    ureticiler?: UreticilerListRelationFilter
  }

  export type komisyoncularOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    dukkanAdi?: SortOrder
    durum?: SortOrder
    komisyonNo?: SortOrder
    komisyonKodu?: SortOrder
    sehir?: SortOrder
    vkn?: SortOrderInput | SortOrder
    yetkiliAdi?: SortOrderInput | SortOrder
    yetkiliTelefon?: SortOrderInput | SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
    ureticiler?: ureticilerOrderByRelationAggregateInput
  }

  export type komisyoncularWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    komisyonNo?: string
    komisyonKodu?: string
    AND?: komisyoncularWhereInput | komisyoncularWhereInput[]
    OR?: komisyoncularWhereInput[]
    NOT?: komisyoncularWhereInput | komisyoncularWhereInput[]
    createdAt?: DateTimeNullableFilter<"komisyoncular"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"komisyoncular"> | Date | string | null
    dukkanAdi?: StringFilter<"komisyoncular"> | string
    durum?: StringFilter<"komisyoncular"> | string
    sehir?: StringFilter<"komisyoncular"> | string
    vkn?: StringNullableFilter<"komisyoncular"> | string | null
    yetkiliAdi?: StringNullableFilter<"komisyoncular"> | string | null
    yetkiliTelefon?: StringNullableFilter<"komisyoncular"> | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    ureticiler?: UreticilerListRelationFilter
  }, "id" | "komisyonNo" | "komisyonKodu">

  export type komisyoncularOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    dukkanAdi?: SortOrder
    durum?: SortOrder
    komisyonNo?: SortOrder
    komisyonKodu?: SortOrder
    sehir?: SortOrder
    vkn?: SortOrderInput | SortOrder
    yetkiliAdi?: SortOrderInput | SortOrder
    yetkiliTelefon?: SortOrderInput | SortOrder
    _count?: komisyoncularCountOrderByAggregateInput
    _max?: komisyoncularMaxOrderByAggregateInput
    _min?: komisyoncularMinOrderByAggregateInput
  }

  export type komisyoncularScalarWhereWithAggregatesInput = {
    AND?: komisyoncularScalarWhereWithAggregatesInput | komisyoncularScalarWhereWithAggregatesInput[]
    OR?: komisyoncularScalarWhereWithAggregatesInput[]
    NOT?: komisyoncularScalarWhereWithAggregatesInput | komisyoncularScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"komisyoncular"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"komisyoncular"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"komisyoncular"> | Date | string | null
    dukkanAdi?: StringWithAggregatesFilter<"komisyoncular"> | string
    durum?: StringWithAggregatesFilter<"komisyoncular"> | string
    komisyonNo?: StringWithAggregatesFilter<"komisyoncular"> | string
    komisyonKodu?: StringWithAggregatesFilter<"komisyoncular"> | string
    sehir?: StringWithAggregatesFilter<"komisyoncular"> | string
    vkn?: StringNullableWithAggregatesFilter<"komisyoncular"> | string | null
    yetkiliAdi?: StringNullableWithAggregatesFilter<"komisyoncular"> | string | null
    yetkiliTelefon?: StringNullableWithAggregatesFilter<"komisyoncular"> | string | null
  }

  export type mal_kabul_recordsWhereInput = {
    AND?: mal_kabul_recordsWhereInput | mal_kabul_recordsWhereInput[]
    OR?: mal_kabul_recordsWhereInput[]
    NOT?: mal_kabul_recordsWhereInput | mal_kabul_recordsWhereInput[]
    id?: StringFilter<"mal_kabul_records"> | string
    tarih?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    miktar?: FloatFilter<"mal_kabul_records"> | number
    birimFiyat?: FloatNullableFilter<"mal_kabul_records"> | number | null
    toplamFiyat?: FloatNullableFilter<"mal_kabul_records"> | number | null
    status?: StringFilter<"mal_kabul_records"> | string
    notlar?: StringNullableFilter<"mal_kabul_records"> | string | null
    malKabulcuId?: StringFilter<"mal_kabul_records"> | string
    komisyoncuId?: StringNullableFilter<"mal_kabul_records"> | string | null
    ureticiId?: StringNullableFilter<"mal_kabul_records"> | string | null
    urunId?: StringFilter<"mal_kabul_records"> | string
    faturaId?: StringNullableFilter<"mal_kabul_records"> | string | null
    createdAt?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    fisNo?: StringFilter<"mal_kabul_records"> | string
    mustahsilId?: StringNullableFilter<"mal_kabul_records"> | string | null
    ozelFirmaId?: StringNullableFilter<"mal_kabul_records"> | string | null
    saticiTipi?: StringFilter<"mal_kabul_records"> | string
    ambalajId?: StringNullableFilter<"mal_kabul_records"> | string | null
    paletSayisi?: IntNullableFilter<"mal_kabul_records"> | number | null
    kasaSayisi?: IntNullableFilter<"mal_kabul_records"> | number | null
    brutKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    daraKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    girisKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    cikmaKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    fireKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    cikmaFireKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    netKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    komisyoncular?: XOR<KomisyoncularNullableScalarRelationFilter, komisyoncularWhereInput> | null
    ureticiler?: XOR<UreticilerNullableScalarRelationFilter, ureticilerWhereInput> | null
    urunler?: XOR<UrunlerScalarRelationFilter, urunlerWhereInput>
    faturalar?: XOR<FaturalarNullableScalarRelationFilter, faturalarWhereInput> | null
    mustahsil?: XOR<MustahsilNullableScalarRelationFilter, mustahsilWhereInput> | null
    ozel_firmalar?: XOR<Ozel_firmalarNullableScalarRelationFilter, ozel_firmalarWhereInput> | null
    ambalajlar?: XOR<AmbalajlarNullableScalarRelationFilter, ambalajlarWhereInput> | null
  }

  export type mal_kabul_recordsOrderByWithRelationInput = {
    id?: SortOrder
    tarih?: SortOrderInput | SortOrder
    miktar?: SortOrder
    birimFiyat?: SortOrderInput | SortOrder
    toplamFiyat?: SortOrderInput | SortOrder
    status?: SortOrder
    notlar?: SortOrderInput | SortOrder
    malKabulcuId?: SortOrder
    komisyoncuId?: SortOrderInput | SortOrder
    ureticiId?: SortOrderInput | SortOrder
    urunId?: SortOrder
    faturaId?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    fisNo?: SortOrder
    mustahsilId?: SortOrderInput | SortOrder
    ozelFirmaId?: SortOrderInput | SortOrder
    saticiTipi?: SortOrder
    ambalajId?: SortOrderInput | SortOrder
    paletSayisi?: SortOrderInput | SortOrder
    kasaSayisi?: SortOrderInput | SortOrder
    brutKg?: SortOrderInput | SortOrder
    daraKg?: SortOrderInput | SortOrder
    girisKg?: SortOrderInput | SortOrder
    cikmaKg?: SortOrderInput | SortOrder
    fireKg?: SortOrderInput | SortOrder
    cikmaFireKg?: SortOrderInput | SortOrder
    netKg?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    komisyoncular?: komisyoncularOrderByWithRelationInput
    ureticiler?: ureticilerOrderByWithRelationInput
    urunler?: urunlerOrderByWithRelationInput
    faturalar?: faturalarOrderByWithRelationInput
    mustahsil?: mustahsilOrderByWithRelationInput
    ozel_firmalar?: ozel_firmalarOrderByWithRelationInput
    ambalajlar?: ambalajlarOrderByWithRelationInput
  }

  export type mal_kabul_recordsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fisNo?: string
    AND?: mal_kabul_recordsWhereInput | mal_kabul_recordsWhereInput[]
    OR?: mal_kabul_recordsWhereInput[]
    NOT?: mal_kabul_recordsWhereInput | mal_kabul_recordsWhereInput[]
    tarih?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    miktar?: FloatFilter<"mal_kabul_records"> | number
    birimFiyat?: FloatNullableFilter<"mal_kabul_records"> | number | null
    toplamFiyat?: FloatNullableFilter<"mal_kabul_records"> | number | null
    status?: StringFilter<"mal_kabul_records"> | string
    notlar?: StringNullableFilter<"mal_kabul_records"> | string | null
    malKabulcuId?: StringFilter<"mal_kabul_records"> | string
    komisyoncuId?: StringNullableFilter<"mal_kabul_records"> | string | null
    ureticiId?: StringNullableFilter<"mal_kabul_records"> | string | null
    urunId?: StringFilter<"mal_kabul_records"> | string
    faturaId?: StringNullableFilter<"mal_kabul_records"> | string | null
    createdAt?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    mustahsilId?: StringNullableFilter<"mal_kabul_records"> | string | null
    ozelFirmaId?: StringNullableFilter<"mal_kabul_records"> | string | null
    saticiTipi?: StringFilter<"mal_kabul_records"> | string
    ambalajId?: StringNullableFilter<"mal_kabul_records"> | string | null
    paletSayisi?: IntNullableFilter<"mal_kabul_records"> | number | null
    kasaSayisi?: IntNullableFilter<"mal_kabul_records"> | number | null
    brutKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    daraKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    girisKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    cikmaKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    fireKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    cikmaFireKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    netKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    komisyoncular?: XOR<KomisyoncularNullableScalarRelationFilter, komisyoncularWhereInput> | null
    ureticiler?: XOR<UreticilerNullableScalarRelationFilter, ureticilerWhereInput> | null
    urunler?: XOR<UrunlerScalarRelationFilter, urunlerWhereInput>
    faturalar?: XOR<FaturalarNullableScalarRelationFilter, faturalarWhereInput> | null
    mustahsil?: XOR<MustahsilNullableScalarRelationFilter, mustahsilWhereInput> | null
    ozel_firmalar?: XOR<Ozel_firmalarNullableScalarRelationFilter, ozel_firmalarWhereInput> | null
    ambalajlar?: XOR<AmbalajlarNullableScalarRelationFilter, ambalajlarWhereInput> | null
  }, "id" | "fisNo">

  export type mal_kabul_recordsOrderByWithAggregationInput = {
    id?: SortOrder
    tarih?: SortOrderInput | SortOrder
    miktar?: SortOrder
    birimFiyat?: SortOrderInput | SortOrder
    toplamFiyat?: SortOrderInput | SortOrder
    status?: SortOrder
    notlar?: SortOrderInput | SortOrder
    malKabulcuId?: SortOrder
    komisyoncuId?: SortOrderInput | SortOrder
    ureticiId?: SortOrderInput | SortOrder
    urunId?: SortOrder
    faturaId?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    fisNo?: SortOrder
    mustahsilId?: SortOrderInput | SortOrder
    ozelFirmaId?: SortOrderInput | SortOrder
    saticiTipi?: SortOrder
    ambalajId?: SortOrderInput | SortOrder
    paletSayisi?: SortOrderInput | SortOrder
    kasaSayisi?: SortOrderInput | SortOrder
    brutKg?: SortOrderInput | SortOrder
    daraKg?: SortOrderInput | SortOrder
    girisKg?: SortOrderInput | SortOrder
    cikmaKg?: SortOrderInput | SortOrder
    fireKg?: SortOrderInput | SortOrder
    cikmaFireKg?: SortOrderInput | SortOrder
    netKg?: SortOrderInput | SortOrder
    _count?: mal_kabul_recordsCountOrderByAggregateInput
    _avg?: mal_kabul_recordsAvgOrderByAggregateInput
    _max?: mal_kabul_recordsMaxOrderByAggregateInput
    _min?: mal_kabul_recordsMinOrderByAggregateInput
    _sum?: mal_kabul_recordsSumOrderByAggregateInput
  }

  export type mal_kabul_recordsScalarWhereWithAggregatesInput = {
    AND?: mal_kabul_recordsScalarWhereWithAggregatesInput | mal_kabul_recordsScalarWhereWithAggregatesInput[]
    OR?: mal_kabul_recordsScalarWhereWithAggregatesInput[]
    NOT?: mal_kabul_recordsScalarWhereWithAggregatesInput | mal_kabul_recordsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"mal_kabul_records"> | string
    tarih?: DateTimeNullableWithAggregatesFilter<"mal_kabul_records"> | Date | string | null
    miktar?: FloatWithAggregatesFilter<"mal_kabul_records"> | number
    birimFiyat?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    toplamFiyat?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    status?: StringWithAggregatesFilter<"mal_kabul_records"> | string
    notlar?: StringNullableWithAggregatesFilter<"mal_kabul_records"> | string | null
    malKabulcuId?: StringWithAggregatesFilter<"mal_kabul_records"> | string
    komisyoncuId?: StringNullableWithAggregatesFilter<"mal_kabul_records"> | string | null
    ureticiId?: StringNullableWithAggregatesFilter<"mal_kabul_records"> | string | null
    urunId?: StringWithAggregatesFilter<"mal_kabul_records"> | string
    faturaId?: StringNullableWithAggregatesFilter<"mal_kabul_records"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"mal_kabul_records"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"mal_kabul_records"> | Date | string | null
    fisNo?: StringWithAggregatesFilter<"mal_kabul_records"> | string
    mustahsilId?: StringNullableWithAggregatesFilter<"mal_kabul_records"> | string | null
    ozelFirmaId?: StringNullableWithAggregatesFilter<"mal_kabul_records"> | string | null
    saticiTipi?: StringWithAggregatesFilter<"mal_kabul_records"> | string
    ambalajId?: StringNullableWithAggregatesFilter<"mal_kabul_records"> | string | null
    paletSayisi?: IntNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    kasaSayisi?: IntNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    brutKg?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    daraKg?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    girisKg?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    cikmaKg?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    fireKg?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    cikmaFireKg?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
    netKg?: FloatNullableWithAggregatesFilter<"mal_kabul_records"> | number | null
  }

  export type mustahsilWhereInput = {
    AND?: mustahsilWhereInput | mustahsilWhereInput[]
    OR?: mustahsilWhereInput[]
    NOT?: mustahsilWhereInput | mustahsilWhereInput[]
    id?: StringFilter<"mustahsil"> | string
    ad?: StringFilter<"mustahsil"> | string
    soyad?: StringFilter<"mustahsil"> | string
    dogumTarihi?: DateTimeFilter<"mustahsil"> | Date | string
    tcKimlikNo?: StringFilter<"mustahsil"> | string
    mustahsilNo?: StringFilter<"mustahsil"> | string
    iletisim?: StringNullableFilter<"mustahsil"> | string | null
    bankaAdi?: StringNullableFilter<"mustahsil"> | string | null
    ibanAdresi?: StringNullableFilter<"mustahsil"> | string | null
    adres?: StringNullableFilter<"mustahsil"> | string | null
    cinsiyet?: StringFilter<"mustahsil"> | string
    durum?: StringFilter<"mustahsil"> | string
    createdAt?: DateTimeNullableFilter<"mustahsil"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"mustahsil"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }

  export type mustahsilOrderByWithRelationInput = {
    id?: SortOrder
    ad?: SortOrder
    soyad?: SortOrder
    dogumTarihi?: SortOrder
    tcKimlikNo?: SortOrder
    mustahsilNo?: SortOrder
    iletisim?: SortOrderInput | SortOrder
    bankaAdi?: SortOrderInput | SortOrder
    ibanAdresi?: SortOrderInput | SortOrder
    adres?: SortOrderInput | SortOrder
    cinsiyet?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
  }

  export type mustahsilWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tcKimlikNo?: string
    mustahsilNo?: string
    AND?: mustahsilWhereInput | mustahsilWhereInput[]
    OR?: mustahsilWhereInput[]
    NOT?: mustahsilWhereInput | mustahsilWhereInput[]
    ad?: StringFilter<"mustahsil"> | string
    soyad?: StringFilter<"mustahsil"> | string
    dogumTarihi?: DateTimeFilter<"mustahsil"> | Date | string
    iletisim?: StringNullableFilter<"mustahsil"> | string | null
    bankaAdi?: StringNullableFilter<"mustahsil"> | string | null
    ibanAdresi?: StringNullableFilter<"mustahsil"> | string | null
    adres?: StringNullableFilter<"mustahsil"> | string | null
    cinsiyet?: StringFilter<"mustahsil"> | string
    durum?: StringFilter<"mustahsil"> | string
    createdAt?: DateTimeNullableFilter<"mustahsil"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"mustahsil"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }, "id" | "tcKimlikNo" | "mustahsilNo">

  export type mustahsilOrderByWithAggregationInput = {
    id?: SortOrder
    ad?: SortOrder
    soyad?: SortOrder
    dogumTarihi?: SortOrder
    tcKimlikNo?: SortOrder
    mustahsilNo?: SortOrder
    iletisim?: SortOrderInput | SortOrder
    bankaAdi?: SortOrderInput | SortOrder
    ibanAdresi?: SortOrderInput | SortOrder
    adres?: SortOrderInput | SortOrder
    cinsiyet?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: mustahsilCountOrderByAggregateInput
    _max?: mustahsilMaxOrderByAggregateInput
    _min?: mustahsilMinOrderByAggregateInput
  }

  export type mustahsilScalarWhereWithAggregatesInput = {
    AND?: mustahsilScalarWhereWithAggregatesInput | mustahsilScalarWhereWithAggregatesInput[]
    OR?: mustahsilScalarWhereWithAggregatesInput[]
    NOT?: mustahsilScalarWhereWithAggregatesInput | mustahsilScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"mustahsil"> | string
    ad?: StringWithAggregatesFilter<"mustahsil"> | string
    soyad?: StringWithAggregatesFilter<"mustahsil"> | string
    dogumTarihi?: DateTimeWithAggregatesFilter<"mustahsil"> | Date | string
    tcKimlikNo?: StringWithAggregatesFilter<"mustahsil"> | string
    mustahsilNo?: StringWithAggregatesFilter<"mustahsil"> | string
    iletisim?: StringNullableWithAggregatesFilter<"mustahsil"> | string | null
    bankaAdi?: StringNullableWithAggregatesFilter<"mustahsil"> | string | null
    ibanAdresi?: StringNullableWithAggregatesFilter<"mustahsil"> | string | null
    adres?: StringNullableWithAggregatesFilter<"mustahsil"> | string | null
    cinsiyet?: StringWithAggregatesFilter<"mustahsil"> | string
    durum?: StringWithAggregatesFilter<"mustahsil"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"mustahsil"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"mustahsil"> | Date | string | null
  }

  export type ozel_firmalarWhereInput = {
    AND?: ozel_firmalarWhereInput | ozel_firmalarWhereInput[]
    OR?: ozel_firmalarWhereInput[]
    NOT?: ozel_firmalarWhereInput | ozel_firmalarWhereInput[]
    id?: StringFilter<"ozel_firmalar"> | string
    firmaAdi?: StringFilter<"ozel_firmalar"> | string
    firmaNo?: StringFilter<"ozel_firmalar"> | string
    vkn?: StringNullableFilter<"ozel_firmalar"> | string | null
    vergiDairesi?: StringNullableFilter<"ozel_firmalar"> | string | null
    yetkiliAdi?: StringNullableFilter<"ozel_firmalar"> | string | null
    yetkiliTelefon?: StringNullableFilter<"ozel_firmalar"> | string | null
    sehir?: StringFilter<"ozel_firmalar"> | string
    adres?: StringNullableFilter<"ozel_firmalar"> | string | null
    durum?: StringFilter<"ozel_firmalar"> | string
    createdAt?: DateTimeNullableFilter<"ozel_firmalar"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"ozel_firmalar"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }

  export type ozel_firmalarOrderByWithRelationInput = {
    id?: SortOrder
    firmaAdi?: SortOrder
    firmaNo?: SortOrder
    vkn?: SortOrderInput | SortOrder
    vergiDairesi?: SortOrderInput | SortOrder
    yetkiliAdi?: SortOrderInput | SortOrder
    yetkiliTelefon?: SortOrderInput | SortOrder
    sehir?: SortOrder
    adres?: SortOrderInput | SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
  }

  export type ozel_firmalarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    firmaNo?: string
    AND?: ozel_firmalarWhereInput | ozel_firmalarWhereInput[]
    OR?: ozel_firmalarWhereInput[]
    NOT?: ozel_firmalarWhereInput | ozel_firmalarWhereInput[]
    firmaAdi?: StringFilter<"ozel_firmalar"> | string
    vkn?: StringNullableFilter<"ozel_firmalar"> | string | null
    vergiDairesi?: StringNullableFilter<"ozel_firmalar"> | string | null
    yetkiliAdi?: StringNullableFilter<"ozel_firmalar"> | string | null
    yetkiliTelefon?: StringNullableFilter<"ozel_firmalar"> | string | null
    sehir?: StringFilter<"ozel_firmalar"> | string
    adres?: StringNullableFilter<"ozel_firmalar"> | string | null
    durum?: StringFilter<"ozel_firmalar"> | string
    createdAt?: DateTimeNullableFilter<"ozel_firmalar"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"ozel_firmalar"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }, "id" | "firmaNo">

  export type ozel_firmalarOrderByWithAggregationInput = {
    id?: SortOrder
    firmaAdi?: SortOrder
    firmaNo?: SortOrder
    vkn?: SortOrderInput | SortOrder
    vergiDairesi?: SortOrderInput | SortOrder
    yetkiliAdi?: SortOrderInput | SortOrder
    yetkiliTelefon?: SortOrderInput | SortOrder
    sehir?: SortOrder
    adres?: SortOrderInput | SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: ozel_firmalarCountOrderByAggregateInput
    _max?: ozel_firmalarMaxOrderByAggregateInput
    _min?: ozel_firmalarMinOrderByAggregateInput
  }

  export type ozel_firmalarScalarWhereWithAggregatesInput = {
    AND?: ozel_firmalarScalarWhereWithAggregatesInput | ozel_firmalarScalarWhereWithAggregatesInput[]
    OR?: ozel_firmalarScalarWhereWithAggregatesInput[]
    NOT?: ozel_firmalarScalarWhereWithAggregatesInput | ozel_firmalarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ozel_firmalar"> | string
    firmaAdi?: StringWithAggregatesFilter<"ozel_firmalar"> | string
    firmaNo?: StringWithAggregatesFilter<"ozel_firmalar"> | string
    vkn?: StringNullableWithAggregatesFilter<"ozel_firmalar"> | string | null
    vergiDairesi?: StringNullableWithAggregatesFilter<"ozel_firmalar"> | string | null
    yetkiliAdi?: StringNullableWithAggregatesFilter<"ozel_firmalar"> | string | null
    yetkiliTelefon?: StringNullableWithAggregatesFilter<"ozel_firmalar"> | string | null
    sehir?: StringWithAggregatesFilter<"ozel_firmalar"> | string
    adres?: StringNullableWithAggregatesFilter<"ozel_firmalar"> | string | null
    durum?: StringWithAggregatesFilter<"ozel_firmalar"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ozel_firmalar"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"ozel_firmalar"> | Date | string | null
  }

  export type ureticilerWhereInput = {
    AND?: ureticilerWhereInput | ureticilerWhereInput[]
    OR?: ureticilerWhereInput[]
    NOT?: ureticilerWhereInput | ureticilerWhereInput[]
    id?: StringFilter<"ureticiler"> | string
    ad?: StringFilter<"ureticiler"> | string
    createdAt?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    cinsiyet?: StringFilter<"ureticiler"> | string
    dogumTarihi?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    iletisim?: StringNullableFilter<"ureticiler"> | string | null
    komisyoncuId?: StringNullableFilter<"ureticiler"> | string | null
    sehir?: StringFilter<"ureticiler"> | string
    soyad?: StringFilter<"ureticiler"> | string
    tcNo?: StringNullableFilter<"ureticiler"> | string | null
    durum?: StringFilter<"ureticiler"> | string
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    komisyoncular?: XOR<KomisyoncularNullableScalarRelationFilter, komisyoncularWhereInput> | null
  }

  export type ureticilerOrderByWithRelationInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrderInput | SortOrder
    iletisim?: SortOrderInput | SortOrder
    komisyoncuId?: SortOrderInput | SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrderInput | SortOrder
    durum?: SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
    komisyoncular?: komisyoncularOrderByWithRelationInput
  }

  export type ureticilerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ureticilerWhereInput | ureticilerWhereInput[]
    OR?: ureticilerWhereInput[]
    NOT?: ureticilerWhereInput | ureticilerWhereInput[]
    ad?: StringFilter<"ureticiler"> | string
    createdAt?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    cinsiyet?: StringFilter<"ureticiler"> | string
    dogumTarihi?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    iletisim?: StringNullableFilter<"ureticiler"> | string | null
    komisyoncuId?: StringNullableFilter<"ureticiler"> | string | null
    sehir?: StringFilter<"ureticiler"> | string
    soyad?: StringFilter<"ureticiler"> | string
    tcNo?: StringNullableFilter<"ureticiler"> | string | null
    durum?: StringFilter<"ureticiler"> | string
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    komisyoncular?: XOR<KomisyoncularNullableScalarRelationFilter, komisyoncularWhereInput> | null
  }, "id">

  export type ureticilerOrderByWithAggregationInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrderInput | SortOrder
    iletisim?: SortOrderInput | SortOrder
    komisyoncuId?: SortOrderInput | SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrderInput | SortOrder
    durum?: SortOrder
    _count?: ureticilerCountOrderByAggregateInput
    _max?: ureticilerMaxOrderByAggregateInput
    _min?: ureticilerMinOrderByAggregateInput
  }

  export type ureticilerScalarWhereWithAggregatesInput = {
    AND?: ureticilerScalarWhereWithAggregatesInput | ureticilerScalarWhereWithAggregatesInput[]
    OR?: ureticilerScalarWhereWithAggregatesInput[]
    NOT?: ureticilerScalarWhereWithAggregatesInput | ureticilerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ureticiler"> | string
    ad?: StringWithAggregatesFilter<"ureticiler"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ureticiler"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"ureticiler"> | Date | string | null
    cinsiyet?: StringWithAggregatesFilter<"ureticiler"> | string
    dogumTarihi?: DateTimeNullableWithAggregatesFilter<"ureticiler"> | Date | string | null
    iletisim?: StringNullableWithAggregatesFilter<"ureticiler"> | string | null
    komisyoncuId?: StringNullableWithAggregatesFilter<"ureticiler"> | string | null
    sehir?: StringWithAggregatesFilter<"ureticiler"> | string
    soyad?: StringWithAggregatesFilter<"ureticiler"> | string
    tcNo?: StringNullableWithAggregatesFilter<"ureticiler"> | string | null
    durum?: StringWithAggregatesFilter<"ureticiler"> | string
  }

  export type urunlerWhereInput = {
    AND?: urunlerWhereInput | urunlerWhereInput[]
    OR?: urunlerWhereInput[]
    NOT?: urunlerWhereInput | urunlerWhereInput[]
    id?: StringFilter<"urunler"> | string
    ad?: StringFilter<"urunler"> | string
    stokKodu?: StringFilter<"urunler"> | string
    kategori?: StringNullableFilter<"urunler"> | string | null
    birim?: StringFilter<"urunler"> | string
    durum?: StringFilter<"urunler"> | string
    createdAt?: DateTimeNullableFilter<"urunler"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"urunler"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }

  export type urunlerOrderByWithRelationInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrderInput | SortOrder
    birim?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
  }

  export type urunlerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stokKodu?: string
    AND?: urunlerWhereInput | urunlerWhereInput[]
    OR?: urunlerWhereInput[]
    NOT?: urunlerWhereInput | urunlerWhereInput[]
    ad?: StringFilter<"urunler"> | string
    kategori?: StringNullableFilter<"urunler"> | string | null
    birim?: StringFilter<"urunler"> | string
    durum?: StringFilter<"urunler"> | string
    createdAt?: DateTimeNullableFilter<"urunler"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"urunler"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
  }, "id" | "stokKodu">

  export type urunlerOrderByWithAggregationInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrderInput | SortOrder
    birim?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: urunlerCountOrderByAggregateInput
    _max?: urunlerMaxOrderByAggregateInput
    _min?: urunlerMinOrderByAggregateInput
  }

  export type urunlerScalarWhereWithAggregatesInput = {
    AND?: urunlerScalarWhereWithAggregatesInput | urunlerScalarWhereWithAggregatesInput[]
    OR?: urunlerScalarWhereWithAggregatesInput[]
    NOT?: urunlerScalarWhereWithAggregatesInput | urunlerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"urunler"> | string
    ad?: StringWithAggregatesFilter<"urunler"> | string
    stokKodu?: StringWithAggregatesFilter<"urunler"> | string
    kategori?: StringNullableWithAggregatesFilter<"urunler"> | string | null
    birim?: StringWithAggregatesFilter<"urunler"> | string
    durum?: StringWithAggregatesFilter<"urunler"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"urunler"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"urunler"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    firstName?: StringFilter<"users"> | string
    lastName?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: StringFilter<"users"> | string
    createdAt?: DateTimeNullableFilter<"users"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    faturalar?: FaturalarListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    mal_kabul_records?: mal_kabul_recordsOrderByRelationAggregateInput
    faturalar?: faturalarOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    firstName?: StringFilter<"users"> | string
    lastName?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: StringFilter<"users"> | string
    createdAt?: DateTimeNullableFilter<"users"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    mal_kabul_records?: Mal_kabul_recordsListRelationFilter
    faturalar?: FaturalarListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    firstName?: StringWithAggregatesFilter<"users"> | string
    lastName?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    role?: StringWithAggregatesFilter<"users"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type malKabulRecordsWhereInput = {
    AND?: malKabulRecordsWhereInput | malKabulRecordsWhereInput[]
    OR?: malKabulRecordsWhereInput[]
    NOT?: malKabulRecordsWhereInput | malKabulRecordsWhereInput[]
    id?: StringFilter<"malKabulRecords"> | string
    fisNo?: StringFilter<"malKabulRecords"> | string
    tarih?: DateTimeFilter<"malKabulRecords"> | Date | string
    saticiTipi?: StringFilter<"malKabulRecords"> | string
    saticiId?: StringFilter<"malKabulRecords"> | string
    urunId?: StringFilter<"malKabulRecords"> | string
    ureticiId?: StringFilter<"malKabulRecords"> | string
    ambalajId?: StringFilter<"malKabulRecords"> | string
    brutKg?: FloatFilter<"malKabulRecords"> | number
    daraKg?: FloatFilter<"malKabulRecords"> | number
    girisKg?: FloatFilter<"malKabulRecords"> | number
    cikmaKg?: FloatFilter<"malKabulRecords"> | number
    fireKg?: FloatFilter<"malKabulRecords"> | number
    netKg?: FloatFilter<"malKabulRecords"> | number
    urunDurumu?: StringFilter<"malKabulRecords"> | string
    userId?: StringFilter<"malKabulRecords"> | string
    createdAt?: DateTimeNullableFilter<"malKabulRecords"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"malKabulRecords"> | Date | string | null
  }

  export type malKabulRecordsOrderByWithRelationInput = {
    id?: SortOrder
    fisNo?: SortOrder
    tarih?: SortOrder
    saticiTipi?: SortOrder
    saticiId?: SortOrder
    urunId?: SortOrder
    ureticiId?: SortOrder
    ambalajId?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    netKg?: SortOrder
    urunDurumu?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type malKabulRecordsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: malKabulRecordsWhereInput | malKabulRecordsWhereInput[]
    OR?: malKabulRecordsWhereInput[]
    NOT?: malKabulRecordsWhereInput | malKabulRecordsWhereInput[]
    fisNo?: StringFilter<"malKabulRecords"> | string
    tarih?: DateTimeFilter<"malKabulRecords"> | Date | string
    saticiTipi?: StringFilter<"malKabulRecords"> | string
    saticiId?: StringFilter<"malKabulRecords"> | string
    urunId?: StringFilter<"malKabulRecords"> | string
    ureticiId?: StringFilter<"malKabulRecords"> | string
    ambalajId?: StringFilter<"malKabulRecords"> | string
    brutKg?: FloatFilter<"malKabulRecords"> | number
    daraKg?: FloatFilter<"malKabulRecords"> | number
    girisKg?: FloatFilter<"malKabulRecords"> | number
    cikmaKg?: FloatFilter<"malKabulRecords"> | number
    fireKg?: FloatFilter<"malKabulRecords"> | number
    netKg?: FloatFilter<"malKabulRecords"> | number
    urunDurumu?: StringFilter<"malKabulRecords"> | string
    userId?: StringFilter<"malKabulRecords"> | string
    createdAt?: DateTimeNullableFilter<"malKabulRecords"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"malKabulRecords"> | Date | string | null
  }, "id">

  export type malKabulRecordsOrderByWithAggregationInput = {
    id?: SortOrder
    fisNo?: SortOrder
    tarih?: SortOrder
    saticiTipi?: SortOrder
    saticiId?: SortOrder
    urunId?: SortOrder
    ureticiId?: SortOrder
    ambalajId?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    netKg?: SortOrder
    urunDurumu?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: malKabulRecordsCountOrderByAggregateInput
    _avg?: malKabulRecordsAvgOrderByAggregateInput
    _max?: malKabulRecordsMaxOrderByAggregateInput
    _min?: malKabulRecordsMinOrderByAggregateInput
    _sum?: malKabulRecordsSumOrderByAggregateInput
  }

  export type malKabulRecordsScalarWhereWithAggregatesInput = {
    AND?: malKabulRecordsScalarWhereWithAggregatesInput | malKabulRecordsScalarWhereWithAggregatesInput[]
    OR?: malKabulRecordsScalarWhereWithAggregatesInput[]
    NOT?: malKabulRecordsScalarWhereWithAggregatesInput | malKabulRecordsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"malKabulRecords"> | string
    fisNo?: StringWithAggregatesFilter<"malKabulRecords"> | string
    tarih?: DateTimeWithAggregatesFilter<"malKabulRecords"> | Date | string
    saticiTipi?: StringWithAggregatesFilter<"malKabulRecords"> | string
    saticiId?: StringWithAggregatesFilter<"malKabulRecords"> | string
    urunId?: StringWithAggregatesFilter<"malKabulRecords"> | string
    ureticiId?: StringWithAggregatesFilter<"malKabulRecords"> | string
    ambalajId?: StringWithAggregatesFilter<"malKabulRecords"> | string
    brutKg?: FloatWithAggregatesFilter<"malKabulRecords"> | number
    daraKg?: FloatWithAggregatesFilter<"malKabulRecords"> | number
    girisKg?: FloatWithAggregatesFilter<"malKabulRecords"> | number
    cikmaKg?: FloatWithAggregatesFilter<"malKabulRecords"> | number
    fireKg?: FloatWithAggregatesFilter<"malKabulRecords"> | number
    netKg?: FloatWithAggregatesFilter<"malKabulRecords"> | number
    urunDurumu?: StringWithAggregatesFilter<"malKabulRecords"> | string
    userId?: StringWithAggregatesFilter<"malKabulRecords"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"malKabulRecords"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"malKabulRecords"> | Date | string | null
  }

  export type ambalajlarCreateInput = {
    id: string
    ad: string
    tipi: string
    daraKg: number
    aciklama?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutAmbalajlarInput
  }

  export type ambalajlarUncheckedCreateInput = {
    id: string
    ad: string
    tipi: string
    daraKg: number
    aciklama?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutAmbalajlarInput
  }

  export type ambalajlarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: StringFieldUpdateOperationsInput | string
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutAmbalajlarNestedInput
  }

  export type ambalajlarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: StringFieldUpdateOperationsInput | string
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutAmbalajlarNestedInput
  }

  export type ambalajlarCreateManyInput = {
    id: string
    ad: string
    tipi: string
    daraKg: number
    aciklama?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ambalajlarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: StringFieldUpdateOperationsInput | string
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ambalajlarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: StringFieldUpdateOperationsInput | string
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type faturalarCreateInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutFaturalarInput
    users: usersCreateNestedOneWithoutFaturalarInput
  }

  export type faturalarUncheckedCreateInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    satinAlmaciId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutFaturalarInput
  }

  export type faturalarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutFaturalarNestedInput
    users?: usersUpdateOneRequiredWithoutFaturalarNestedInput
  }

  export type faturalarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    satinAlmaciId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutFaturalarNestedInput
  }

  export type faturalarCreateManyInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    satinAlmaciId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type faturalarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type faturalarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    satinAlmaciId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type komisyoncularCreateInput = {
    id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dukkanAdi: string
    durum?: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutKomisyoncularInput
    ureticiler?: ureticilerCreateNestedManyWithoutKomisyoncularInput
  }

  export type komisyoncularUncheckedCreateInput = {
    id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dukkanAdi: string
    durum?: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutKomisyoncularInput
    ureticiler?: ureticilerUncheckedCreateNestedManyWithoutKomisyoncularInput
  }

  export type komisyoncularUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutKomisyoncularNestedInput
    ureticiler?: ureticilerUpdateManyWithoutKomisyoncularNestedInput
  }

  export type komisyoncularUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutKomisyoncularNestedInput
    ureticiler?: ureticilerUncheckedUpdateManyWithoutKomisyoncularNestedInput
  }

  export type komisyoncularCreateManyInput = {
    id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dukkanAdi: string
    durum?: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
  }

  export type komisyoncularUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type komisyoncularUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type mal_kabul_recordsCreateInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsCreateManyInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mustahsilCreateInput = {
    id: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutMustahsilInput
  }

  export type mustahsilUncheckedCreateInput = {
    id: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutMustahsilInput
  }

  export type mustahsilUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: DateTimeFieldUpdateOperationsInput | Date | string
    tcKimlikNo?: StringFieldUpdateOperationsInput | string
    mustahsilNo?: StringFieldUpdateOperationsInput | string
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    bankaAdi?: NullableStringFieldUpdateOperationsInput | string | null
    ibanAdresi?: NullableStringFieldUpdateOperationsInput | string | null
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutMustahsilNestedInput
  }

  export type mustahsilUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: DateTimeFieldUpdateOperationsInput | Date | string
    tcKimlikNo?: StringFieldUpdateOperationsInput | string
    mustahsilNo?: StringFieldUpdateOperationsInput | string
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    bankaAdi?: NullableStringFieldUpdateOperationsInput | string | null
    ibanAdresi?: NullableStringFieldUpdateOperationsInput | string | null
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutMustahsilNestedInput
  }

  export type mustahsilCreateManyInput = {
    id: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type mustahsilUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: DateTimeFieldUpdateOperationsInput | Date | string
    tcKimlikNo?: StringFieldUpdateOperationsInput | string
    mustahsilNo?: StringFieldUpdateOperationsInput | string
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    bankaAdi?: NullableStringFieldUpdateOperationsInput | string | null
    ibanAdresi?: NullableStringFieldUpdateOperationsInput | string | null
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type mustahsilUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: DateTimeFieldUpdateOperationsInput | Date | string
    tcKimlikNo?: StringFieldUpdateOperationsInput | string
    mustahsilNo?: StringFieldUpdateOperationsInput | string
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    bankaAdi?: NullableStringFieldUpdateOperationsInput | string | null
    ibanAdresi?: NullableStringFieldUpdateOperationsInput | string | null
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ozel_firmalarCreateInput = {
    id: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutOzel_firmalarInput
  }

  export type ozel_firmalarUncheckedCreateInput = {
    id: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutOzel_firmalarInput
  }

  export type ozel_firmalarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutOzel_firmalarNestedInput
  }

  export type ozel_firmalarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutOzel_firmalarNestedInput
  }

  export type ozel_firmalarCreateManyInput = {
    id: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ozel_firmalarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ozel_firmalarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ureticilerCreateInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutUreticilerInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutUreticilerInput
  }

  export type ureticilerUncheckedCreateInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    komisyoncuId?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutUreticilerInput
  }

  export type ureticilerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutUreticilerNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutUreticilerNestedInput
  }

  export type ureticilerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutUreticilerNestedInput
  }

  export type ureticilerCreateManyInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    komisyoncuId?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
  }

  export type ureticilerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
  }

  export type ureticilerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
  }

  export type urunlerCreateInput = {
    id: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutUrunlerInput
  }

  export type urunlerUncheckedCreateInput = {
    id: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutUrunlerInput
  }

  export type urunlerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutUrunlerNestedInput
  }

  export type urunlerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutUrunlerNestedInput
  }

  export type urunlerCreateManyInput = {
    id: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type urunlerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type urunlerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutUsersInput
    faturalar?: faturalarCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutUsersInput
    faturalar?: faturalarUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutUsersNestedInput
    faturalar?: faturalarUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutUsersNestedInput
    faturalar?: faturalarUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type malKabulRecordsCreateInput = {
    id: string
    fisNo: string
    tarih: Date | string
    saticiTipi: string
    saticiId: string
    urunId: string
    ureticiId: string
    ambalajId: string
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaKg?: number
    fireKg?: number
    netKg?: number
    urunDurumu?: string
    userId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type malKabulRecordsUncheckedCreateInput = {
    id: string
    fisNo: string
    tarih: Date | string
    saticiTipi: string
    saticiId: string
    urunId: string
    ureticiId: string
    ambalajId: string
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaKg?: number
    fireKg?: number
    netKg?: number
    urunDurumu?: string
    userId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type malKabulRecordsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fisNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    saticiId?: StringFieldUpdateOperationsInput | string
    urunId?: StringFieldUpdateOperationsInput | string
    ureticiId?: StringFieldUpdateOperationsInput | string
    ambalajId?: StringFieldUpdateOperationsInput | string
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaKg?: FloatFieldUpdateOperationsInput | number
    fireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    urunDurumu?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type malKabulRecordsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fisNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    saticiId?: StringFieldUpdateOperationsInput | string
    urunId?: StringFieldUpdateOperationsInput | string
    ureticiId?: StringFieldUpdateOperationsInput | string
    ambalajId?: StringFieldUpdateOperationsInput | string
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaKg?: FloatFieldUpdateOperationsInput | number
    fireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    urunDurumu?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type malKabulRecordsCreateManyInput = {
    id: string
    fisNo: string
    tarih: Date | string
    saticiTipi: string
    saticiId: string
    urunId: string
    ureticiId: string
    ambalajId: string
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaKg?: number
    fireKg?: number
    netKg?: number
    urunDurumu?: string
    userId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type malKabulRecordsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fisNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    saticiId?: StringFieldUpdateOperationsInput | string
    urunId?: StringFieldUpdateOperationsInput | string
    ureticiId?: StringFieldUpdateOperationsInput | string
    ambalajId?: StringFieldUpdateOperationsInput | string
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaKg?: FloatFieldUpdateOperationsInput | number
    fireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    urunDurumu?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type malKabulRecordsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fisNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    saticiId?: StringFieldUpdateOperationsInput | string
    urunId?: StringFieldUpdateOperationsInput | string
    ureticiId?: StringFieldUpdateOperationsInput | string
    ambalajId?: StringFieldUpdateOperationsInput | string
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaKg?: FloatFieldUpdateOperationsInput | number
    fireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    urunDurumu?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type Mal_kabul_recordsListRelationFilter = {
    every?: mal_kabul_recordsWhereInput
    some?: mal_kabul_recordsWhereInput
    none?: mal_kabul_recordsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type mal_kabul_recordsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ambalajlarCountOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ambalajlarAvgOrderByAggregateInput = {
    daraKg?: SortOrder
  }

  export type ambalajlarMaxOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ambalajlarMinOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ambalajlarSumOrderByAggregateInput = {
    daraKg?: SortOrder
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type faturalarCountOrderByAggregateInput = {
    id?: SortOrder
    faturaNo?: SortOrder
    tarih?: SortOrder
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
    notlar?: SortOrder
    satinAlmaciId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type faturalarAvgOrderByAggregateInput = {
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
  }

  export type faturalarMaxOrderByAggregateInput = {
    id?: SortOrder
    faturaNo?: SortOrder
    tarih?: SortOrder
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
    notlar?: SortOrder
    satinAlmaciId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type faturalarMinOrderByAggregateInput = {
    id?: SortOrder
    faturaNo?: SortOrder
    tarih?: SortOrder
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
    notlar?: SortOrder
    satinAlmaciId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type faturalarSumOrderByAggregateInput = {
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UreticilerListRelationFilter = {
    every?: ureticilerWhereInput
    some?: ureticilerWhereInput
    none?: ureticilerWhereInput
  }

  export type ureticilerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type komisyoncularCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dukkanAdi?: SortOrder
    durum?: SortOrder
    komisyonNo?: SortOrder
    komisyonKodu?: SortOrder
    sehir?: SortOrder
    vkn?: SortOrder
    yetkiliAdi?: SortOrder
    yetkiliTelefon?: SortOrder
  }

  export type komisyoncularMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dukkanAdi?: SortOrder
    durum?: SortOrder
    komisyonNo?: SortOrder
    komisyonKodu?: SortOrder
    sehir?: SortOrder
    vkn?: SortOrder
    yetkiliAdi?: SortOrder
    yetkiliTelefon?: SortOrder
  }

  export type komisyoncularMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dukkanAdi?: SortOrder
    durum?: SortOrder
    komisyonNo?: SortOrder
    komisyonKodu?: SortOrder
    sehir?: SortOrder
    vkn?: SortOrder
    yetkiliAdi?: SortOrder
    yetkiliTelefon?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type KomisyoncularNullableScalarRelationFilter = {
    is?: komisyoncularWhereInput | null
    isNot?: komisyoncularWhereInput | null
  }

  export type UreticilerNullableScalarRelationFilter = {
    is?: ureticilerWhereInput | null
    isNot?: ureticilerWhereInput | null
  }

  export type UrunlerScalarRelationFilter = {
    is?: urunlerWhereInput
    isNot?: urunlerWhereInput
  }

  export type FaturalarNullableScalarRelationFilter = {
    is?: faturalarWhereInput | null
    isNot?: faturalarWhereInput | null
  }

  export type MustahsilNullableScalarRelationFilter = {
    is?: mustahsilWhereInput | null
    isNot?: mustahsilWhereInput | null
  }

  export type Ozel_firmalarNullableScalarRelationFilter = {
    is?: ozel_firmalarWhereInput | null
    isNot?: ozel_firmalarWhereInput | null
  }

  export type AmbalajlarNullableScalarRelationFilter = {
    is?: ambalajlarWhereInput | null
    isNot?: ambalajlarWhereInput | null
  }

  export type mal_kabul_recordsCountOrderByAggregateInput = {
    id?: SortOrder
    tarih?: SortOrder
    miktar?: SortOrder
    birimFiyat?: SortOrder
    toplamFiyat?: SortOrder
    status?: SortOrder
    notlar?: SortOrder
    malKabulcuId?: SortOrder
    komisyoncuId?: SortOrder
    ureticiId?: SortOrder
    urunId?: SortOrder
    faturaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fisNo?: SortOrder
    mustahsilId?: SortOrder
    ozelFirmaId?: SortOrder
    saticiTipi?: SortOrder
    ambalajId?: SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type mal_kabul_recordsAvgOrderByAggregateInput = {
    miktar?: SortOrder
    birimFiyat?: SortOrder
    toplamFiyat?: SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type mal_kabul_recordsMaxOrderByAggregateInput = {
    id?: SortOrder
    tarih?: SortOrder
    miktar?: SortOrder
    birimFiyat?: SortOrder
    toplamFiyat?: SortOrder
    status?: SortOrder
    notlar?: SortOrder
    malKabulcuId?: SortOrder
    komisyoncuId?: SortOrder
    ureticiId?: SortOrder
    urunId?: SortOrder
    faturaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fisNo?: SortOrder
    mustahsilId?: SortOrder
    ozelFirmaId?: SortOrder
    saticiTipi?: SortOrder
    ambalajId?: SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type mal_kabul_recordsMinOrderByAggregateInput = {
    id?: SortOrder
    tarih?: SortOrder
    miktar?: SortOrder
    birimFiyat?: SortOrder
    toplamFiyat?: SortOrder
    status?: SortOrder
    notlar?: SortOrder
    malKabulcuId?: SortOrder
    komisyoncuId?: SortOrder
    ureticiId?: SortOrder
    urunId?: SortOrder
    faturaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fisNo?: SortOrder
    mustahsilId?: SortOrder
    ozelFirmaId?: SortOrder
    saticiTipi?: SortOrder
    ambalajId?: SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type mal_kabul_recordsSumOrderByAggregateInput = {
    miktar?: SortOrder
    birimFiyat?: SortOrder
    toplamFiyat?: SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type mustahsilCountOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    soyad?: SortOrder
    dogumTarihi?: SortOrder
    tcKimlikNo?: SortOrder
    mustahsilNo?: SortOrder
    iletisim?: SortOrder
    bankaAdi?: SortOrder
    ibanAdresi?: SortOrder
    adres?: SortOrder
    cinsiyet?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type mustahsilMaxOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    soyad?: SortOrder
    dogumTarihi?: SortOrder
    tcKimlikNo?: SortOrder
    mustahsilNo?: SortOrder
    iletisim?: SortOrder
    bankaAdi?: SortOrder
    ibanAdresi?: SortOrder
    adres?: SortOrder
    cinsiyet?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type mustahsilMinOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    soyad?: SortOrder
    dogumTarihi?: SortOrder
    tcKimlikNo?: SortOrder
    mustahsilNo?: SortOrder
    iletisim?: SortOrder
    bankaAdi?: SortOrder
    ibanAdresi?: SortOrder
    adres?: SortOrder
    cinsiyet?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type ozel_firmalarCountOrderByAggregateInput = {
    id?: SortOrder
    firmaAdi?: SortOrder
    firmaNo?: SortOrder
    vkn?: SortOrder
    vergiDairesi?: SortOrder
    yetkiliAdi?: SortOrder
    yetkiliTelefon?: SortOrder
    sehir?: SortOrder
    adres?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ozel_firmalarMaxOrderByAggregateInput = {
    id?: SortOrder
    firmaAdi?: SortOrder
    firmaNo?: SortOrder
    vkn?: SortOrder
    vergiDairesi?: SortOrder
    yetkiliAdi?: SortOrder
    yetkiliTelefon?: SortOrder
    sehir?: SortOrder
    adres?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ozel_firmalarMinOrderByAggregateInput = {
    id?: SortOrder
    firmaAdi?: SortOrder
    firmaNo?: SortOrder
    vkn?: SortOrder
    vergiDairesi?: SortOrder
    yetkiliAdi?: SortOrder
    yetkiliTelefon?: SortOrder
    sehir?: SortOrder
    adres?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ureticilerCountOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrder
    iletisim?: SortOrder
    komisyoncuId?: SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrder
    durum?: SortOrder
  }

  export type ureticilerMaxOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrder
    iletisim?: SortOrder
    komisyoncuId?: SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrder
    durum?: SortOrder
  }

  export type ureticilerMinOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrder
    iletisim?: SortOrder
    komisyoncuId?: SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrder
    durum?: SortOrder
  }

  export type urunlerCountOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrder
    birim?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type urunlerMaxOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrder
    birim?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type urunlerMinOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrder
    birim?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FaturalarListRelationFilter = {
    every?: faturalarWhereInput
    some?: faturalarWhereInput
    none?: faturalarWhereInput
  }

  export type faturalarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type malKabulRecordsCountOrderByAggregateInput = {
    id?: SortOrder
    fisNo?: SortOrder
    tarih?: SortOrder
    saticiTipi?: SortOrder
    saticiId?: SortOrder
    urunId?: SortOrder
    ureticiId?: SortOrder
    ambalajId?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    netKg?: SortOrder
    urunDurumu?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type malKabulRecordsAvgOrderByAggregateInput = {
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    netKg?: SortOrder
  }

  export type malKabulRecordsMaxOrderByAggregateInput = {
    id?: SortOrder
    fisNo?: SortOrder
    tarih?: SortOrder
    saticiTipi?: SortOrder
    saticiId?: SortOrder
    urunId?: SortOrder
    ureticiId?: SortOrder
    ambalajId?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    netKg?: SortOrder
    urunDurumu?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type malKabulRecordsMinOrderByAggregateInput = {
    id?: SortOrder
    fisNo?: SortOrder
    tarih?: SortOrder
    saticiTipi?: SortOrder
    saticiId?: SortOrder
    urunId?: SortOrder
    ureticiId?: SortOrder
    ambalajId?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    netKg?: SortOrder
    urunDurumu?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type malKabulRecordsSumOrderByAggregateInput = {
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaKg?: SortOrder
    fireKg?: SortOrder
    netKg?: SortOrder
  }

  export type mal_kabul_recordsCreateNestedManyWithoutAmbalajlarInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput> | mal_kabul_recordsCreateWithoutAmbalajlarInput[] | mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput | mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput[]
    createMany?: mal_kabul_recordsCreateManyAmbalajlarInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutAmbalajlarInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput> | mal_kabul_recordsCreateWithoutAmbalajlarInput[] | mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput | mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput[]
    createMany?: mal_kabul_recordsCreateManyAmbalajlarInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
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

  export type mal_kabul_recordsUpdateManyWithoutAmbalajlarNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput> | mal_kabul_recordsCreateWithoutAmbalajlarInput[] | mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput | mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutAmbalajlarInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutAmbalajlarInput[]
    createMany?: mal_kabul_recordsCreateManyAmbalajlarInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutAmbalajlarInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutAmbalajlarInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutAmbalajlarInput | mal_kabul_recordsUpdateManyWithWhereWithoutAmbalajlarInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutAmbalajlarNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput> | mal_kabul_recordsCreateWithoutAmbalajlarInput[] | mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput | mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutAmbalajlarInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutAmbalajlarInput[]
    createMany?: mal_kabul_recordsCreateManyAmbalajlarInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutAmbalajlarInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutAmbalajlarInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutAmbalajlarInput | mal_kabul_recordsUpdateManyWithWhereWithoutAmbalajlarInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsCreateNestedManyWithoutFaturalarInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutFaturalarInput, mal_kabul_recordsUncheckedCreateWithoutFaturalarInput> | mal_kabul_recordsCreateWithoutFaturalarInput[] | mal_kabul_recordsUncheckedCreateWithoutFaturalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutFaturalarInput | mal_kabul_recordsCreateOrConnectWithoutFaturalarInput[]
    createMany?: mal_kabul_recordsCreateManyFaturalarInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutFaturalarInput = {
    create?: XOR<usersCreateWithoutFaturalarInput, usersUncheckedCreateWithoutFaturalarInput>
    connectOrCreate?: usersCreateOrConnectWithoutFaturalarInput
    connect?: usersWhereUniqueInput
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutFaturalarInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutFaturalarInput, mal_kabul_recordsUncheckedCreateWithoutFaturalarInput> | mal_kabul_recordsCreateWithoutFaturalarInput[] | mal_kabul_recordsUncheckedCreateWithoutFaturalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutFaturalarInput | mal_kabul_recordsCreateOrConnectWithoutFaturalarInput[]
    createMany?: mal_kabul_recordsCreateManyFaturalarInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type mal_kabul_recordsUpdateManyWithoutFaturalarNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutFaturalarInput, mal_kabul_recordsUncheckedCreateWithoutFaturalarInput> | mal_kabul_recordsCreateWithoutFaturalarInput[] | mal_kabul_recordsUncheckedCreateWithoutFaturalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutFaturalarInput | mal_kabul_recordsCreateOrConnectWithoutFaturalarInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutFaturalarInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutFaturalarInput[]
    createMany?: mal_kabul_recordsCreateManyFaturalarInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutFaturalarInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutFaturalarInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutFaturalarInput | mal_kabul_recordsUpdateManyWithWhereWithoutFaturalarInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type usersUpdateOneRequiredWithoutFaturalarNestedInput = {
    create?: XOR<usersCreateWithoutFaturalarInput, usersUncheckedCreateWithoutFaturalarInput>
    connectOrCreate?: usersCreateOrConnectWithoutFaturalarInput
    upsert?: usersUpsertWithoutFaturalarInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutFaturalarInput, usersUpdateWithoutFaturalarInput>, usersUncheckedUpdateWithoutFaturalarInput>
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutFaturalarNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutFaturalarInput, mal_kabul_recordsUncheckedCreateWithoutFaturalarInput> | mal_kabul_recordsCreateWithoutFaturalarInput[] | mal_kabul_recordsUncheckedCreateWithoutFaturalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutFaturalarInput | mal_kabul_recordsCreateOrConnectWithoutFaturalarInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutFaturalarInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutFaturalarInput[]
    createMany?: mal_kabul_recordsCreateManyFaturalarInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutFaturalarInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutFaturalarInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutFaturalarInput | mal_kabul_recordsUpdateManyWithWhereWithoutFaturalarInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsCreateNestedManyWithoutKomisyoncularInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput> | mal_kabul_recordsCreateWithoutKomisyoncularInput[] | mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput | mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput[]
    createMany?: mal_kabul_recordsCreateManyKomisyoncularInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type ureticilerCreateNestedManyWithoutKomisyoncularInput = {
    create?: XOR<ureticilerCreateWithoutKomisyoncularInput, ureticilerUncheckedCreateWithoutKomisyoncularInput> | ureticilerCreateWithoutKomisyoncularInput[] | ureticilerUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: ureticilerCreateOrConnectWithoutKomisyoncularInput | ureticilerCreateOrConnectWithoutKomisyoncularInput[]
    createMany?: ureticilerCreateManyKomisyoncularInputEnvelope
    connect?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutKomisyoncularInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput> | mal_kabul_recordsCreateWithoutKomisyoncularInput[] | mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput | mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput[]
    createMany?: mal_kabul_recordsCreateManyKomisyoncularInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type ureticilerUncheckedCreateNestedManyWithoutKomisyoncularInput = {
    create?: XOR<ureticilerCreateWithoutKomisyoncularInput, ureticilerUncheckedCreateWithoutKomisyoncularInput> | ureticilerCreateWithoutKomisyoncularInput[] | ureticilerUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: ureticilerCreateOrConnectWithoutKomisyoncularInput | ureticilerCreateOrConnectWithoutKomisyoncularInput[]
    createMany?: ureticilerCreateManyKomisyoncularInputEnvelope
    connect?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
  }

  export type mal_kabul_recordsUpdateManyWithoutKomisyoncularNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput> | mal_kabul_recordsCreateWithoutKomisyoncularInput[] | mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput | mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutKomisyoncularInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutKomisyoncularInput[]
    createMany?: mal_kabul_recordsCreateManyKomisyoncularInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutKomisyoncularInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutKomisyoncularInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutKomisyoncularInput | mal_kabul_recordsUpdateManyWithWhereWithoutKomisyoncularInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type ureticilerUpdateManyWithoutKomisyoncularNestedInput = {
    create?: XOR<ureticilerCreateWithoutKomisyoncularInput, ureticilerUncheckedCreateWithoutKomisyoncularInput> | ureticilerCreateWithoutKomisyoncularInput[] | ureticilerUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: ureticilerCreateOrConnectWithoutKomisyoncularInput | ureticilerCreateOrConnectWithoutKomisyoncularInput[]
    upsert?: ureticilerUpsertWithWhereUniqueWithoutKomisyoncularInput | ureticilerUpsertWithWhereUniqueWithoutKomisyoncularInput[]
    createMany?: ureticilerCreateManyKomisyoncularInputEnvelope
    set?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    disconnect?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    delete?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    connect?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    update?: ureticilerUpdateWithWhereUniqueWithoutKomisyoncularInput | ureticilerUpdateWithWhereUniqueWithoutKomisyoncularInput[]
    updateMany?: ureticilerUpdateManyWithWhereWithoutKomisyoncularInput | ureticilerUpdateManyWithWhereWithoutKomisyoncularInput[]
    deleteMany?: ureticilerScalarWhereInput | ureticilerScalarWhereInput[]
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutKomisyoncularNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput> | mal_kabul_recordsCreateWithoutKomisyoncularInput[] | mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput | mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutKomisyoncularInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutKomisyoncularInput[]
    createMany?: mal_kabul_recordsCreateManyKomisyoncularInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutKomisyoncularInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutKomisyoncularInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutKomisyoncularInput | mal_kabul_recordsUpdateManyWithWhereWithoutKomisyoncularInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type ureticilerUncheckedUpdateManyWithoutKomisyoncularNestedInput = {
    create?: XOR<ureticilerCreateWithoutKomisyoncularInput, ureticilerUncheckedCreateWithoutKomisyoncularInput> | ureticilerCreateWithoutKomisyoncularInput[] | ureticilerUncheckedCreateWithoutKomisyoncularInput[]
    connectOrCreate?: ureticilerCreateOrConnectWithoutKomisyoncularInput | ureticilerCreateOrConnectWithoutKomisyoncularInput[]
    upsert?: ureticilerUpsertWithWhereUniqueWithoutKomisyoncularInput | ureticilerUpsertWithWhereUniqueWithoutKomisyoncularInput[]
    createMany?: ureticilerCreateManyKomisyoncularInputEnvelope
    set?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    disconnect?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    delete?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    connect?: ureticilerWhereUniqueInput | ureticilerWhereUniqueInput[]
    update?: ureticilerUpdateWithWhereUniqueWithoutKomisyoncularInput | ureticilerUpdateWithWhereUniqueWithoutKomisyoncularInput[]
    updateMany?: ureticilerUpdateManyWithWhereWithoutKomisyoncularInput | ureticilerUpdateManyWithWhereWithoutKomisyoncularInput[]
    deleteMany?: ureticilerScalarWhereInput | ureticilerScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<usersCreateWithoutMal_kabul_recordsInput, usersUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: usersCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: usersWhereUniqueInput
  }

  export type komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<komisyoncularCreateWithoutMal_kabul_recordsInput, komisyoncularUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: komisyoncularCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: komisyoncularWhereUniqueInput
  }

  export type ureticilerCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<ureticilerCreateWithoutMal_kabul_recordsInput, ureticilerUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: ureticilerCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: ureticilerWhereUniqueInput
  }

  export type urunlerCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<urunlerCreateWithoutMal_kabul_recordsInput, urunlerUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: urunlerCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: urunlerWhereUniqueInput
  }

  export type faturalarCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<faturalarCreateWithoutMal_kabul_recordsInput, faturalarUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: faturalarCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: faturalarWhereUniqueInput
  }

  export type mustahsilCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<mustahsilCreateWithoutMal_kabul_recordsInput, mustahsilUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: mustahsilCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: mustahsilWhereUniqueInput
  }

  export type ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<ozel_firmalarCreateWithoutMal_kabul_recordsInput, ozel_firmalarUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: ozel_firmalarCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: ozel_firmalarWhereUniqueInput
  }

  export type ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput = {
    create?: XOR<ambalajlarCreateWithoutMal_kabul_recordsInput, ambalajlarUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: ambalajlarCreateOrConnectWithoutMal_kabul_recordsInput
    connect?: ambalajlarWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<usersCreateWithoutMal_kabul_recordsInput, usersUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: usersCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: usersUpsertWithoutMal_kabul_recordsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutMal_kabul_recordsInput, usersUpdateWithoutMal_kabul_recordsInput>, usersUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<komisyoncularCreateWithoutMal_kabul_recordsInput, komisyoncularUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: komisyoncularCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: komisyoncularUpsertWithoutMal_kabul_recordsInput
    disconnect?: komisyoncularWhereInput | boolean
    delete?: komisyoncularWhereInput | boolean
    connect?: komisyoncularWhereUniqueInput
    update?: XOR<XOR<komisyoncularUpdateToOneWithWhereWithoutMal_kabul_recordsInput, komisyoncularUpdateWithoutMal_kabul_recordsInput>, komisyoncularUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<ureticilerCreateWithoutMal_kabul_recordsInput, ureticilerUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: ureticilerCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: ureticilerUpsertWithoutMal_kabul_recordsInput
    disconnect?: ureticilerWhereInput | boolean
    delete?: ureticilerWhereInput | boolean
    connect?: ureticilerWhereUniqueInput
    update?: XOR<XOR<ureticilerUpdateToOneWithWhereWithoutMal_kabul_recordsInput, ureticilerUpdateWithoutMal_kabul_recordsInput>, ureticilerUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<urunlerCreateWithoutMal_kabul_recordsInput, urunlerUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: urunlerCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: urunlerUpsertWithoutMal_kabul_recordsInput
    connect?: urunlerWhereUniqueInput
    update?: XOR<XOR<urunlerUpdateToOneWithWhereWithoutMal_kabul_recordsInput, urunlerUpdateWithoutMal_kabul_recordsInput>, urunlerUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type faturalarUpdateOneWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<faturalarCreateWithoutMal_kabul_recordsInput, faturalarUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: faturalarCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: faturalarUpsertWithoutMal_kabul_recordsInput
    disconnect?: faturalarWhereInput | boolean
    delete?: faturalarWhereInput | boolean
    connect?: faturalarWhereUniqueInput
    update?: XOR<XOR<faturalarUpdateToOneWithWhereWithoutMal_kabul_recordsInput, faturalarUpdateWithoutMal_kabul_recordsInput>, faturalarUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<mustahsilCreateWithoutMal_kabul_recordsInput, mustahsilUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: mustahsilCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: mustahsilUpsertWithoutMal_kabul_recordsInput
    disconnect?: mustahsilWhereInput | boolean
    delete?: mustahsilWhereInput | boolean
    connect?: mustahsilWhereUniqueInput
    update?: XOR<XOR<mustahsilUpdateToOneWithWhereWithoutMal_kabul_recordsInput, mustahsilUpdateWithoutMal_kabul_recordsInput>, mustahsilUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<ozel_firmalarCreateWithoutMal_kabul_recordsInput, ozel_firmalarUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: ozel_firmalarCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: ozel_firmalarUpsertWithoutMal_kabul_recordsInput
    disconnect?: ozel_firmalarWhereInput | boolean
    delete?: ozel_firmalarWhereInput | boolean
    connect?: ozel_firmalarWhereUniqueInput
    update?: XOR<XOR<ozel_firmalarUpdateToOneWithWhereWithoutMal_kabul_recordsInput, ozel_firmalarUpdateWithoutMal_kabul_recordsInput>, ozel_firmalarUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput = {
    create?: XOR<ambalajlarCreateWithoutMal_kabul_recordsInput, ambalajlarUncheckedCreateWithoutMal_kabul_recordsInput>
    connectOrCreate?: ambalajlarCreateOrConnectWithoutMal_kabul_recordsInput
    upsert?: ambalajlarUpsertWithoutMal_kabul_recordsInput
    disconnect?: ambalajlarWhereInput | boolean
    delete?: ambalajlarWhereInput | boolean
    connect?: ambalajlarWhereUniqueInput
    update?: XOR<XOR<ambalajlarUpdateToOneWithWhereWithoutMal_kabul_recordsInput, ambalajlarUpdateWithoutMal_kabul_recordsInput>, ambalajlarUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type mal_kabul_recordsCreateNestedManyWithoutMustahsilInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutMustahsilInput, mal_kabul_recordsUncheckedCreateWithoutMustahsilInput> | mal_kabul_recordsCreateWithoutMustahsilInput[] | mal_kabul_recordsUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutMustahsilInput | mal_kabul_recordsCreateOrConnectWithoutMustahsilInput[]
    createMany?: mal_kabul_recordsCreateManyMustahsilInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutMustahsilInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutMustahsilInput, mal_kabul_recordsUncheckedCreateWithoutMustahsilInput> | mal_kabul_recordsCreateWithoutMustahsilInput[] | mal_kabul_recordsUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutMustahsilInput | mal_kabul_recordsCreateOrConnectWithoutMustahsilInput[]
    createMany?: mal_kabul_recordsCreateManyMustahsilInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type mal_kabul_recordsUpdateManyWithoutMustahsilNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutMustahsilInput, mal_kabul_recordsUncheckedCreateWithoutMustahsilInput> | mal_kabul_recordsCreateWithoutMustahsilInput[] | mal_kabul_recordsUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutMustahsilInput | mal_kabul_recordsCreateOrConnectWithoutMustahsilInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutMustahsilInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutMustahsilInput[]
    createMany?: mal_kabul_recordsCreateManyMustahsilInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutMustahsilInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutMustahsilInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutMustahsilInput | mal_kabul_recordsUpdateManyWithWhereWithoutMustahsilInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutMustahsilNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutMustahsilInput, mal_kabul_recordsUncheckedCreateWithoutMustahsilInput> | mal_kabul_recordsCreateWithoutMustahsilInput[] | mal_kabul_recordsUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutMustahsilInput | mal_kabul_recordsCreateOrConnectWithoutMustahsilInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutMustahsilInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutMustahsilInput[]
    createMany?: mal_kabul_recordsCreateManyMustahsilInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutMustahsilInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutMustahsilInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutMustahsilInput | mal_kabul_recordsUpdateManyWithWhereWithoutMustahsilInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsCreateNestedManyWithoutOzel_firmalarInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput> | mal_kabul_recordsCreateWithoutOzel_firmalarInput[] | mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput | mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput[]
    createMany?: mal_kabul_recordsCreateManyOzel_firmalarInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutOzel_firmalarInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput> | mal_kabul_recordsCreateWithoutOzel_firmalarInput[] | mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput | mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput[]
    createMany?: mal_kabul_recordsCreateManyOzel_firmalarInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type mal_kabul_recordsUpdateManyWithoutOzel_firmalarNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput> | mal_kabul_recordsCreateWithoutOzel_firmalarInput[] | mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput | mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutOzel_firmalarInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutOzel_firmalarInput[]
    createMany?: mal_kabul_recordsCreateManyOzel_firmalarInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutOzel_firmalarInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutOzel_firmalarInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutOzel_firmalarInput | mal_kabul_recordsUpdateManyWithWhereWithoutOzel_firmalarInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutOzel_firmalarNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput> | mal_kabul_recordsCreateWithoutOzel_firmalarInput[] | mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput | mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutOzel_firmalarInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutOzel_firmalarInput[]
    createMany?: mal_kabul_recordsCreateManyOzel_firmalarInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutOzel_firmalarInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutOzel_firmalarInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutOzel_firmalarInput | mal_kabul_recordsUpdateManyWithWhereWithoutOzel_firmalarInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsCreateNestedManyWithoutUreticilerInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUreticilerInput, mal_kabul_recordsUncheckedCreateWithoutUreticilerInput> | mal_kabul_recordsCreateWithoutUreticilerInput[] | mal_kabul_recordsUncheckedCreateWithoutUreticilerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUreticilerInput | mal_kabul_recordsCreateOrConnectWithoutUreticilerInput[]
    createMany?: mal_kabul_recordsCreateManyUreticilerInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type komisyoncularCreateNestedOneWithoutUreticilerInput = {
    create?: XOR<komisyoncularCreateWithoutUreticilerInput, komisyoncularUncheckedCreateWithoutUreticilerInput>
    connectOrCreate?: komisyoncularCreateOrConnectWithoutUreticilerInput
    connect?: komisyoncularWhereUniqueInput
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutUreticilerInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUreticilerInput, mal_kabul_recordsUncheckedCreateWithoutUreticilerInput> | mal_kabul_recordsCreateWithoutUreticilerInput[] | mal_kabul_recordsUncheckedCreateWithoutUreticilerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUreticilerInput | mal_kabul_recordsCreateOrConnectWithoutUreticilerInput[]
    createMany?: mal_kabul_recordsCreateManyUreticilerInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type mal_kabul_recordsUpdateManyWithoutUreticilerNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUreticilerInput, mal_kabul_recordsUncheckedCreateWithoutUreticilerInput> | mal_kabul_recordsCreateWithoutUreticilerInput[] | mal_kabul_recordsUncheckedCreateWithoutUreticilerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUreticilerInput | mal_kabul_recordsCreateOrConnectWithoutUreticilerInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutUreticilerInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutUreticilerInput[]
    createMany?: mal_kabul_recordsCreateManyUreticilerInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutUreticilerInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutUreticilerInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutUreticilerInput | mal_kabul_recordsUpdateManyWithWhereWithoutUreticilerInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type komisyoncularUpdateOneWithoutUreticilerNestedInput = {
    create?: XOR<komisyoncularCreateWithoutUreticilerInput, komisyoncularUncheckedCreateWithoutUreticilerInput>
    connectOrCreate?: komisyoncularCreateOrConnectWithoutUreticilerInput
    upsert?: komisyoncularUpsertWithoutUreticilerInput
    disconnect?: komisyoncularWhereInput | boolean
    delete?: komisyoncularWhereInput | boolean
    connect?: komisyoncularWhereUniqueInput
    update?: XOR<XOR<komisyoncularUpdateToOneWithWhereWithoutUreticilerInput, komisyoncularUpdateWithoutUreticilerInput>, komisyoncularUncheckedUpdateWithoutUreticilerInput>
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutUreticilerNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUreticilerInput, mal_kabul_recordsUncheckedCreateWithoutUreticilerInput> | mal_kabul_recordsCreateWithoutUreticilerInput[] | mal_kabul_recordsUncheckedCreateWithoutUreticilerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUreticilerInput | mal_kabul_recordsCreateOrConnectWithoutUreticilerInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutUreticilerInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutUreticilerInput[]
    createMany?: mal_kabul_recordsCreateManyUreticilerInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutUreticilerInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutUreticilerInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutUreticilerInput | mal_kabul_recordsUpdateManyWithWhereWithoutUreticilerInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsCreateNestedManyWithoutUrunlerInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUrunlerInput, mal_kabul_recordsUncheckedCreateWithoutUrunlerInput> | mal_kabul_recordsCreateWithoutUrunlerInput[] | mal_kabul_recordsUncheckedCreateWithoutUrunlerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUrunlerInput | mal_kabul_recordsCreateOrConnectWithoutUrunlerInput[]
    createMany?: mal_kabul_recordsCreateManyUrunlerInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutUrunlerInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUrunlerInput, mal_kabul_recordsUncheckedCreateWithoutUrunlerInput> | mal_kabul_recordsCreateWithoutUrunlerInput[] | mal_kabul_recordsUncheckedCreateWithoutUrunlerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUrunlerInput | mal_kabul_recordsCreateOrConnectWithoutUrunlerInput[]
    createMany?: mal_kabul_recordsCreateManyUrunlerInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type mal_kabul_recordsUpdateManyWithoutUrunlerNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUrunlerInput, mal_kabul_recordsUncheckedCreateWithoutUrunlerInput> | mal_kabul_recordsCreateWithoutUrunlerInput[] | mal_kabul_recordsUncheckedCreateWithoutUrunlerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUrunlerInput | mal_kabul_recordsCreateOrConnectWithoutUrunlerInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutUrunlerInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutUrunlerInput[]
    createMany?: mal_kabul_recordsCreateManyUrunlerInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutUrunlerInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutUrunlerInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutUrunlerInput | mal_kabul_recordsUpdateManyWithWhereWithoutUrunlerInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutUrunlerNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUrunlerInput, mal_kabul_recordsUncheckedCreateWithoutUrunlerInput> | mal_kabul_recordsCreateWithoutUrunlerInput[] | mal_kabul_recordsUncheckedCreateWithoutUrunlerInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUrunlerInput | mal_kabul_recordsCreateOrConnectWithoutUrunlerInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutUrunlerInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutUrunlerInput[]
    createMany?: mal_kabul_recordsCreateManyUrunlerInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutUrunlerInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutUrunlerInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutUrunlerInput | mal_kabul_recordsUpdateManyWithWhereWithoutUrunlerInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type mal_kabul_recordsCreateNestedManyWithoutUsersInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUsersInput, mal_kabul_recordsUncheckedCreateWithoutUsersInput> | mal_kabul_recordsCreateWithoutUsersInput[] | mal_kabul_recordsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUsersInput | mal_kabul_recordsCreateOrConnectWithoutUsersInput[]
    createMany?: mal_kabul_recordsCreateManyUsersInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type faturalarCreateNestedManyWithoutUsersInput = {
    create?: XOR<faturalarCreateWithoutUsersInput, faturalarUncheckedCreateWithoutUsersInput> | faturalarCreateWithoutUsersInput[] | faturalarUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: faturalarCreateOrConnectWithoutUsersInput | faturalarCreateOrConnectWithoutUsersInput[]
    createMany?: faturalarCreateManyUsersInputEnvelope
    connect?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
  }

  export type mal_kabul_recordsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUsersInput, mal_kabul_recordsUncheckedCreateWithoutUsersInput> | mal_kabul_recordsCreateWithoutUsersInput[] | mal_kabul_recordsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUsersInput | mal_kabul_recordsCreateOrConnectWithoutUsersInput[]
    createMany?: mal_kabul_recordsCreateManyUsersInputEnvelope
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
  }

  export type faturalarUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<faturalarCreateWithoutUsersInput, faturalarUncheckedCreateWithoutUsersInput> | faturalarCreateWithoutUsersInput[] | faturalarUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: faturalarCreateOrConnectWithoutUsersInput | faturalarCreateOrConnectWithoutUsersInput[]
    createMany?: faturalarCreateManyUsersInputEnvelope
    connect?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
  }

  export type mal_kabul_recordsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUsersInput, mal_kabul_recordsUncheckedCreateWithoutUsersInput> | mal_kabul_recordsCreateWithoutUsersInput[] | mal_kabul_recordsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUsersInput | mal_kabul_recordsCreateOrConnectWithoutUsersInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutUsersInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: mal_kabul_recordsCreateManyUsersInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutUsersInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutUsersInput | mal_kabul_recordsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type faturalarUpdateManyWithoutUsersNestedInput = {
    create?: XOR<faturalarCreateWithoutUsersInput, faturalarUncheckedCreateWithoutUsersInput> | faturalarCreateWithoutUsersInput[] | faturalarUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: faturalarCreateOrConnectWithoutUsersInput | faturalarCreateOrConnectWithoutUsersInput[]
    upsert?: faturalarUpsertWithWhereUniqueWithoutUsersInput | faturalarUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: faturalarCreateManyUsersInputEnvelope
    set?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    disconnect?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    delete?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    connect?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    update?: faturalarUpdateWithWhereUniqueWithoutUsersInput | faturalarUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: faturalarUpdateManyWithWhereWithoutUsersInput | faturalarUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: faturalarScalarWhereInput | faturalarScalarWhereInput[]
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<mal_kabul_recordsCreateWithoutUsersInput, mal_kabul_recordsUncheckedCreateWithoutUsersInput> | mal_kabul_recordsCreateWithoutUsersInput[] | mal_kabul_recordsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: mal_kabul_recordsCreateOrConnectWithoutUsersInput | mal_kabul_recordsCreateOrConnectWithoutUsersInput[]
    upsert?: mal_kabul_recordsUpsertWithWhereUniqueWithoutUsersInput | mal_kabul_recordsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: mal_kabul_recordsCreateManyUsersInputEnvelope
    set?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    disconnect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    delete?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    connect?: mal_kabul_recordsWhereUniqueInput | mal_kabul_recordsWhereUniqueInput[]
    update?: mal_kabul_recordsUpdateWithWhereUniqueWithoutUsersInput | mal_kabul_recordsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: mal_kabul_recordsUpdateManyWithWhereWithoutUsersInput | mal_kabul_recordsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
  }

  export type faturalarUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<faturalarCreateWithoutUsersInput, faturalarUncheckedCreateWithoutUsersInput> | faturalarCreateWithoutUsersInput[] | faturalarUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: faturalarCreateOrConnectWithoutUsersInput | faturalarCreateOrConnectWithoutUsersInput[]
    upsert?: faturalarUpsertWithWhereUniqueWithoutUsersInput | faturalarUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: faturalarCreateManyUsersInputEnvelope
    set?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    disconnect?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    delete?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    connect?: faturalarWhereUniqueInput | faturalarWhereUniqueInput[]
    update?: faturalarUpdateWithWhereUniqueWithoutUsersInput | faturalarUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: faturalarUpdateManyWithWhereWithoutUsersInput | faturalarUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: faturalarScalarWhereInput | faturalarScalarWhereInput[]
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type mal_kabul_recordsCreateWithoutAmbalajlarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutAmbalajlarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput>
  }

  export type mal_kabul_recordsCreateManyAmbalajlarInputEnvelope = {
    data: mal_kabul_recordsCreateManyAmbalajlarInput | mal_kabul_recordsCreateManyAmbalajlarInput[]
    skipDuplicates?: boolean
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutAmbalajlarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedUpdateWithoutAmbalajlarInput>
    create: XOR<mal_kabul_recordsCreateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedCreateWithoutAmbalajlarInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutAmbalajlarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutAmbalajlarInput, mal_kabul_recordsUncheckedUpdateWithoutAmbalajlarInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutAmbalajlarInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutAmbalajlarInput>
  }

  export type mal_kabul_recordsScalarWhereInput = {
    AND?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
    OR?: mal_kabul_recordsScalarWhereInput[]
    NOT?: mal_kabul_recordsScalarWhereInput | mal_kabul_recordsScalarWhereInput[]
    id?: StringFilter<"mal_kabul_records"> | string
    tarih?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    miktar?: FloatFilter<"mal_kabul_records"> | number
    birimFiyat?: FloatNullableFilter<"mal_kabul_records"> | number | null
    toplamFiyat?: FloatNullableFilter<"mal_kabul_records"> | number | null
    status?: StringFilter<"mal_kabul_records"> | string
    notlar?: StringNullableFilter<"mal_kabul_records"> | string | null
    malKabulcuId?: StringFilter<"mal_kabul_records"> | string
    komisyoncuId?: StringNullableFilter<"mal_kabul_records"> | string | null
    ureticiId?: StringNullableFilter<"mal_kabul_records"> | string | null
    urunId?: StringFilter<"mal_kabul_records"> | string
    faturaId?: StringNullableFilter<"mal_kabul_records"> | string | null
    createdAt?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"mal_kabul_records"> | Date | string | null
    fisNo?: StringFilter<"mal_kabul_records"> | string
    mustahsilId?: StringNullableFilter<"mal_kabul_records"> | string | null
    ozelFirmaId?: StringNullableFilter<"mal_kabul_records"> | string | null
    saticiTipi?: StringFilter<"mal_kabul_records"> | string
    ambalajId?: StringNullableFilter<"mal_kabul_records"> | string | null
    paletSayisi?: IntNullableFilter<"mal_kabul_records"> | number | null
    kasaSayisi?: IntNullableFilter<"mal_kabul_records"> | number | null
    brutKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    daraKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    girisKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    cikmaKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    fireKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    cikmaFireKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
    netKg?: FloatNullableFilter<"mal_kabul_records"> | number | null
  }

  export type mal_kabul_recordsCreateWithoutFaturalarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutFaturalarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutFaturalarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutFaturalarInput, mal_kabul_recordsUncheckedCreateWithoutFaturalarInput>
  }

  export type mal_kabul_recordsCreateManyFaturalarInputEnvelope = {
    data: mal_kabul_recordsCreateManyFaturalarInput | mal_kabul_recordsCreateManyFaturalarInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutFaturalarInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutFaturalarInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutFaturalarInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutFaturalarInput, usersUncheckedCreateWithoutFaturalarInput>
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutFaturalarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutFaturalarInput, mal_kabul_recordsUncheckedUpdateWithoutFaturalarInput>
    create: XOR<mal_kabul_recordsCreateWithoutFaturalarInput, mal_kabul_recordsUncheckedCreateWithoutFaturalarInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutFaturalarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutFaturalarInput, mal_kabul_recordsUncheckedUpdateWithoutFaturalarInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutFaturalarInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutFaturalarInput>
  }

  export type usersUpsertWithoutFaturalarInput = {
    update: XOR<usersUpdateWithoutFaturalarInput, usersUncheckedUpdateWithoutFaturalarInput>
    create: XOR<usersCreateWithoutFaturalarInput, usersUncheckedCreateWithoutFaturalarInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutFaturalarInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutFaturalarInput, usersUncheckedUpdateWithoutFaturalarInput>
  }

  export type usersUpdateWithoutFaturalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutFaturalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type mal_kabul_recordsCreateWithoutKomisyoncularInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutKomisyoncularInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput>
  }

  export type mal_kabul_recordsCreateManyKomisyoncularInputEnvelope = {
    data: mal_kabul_recordsCreateManyKomisyoncularInput | mal_kabul_recordsCreateManyKomisyoncularInput[]
    skipDuplicates?: boolean
  }

  export type ureticilerCreateWithoutKomisyoncularInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutUreticilerInput
  }

  export type ureticilerUncheckedCreateWithoutKomisyoncularInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutUreticilerInput
  }

  export type ureticilerCreateOrConnectWithoutKomisyoncularInput = {
    where: ureticilerWhereUniqueInput
    create: XOR<ureticilerCreateWithoutKomisyoncularInput, ureticilerUncheckedCreateWithoutKomisyoncularInput>
  }

  export type ureticilerCreateManyKomisyoncularInputEnvelope = {
    data: ureticilerCreateManyKomisyoncularInput | ureticilerCreateManyKomisyoncularInput[]
    skipDuplicates?: boolean
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutKomisyoncularInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedUpdateWithoutKomisyoncularInput>
    create: XOR<mal_kabul_recordsCreateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedCreateWithoutKomisyoncularInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutKomisyoncularInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutKomisyoncularInput, mal_kabul_recordsUncheckedUpdateWithoutKomisyoncularInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutKomisyoncularInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutKomisyoncularInput>
  }

  export type ureticilerUpsertWithWhereUniqueWithoutKomisyoncularInput = {
    where: ureticilerWhereUniqueInput
    update: XOR<ureticilerUpdateWithoutKomisyoncularInput, ureticilerUncheckedUpdateWithoutKomisyoncularInput>
    create: XOR<ureticilerCreateWithoutKomisyoncularInput, ureticilerUncheckedCreateWithoutKomisyoncularInput>
  }

  export type ureticilerUpdateWithWhereUniqueWithoutKomisyoncularInput = {
    where: ureticilerWhereUniqueInput
    data: XOR<ureticilerUpdateWithoutKomisyoncularInput, ureticilerUncheckedUpdateWithoutKomisyoncularInput>
  }

  export type ureticilerUpdateManyWithWhereWithoutKomisyoncularInput = {
    where: ureticilerScalarWhereInput
    data: XOR<ureticilerUpdateManyMutationInput, ureticilerUncheckedUpdateManyWithoutKomisyoncularInput>
  }

  export type ureticilerScalarWhereInput = {
    AND?: ureticilerScalarWhereInput | ureticilerScalarWhereInput[]
    OR?: ureticilerScalarWhereInput[]
    NOT?: ureticilerScalarWhereInput | ureticilerScalarWhereInput[]
    id?: StringFilter<"ureticiler"> | string
    ad?: StringFilter<"ureticiler"> | string
    createdAt?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    cinsiyet?: StringFilter<"ureticiler"> | string
    dogumTarihi?: DateTimeNullableFilter<"ureticiler"> | Date | string | null
    iletisim?: StringNullableFilter<"ureticiler"> | string | null
    komisyoncuId?: StringNullableFilter<"ureticiler"> | string | null
    sehir?: StringFilter<"ureticiler"> | string
    soyad?: StringFilter<"ureticiler"> | string
    tcNo?: StringNullableFilter<"ureticiler"> | string | null
    durum?: StringFilter<"ureticiler"> | string
  }

  export type usersCreateWithoutMal_kabul_recordsInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    faturalar?: faturalarCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    faturalar?: faturalarUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutMal_kabul_recordsInput, usersUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type komisyoncularCreateWithoutMal_kabul_recordsInput = {
    id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dukkanAdi: string
    durum?: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    ureticiler?: ureticilerCreateNestedManyWithoutKomisyoncularInput
  }

  export type komisyoncularUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dukkanAdi: string
    durum?: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    ureticiler?: ureticilerUncheckedCreateNestedManyWithoutKomisyoncularInput
  }

  export type komisyoncularCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: komisyoncularWhereUniqueInput
    create: XOR<komisyoncularCreateWithoutMal_kabul_recordsInput, komisyoncularUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type ureticilerCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
    komisyoncular?: komisyoncularCreateNestedOneWithoutUreticilerInput
  }

  export type ureticilerUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    komisyoncuId?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
  }

  export type ureticilerCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: ureticilerWhereUniqueInput
    create: XOR<ureticilerCreateWithoutMal_kabul_recordsInput, ureticilerUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type urunlerCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type urunlerUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type urunlerCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: urunlerWhereUniqueInput
    create: XOR<urunlerCreateWithoutMal_kabul_recordsInput, urunlerUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type faturalarCreateWithoutMal_kabul_recordsInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    users: usersCreateNestedOneWithoutFaturalarInput
  }

  export type faturalarUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    satinAlmaciId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type faturalarCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: faturalarWhereUniqueInput
    create: XOR<faturalarCreateWithoutMal_kabul_recordsInput, faturalarUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type mustahsilCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type mustahsilUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: string
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type mustahsilCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: mustahsilWhereUniqueInput
    create: XOR<mustahsilCreateWithoutMal_kabul_recordsInput, mustahsilUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type ozel_firmalarCreateWithoutMal_kabul_recordsInput = {
    id: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ozel_firmalarUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ozel_firmalarCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: ozel_firmalarWhereUniqueInput
    create: XOR<ozel_firmalarCreateWithoutMal_kabul_recordsInput, ozel_firmalarUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type ambalajlarCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    tipi: string
    daraKg: number
    aciklama?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ambalajlarUncheckedCreateWithoutMal_kabul_recordsInput = {
    id: string
    ad: string
    tipi: string
    daraKg: number
    aciklama?: string | null
    durum?: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ambalajlarCreateOrConnectWithoutMal_kabul_recordsInput = {
    where: ambalajlarWhereUniqueInput
    create: XOR<ambalajlarCreateWithoutMal_kabul_recordsInput, ambalajlarUncheckedCreateWithoutMal_kabul_recordsInput>
  }

  export type usersUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<usersUpdateWithoutMal_kabul_recordsInput, usersUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<usersCreateWithoutMal_kabul_recordsInput, usersUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutMal_kabul_recordsInput, usersUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type usersUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faturalar?: faturalarUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faturalar?: faturalarUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type komisyoncularUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<komisyoncularUpdateWithoutMal_kabul_recordsInput, komisyoncularUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<komisyoncularCreateWithoutMal_kabul_recordsInput, komisyoncularUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: komisyoncularWhereInput
  }

  export type komisyoncularUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: komisyoncularWhereInput
    data: XOR<komisyoncularUpdateWithoutMal_kabul_recordsInput, komisyoncularUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type komisyoncularUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiler?: ureticilerUpdateManyWithoutKomisyoncularNestedInput
  }

  export type komisyoncularUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiler?: ureticilerUncheckedUpdateManyWithoutKomisyoncularNestedInput
  }

  export type ureticilerUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<ureticilerUpdateWithoutMal_kabul_recordsInput, ureticilerUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<ureticilerCreateWithoutMal_kabul_recordsInput, ureticilerUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: ureticilerWhereInput
  }

  export type ureticilerUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: ureticilerWhereInput
    data: XOR<ureticilerUpdateWithoutMal_kabul_recordsInput, ureticilerUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type ureticilerUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    komisyoncular?: komisyoncularUpdateOneWithoutUreticilerNestedInput
  }

  export type ureticilerUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
  }

  export type urunlerUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<urunlerUpdateWithoutMal_kabul_recordsInput, urunlerUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<urunlerCreateWithoutMal_kabul_recordsInput, urunlerUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: urunlerWhereInput
  }

  export type urunlerUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: urunlerWhereInput
    data: XOR<urunlerUpdateWithoutMal_kabul_recordsInput, urunlerUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type urunlerUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type urunlerUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type faturalarUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<faturalarUpdateWithoutMal_kabul_recordsInput, faturalarUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<faturalarCreateWithoutMal_kabul_recordsInput, faturalarUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: faturalarWhereInput
  }

  export type faturalarUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: faturalarWhereInput
    data: XOR<faturalarUpdateWithoutMal_kabul_recordsInput, faturalarUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type faturalarUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutFaturalarNestedInput
  }

  export type faturalarUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    satinAlmaciId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type mustahsilUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<mustahsilUpdateWithoutMal_kabul_recordsInput, mustahsilUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<mustahsilCreateWithoutMal_kabul_recordsInput, mustahsilUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: mustahsilWhereInput
  }

  export type mustahsilUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: mustahsilWhereInput
    data: XOR<mustahsilUpdateWithoutMal_kabul_recordsInput, mustahsilUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type mustahsilUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: DateTimeFieldUpdateOperationsInput | Date | string
    tcKimlikNo?: StringFieldUpdateOperationsInput | string
    mustahsilNo?: StringFieldUpdateOperationsInput | string
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    bankaAdi?: NullableStringFieldUpdateOperationsInput | string | null
    ibanAdresi?: NullableStringFieldUpdateOperationsInput | string | null
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type mustahsilUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: DateTimeFieldUpdateOperationsInput | Date | string
    tcKimlikNo?: StringFieldUpdateOperationsInput | string
    mustahsilNo?: StringFieldUpdateOperationsInput | string
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    bankaAdi?: NullableStringFieldUpdateOperationsInput | string | null
    ibanAdresi?: NullableStringFieldUpdateOperationsInput | string | null
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ozel_firmalarUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<ozel_firmalarUpdateWithoutMal_kabul_recordsInput, ozel_firmalarUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<ozel_firmalarCreateWithoutMal_kabul_recordsInput, ozel_firmalarUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: ozel_firmalarWhereInput
  }

  export type ozel_firmalarUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: ozel_firmalarWhereInput
    data: XOR<ozel_firmalarUpdateWithoutMal_kabul_recordsInput, ozel_firmalarUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type ozel_firmalarUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ozel_firmalarUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ambalajlarUpsertWithoutMal_kabul_recordsInput = {
    update: XOR<ambalajlarUpdateWithoutMal_kabul_recordsInput, ambalajlarUncheckedUpdateWithoutMal_kabul_recordsInput>
    create: XOR<ambalajlarCreateWithoutMal_kabul_recordsInput, ambalajlarUncheckedCreateWithoutMal_kabul_recordsInput>
    where?: ambalajlarWhereInput
  }

  export type ambalajlarUpdateToOneWithWhereWithoutMal_kabul_recordsInput = {
    where?: ambalajlarWhereInput
    data: XOR<ambalajlarUpdateWithoutMal_kabul_recordsInput, ambalajlarUncheckedUpdateWithoutMal_kabul_recordsInput>
  }

  export type ambalajlarUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: StringFieldUpdateOperationsInput | string
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ambalajlarUncheckedUpdateWithoutMal_kabul_recordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: StringFieldUpdateOperationsInput | string
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type mal_kabul_recordsCreateWithoutMustahsilInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutMustahsilInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutMustahsilInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutMustahsilInput, mal_kabul_recordsUncheckedCreateWithoutMustahsilInput>
  }

  export type mal_kabul_recordsCreateManyMustahsilInputEnvelope = {
    data: mal_kabul_recordsCreateManyMustahsilInput | mal_kabul_recordsCreateManyMustahsilInput[]
    skipDuplicates?: boolean
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutMustahsilInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutMustahsilInput, mal_kabul_recordsUncheckedUpdateWithoutMustahsilInput>
    create: XOR<mal_kabul_recordsCreateWithoutMustahsilInput, mal_kabul_recordsUncheckedCreateWithoutMustahsilInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutMustahsilInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutMustahsilInput, mal_kabul_recordsUncheckedUpdateWithoutMustahsilInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutMustahsilInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutMustahsilInput>
  }

  export type mal_kabul_recordsCreateWithoutOzel_firmalarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutOzel_firmalarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput>
  }

  export type mal_kabul_recordsCreateManyOzel_firmalarInputEnvelope = {
    data: mal_kabul_recordsCreateManyOzel_firmalarInput | mal_kabul_recordsCreateManyOzel_firmalarInput[]
    skipDuplicates?: boolean
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutOzel_firmalarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedUpdateWithoutOzel_firmalarInput>
    create: XOR<mal_kabul_recordsCreateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedCreateWithoutOzel_firmalarInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutOzel_firmalarInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutOzel_firmalarInput, mal_kabul_recordsUncheckedUpdateWithoutOzel_firmalarInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutOzel_firmalarInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutOzel_firmalarInput>
  }

  export type mal_kabul_recordsCreateWithoutUreticilerInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutUreticilerInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutUreticilerInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutUreticilerInput, mal_kabul_recordsUncheckedCreateWithoutUreticilerInput>
  }

  export type mal_kabul_recordsCreateManyUreticilerInputEnvelope = {
    data: mal_kabul_recordsCreateManyUreticilerInput | mal_kabul_recordsCreateManyUreticilerInput[]
    skipDuplicates?: boolean
  }

  export type komisyoncularCreateWithoutUreticilerInput = {
    id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dukkanAdi: string
    durum?: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutKomisyoncularInput
  }

  export type komisyoncularUncheckedCreateWithoutUreticilerInput = {
    id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    dukkanAdi: string
    durum?: string
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutKomisyoncularInput
  }

  export type komisyoncularCreateOrConnectWithoutUreticilerInput = {
    where: komisyoncularWhereUniqueInput
    create: XOR<komisyoncularCreateWithoutUreticilerInput, komisyoncularUncheckedCreateWithoutUreticilerInput>
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutUreticilerInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutUreticilerInput, mal_kabul_recordsUncheckedUpdateWithoutUreticilerInput>
    create: XOR<mal_kabul_recordsCreateWithoutUreticilerInput, mal_kabul_recordsUncheckedCreateWithoutUreticilerInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutUreticilerInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutUreticilerInput, mal_kabul_recordsUncheckedUpdateWithoutUreticilerInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutUreticilerInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutUreticilerInput>
  }

  export type komisyoncularUpsertWithoutUreticilerInput = {
    update: XOR<komisyoncularUpdateWithoutUreticilerInput, komisyoncularUncheckedUpdateWithoutUreticilerInput>
    create: XOR<komisyoncularCreateWithoutUreticilerInput, komisyoncularUncheckedCreateWithoutUreticilerInput>
    where?: komisyoncularWhereInput
  }

  export type komisyoncularUpdateToOneWithWhereWithoutUreticilerInput = {
    where?: komisyoncularWhereInput
    data: XOR<komisyoncularUpdateWithoutUreticilerInput, komisyoncularUncheckedUpdateWithoutUreticilerInput>
  }

  export type komisyoncularUpdateWithoutUreticilerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutKomisyoncularNestedInput
  }

  export type komisyoncularUncheckedUpdateWithoutUreticilerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: StringFieldUpdateOperationsInput | string
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutKomisyoncularNestedInput
  }

  export type mal_kabul_recordsCreateWithoutUrunlerInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    users: usersCreateNestedOneWithoutMal_kabul_recordsInput
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutUrunlerInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutUrunlerInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutUrunlerInput, mal_kabul_recordsUncheckedCreateWithoutUrunlerInput>
  }

  export type mal_kabul_recordsCreateManyUrunlerInputEnvelope = {
    data: mal_kabul_recordsCreateManyUrunlerInput | mal_kabul_recordsCreateManyUrunlerInput[]
    skipDuplicates?: boolean
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutUrunlerInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutUrunlerInput, mal_kabul_recordsUncheckedUpdateWithoutUrunlerInput>
    create: XOR<mal_kabul_recordsCreateWithoutUrunlerInput, mal_kabul_recordsUncheckedCreateWithoutUrunlerInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutUrunlerInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutUrunlerInput, mal_kabul_recordsUncheckedUpdateWithoutUrunlerInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutUrunlerInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutUrunlerInput>
  }

  export type mal_kabul_recordsCreateWithoutUsersInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
    komisyoncular?: komisyoncularCreateNestedOneWithoutMal_kabul_recordsInput
    ureticiler?: ureticilerCreateNestedOneWithoutMal_kabul_recordsInput
    urunler: urunlerCreateNestedOneWithoutMal_kabul_recordsInput
    faturalar?: faturalarCreateNestedOneWithoutMal_kabul_recordsInput
    mustahsil?: mustahsilCreateNestedOneWithoutMal_kabul_recordsInput
    ozel_firmalar?: ozel_firmalarCreateNestedOneWithoutMal_kabul_recordsInput
    ambalajlar?: ambalajlarCreateNestedOneWithoutMal_kabul_recordsInput
  }

  export type mal_kabul_recordsUncheckedCreateWithoutUsersInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsCreateOrConnectWithoutUsersInput = {
    where: mal_kabul_recordsWhereUniqueInput
    create: XOR<mal_kabul_recordsCreateWithoutUsersInput, mal_kabul_recordsUncheckedCreateWithoutUsersInput>
  }

  export type mal_kabul_recordsCreateManyUsersInputEnvelope = {
    data: mal_kabul_recordsCreateManyUsersInput | mal_kabul_recordsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type faturalarCreateWithoutUsersInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsCreateNestedManyWithoutFaturalarInput
  }

  export type faturalarUncheckedCreateWithoutUsersInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedCreateNestedManyWithoutFaturalarInput
  }

  export type faturalarCreateOrConnectWithoutUsersInput = {
    where: faturalarWhereUniqueInput
    create: XOR<faturalarCreateWithoutUsersInput, faturalarUncheckedCreateWithoutUsersInput>
  }

  export type faturalarCreateManyUsersInputEnvelope = {
    data: faturalarCreateManyUsersInput | faturalarCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type mal_kabul_recordsUpsertWithWhereUniqueWithoutUsersInput = {
    where: mal_kabul_recordsWhereUniqueInput
    update: XOR<mal_kabul_recordsUpdateWithoutUsersInput, mal_kabul_recordsUncheckedUpdateWithoutUsersInput>
    create: XOR<mal_kabul_recordsCreateWithoutUsersInput, mal_kabul_recordsUncheckedCreateWithoutUsersInput>
  }

  export type mal_kabul_recordsUpdateWithWhereUniqueWithoutUsersInput = {
    where: mal_kabul_recordsWhereUniqueInput
    data: XOR<mal_kabul_recordsUpdateWithoutUsersInput, mal_kabul_recordsUncheckedUpdateWithoutUsersInput>
  }

  export type mal_kabul_recordsUpdateManyWithWhereWithoutUsersInput = {
    where: mal_kabul_recordsScalarWhereInput
    data: XOR<mal_kabul_recordsUpdateManyMutationInput, mal_kabul_recordsUncheckedUpdateManyWithoutUsersInput>
  }

  export type faturalarUpsertWithWhereUniqueWithoutUsersInput = {
    where: faturalarWhereUniqueInput
    update: XOR<faturalarUpdateWithoutUsersInput, faturalarUncheckedUpdateWithoutUsersInput>
    create: XOR<faturalarCreateWithoutUsersInput, faturalarUncheckedCreateWithoutUsersInput>
  }

  export type faturalarUpdateWithWhereUniqueWithoutUsersInput = {
    where: faturalarWhereUniqueInput
    data: XOR<faturalarUpdateWithoutUsersInput, faturalarUncheckedUpdateWithoutUsersInput>
  }

  export type faturalarUpdateManyWithWhereWithoutUsersInput = {
    where: faturalarScalarWhereInput
    data: XOR<faturalarUpdateManyMutationInput, faturalarUncheckedUpdateManyWithoutUsersInput>
  }

  export type faturalarScalarWhereInput = {
    AND?: faturalarScalarWhereInput | faturalarScalarWhereInput[]
    OR?: faturalarScalarWhereInput[]
    NOT?: faturalarScalarWhereInput | faturalarScalarWhereInput[]
    id?: StringFilter<"faturalar"> | string
    faturaNo?: StringFilter<"faturalar"> | string
    tarih?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    toplamTutar?: FloatFilter<"faturalar"> | number
    kdvOrani?: FloatNullableFilter<"faturalar"> | number | null
    kdvTutari?: FloatFilter<"faturalar"> | number
    genelToplam?: FloatFilter<"faturalar"> | number
    notlar?: StringNullableFilter<"faturalar"> | string | null
    satinAlmaciId?: StringFilter<"faturalar"> | string
    createdAt?: DateTimeNullableFilter<"faturalar"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"faturalar"> | Date | string | null
  }

  export type mal_kabul_recordsCreateManyAmbalajlarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateWithoutAmbalajlarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutAmbalajlarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutAmbalajlarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsCreateManyFaturalarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateWithoutFaturalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutFaturalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutFaturalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsCreateManyKomisyoncularInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type ureticilerCreateManyKomisyoncularInput = {
    id: string
    ad: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    cinsiyet: string
    dogumTarihi?: Date | string | null
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    durum?: string
  }

  export type mal_kabul_recordsUpdateWithoutKomisyoncularInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutKomisyoncularInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutKomisyoncularInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ureticilerUpdateWithoutKomisyoncularInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutUreticilerNestedInput
  }

  export type ureticilerUncheckedUpdateWithoutKomisyoncularInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutUreticilerNestedInput
  }

  export type ureticilerUncheckedUpdateManyWithoutKomisyoncularInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cinsiyet?: StringFieldUpdateOperationsInput | string
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: StringFieldUpdateOperationsInput | string
  }

  export type mal_kabul_recordsCreateManyMustahsilInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateWithoutMustahsilInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutMustahsilInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutMustahsilInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsCreateManyOzel_firmalarInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateWithoutOzel_firmalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutOzel_firmalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutOzel_firmalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsCreateManyUreticilerInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateWithoutUreticilerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutUreticilerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutUreticilerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsCreateManyUrunlerInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type mal_kabul_recordsUpdateWithoutUrunlerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutUrunlerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutUrunlerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsCreateManyUsersInput = {
    id: string
    tarih?: Date | string | null
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: string
    notlar?: string | null
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: string
    ambalajId?: string | null
    paletSayisi?: number | null
    kasaSayisi?: number | null
    brutKg?: number | null
    daraKg?: number | null
    girisKg?: number | null
    cikmaKg?: number | null
    fireKg?: number | null
    cikmaFireKg?: number | null
    netKg?: number | null
  }

  export type faturalarCreateManyUsersInput = {
    id: string
    faturaNo: string
    tarih?: Date | string | null
    toplamTutar: number
    kdvOrani?: number | null
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type mal_kabul_recordsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: StringFieldUpdateOperationsInput | string
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
    komisyoncular?: komisyoncularUpdateOneWithoutMal_kabul_recordsNestedInput
    ureticiler?: ureticilerUpdateOneWithoutMal_kabul_recordsNestedInput
    urunler?: urunlerUpdateOneRequiredWithoutMal_kabul_recordsNestedInput
    faturalar?: faturalarUpdateOneWithoutMal_kabul_recordsNestedInput
    mustahsil?: mustahsilUpdateOneWithoutMal_kabul_recordsNestedInput
    ozel_firmalar?: ozel_firmalarUpdateOneWithoutMal_kabul_recordsNestedInput
    ambalajlar?: ambalajlarUpdateOneWithoutMal_kabul_recordsNestedInput
  }

  export type mal_kabul_recordsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type mal_kabul_recordsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: StringFieldUpdateOperationsInput | string
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    kasaSayisi?: NullableIntFieldUpdateOperationsInput | number | null
    brutKg?: NullableFloatFieldUpdateOperationsInput | number | null
    daraKg?: NullableFloatFieldUpdateOperationsInput | number | null
    girisKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaKg?: NullableFloatFieldUpdateOperationsInput | number | null
    fireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    cikmaFireKg?: NullableFloatFieldUpdateOperationsInput | number | null
    netKg?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type faturalarUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUpdateManyWithoutFaturalarNestedInput
  }

  export type faturalarUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mal_kabul_records?: mal_kabul_recordsUncheckedUpdateManyWithoutFaturalarNestedInput
  }

  export type faturalarUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: NullableFloatFieldUpdateOperationsInput | number | null
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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