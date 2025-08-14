
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Komisyoncu
 * 
 */
export type Komisyoncu = $Result.DefaultSelection<Prisma.$KomisyoncuPayload>
/**
 * Model OzelFirma
 * 
 */
export type OzelFirma = $Result.DefaultSelection<Prisma.$OzelFirmaPayload>
/**
 * Model Uretici
 * 
 */
export type Uretici = $Result.DefaultSelection<Prisma.$UreticiPayload>
/**
 * Model Mustahsil
 * 
 */
export type Mustahsil = $Result.DefaultSelection<Prisma.$MustahsilPayload>
/**
 * Model Urun
 * 
 */
export type Urun = $Result.DefaultSelection<Prisma.$UrunPayload>
/**
 * Model Ambalaj
 * 
 */
export type Ambalaj = $Result.DefaultSelection<Prisma.$AmbalajPayload>
/**
 * Model MalKabulRecord
 * 
 */
export type MalKabulRecord = $Result.DefaultSelection<Prisma.$MalKabulRecordPayload>
/**
 * Model Fatura
 * 
 */
export type Fatura = $Result.DefaultSelection<Prisma.$FaturaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  MAL_KABULCU: 'MAL_KABULCU',
  MUHASEBE: 'MUHASEBE',
  SATIN_ALMACI: 'SATIN_ALMACI'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ProductStatus: {
  FATURA_BEKLIYOR: 'FATURA_BEKLIYOR',
  FATURALANDI: 'FATURALANDI',
  NETLENDI: 'NETLENDI',
  TAMAMLANDI: 'TAMAMLANDI',
  IPTAL: 'IPTAL'
};

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]


export const Status: {
  AKTIF: 'AKTIF',
  PASIF: 'PASIF'
};

export type Status = (typeof Status)[keyof typeof Status]


export const Gender: {
  ERKEK: 'ERKEK',
  KADIN: 'KADIN'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const SaticiTipi: {
  OZEL_FIRMA: 'OZEL_FIRMA',
  MUSTAHSIL: 'MUSTAHSIL',
  KOMISYONCU: 'KOMISYONCU'
};

export type SaticiTipi = (typeof SaticiTipi)[keyof typeof SaticiTipi]


export const AmbalajTipi: {
  PALET: 'PALET',
  PLASTIK_KASA: 'PLASTIK_KASA',
  KARTON_KASA: 'KARTON_KASA'
};

export type AmbalajTipi = (typeof AmbalajTipi)[keyof typeof AmbalajTipi]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ProductStatus = $Enums.ProductStatus

export const ProductStatus: typeof $Enums.ProductStatus

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type SaticiTipi = $Enums.SaticiTipi

export const SaticiTipi: typeof $Enums.SaticiTipi

export type AmbalajTipi = $Enums.AmbalajTipi

export const AmbalajTipi: typeof $Enums.AmbalajTipi

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.komisyoncu`: Exposes CRUD operations for the **Komisyoncu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Komisyoncus
    * const komisyoncus = await prisma.komisyoncu.findMany()
    * ```
    */
  get komisyoncu(): Prisma.KomisyoncuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ozelFirma`: Exposes CRUD operations for the **OzelFirma** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OzelFirmas
    * const ozelFirmas = await prisma.ozelFirma.findMany()
    * ```
    */
  get ozelFirma(): Prisma.OzelFirmaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uretici`: Exposes CRUD operations for the **Uretici** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ureticis
    * const ureticis = await prisma.uretici.findMany()
    * ```
    */
  get uretici(): Prisma.UreticiDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mustahsil`: Exposes CRUD operations for the **Mustahsil** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mustahsils
    * const mustahsils = await prisma.mustahsil.findMany()
    * ```
    */
  get mustahsil(): Prisma.MustahsilDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.urun`: Exposes CRUD operations for the **Urun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Uruns
    * const uruns = await prisma.urun.findMany()
    * ```
    */
  get urun(): Prisma.UrunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ambalaj`: Exposes CRUD operations for the **Ambalaj** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ambalajs
    * const ambalajs = await prisma.ambalaj.findMany()
    * ```
    */
  get ambalaj(): Prisma.AmbalajDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.malKabulRecord`: Exposes CRUD operations for the **MalKabulRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MalKabulRecords
    * const malKabulRecords = await prisma.malKabulRecord.findMany()
    * ```
    */
  get malKabulRecord(): Prisma.MalKabulRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fatura`: Exposes CRUD operations for the **Fatura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Faturas
    * const faturas = await prisma.fatura.findMany()
    * ```
    */
  get fatura(): Prisma.FaturaDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    Komisyoncu: 'Komisyoncu',
    OzelFirma: 'OzelFirma',
    Uretici: 'Uretici',
    Mustahsil: 'Mustahsil',
    Urun: 'Urun',
    Ambalaj: 'Ambalaj',
    MalKabulRecord: 'MalKabulRecord',
    Fatura: 'Fatura'
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
      modelProps: "user" | "komisyoncu" | "ozelFirma" | "uretici" | "mustahsil" | "urun" | "ambalaj" | "malKabulRecord" | "fatura"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Komisyoncu: {
        payload: Prisma.$KomisyoncuPayload<ExtArgs>
        fields: Prisma.KomisyoncuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KomisyoncuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KomisyoncuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>
          }
          findFirst: {
            args: Prisma.KomisyoncuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KomisyoncuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>
          }
          findMany: {
            args: Prisma.KomisyoncuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>[]
          }
          create: {
            args: Prisma.KomisyoncuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>
          }
          createMany: {
            args: Prisma.KomisyoncuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KomisyoncuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>[]
          }
          delete: {
            args: Prisma.KomisyoncuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>
          }
          update: {
            args: Prisma.KomisyoncuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>
          }
          deleteMany: {
            args: Prisma.KomisyoncuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KomisyoncuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KomisyoncuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>[]
          }
          upsert: {
            args: Prisma.KomisyoncuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KomisyoncuPayload>
          }
          aggregate: {
            args: Prisma.KomisyoncuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKomisyoncu>
          }
          groupBy: {
            args: Prisma.KomisyoncuGroupByArgs<ExtArgs>
            result: $Utils.Optional<KomisyoncuGroupByOutputType>[]
          }
          count: {
            args: Prisma.KomisyoncuCountArgs<ExtArgs>
            result: $Utils.Optional<KomisyoncuCountAggregateOutputType> | number
          }
        }
      }
      OzelFirma: {
        payload: Prisma.$OzelFirmaPayload<ExtArgs>
        fields: Prisma.OzelFirmaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OzelFirmaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OzelFirmaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>
          }
          findFirst: {
            args: Prisma.OzelFirmaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OzelFirmaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>
          }
          findMany: {
            args: Prisma.OzelFirmaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>[]
          }
          create: {
            args: Prisma.OzelFirmaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>
          }
          createMany: {
            args: Prisma.OzelFirmaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OzelFirmaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>[]
          }
          delete: {
            args: Prisma.OzelFirmaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>
          }
          update: {
            args: Prisma.OzelFirmaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>
          }
          deleteMany: {
            args: Prisma.OzelFirmaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OzelFirmaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OzelFirmaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>[]
          }
          upsert: {
            args: Prisma.OzelFirmaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OzelFirmaPayload>
          }
          aggregate: {
            args: Prisma.OzelFirmaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOzelFirma>
          }
          groupBy: {
            args: Prisma.OzelFirmaGroupByArgs<ExtArgs>
            result: $Utils.Optional<OzelFirmaGroupByOutputType>[]
          }
          count: {
            args: Prisma.OzelFirmaCountArgs<ExtArgs>
            result: $Utils.Optional<OzelFirmaCountAggregateOutputType> | number
          }
        }
      }
      Uretici: {
        payload: Prisma.$UreticiPayload<ExtArgs>
        fields: Prisma.UreticiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UreticiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UreticiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>
          }
          findFirst: {
            args: Prisma.UreticiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UreticiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>
          }
          findMany: {
            args: Prisma.UreticiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>[]
          }
          create: {
            args: Prisma.UreticiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>
          }
          createMany: {
            args: Prisma.UreticiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UreticiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>[]
          }
          delete: {
            args: Prisma.UreticiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>
          }
          update: {
            args: Prisma.UreticiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>
          }
          deleteMany: {
            args: Prisma.UreticiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UreticiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UreticiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>[]
          }
          upsert: {
            args: Prisma.UreticiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UreticiPayload>
          }
          aggregate: {
            args: Prisma.UreticiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUretici>
          }
          groupBy: {
            args: Prisma.UreticiGroupByArgs<ExtArgs>
            result: $Utils.Optional<UreticiGroupByOutputType>[]
          }
          count: {
            args: Prisma.UreticiCountArgs<ExtArgs>
            result: $Utils.Optional<UreticiCountAggregateOutputType> | number
          }
        }
      }
      Mustahsil: {
        payload: Prisma.$MustahsilPayload<ExtArgs>
        fields: Prisma.MustahsilFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MustahsilFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MustahsilFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>
          }
          findFirst: {
            args: Prisma.MustahsilFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MustahsilFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>
          }
          findMany: {
            args: Prisma.MustahsilFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>[]
          }
          create: {
            args: Prisma.MustahsilCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>
          }
          createMany: {
            args: Prisma.MustahsilCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MustahsilCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>[]
          }
          delete: {
            args: Prisma.MustahsilDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>
          }
          update: {
            args: Prisma.MustahsilUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>
          }
          deleteMany: {
            args: Prisma.MustahsilDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MustahsilUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MustahsilUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>[]
          }
          upsert: {
            args: Prisma.MustahsilUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MustahsilPayload>
          }
          aggregate: {
            args: Prisma.MustahsilAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMustahsil>
          }
          groupBy: {
            args: Prisma.MustahsilGroupByArgs<ExtArgs>
            result: $Utils.Optional<MustahsilGroupByOutputType>[]
          }
          count: {
            args: Prisma.MustahsilCountArgs<ExtArgs>
            result: $Utils.Optional<MustahsilCountAggregateOutputType> | number
          }
        }
      }
      Urun: {
        payload: Prisma.$UrunPayload<ExtArgs>
        fields: Prisma.UrunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UrunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UrunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>
          }
          findFirst: {
            args: Prisma.UrunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UrunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>
          }
          findMany: {
            args: Prisma.UrunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>[]
          }
          create: {
            args: Prisma.UrunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>
          }
          createMany: {
            args: Prisma.UrunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UrunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>[]
          }
          delete: {
            args: Prisma.UrunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>
          }
          update: {
            args: Prisma.UrunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>
          }
          deleteMany: {
            args: Prisma.UrunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UrunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UrunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>[]
          }
          upsert: {
            args: Prisma.UrunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrunPayload>
          }
          aggregate: {
            args: Prisma.UrunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUrun>
          }
          groupBy: {
            args: Prisma.UrunGroupByArgs<ExtArgs>
            result: $Utils.Optional<UrunGroupByOutputType>[]
          }
          count: {
            args: Prisma.UrunCountArgs<ExtArgs>
            result: $Utils.Optional<UrunCountAggregateOutputType> | number
          }
        }
      }
      Ambalaj: {
        payload: Prisma.$AmbalajPayload<ExtArgs>
        fields: Prisma.AmbalajFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AmbalajFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AmbalajFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>
          }
          findFirst: {
            args: Prisma.AmbalajFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AmbalajFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>
          }
          findMany: {
            args: Prisma.AmbalajFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>[]
          }
          create: {
            args: Prisma.AmbalajCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>
          }
          createMany: {
            args: Prisma.AmbalajCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AmbalajCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>[]
          }
          delete: {
            args: Prisma.AmbalajDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>
          }
          update: {
            args: Prisma.AmbalajUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>
          }
          deleteMany: {
            args: Prisma.AmbalajDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AmbalajUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AmbalajUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>[]
          }
          upsert: {
            args: Prisma.AmbalajUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmbalajPayload>
          }
          aggregate: {
            args: Prisma.AmbalajAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAmbalaj>
          }
          groupBy: {
            args: Prisma.AmbalajGroupByArgs<ExtArgs>
            result: $Utils.Optional<AmbalajGroupByOutputType>[]
          }
          count: {
            args: Prisma.AmbalajCountArgs<ExtArgs>
            result: $Utils.Optional<AmbalajCountAggregateOutputType> | number
          }
        }
      }
      MalKabulRecord: {
        payload: Prisma.$MalKabulRecordPayload<ExtArgs>
        fields: Prisma.MalKabulRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MalKabulRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MalKabulRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>
          }
          findFirst: {
            args: Prisma.MalKabulRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MalKabulRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>
          }
          findMany: {
            args: Prisma.MalKabulRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>[]
          }
          create: {
            args: Prisma.MalKabulRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>
          }
          createMany: {
            args: Prisma.MalKabulRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MalKabulRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>[]
          }
          delete: {
            args: Prisma.MalKabulRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>
          }
          update: {
            args: Prisma.MalKabulRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>
          }
          deleteMany: {
            args: Prisma.MalKabulRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MalKabulRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MalKabulRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>[]
          }
          upsert: {
            args: Prisma.MalKabulRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MalKabulRecordPayload>
          }
          aggregate: {
            args: Prisma.MalKabulRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMalKabulRecord>
          }
          groupBy: {
            args: Prisma.MalKabulRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<MalKabulRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.MalKabulRecordCountArgs<ExtArgs>
            result: $Utils.Optional<MalKabulRecordCountAggregateOutputType> | number
          }
        }
      }
      Fatura: {
        payload: Prisma.$FaturaPayload<ExtArgs>
        fields: Prisma.FaturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FaturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FaturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          findFirst: {
            args: Prisma.FaturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FaturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          findMany: {
            args: Prisma.FaturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>[]
          }
          create: {
            args: Prisma.FaturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          createMany: {
            args: Prisma.FaturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FaturaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>[]
          }
          delete: {
            args: Prisma.FaturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          update: {
            args: Prisma.FaturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          deleteMany: {
            args: Prisma.FaturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FaturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FaturaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>[]
          }
          upsert: {
            args: Prisma.FaturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          aggregate: {
            args: Prisma.FaturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFatura>
          }
          groupBy: {
            args: Prisma.FaturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FaturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FaturaCountArgs<ExtArgs>
            result: $Utils.Optional<FaturaCountAggregateOutputType> | number
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
    user?: UserOmit
    komisyoncu?: KomisyoncuOmit
    ozelFirma?: OzelFirmaOmit
    uretici?: UreticiOmit
    mustahsil?: MustahsilOmit
    urun?: UrunOmit
    ambalaj?: AmbalajOmit
    malKabulRecord?: MalKabulRecordOmit
    fatura?: FaturaOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    faturalar: number
    malKabulRecords: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faturalar?: boolean | UserCountOutputTypeCountFaturalarArgs
    malKabulRecords?: boolean | UserCountOutputTypeCountMalKabulRecordsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFaturalarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaturaWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }


  /**
   * Count Type KomisyoncuCountOutputType
   */

  export type KomisyoncuCountOutputType = {
    malKabulRecords: number
    ureticiler: number
  }

  export type KomisyoncuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | KomisyoncuCountOutputTypeCountMalKabulRecordsArgs
    ureticiler?: boolean | KomisyoncuCountOutputTypeCountUreticilerArgs
  }

  // Custom InputTypes
  /**
   * KomisyoncuCountOutputType without action
   */
  export type KomisyoncuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KomisyoncuCountOutputType
     */
    select?: KomisyoncuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KomisyoncuCountOutputType without action
   */
  export type KomisyoncuCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }

  /**
   * KomisyoncuCountOutputType without action
   */
  export type KomisyoncuCountOutputTypeCountUreticilerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UreticiWhereInput
  }


  /**
   * Count Type OzelFirmaCountOutputType
   */

  export type OzelFirmaCountOutputType = {
    malKabulRecords: number
  }

  export type OzelFirmaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | OzelFirmaCountOutputTypeCountMalKabulRecordsArgs
  }

  // Custom InputTypes
  /**
   * OzelFirmaCountOutputType without action
   */
  export type OzelFirmaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirmaCountOutputType
     */
    select?: OzelFirmaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OzelFirmaCountOutputType without action
   */
  export type OzelFirmaCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }


  /**
   * Count Type UreticiCountOutputType
   */

  export type UreticiCountOutputType = {
    malKabulRecords: number
  }

  export type UreticiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | UreticiCountOutputTypeCountMalKabulRecordsArgs
  }

  // Custom InputTypes
  /**
   * UreticiCountOutputType without action
   */
  export type UreticiCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UreticiCountOutputType
     */
    select?: UreticiCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UreticiCountOutputType without action
   */
  export type UreticiCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }


  /**
   * Count Type MustahsilCountOutputType
   */

  export type MustahsilCountOutputType = {
    malKabulRecords: number
  }

  export type MustahsilCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | MustahsilCountOutputTypeCountMalKabulRecordsArgs
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
  export type MustahsilCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }


  /**
   * Count Type UrunCountOutputType
   */

  export type UrunCountOutputType = {
    malKabulRecords: number
  }

  export type UrunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | UrunCountOutputTypeCountMalKabulRecordsArgs
  }

  // Custom InputTypes
  /**
   * UrunCountOutputType without action
   */
  export type UrunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrunCountOutputType
     */
    select?: UrunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UrunCountOutputType without action
   */
  export type UrunCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }


  /**
   * Count Type AmbalajCountOutputType
   */

  export type AmbalajCountOutputType = {
    malKabulRecords: number
  }

  export type AmbalajCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | AmbalajCountOutputTypeCountMalKabulRecordsArgs
  }

  // Custom InputTypes
  /**
   * AmbalajCountOutputType without action
   */
  export type AmbalajCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AmbalajCountOutputType
     */
    select?: AmbalajCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AmbalajCountOutputType without action
   */
  export type AmbalajCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }


  /**
   * Count Type FaturaCountOutputType
   */

  export type FaturaCountOutputType = {
    malKabulRecords: number
  }

  export type FaturaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | FaturaCountOutputTypeCountMalKabulRecordsArgs
  }

  // Custom InputTypes
  /**
   * FaturaCountOutputType without action
   */
  export type FaturaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaturaCountOutputType
     */
    select?: FaturaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FaturaCountOutputType without action
   */
  export type FaturaCountOutputTypeCountMalKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
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


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
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

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    faturalar?: boolean | User$faturalarArgs<ExtArgs>
    malKabulRecords?: boolean | User$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faturalar?: boolean | User$faturalarArgs<ExtArgs>
    malKabulRecords?: boolean | User$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      faturalar: Prisma.$FaturaPayload<ExtArgs>[]
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      password: string
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    faturalar<T extends User$faturalarArgs<ExtArgs> = {}>(args?: Subset<T, User$faturalarArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    malKabulRecords<T extends User$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.faturalar
   */
  export type User$faturalarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    where?: FaturaWhereInput
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    cursor?: FaturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * User.malKabulRecords
   */
  export type User$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Komisyoncu
   */

  export type AggregateKomisyoncu = {
    _count: KomisyoncuCountAggregateOutputType | null
    _min: KomisyoncuMinAggregateOutputType | null
    _max: KomisyoncuMaxAggregateOutputType | null
  }

  export type KomisyoncuMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    dukkanAdi: string | null
    durum: $Enums.Status | null
    komisyonNo: string | null
    komisyonKodu: string | null
    sehir: string | null
    vkn: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
  }

  export type KomisyoncuMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    dukkanAdi: string | null
    durum: $Enums.Status | null
    komisyonNo: string | null
    komisyonKodu: string | null
    sehir: string | null
    vkn: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
  }

  export type KomisyoncuCountAggregateOutputType = {
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


  export type KomisyoncuMinAggregateInputType = {
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

  export type KomisyoncuMaxAggregateInputType = {
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

  export type KomisyoncuCountAggregateInputType = {
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

  export type KomisyoncuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Komisyoncu to aggregate.
     */
    where?: KomisyoncuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komisyoncus to fetch.
     */
    orderBy?: KomisyoncuOrderByWithRelationInput | KomisyoncuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KomisyoncuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komisyoncus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komisyoncus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Komisyoncus
    **/
    _count?: true | KomisyoncuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KomisyoncuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KomisyoncuMaxAggregateInputType
  }

  export type GetKomisyoncuAggregateType<T extends KomisyoncuAggregateArgs> = {
        [P in keyof T & keyof AggregateKomisyoncu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKomisyoncu[P]>
      : GetScalarType<T[P], AggregateKomisyoncu[P]>
  }




  export type KomisyoncuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KomisyoncuWhereInput
    orderBy?: KomisyoncuOrderByWithAggregationInput | KomisyoncuOrderByWithAggregationInput[]
    by: KomisyoncuScalarFieldEnum[] | KomisyoncuScalarFieldEnum
    having?: KomisyoncuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KomisyoncuCountAggregateInputType | true
    _min?: KomisyoncuMinAggregateInputType
    _max?: KomisyoncuMaxAggregateInputType
  }

  export type KomisyoncuGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    dukkanAdi: string
    durum: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    _count: KomisyoncuCountAggregateOutputType | null
    _min: KomisyoncuMinAggregateOutputType | null
    _max: KomisyoncuMaxAggregateOutputType | null
  }

  type GetKomisyoncuGroupByPayload<T extends KomisyoncuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KomisyoncuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KomisyoncuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KomisyoncuGroupByOutputType[P]>
            : GetScalarType<T[P], KomisyoncuGroupByOutputType[P]>
        }
      >
    >


  export type KomisyoncuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    malKabulRecords?: boolean | Komisyoncu$malKabulRecordsArgs<ExtArgs>
    ureticiler?: boolean | Komisyoncu$ureticilerArgs<ExtArgs>
    _count?: boolean | KomisyoncuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["komisyoncu"]>

  export type KomisyoncuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["komisyoncu"]>

  export type KomisyoncuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["komisyoncu"]>

  export type KomisyoncuSelectScalar = {
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

  export type KomisyoncuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "dukkanAdi" | "durum" | "komisyonNo" | "komisyonKodu" | "sehir" | "vkn" | "yetkiliAdi" | "yetkiliTelefon", ExtArgs["result"]["komisyoncu"]>
  export type KomisyoncuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | Komisyoncu$malKabulRecordsArgs<ExtArgs>
    ureticiler?: boolean | Komisyoncu$ureticilerArgs<ExtArgs>
    _count?: boolean | KomisyoncuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KomisyoncuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type KomisyoncuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $KomisyoncuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Komisyoncu"
    objects: {
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
      ureticiler: Prisma.$UreticiPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      dukkanAdi: string
      durum: $Enums.Status
      komisyonNo: string
      komisyonKodu: string
      sehir: string
      vkn: string | null
      yetkiliAdi: string | null
      yetkiliTelefon: string | null
    }, ExtArgs["result"]["komisyoncu"]>
    composites: {}
  }

  type KomisyoncuGetPayload<S extends boolean | null | undefined | KomisyoncuDefaultArgs> = $Result.GetResult<Prisma.$KomisyoncuPayload, S>

  type KomisyoncuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KomisyoncuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KomisyoncuCountAggregateInputType | true
    }

  export interface KomisyoncuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Komisyoncu'], meta: { name: 'Komisyoncu' } }
    /**
     * Find zero or one Komisyoncu that matches the filter.
     * @param {KomisyoncuFindUniqueArgs} args - Arguments to find a Komisyoncu
     * @example
     * // Get one Komisyoncu
     * const komisyoncu = await prisma.komisyoncu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KomisyoncuFindUniqueArgs>(args: SelectSubset<T, KomisyoncuFindUniqueArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Komisyoncu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KomisyoncuFindUniqueOrThrowArgs} args - Arguments to find a Komisyoncu
     * @example
     * // Get one Komisyoncu
     * const komisyoncu = await prisma.komisyoncu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KomisyoncuFindUniqueOrThrowArgs>(args: SelectSubset<T, KomisyoncuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Komisyoncu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncuFindFirstArgs} args - Arguments to find a Komisyoncu
     * @example
     * // Get one Komisyoncu
     * const komisyoncu = await prisma.komisyoncu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KomisyoncuFindFirstArgs>(args?: SelectSubset<T, KomisyoncuFindFirstArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Komisyoncu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncuFindFirstOrThrowArgs} args - Arguments to find a Komisyoncu
     * @example
     * // Get one Komisyoncu
     * const komisyoncu = await prisma.komisyoncu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KomisyoncuFindFirstOrThrowArgs>(args?: SelectSubset<T, KomisyoncuFindFirstOrThrowArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Komisyoncus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Komisyoncus
     * const komisyoncus = await prisma.komisyoncu.findMany()
     * 
     * // Get first 10 Komisyoncus
     * const komisyoncus = await prisma.komisyoncu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const komisyoncuWithIdOnly = await prisma.komisyoncu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KomisyoncuFindManyArgs>(args?: SelectSubset<T, KomisyoncuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Komisyoncu.
     * @param {KomisyoncuCreateArgs} args - Arguments to create a Komisyoncu.
     * @example
     * // Create one Komisyoncu
     * const Komisyoncu = await prisma.komisyoncu.create({
     *   data: {
     *     // ... data to create a Komisyoncu
     *   }
     * })
     * 
     */
    create<T extends KomisyoncuCreateArgs>(args: SelectSubset<T, KomisyoncuCreateArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Komisyoncus.
     * @param {KomisyoncuCreateManyArgs} args - Arguments to create many Komisyoncus.
     * @example
     * // Create many Komisyoncus
     * const komisyoncu = await prisma.komisyoncu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KomisyoncuCreateManyArgs>(args?: SelectSubset<T, KomisyoncuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Komisyoncus and returns the data saved in the database.
     * @param {KomisyoncuCreateManyAndReturnArgs} args - Arguments to create many Komisyoncus.
     * @example
     * // Create many Komisyoncus
     * const komisyoncu = await prisma.komisyoncu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Komisyoncus and only return the `id`
     * const komisyoncuWithIdOnly = await prisma.komisyoncu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KomisyoncuCreateManyAndReturnArgs>(args?: SelectSubset<T, KomisyoncuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Komisyoncu.
     * @param {KomisyoncuDeleteArgs} args - Arguments to delete one Komisyoncu.
     * @example
     * // Delete one Komisyoncu
     * const Komisyoncu = await prisma.komisyoncu.delete({
     *   where: {
     *     // ... filter to delete one Komisyoncu
     *   }
     * })
     * 
     */
    delete<T extends KomisyoncuDeleteArgs>(args: SelectSubset<T, KomisyoncuDeleteArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Komisyoncu.
     * @param {KomisyoncuUpdateArgs} args - Arguments to update one Komisyoncu.
     * @example
     * // Update one Komisyoncu
     * const komisyoncu = await prisma.komisyoncu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KomisyoncuUpdateArgs>(args: SelectSubset<T, KomisyoncuUpdateArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Komisyoncus.
     * @param {KomisyoncuDeleteManyArgs} args - Arguments to filter Komisyoncus to delete.
     * @example
     * // Delete a few Komisyoncus
     * const { count } = await prisma.komisyoncu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KomisyoncuDeleteManyArgs>(args?: SelectSubset<T, KomisyoncuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Komisyoncus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Komisyoncus
     * const komisyoncu = await prisma.komisyoncu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KomisyoncuUpdateManyArgs>(args: SelectSubset<T, KomisyoncuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Komisyoncus and returns the data updated in the database.
     * @param {KomisyoncuUpdateManyAndReturnArgs} args - Arguments to update many Komisyoncus.
     * @example
     * // Update many Komisyoncus
     * const komisyoncu = await prisma.komisyoncu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Komisyoncus and only return the `id`
     * const komisyoncuWithIdOnly = await prisma.komisyoncu.updateManyAndReturn({
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
    updateManyAndReturn<T extends KomisyoncuUpdateManyAndReturnArgs>(args: SelectSubset<T, KomisyoncuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Komisyoncu.
     * @param {KomisyoncuUpsertArgs} args - Arguments to update or create a Komisyoncu.
     * @example
     * // Update or create a Komisyoncu
     * const komisyoncu = await prisma.komisyoncu.upsert({
     *   create: {
     *     // ... data to create a Komisyoncu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Komisyoncu we want to update
     *   }
     * })
     */
    upsert<T extends KomisyoncuUpsertArgs>(args: SelectSubset<T, KomisyoncuUpsertArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Komisyoncus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncuCountArgs} args - Arguments to filter Komisyoncus to count.
     * @example
     * // Count the number of Komisyoncus
     * const count = await prisma.komisyoncu.count({
     *   where: {
     *     // ... the filter for the Komisyoncus we want to count
     *   }
     * })
    **/
    count<T extends KomisyoncuCountArgs>(
      args?: Subset<T, KomisyoncuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KomisyoncuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Komisyoncu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KomisyoncuAggregateArgs>(args: Subset<T, KomisyoncuAggregateArgs>): Prisma.PrismaPromise<GetKomisyoncuAggregateType<T>>

    /**
     * Group by Komisyoncu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KomisyoncuGroupByArgs} args - Group by arguments.
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
      T extends KomisyoncuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KomisyoncuGroupByArgs['orderBy'] }
        : { orderBy?: KomisyoncuGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KomisyoncuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKomisyoncuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Komisyoncu model
   */
  readonly fields: KomisyoncuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Komisyoncu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KomisyoncuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    malKabulRecords<T extends Komisyoncu$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Komisyoncu$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ureticiler<T extends Komisyoncu$ureticilerArgs<ExtArgs> = {}>(args?: Subset<T, Komisyoncu$ureticilerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Komisyoncu model
   */
  interface KomisyoncuFieldRefs {
    readonly id: FieldRef<"Komisyoncu", 'String'>
    readonly createdAt: FieldRef<"Komisyoncu", 'DateTime'>
    readonly updatedAt: FieldRef<"Komisyoncu", 'DateTime'>
    readonly dukkanAdi: FieldRef<"Komisyoncu", 'String'>
    readonly durum: FieldRef<"Komisyoncu", 'Status'>
    readonly komisyonNo: FieldRef<"Komisyoncu", 'String'>
    readonly komisyonKodu: FieldRef<"Komisyoncu", 'String'>
    readonly sehir: FieldRef<"Komisyoncu", 'String'>
    readonly vkn: FieldRef<"Komisyoncu", 'String'>
    readonly yetkiliAdi: FieldRef<"Komisyoncu", 'String'>
    readonly yetkiliTelefon: FieldRef<"Komisyoncu", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Komisyoncu findUnique
   */
  export type KomisyoncuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * Filter, which Komisyoncu to fetch.
     */
    where: KomisyoncuWhereUniqueInput
  }

  /**
   * Komisyoncu findUniqueOrThrow
   */
  export type KomisyoncuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * Filter, which Komisyoncu to fetch.
     */
    where: KomisyoncuWhereUniqueInput
  }

  /**
   * Komisyoncu findFirst
   */
  export type KomisyoncuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * Filter, which Komisyoncu to fetch.
     */
    where?: KomisyoncuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komisyoncus to fetch.
     */
    orderBy?: KomisyoncuOrderByWithRelationInput | KomisyoncuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Komisyoncus.
     */
    cursor?: KomisyoncuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komisyoncus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komisyoncus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Komisyoncus.
     */
    distinct?: KomisyoncuScalarFieldEnum | KomisyoncuScalarFieldEnum[]
  }

  /**
   * Komisyoncu findFirstOrThrow
   */
  export type KomisyoncuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * Filter, which Komisyoncu to fetch.
     */
    where?: KomisyoncuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komisyoncus to fetch.
     */
    orderBy?: KomisyoncuOrderByWithRelationInput | KomisyoncuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Komisyoncus.
     */
    cursor?: KomisyoncuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komisyoncus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komisyoncus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Komisyoncus.
     */
    distinct?: KomisyoncuScalarFieldEnum | KomisyoncuScalarFieldEnum[]
  }

  /**
   * Komisyoncu findMany
   */
  export type KomisyoncuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * Filter, which Komisyoncus to fetch.
     */
    where?: KomisyoncuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Komisyoncus to fetch.
     */
    orderBy?: KomisyoncuOrderByWithRelationInput | KomisyoncuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Komisyoncus.
     */
    cursor?: KomisyoncuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Komisyoncus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Komisyoncus.
     */
    skip?: number
    distinct?: KomisyoncuScalarFieldEnum | KomisyoncuScalarFieldEnum[]
  }

  /**
   * Komisyoncu create
   */
  export type KomisyoncuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * The data needed to create a Komisyoncu.
     */
    data: XOR<KomisyoncuCreateInput, KomisyoncuUncheckedCreateInput>
  }

  /**
   * Komisyoncu createMany
   */
  export type KomisyoncuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Komisyoncus.
     */
    data: KomisyoncuCreateManyInput | KomisyoncuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Komisyoncu createManyAndReturn
   */
  export type KomisyoncuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * The data used to create many Komisyoncus.
     */
    data: KomisyoncuCreateManyInput | KomisyoncuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Komisyoncu update
   */
  export type KomisyoncuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * The data needed to update a Komisyoncu.
     */
    data: XOR<KomisyoncuUpdateInput, KomisyoncuUncheckedUpdateInput>
    /**
     * Choose, which Komisyoncu to update.
     */
    where: KomisyoncuWhereUniqueInput
  }

  /**
   * Komisyoncu updateMany
   */
  export type KomisyoncuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Komisyoncus.
     */
    data: XOR<KomisyoncuUpdateManyMutationInput, KomisyoncuUncheckedUpdateManyInput>
    /**
     * Filter which Komisyoncus to update
     */
    where?: KomisyoncuWhereInput
    /**
     * Limit how many Komisyoncus to update.
     */
    limit?: number
  }

  /**
   * Komisyoncu updateManyAndReturn
   */
  export type KomisyoncuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * The data used to update Komisyoncus.
     */
    data: XOR<KomisyoncuUpdateManyMutationInput, KomisyoncuUncheckedUpdateManyInput>
    /**
     * Filter which Komisyoncus to update
     */
    where?: KomisyoncuWhereInput
    /**
     * Limit how many Komisyoncus to update.
     */
    limit?: number
  }

  /**
   * Komisyoncu upsert
   */
  export type KomisyoncuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * The filter to search for the Komisyoncu to update in case it exists.
     */
    where: KomisyoncuWhereUniqueInput
    /**
     * In case the Komisyoncu found by the `where` argument doesn't exist, create a new Komisyoncu with this data.
     */
    create: XOR<KomisyoncuCreateInput, KomisyoncuUncheckedCreateInput>
    /**
     * In case the Komisyoncu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KomisyoncuUpdateInput, KomisyoncuUncheckedUpdateInput>
  }

  /**
   * Komisyoncu delete
   */
  export type KomisyoncuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    /**
     * Filter which Komisyoncu to delete.
     */
    where: KomisyoncuWhereUniqueInput
  }

  /**
   * Komisyoncu deleteMany
   */
  export type KomisyoncuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Komisyoncus to delete
     */
    where?: KomisyoncuWhereInput
    /**
     * Limit how many Komisyoncus to delete.
     */
    limit?: number
  }

  /**
   * Komisyoncu.malKabulRecords
   */
  export type Komisyoncu$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * Komisyoncu.ureticiler
   */
  export type Komisyoncu$ureticilerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    where?: UreticiWhereInput
    orderBy?: UreticiOrderByWithRelationInput | UreticiOrderByWithRelationInput[]
    cursor?: UreticiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UreticiScalarFieldEnum | UreticiScalarFieldEnum[]
  }

  /**
   * Komisyoncu without action
   */
  export type KomisyoncuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
  }


  /**
   * Model OzelFirma
   */

  export type AggregateOzelFirma = {
    _count: OzelFirmaCountAggregateOutputType | null
    _min: OzelFirmaMinAggregateOutputType | null
    _max: OzelFirmaMaxAggregateOutputType | null
  }

  export type OzelFirmaMinAggregateOutputType = {
    id: string | null
    firmaAdi: string | null
    firmaNo: string | null
    vkn: string | null
    vergiDairesi: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    sehir: string | null
    adres: string | null
    durum: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OzelFirmaMaxAggregateOutputType = {
    id: string | null
    firmaAdi: string | null
    firmaNo: string | null
    vkn: string | null
    vergiDairesi: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    sehir: string | null
    adres: string | null
    durum: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OzelFirmaCountAggregateOutputType = {
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


  export type OzelFirmaMinAggregateInputType = {
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

  export type OzelFirmaMaxAggregateInputType = {
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

  export type OzelFirmaCountAggregateInputType = {
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

  export type OzelFirmaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OzelFirma to aggregate.
     */
    where?: OzelFirmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OzelFirmas to fetch.
     */
    orderBy?: OzelFirmaOrderByWithRelationInput | OzelFirmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OzelFirmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OzelFirmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OzelFirmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OzelFirmas
    **/
    _count?: true | OzelFirmaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OzelFirmaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OzelFirmaMaxAggregateInputType
  }

  export type GetOzelFirmaAggregateType<T extends OzelFirmaAggregateArgs> = {
        [P in keyof T & keyof AggregateOzelFirma]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOzelFirma[P]>
      : GetScalarType<T[P], AggregateOzelFirma[P]>
  }




  export type OzelFirmaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OzelFirmaWhereInput
    orderBy?: OzelFirmaOrderByWithAggregationInput | OzelFirmaOrderByWithAggregationInput[]
    by: OzelFirmaScalarFieldEnum[] | OzelFirmaScalarFieldEnum
    having?: OzelFirmaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OzelFirmaCountAggregateInputType | true
    _min?: OzelFirmaMinAggregateInputType
    _max?: OzelFirmaMaxAggregateInputType
  }

  export type OzelFirmaGroupByOutputType = {
    id: string
    firmaAdi: string
    firmaNo: string
    vkn: string | null
    vergiDairesi: string | null
    yetkiliAdi: string | null
    yetkiliTelefon: string | null
    sehir: string
    adres: string | null
    durum: $Enums.Status
    createdAt: Date
    updatedAt: Date
    _count: OzelFirmaCountAggregateOutputType | null
    _min: OzelFirmaMinAggregateOutputType | null
    _max: OzelFirmaMaxAggregateOutputType | null
  }

  type GetOzelFirmaGroupByPayload<T extends OzelFirmaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OzelFirmaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OzelFirmaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OzelFirmaGroupByOutputType[P]>
            : GetScalarType<T[P], OzelFirmaGroupByOutputType[P]>
        }
      >
    >


  export type OzelFirmaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    malKabulRecords?: boolean | OzelFirma$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | OzelFirmaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ozelFirma"]>

  export type OzelFirmaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["ozelFirma"]>

  export type OzelFirmaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["ozelFirma"]>

  export type OzelFirmaSelectScalar = {
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

  export type OzelFirmaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firmaAdi" | "firmaNo" | "vkn" | "vergiDairesi" | "yetkiliAdi" | "yetkiliTelefon" | "sehir" | "adres" | "durum" | "createdAt" | "updatedAt", ExtArgs["result"]["ozelFirma"]>
  export type OzelFirmaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | OzelFirma$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | OzelFirmaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OzelFirmaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OzelFirmaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OzelFirmaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OzelFirma"
    objects: {
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
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
      durum: $Enums.Status
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ozelFirma"]>
    composites: {}
  }

  type OzelFirmaGetPayload<S extends boolean | null | undefined | OzelFirmaDefaultArgs> = $Result.GetResult<Prisma.$OzelFirmaPayload, S>

  type OzelFirmaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OzelFirmaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OzelFirmaCountAggregateInputType | true
    }

  export interface OzelFirmaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OzelFirma'], meta: { name: 'OzelFirma' } }
    /**
     * Find zero or one OzelFirma that matches the filter.
     * @param {OzelFirmaFindUniqueArgs} args - Arguments to find a OzelFirma
     * @example
     * // Get one OzelFirma
     * const ozelFirma = await prisma.ozelFirma.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OzelFirmaFindUniqueArgs>(args: SelectSubset<T, OzelFirmaFindUniqueArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OzelFirma that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OzelFirmaFindUniqueOrThrowArgs} args - Arguments to find a OzelFirma
     * @example
     * // Get one OzelFirma
     * const ozelFirma = await prisma.ozelFirma.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OzelFirmaFindUniqueOrThrowArgs>(args: SelectSubset<T, OzelFirmaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OzelFirma that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OzelFirmaFindFirstArgs} args - Arguments to find a OzelFirma
     * @example
     * // Get one OzelFirma
     * const ozelFirma = await prisma.ozelFirma.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OzelFirmaFindFirstArgs>(args?: SelectSubset<T, OzelFirmaFindFirstArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OzelFirma that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OzelFirmaFindFirstOrThrowArgs} args - Arguments to find a OzelFirma
     * @example
     * // Get one OzelFirma
     * const ozelFirma = await prisma.ozelFirma.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OzelFirmaFindFirstOrThrowArgs>(args?: SelectSubset<T, OzelFirmaFindFirstOrThrowArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OzelFirmas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OzelFirmaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OzelFirmas
     * const ozelFirmas = await prisma.ozelFirma.findMany()
     * 
     * // Get first 10 OzelFirmas
     * const ozelFirmas = await prisma.ozelFirma.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ozelFirmaWithIdOnly = await prisma.ozelFirma.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OzelFirmaFindManyArgs>(args?: SelectSubset<T, OzelFirmaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OzelFirma.
     * @param {OzelFirmaCreateArgs} args - Arguments to create a OzelFirma.
     * @example
     * // Create one OzelFirma
     * const OzelFirma = await prisma.ozelFirma.create({
     *   data: {
     *     // ... data to create a OzelFirma
     *   }
     * })
     * 
     */
    create<T extends OzelFirmaCreateArgs>(args: SelectSubset<T, OzelFirmaCreateArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OzelFirmas.
     * @param {OzelFirmaCreateManyArgs} args - Arguments to create many OzelFirmas.
     * @example
     * // Create many OzelFirmas
     * const ozelFirma = await prisma.ozelFirma.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OzelFirmaCreateManyArgs>(args?: SelectSubset<T, OzelFirmaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OzelFirmas and returns the data saved in the database.
     * @param {OzelFirmaCreateManyAndReturnArgs} args - Arguments to create many OzelFirmas.
     * @example
     * // Create many OzelFirmas
     * const ozelFirma = await prisma.ozelFirma.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OzelFirmas and only return the `id`
     * const ozelFirmaWithIdOnly = await prisma.ozelFirma.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OzelFirmaCreateManyAndReturnArgs>(args?: SelectSubset<T, OzelFirmaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OzelFirma.
     * @param {OzelFirmaDeleteArgs} args - Arguments to delete one OzelFirma.
     * @example
     * // Delete one OzelFirma
     * const OzelFirma = await prisma.ozelFirma.delete({
     *   where: {
     *     // ... filter to delete one OzelFirma
     *   }
     * })
     * 
     */
    delete<T extends OzelFirmaDeleteArgs>(args: SelectSubset<T, OzelFirmaDeleteArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OzelFirma.
     * @param {OzelFirmaUpdateArgs} args - Arguments to update one OzelFirma.
     * @example
     * // Update one OzelFirma
     * const ozelFirma = await prisma.ozelFirma.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OzelFirmaUpdateArgs>(args: SelectSubset<T, OzelFirmaUpdateArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OzelFirmas.
     * @param {OzelFirmaDeleteManyArgs} args - Arguments to filter OzelFirmas to delete.
     * @example
     * // Delete a few OzelFirmas
     * const { count } = await prisma.ozelFirma.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OzelFirmaDeleteManyArgs>(args?: SelectSubset<T, OzelFirmaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OzelFirmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OzelFirmaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OzelFirmas
     * const ozelFirma = await prisma.ozelFirma.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OzelFirmaUpdateManyArgs>(args: SelectSubset<T, OzelFirmaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OzelFirmas and returns the data updated in the database.
     * @param {OzelFirmaUpdateManyAndReturnArgs} args - Arguments to update many OzelFirmas.
     * @example
     * // Update many OzelFirmas
     * const ozelFirma = await prisma.ozelFirma.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OzelFirmas and only return the `id`
     * const ozelFirmaWithIdOnly = await prisma.ozelFirma.updateManyAndReturn({
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
    updateManyAndReturn<T extends OzelFirmaUpdateManyAndReturnArgs>(args: SelectSubset<T, OzelFirmaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OzelFirma.
     * @param {OzelFirmaUpsertArgs} args - Arguments to update or create a OzelFirma.
     * @example
     * // Update or create a OzelFirma
     * const ozelFirma = await prisma.ozelFirma.upsert({
     *   create: {
     *     // ... data to create a OzelFirma
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OzelFirma we want to update
     *   }
     * })
     */
    upsert<T extends OzelFirmaUpsertArgs>(args: SelectSubset<T, OzelFirmaUpsertArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OzelFirmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OzelFirmaCountArgs} args - Arguments to filter OzelFirmas to count.
     * @example
     * // Count the number of OzelFirmas
     * const count = await prisma.ozelFirma.count({
     *   where: {
     *     // ... the filter for the OzelFirmas we want to count
     *   }
     * })
    **/
    count<T extends OzelFirmaCountArgs>(
      args?: Subset<T, OzelFirmaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OzelFirmaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OzelFirma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OzelFirmaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OzelFirmaAggregateArgs>(args: Subset<T, OzelFirmaAggregateArgs>): Prisma.PrismaPromise<GetOzelFirmaAggregateType<T>>

    /**
     * Group by OzelFirma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OzelFirmaGroupByArgs} args - Group by arguments.
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
      T extends OzelFirmaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OzelFirmaGroupByArgs['orderBy'] }
        : { orderBy?: OzelFirmaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OzelFirmaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOzelFirmaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OzelFirma model
   */
  readonly fields: OzelFirmaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OzelFirma.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OzelFirmaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    malKabulRecords<T extends OzelFirma$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, OzelFirma$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the OzelFirma model
   */
  interface OzelFirmaFieldRefs {
    readonly id: FieldRef<"OzelFirma", 'String'>
    readonly firmaAdi: FieldRef<"OzelFirma", 'String'>
    readonly firmaNo: FieldRef<"OzelFirma", 'String'>
    readonly vkn: FieldRef<"OzelFirma", 'String'>
    readonly vergiDairesi: FieldRef<"OzelFirma", 'String'>
    readonly yetkiliAdi: FieldRef<"OzelFirma", 'String'>
    readonly yetkiliTelefon: FieldRef<"OzelFirma", 'String'>
    readonly sehir: FieldRef<"OzelFirma", 'String'>
    readonly adres: FieldRef<"OzelFirma", 'String'>
    readonly durum: FieldRef<"OzelFirma", 'Status'>
    readonly createdAt: FieldRef<"OzelFirma", 'DateTime'>
    readonly updatedAt: FieldRef<"OzelFirma", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OzelFirma findUnique
   */
  export type OzelFirmaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * Filter, which OzelFirma to fetch.
     */
    where: OzelFirmaWhereUniqueInput
  }

  /**
   * OzelFirma findUniqueOrThrow
   */
  export type OzelFirmaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * Filter, which OzelFirma to fetch.
     */
    where: OzelFirmaWhereUniqueInput
  }

  /**
   * OzelFirma findFirst
   */
  export type OzelFirmaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * Filter, which OzelFirma to fetch.
     */
    where?: OzelFirmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OzelFirmas to fetch.
     */
    orderBy?: OzelFirmaOrderByWithRelationInput | OzelFirmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OzelFirmas.
     */
    cursor?: OzelFirmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OzelFirmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OzelFirmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OzelFirmas.
     */
    distinct?: OzelFirmaScalarFieldEnum | OzelFirmaScalarFieldEnum[]
  }

  /**
   * OzelFirma findFirstOrThrow
   */
  export type OzelFirmaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * Filter, which OzelFirma to fetch.
     */
    where?: OzelFirmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OzelFirmas to fetch.
     */
    orderBy?: OzelFirmaOrderByWithRelationInput | OzelFirmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OzelFirmas.
     */
    cursor?: OzelFirmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OzelFirmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OzelFirmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OzelFirmas.
     */
    distinct?: OzelFirmaScalarFieldEnum | OzelFirmaScalarFieldEnum[]
  }

  /**
   * OzelFirma findMany
   */
  export type OzelFirmaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * Filter, which OzelFirmas to fetch.
     */
    where?: OzelFirmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OzelFirmas to fetch.
     */
    orderBy?: OzelFirmaOrderByWithRelationInput | OzelFirmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OzelFirmas.
     */
    cursor?: OzelFirmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OzelFirmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OzelFirmas.
     */
    skip?: number
    distinct?: OzelFirmaScalarFieldEnum | OzelFirmaScalarFieldEnum[]
  }

  /**
   * OzelFirma create
   */
  export type OzelFirmaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * The data needed to create a OzelFirma.
     */
    data: XOR<OzelFirmaCreateInput, OzelFirmaUncheckedCreateInput>
  }

  /**
   * OzelFirma createMany
   */
  export type OzelFirmaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OzelFirmas.
     */
    data: OzelFirmaCreateManyInput | OzelFirmaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OzelFirma createManyAndReturn
   */
  export type OzelFirmaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * The data used to create many OzelFirmas.
     */
    data: OzelFirmaCreateManyInput | OzelFirmaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OzelFirma update
   */
  export type OzelFirmaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * The data needed to update a OzelFirma.
     */
    data: XOR<OzelFirmaUpdateInput, OzelFirmaUncheckedUpdateInput>
    /**
     * Choose, which OzelFirma to update.
     */
    where: OzelFirmaWhereUniqueInput
  }

  /**
   * OzelFirma updateMany
   */
  export type OzelFirmaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OzelFirmas.
     */
    data: XOR<OzelFirmaUpdateManyMutationInput, OzelFirmaUncheckedUpdateManyInput>
    /**
     * Filter which OzelFirmas to update
     */
    where?: OzelFirmaWhereInput
    /**
     * Limit how many OzelFirmas to update.
     */
    limit?: number
  }

  /**
   * OzelFirma updateManyAndReturn
   */
  export type OzelFirmaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * The data used to update OzelFirmas.
     */
    data: XOR<OzelFirmaUpdateManyMutationInput, OzelFirmaUncheckedUpdateManyInput>
    /**
     * Filter which OzelFirmas to update
     */
    where?: OzelFirmaWhereInput
    /**
     * Limit how many OzelFirmas to update.
     */
    limit?: number
  }

  /**
   * OzelFirma upsert
   */
  export type OzelFirmaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * The filter to search for the OzelFirma to update in case it exists.
     */
    where: OzelFirmaWhereUniqueInput
    /**
     * In case the OzelFirma found by the `where` argument doesn't exist, create a new OzelFirma with this data.
     */
    create: XOR<OzelFirmaCreateInput, OzelFirmaUncheckedCreateInput>
    /**
     * In case the OzelFirma was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OzelFirmaUpdateInput, OzelFirmaUncheckedUpdateInput>
  }

  /**
   * OzelFirma delete
   */
  export type OzelFirmaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    /**
     * Filter which OzelFirma to delete.
     */
    where: OzelFirmaWhereUniqueInput
  }

  /**
   * OzelFirma deleteMany
   */
  export type OzelFirmaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OzelFirmas to delete
     */
    where?: OzelFirmaWhereInput
    /**
     * Limit how many OzelFirmas to delete.
     */
    limit?: number
  }

  /**
   * OzelFirma.malKabulRecords
   */
  export type OzelFirma$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * OzelFirma without action
   */
  export type OzelFirmaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
  }


  /**
   * Model Uretici
   */

  export type AggregateUretici = {
    _count: UreticiCountAggregateOutputType | null
    _min: UreticiMinAggregateOutputType | null
    _max: UreticiMaxAggregateOutputType | null
  }

  export type UreticiMinAggregateOutputType = {
    id: string | null
    ad: string | null
    createdAt: Date | null
    updatedAt: Date | null
    cinsiyet: $Enums.Gender | null
    dogumTarihi: Date | null
    durum: $Enums.Status | null
    iletisim: string | null
    komisyoncuId: string | null
    sehir: string | null
    soyad: string | null
    tcNo: string | null
  }

  export type UreticiMaxAggregateOutputType = {
    id: string | null
    ad: string | null
    createdAt: Date | null
    updatedAt: Date | null
    cinsiyet: $Enums.Gender | null
    dogumTarihi: Date | null
    durum: $Enums.Status | null
    iletisim: string | null
    komisyoncuId: string | null
    sehir: string | null
    soyad: string | null
    tcNo: string | null
  }

  export type UreticiCountAggregateOutputType = {
    id: number
    ad: number
    createdAt: number
    updatedAt: number
    cinsiyet: number
    dogumTarihi: number
    durum: number
    iletisim: number
    komisyoncuId: number
    sehir: number
    soyad: number
    tcNo: number
    _all: number
  }


  export type UreticiMinAggregateInputType = {
    id?: true
    ad?: true
    createdAt?: true
    updatedAt?: true
    cinsiyet?: true
    dogumTarihi?: true
    durum?: true
    iletisim?: true
    komisyoncuId?: true
    sehir?: true
    soyad?: true
    tcNo?: true
  }

  export type UreticiMaxAggregateInputType = {
    id?: true
    ad?: true
    createdAt?: true
    updatedAt?: true
    cinsiyet?: true
    dogumTarihi?: true
    durum?: true
    iletisim?: true
    komisyoncuId?: true
    sehir?: true
    soyad?: true
    tcNo?: true
  }

  export type UreticiCountAggregateInputType = {
    id?: true
    ad?: true
    createdAt?: true
    updatedAt?: true
    cinsiyet?: true
    dogumTarihi?: true
    durum?: true
    iletisim?: true
    komisyoncuId?: true
    sehir?: true
    soyad?: true
    tcNo?: true
    _all?: true
  }

  export type UreticiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Uretici to aggregate.
     */
    where?: UreticiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ureticis to fetch.
     */
    orderBy?: UreticiOrderByWithRelationInput | UreticiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UreticiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ureticis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ureticis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ureticis
    **/
    _count?: true | UreticiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UreticiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UreticiMaxAggregateInputType
  }

  export type GetUreticiAggregateType<T extends UreticiAggregateArgs> = {
        [P in keyof T & keyof AggregateUretici]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUretici[P]>
      : GetScalarType<T[P], AggregateUretici[P]>
  }




  export type UreticiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UreticiWhereInput
    orderBy?: UreticiOrderByWithAggregationInput | UreticiOrderByWithAggregationInput[]
    by: UreticiScalarFieldEnum[] | UreticiScalarFieldEnum
    having?: UreticiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UreticiCountAggregateInputType | true
    _min?: UreticiMinAggregateInputType
    _max?: UreticiMaxAggregateInputType
  }

  export type UreticiGroupByOutputType = {
    id: string
    ad: string
    createdAt: Date
    updatedAt: Date
    cinsiyet: $Enums.Gender
    dogumTarihi: Date | null
    durum: $Enums.Status
    iletisim: string | null
    komisyoncuId: string | null
    sehir: string
    soyad: string
    tcNo: string | null
    _count: UreticiCountAggregateOutputType | null
    _min: UreticiMinAggregateOutputType | null
    _max: UreticiMaxAggregateOutputType | null
  }

  type GetUreticiGroupByPayload<T extends UreticiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UreticiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UreticiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UreticiGroupByOutputType[P]>
            : GetScalarType<T[P], UreticiGroupByOutputType[P]>
        }
      >
    >


  export type UreticiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    durum?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
    malKabulRecords?: boolean | Uretici$malKabulRecordsArgs<ExtArgs>
    komisyoncu?: boolean | Uretici$komisyoncuArgs<ExtArgs>
    _count?: boolean | UreticiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uretici"]>

  export type UreticiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    durum?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
    komisyoncu?: boolean | Uretici$komisyoncuArgs<ExtArgs>
  }, ExtArgs["result"]["uretici"]>

  export type UreticiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    durum?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
    komisyoncu?: boolean | Uretici$komisyoncuArgs<ExtArgs>
  }, ExtArgs["result"]["uretici"]>

  export type UreticiSelectScalar = {
    id?: boolean
    ad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cinsiyet?: boolean
    dogumTarihi?: boolean
    durum?: boolean
    iletisim?: boolean
    komisyoncuId?: boolean
    sehir?: boolean
    soyad?: boolean
    tcNo?: boolean
  }

  export type UreticiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "createdAt" | "updatedAt" | "cinsiyet" | "dogumTarihi" | "durum" | "iletisim" | "komisyoncuId" | "sehir" | "soyad" | "tcNo", ExtArgs["result"]["uretici"]>
  export type UreticiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | Uretici$malKabulRecordsArgs<ExtArgs>
    komisyoncu?: boolean | Uretici$komisyoncuArgs<ExtArgs>
    _count?: boolean | UreticiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UreticiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    komisyoncu?: boolean | Uretici$komisyoncuArgs<ExtArgs>
  }
  export type UreticiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    komisyoncu?: boolean | Uretici$komisyoncuArgs<ExtArgs>
  }

  export type $UreticiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Uretici"
    objects: {
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
      komisyoncu: Prisma.$KomisyoncuPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ad: string
      createdAt: Date
      updatedAt: Date
      cinsiyet: $Enums.Gender
      dogumTarihi: Date | null
      durum: $Enums.Status
      iletisim: string | null
      komisyoncuId: string | null
      sehir: string
      soyad: string
      tcNo: string | null
    }, ExtArgs["result"]["uretici"]>
    composites: {}
  }

  type UreticiGetPayload<S extends boolean | null | undefined | UreticiDefaultArgs> = $Result.GetResult<Prisma.$UreticiPayload, S>

  type UreticiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UreticiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UreticiCountAggregateInputType | true
    }

  export interface UreticiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Uretici'], meta: { name: 'Uretici' } }
    /**
     * Find zero or one Uretici that matches the filter.
     * @param {UreticiFindUniqueArgs} args - Arguments to find a Uretici
     * @example
     * // Get one Uretici
     * const uretici = await prisma.uretici.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UreticiFindUniqueArgs>(args: SelectSubset<T, UreticiFindUniqueArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Uretici that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UreticiFindUniqueOrThrowArgs} args - Arguments to find a Uretici
     * @example
     * // Get one Uretici
     * const uretici = await prisma.uretici.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UreticiFindUniqueOrThrowArgs>(args: SelectSubset<T, UreticiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Uretici that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticiFindFirstArgs} args - Arguments to find a Uretici
     * @example
     * // Get one Uretici
     * const uretici = await prisma.uretici.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UreticiFindFirstArgs>(args?: SelectSubset<T, UreticiFindFirstArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Uretici that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticiFindFirstOrThrowArgs} args - Arguments to find a Uretici
     * @example
     * // Get one Uretici
     * const uretici = await prisma.uretici.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UreticiFindFirstOrThrowArgs>(args?: SelectSubset<T, UreticiFindFirstOrThrowArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ureticis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ureticis
     * const ureticis = await prisma.uretici.findMany()
     * 
     * // Get first 10 Ureticis
     * const ureticis = await prisma.uretici.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ureticiWithIdOnly = await prisma.uretici.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UreticiFindManyArgs>(args?: SelectSubset<T, UreticiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Uretici.
     * @param {UreticiCreateArgs} args - Arguments to create a Uretici.
     * @example
     * // Create one Uretici
     * const Uretici = await prisma.uretici.create({
     *   data: {
     *     // ... data to create a Uretici
     *   }
     * })
     * 
     */
    create<T extends UreticiCreateArgs>(args: SelectSubset<T, UreticiCreateArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ureticis.
     * @param {UreticiCreateManyArgs} args - Arguments to create many Ureticis.
     * @example
     * // Create many Ureticis
     * const uretici = await prisma.uretici.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UreticiCreateManyArgs>(args?: SelectSubset<T, UreticiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ureticis and returns the data saved in the database.
     * @param {UreticiCreateManyAndReturnArgs} args - Arguments to create many Ureticis.
     * @example
     * // Create many Ureticis
     * const uretici = await prisma.uretici.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ureticis and only return the `id`
     * const ureticiWithIdOnly = await prisma.uretici.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UreticiCreateManyAndReturnArgs>(args?: SelectSubset<T, UreticiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Uretici.
     * @param {UreticiDeleteArgs} args - Arguments to delete one Uretici.
     * @example
     * // Delete one Uretici
     * const Uretici = await prisma.uretici.delete({
     *   where: {
     *     // ... filter to delete one Uretici
     *   }
     * })
     * 
     */
    delete<T extends UreticiDeleteArgs>(args: SelectSubset<T, UreticiDeleteArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Uretici.
     * @param {UreticiUpdateArgs} args - Arguments to update one Uretici.
     * @example
     * // Update one Uretici
     * const uretici = await prisma.uretici.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UreticiUpdateArgs>(args: SelectSubset<T, UreticiUpdateArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ureticis.
     * @param {UreticiDeleteManyArgs} args - Arguments to filter Ureticis to delete.
     * @example
     * // Delete a few Ureticis
     * const { count } = await prisma.uretici.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UreticiDeleteManyArgs>(args?: SelectSubset<T, UreticiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ureticis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ureticis
     * const uretici = await prisma.uretici.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UreticiUpdateManyArgs>(args: SelectSubset<T, UreticiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ureticis and returns the data updated in the database.
     * @param {UreticiUpdateManyAndReturnArgs} args - Arguments to update many Ureticis.
     * @example
     * // Update many Ureticis
     * const uretici = await prisma.uretici.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ureticis and only return the `id`
     * const ureticiWithIdOnly = await prisma.uretici.updateManyAndReturn({
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
    updateManyAndReturn<T extends UreticiUpdateManyAndReturnArgs>(args: SelectSubset<T, UreticiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Uretici.
     * @param {UreticiUpsertArgs} args - Arguments to update or create a Uretici.
     * @example
     * // Update or create a Uretici
     * const uretici = await prisma.uretici.upsert({
     *   create: {
     *     // ... data to create a Uretici
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Uretici we want to update
     *   }
     * })
     */
    upsert<T extends UreticiUpsertArgs>(args: SelectSubset<T, UreticiUpsertArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ureticis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticiCountArgs} args - Arguments to filter Ureticis to count.
     * @example
     * // Count the number of Ureticis
     * const count = await prisma.uretici.count({
     *   where: {
     *     // ... the filter for the Ureticis we want to count
     *   }
     * })
    **/
    count<T extends UreticiCountArgs>(
      args?: Subset<T, UreticiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UreticiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Uretici.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UreticiAggregateArgs>(args: Subset<T, UreticiAggregateArgs>): Prisma.PrismaPromise<GetUreticiAggregateType<T>>

    /**
     * Group by Uretici.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UreticiGroupByArgs} args - Group by arguments.
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
      T extends UreticiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UreticiGroupByArgs['orderBy'] }
        : { orderBy?: UreticiGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UreticiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUreticiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Uretici model
   */
  readonly fields: UreticiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Uretici.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UreticiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    malKabulRecords<T extends Uretici$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Uretici$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    komisyoncu<T extends Uretici$komisyoncuArgs<ExtArgs> = {}>(args?: Subset<T, Uretici$komisyoncuArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Uretici model
   */
  interface UreticiFieldRefs {
    readonly id: FieldRef<"Uretici", 'String'>
    readonly ad: FieldRef<"Uretici", 'String'>
    readonly createdAt: FieldRef<"Uretici", 'DateTime'>
    readonly updatedAt: FieldRef<"Uretici", 'DateTime'>
    readonly cinsiyet: FieldRef<"Uretici", 'Gender'>
    readonly dogumTarihi: FieldRef<"Uretici", 'DateTime'>
    readonly durum: FieldRef<"Uretici", 'Status'>
    readonly iletisim: FieldRef<"Uretici", 'String'>
    readonly komisyoncuId: FieldRef<"Uretici", 'String'>
    readonly sehir: FieldRef<"Uretici", 'String'>
    readonly soyad: FieldRef<"Uretici", 'String'>
    readonly tcNo: FieldRef<"Uretici", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Uretici findUnique
   */
  export type UreticiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * Filter, which Uretici to fetch.
     */
    where: UreticiWhereUniqueInput
  }

  /**
   * Uretici findUniqueOrThrow
   */
  export type UreticiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * Filter, which Uretici to fetch.
     */
    where: UreticiWhereUniqueInput
  }

  /**
   * Uretici findFirst
   */
  export type UreticiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * Filter, which Uretici to fetch.
     */
    where?: UreticiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ureticis to fetch.
     */
    orderBy?: UreticiOrderByWithRelationInput | UreticiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ureticis.
     */
    cursor?: UreticiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ureticis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ureticis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ureticis.
     */
    distinct?: UreticiScalarFieldEnum | UreticiScalarFieldEnum[]
  }

  /**
   * Uretici findFirstOrThrow
   */
  export type UreticiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * Filter, which Uretici to fetch.
     */
    where?: UreticiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ureticis to fetch.
     */
    orderBy?: UreticiOrderByWithRelationInput | UreticiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ureticis.
     */
    cursor?: UreticiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ureticis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ureticis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ureticis.
     */
    distinct?: UreticiScalarFieldEnum | UreticiScalarFieldEnum[]
  }

  /**
   * Uretici findMany
   */
  export type UreticiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * Filter, which Ureticis to fetch.
     */
    where?: UreticiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ureticis to fetch.
     */
    orderBy?: UreticiOrderByWithRelationInput | UreticiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ureticis.
     */
    cursor?: UreticiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ureticis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ureticis.
     */
    skip?: number
    distinct?: UreticiScalarFieldEnum | UreticiScalarFieldEnum[]
  }

  /**
   * Uretici create
   */
  export type UreticiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * The data needed to create a Uretici.
     */
    data: XOR<UreticiCreateInput, UreticiUncheckedCreateInput>
  }

  /**
   * Uretici createMany
   */
  export type UreticiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ureticis.
     */
    data: UreticiCreateManyInput | UreticiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Uretici createManyAndReturn
   */
  export type UreticiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * The data used to create many Ureticis.
     */
    data: UreticiCreateManyInput | UreticiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Uretici update
   */
  export type UreticiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * The data needed to update a Uretici.
     */
    data: XOR<UreticiUpdateInput, UreticiUncheckedUpdateInput>
    /**
     * Choose, which Uretici to update.
     */
    where: UreticiWhereUniqueInput
  }

  /**
   * Uretici updateMany
   */
  export type UreticiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ureticis.
     */
    data: XOR<UreticiUpdateManyMutationInput, UreticiUncheckedUpdateManyInput>
    /**
     * Filter which Ureticis to update
     */
    where?: UreticiWhereInput
    /**
     * Limit how many Ureticis to update.
     */
    limit?: number
  }

  /**
   * Uretici updateManyAndReturn
   */
  export type UreticiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * The data used to update Ureticis.
     */
    data: XOR<UreticiUpdateManyMutationInput, UreticiUncheckedUpdateManyInput>
    /**
     * Filter which Ureticis to update
     */
    where?: UreticiWhereInput
    /**
     * Limit how many Ureticis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Uretici upsert
   */
  export type UreticiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * The filter to search for the Uretici to update in case it exists.
     */
    where: UreticiWhereUniqueInput
    /**
     * In case the Uretici found by the `where` argument doesn't exist, create a new Uretici with this data.
     */
    create: XOR<UreticiCreateInput, UreticiUncheckedCreateInput>
    /**
     * In case the Uretici was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UreticiUpdateInput, UreticiUncheckedUpdateInput>
  }

  /**
   * Uretici delete
   */
  export type UreticiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    /**
     * Filter which Uretici to delete.
     */
    where: UreticiWhereUniqueInput
  }

  /**
   * Uretici deleteMany
   */
  export type UreticiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ureticis to delete
     */
    where?: UreticiWhereInput
    /**
     * Limit how many Ureticis to delete.
     */
    limit?: number
  }

  /**
   * Uretici.malKabulRecords
   */
  export type Uretici$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * Uretici.komisyoncu
   */
  export type Uretici$komisyoncuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    where?: KomisyoncuWhereInput
  }

  /**
   * Uretici without action
   */
  export type UreticiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
  }


  /**
   * Model Mustahsil
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
    cinsiyet: $Enums.Gender | null
    durum: $Enums.Status | null
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
    cinsiyet: $Enums.Gender | null
    durum: $Enums.Status | null
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
     * Filter which Mustahsil to aggregate.
     */
    where?: MustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mustahsils to fetch.
     */
    orderBy?: MustahsilOrderByWithRelationInput | MustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mustahsils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mustahsils
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




  export type MustahsilGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MustahsilWhereInput
    orderBy?: MustahsilOrderByWithAggregationInput | MustahsilOrderByWithAggregationInput[]
    by: MustahsilScalarFieldEnum[] | MustahsilScalarFieldEnum
    having?: MustahsilScalarWhereWithAggregatesInput
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
    cinsiyet: $Enums.Gender
    durum: $Enums.Status
    createdAt: Date
    updatedAt: Date
    _count: MustahsilCountAggregateOutputType | null
    _min: MustahsilMinAggregateOutputType | null
    _max: MustahsilMaxAggregateOutputType | null
  }

  type GetMustahsilGroupByPayload<T extends MustahsilGroupByArgs> = Prisma.PrismaPromise<
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


  export type MustahsilSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    malKabulRecords?: boolean | Mustahsil$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | MustahsilCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mustahsil"]>

  export type MustahsilSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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

  export type MustahsilSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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

  export type MustahsilSelectScalar = {
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

  export type MustahsilOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "soyad" | "dogumTarihi" | "tcKimlikNo" | "mustahsilNo" | "iletisim" | "bankaAdi" | "ibanAdresi" | "adres" | "cinsiyet" | "durum" | "createdAt" | "updatedAt", ExtArgs["result"]["mustahsil"]>
  export type MustahsilInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | Mustahsil$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | MustahsilCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MustahsilIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MustahsilIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MustahsilPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mustahsil"
    objects: {
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
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
      cinsiyet: $Enums.Gender
      durum: $Enums.Status
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mustahsil"]>
    composites: {}
  }

  type MustahsilGetPayload<S extends boolean | null | undefined | MustahsilDefaultArgs> = $Result.GetResult<Prisma.$MustahsilPayload, S>

  type MustahsilCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MustahsilFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MustahsilCountAggregateInputType | true
    }

  export interface MustahsilDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mustahsil'], meta: { name: 'Mustahsil' } }
    /**
     * Find zero or one Mustahsil that matches the filter.
     * @param {MustahsilFindUniqueArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MustahsilFindUniqueArgs>(args: SelectSubset<T, MustahsilFindUniqueArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mustahsil that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MustahsilFindUniqueOrThrowArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MustahsilFindUniqueOrThrowArgs>(args: SelectSubset<T, MustahsilFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mustahsil that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MustahsilFindFirstArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MustahsilFindFirstArgs>(args?: SelectSubset<T, MustahsilFindFirstArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mustahsil that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MustahsilFindFirstOrThrowArgs} args - Arguments to find a Mustahsil
     * @example
     * // Get one Mustahsil
     * const mustahsil = await prisma.mustahsil.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MustahsilFindFirstOrThrowArgs>(args?: SelectSubset<T, MustahsilFindFirstOrThrowArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mustahsils that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MustahsilFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends MustahsilFindManyArgs>(args?: SelectSubset<T, MustahsilFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mustahsil.
     * @param {MustahsilCreateArgs} args - Arguments to create a Mustahsil.
     * @example
     * // Create one Mustahsil
     * const Mustahsil = await prisma.mustahsil.create({
     *   data: {
     *     // ... data to create a Mustahsil
     *   }
     * })
     * 
     */
    create<T extends MustahsilCreateArgs>(args: SelectSubset<T, MustahsilCreateArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mustahsils.
     * @param {MustahsilCreateManyArgs} args - Arguments to create many Mustahsils.
     * @example
     * // Create many Mustahsils
     * const mustahsil = await prisma.mustahsil.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MustahsilCreateManyArgs>(args?: SelectSubset<T, MustahsilCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mustahsils and returns the data saved in the database.
     * @param {MustahsilCreateManyAndReturnArgs} args - Arguments to create many Mustahsils.
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
    createManyAndReturn<T extends MustahsilCreateManyAndReturnArgs>(args?: SelectSubset<T, MustahsilCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mustahsil.
     * @param {MustahsilDeleteArgs} args - Arguments to delete one Mustahsil.
     * @example
     * // Delete one Mustahsil
     * const Mustahsil = await prisma.mustahsil.delete({
     *   where: {
     *     // ... filter to delete one Mustahsil
     *   }
     * })
     * 
     */
    delete<T extends MustahsilDeleteArgs>(args: SelectSubset<T, MustahsilDeleteArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mustahsil.
     * @param {MustahsilUpdateArgs} args - Arguments to update one Mustahsil.
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
    update<T extends MustahsilUpdateArgs>(args: SelectSubset<T, MustahsilUpdateArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mustahsils.
     * @param {MustahsilDeleteManyArgs} args - Arguments to filter Mustahsils to delete.
     * @example
     * // Delete a few Mustahsils
     * const { count } = await prisma.mustahsil.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MustahsilDeleteManyArgs>(args?: SelectSubset<T, MustahsilDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mustahsils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MustahsilUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends MustahsilUpdateManyArgs>(args: SelectSubset<T, MustahsilUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mustahsils and returns the data updated in the database.
     * @param {MustahsilUpdateManyAndReturnArgs} args - Arguments to update many Mustahsils.
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
    updateManyAndReturn<T extends MustahsilUpdateManyAndReturnArgs>(args: SelectSubset<T, MustahsilUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mustahsil.
     * @param {MustahsilUpsertArgs} args - Arguments to update or create a Mustahsil.
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
    upsert<T extends MustahsilUpsertArgs>(args: SelectSubset<T, MustahsilUpsertArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mustahsils.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MustahsilCountArgs} args - Arguments to filter Mustahsils to count.
     * @example
     * // Count the number of Mustahsils
     * const count = await prisma.mustahsil.count({
     *   where: {
     *     // ... the filter for the Mustahsils we want to count
     *   }
     * })
    **/
    count<T extends MustahsilCountArgs>(
      args?: Subset<T, MustahsilCountArgs>,
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
     * @param {MustahsilGroupByArgs} args - Group by arguments.
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
      T extends MustahsilGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MustahsilGroupByArgs['orderBy'] }
        : { orderBy?: MustahsilGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MustahsilGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMustahsilGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mustahsil model
   */
  readonly fields: MustahsilFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mustahsil.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MustahsilClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    malKabulRecords<T extends Mustahsil$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Mustahsil$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Mustahsil model
   */
  interface MustahsilFieldRefs {
    readonly id: FieldRef<"Mustahsil", 'String'>
    readonly ad: FieldRef<"Mustahsil", 'String'>
    readonly soyad: FieldRef<"Mustahsil", 'String'>
    readonly dogumTarihi: FieldRef<"Mustahsil", 'DateTime'>
    readonly tcKimlikNo: FieldRef<"Mustahsil", 'String'>
    readonly mustahsilNo: FieldRef<"Mustahsil", 'String'>
    readonly iletisim: FieldRef<"Mustahsil", 'String'>
    readonly bankaAdi: FieldRef<"Mustahsil", 'String'>
    readonly ibanAdresi: FieldRef<"Mustahsil", 'String'>
    readonly adres: FieldRef<"Mustahsil", 'String'>
    readonly cinsiyet: FieldRef<"Mustahsil", 'Gender'>
    readonly durum: FieldRef<"Mustahsil", 'Status'>
    readonly createdAt: FieldRef<"Mustahsil", 'DateTime'>
    readonly updatedAt: FieldRef<"Mustahsil", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mustahsil findUnique
   */
  export type MustahsilFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * Filter, which Mustahsil to fetch.
     */
    where: MustahsilWhereUniqueInput
  }

  /**
   * Mustahsil findUniqueOrThrow
   */
  export type MustahsilFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * Filter, which Mustahsil to fetch.
     */
    where: MustahsilWhereUniqueInput
  }

  /**
   * Mustahsil findFirst
   */
  export type MustahsilFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * Filter, which Mustahsil to fetch.
     */
    where?: MustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mustahsils to fetch.
     */
    orderBy?: MustahsilOrderByWithRelationInput | MustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mustahsils.
     */
    cursor?: MustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mustahsils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mustahsils.
     */
    distinct?: MustahsilScalarFieldEnum | MustahsilScalarFieldEnum[]
  }

  /**
   * Mustahsil findFirstOrThrow
   */
  export type MustahsilFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * Filter, which Mustahsil to fetch.
     */
    where?: MustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mustahsils to fetch.
     */
    orderBy?: MustahsilOrderByWithRelationInput | MustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mustahsils.
     */
    cursor?: MustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mustahsils.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mustahsils.
     */
    distinct?: MustahsilScalarFieldEnum | MustahsilScalarFieldEnum[]
  }

  /**
   * Mustahsil findMany
   */
  export type MustahsilFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * Filter, which Mustahsils to fetch.
     */
    where?: MustahsilWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mustahsils to fetch.
     */
    orderBy?: MustahsilOrderByWithRelationInput | MustahsilOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mustahsils.
     */
    cursor?: MustahsilWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mustahsils from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mustahsils.
     */
    skip?: number
    distinct?: MustahsilScalarFieldEnum | MustahsilScalarFieldEnum[]
  }

  /**
   * Mustahsil create
   */
  export type MustahsilCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * The data needed to create a Mustahsil.
     */
    data: XOR<MustahsilCreateInput, MustahsilUncheckedCreateInput>
  }

  /**
   * Mustahsil createMany
   */
  export type MustahsilCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mustahsils.
     */
    data: MustahsilCreateManyInput | MustahsilCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mustahsil createManyAndReturn
   */
  export type MustahsilCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * The data used to create many Mustahsils.
     */
    data: MustahsilCreateManyInput | MustahsilCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mustahsil update
   */
  export type MustahsilUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * The data needed to update a Mustahsil.
     */
    data: XOR<MustahsilUpdateInput, MustahsilUncheckedUpdateInput>
    /**
     * Choose, which Mustahsil to update.
     */
    where: MustahsilWhereUniqueInput
  }

  /**
   * Mustahsil updateMany
   */
  export type MustahsilUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mustahsils.
     */
    data: XOR<MustahsilUpdateManyMutationInput, MustahsilUncheckedUpdateManyInput>
    /**
     * Filter which Mustahsils to update
     */
    where?: MustahsilWhereInput
    /**
     * Limit how many Mustahsils to update.
     */
    limit?: number
  }

  /**
   * Mustahsil updateManyAndReturn
   */
  export type MustahsilUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * The data used to update Mustahsils.
     */
    data: XOR<MustahsilUpdateManyMutationInput, MustahsilUncheckedUpdateManyInput>
    /**
     * Filter which Mustahsils to update
     */
    where?: MustahsilWhereInput
    /**
     * Limit how many Mustahsils to update.
     */
    limit?: number
  }

  /**
   * Mustahsil upsert
   */
  export type MustahsilUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * The filter to search for the Mustahsil to update in case it exists.
     */
    where: MustahsilWhereUniqueInput
    /**
     * In case the Mustahsil found by the `where` argument doesn't exist, create a new Mustahsil with this data.
     */
    create: XOR<MustahsilCreateInput, MustahsilUncheckedCreateInput>
    /**
     * In case the Mustahsil was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MustahsilUpdateInput, MustahsilUncheckedUpdateInput>
  }

  /**
   * Mustahsil delete
   */
  export type MustahsilDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    /**
     * Filter which Mustahsil to delete.
     */
    where: MustahsilWhereUniqueInput
  }

  /**
   * Mustahsil deleteMany
   */
  export type MustahsilDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mustahsils to delete
     */
    where?: MustahsilWhereInput
    /**
     * Limit how many Mustahsils to delete.
     */
    limit?: number
  }

  /**
   * Mustahsil.malKabulRecords
   */
  export type Mustahsil$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * Mustahsil without action
   */
  export type MustahsilDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
  }


  /**
   * Model Urun
   */

  export type AggregateUrun = {
    _count: UrunCountAggregateOutputType | null
    _min: UrunMinAggregateOutputType | null
    _max: UrunMaxAggregateOutputType | null
  }

  export type UrunMinAggregateOutputType = {
    id: string | null
    ad: string | null
    stokKodu: string | null
    kategori: string | null
    birim: string | null
    createdAt: Date | null
    updatedAt: Date | null
    durum: $Enums.Status | null
  }

  export type UrunMaxAggregateOutputType = {
    id: string | null
    ad: string | null
    stokKodu: string | null
    kategori: string | null
    birim: string | null
    createdAt: Date | null
    updatedAt: Date | null
    durum: $Enums.Status | null
  }

  export type UrunCountAggregateOutputType = {
    id: number
    ad: number
    stokKodu: number
    kategori: number
    birim: number
    createdAt: number
    updatedAt: number
    durum: number
    _all: number
  }


  export type UrunMinAggregateInputType = {
    id?: true
    ad?: true
    stokKodu?: true
    kategori?: true
    birim?: true
    createdAt?: true
    updatedAt?: true
    durum?: true
  }

  export type UrunMaxAggregateInputType = {
    id?: true
    ad?: true
    stokKodu?: true
    kategori?: true
    birim?: true
    createdAt?: true
    updatedAt?: true
    durum?: true
  }

  export type UrunCountAggregateInputType = {
    id?: true
    ad?: true
    stokKodu?: true
    kategori?: true
    birim?: true
    createdAt?: true
    updatedAt?: true
    durum?: true
    _all?: true
  }

  export type UrunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Urun to aggregate.
     */
    where?: UrunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Uruns to fetch.
     */
    orderBy?: UrunOrderByWithRelationInput | UrunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UrunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Uruns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Uruns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Uruns
    **/
    _count?: true | UrunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UrunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UrunMaxAggregateInputType
  }

  export type GetUrunAggregateType<T extends UrunAggregateArgs> = {
        [P in keyof T & keyof AggregateUrun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUrun[P]>
      : GetScalarType<T[P], AggregateUrun[P]>
  }




  export type UrunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UrunWhereInput
    orderBy?: UrunOrderByWithAggregationInput | UrunOrderByWithAggregationInput[]
    by: UrunScalarFieldEnum[] | UrunScalarFieldEnum
    having?: UrunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UrunCountAggregateInputType | true
    _min?: UrunMinAggregateInputType
    _max?: UrunMaxAggregateInputType
  }

  export type UrunGroupByOutputType = {
    id: string
    ad: string
    stokKodu: string
    kategori: string | null
    birim: string
    createdAt: Date
    updatedAt: Date
    durum: $Enums.Status
    _count: UrunCountAggregateOutputType | null
    _min: UrunMinAggregateOutputType | null
    _max: UrunMaxAggregateOutputType | null
  }

  type GetUrunGroupByPayload<T extends UrunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UrunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UrunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UrunGroupByOutputType[P]>
            : GetScalarType<T[P], UrunGroupByOutputType[P]>
        }
      >
    >


  export type UrunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    durum?: boolean
    malKabulRecords?: boolean | Urun$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | UrunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["urun"]>

  export type UrunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    durum?: boolean
  }, ExtArgs["result"]["urun"]>

  export type UrunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    durum?: boolean
  }, ExtArgs["result"]["urun"]>

  export type UrunSelectScalar = {
    id?: boolean
    ad?: boolean
    stokKodu?: boolean
    kategori?: boolean
    birim?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    durum?: boolean
  }

  export type UrunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "stokKodu" | "kategori" | "birim" | "createdAt" | "updatedAt" | "durum", ExtArgs["result"]["urun"]>
  export type UrunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | Urun$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | UrunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UrunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UrunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UrunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Urun"
    objects: {
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ad: string
      stokKodu: string
      kategori: string | null
      birim: string
      createdAt: Date
      updatedAt: Date
      durum: $Enums.Status
    }, ExtArgs["result"]["urun"]>
    composites: {}
  }

  type UrunGetPayload<S extends boolean | null | undefined | UrunDefaultArgs> = $Result.GetResult<Prisma.$UrunPayload, S>

  type UrunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UrunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UrunCountAggregateInputType | true
    }

  export interface UrunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Urun'], meta: { name: 'Urun' } }
    /**
     * Find zero or one Urun that matches the filter.
     * @param {UrunFindUniqueArgs} args - Arguments to find a Urun
     * @example
     * // Get one Urun
     * const urun = await prisma.urun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UrunFindUniqueArgs>(args: SelectSubset<T, UrunFindUniqueArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Urun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UrunFindUniqueOrThrowArgs} args - Arguments to find a Urun
     * @example
     * // Get one Urun
     * const urun = await prisma.urun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UrunFindUniqueOrThrowArgs>(args: SelectSubset<T, UrunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Urun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunFindFirstArgs} args - Arguments to find a Urun
     * @example
     * // Get one Urun
     * const urun = await prisma.urun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UrunFindFirstArgs>(args?: SelectSubset<T, UrunFindFirstArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Urun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunFindFirstOrThrowArgs} args - Arguments to find a Urun
     * @example
     * // Get one Urun
     * const urun = await prisma.urun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UrunFindFirstOrThrowArgs>(args?: SelectSubset<T, UrunFindFirstOrThrowArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Uruns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Uruns
     * const uruns = await prisma.urun.findMany()
     * 
     * // Get first 10 Uruns
     * const uruns = await prisma.urun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const urunWithIdOnly = await prisma.urun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UrunFindManyArgs>(args?: SelectSubset<T, UrunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Urun.
     * @param {UrunCreateArgs} args - Arguments to create a Urun.
     * @example
     * // Create one Urun
     * const Urun = await prisma.urun.create({
     *   data: {
     *     // ... data to create a Urun
     *   }
     * })
     * 
     */
    create<T extends UrunCreateArgs>(args: SelectSubset<T, UrunCreateArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Uruns.
     * @param {UrunCreateManyArgs} args - Arguments to create many Uruns.
     * @example
     * // Create many Uruns
     * const urun = await prisma.urun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UrunCreateManyArgs>(args?: SelectSubset<T, UrunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Uruns and returns the data saved in the database.
     * @param {UrunCreateManyAndReturnArgs} args - Arguments to create many Uruns.
     * @example
     * // Create many Uruns
     * const urun = await prisma.urun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Uruns and only return the `id`
     * const urunWithIdOnly = await prisma.urun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UrunCreateManyAndReturnArgs>(args?: SelectSubset<T, UrunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Urun.
     * @param {UrunDeleteArgs} args - Arguments to delete one Urun.
     * @example
     * // Delete one Urun
     * const Urun = await prisma.urun.delete({
     *   where: {
     *     // ... filter to delete one Urun
     *   }
     * })
     * 
     */
    delete<T extends UrunDeleteArgs>(args: SelectSubset<T, UrunDeleteArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Urun.
     * @param {UrunUpdateArgs} args - Arguments to update one Urun.
     * @example
     * // Update one Urun
     * const urun = await prisma.urun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UrunUpdateArgs>(args: SelectSubset<T, UrunUpdateArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Uruns.
     * @param {UrunDeleteManyArgs} args - Arguments to filter Uruns to delete.
     * @example
     * // Delete a few Uruns
     * const { count } = await prisma.urun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UrunDeleteManyArgs>(args?: SelectSubset<T, UrunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uruns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Uruns
     * const urun = await prisma.urun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UrunUpdateManyArgs>(args: SelectSubset<T, UrunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uruns and returns the data updated in the database.
     * @param {UrunUpdateManyAndReturnArgs} args - Arguments to update many Uruns.
     * @example
     * // Update many Uruns
     * const urun = await prisma.urun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Uruns and only return the `id`
     * const urunWithIdOnly = await prisma.urun.updateManyAndReturn({
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
    updateManyAndReturn<T extends UrunUpdateManyAndReturnArgs>(args: SelectSubset<T, UrunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Urun.
     * @param {UrunUpsertArgs} args - Arguments to update or create a Urun.
     * @example
     * // Update or create a Urun
     * const urun = await prisma.urun.upsert({
     *   create: {
     *     // ... data to create a Urun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Urun we want to update
     *   }
     * })
     */
    upsert<T extends UrunUpsertArgs>(args: SelectSubset<T, UrunUpsertArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Uruns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunCountArgs} args - Arguments to filter Uruns to count.
     * @example
     * // Count the number of Uruns
     * const count = await prisma.urun.count({
     *   where: {
     *     // ... the filter for the Uruns we want to count
     *   }
     * })
    **/
    count<T extends UrunCountArgs>(
      args?: Subset<T, UrunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UrunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Urun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UrunAggregateArgs>(args: Subset<T, UrunAggregateArgs>): Prisma.PrismaPromise<GetUrunAggregateType<T>>

    /**
     * Group by Urun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrunGroupByArgs} args - Group by arguments.
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
      T extends UrunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UrunGroupByArgs['orderBy'] }
        : { orderBy?: UrunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UrunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUrunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Urun model
   */
  readonly fields: UrunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Urun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UrunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    malKabulRecords<T extends Urun$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Urun$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Urun model
   */
  interface UrunFieldRefs {
    readonly id: FieldRef<"Urun", 'String'>
    readonly ad: FieldRef<"Urun", 'String'>
    readonly stokKodu: FieldRef<"Urun", 'String'>
    readonly kategori: FieldRef<"Urun", 'String'>
    readonly birim: FieldRef<"Urun", 'String'>
    readonly createdAt: FieldRef<"Urun", 'DateTime'>
    readonly updatedAt: FieldRef<"Urun", 'DateTime'>
    readonly durum: FieldRef<"Urun", 'Status'>
  }
    

  // Custom InputTypes
  /**
   * Urun findUnique
   */
  export type UrunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * Filter, which Urun to fetch.
     */
    where: UrunWhereUniqueInput
  }

  /**
   * Urun findUniqueOrThrow
   */
  export type UrunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * Filter, which Urun to fetch.
     */
    where: UrunWhereUniqueInput
  }

  /**
   * Urun findFirst
   */
  export type UrunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * Filter, which Urun to fetch.
     */
    where?: UrunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Uruns to fetch.
     */
    orderBy?: UrunOrderByWithRelationInput | UrunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Uruns.
     */
    cursor?: UrunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Uruns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Uruns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Uruns.
     */
    distinct?: UrunScalarFieldEnum | UrunScalarFieldEnum[]
  }

  /**
   * Urun findFirstOrThrow
   */
  export type UrunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * Filter, which Urun to fetch.
     */
    where?: UrunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Uruns to fetch.
     */
    orderBy?: UrunOrderByWithRelationInput | UrunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Uruns.
     */
    cursor?: UrunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Uruns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Uruns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Uruns.
     */
    distinct?: UrunScalarFieldEnum | UrunScalarFieldEnum[]
  }

  /**
   * Urun findMany
   */
  export type UrunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * Filter, which Uruns to fetch.
     */
    where?: UrunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Uruns to fetch.
     */
    orderBy?: UrunOrderByWithRelationInput | UrunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Uruns.
     */
    cursor?: UrunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Uruns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Uruns.
     */
    skip?: number
    distinct?: UrunScalarFieldEnum | UrunScalarFieldEnum[]
  }

  /**
   * Urun create
   */
  export type UrunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * The data needed to create a Urun.
     */
    data: XOR<UrunCreateInput, UrunUncheckedCreateInput>
  }

  /**
   * Urun createMany
   */
  export type UrunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Uruns.
     */
    data: UrunCreateManyInput | UrunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Urun createManyAndReturn
   */
  export type UrunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * The data used to create many Uruns.
     */
    data: UrunCreateManyInput | UrunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Urun update
   */
  export type UrunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * The data needed to update a Urun.
     */
    data: XOR<UrunUpdateInput, UrunUncheckedUpdateInput>
    /**
     * Choose, which Urun to update.
     */
    where: UrunWhereUniqueInput
  }

  /**
   * Urun updateMany
   */
  export type UrunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Uruns.
     */
    data: XOR<UrunUpdateManyMutationInput, UrunUncheckedUpdateManyInput>
    /**
     * Filter which Uruns to update
     */
    where?: UrunWhereInput
    /**
     * Limit how many Uruns to update.
     */
    limit?: number
  }

  /**
   * Urun updateManyAndReturn
   */
  export type UrunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * The data used to update Uruns.
     */
    data: XOR<UrunUpdateManyMutationInput, UrunUncheckedUpdateManyInput>
    /**
     * Filter which Uruns to update
     */
    where?: UrunWhereInput
    /**
     * Limit how many Uruns to update.
     */
    limit?: number
  }

  /**
   * Urun upsert
   */
  export type UrunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * The filter to search for the Urun to update in case it exists.
     */
    where: UrunWhereUniqueInput
    /**
     * In case the Urun found by the `where` argument doesn't exist, create a new Urun with this data.
     */
    create: XOR<UrunCreateInput, UrunUncheckedCreateInput>
    /**
     * In case the Urun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UrunUpdateInput, UrunUncheckedUpdateInput>
  }

  /**
   * Urun delete
   */
  export type UrunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
    /**
     * Filter which Urun to delete.
     */
    where: UrunWhereUniqueInput
  }

  /**
   * Urun deleteMany
   */
  export type UrunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Uruns to delete
     */
    where?: UrunWhereInput
    /**
     * Limit how many Uruns to delete.
     */
    limit?: number
  }

  /**
   * Urun.malKabulRecords
   */
  export type Urun$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * Urun without action
   */
  export type UrunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urun
     */
    select?: UrunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urun
     */
    omit?: UrunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UrunInclude<ExtArgs> | null
  }


  /**
   * Model Ambalaj
   */

  export type AggregateAmbalaj = {
    _count: AmbalajCountAggregateOutputType | null
    _avg: AmbalajAvgAggregateOutputType | null
    _sum: AmbalajSumAggregateOutputType | null
    _min: AmbalajMinAggregateOutputType | null
    _max: AmbalajMaxAggregateOutputType | null
  }

  export type AmbalajAvgAggregateOutputType = {
    daraKg: number | null
  }

  export type AmbalajSumAggregateOutputType = {
    daraKg: number | null
  }

  export type AmbalajMinAggregateOutputType = {
    id: string | null
    ad: string | null
    tipi: $Enums.AmbalajTipi | null
    daraKg: number | null
    aciklama: string | null
    durum: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AmbalajMaxAggregateOutputType = {
    id: string | null
    ad: string | null
    tipi: $Enums.AmbalajTipi | null
    daraKg: number | null
    aciklama: string | null
    durum: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AmbalajCountAggregateOutputType = {
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


  export type AmbalajAvgAggregateInputType = {
    daraKg?: true
  }

  export type AmbalajSumAggregateInputType = {
    daraKg?: true
  }

  export type AmbalajMinAggregateInputType = {
    id?: true
    ad?: true
    tipi?: true
    daraKg?: true
    aciklama?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AmbalajMaxAggregateInputType = {
    id?: true
    ad?: true
    tipi?: true
    daraKg?: true
    aciklama?: true
    durum?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AmbalajCountAggregateInputType = {
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

  export type AmbalajAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ambalaj to aggregate.
     */
    where?: AmbalajWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ambalajs to fetch.
     */
    orderBy?: AmbalajOrderByWithRelationInput | AmbalajOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AmbalajWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ambalajs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ambalajs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ambalajs
    **/
    _count?: true | AmbalajCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AmbalajAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AmbalajSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AmbalajMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AmbalajMaxAggregateInputType
  }

  export type GetAmbalajAggregateType<T extends AmbalajAggregateArgs> = {
        [P in keyof T & keyof AggregateAmbalaj]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAmbalaj[P]>
      : GetScalarType<T[P], AggregateAmbalaj[P]>
  }




  export type AmbalajGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AmbalajWhereInput
    orderBy?: AmbalajOrderByWithAggregationInput | AmbalajOrderByWithAggregationInput[]
    by: AmbalajScalarFieldEnum[] | AmbalajScalarFieldEnum
    having?: AmbalajScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AmbalajCountAggregateInputType | true
    _avg?: AmbalajAvgAggregateInputType
    _sum?: AmbalajSumAggregateInputType
    _min?: AmbalajMinAggregateInputType
    _max?: AmbalajMaxAggregateInputType
  }

  export type AmbalajGroupByOutputType = {
    id: string
    ad: string
    tipi: $Enums.AmbalajTipi
    daraKg: number
    aciklama: string | null
    durum: $Enums.Status
    createdAt: Date
    updatedAt: Date
    _count: AmbalajCountAggregateOutputType | null
    _avg: AmbalajAvgAggregateOutputType | null
    _sum: AmbalajSumAggregateOutputType | null
    _min: AmbalajMinAggregateOutputType | null
    _max: AmbalajMaxAggregateOutputType | null
  }

  type GetAmbalajGroupByPayload<T extends AmbalajGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AmbalajGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AmbalajGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AmbalajGroupByOutputType[P]>
            : GetScalarType<T[P], AmbalajGroupByOutputType[P]>
        }
      >
    >


  export type AmbalajSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    malKabulRecords?: boolean | Ambalaj$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | AmbalajCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ambalaj"]>

  export type AmbalajSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ambalaj"]>

  export type AmbalajSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ambalaj"]>

  export type AmbalajSelectScalar = {
    id?: boolean
    ad?: boolean
    tipi?: boolean
    daraKg?: boolean
    aciklama?: boolean
    durum?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AmbalajOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ad" | "tipi" | "daraKg" | "aciklama" | "durum" | "createdAt" | "updatedAt", ExtArgs["result"]["ambalaj"]>
  export type AmbalajInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    malKabulRecords?: boolean | Ambalaj$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | AmbalajCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AmbalajIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AmbalajIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AmbalajPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ambalaj"
    objects: {
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ad: string
      tipi: $Enums.AmbalajTipi
      daraKg: number
      aciklama: string | null
      durum: $Enums.Status
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ambalaj"]>
    composites: {}
  }

  type AmbalajGetPayload<S extends boolean | null | undefined | AmbalajDefaultArgs> = $Result.GetResult<Prisma.$AmbalajPayload, S>

  type AmbalajCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AmbalajFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AmbalajCountAggregateInputType | true
    }

  export interface AmbalajDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ambalaj'], meta: { name: 'Ambalaj' } }
    /**
     * Find zero or one Ambalaj that matches the filter.
     * @param {AmbalajFindUniqueArgs} args - Arguments to find a Ambalaj
     * @example
     * // Get one Ambalaj
     * const ambalaj = await prisma.ambalaj.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AmbalajFindUniqueArgs>(args: SelectSubset<T, AmbalajFindUniqueArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ambalaj that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AmbalajFindUniqueOrThrowArgs} args - Arguments to find a Ambalaj
     * @example
     * // Get one Ambalaj
     * const ambalaj = await prisma.ambalaj.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AmbalajFindUniqueOrThrowArgs>(args: SelectSubset<T, AmbalajFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ambalaj that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajFindFirstArgs} args - Arguments to find a Ambalaj
     * @example
     * // Get one Ambalaj
     * const ambalaj = await prisma.ambalaj.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AmbalajFindFirstArgs>(args?: SelectSubset<T, AmbalajFindFirstArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ambalaj that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajFindFirstOrThrowArgs} args - Arguments to find a Ambalaj
     * @example
     * // Get one Ambalaj
     * const ambalaj = await prisma.ambalaj.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AmbalajFindFirstOrThrowArgs>(args?: SelectSubset<T, AmbalajFindFirstOrThrowArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ambalajs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ambalajs
     * const ambalajs = await prisma.ambalaj.findMany()
     * 
     * // Get first 10 Ambalajs
     * const ambalajs = await prisma.ambalaj.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ambalajWithIdOnly = await prisma.ambalaj.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AmbalajFindManyArgs>(args?: SelectSubset<T, AmbalajFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ambalaj.
     * @param {AmbalajCreateArgs} args - Arguments to create a Ambalaj.
     * @example
     * // Create one Ambalaj
     * const Ambalaj = await prisma.ambalaj.create({
     *   data: {
     *     // ... data to create a Ambalaj
     *   }
     * })
     * 
     */
    create<T extends AmbalajCreateArgs>(args: SelectSubset<T, AmbalajCreateArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ambalajs.
     * @param {AmbalajCreateManyArgs} args - Arguments to create many Ambalajs.
     * @example
     * // Create many Ambalajs
     * const ambalaj = await prisma.ambalaj.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AmbalajCreateManyArgs>(args?: SelectSubset<T, AmbalajCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ambalajs and returns the data saved in the database.
     * @param {AmbalajCreateManyAndReturnArgs} args - Arguments to create many Ambalajs.
     * @example
     * // Create many Ambalajs
     * const ambalaj = await prisma.ambalaj.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ambalajs and only return the `id`
     * const ambalajWithIdOnly = await prisma.ambalaj.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AmbalajCreateManyAndReturnArgs>(args?: SelectSubset<T, AmbalajCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ambalaj.
     * @param {AmbalajDeleteArgs} args - Arguments to delete one Ambalaj.
     * @example
     * // Delete one Ambalaj
     * const Ambalaj = await prisma.ambalaj.delete({
     *   where: {
     *     // ... filter to delete one Ambalaj
     *   }
     * })
     * 
     */
    delete<T extends AmbalajDeleteArgs>(args: SelectSubset<T, AmbalajDeleteArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ambalaj.
     * @param {AmbalajUpdateArgs} args - Arguments to update one Ambalaj.
     * @example
     * // Update one Ambalaj
     * const ambalaj = await prisma.ambalaj.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AmbalajUpdateArgs>(args: SelectSubset<T, AmbalajUpdateArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ambalajs.
     * @param {AmbalajDeleteManyArgs} args - Arguments to filter Ambalajs to delete.
     * @example
     * // Delete a few Ambalajs
     * const { count } = await prisma.ambalaj.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AmbalajDeleteManyArgs>(args?: SelectSubset<T, AmbalajDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ambalajs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ambalajs
     * const ambalaj = await prisma.ambalaj.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AmbalajUpdateManyArgs>(args: SelectSubset<T, AmbalajUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ambalajs and returns the data updated in the database.
     * @param {AmbalajUpdateManyAndReturnArgs} args - Arguments to update many Ambalajs.
     * @example
     * // Update many Ambalajs
     * const ambalaj = await prisma.ambalaj.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ambalajs and only return the `id`
     * const ambalajWithIdOnly = await prisma.ambalaj.updateManyAndReturn({
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
    updateManyAndReturn<T extends AmbalajUpdateManyAndReturnArgs>(args: SelectSubset<T, AmbalajUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ambalaj.
     * @param {AmbalajUpsertArgs} args - Arguments to update or create a Ambalaj.
     * @example
     * // Update or create a Ambalaj
     * const ambalaj = await prisma.ambalaj.upsert({
     *   create: {
     *     // ... data to create a Ambalaj
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ambalaj we want to update
     *   }
     * })
     */
    upsert<T extends AmbalajUpsertArgs>(args: SelectSubset<T, AmbalajUpsertArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ambalajs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajCountArgs} args - Arguments to filter Ambalajs to count.
     * @example
     * // Count the number of Ambalajs
     * const count = await prisma.ambalaj.count({
     *   where: {
     *     // ... the filter for the Ambalajs we want to count
     *   }
     * })
    **/
    count<T extends AmbalajCountArgs>(
      args?: Subset<T, AmbalajCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AmbalajCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ambalaj.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AmbalajAggregateArgs>(args: Subset<T, AmbalajAggregateArgs>): Prisma.PrismaPromise<GetAmbalajAggregateType<T>>

    /**
     * Group by Ambalaj.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmbalajGroupByArgs} args - Group by arguments.
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
      T extends AmbalajGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AmbalajGroupByArgs['orderBy'] }
        : { orderBy?: AmbalajGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AmbalajGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAmbalajGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ambalaj model
   */
  readonly fields: AmbalajFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ambalaj.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AmbalajClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    malKabulRecords<T extends Ambalaj$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Ambalaj$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Ambalaj model
   */
  interface AmbalajFieldRefs {
    readonly id: FieldRef<"Ambalaj", 'String'>
    readonly ad: FieldRef<"Ambalaj", 'String'>
    readonly tipi: FieldRef<"Ambalaj", 'AmbalajTipi'>
    readonly daraKg: FieldRef<"Ambalaj", 'Float'>
    readonly aciklama: FieldRef<"Ambalaj", 'String'>
    readonly durum: FieldRef<"Ambalaj", 'Status'>
    readonly createdAt: FieldRef<"Ambalaj", 'DateTime'>
    readonly updatedAt: FieldRef<"Ambalaj", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ambalaj findUnique
   */
  export type AmbalajFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * Filter, which Ambalaj to fetch.
     */
    where: AmbalajWhereUniqueInput
  }

  /**
   * Ambalaj findUniqueOrThrow
   */
  export type AmbalajFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * Filter, which Ambalaj to fetch.
     */
    where: AmbalajWhereUniqueInput
  }

  /**
   * Ambalaj findFirst
   */
  export type AmbalajFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * Filter, which Ambalaj to fetch.
     */
    where?: AmbalajWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ambalajs to fetch.
     */
    orderBy?: AmbalajOrderByWithRelationInput | AmbalajOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ambalajs.
     */
    cursor?: AmbalajWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ambalajs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ambalajs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ambalajs.
     */
    distinct?: AmbalajScalarFieldEnum | AmbalajScalarFieldEnum[]
  }

  /**
   * Ambalaj findFirstOrThrow
   */
  export type AmbalajFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * Filter, which Ambalaj to fetch.
     */
    where?: AmbalajWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ambalajs to fetch.
     */
    orderBy?: AmbalajOrderByWithRelationInput | AmbalajOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ambalajs.
     */
    cursor?: AmbalajWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ambalajs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ambalajs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ambalajs.
     */
    distinct?: AmbalajScalarFieldEnum | AmbalajScalarFieldEnum[]
  }

  /**
   * Ambalaj findMany
   */
  export type AmbalajFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * Filter, which Ambalajs to fetch.
     */
    where?: AmbalajWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ambalajs to fetch.
     */
    orderBy?: AmbalajOrderByWithRelationInput | AmbalajOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ambalajs.
     */
    cursor?: AmbalajWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ambalajs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ambalajs.
     */
    skip?: number
    distinct?: AmbalajScalarFieldEnum | AmbalajScalarFieldEnum[]
  }

  /**
   * Ambalaj create
   */
  export type AmbalajCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * The data needed to create a Ambalaj.
     */
    data: XOR<AmbalajCreateInput, AmbalajUncheckedCreateInput>
  }

  /**
   * Ambalaj createMany
   */
  export type AmbalajCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ambalajs.
     */
    data: AmbalajCreateManyInput | AmbalajCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ambalaj createManyAndReturn
   */
  export type AmbalajCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * The data used to create many Ambalajs.
     */
    data: AmbalajCreateManyInput | AmbalajCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ambalaj update
   */
  export type AmbalajUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * The data needed to update a Ambalaj.
     */
    data: XOR<AmbalajUpdateInput, AmbalajUncheckedUpdateInput>
    /**
     * Choose, which Ambalaj to update.
     */
    where: AmbalajWhereUniqueInput
  }

  /**
   * Ambalaj updateMany
   */
  export type AmbalajUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ambalajs.
     */
    data: XOR<AmbalajUpdateManyMutationInput, AmbalajUncheckedUpdateManyInput>
    /**
     * Filter which Ambalajs to update
     */
    where?: AmbalajWhereInput
    /**
     * Limit how many Ambalajs to update.
     */
    limit?: number
  }

  /**
   * Ambalaj updateManyAndReturn
   */
  export type AmbalajUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * The data used to update Ambalajs.
     */
    data: XOR<AmbalajUpdateManyMutationInput, AmbalajUncheckedUpdateManyInput>
    /**
     * Filter which Ambalajs to update
     */
    where?: AmbalajWhereInput
    /**
     * Limit how many Ambalajs to update.
     */
    limit?: number
  }

  /**
   * Ambalaj upsert
   */
  export type AmbalajUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * The filter to search for the Ambalaj to update in case it exists.
     */
    where: AmbalajWhereUniqueInput
    /**
     * In case the Ambalaj found by the `where` argument doesn't exist, create a new Ambalaj with this data.
     */
    create: XOR<AmbalajCreateInput, AmbalajUncheckedCreateInput>
    /**
     * In case the Ambalaj was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AmbalajUpdateInput, AmbalajUncheckedUpdateInput>
  }

  /**
   * Ambalaj delete
   */
  export type AmbalajDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    /**
     * Filter which Ambalaj to delete.
     */
    where: AmbalajWhereUniqueInput
  }

  /**
   * Ambalaj deleteMany
   */
  export type AmbalajDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ambalajs to delete
     */
    where?: AmbalajWhereInput
    /**
     * Limit how many Ambalajs to delete.
     */
    limit?: number
  }

  /**
   * Ambalaj.malKabulRecords
   */
  export type Ambalaj$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * Ambalaj without action
   */
  export type AmbalajDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
  }


  /**
   * Model MalKabulRecord
   */

  export type AggregateMalKabulRecord = {
    _count: MalKabulRecordCountAggregateOutputType | null
    _avg: MalKabulRecordAvgAggregateOutputType | null
    _sum: MalKabulRecordSumAggregateOutputType | null
    _min: MalKabulRecordMinAggregateOutputType | null
    _max: MalKabulRecordMaxAggregateOutputType | null
  }

  export type MalKabulRecordAvgAggregateOutputType = {
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type MalKabulRecordSumAggregateOutputType = {
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type MalKabulRecordMinAggregateOutputType = {
    id: string | null
    tarih: Date | null
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    status: $Enums.ProductStatus | null
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
    saticiTipi: $Enums.SaticiTipi | null
    ambalajId: string | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type MalKabulRecordMaxAggregateOutputType = {
    id: string | null
    tarih: Date | null
    miktar: number | null
    birimFiyat: number | null
    toplamFiyat: number | null
    status: $Enums.ProductStatus | null
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
    saticiTipi: $Enums.SaticiTipi | null
    ambalajId: string | null
    paletSayisi: number | null
    kasaSayisi: number | null
    brutKg: number | null
    daraKg: number | null
    girisKg: number | null
    cikmaFireKg: number | null
    netKg: number | null
  }

  export type MalKabulRecordCountAggregateOutputType = {
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
    cikmaFireKg: number
    netKg: number
    _all: number
  }


  export type MalKabulRecordAvgAggregateInputType = {
    miktar?: true
    birimFiyat?: true
    toplamFiyat?: true
    paletSayisi?: true
    kasaSayisi?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaFireKg?: true
    netKg?: true
  }

  export type MalKabulRecordSumAggregateInputType = {
    miktar?: true
    birimFiyat?: true
    toplamFiyat?: true
    paletSayisi?: true
    kasaSayisi?: true
    brutKg?: true
    daraKg?: true
    girisKg?: true
    cikmaFireKg?: true
    netKg?: true
  }

  export type MalKabulRecordMinAggregateInputType = {
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
    cikmaFireKg?: true
    netKg?: true
  }

  export type MalKabulRecordMaxAggregateInputType = {
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
    cikmaFireKg?: true
    netKg?: true
  }

  export type MalKabulRecordCountAggregateInputType = {
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
    cikmaFireKg?: true
    netKg?: true
    _all?: true
  }

  export type MalKabulRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MalKabulRecord to aggregate.
     */
    where?: MalKabulRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MalKabulRecords to fetch.
     */
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MalKabulRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MalKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MalKabulRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MalKabulRecords
    **/
    _count?: true | MalKabulRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MalKabulRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MalKabulRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MalKabulRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MalKabulRecordMaxAggregateInputType
  }

  export type GetMalKabulRecordAggregateType<T extends MalKabulRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateMalKabulRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMalKabulRecord[P]>
      : GetScalarType<T[P], AggregateMalKabulRecord[P]>
  }




  export type MalKabulRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithAggregationInput | MalKabulRecordOrderByWithAggregationInput[]
    by: MalKabulRecordScalarFieldEnum[] | MalKabulRecordScalarFieldEnum
    having?: MalKabulRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MalKabulRecordCountAggregateInputType | true
    _avg?: MalKabulRecordAvgAggregateInputType
    _sum?: MalKabulRecordSumAggregateInputType
    _min?: MalKabulRecordMinAggregateInputType
    _max?: MalKabulRecordMaxAggregateInputType
  }

  export type MalKabulRecordGroupByOutputType = {
    id: string
    tarih: Date
    miktar: number
    birimFiyat: number | null
    toplamFiyat: number | null
    status: $Enums.ProductStatus
    notlar: string | null
    malKabulcuId: string
    komisyoncuId: string | null
    ureticiId: string | null
    urunId: string
    faturaId: string | null
    createdAt: Date
    updatedAt: Date
    fisNo: string
    mustahsilId: string | null
    ozelFirmaId: string | null
    saticiTipi: $Enums.SaticiTipi
    ambalajId: string | null
    paletSayisi: number
    kasaSayisi: number
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaFireKg: number
    netKg: number
    _count: MalKabulRecordCountAggregateOutputType | null
    _avg: MalKabulRecordAvgAggregateOutputType | null
    _sum: MalKabulRecordSumAggregateOutputType | null
    _min: MalKabulRecordMinAggregateOutputType | null
    _max: MalKabulRecordMaxAggregateOutputType | null
  }

  type GetMalKabulRecordGroupByPayload<T extends MalKabulRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MalKabulRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MalKabulRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MalKabulRecordGroupByOutputType[P]>
            : GetScalarType<T[P], MalKabulRecordGroupByOutputType[P]>
        }
      >
    >


  export type MalKabulRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    cikmaFireKg?: boolean
    netKg?: boolean
    ambalaj?: boolean | MalKabulRecord$ambalajArgs<ExtArgs>
    fatura?: boolean | MalKabulRecord$faturaArgs<ExtArgs>
    komisyoncu?: boolean | MalKabulRecord$komisyoncuArgs<ExtArgs>
    malKabulcu?: boolean | UserDefaultArgs<ExtArgs>
    mustahsil?: boolean | MalKabulRecord$mustahsilArgs<ExtArgs>
    ozelFirma?: boolean | MalKabulRecord$ozelFirmaArgs<ExtArgs>
    uretici?: boolean | MalKabulRecord$ureticiArgs<ExtArgs>
    urun?: boolean | UrunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["malKabulRecord"]>

  export type MalKabulRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    cikmaFireKg?: boolean
    netKg?: boolean
    ambalaj?: boolean | MalKabulRecord$ambalajArgs<ExtArgs>
    fatura?: boolean | MalKabulRecord$faturaArgs<ExtArgs>
    komisyoncu?: boolean | MalKabulRecord$komisyoncuArgs<ExtArgs>
    malKabulcu?: boolean | UserDefaultArgs<ExtArgs>
    mustahsil?: boolean | MalKabulRecord$mustahsilArgs<ExtArgs>
    ozelFirma?: boolean | MalKabulRecord$ozelFirmaArgs<ExtArgs>
    uretici?: boolean | MalKabulRecord$ureticiArgs<ExtArgs>
    urun?: boolean | UrunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["malKabulRecord"]>

  export type MalKabulRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    cikmaFireKg?: boolean
    netKg?: boolean
    ambalaj?: boolean | MalKabulRecord$ambalajArgs<ExtArgs>
    fatura?: boolean | MalKabulRecord$faturaArgs<ExtArgs>
    komisyoncu?: boolean | MalKabulRecord$komisyoncuArgs<ExtArgs>
    malKabulcu?: boolean | UserDefaultArgs<ExtArgs>
    mustahsil?: boolean | MalKabulRecord$mustahsilArgs<ExtArgs>
    ozelFirma?: boolean | MalKabulRecord$ozelFirmaArgs<ExtArgs>
    uretici?: boolean | MalKabulRecord$ureticiArgs<ExtArgs>
    urun?: boolean | UrunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["malKabulRecord"]>

  export type MalKabulRecordSelectScalar = {
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
    cikmaFireKg?: boolean
    netKg?: boolean
  }

  export type MalKabulRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tarih" | "miktar" | "birimFiyat" | "toplamFiyat" | "status" | "notlar" | "malKabulcuId" | "komisyoncuId" | "ureticiId" | "urunId" | "faturaId" | "createdAt" | "updatedAt" | "fisNo" | "mustahsilId" | "ozelFirmaId" | "saticiTipi" | "ambalajId" | "paletSayisi" | "kasaSayisi" | "brutKg" | "daraKg" | "girisKg" | "cikmaFireKg" | "netKg", ExtArgs["result"]["malKabulRecord"]>
  export type MalKabulRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ambalaj?: boolean | MalKabulRecord$ambalajArgs<ExtArgs>
    fatura?: boolean | MalKabulRecord$faturaArgs<ExtArgs>
    komisyoncu?: boolean | MalKabulRecord$komisyoncuArgs<ExtArgs>
    malKabulcu?: boolean | UserDefaultArgs<ExtArgs>
    mustahsil?: boolean | MalKabulRecord$mustahsilArgs<ExtArgs>
    ozelFirma?: boolean | MalKabulRecord$ozelFirmaArgs<ExtArgs>
    uretici?: boolean | MalKabulRecord$ureticiArgs<ExtArgs>
    urun?: boolean | UrunDefaultArgs<ExtArgs>
  }
  export type MalKabulRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ambalaj?: boolean | MalKabulRecord$ambalajArgs<ExtArgs>
    fatura?: boolean | MalKabulRecord$faturaArgs<ExtArgs>
    komisyoncu?: boolean | MalKabulRecord$komisyoncuArgs<ExtArgs>
    malKabulcu?: boolean | UserDefaultArgs<ExtArgs>
    mustahsil?: boolean | MalKabulRecord$mustahsilArgs<ExtArgs>
    ozelFirma?: boolean | MalKabulRecord$ozelFirmaArgs<ExtArgs>
    uretici?: boolean | MalKabulRecord$ureticiArgs<ExtArgs>
    urun?: boolean | UrunDefaultArgs<ExtArgs>
  }
  export type MalKabulRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ambalaj?: boolean | MalKabulRecord$ambalajArgs<ExtArgs>
    fatura?: boolean | MalKabulRecord$faturaArgs<ExtArgs>
    komisyoncu?: boolean | MalKabulRecord$komisyoncuArgs<ExtArgs>
    malKabulcu?: boolean | UserDefaultArgs<ExtArgs>
    mustahsil?: boolean | MalKabulRecord$mustahsilArgs<ExtArgs>
    ozelFirma?: boolean | MalKabulRecord$ozelFirmaArgs<ExtArgs>
    uretici?: boolean | MalKabulRecord$ureticiArgs<ExtArgs>
    urun?: boolean | UrunDefaultArgs<ExtArgs>
  }

  export type $MalKabulRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MalKabulRecord"
    objects: {
      ambalaj: Prisma.$AmbalajPayload<ExtArgs> | null
      fatura: Prisma.$FaturaPayload<ExtArgs> | null
      komisyoncu: Prisma.$KomisyoncuPayload<ExtArgs> | null
      malKabulcu: Prisma.$UserPayload<ExtArgs>
      mustahsil: Prisma.$MustahsilPayload<ExtArgs> | null
      ozelFirma: Prisma.$OzelFirmaPayload<ExtArgs> | null
      uretici: Prisma.$UreticiPayload<ExtArgs> | null
      urun: Prisma.$UrunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tarih: Date
      miktar: number
      birimFiyat: number | null
      toplamFiyat: number | null
      status: $Enums.ProductStatus
      notlar: string | null
      malKabulcuId: string
      komisyoncuId: string | null
      ureticiId: string | null
      urunId: string
      faturaId: string | null
      createdAt: Date
      updatedAt: Date
      fisNo: string
      mustahsilId: string | null
      ozelFirmaId: string | null
      saticiTipi: $Enums.SaticiTipi
      ambalajId: string | null
      paletSayisi: number
      kasaSayisi: number
      brutKg: number
      daraKg: number
      girisKg: number
      cikmaFireKg: number
      netKg: number
    }, ExtArgs["result"]["malKabulRecord"]>
    composites: {}
  }

  type MalKabulRecordGetPayload<S extends boolean | null | undefined | MalKabulRecordDefaultArgs> = $Result.GetResult<Prisma.$MalKabulRecordPayload, S>

  type MalKabulRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MalKabulRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MalKabulRecordCountAggregateInputType | true
    }

  export interface MalKabulRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MalKabulRecord'], meta: { name: 'MalKabulRecord' } }
    /**
     * Find zero or one MalKabulRecord that matches the filter.
     * @param {MalKabulRecordFindUniqueArgs} args - Arguments to find a MalKabulRecord
     * @example
     * // Get one MalKabulRecord
     * const malKabulRecord = await prisma.malKabulRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MalKabulRecordFindUniqueArgs>(args: SelectSubset<T, MalKabulRecordFindUniqueArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MalKabulRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MalKabulRecordFindUniqueOrThrowArgs} args - Arguments to find a MalKabulRecord
     * @example
     * // Get one MalKabulRecord
     * const malKabulRecord = await prisma.malKabulRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MalKabulRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, MalKabulRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MalKabulRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordFindFirstArgs} args - Arguments to find a MalKabulRecord
     * @example
     * // Get one MalKabulRecord
     * const malKabulRecord = await prisma.malKabulRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MalKabulRecordFindFirstArgs>(args?: SelectSubset<T, MalKabulRecordFindFirstArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MalKabulRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordFindFirstOrThrowArgs} args - Arguments to find a MalKabulRecord
     * @example
     * // Get one MalKabulRecord
     * const malKabulRecord = await prisma.malKabulRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MalKabulRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, MalKabulRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MalKabulRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecord.findMany()
     * 
     * // Get first 10 MalKabulRecords
     * const malKabulRecords = await prisma.malKabulRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const malKabulRecordWithIdOnly = await prisma.malKabulRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MalKabulRecordFindManyArgs>(args?: SelectSubset<T, MalKabulRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MalKabulRecord.
     * @param {MalKabulRecordCreateArgs} args - Arguments to create a MalKabulRecord.
     * @example
     * // Create one MalKabulRecord
     * const MalKabulRecord = await prisma.malKabulRecord.create({
     *   data: {
     *     // ... data to create a MalKabulRecord
     *   }
     * })
     * 
     */
    create<T extends MalKabulRecordCreateArgs>(args: SelectSubset<T, MalKabulRecordCreateArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MalKabulRecords.
     * @param {MalKabulRecordCreateManyArgs} args - Arguments to create many MalKabulRecords.
     * @example
     * // Create many MalKabulRecords
     * const malKabulRecord = await prisma.malKabulRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MalKabulRecordCreateManyArgs>(args?: SelectSubset<T, MalKabulRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MalKabulRecords and returns the data saved in the database.
     * @param {MalKabulRecordCreateManyAndReturnArgs} args - Arguments to create many MalKabulRecords.
     * @example
     * // Create many MalKabulRecords
     * const malKabulRecord = await prisma.malKabulRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MalKabulRecords and only return the `id`
     * const malKabulRecordWithIdOnly = await prisma.malKabulRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MalKabulRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, MalKabulRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MalKabulRecord.
     * @param {MalKabulRecordDeleteArgs} args - Arguments to delete one MalKabulRecord.
     * @example
     * // Delete one MalKabulRecord
     * const MalKabulRecord = await prisma.malKabulRecord.delete({
     *   where: {
     *     // ... filter to delete one MalKabulRecord
     *   }
     * })
     * 
     */
    delete<T extends MalKabulRecordDeleteArgs>(args: SelectSubset<T, MalKabulRecordDeleteArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MalKabulRecord.
     * @param {MalKabulRecordUpdateArgs} args - Arguments to update one MalKabulRecord.
     * @example
     * // Update one MalKabulRecord
     * const malKabulRecord = await prisma.malKabulRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MalKabulRecordUpdateArgs>(args: SelectSubset<T, MalKabulRecordUpdateArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MalKabulRecords.
     * @param {MalKabulRecordDeleteManyArgs} args - Arguments to filter MalKabulRecords to delete.
     * @example
     * // Delete a few MalKabulRecords
     * const { count } = await prisma.malKabulRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MalKabulRecordDeleteManyArgs>(args?: SelectSubset<T, MalKabulRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MalKabulRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MalKabulRecords
     * const malKabulRecord = await prisma.malKabulRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MalKabulRecordUpdateManyArgs>(args: SelectSubset<T, MalKabulRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MalKabulRecords and returns the data updated in the database.
     * @param {MalKabulRecordUpdateManyAndReturnArgs} args - Arguments to update many MalKabulRecords.
     * @example
     * // Update many MalKabulRecords
     * const malKabulRecord = await prisma.malKabulRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MalKabulRecords and only return the `id`
     * const malKabulRecordWithIdOnly = await prisma.malKabulRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends MalKabulRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, MalKabulRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MalKabulRecord.
     * @param {MalKabulRecordUpsertArgs} args - Arguments to update or create a MalKabulRecord.
     * @example
     * // Update or create a MalKabulRecord
     * const malKabulRecord = await prisma.malKabulRecord.upsert({
     *   create: {
     *     // ... data to create a MalKabulRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MalKabulRecord we want to update
     *   }
     * })
     */
    upsert<T extends MalKabulRecordUpsertArgs>(args: SelectSubset<T, MalKabulRecordUpsertArgs<ExtArgs>>): Prisma__MalKabulRecordClient<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MalKabulRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordCountArgs} args - Arguments to filter MalKabulRecords to count.
     * @example
     * // Count the number of MalKabulRecords
     * const count = await prisma.malKabulRecord.count({
     *   where: {
     *     // ... the filter for the MalKabulRecords we want to count
     *   }
     * })
    **/
    count<T extends MalKabulRecordCountArgs>(
      args?: Subset<T, MalKabulRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MalKabulRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MalKabulRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MalKabulRecordAggregateArgs>(args: Subset<T, MalKabulRecordAggregateArgs>): Prisma.PrismaPromise<GetMalKabulRecordAggregateType<T>>

    /**
     * Group by MalKabulRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MalKabulRecordGroupByArgs} args - Group by arguments.
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
      T extends MalKabulRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MalKabulRecordGroupByArgs['orderBy'] }
        : { orderBy?: MalKabulRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MalKabulRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMalKabulRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MalKabulRecord model
   */
  readonly fields: MalKabulRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MalKabulRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MalKabulRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ambalaj<T extends MalKabulRecord$ambalajArgs<ExtArgs> = {}>(args?: Subset<T, MalKabulRecord$ambalajArgs<ExtArgs>>): Prisma__AmbalajClient<$Result.GetResult<Prisma.$AmbalajPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fatura<T extends MalKabulRecord$faturaArgs<ExtArgs> = {}>(args?: Subset<T, MalKabulRecord$faturaArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    komisyoncu<T extends MalKabulRecord$komisyoncuArgs<ExtArgs> = {}>(args?: Subset<T, MalKabulRecord$komisyoncuArgs<ExtArgs>>): Prisma__KomisyoncuClient<$Result.GetResult<Prisma.$KomisyoncuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    malKabulcu<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mustahsil<T extends MalKabulRecord$mustahsilArgs<ExtArgs> = {}>(args?: Subset<T, MalKabulRecord$mustahsilArgs<ExtArgs>>): Prisma__MustahsilClient<$Result.GetResult<Prisma.$MustahsilPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ozelFirma<T extends MalKabulRecord$ozelFirmaArgs<ExtArgs> = {}>(args?: Subset<T, MalKabulRecord$ozelFirmaArgs<ExtArgs>>): Prisma__OzelFirmaClient<$Result.GetResult<Prisma.$OzelFirmaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    uretici<T extends MalKabulRecord$ureticiArgs<ExtArgs> = {}>(args?: Subset<T, MalKabulRecord$ureticiArgs<ExtArgs>>): Prisma__UreticiClient<$Result.GetResult<Prisma.$UreticiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    urun<T extends UrunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UrunDefaultArgs<ExtArgs>>): Prisma__UrunClient<$Result.GetResult<Prisma.$UrunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MalKabulRecord model
   */
  interface MalKabulRecordFieldRefs {
    readonly id: FieldRef<"MalKabulRecord", 'String'>
    readonly tarih: FieldRef<"MalKabulRecord", 'DateTime'>
    readonly miktar: FieldRef<"MalKabulRecord", 'Float'>
    readonly birimFiyat: FieldRef<"MalKabulRecord", 'Float'>
    readonly toplamFiyat: FieldRef<"MalKabulRecord", 'Float'>
    readonly status: FieldRef<"MalKabulRecord", 'ProductStatus'>
    readonly notlar: FieldRef<"MalKabulRecord", 'String'>
    readonly malKabulcuId: FieldRef<"MalKabulRecord", 'String'>
    readonly komisyoncuId: FieldRef<"MalKabulRecord", 'String'>
    readonly ureticiId: FieldRef<"MalKabulRecord", 'String'>
    readonly urunId: FieldRef<"MalKabulRecord", 'String'>
    readonly faturaId: FieldRef<"MalKabulRecord", 'String'>
    readonly createdAt: FieldRef<"MalKabulRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"MalKabulRecord", 'DateTime'>
    readonly fisNo: FieldRef<"MalKabulRecord", 'String'>
    readonly mustahsilId: FieldRef<"MalKabulRecord", 'String'>
    readonly ozelFirmaId: FieldRef<"MalKabulRecord", 'String'>
    readonly saticiTipi: FieldRef<"MalKabulRecord", 'SaticiTipi'>
    readonly ambalajId: FieldRef<"MalKabulRecord", 'String'>
    readonly paletSayisi: FieldRef<"MalKabulRecord", 'Int'>
    readonly kasaSayisi: FieldRef<"MalKabulRecord", 'Int'>
    readonly brutKg: FieldRef<"MalKabulRecord", 'Float'>
    readonly daraKg: FieldRef<"MalKabulRecord", 'Float'>
    readonly girisKg: FieldRef<"MalKabulRecord", 'Float'>
    readonly cikmaFireKg: FieldRef<"MalKabulRecord", 'Float'>
    readonly netKg: FieldRef<"MalKabulRecord", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * MalKabulRecord findUnique
   */
  export type MalKabulRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * Filter, which MalKabulRecord to fetch.
     */
    where: MalKabulRecordWhereUniqueInput
  }

  /**
   * MalKabulRecord findUniqueOrThrow
   */
  export type MalKabulRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * Filter, which MalKabulRecord to fetch.
     */
    where: MalKabulRecordWhereUniqueInput
  }

  /**
   * MalKabulRecord findFirst
   */
  export type MalKabulRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * Filter, which MalKabulRecord to fetch.
     */
    where?: MalKabulRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MalKabulRecords to fetch.
     */
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MalKabulRecords.
     */
    cursor?: MalKabulRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MalKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MalKabulRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MalKabulRecords.
     */
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * MalKabulRecord findFirstOrThrow
   */
  export type MalKabulRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * Filter, which MalKabulRecord to fetch.
     */
    where?: MalKabulRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MalKabulRecords to fetch.
     */
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MalKabulRecords.
     */
    cursor?: MalKabulRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MalKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MalKabulRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MalKabulRecords.
     */
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * MalKabulRecord findMany
   */
  export type MalKabulRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * Filter, which MalKabulRecords to fetch.
     */
    where?: MalKabulRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MalKabulRecords to fetch.
     */
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MalKabulRecords.
     */
    cursor?: MalKabulRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MalKabulRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MalKabulRecords.
     */
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * MalKabulRecord create
   */
  export type MalKabulRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a MalKabulRecord.
     */
    data: XOR<MalKabulRecordCreateInput, MalKabulRecordUncheckedCreateInput>
  }

  /**
   * MalKabulRecord createMany
   */
  export type MalKabulRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MalKabulRecords.
     */
    data: MalKabulRecordCreateManyInput | MalKabulRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MalKabulRecord createManyAndReturn
   */
  export type MalKabulRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * The data used to create many MalKabulRecords.
     */
    data: MalKabulRecordCreateManyInput | MalKabulRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MalKabulRecord update
   */
  export type MalKabulRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a MalKabulRecord.
     */
    data: XOR<MalKabulRecordUpdateInput, MalKabulRecordUncheckedUpdateInput>
    /**
     * Choose, which MalKabulRecord to update.
     */
    where: MalKabulRecordWhereUniqueInput
  }

  /**
   * MalKabulRecord updateMany
   */
  export type MalKabulRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MalKabulRecords.
     */
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyInput>
    /**
     * Filter which MalKabulRecords to update
     */
    where?: MalKabulRecordWhereInput
    /**
     * Limit how many MalKabulRecords to update.
     */
    limit?: number
  }

  /**
   * MalKabulRecord updateManyAndReturn
   */
  export type MalKabulRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * The data used to update MalKabulRecords.
     */
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyInput>
    /**
     * Filter which MalKabulRecords to update
     */
    where?: MalKabulRecordWhereInput
    /**
     * Limit how many MalKabulRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MalKabulRecord upsert
   */
  export type MalKabulRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the MalKabulRecord to update in case it exists.
     */
    where: MalKabulRecordWhereUniqueInput
    /**
     * In case the MalKabulRecord found by the `where` argument doesn't exist, create a new MalKabulRecord with this data.
     */
    create: XOR<MalKabulRecordCreateInput, MalKabulRecordUncheckedCreateInput>
    /**
     * In case the MalKabulRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MalKabulRecordUpdateInput, MalKabulRecordUncheckedUpdateInput>
  }

  /**
   * MalKabulRecord delete
   */
  export type MalKabulRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    /**
     * Filter which MalKabulRecord to delete.
     */
    where: MalKabulRecordWhereUniqueInput
  }

  /**
   * MalKabulRecord deleteMany
   */
  export type MalKabulRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MalKabulRecords to delete
     */
    where?: MalKabulRecordWhereInput
    /**
     * Limit how many MalKabulRecords to delete.
     */
    limit?: number
  }

  /**
   * MalKabulRecord.ambalaj
   */
  export type MalKabulRecord$ambalajArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ambalaj
     */
    select?: AmbalajSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ambalaj
     */
    omit?: AmbalajOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AmbalajInclude<ExtArgs> | null
    where?: AmbalajWhereInput
  }

  /**
   * MalKabulRecord.fatura
   */
  export type MalKabulRecord$faturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    where?: FaturaWhereInput
  }

  /**
   * MalKabulRecord.komisyoncu
   */
  export type MalKabulRecord$komisyoncuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Komisyoncu
     */
    select?: KomisyoncuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Komisyoncu
     */
    omit?: KomisyoncuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KomisyoncuInclude<ExtArgs> | null
    where?: KomisyoncuWhereInput
  }

  /**
   * MalKabulRecord.mustahsil
   */
  export type MalKabulRecord$mustahsilArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mustahsil
     */
    select?: MustahsilSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mustahsil
     */
    omit?: MustahsilOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MustahsilInclude<ExtArgs> | null
    where?: MustahsilWhereInput
  }

  /**
   * MalKabulRecord.ozelFirma
   */
  export type MalKabulRecord$ozelFirmaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OzelFirma
     */
    select?: OzelFirmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OzelFirma
     */
    omit?: OzelFirmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OzelFirmaInclude<ExtArgs> | null
    where?: OzelFirmaWhereInput
  }

  /**
   * MalKabulRecord.uretici
   */
  export type MalKabulRecord$ureticiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Uretici
     */
    select?: UreticiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Uretici
     */
    omit?: UreticiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UreticiInclude<ExtArgs> | null
    where?: UreticiWhereInput
  }

  /**
   * MalKabulRecord without action
   */
  export type MalKabulRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
  }


  /**
   * Model Fatura
   */

  export type AggregateFatura = {
    _count: FaturaCountAggregateOutputType | null
    _avg: FaturaAvgAggregateOutputType | null
    _sum: FaturaSumAggregateOutputType | null
    _min: FaturaMinAggregateOutputType | null
    _max: FaturaMaxAggregateOutputType | null
  }

  export type FaturaAvgAggregateOutputType = {
    toplamTutar: number | null
    kdvOrani: number | null
    kdvTutari: number | null
    genelToplam: number | null
  }

  export type FaturaSumAggregateOutputType = {
    toplamTutar: number | null
    kdvOrani: number | null
    kdvTutari: number | null
    genelToplam: number | null
  }

  export type FaturaMinAggregateOutputType = {
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

  export type FaturaMaxAggregateOutputType = {
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

  export type FaturaCountAggregateOutputType = {
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


  export type FaturaAvgAggregateInputType = {
    toplamTutar?: true
    kdvOrani?: true
    kdvTutari?: true
    genelToplam?: true
  }

  export type FaturaSumAggregateInputType = {
    toplamTutar?: true
    kdvOrani?: true
    kdvTutari?: true
    genelToplam?: true
  }

  export type FaturaMinAggregateInputType = {
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

  export type FaturaMaxAggregateInputType = {
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

  export type FaturaCountAggregateInputType = {
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

  export type FaturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fatura to aggregate.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Faturas
    **/
    _count?: true | FaturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FaturaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FaturaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FaturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FaturaMaxAggregateInputType
  }

  export type GetFaturaAggregateType<T extends FaturaAggregateArgs> = {
        [P in keyof T & keyof AggregateFatura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFatura[P]>
      : GetScalarType<T[P], AggregateFatura[P]>
  }




  export type FaturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaturaWhereInput
    orderBy?: FaturaOrderByWithAggregationInput | FaturaOrderByWithAggregationInput[]
    by: FaturaScalarFieldEnum[] | FaturaScalarFieldEnum
    having?: FaturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FaturaCountAggregateInputType | true
    _avg?: FaturaAvgAggregateInputType
    _sum?: FaturaSumAggregateInputType
    _min?: FaturaMinAggregateInputType
    _max?: FaturaMaxAggregateInputType
  }

  export type FaturaGroupByOutputType = {
    id: string
    faturaNo: string
    tarih: Date
    toplamTutar: number
    kdvOrani: number
    kdvTutari: number
    genelToplam: number
    notlar: string | null
    satinAlmaciId: string
    createdAt: Date
    updatedAt: Date
    _count: FaturaCountAggregateOutputType | null
    _avg: FaturaAvgAggregateOutputType | null
    _sum: FaturaSumAggregateOutputType | null
    _min: FaturaMinAggregateOutputType | null
    _max: FaturaMaxAggregateOutputType | null
  }

  type GetFaturaGroupByPayload<T extends FaturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FaturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FaturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FaturaGroupByOutputType[P]>
            : GetScalarType<T[P], FaturaGroupByOutputType[P]>
        }
      >
    >


  export type FaturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    satinAlmaci?: boolean | UserDefaultArgs<ExtArgs>
    malKabulRecords?: boolean | Fatura$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | FaturaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fatura"]>

  export type FaturaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    satinAlmaci?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fatura"]>

  export type FaturaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    satinAlmaci?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fatura"]>

  export type FaturaSelectScalar = {
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

  export type FaturaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "faturaNo" | "tarih" | "toplamTutar" | "kdvOrani" | "kdvTutari" | "genelToplam" | "notlar" | "satinAlmaciId" | "createdAt" | "updatedAt", ExtArgs["result"]["fatura"]>
  export type FaturaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    satinAlmaci?: boolean | UserDefaultArgs<ExtArgs>
    malKabulRecords?: boolean | Fatura$malKabulRecordsArgs<ExtArgs>
    _count?: boolean | FaturaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FaturaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    satinAlmaci?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FaturaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    satinAlmaci?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FaturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fatura"
    objects: {
      satinAlmaci: Prisma.$UserPayload<ExtArgs>
      malKabulRecords: Prisma.$MalKabulRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      faturaNo: string
      tarih: Date
      toplamTutar: number
      kdvOrani: number
      kdvTutari: number
      genelToplam: number
      notlar: string | null
      satinAlmaciId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fatura"]>
    composites: {}
  }

  type FaturaGetPayload<S extends boolean | null | undefined | FaturaDefaultArgs> = $Result.GetResult<Prisma.$FaturaPayload, S>

  type FaturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FaturaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FaturaCountAggregateInputType | true
    }

  export interface FaturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fatura'], meta: { name: 'Fatura' } }
    /**
     * Find zero or one Fatura that matches the filter.
     * @param {FaturaFindUniqueArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FaturaFindUniqueArgs>(args: SelectSubset<T, FaturaFindUniqueArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fatura that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FaturaFindUniqueOrThrowArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FaturaFindUniqueOrThrowArgs>(args: SelectSubset<T, FaturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fatura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaFindFirstArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FaturaFindFirstArgs>(args?: SelectSubset<T, FaturaFindFirstArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fatura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaFindFirstOrThrowArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FaturaFindFirstOrThrowArgs>(args?: SelectSubset<T, FaturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Faturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Faturas
     * const faturas = await prisma.fatura.findMany()
     * 
     * // Get first 10 Faturas
     * const faturas = await prisma.fatura.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const faturaWithIdOnly = await prisma.fatura.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FaturaFindManyArgs>(args?: SelectSubset<T, FaturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fatura.
     * @param {FaturaCreateArgs} args - Arguments to create a Fatura.
     * @example
     * // Create one Fatura
     * const Fatura = await prisma.fatura.create({
     *   data: {
     *     // ... data to create a Fatura
     *   }
     * })
     * 
     */
    create<T extends FaturaCreateArgs>(args: SelectSubset<T, FaturaCreateArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Faturas.
     * @param {FaturaCreateManyArgs} args - Arguments to create many Faturas.
     * @example
     * // Create many Faturas
     * const fatura = await prisma.fatura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FaturaCreateManyArgs>(args?: SelectSubset<T, FaturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Faturas and returns the data saved in the database.
     * @param {FaturaCreateManyAndReturnArgs} args - Arguments to create many Faturas.
     * @example
     * // Create many Faturas
     * const fatura = await prisma.fatura.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Faturas and only return the `id`
     * const faturaWithIdOnly = await prisma.fatura.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FaturaCreateManyAndReturnArgs>(args?: SelectSubset<T, FaturaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fatura.
     * @param {FaturaDeleteArgs} args - Arguments to delete one Fatura.
     * @example
     * // Delete one Fatura
     * const Fatura = await prisma.fatura.delete({
     *   where: {
     *     // ... filter to delete one Fatura
     *   }
     * })
     * 
     */
    delete<T extends FaturaDeleteArgs>(args: SelectSubset<T, FaturaDeleteArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fatura.
     * @param {FaturaUpdateArgs} args - Arguments to update one Fatura.
     * @example
     * // Update one Fatura
     * const fatura = await prisma.fatura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FaturaUpdateArgs>(args: SelectSubset<T, FaturaUpdateArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Faturas.
     * @param {FaturaDeleteManyArgs} args - Arguments to filter Faturas to delete.
     * @example
     * // Delete a few Faturas
     * const { count } = await prisma.fatura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FaturaDeleteManyArgs>(args?: SelectSubset<T, FaturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Faturas
     * const fatura = await prisma.fatura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FaturaUpdateManyArgs>(args: SelectSubset<T, FaturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faturas and returns the data updated in the database.
     * @param {FaturaUpdateManyAndReturnArgs} args - Arguments to update many Faturas.
     * @example
     * // Update many Faturas
     * const fatura = await prisma.fatura.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Faturas and only return the `id`
     * const faturaWithIdOnly = await prisma.fatura.updateManyAndReturn({
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
    updateManyAndReturn<T extends FaturaUpdateManyAndReturnArgs>(args: SelectSubset<T, FaturaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fatura.
     * @param {FaturaUpsertArgs} args - Arguments to update or create a Fatura.
     * @example
     * // Update or create a Fatura
     * const fatura = await prisma.fatura.upsert({
     *   create: {
     *     // ... data to create a Fatura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fatura we want to update
     *   }
     * })
     */
    upsert<T extends FaturaUpsertArgs>(args: SelectSubset<T, FaturaUpsertArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Faturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaCountArgs} args - Arguments to filter Faturas to count.
     * @example
     * // Count the number of Faturas
     * const count = await prisma.fatura.count({
     *   where: {
     *     // ... the filter for the Faturas we want to count
     *   }
     * })
    **/
    count<T extends FaturaCountArgs>(
      args?: Subset<T, FaturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FaturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FaturaAggregateArgs>(args: Subset<T, FaturaAggregateArgs>): Prisma.PrismaPromise<GetFaturaAggregateType<T>>

    /**
     * Group by Fatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaGroupByArgs} args - Group by arguments.
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
      T extends FaturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FaturaGroupByArgs['orderBy'] }
        : { orderBy?: FaturaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FaturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fatura model
   */
  readonly fields: FaturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fatura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FaturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    satinAlmaci<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    malKabulRecords<T extends Fatura$malKabulRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Fatura$malKabulRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MalKabulRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Fatura model
   */
  interface FaturaFieldRefs {
    readonly id: FieldRef<"Fatura", 'String'>
    readonly faturaNo: FieldRef<"Fatura", 'String'>
    readonly tarih: FieldRef<"Fatura", 'DateTime'>
    readonly toplamTutar: FieldRef<"Fatura", 'Float'>
    readonly kdvOrani: FieldRef<"Fatura", 'Float'>
    readonly kdvTutari: FieldRef<"Fatura", 'Float'>
    readonly genelToplam: FieldRef<"Fatura", 'Float'>
    readonly notlar: FieldRef<"Fatura", 'String'>
    readonly satinAlmaciId: FieldRef<"Fatura", 'String'>
    readonly createdAt: FieldRef<"Fatura", 'DateTime'>
    readonly updatedAt: FieldRef<"Fatura", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fatura findUnique
   */
  export type FaturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura findUniqueOrThrow
   */
  export type FaturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura findFirst
   */
  export type FaturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Faturas.
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Faturas.
     */
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * Fatura findFirstOrThrow
   */
  export type FaturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Faturas.
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Faturas.
     */
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * Fatura findMany
   */
  export type FaturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Faturas to fetch.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Faturas.
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * Fatura create
   */
  export type FaturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * The data needed to create a Fatura.
     */
    data: XOR<FaturaCreateInput, FaturaUncheckedCreateInput>
  }

  /**
   * Fatura createMany
   */
  export type FaturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Faturas.
     */
    data: FaturaCreateManyInput | FaturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fatura createManyAndReturn
   */
  export type FaturaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * The data used to create many Faturas.
     */
    data: FaturaCreateManyInput | FaturaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fatura update
   */
  export type FaturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * The data needed to update a Fatura.
     */
    data: XOR<FaturaUpdateInput, FaturaUncheckedUpdateInput>
    /**
     * Choose, which Fatura to update.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura updateMany
   */
  export type FaturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Faturas.
     */
    data: XOR<FaturaUpdateManyMutationInput, FaturaUncheckedUpdateManyInput>
    /**
     * Filter which Faturas to update
     */
    where?: FaturaWhereInput
    /**
     * Limit how many Faturas to update.
     */
    limit?: number
  }

  /**
   * Fatura updateManyAndReturn
   */
  export type FaturaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * The data used to update Faturas.
     */
    data: XOR<FaturaUpdateManyMutationInput, FaturaUncheckedUpdateManyInput>
    /**
     * Filter which Faturas to update
     */
    where?: FaturaWhereInput
    /**
     * Limit how many Faturas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fatura upsert
   */
  export type FaturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * The filter to search for the Fatura to update in case it exists.
     */
    where: FaturaWhereUniqueInput
    /**
     * In case the Fatura found by the `where` argument doesn't exist, create a new Fatura with this data.
     */
    create: XOR<FaturaCreateInput, FaturaUncheckedCreateInput>
    /**
     * In case the Fatura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FaturaUpdateInput, FaturaUncheckedUpdateInput>
  }

  /**
   * Fatura delete
   */
  export type FaturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter which Fatura to delete.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura deleteMany
   */
  export type FaturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Faturas to delete
     */
    where?: FaturaWhereInput
    /**
     * Limit how many Faturas to delete.
     */
    limit?: number
  }

  /**
   * Fatura.malKabulRecords
   */
  export type Fatura$malKabulRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MalKabulRecord
     */
    select?: MalKabulRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MalKabulRecord
     */
    omit?: MalKabulRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MalKabulRecordInclude<ExtArgs> | null
    where?: MalKabulRecordWhereInput
    orderBy?: MalKabulRecordOrderByWithRelationInput | MalKabulRecordOrderByWithRelationInput[]
    cursor?: MalKabulRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MalKabulRecordScalarFieldEnum | MalKabulRecordScalarFieldEnum[]
  }

  /**
   * Fatura without action
   */
  export type FaturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const KomisyoncuScalarFieldEnum: {
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

  export type KomisyoncuScalarFieldEnum = (typeof KomisyoncuScalarFieldEnum)[keyof typeof KomisyoncuScalarFieldEnum]


  export const OzelFirmaScalarFieldEnum: {
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

  export type OzelFirmaScalarFieldEnum = (typeof OzelFirmaScalarFieldEnum)[keyof typeof OzelFirmaScalarFieldEnum]


  export const UreticiScalarFieldEnum: {
    id: 'id',
    ad: 'ad',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    cinsiyet: 'cinsiyet',
    dogumTarihi: 'dogumTarihi',
    durum: 'durum',
    iletisim: 'iletisim',
    komisyoncuId: 'komisyoncuId',
    sehir: 'sehir',
    soyad: 'soyad',
    tcNo: 'tcNo'
  };

  export type UreticiScalarFieldEnum = (typeof UreticiScalarFieldEnum)[keyof typeof UreticiScalarFieldEnum]


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


  export const UrunScalarFieldEnum: {
    id: 'id',
    ad: 'ad',
    stokKodu: 'stokKodu',
    kategori: 'kategori',
    birim: 'birim',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    durum: 'durum'
  };

  export type UrunScalarFieldEnum = (typeof UrunScalarFieldEnum)[keyof typeof UrunScalarFieldEnum]


  export const AmbalajScalarFieldEnum: {
    id: 'id',
    ad: 'ad',
    tipi: 'tipi',
    daraKg: 'daraKg',
    aciklama: 'aciklama',
    durum: 'durum',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AmbalajScalarFieldEnum = (typeof AmbalajScalarFieldEnum)[keyof typeof AmbalajScalarFieldEnum]


  export const MalKabulRecordScalarFieldEnum: {
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
    cikmaFireKg: 'cikmaFireKg',
    netKg: 'netKg'
  };

  export type MalKabulRecordScalarFieldEnum = (typeof MalKabulRecordScalarFieldEnum)[keyof typeof MalKabulRecordScalarFieldEnum]


  export const FaturaScalarFieldEnum: {
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

  export type FaturaScalarFieldEnum = (typeof FaturaScalarFieldEnum)[keyof typeof FaturaScalarFieldEnum]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'AmbalajTipi'
   */
  export type EnumAmbalajTipiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmbalajTipi'>
    


  /**
   * Reference to a field of type 'AmbalajTipi[]'
   */
  export type ListEnumAmbalajTipiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmbalajTipi[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ProductStatus'
   */
  export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>
    


  /**
   * Reference to a field of type 'ProductStatus[]'
   */
  export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>
    


  /**
   * Reference to a field of type 'SaticiTipi'
   */
  export type EnumSaticiTipiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SaticiTipi'>
    


  /**
   * Reference to a field of type 'SaticiTipi[]'
   */
  export type ListEnumSaticiTipiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SaticiTipi[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    faturalar?: FaturaListRelationFilter
    malKabulRecords?: MalKabulRecordListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    faturalar?: FaturaOrderByRelationAggregateInput
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    faturalar?: FaturaListRelationFilter
    malKabulRecords?: MalKabulRecordListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type KomisyoncuWhereInput = {
    AND?: KomisyoncuWhereInput | KomisyoncuWhereInput[]
    OR?: KomisyoncuWhereInput[]
    NOT?: KomisyoncuWhereInput | KomisyoncuWhereInput[]
    id?: StringFilter<"Komisyoncu"> | string
    createdAt?: DateTimeFilter<"Komisyoncu"> | Date | string
    updatedAt?: DateTimeFilter<"Komisyoncu"> | Date | string
    dukkanAdi?: StringFilter<"Komisyoncu"> | string
    durum?: EnumStatusFilter<"Komisyoncu"> | $Enums.Status
    komisyonNo?: StringFilter<"Komisyoncu"> | string
    komisyonKodu?: StringFilter<"Komisyoncu"> | string
    sehir?: StringFilter<"Komisyoncu"> | string
    vkn?: StringNullableFilter<"Komisyoncu"> | string | null
    yetkiliAdi?: StringNullableFilter<"Komisyoncu"> | string | null
    yetkiliTelefon?: StringNullableFilter<"Komisyoncu"> | string | null
    malKabulRecords?: MalKabulRecordListRelationFilter
    ureticiler?: UreticiListRelationFilter
  }

  export type KomisyoncuOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dukkanAdi?: SortOrder
    durum?: SortOrder
    komisyonNo?: SortOrder
    komisyonKodu?: SortOrder
    sehir?: SortOrder
    vkn?: SortOrderInput | SortOrder
    yetkiliAdi?: SortOrderInput | SortOrder
    yetkiliTelefon?: SortOrderInput | SortOrder
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
    ureticiler?: UreticiOrderByRelationAggregateInput
  }

  export type KomisyoncuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    komisyonNo?: string
    komisyonKodu?: string
    AND?: KomisyoncuWhereInput | KomisyoncuWhereInput[]
    OR?: KomisyoncuWhereInput[]
    NOT?: KomisyoncuWhereInput | KomisyoncuWhereInput[]
    createdAt?: DateTimeFilter<"Komisyoncu"> | Date | string
    updatedAt?: DateTimeFilter<"Komisyoncu"> | Date | string
    dukkanAdi?: StringFilter<"Komisyoncu"> | string
    durum?: EnumStatusFilter<"Komisyoncu"> | $Enums.Status
    sehir?: StringFilter<"Komisyoncu"> | string
    vkn?: StringNullableFilter<"Komisyoncu"> | string | null
    yetkiliAdi?: StringNullableFilter<"Komisyoncu"> | string | null
    yetkiliTelefon?: StringNullableFilter<"Komisyoncu"> | string | null
    malKabulRecords?: MalKabulRecordListRelationFilter
    ureticiler?: UreticiListRelationFilter
  }, "id" | "komisyonNo" | "komisyonKodu">

  export type KomisyoncuOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dukkanAdi?: SortOrder
    durum?: SortOrder
    komisyonNo?: SortOrder
    komisyonKodu?: SortOrder
    sehir?: SortOrder
    vkn?: SortOrderInput | SortOrder
    yetkiliAdi?: SortOrderInput | SortOrder
    yetkiliTelefon?: SortOrderInput | SortOrder
    _count?: KomisyoncuCountOrderByAggregateInput
    _max?: KomisyoncuMaxOrderByAggregateInput
    _min?: KomisyoncuMinOrderByAggregateInput
  }

  export type KomisyoncuScalarWhereWithAggregatesInput = {
    AND?: KomisyoncuScalarWhereWithAggregatesInput | KomisyoncuScalarWhereWithAggregatesInput[]
    OR?: KomisyoncuScalarWhereWithAggregatesInput[]
    NOT?: KomisyoncuScalarWhereWithAggregatesInput | KomisyoncuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Komisyoncu"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Komisyoncu"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Komisyoncu"> | Date | string
    dukkanAdi?: StringWithAggregatesFilter<"Komisyoncu"> | string
    durum?: EnumStatusWithAggregatesFilter<"Komisyoncu"> | $Enums.Status
    komisyonNo?: StringWithAggregatesFilter<"Komisyoncu"> | string
    komisyonKodu?: StringWithAggregatesFilter<"Komisyoncu"> | string
    sehir?: StringWithAggregatesFilter<"Komisyoncu"> | string
    vkn?: StringNullableWithAggregatesFilter<"Komisyoncu"> | string | null
    yetkiliAdi?: StringNullableWithAggregatesFilter<"Komisyoncu"> | string | null
    yetkiliTelefon?: StringNullableWithAggregatesFilter<"Komisyoncu"> | string | null
  }

  export type OzelFirmaWhereInput = {
    AND?: OzelFirmaWhereInput | OzelFirmaWhereInput[]
    OR?: OzelFirmaWhereInput[]
    NOT?: OzelFirmaWhereInput | OzelFirmaWhereInput[]
    id?: StringFilter<"OzelFirma"> | string
    firmaAdi?: StringFilter<"OzelFirma"> | string
    firmaNo?: StringFilter<"OzelFirma"> | string
    vkn?: StringNullableFilter<"OzelFirma"> | string | null
    vergiDairesi?: StringNullableFilter<"OzelFirma"> | string | null
    yetkiliAdi?: StringNullableFilter<"OzelFirma"> | string | null
    yetkiliTelefon?: StringNullableFilter<"OzelFirma"> | string | null
    sehir?: StringFilter<"OzelFirma"> | string
    adres?: StringNullableFilter<"OzelFirma"> | string | null
    durum?: EnumStatusFilter<"OzelFirma"> | $Enums.Status
    createdAt?: DateTimeFilter<"OzelFirma"> | Date | string
    updatedAt?: DateTimeFilter<"OzelFirma"> | Date | string
    malKabulRecords?: MalKabulRecordListRelationFilter
  }

  export type OzelFirmaOrderByWithRelationInput = {
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
  }

  export type OzelFirmaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    firmaNo?: string
    AND?: OzelFirmaWhereInput | OzelFirmaWhereInput[]
    OR?: OzelFirmaWhereInput[]
    NOT?: OzelFirmaWhereInput | OzelFirmaWhereInput[]
    firmaAdi?: StringFilter<"OzelFirma"> | string
    vkn?: StringNullableFilter<"OzelFirma"> | string | null
    vergiDairesi?: StringNullableFilter<"OzelFirma"> | string | null
    yetkiliAdi?: StringNullableFilter<"OzelFirma"> | string | null
    yetkiliTelefon?: StringNullableFilter<"OzelFirma"> | string | null
    sehir?: StringFilter<"OzelFirma"> | string
    adres?: StringNullableFilter<"OzelFirma"> | string | null
    durum?: EnumStatusFilter<"OzelFirma"> | $Enums.Status
    createdAt?: DateTimeFilter<"OzelFirma"> | Date | string
    updatedAt?: DateTimeFilter<"OzelFirma"> | Date | string
    malKabulRecords?: MalKabulRecordListRelationFilter
  }, "id" | "firmaNo">

  export type OzelFirmaOrderByWithAggregationInput = {
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OzelFirmaCountOrderByAggregateInput
    _max?: OzelFirmaMaxOrderByAggregateInput
    _min?: OzelFirmaMinOrderByAggregateInput
  }

  export type OzelFirmaScalarWhereWithAggregatesInput = {
    AND?: OzelFirmaScalarWhereWithAggregatesInput | OzelFirmaScalarWhereWithAggregatesInput[]
    OR?: OzelFirmaScalarWhereWithAggregatesInput[]
    NOT?: OzelFirmaScalarWhereWithAggregatesInput | OzelFirmaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OzelFirma"> | string
    firmaAdi?: StringWithAggregatesFilter<"OzelFirma"> | string
    firmaNo?: StringWithAggregatesFilter<"OzelFirma"> | string
    vkn?: StringNullableWithAggregatesFilter<"OzelFirma"> | string | null
    vergiDairesi?: StringNullableWithAggregatesFilter<"OzelFirma"> | string | null
    yetkiliAdi?: StringNullableWithAggregatesFilter<"OzelFirma"> | string | null
    yetkiliTelefon?: StringNullableWithAggregatesFilter<"OzelFirma"> | string | null
    sehir?: StringWithAggregatesFilter<"OzelFirma"> | string
    adres?: StringNullableWithAggregatesFilter<"OzelFirma"> | string | null
    durum?: EnumStatusWithAggregatesFilter<"OzelFirma"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"OzelFirma"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OzelFirma"> | Date | string
  }

  export type UreticiWhereInput = {
    AND?: UreticiWhereInput | UreticiWhereInput[]
    OR?: UreticiWhereInput[]
    NOT?: UreticiWhereInput | UreticiWhereInput[]
    id?: StringFilter<"Uretici"> | string
    ad?: StringFilter<"Uretici"> | string
    createdAt?: DateTimeFilter<"Uretici"> | Date | string
    updatedAt?: DateTimeFilter<"Uretici"> | Date | string
    cinsiyet?: EnumGenderFilter<"Uretici"> | $Enums.Gender
    dogumTarihi?: DateTimeNullableFilter<"Uretici"> | Date | string | null
    durum?: EnumStatusFilter<"Uretici"> | $Enums.Status
    iletisim?: StringNullableFilter<"Uretici"> | string | null
    komisyoncuId?: StringNullableFilter<"Uretici"> | string | null
    sehir?: StringFilter<"Uretici"> | string
    soyad?: StringFilter<"Uretici"> | string
    tcNo?: StringNullableFilter<"Uretici"> | string | null
    malKabulRecords?: MalKabulRecordListRelationFilter
    komisyoncu?: XOR<KomisyoncuNullableScalarRelationFilter, KomisyoncuWhereInput> | null
  }

  export type UreticiOrderByWithRelationInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrderInput | SortOrder
    durum?: SortOrder
    iletisim?: SortOrderInput | SortOrder
    komisyoncuId?: SortOrderInput | SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrderInput | SortOrder
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
    komisyoncu?: KomisyoncuOrderByWithRelationInput
  }

  export type UreticiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UreticiWhereInput | UreticiWhereInput[]
    OR?: UreticiWhereInput[]
    NOT?: UreticiWhereInput | UreticiWhereInput[]
    ad?: StringFilter<"Uretici"> | string
    createdAt?: DateTimeFilter<"Uretici"> | Date | string
    updatedAt?: DateTimeFilter<"Uretici"> | Date | string
    cinsiyet?: EnumGenderFilter<"Uretici"> | $Enums.Gender
    dogumTarihi?: DateTimeNullableFilter<"Uretici"> | Date | string | null
    durum?: EnumStatusFilter<"Uretici"> | $Enums.Status
    iletisim?: StringNullableFilter<"Uretici"> | string | null
    komisyoncuId?: StringNullableFilter<"Uretici"> | string | null
    sehir?: StringFilter<"Uretici"> | string
    soyad?: StringFilter<"Uretici"> | string
    tcNo?: StringNullableFilter<"Uretici"> | string | null
    malKabulRecords?: MalKabulRecordListRelationFilter
    komisyoncu?: XOR<KomisyoncuNullableScalarRelationFilter, KomisyoncuWhereInput> | null
  }, "id">

  export type UreticiOrderByWithAggregationInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrderInput | SortOrder
    durum?: SortOrder
    iletisim?: SortOrderInput | SortOrder
    komisyoncuId?: SortOrderInput | SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrderInput | SortOrder
    _count?: UreticiCountOrderByAggregateInput
    _max?: UreticiMaxOrderByAggregateInput
    _min?: UreticiMinOrderByAggregateInput
  }

  export type UreticiScalarWhereWithAggregatesInput = {
    AND?: UreticiScalarWhereWithAggregatesInput | UreticiScalarWhereWithAggregatesInput[]
    OR?: UreticiScalarWhereWithAggregatesInput[]
    NOT?: UreticiScalarWhereWithAggregatesInput | UreticiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Uretici"> | string
    ad?: StringWithAggregatesFilter<"Uretici"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Uretici"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Uretici"> | Date | string
    cinsiyet?: EnumGenderWithAggregatesFilter<"Uretici"> | $Enums.Gender
    dogumTarihi?: DateTimeNullableWithAggregatesFilter<"Uretici"> | Date | string | null
    durum?: EnumStatusWithAggregatesFilter<"Uretici"> | $Enums.Status
    iletisim?: StringNullableWithAggregatesFilter<"Uretici"> | string | null
    komisyoncuId?: StringNullableWithAggregatesFilter<"Uretici"> | string | null
    sehir?: StringWithAggregatesFilter<"Uretici"> | string
    soyad?: StringWithAggregatesFilter<"Uretici"> | string
    tcNo?: StringNullableWithAggregatesFilter<"Uretici"> | string | null
  }

  export type MustahsilWhereInput = {
    AND?: MustahsilWhereInput | MustahsilWhereInput[]
    OR?: MustahsilWhereInput[]
    NOT?: MustahsilWhereInput | MustahsilWhereInput[]
    id?: StringFilter<"Mustahsil"> | string
    ad?: StringFilter<"Mustahsil"> | string
    soyad?: StringFilter<"Mustahsil"> | string
    dogumTarihi?: DateTimeFilter<"Mustahsil"> | Date | string
    tcKimlikNo?: StringFilter<"Mustahsil"> | string
    mustahsilNo?: StringFilter<"Mustahsil"> | string
    iletisim?: StringNullableFilter<"Mustahsil"> | string | null
    bankaAdi?: StringNullableFilter<"Mustahsil"> | string | null
    ibanAdresi?: StringNullableFilter<"Mustahsil"> | string | null
    adres?: StringNullableFilter<"Mustahsil"> | string | null
    cinsiyet?: EnumGenderFilter<"Mustahsil"> | $Enums.Gender
    durum?: EnumStatusFilter<"Mustahsil"> | $Enums.Status
    createdAt?: DateTimeFilter<"Mustahsil"> | Date | string
    updatedAt?: DateTimeFilter<"Mustahsil"> | Date | string
    malKabulRecords?: MalKabulRecordListRelationFilter
  }

  export type MustahsilOrderByWithRelationInput = {
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
  }

  export type MustahsilWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tcKimlikNo?: string
    mustahsilNo?: string
    AND?: MustahsilWhereInput | MustahsilWhereInput[]
    OR?: MustahsilWhereInput[]
    NOT?: MustahsilWhereInput | MustahsilWhereInput[]
    ad?: StringFilter<"Mustahsil"> | string
    soyad?: StringFilter<"Mustahsil"> | string
    dogumTarihi?: DateTimeFilter<"Mustahsil"> | Date | string
    iletisim?: StringNullableFilter<"Mustahsil"> | string | null
    bankaAdi?: StringNullableFilter<"Mustahsil"> | string | null
    ibanAdresi?: StringNullableFilter<"Mustahsil"> | string | null
    adres?: StringNullableFilter<"Mustahsil"> | string | null
    cinsiyet?: EnumGenderFilter<"Mustahsil"> | $Enums.Gender
    durum?: EnumStatusFilter<"Mustahsil"> | $Enums.Status
    createdAt?: DateTimeFilter<"Mustahsil"> | Date | string
    updatedAt?: DateTimeFilter<"Mustahsil"> | Date | string
    malKabulRecords?: MalKabulRecordListRelationFilter
  }, "id" | "tcKimlikNo" | "mustahsilNo">

  export type MustahsilOrderByWithAggregationInput = {
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MustahsilCountOrderByAggregateInput
    _max?: MustahsilMaxOrderByAggregateInput
    _min?: MustahsilMinOrderByAggregateInput
  }

  export type MustahsilScalarWhereWithAggregatesInput = {
    AND?: MustahsilScalarWhereWithAggregatesInput | MustahsilScalarWhereWithAggregatesInput[]
    OR?: MustahsilScalarWhereWithAggregatesInput[]
    NOT?: MustahsilScalarWhereWithAggregatesInput | MustahsilScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mustahsil"> | string
    ad?: StringWithAggregatesFilter<"Mustahsil"> | string
    soyad?: StringWithAggregatesFilter<"Mustahsil"> | string
    dogumTarihi?: DateTimeWithAggregatesFilter<"Mustahsil"> | Date | string
    tcKimlikNo?: StringWithAggregatesFilter<"Mustahsil"> | string
    mustahsilNo?: StringWithAggregatesFilter<"Mustahsil"> | string
    iletisim?: StringNullableWithAggregatesFilter<"Mustahsil"> | string | null
    bankaAdi?: StringNullableWithAggregatesFilter<"Mustahsil"> | string | null
    ibanAdresi?: StringNullableWithAggregatesFilter<"Mustahsil"> | string | null
    adres?: StringNullableWithAggregatesFilter<"Mustahsil"> | string | null
    cinsiyet?: EnumGenderWithAggregatesFilter<"Mustahsil"> | $Enums.Gender
    durum?: EnumStatusWithAggregatesFilter<"Mustahsil"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"Mustahsil"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mustahsil"> | Date | string
  }

  export type UrunWhereInput = {
    AND?: UrunWhereInput | UrunWhereInput[]
    OR?: UrunWhereInput[]
    NOT?: UrunWhereInput | UrunWhereInput[]
    id?: StringFilter<"Urun"> | string
    ad?: StringFilter<"Urun"> | string
    stokKodu?: StringFilter<"Urun"> | string
    kategori?: StringNullableFilter<"Urun"> | string | null
    birim?: StringFilter<"Urun"> | string
    createdAt?: DateTimeFilter<"Urun"> | Date | string
    updatedAt?: DateTimeFilter<"Urun"> | Date | string
    durum?: EnumStatusFilter<"Urun"> | $Enums.Status
    malKabulRecords?: MalKabulRecordListRelationFilter
  }

  export type UrunOrderByWithRelationInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrderInput | SortOrder
    birim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    durum?: SortOrder
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
  }

  export type UrunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stokKodu?: string
    AND?: UrunWhereInput | UrunWhereInput[]
    OR?: UrunWhereInput[]
    NOT?: UrunWhereInput | UrunWhereInput[]
    ad?: StringFilter<"Urun"> | string
    kategori?: StringNullableFilter<"Urun"> | string | null
    birim?: StringFilter<"Urun"> | string
    createdAt?: DateTimeFilter<"Urun"> | Date | string
    updatedAt?: DateTimeFilter<"Urun"> | Date | string
    durum?: EnumStatusFilter<"Urun"> | $Enums.Status
    malKabulRecords?: MalKabulRecordListRelationFilter
  }, "id" | "stokKodu">

  export type UrunOrderByWithAggregationInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrderInput | SortOrder
    birim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    durum?: SortOrder
    _count?: UrunCountOrderByAggregateInput
    _max?: UrunMaxOrderByAggregateInput
    _min?: UrunMinOrderByAggregateInput
  }

  export type UrunScalarWhereWithAggregatesInput = {
    AND?: UrunScalarWhereWithAggregatesInput | UrunScalarWhereWithAggregatesInput[]
    OR?: UrunScalarWhereWithAggregatesInput[]
    NOT?: UrunScalarWhereWithAggregatesInput | UrunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Urun"> | string
    ad?: StringWithAggregatesFilter<"Urun"> | string
    stokKodu?: StringWithAggregatesFilter<"Urun"> | string
    kategori?: StringNullableWithAggregatesFilter<"Urun"> | string | null
    birim?: StringWithAggregatesFilter<"Urun"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Urun"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Urun"> | Date | string
    durum?: EnumStatusWithAggregatesFilter<"Urun"> | $Enums.Status
  }

  export type AmbalajWhereInput = {
    AND?: AmbalajWhereInput | AmbalajWhereInput[]
    OR?: AmbalajWhereInput[]
    NOT?: AmbalajWhereInput | AmbalajWhereInput[]
    id?: StringFilter<"Ambalaj"> | string
    ad?: StringFilter<"Ambalaj"> | string
    tipi?: EnumAmbalajTipiFilter<"Ambalaj"> | $Enums.AmbalajTipi
    daraKg?: FloatFilter<"Ambalaj"> | number
    aciklama?: StringNullableFilter<"Ambalaj"> | string | null
    durum?: EnumStatusFilter<"Ambalaj"> | $Enums.Status
    createdAt?: DateTimeFilter<"Ambalaj"> | Date | string
    updatedAt?: DateTimeFilter<"Ambalaj"> | Date | string
    malKabulRecords?: MalKabulRecordListRelationFilter
  }

  export type AmbalajOrderByWithRelationInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrderInput | SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
  }

  export type AmbalajWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AmbalajWhereInput | AmbalajWhereInput[]
    OR?: AmbalajWhereInput[]
    NOT?: AmbalajWhereInput | AmbalajWhereInput[]
    ad?: StringFilter<"Ambalaj"> | string
    tipi?: EnumAmbalajTipiFilter<"Ambalaj"> | $Enums.AmbalajTipi
    daraKg?: FloatFilter<"Ambalaj"> | number
    aciklama?: StringNullableFilter<"Ambalaj"> | string | null
    durum?: EnumStatusFilter<"Ambalaj"> | $Enums.Status
    createdAt?: DateTimeFilter<"Ambalaj"> | Date | string
    updatedAt?: DateTimeFilter<"Ambalaj"> | Date | string
    malKabulRecords?: MalKabulRecordListRelationFilter
  }, "id">

  export type AmbalajOrderByWithAggregationInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrderInput | SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AmbalajCountOrderByAggregateInput
    _avg?: AmbalajAvgOrderByAggregateInput
    _max?: AmbalajMaxOrderByAggregateInput
    _min?: AmbalajMinOrderByAggregateInput
    _sum?: AmbalajSumOrderByAggregateInput
  }

  export type AmbalajScalarWhereWithAggregatesInput = {
    AND?: AmbalajScalarWhereWithAggregatesInput | AmbalajScalarWhereWithAggregatesInput[]
    OR?: AmbalajScalarWhereWithAggregatesInput[]
    NOT?: AmbalajScalarWhereWithAggregatesInput | AmbalajScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ambalaj"> | string
    ad?: StringWithAggregatesFilter<"Ambalaj"> | string
    tipi?: EnumAmbalajTipiWithAggregatesFilter<"Ambalaj"> | $Enums.AmbalajTipi
    daraKg?: FloatWithAggregatesFilter<"Ambalaj"> | number
    aciklama?: StringNullableWithAggregatesFilter<"Ambalaj"> | string | null
    durum?: EnumStatusWithAggregatesFilter<"Ambalaj"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"Ambalaj"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ambalaj"> | Date | string
  }

  export type MalKabulRecordWhereInput = {
    AND?: MalKabulRecordWhereInput | MalKabulRecordWhereInput[]
    OR?: MalKabulRecordWhereInput[]
    NOT?: MalKabulRecordWhereInput | MalKabulRecordWhereInput[]
    id?: StringFilter<"MalKabulRecord"> | string
    tarih?: DateTimeFilter<"MalKabulRecord"> | Date | string
    miktar?: FloatFilter<"MalKabulRecord"> | number
    birimFiyat?: FloatNullableFilter<"MalKabulRecord"> | number | null
    toplamFiyat?: FloatNullableFilter<"MalKabulRecord"> | number | null
    status?: EnumProductStatusFilter<"MalKabulRecord"> | $Enums.ProductStatus
    notlar?: StringNullableFilter<"MalKabulRecord"> | string | null
    malKabulcuId?: StringFilter<"MalKabulRecord"> | string
    komisyoncuId?: StringNullableFilter<"MalKabulRecord"> | string | null
    ureticiId?: StringNullableFilter<"MalKabulRecord"> | string | null
    urunId?: StringFilter<"MalKabulRecord"> | string
    faturaId?: StringNullableFilter<"MalKabulRecord"> | string | null
    createdAt?: DateTimeFilter<"MalKabulRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MalKabulRecord"> | Date | string
    fisNo?: StringFilter<"MalKabulRecord"> | string
    mustahsilId?: StringNullableFilter<"MalKabulRecord"> | string | null
    ozelFirmaId?: StringNullableFilter<"MalKabulRecord"> | string | null
    saticiTipi?: EnumSaticiTipiFilter<"MalKabulRecord"> | $Enums.SaticiTipi
    ambalajId?: StringNullableFilter<"MalKabulRecord"> | string | null
    paletSayisi?: IntFilter<"MalKabulRecord"> | number
    kasaSayisi?: IntFilter<"MalKabulRecord"> | number
    brutKg?: FloatFilter<"MalKabulRecord"> | number
    daraKg?: FloatFilter<"MalKabulRecord"> | number
    girisKg?: FloatFilter<"MalKabulRecord"> | number
    cikmaFireKg?: FloatFilter<"MalKabulRecord"> | number
    netKg?: FloatFilter<"MalKabulRecord"> | number
    ambalaj?: XOR<AmbalajNullableScalarRelationFilter, AmbalajWhereInput> | null
    fatura?: XOR<FaturaNullableScalarRelationFilter, FaturaWhereInput> | null
    komisyoncu?: XOR<KomisyoncuNullableScalarRelationFilter, KomisyoncuWhereInput> | null
    malKabulcu?: XOR<UserScalarRelationFilter, UserWhereInput>
    mustahsil?: XOR<MustahsilNullableScalarRelationFilter, MustahsilWhereInput> | null
    ozelFirma?: XOR<OzelFirmaNullableScalarRelationFilter, OzelFirmaWhereInput> | null
    uretici?: XOR<UreticiNullableScalarRelationFilter, UreticiWhereInput> | null
    urun?: XOR<UrunScalarRelationFilter, UrunWhereInput>
  }

  export type MalKabulRecordOrderByWithRelationInput = {
    id?: SortOrder
    tarih?: SortOrder
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fisNo?: SortOrder
    mustahsilId?: SortOrderInput | SortOrder
    ozelFirmaId?: SortOrderInput | SortOrder
    saticiTipi?: SortOrder
    ambalajId?: SortOrderInput | SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
    ambalaj?: AmbalajOrderByWithRelationInput
    fatura?: FaturaOrderByWithRelationInput
    komisyoncu?: KomisyoncuOrderByWithRelationInput
    malKabulcu?: UserOrderByWithRelationInput
    mustahsil?: MustahsilOrderByWithRelationInput
    ozelFirma?: OzelFirmaOrderByWithRelationInput
    uretici?: UreticiOrderByWithRelationInput
    urun?: UrunOrderByWithRelationInput
  }

  export type MalKabulRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fisNo?: string
    AND?: MalKabulRecordWhereInput | MalKabulRecordWhereInput[]
    OR?: MalKabulRecordWhereInput[]
    NOT?: MalKabulRecordWhereInput | MalKabulRecordWhereInput[]
    tarih?: DateTimeFilter<"MalKabulRecord"> | Date | string
    miktar?: FloatFilter<"MalKabulRecord"> | number
    birimFiyat?: FloatNullableFilter<"MalKabulRecord"> | number | null
    toplamFiyat?: FloatNullableFilter<"MalKabulRecord"> | number | null
    status?: EnumProductStatusFilter<"MalKabulRecord"> | $Enums.ProductStatus
    notlar?: StringNullableFilter<"MalKabulRecord"> | string | null
    malKabulcuId?: StringFilter<"MalKabulRecord"> | string
    komisyoncuId?: StringNullableFilter<"MalKabulRecord"> | string | null
    ureticiId?: StringNullableFilter<"MalKabulRecord"> | string | null
    urunId?: StringFilter<"MalKabulRecord"> | string
    faturaId?: StringNullableFilter<"MalKabulRecord"> | string | null
    createdAt?: DateTimeFilter<"MalKabulRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MalKabulRecord"> | Date | string
    mustahsilId?: StringNullableFilter<"MalKabulRecord"> | string | null
    ozelFirmaId?: StringNullableFilter<"MalKabulRecord"> | string | null
    saticiTipi?: EnumSaticiTipiFilter<"MalKabulRecord"> | $Enums.SaticiTipi
    ambalajId?: StringNullableFilter<"MalKabulRecord"> | string | null
    paletSayisi?: IntFilter<"MalKabulRecord"> | number
    kasaSayisi?: IntFilter<"MalKabulRecord"> | number
    brutKg?: FloatFilter<"MalKabulRecord"> | number
    daraKg?: FloatFilter<"MalKabulRecord"> | number
    girisKg?: FloatFilter<"MalKabulRecord"> | number
    cikmaFireKg?: FloatFilter<"MalKabulRecord"> | number
    netKg?: FloatFilter<"MalKabulRecord"> | number
    ambalaj?: XOR<AmbalajNullableScalarRelationFilter, AmbalajWhereInput> | null
    fatura?: XOR<FaturaNullableScalarRelationFilter, FaturaWhereInput> | null
    komisyoncu?: XOR<KomisyoncuNullableScalarRelationFilter, KomisyoncuWhereInput> | null
    malKabulcu?: XOR<UserScalarRelationFilter, UserWhereInput>
    mustahsil?: XOR<MustahsilNullableScalarRelationFilter, MustahsilWhereInput> | null
    ozelFirma?: XOR<OzelFirmaNullableScalarRelationFilter, OzelFirmaWhereInput> | null
    uretici?: XOR<UreticiNullableScalarRelationFilter, UreticiWhereInput> | null
    urun?: XOR<UrunScalarRelationFilter, UrunWhereInput>
  }, "id" | "fisNo">

  export type MalKabulRecordOrderByWithAggregationInput = {
    id?: SortOrder
    tarih?: SortOrder
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fisNo?: SortOrder
    mustahsilId?: SortOrderInput | SortOrder
    ozelFirmaId?: SortOrderInput | SortOrder
    saticiTipi?: SortOrder
    ambalajId?: SortOrderInput | SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
    _count?: MalKabulRecordCountOrderByAggregateInput
    _avg?: MalKabulRecordAvgOrderByAggregateInput
    _max?: MalKabulRecordMaxOrderByAggregateInput
    _min?: MalKabulRecordMinOrderByAggregateInput
    _sum?: MalKabulRecordSumOrderByAggregateInput
  }

  export type MalKabulRecordScalarWhereWithAggregatesInput = {
    AND?: MalKabulRecordScalarWhereWithAggregatesInput | MalKabulRecordScalarWhereWithAggregatesInput[]
    OR?: MalKabulRecordScalarWhereWithAggregatesInput[]
    NOT?: MalKabulRecordScalarWhereWithAggregatesInput | MalKabulRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MalKabulRecord"> | string
    tarih?: DateTimeWithAggregatesFilter<"MalKabulRecord"> | Date | string
    miktar?: FloatWithAggregatesFilter<"MalKabulRecord"> | number
    birimFiyat?: FloatNullableWithAggregatesFilter<"MalKabulRecord"> | number | null
    toplamFiyat?: FloatNullableWithAggregatesFilter<"MalKabulRecord"> | number | null
    status?: EnumProductStatusWithAggregatesFilter<"MalKabulRecord"> | $Enums.ProductStatus
    notlar?: StringNullableWithAggregatesFilter<"MalKabulRecord"> | string | null
    malKabulcuId?: StringWithAggregatesFilter<"MalKabulRecord"> | string
    komisyoncuId?: StringNullableWithAggregatesFilter<"MalKabulRecord"> | string | null
    ureticiId?: StringNullableWithAggregatesFilter<"MalKabulRecord"> | string | null
    urunId?: StringWithAggregatesFilter<"MalKabulRecord"> | string
    faturaId?: StringNullableWithAggregatesFilter<"MalKabulRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MalKabulRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MalKabulRecord"> | Date | string
    fisNo?: StringWithAggregatesFilter<"MalKabulRecord"> | string
    mustahsilId?: StringNullableWithAggregatesFilter<"MalKabulRecord"> | string | null
    ozelFirmaId?: StringNullableWithAggregatesFilter<"MalKabulRecord"> | string | null
    saticiTipi?: EnumSaticiTipiWithAggregatesFilter<"MalKabulRecord"> | $Enums.SaticiTipi
    ambalajId?: StringNullableWithAggregatesFilter<"MalKabulRecord"> | string | null
    paletSayisi?: IntWithAggregatesFilter<"MalKabulRecord"> | number
    kasaSayisi?: IntWithAggregatesFilter<"MalKabulRecord"> | number
    brutKg?: FloatWithAggregatesFilter<"MalKabulRecord"> | number
    daraKg?: FloatWithAggregatesFilter<"MalKabulRecord"> | number
    girisKg?: FloatWithAggregatesFilter<"MalKabulRecord"> | number
    cikmaFireKg?: FloatWithAggregatesFilter<"MalKabulRecord"> | number
    netKg?: FloatWithAggregatesFilter<"MalKabulRecord"> | number
  }

  export type FaturaWhereInput = {
    AND?: FaturaWhereInput | FaturaWhereInput[]
    OR?: FaturaWhereInput[]
    NOT?: FaturaWhereInput | FaturaWhereInput[]
    id?: StringFilter<"Fatura"> | string
    faturaNo?: StringFilter<"Fatura"> | string
    tarih?: DateTimeFilter<"Fatura"> | Date | string
    toplamTutar?: FloatFilter<"Fatura"> | number
    kdvOrani?: FloatFilter<"Fatura"> | number
    kdvTutari?: FloatFilter<"Fatura"> | number
    genelToplam?: FloatFilter<"Fatura"> | number
    notlar?: StringNullableFilter<"Fatura"> | string | null
    satinAlmaciId?: StringFilter<"Fatura"> | string
    createdAt?: DateTimeFilter<"Fatura"> | Date | string
    updatedAt?: DateTimeFilter<"Fatura"> | Date | string
    satinAlmaci?: XOR<UserScalarRelationFilter, UserWhereInput>
    malKabulRecords?: MalKabulRecordListRelationFilter
  }

  export type FaturaOrderByWithRelationInput = {
    id?: SortOrder
    faturaNo?: SortOrder
    tarih?: SortOrder
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
    notlar?: SortOrderInput | SortOrder
    satinAlmaciId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    satinAlmaci?: UserOrderByWithRelationInput
    malKabulRecords?: MalKabulRecordOrderByRelationAggregateInput
  }

  export type FaturaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    faturaNo?: string
    AND?: FaturaWhereInput | FaturaWhereInput[]
    OR?: FaturaWhereInput[]
    NOT?: FaturaWhereInput | FaturaWhereInput[]
    tarih?: DateTimeFilter<"Fatura"> | Date | string
    toplamTutar?: FloatFilter<"Fatura"> | number
    kdvOrani?: FloatFilter<"Fatura"> | number
    kdvTutari?: FloatFilter<"Fatura"> | number
    genelToplam?: FloatFilter<"Fatura"> | number
    notlar?: StringNullableFilter<"Fatura"> | string | null
    satinAlmaciId?: StringFilter<"Fatura"> | string
    createdAt?: DateTimeFilter<"Fatura"> | Date | string
    updatedAt?: DateTimeFilter<"Fatura"> | Date | string
    satinAlmaci?: XOR<UserScalarRelationFilter, UserWhereInput>
    malKabulRecords?: MalKabulRecordListRelationFilter
  }, "id" | "faturaNo">

  export type FaturaOrderByWithAggregationInput = {
    id?: SortOrder
    faturaNo?: SortOrder
    tarih?: SortOrder
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
    notlar?: SortOrderInput | SortOrder
    satinAlmaciId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FaturaCountOrderByAggregateInput
    _avg?: FaturaAvgOrderByAggregateInput
    _max?: FaturaMaxOrderByAggregateInput
    _min?: FaturaMinOrderByAggregateInput
    _sum?: FaturaSumOrderByAggregateInput
  }

  export type FaturaScalarWhereWithAggregatesInput = {
    AND?: FaturaScalarWhereWithAggregatesInput | FaturaScalarWhereWithAggregatesInput[]
    OR?: FaturaScalarWhereWithAggregatesInput[]
    NOT?: FaturaScalarWhereWithAggregatesInput | FaturaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Fatura"> | string
    faturaNo?: StringWithAggregatesFilter<"Fatura"> | string
    tarih?: DateTimeWithAggregatesFilter<"Fatura"> | Date | string
    toplamTutar?: FloatWithAggregatesFilter<"Fatura"> | number
    kdvOrani?: FloatWithAggregatesFilter<"Fatura"> | number
    kdvTutari?: FloatWithAggregatesFilter<"Fatura"> | number
    genelToplam?: FloatWithAggregatesFilter<"Fatura"> | number
    notlar?: StringNullableWithAggregatesFilter<"Fatura"> | string | null
    satinAlmaciId?: StringWithAggregatesFilter<"Fatura"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Fatura"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Fatura"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    faturalar?: FaturaCreateNestedManyWithoutSatinAlmaciInput
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutMalKabulcuInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    faturalar?: FaturaUncheckedCreateNestedManyWithoutSatinAlmaciInput
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutMalKabulcuInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faturalar?: FaturaUpdateManyWithoutSatinAlmaciNestedInput
    malKabulRecords?: MalKabulRecordUpdateManyWithoutMalKabulcuNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faturalar?: FaturaUncheckedUpdateManyWithoutSatinAlmaciNestedInput
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutMalKabulcuNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KomisyoncuCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dukkanAdi: string
    durum?: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutKomisyoncuInput
    ureticiler?: UreticiCreateNestedManyWithoutKomisyoncuInput
  }

  export type KomisyoncuUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dukkanAdi: string
    durum?: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutKomisyoncuInput
    ureticiler?: UreticiUncheckedCreateNestedManyWithoutKomisyoncuInput
  }

  export type KomisyoncuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUpdateManyWithoutKomisyoncuNestedInput
    ureticiler?: UreticiUpdateManyWithoutKomisyoncuNestedInput
  }

  export type KomisyoncuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutKomisyoncuNestedInput
    ureticiler?: UreticiUncheckedUpdateManyWithoutKomisyoncuNestedInput
  }

  export type KomisyoncuCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dukkanAdi: string
    durum?: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
  }

  export type KomisyoncuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type KomisyoncuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OzelFirmaCreateInput = {
    id?: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutOzelFirmaInput
  }

  export type OzelFirmaUncheckedCreateInput = {
    id?: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutOzelFirmaInput
  }

  export type OzelFirmaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUpdateManyWithoutOzelFirmaNestedInput
  }

  export type OzelFirmaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutOzelFirmaNestedInput
  }

  export type OzelFirmaCreateManyInput = {
    id?: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OzelFirmaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OzelFirmaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UreticiCreateInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutUreticiInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutUreticilerInput
  }

  export type UreticiUncheckedCreateInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    komisyoncuId?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutUreticiInput
  }

  export type UreticiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUpdateManyWithoutUreticiNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutUreticilerNestedInput
  }

  export type UreticiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutUreticiNestedInput
  }

  export type UreticiCreateManyInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    komisyoncuId?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
  }

  export type UreticiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UreticiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MustahsilCreateInput = {
    id?: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: $Enums.Gender
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutMustahsilInput
  }

  export type MustahsilUncheckedCreateInput = {
    id?: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: $Enums.Gender
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutMustahsilInput
  }

  export type MustahsilUpdateInput = {
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
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUpdateManyWithoutMustahsilNestedInput
  }

  export type MustahsilUncheckedUpdateInput = {
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
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutMustahsilNestedInput
  }

  export type MustahsilCreateManyInput = {
    id?: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: $Enums.Gender
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MustahsilUpdateManyMutationInput = {
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
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MustahsilUncheckedUpdateManyInput = {
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
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrunCreateInput = {
    id?: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    createdAt?: Date | string
    updatedAt?: Date | string
    durum?: $Enums.Status
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutUrunInput
  }

  export type UrunUncheckedCreateInput = {
    id?: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    createdAt?: Date | string
    updatedAt?: Date | string
    durum?: $Enums.Status
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutUrunInput
  }

  export type UrunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    malKabulRecords?: MalKabulRecordUpdateManyWithoutUrunNestedInput
  }

  export type UrunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutUrunNestedInput
  }

  export type UrunCreateManyInput = {
    id?: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    createdAt?: Date | string
    updatedAt?: Date | string
    durum?: $Enums.Status
  }

  export type UrunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type UrunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type AmbalajCreateInput = {
    id?: string
    ad: string
    tipi: $Enums.AmbalajTipi
    daraKg: number
    aciklama?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutAmbalajInput
  }

  export type AmbalajUncheckedCreateInput = {
    id?: string
    ad: string
    tipi: $Enums.AmbalajTipi
    daraKg: number
    aciklama?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutAmbalajInput
  }

  export type AmbalajUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: EnumAmbalajTipiFieldUpdateOperationsInput | $Enums.AmbalajTipi
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUpdateManyWithoutAmbalajNestedInput
  }

  export type AmbalajUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: EnumAmbalajTipiFieldUpdateOperationsInput | $Enums.AmbalajTipi
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutAmbalajNestedInput
  }

  export type AmbalajCreateManyInput = {
    id?: string
    ad: string
    tipi: $Enums.AmbalajTipi
    daraKg: number
    aciklama?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AmbalajUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: EnumAmbalajTipiFieldUpdateOperationsInput | $Enums.AmbalajTipi
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AmbalajUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: EnumAmbalajTipiFieldUpdateOperationsInput | $Enums.AmbalajTipi
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MalKabulRecordCreateInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordCreateManyInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type FaturaCreateInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    satinAlmaci: UserCreateNestedOneWithoutFaturalarInput
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutFaturaInput
  }

  export type FaturaUncheckedCreateInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    satinAlmaciId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutFaturaInput
  }

  export type FaturaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    satinAlmaci?: UserUpdateOneRequiredWithoutFaturalarNestedInput
    malKabulRecords?: MalKabulRecordUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    satinAlmaciId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaCreateManyInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    satinAlmaciId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaturaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaturaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    satinAlmaciId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type FaturaListRelationFilter = {
    every?: FaturaWhereInput
    some?: FaturaWhereInput
    none?: FaturaWhereInput
  }

  export type MalKabulRecordListRelationFilter = {
    every?: MalKabulRecordWhereInput
    some?: MalKabulRecordWhereInput
    none?: MalKabulRecordWhereInput
  }

  export type FaturaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MalKabulRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
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

  export type UreticiListRelationFilter = {
    every?: UreticiWhereInput
    some?: UreticiWhereInput
    none?: UreticiWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UreticiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KomisyoncuCountOrderByAggregateInput = {
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

  export type KomisyoncuMaxOrderByAggregateInput = {
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

  export type KomisyoncuMinOrderByAggregateInput = {
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

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
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

  export type OzelFirmaCountOrderByAggregateInput = {
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

  export type OzelFirmaMaxOrderByAggregateInput = {
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

  export type OzelFirmaMinOrderByAggregateInput = {
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

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
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

  export type KomisyoncuNullableScalarRelationFilter = {
    is?: KomisyoncuWhereInput | null
    isNot?: KomisyoncuWhereInput | null
  }

  export type UreticiCountOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrder
    durum?: SortOrder
    iletisim?: SortOrder
    komisyoncuId?: SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrder
  }

  export type UreticiMaxOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrder
    durum?: SortOrder
    iletisim?: SortOrder
    komisyoncuId?: SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrder
  }

  export type UreticiMinOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cinsiyet?: SortOrder
    dogumTarihi?: SortOrder
    durum?: SortOrder
    iletisim?: SortOrder
    komisyoncuId?: SortOrder
    sehir?: SortOrder
    soyad?: SortOrder
    tcNo?: SortOrder
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
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

  export type MustahsilCountOrderByAggregateInput = {
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

  export type MustahsilMaxOrderByAggregateInput = {
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

  export type MustahsilMinOrderByAggregateInput = {
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

  export type UrunCountOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrder
    birim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    durum?: SortOrder
  }

  export type UrunMaxOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrder
    birim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    durum?: SortOrder
  }

  export type UrunMinOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    stokKodu?: SortOrder
    kategori?: SortOrder
    birim?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    durum?: SortOrder
  }

  export type EnumAmbalajTipiFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbalajTipi | EnumAmbalajTipiFieldRefInput<$PrismaModel>
    in?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbalajTipiFilter<$PrismaModel> | $Enums.AmbalajTipi
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

  export type AmbalajCountOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AmbalajAvgOrderByAggregateInput = {
    daraKg?: SortOrder
  }

  export type AmbalajMaxOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AmbalajMinOrderByAggregateInput = {
    id?: SortOrder
    ad?: SortOrder
    tipi?: SortOrder
    daraKg?: SortOrder
    aciklama?: SortOrder
    durum?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AmbalajSumOrderByAggregateInput = {
    daraKg?: SortOrder
  }

  export type EnumAmbalajTipiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbalajTipi | EnumAmbalajTipiFieldRefInput<$PrismaModel>
    in?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbalajTipiWithAggregatesFilter<$PrismaModel> | $Enums.AmbalajTipi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAmbalajTipiFilter<$PrismaModel>
    _max?: NestedEnumAmbalajTipiFilter<$PrismaModel>
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

  export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type EnumSaticiTipiFilter<$PrismaModel = never> = {
    equals?: $Enums.SaticiTipi | EnumSaticiTipiFieldRefInput<$PrismaModel>
    in?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumSaticiTipiFilter<$PrismaModel> | $Enums.SaticiTipi
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

  export type AmbalajNullableScalarRelationFilter = {
    is?: AmbalajWhereInput | null
    isNot?: AmbalajWhereInput | null
  }

  export type FaturaNullableScalarRelationFilter = {
    is?: FaturaWhereInput | null
    isNot?: FaturaWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MustahsilNullableScalarRelationFilter = {
    is?: MustahsilWhereInput | null
    isNot?: MustahsilWhereInput | null
  }

  export type OzelFirmaNullableScalarRelationFilter = {
    is?: OzelFirmaWhereInput | null
    isNot?: OzelFirmaWhereInput | null
  }

  export type UreticiNullableScalarRelationFilter = {
    is?: UreticiWhereInput | null
    isNot?: UreticiWhereInput | null
  }

  export type UrunScalarRelationFilter = {
    is?: UrunWhereInput
    isNot?: UrunWhereInput
  }

  export type MalKabulRecordCountOrderByAggregateInput = {
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
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type MalKabulRecordAvgOrderByAggregateInput = {
    miktar?: SortOrder
    birimFiyat?: SortOrder
    toplamFiyat?: SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type MalKabulRecordMaxOrderByAggregateInput = {
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
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type MalKabulRecordMinOrderByAggregateInput = {
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
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
  }

  export type MalKabulRecordSumOrderByAggregateInput = {
    miktar?: SortOrder
    birimFiyat?: SortOrder
    toplamFiyat?: SortOrder
    paletSayisi?: SortOrder
    kasaSayisi?: SortOrder
    brutKg?: SortOrder
    daraKg?: SortOrder
    girisKg?: SortOrder
    cikmaFireKg?: SortOrder
    netKg?: SortOrder
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

  export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type EnumSaticiTipiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SaticiTipi | EnumSaticiTipiFieldRefInput<$PrismaModel>
    in?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumSaticiTipiWithAggregatesFilter<$PrismaModel> | $Enums.SaticiTipi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSaticiTipiFilter<$PrismaModel>
    _max?: NestedEnumSaticiTipiFilter<$PrismaModel>
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

  export type FaturaCountOrderByAggregateInput = {
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

  export type FaturaAvgOrderByAggregateInput = {
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
  }

  export type FaturaMaxOrderByAggregateInput = {
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

  export type FaturaMinOrderByAggregateInput = {
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

  export type FaturaSumOrderByAggregateInput = {
    toplamTutar?: SortOrder
    kdvOrani?: SortOrder
    kdvTutari?: SortOrder
    genelToplam?: SortOrder
  }

  export type FaturaCreateNestedManyWithoutSatinAlmaciInput = {
    create?: XOR<FaturaCreateWithoutSatinAlmaciInput, FaturaUncheckedCreateWithoutSatinAlmaciInput> | FaturaCreateWithoutSatinAlmaciInput[] | FaturaUncheckedCreateWithoutSatinAlmaciInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutSatinAlmaciInput | FaturaCreateOrConnectWithoutSatinAlmaciInput[]
    createMany?: FaturaCreateManySatinAlmaciInputEnvelope
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
  }

  export type MalKabulRecordCreateNestedManyWithoutMalKabulcuInput = {
    create?: XOR<MalKabulRecordCreateWithoutMalKabulcuInput, MalKabulRecordUncheckedCreateWithoutMalKabulcuInput> | MalKabulRecordCreateWithoutMalKabulcuInput[] | MalKabulRecordUncheckedCreateWithoutMalKabulcuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMalKabulcuInput | MalKabulRecordCreateOrConnectWithoutMalKabulcuInput[]
    createMany?: MalKabulRecordCreateManyMalKabulcuInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type FaturaUncheckedCreateNestedManyWithoutSatinAlmaciInput = {
    create?: XOR<FaturaCreateWithoutSatinAlmaciInput, FaturaUncheckedCreateWithoutSatinAlmaciInput> | FaturaCreateWithoutSatinAlmaciInput[] | FaturaUncheckedCreateWithoutSatinAlmaciInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutSatinAlmaciInput | FaturaCreateOrConnectWithoutSatinAlmaciInput[]
    createMany?: FaturaCreateManySatinAlmaciInputEnvelope
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutMalKabulcuInput = {
    create?: XOR<MalKabulRecordCreateWithoutMalKabulcuInput, MalKabulRecordUncheckedCreateWithoutMalKabulcuInput> | MalKabulRecordCreateWithoutMalKabulcuInput[] | MalKabulRecordUncheckedCreateWithoutMalKabulcuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMalKabulcuInput | MalKabulRecordCreateOrConnectWithoutMalKabulcuInput[]
    createMany?: MalKabulRecordCreateManyMalKabulcuInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FaturaUpdateManyWithoutSatinAlmaciNestedInput = {
    create?: XOR<FaturaCreateWithoutSatinAlmaciInput, FaturaUncheckedCreateWithoutSatinAlmaciInput> | FaturaCreateWithoutSatinAlmaciInput[] | FaturaUncheckedCreateWithoutSatinAlmaciInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutSatinAlmaciInput | FaturaCreateOrConnectWithoutSatinAlmaciInput[]
    upsert?: FaturaUpsertWithWhereUniqueWithoutSatinAlmaciInput | FaturaUpsertWithWhereUniqueWithoutSatinAlmaciInput[]
    createMany?: FaturaCreateManySatinAlmaciInputEnvelope
    set?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    disconnect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    delete?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    update?: FaturaUpdateWithWhereUniqueWithoutSatinAlmaciInput | FaturaUpdateWithWhereUniqueWithoutSatinAlmaciInput[]
    updateMany?: FaturaUpdateManyWithWhereWithoutSatinAlmaciInput | FaturaUpdateManyWithWhereWithoutSatinAlmaciInput[]
    deleteMany?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
  }

  export type MalKabulRecordUpdateManyWithoutMalKabulcuNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutMalKabulcuInput, MalKabulRecordUncheckedCreateWithoutMalKabulcuInput> | MalKabulRecordCreateWithoutMalKabulcuInput[] | MalKabulRecordUncheckedCreateWithoutMalKabulcuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMalKabulcuInput | MalKabulRecordCreateOrConnectWithoutMalKabulcuInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutMalKabulcuInput | MalKabulRecordUpsertWithWhereUniqueWithoutMalKabulcuInput[]
    createMany?: MalKabulRecordCreateManyMalKabulcuInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutMalKabulcuInput | MalKabulRecordUpdateWithWhereUniqueWithoutMalKabulcuInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutMalKabulcuInput | MalKabulRecordUpdateManyWithWhereWithoutMalKabulcuInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type FaturaUncheckedUpdateManyWithoutSatinAlmaciNestedInput = {
    create?: XOR<FaturaCreateWithoutSatinAlmaciInput, FaturaUncheckedCreateWithoutSatinAlmaciInput> | FaturaCreateWithoutSatinAlmaciInput[] | FaturaUncheckedCreateWithoutSatinAlmaciInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutSatinAlmaciInput | FaturaCreateOrConnectWithoutSatinAlmaciInput[]
    upsert?: FaturaUpsertWithWhereUniqueWithoutSatinAlmaciInput | FaturaUpsertWithWhereUniqueWithoutSatinAlmaciInput[]
    createMany?: FaturaCreateManySatinAlmaciInputEnvelope
    set?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    disconnect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    delete?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    update?: FaturaUpdateWithWhereUniqueWithoutSatinAlmaciInput | FaturaUpdateWithWhereUniqueWithoutSatinAlmaciInput[]
    updateMany?: FaturaUpdateManyWithWhereWithoutSatinAlmaciInput | FaturaUpdateManyWithWhereWithoutSatinAlmaciInput[]
    deleteMany?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutMalKabulcuNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutMalKabulcuInput, MalKabulRecordUncheckedCreateWithoutMalKabulcuInput> | MalKabulRecordCreateWithoutMalKabulcuInput[] | MalKabulRecordUncheckedCreateWithoutMalKabulcuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMalKabulcuInput | MalKabulRecordCreateOrConnectWithoutMalKabulcuInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutMalKabulcuInput | MalKabulRecordUpsertWithWhereUniqueWithoutMalKabulcuInput[]
    createMany?: MalKabulRecordCreateManyMalKabulcuInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutMalKabulcuInput | MalKabulRecordUpdateWithWhereUniqueWithoutMalKabulcuInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutMalKabulcuInput | MalKabulRecordUpdateManyWithWhereWithoutMalKabulcuInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordCreateNestedManyWithoutKomisyoncuInput = {
    create?: XOR<MalKabulRecordCreateWithoutKomisyoncuInput, MalKabulRecordUncheckedCreateWithoutKomisyoncuInput> | MalKabulRecordCreateWithoutKomisyoncuInput[] | MalKabulRecordUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutKomisyoncuInput | MalKabulRecordCreateOrConnectWithoutKomisyoncuInput[]
    createMany?: MalKabulRecordCreateManyKomisyoncuInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type UreticiCreateNestedManyWithoutKomisyoncuInput = {
    create?: XOR<UreticiCreateWithoutKomisyoncuInput, UreticiUncheckedCreateWithoutKomisyoncuInput> | UreticiCreateWithoutKomisyoncuInput[] | UreticiUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: UreticiCreateOrConnectWithoutKomisyoncuInput | UreticiCreateOrConnectWithoutKomisyoncuInput[]
    createMany?: UreticiCreateManyKomisyoncuInputEnvelope
    connect?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutKomisyoncuInput = {
    create?: XOR<MalKabulRecordCreateWithoutKomisyoncuInput, MalKabulRecordUncheckedCreateWithoutKomisyoncuInput> | MalKabulRecordCreateWithoutKomisyoncuInput[] | MalKabulRecordUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutKomisyoncuInput | MalKabulRecordCreateOrConnectWithoutKomisyoncuInput[]
    createMany?: MalKabulRecordCreateManyKomisyoncuInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type UreticiUncheckedCreateNestedManyWithoutKomisyoncuInput = {
    create?: XOR<UreticiCreateWithoutKomisyoncuInput, UreticiUncheckedCreateWithoutKomisyoncuInput> | UreticiCreateWithoutKomisyoncuInput[] | UreticiUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: UreticiCreateOrConnectWithoutKomisyoncuInput | UreticiCreateOrConnectWithoutKomisyoncuInput[]
    createMany?: UreticiCreateManyKomisyoncuInputEnvelope
    connect?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MalKabulRecordUpdateManyWithoutKomisyoncuNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutKomisyoncuInput, MalKabulRecordUncheckedCreateWithoutKomisyoncuInput> | MalKabulRecordCreateWithoutKomisyoncuInput[] | MalKabulRecordUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutKomisyoncuInput | MalKabulRecordCreateOrConnectWithoutKomisyoncuInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutKomisyoncuInput | MalKabulRecordUpsertWithWhereUniqueWithoutKomisyoncuInput[]
    createMany?: MalKabulRecordCreateManyKomisyoncuInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutKomisyoncuInput | MalKabulRecordUpdateWithWhereUniqueWithoutKomisyoncuInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutKomisyoncuInput | MalKabulRecordUpdateManyWithWhereWithoutKomisyoncuInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type UreticiUpdateManyWithoutKomisyoncuNestedInput = {
    create?: XOR<UreticiCreateWithoutKomisyoncuInput, UreticiUncheckedCreateWithoutKomisyoncuInput> | UreticiCreateWithoutKomisyoncuInput[] | UreticiUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: UreticiCreateOrConnectWithoutKomisyoncuInput | UreticiCreateOrConnectWithoutKomisyoncuInput[]
    upsert?: UreticiUpsertWithWhereUniqueWithoutKomisyoncuInput | UreticiUpsertWithWhereUniqueWithoutKomisyoncuInput[]
    createMany?: UreticiCreateManyKomisyoncuInputEnvelope
    set?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    disconnect?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    delete?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    connect?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    update?: UreticiUpdateWithWhereUniqueWithoutKomisyoncuInput | UreticiUpdateWithWhereUniqueWithoutKomisyoncuInput[]
    updateMany?: UreticiUpdateManyWithWhereWithoutKomisyoncuInput | UreticiUpdateManyWithWhereWithoutKomisyoncuInput[]
    deleteMany?: UreticiScalarWhereInput | UreticiScalarWhereInput[]
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutKomisyoncuNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutKomisyoncuInput, MalKabulRecordUncheckedCreateWithoutKomisyoncuInput> | MalKabulRecordCreateWithoutKomisyoncuInput[] | MalKabulRecordUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutKomisyoncuInput | MalKabulRecordCreateOrConnectWithoutKomisyoncuInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutKomisyoncuInput | MalKabulRecordUpsertWithWhereUniqueWithoutKomisyoncuInput[]
    createMany?: MalKabulRecordCreateManyKomisyoncuInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutKomisyoncuInput | MalKabulRecordUpdateWithWhereUniqueWithoutKomisyoncuInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutKomisyoncuInput | MalKabulRecordUpdateManyWithWhereWithoutKomisyoncuInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type UreticiUncheckedUpdateManyWithoutKomisyoncuNestedInput = {
    create?: XOR<UreticiCreateWithoutKomisyoncuInput, UreticiUncheckedCreateWithoutKomisyoncuInput> | UreticiCreateWithoutKomisyoncuInput[] | UreticiUncheckedCreateWithoutKomisyoncuInput[]
    connectOrCreate?: UreticiCreateOrConnectWithoutKomisyoncuInput | UreticiCreateOrConnectWithoutKomisyoncuInput[]
    upsert?: UreticiUpsertWithWhereUniqueWithoutKomisyoncuInput | UreticiUpsertWithWhereUniqueWithoutKomisyoncuInput[]
    createMany?: UreticiCreateManyKomisyoncuInputEnvelope
    set?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    disconnect?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    delete?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    connect?: UreticiWhereUniqueInput | UreticiWhereUniqueInput[]
    update?: UreticiUpdateWithWhereUniqueWithoutKomisyoncuInput | UreticiUpdateWithWhereUniqueWithoutKomisyoncuInput[]
    updateMany?: UreticiUpdateManyWithWhereWithoutKomisyoncuInput | UreticiUpdateManyWithWhereWithoutKomisyoncuInput[]
    deleteMany?: UreticiScalarWhereInput | UreticiScalarWhereInput[]
  }

  export type MalKabulRecordCreateNestedManyWithoutOzelFirmaInput = {
    create?: XOR<MalKabulRecordCreateWithoutOzelFirmaInput, MalKabulRecordUncheckedCreateWithoutOzelFirmaInput> | MalKabulRecordCreateWithoutOzelFirmaInput[] | MalKabulRecordUncheckedCreateWithoutOzelFirmaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutOzelFirmaInput | MalKabulRecordCreateOrConnectWithoutOzelFirmaInput[]
    createMany?: MalKabulRecordCreateManyOzelFirmaInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutOzelFirmaInput = {
    create?: XOR<MalKabulRecordCreateWithoutOzelFirmaInput, MalKabulRecordUncheckedCreateWithoutOzelFirmaInput> | MalKabulRecordCreateWithoutOzelFirmaInput[] | MalKabulRecordUncheckedCreateWithoutOzelFirmaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutOzelFirmaInput | MalKabulRecordCreateOrConnectWithoutOzelFirmaInput[]
    createMany?: MalKabulRecordCreateManyOzelFirmaInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUpdateManyWithoutOzelFirmaNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutOzelFirmaInput, MalKabulRecordUncheckedCreateWithoutOzelFirmaInput> | MalKabulRecordCreateWithoutOzelFirmaInput[] | MalKabulRecordUncheckedCreateWithoutOzelFirmaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutOzelFirmaInput | MalKabulRecordCreateOrConnectWithoutOzelFirmaInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutOzelFirmaInput | MalKabulRecordUpsertWithWhereUniqueWithoutOzelFirmaInput[]
    createMany?: MalKabulRecordCreateManyOzelFirmaInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutOzelFirmaInput | MalKabulRecordUpdateWithWhereUniqueWithoutOzelFirmaInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutOzelFirmaInput | MalKabulRecordUpdateManyWithWhereWithoutOzelFirmaInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutOzelFirmaNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutOzelFirmaInput, MalKabulRecordUncheckedCreateWithoutOzelFirmaInput> | MalKabulRecordCreateWithoutOzelFirmaInput[] | MalKabulRecordUncheckedCreateWithoutOzelFirmaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutOzelFirmaInput | MalKabulRecordCreateOrConnectWithoutOzelFirmaInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutOzelFirmaInput | MalKabulRecordUpsertWithWhereUniqueWithoutOzelFirmaInput[]
    createMany?: MalKabulRecordCreateManyOzelFirmaInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutOzelFirmaInput | MalKabulRecordUpdateWithWhereUniqueWithoutOzelFirmaInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutOzelFirmaInput | MalKabulRecordUpdateManyWithWhereWithoutOzelFirmaInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordCreateNestedManyWithoutUreticiInput = {
    create?: XOR<MalKabulRecordCreateWithoutUreticiInput, MalKabulRecordUncheckedCreateWithoutUreticiInput> | MalKabulRecordCreateWithoutUreticiInput[] | MalKabulRecordUncheckedCreateWithoutUreticiInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUreticiInput | MalKabulRecordCreateOrConnectWithoutUreticiInput[]
    createMany?: MalKabulRecordCreateManyUreticiInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type KomisyoncuCreateNestedOneWithoutUreticilerInput = {
    create?: XOR<KomisyoncuCreateWithoutUreticilerInput, KomisyoncuUncheckedCreateWithoutUreticilerInput>
    connectOrCreate?: KomisyoncuCreateOrConnectWithoutUreticilerInput
    connect?: KomisyoncuWhereUniqueInput
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutUreticiInput = {
    create?: XOR<MalKabulRecordCreateWithoutUreticiInput, MalKabulRecordUncheckedCreateWithoutUreticiInput> | MalKabulRecordCreateWithoutUreticiInput[] | MalKabulRecordUncheckedCreateWithoutUreticiInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUreticiInput | MalKabulRecordCreateOrConnectWithoutUreticiInput[]
    createMany?: MalKabulRecordCreateManyUreticiInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MalKabulRecordUpdateManyWithoutUreticiNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutUreticiInput, MalKabulRecordUncheckedCreateWithoutUreticiInput> | MalKabulRecordCreateWithoutUreticiInput[] | MalKabulRecordUncheckedCreateWithoutUreticiInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUreticiInput | MalKabulRecordCreateOrConnectWithoutUreticiInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutUreticiInput | MalKabulRecordUpsertWithWhereUniqueWithoutUreticiInput[]
    createMany?: MalKabulRecordCreateManyUreticiInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutUreticiInput | MalKabulRecordUpdateWithWhereUniqueWithoutUreticiInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutUreticiInput | MalKabulRecordUpdateManyWithWhereWithoutUreticiInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type KomisyoncuUpdateOneWithoutUreticilerNestedInput = {
    create?: XOR<KomisyoncuCreateWithoutUreticilerInput, KomisyoncuUncheckedCreateWithoutUreticilerInput>
    connectOrCreate?: KomisyoncuCreateOrConnectWithoutUreticilerInput
    upsert?: KomisyoncuUpsertWithoutUreticilerInput
    disconnect?: KomisyoncuWhereInput | boolean
    delete?: KomisyoncuWhereInput | boolean
    connect?: KomisyoncuWhereUniqueInput
    update?: XOR<XOR<KomisyoncuUpdateToOneWithWhereWithoutUreticilerInput, KomisyoncuUpdateWithoutUreticilerInput>, KomisyoncuUncheckedUpdateWithoutUreticilerInput>
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutUreticiNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutUreticiInput, MalKabulRecordUncheckedCreateWithoutUreticiInput> | MalKabulRecordCreateWithoutUreticiInput[] | MalKabulRecordUncheckedCreateWithoutUreticiInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUreticiInput | MalKabulRecordCreateOrConnectWithoutUreticiInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutUreticiInput | MalKabulRecordUpsertWithWhereUniqueWithoutUreticiInput[]
    createMany?: MalKabulRecordCreateManyUreticiInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutUreticiInput | MalKabulRecordUpdateWithWhereUniqueWithoutUreticiInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutUreticiInput | MalKabulRecordUpdateManyWithWhereWithoutUreticiInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordCreateNestedManyWithoutMustahsilInput = {
    create?: XOR<MalKabulRecordCreateWithoutMustahsilInput, MalKabulRecordUncheckedCreateWithoutMustahsilInput> | MalKabulRecordCreateWithoutMustahsilInput[] | MalKabulRecordUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMustahsilInput | MalKabulRecordCreateOrConnectWithoutMustahsilInput[]
    createMany?: MalKabulRecordCreateManyMustahsilInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutMustahsilInput = {
    create?: XOR<MalKabulRecordCreateWithoutMustahsilInput, MalKabulRecordUncheckedCreateWithoutMustahsilInput> | MalKabulRecordCreateWithoutMustahsilInput[] | MalKabulRecordUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMustahsilInput | MalKabulRecordCreateOrConnectWithoutMustahsilInput[]
    createMany?: MalKabulRecordCreateManyMustahsilInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUpdateManyWithoutMustahsilNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutMustahsilInput, MalKabulRecordUncheckedCreateWithoutMustahsilInput> | MalKabulRecordCreateWithoutMustahsilInput[] | MalKabulRecordUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMustahsilInput | MalKabulRecordCreateOrConnectWithoutMustahsilInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutMustahsilInput | MalKabulRecordUpsertWithWhereUniqueWithoutMustahsilInput[]
    createMany?: MalKabulRecordCreateManyMustahsilInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutMustahsilInput | MalKabulRecordUpdateWithWhereUniqueWithoutMustahsilInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutMustahsilInput | MalKabulRecordUpdateManyWithWhereWithoutMustahsilInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutMustahsilNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutMustahsilInput, MalKabulRecordUncheckedCreateWithoutMustahsilInput> | MalKabulRecordCreateWithoutMustahsilInput[] | MalKabulRecordUncheckedCreateWithoutMustahsilInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutMustahsilInput | MalKabulRecordCreateOrConnectWithoutMustahsilInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutMustahsilInput | MalKabulRecordUpsertWithWhereUniqueWithoutMustahsilInput[]
    createMany?: MalKabulRecordCreateManyMustahsilInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutMustahsilInput | MalKabulRecordUpdateWithWhereUniqueWithoutMustahsilInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutMustahsilInput | MalKabulRecordUpdateManyWithWhereWithoutMustahsilInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordCreateNestedManyWithoutUrunInput = {
    create?: XOR<MalKabulRecordCreateWithoutUrunInput, MalKabulRecordUncheckedCreateWithoutUrunInput> | MalKabulRecordCreateWithoutUrunInput[] | MalKabulRecordUncheckedCreateWithoutUrunInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUrunInput | MalKabulRecordCreateOrConnectWithoutUrunInput[]
    createMany?: MalKabulRecordCreateManyUrunInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutUrunInput = {
    create?: XOR<MalKabulRecordCreateWithoutUrunInput, MalKabulRecordUncheckedCreateWithoutUrunInput> | MalKabulRecordCreateWithoutUrunInput[] | MalKabulRecordUncheckedCreateWithoutUrunInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUrunInput | MalKabulRecordCreateOrConnectWithoutUrunInput[]
    createMany?: MalKabulRecordCreateManyUrunInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUpdateManyWithoutUrunNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutUrunInput, MalKabulRecordUncheckedCreateWithoutUrunInput> | MalKabulRecordCreateWithoutUrunInput[] | MalKabulRecordUncheckedCreateWithoutUrunInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUrunInput | MalKabulRecordCreateOrConnectWithoutUrunInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutUrunInput | MalKabulRecordUpsertWithWhereUniqueWithoutUrunInput[]
    createMany?: MalKabulRecordCreateManyUrunInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutUrunInput | MalKabulRecordUpdateWithWhereUniqueWithoutUrunInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutUrunInput | MalKabulRecordUpdateManyWithWhereWithoutUrunInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutUrunNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutUrunInput, MalKabulRecordUncheckedCreateWithoutUrunInput> | MalKabulRecordCreateWithoutUrunInput[] | MalKabulRecordUncheckedCreateWithoutUrunInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutUrunInput | MalKabulRecordCreateOrConnectWithoutUrunInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutUrunInput | MalKabulRecordUpsertWithWhereUniqueWithoutUrunInput[]
    createMany?: MalKabulRecordCreateManyUrunInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutUrunInput | MalKabulRecordUpdateWithWhereUniqueWithoutUrunInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutUrunInput | MalKabulRecordUpdateManyWithWhereWithoutUrunInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordCreateNestedManyWithoutAmbalajInput = {
    create?: XOR<MalKabulRecordCreateWithoutAmbalajInput, MalKabulRecordUncheckedCreateWithoutAmbalajInput> | MalKabulRecordCreateWithoutAmbalajInput[] | MalKabulRecordUncheckedCreateWithoutAmbalajInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutAmbalajInput | MalKabulRecordCreateOrConnectWithoutAmbalajInput[]
    createMany?: MalKabulRecordCreateManyAmbalajInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutAmbalajInput = {
    create?: XOR<MalKabulRecordCreateWithoutAmbalajInput, MalKabulRecordUncheckedCreateWithoutAmbalajInput> | MalKabulRecordCreateWithoutAmbalajInput[] | MalKabulRecordUncheckedCreateWithoutAmbalajInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutAmbalajInput | MalKabulRecordCreateOrConnectWithoutAmbalajInput[]
    createMany?: MalKabulRecordCreateManyAmbalajInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type EnumAmbalajTipiFieldUpdateOperationsInput = {
    set?: $Enums.AmbalajTipi
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MalKabulRecordUpdateManyWithoutAmbalajNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutAmbalajInput, MalKabulRecordUncheckedCreateWithoutAmbalajInput> | MalKabulRecordCreateWithoutAmbalajInput[] | MalKabulRecordUncheckedCreateWithoutAmbalajInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutAmbalajInput | MalKabulRecordCreateOrConnectWithoutAmbalajInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutAmbalajInput | MalKabulRecordUpsertWithWhereUniqueWithoutAmbalajInput[]
    createMany?: MalKabulRecordCreateManyAmbalajInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutAmbalajInput | MalKabulRecordUpdateWithWhereUniqueWithoutAmbalajInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutAmbalajInput | MalKabulRecordUpdateManyWithWhereWithoutAmbalajInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutAmbalajNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutAmbalajInput, MalKabulRecordUncheckedCreateWithoutAmbalajInput> | MalKabulRecordCreateWithoutAmbalajInput[] | MalKabulRecordUncheckedCreateWithoutAmbalajInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutAmbalajInput | MalKabulRecordCreateOrConnectWithoutAmbalajInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutAmbalajInput | MalKabulRecordUpsertWithWhereUniqueWithoutAmbalajInput[]
    createMany?: MalKabulRecordCreateManyAmbalajInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutAmbalajInput | MalKabulRecordUpdateWithWhereUniqueWithoutAmbalajInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutAmbalajInput | MalKabulRecordUpdateManyWithWhereWithoutAmbalajInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type AmbalajCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<AmbalajCreateWithoutMalKabulRecordsInput, AmbalajUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: AmbalajCreateOrConnectWithoutMalKabulRecordsInput
    connect?: AmbalajWhereUniqueInput
  }

  export type FaturaCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<FaturaCreateWithoutMalKabulRecordsInput, FaturaUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: FaturaCreateOrConnectWithoutMalKabulRecordsInput
    connect?: FaturaWhereUniqueInput
  }

  export type KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<KomisyoncuCreateWithoutMalKabulRecordsInput, KomisyoncuUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: KomisyoncuCreateOrConnectWithoutMalKabulRecordsInput
    connect?: KomisyoncuWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<UserCreateWithoutMalKabulRecordsInput, UserUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMalKabulRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type MustahsilCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<MustahsilCreateWithoutMalKabulRecordsInput, MustahsilUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: MustahsilCreateOrConnectWithoutMalKabulRecordsInput
    connect?: MustahsilWhereUniqueInput
  }

  export type OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<OzelFirmaCreateWithoutMalKabulRecordsInput, OzelFirmaUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: OzelFirmaCreateOrConnectWithoutMalKabulRecordsInput
    connect?: OzelFirmaWhereUniqueInput
  }

  export type UreticiCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<UreticiCreateWithoutMalKabulRecordsInput, UreticiUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: UreticiCreateOrConnectWithoutMalKabulRecordsInput
    connect?: UreticiWhereUniqueInput
  }

  export type UrunCreateNestedOneWithoutMalKabulRecordsInput = {
    create?: XOR<UrunCreateWithoutMalKabulRecordsInput, UrunUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: UrunCreateOrConnectWithoutMalKabulRecordsInput
    connect?: UrunWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumProductStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductStatus
  }

  export type EnumSaticiTipiFieldUpdateOperationsInput = {
    set?: $Enums.SaticiTipi
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AmbalajUpdateOneWithoutMalKabulRecordsNestedInput = {
    create?: XOR<AmbalajCreateWithoutMalKabulRecordsInput, AmbalajUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: AmbalajCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: AmbalajUpsertWithoutMalKabulRecordsInput
    disconnect?: AmbalajWhereInput | boolean
    delete?: AmbalajWhereInput | boolean
    connect?: AmbalajWhereUniqueInput
    update?: XOR<XOR<AmbalajUpdateToOneWithWhereWithoutMalKabulRecordsInput, AmbalajUpdateWithoutMalKabulRecordsInput>, AmbalajUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type FaturaUpdateOneWithoutMalKabulRecordsNestedInput = {
    create?: XOR<FaturaCreateWithoutMalKabulRecordsInput, FaturaUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: FaturaCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: FaturaUpsertWithoutMalKabulRecordsInput
    disconnect?: FaturaWhereInput | boolean
    delete?: FaturaWhereInput | boolean
    connect?: FaturaWhereUniqueInput
    update?: XOR<XOR<FaturaUpdateToOneWithWhereWithoutMalKabulRecordsInput, FaturaUpdateWithoutMalKabulRecordsInput>, FaturaUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput = {
    create?: XOR<KomisyoncuCreateWithoutMalKabulRecordsInput, KomisyoncuUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: KomisyoncuCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: KomisyoncuUpsertWithoutMalKabulRecordsInput
    disconnect?: KomisyoncuWhereInput | boolean
    delete?: KomisyoncuWhereInput | boolean
    connect?: KomisyoncuWhereUniqueInput
    update?: XOR<XOR<KomisyoncuUpdateToOneWithWhereWithoutMalKabulRecordsInput, KomisyoncuUpdateWithoutMalKabulRecordsInput>, KomisyoncuUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput = {
    create?: XOR<UserCreateWithoutMalKabulRecordsInput, UserUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: UserUpsertWithoutMalKabulRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMalKabulRecordsInput, UserUpdateWithoutMalKabulRecordsInput>, UserUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type MustahsilUpdateOneWithoutMalKabulRecordsNestedInput = {
    create?: XOR<MustahsilCreateWithoutMalKabulRecordsInput, MustahsilUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: MustahsilCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: MustahsilUpsertWithoutMalKabulRecordsInput
    disconnect?: MustahsilWhereInput | boolean
    delete?: MustahsilWhereInput | boolean
    connect?: MustahsilWhereUniqueInput
    update?: XOR<XOR<MustahsilUpdateToOneWithWhereWithoutMalKabulRecordsInput, MustahsilUpdateWithoutMalKabulRecordsInput>, MustahsilUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput = {
    create?: XOR<OzelFirmaCreateWithoutMalKabulRecordsInput, OzelFirmaUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: OzelFirmaCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: OzelFirmaUpsertWithoutMalKabulRecordsInput
    disconnect?: OzelFirmaWhereInput | boolean
    delete?: OzelFirmaWhereInput | boolean
    connect?: OzelFirmaWhereUniqueInput
    update?: XOR<XOR<OzelFirmaUpdateToOneWithWhereWithoutMalKabulRecordsInput, OzelFirmaUpdateWithoutMalKabulRecordsInput>, OzelFirmaUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type UreticiUpdateOneWithoutMalKabulRecordsNestedInput = {
    create?: XOR<UreticiCreateWithoutMalKabulRecordsInput, UreticiUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: UreticiCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: UreticiUpsertWithoutMalKabulRecordsInput
    disconnect?: UreticiWhereInput | boolean
    delete?: UreticiWhereInput | boolean
    connect?: UreticiWhereUniqueInput
    update?: XOR<XOR<UreticiUpdateToOneWithWhereWithoutMalKabulRecordsInput, UreticiUpdateWithoutMalKabulRecordsInput>, UreticiUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput = {
    create?: XOR<UrunCreateWithoutMalKabulRecordsInput, UrunUncheckedCreateWithoutMalKabulRecordsInput>
    connectOrCreate?: UrunCreateOrConnectWithoutMalKabulRecordsInput
    upsert?: UrunUpsertWithoutMalKabulRecordsInput
    connect?: UrunWhereUniqueInput
    update?: XOR<XOR<UrunUpdateToOneWithWhereWithoutMalKabulRecordsInput, UrunUpdateWithoutMalKabulRecordsInput>, UrunUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type UserCreateNestedOneWithoutFaturalarInput = {
    create?: XOR<UserCreateWithoutFaturalarInput, UserUncheckedCreateWithoutFaturalarInput>
    connectOrCreate?: UserCreateOrConnectWithoutFaturalarInput
    connect?: UserWhereUniqueInput
  }

  export type MalKabulRecordCreateNestedManyWithoutFaturaInput = {
    create?: XOR<MalKabulRecordCreateWithoutFaturaInput, MalKabulRecordUncheckedCreateWithoutFaturaInput> | MalKabulRecordCreateWithoutFaturaInput[] | MalKabulRecordUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutFaturaInput | MalKabulRecordCreateOrConnectWithoutFaturaInput[]
    createMany?: MalKabulRecordCreateManyFaturaInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type MalKabulRecordUncheckedCreateNestedManyWithoutFaturaInput = {
    create?: XOR<MalKabulRecordCreateWithoutFaturaInput, MalKabulRecordUncheckedCreateWithoutFaturaInput> | MalKabulRecordCreateWithoutFaturaInput[] | MalKabulRecordUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutFaturaInput | MalKabulRecordCreateOrConnectWithoutFaturaInput[]
    createMany?: MalKabulRecordCreateManyFaturaInputEnvelope
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutFaturalarNestedInput = {
    create?: XOR<UserCreateWithoutFaturalarInput, UserUncheckedCreateWithoutFaturalarInput>
    connectOrCreate?: UserCreateOrConnectWithoutFaturalarInput
    upsert?: UserUpsertWithoutFaturalarInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFaturalarInput, UserUpdateWithoutFaturalarInput>, UserUncheckedUpdateWithoutFaturalarInput>
  }

  export type MalKabulRecordUpdateManyWithoutFaturaNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutFaturaInput, MalKabulRecordUncheckedCreateWithoutFaturaInput> | MalKabulRecordCreateWithoutFaturaInput[] | MalKabulRecordUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutFaturaInput | MalKabulRecordCreateOrConnectWithoutFaturaInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutFaturaInput | MalKabulRecordUpsertWithWhereUniqueWithoutFaturaInput[]
    createMany?: MalKabulRecordCreateManyFaturaInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutFaturaInput | MalKabulRecordUpdateWithWhereUniqueWithoutFaturaInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutFaturaInput | MalKabulRecordUpdateManyWithWhereWithoutFaturaInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutFaturaNestedInput = {
    create?: XOR<MalKabulRecordCreateWithoutFaturaInput, MalKabulRecordUncheckedCreateWithoutFaturaInput> | MalKabulRecordCreateWithoutFaturaInput[] | MalKabulRecordUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: MalKabulRecordCreateOrConnectWithoutFaturaInput | MalKabulRecordCreateOrConnectWithoutFaturaInput[]
    upsert?: MalKabulRecordUpsertWithWhereUniqueWithoutFaturaInput | MalKabulRecordUpsertWithWhereUniqueWithoutFaturaInput[]
    createMany?: MalKabulRecordCreateManyFaturaInputEnvelope
    set?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    disconnect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    delete?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    connect?: MalKabulRecordWhereUniqueInput | MalKabulRecordWhereUniqueInput[]
    update?: MalKabulRecordUpdateWithWhereUniqueWithoutFaturaInput | MalKabulRecordUpdateWithWhereUniqueWithoutFaturaInput[]
    updateMany?: MalKabulRecordUpdateManyWithWhereWithoutFaturaInput | MalKabulRecordUpdateManyWithWhereWithoutFaturaInput[]
    deleteMany?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
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

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
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

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
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

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
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

  export type NestedEnumAmbalajTipiFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbalajTipi | EnumAmbalajTipiFieldRefInput<$PrismaModel>
    in?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbalajTipiFilter<$PrismaModel> | $Enums.AmbalajTipi
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

  export type NestedEnumAmbalajTipiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbalajTipi | EnumAmbalajTipiFieldRefInput<$PrismaModel>
    in?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbalajTipi[] | ListEnumAmbalajTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbalajTipiWithAggregatesFilter<$PrismaModel> | $Enums.AmbalajTipi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAmbalajTipiFilter<$PrismaModel>
    _max?: NestedEnumAmbalajTipiFilter<$PrismaModel>
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

  export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type NestedEnumSaticiTipiFilter<$PrismaModel = never> = {
    equals?: $Enums.SaticiTipi | EnumSaticiTipiFieldRefInput<$PrismaModel>
    in?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumSaticiTipiFilter<$PrismaModel> | $Enums.SaticiTipi
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

  export type NestedEnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type NestedEnumSaticiTipiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SaticiTipi | EnumSaticiTipiFieldRefInput<$PrismaModel>
    in?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    notIn?: $Enums.SaticiTipi[] | ListEnumSaticiTipiFieldRefInput<$PrismaModel>
    not?: NestedEnumSaticiTipiWithAggregatesFilter<$PrismaModel> | $Enums.SaticiTipi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSaticiTipiFilter<$PrismaModel>
    _max?: NestedEnumSaticiTipiFilter<$PrismaModel>
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

  export type FaturaCreateWithoutSatinAlmaciInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutFaturaInput
  }

  export type FaturaUncheckedCreateWithoutSatinAlmaciInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutFaturaInput
  }

  export type FaturaCreateOrConnectWithoutSatinAlmaciInput = {
    where: FaturaWhereUniqueInput
    create: XOR<FaturaCreateWithoutSatinAlmaciInput, FaturaUncheckedCreateWithoutSatinAlmaciInput>
  }

  export type FaturaCreateManySatinAlmaciInputEnvelope = {
    data: FaturaCreateManySatinAlmaciInput | FaturaCreateManySatinAlmaciInput[]
    skipDuplicates?: boolean
  }

  export type MalKabulRecordCreateWithoutMalKabulcuInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutMalKabulcuInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutMalKabulcuInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutMalKabulcuInput, MalKabulRecordUncheckedCreateWithoutMalKabulcuInput>
  }

  export type MalKabulRecordCreateManyMalKabulcuInputEnvelope = {
    data: MalKabulRecordCreateManyMalKabulcuInput | MalKabulRecordCreateManyMalKabulcuInput[]
    skipDuplicates?: boolean
  }

  export type FaturaUpsertWithWhereUniqueWithoutSatinAlmaciInput = {
    where: FaturaWhereUniqueInput
    update: XOR<FaturaUpdateWithoutSatinAlmaciInput, FaturaUncheckedUpdateWithoutSatinAlmaciInput>
    create: XOR<FaturaCreateWithoutSatinAlmaciInput, FaturaUncheckedCreateWithoutSatinAlmaciInput>
  }

  export type FaturaUpdateWithWhereUniqueWithoutSatinAlmaciInput = {
    where: FaturaWhereUniqueInput
    data: XOR<FaturaUpdateWithoutSatinAlmaciInput, FaturaUncheckedUpdateWithoutSatinAlmaciInput>
  }

  export type FaturaUpdateManyWithWhereWithoutSatinAlmaciInput = {
    where: FaturaScalarWhereInput
    data: XOR<FaturaUpdateManyMutationInput, FaturaUncheckedUpdateManyWithoutSatinAlmaciInput>
  }

  export type FaturaScalarWhereInput = {
    AND?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
    OR?: FaturaScalarWhereInput[]
    NOT?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
    id?: StringFilter<"Fatura"> | string
    faturaNo?: StringFilter<"Fatura"> | string
    tarih?: DateTimeFilter<"Fatura"> | Date | string
    toplamTutar?: FloatFilter<"Fatura"> | number
    kdvOrani?: FloatFilter<"Fatura"> | number
    kdvTutari?: FloatFilter<"Fatura"> | number
    genelToplam?: FloatFilter<"Fatura"> | number
    notlar?: StringNullableFilter<"Fatura"> | string | null
    satinAlmaciId?: StringFilter<"Fatura"> | string
    createdAt?: DateTimeFilter<"Fatura"> | Date | string
    updatedAt?: DateTimeFilter<"Fatura"> | Date | string
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutMalKabulcuInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutMalKabulcuInput, MalKabulRecordUncheckedUpdateWithoutMalKabulcuInput>
    create: XOR<MalKabulRecordCreateWithoutMalKabulcuInput, MalKabulRecordUncheckedCreateWithoutMalKabulcuInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutMalKabulcuInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutMalKabulcuInput, MalKabulRecordUncheckedUpdateWithoutMalKabulcuInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutMalKabulcuInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutMalKabulcuInput>
  }

  export type MalKabulRecordScalarWhereInput = {
    AND?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
    OR?: MalKabulRecordScalarWhereInput[]
    NOT?: MalKabulRecordScalarWhereInput | MalKabulRecordScalarWhereInput[]
    id?: StringFilter<"MalKabulRecord"> | string
    tarih?: DateTimeFilter<"MalKabulRecord"> | Date | string
    miktar?: FloatFilter<"MalKabulRecord"> | number
    birimFiyat?: FloatNullableFilter<"MalKabulRecord"> | number | null
    toplamFiyat?: FloatNullableFilter<"MalKabulRecord"> | number | null
    status?: EnumProductStatusFilter<"MalKabulRecord"> | $Enums.ProductStatus
    notlar?: StringNullableFilter<"MalKabulRecord"> | string | null
    malKabulcuId?: StringFilter<"MalKabulRecord"> | string
    komisyoncuId?: StringNullableFilter<"MalKabulRecord"> | string | null
    ureticiId?: StringNullableFilter<"MalKabulRecord"> | string | null
    urunId?: StringFilter<"MalKabulRecord"> | string
    faturaId?: StringNullableFilter<"MalKabulRecord"> | string | null
    createdAt?: DateTimeFilter<"MalKabulRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MalKabulRecord"> | Date | string
    fisNo?: StringFilter<"MalKabulRecord"> | string
    mustahsilId?: StringNullableFilter<"MalKabulRecord"> | string | null
    ozelFirmaId?: StringNullableFilter<"MalKabulRecord"> | string | null
    saticiTipi?: EnumSaticiTipiFilter<"MalKabulRecord"> | $Enums.SaticiTipi
    ambalajId?: StringNullableFilter<"MalKabulRecord"> | string | null
    paletSayisi?: IntFilter<"MalKabulRecord"> | number
    kasaSayisi?: IntFilter<"MalKabulRecord"> | number
    brutKg?: FloatFilter<"MalKabulRecord"> | number
    daraKg?: FloatFilter<"MalKabulRecord"> | number
    girisKg?: FloatFilter<"MalKabulRecord"> | number
    cikmaFireKg?: FloatFilter<"MalKabulRecord"> | number
    netKg?: FloatFilter<"MalKabulRecord"> | number
  }

  export type MalKabulRecordCreateWithoutKomisyoncuInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutKomisyoncuInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutKomisyoncuInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutKomisyoncuInput, MalKabulRecordUncheckedCreateWithoutKomisyoncuInput>
  }

  export type MalKabulRecordCreateManyKomisyoncuInputEnvelope = {
    data: MalKabulRecordCreateManyKomisyoncuInput | MalKabulRecordCreateManyKomisyoncuInput[]
    skipDuplicates?: boolean
  }

  export type UreticiCreateWithoutKomisyoncuInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutUreticiInput
  }

  export type UreticiUncheckedCreateWithoutKomisyoncuInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutUreticiInput
  }

  export type UreticiCreateOrConnectWithoutKomisyoncuInput = {
    where: UreticiWhereUniqueInput
    create: XOR<UreticiCreateWithoutKomisyoncuInput, UreticiUncheckedCreateWithoutKomisyoncuInput>
  }

  export type UreticiCreateManyKomisyoncuInputEnvelope = {
    data: UreticiCreateManyKomisyoncuInput | UreticiCreateManyKomisyoncuInput[]
    skipDuplicates?: boolean
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutKomisyoncuInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutKomisyoncuInput, MalKabulRecordUncheckedUpdateWithoutKomisyoncuInput>
    create: XOR<MalKabulRecordCreateWithoutKomisyoncuInput, MalKabulRecordUncheckedCreateWithoutKomisyoncuInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutKomisyoncuInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutKomisyoncuInput, MalKabulRecordUncheckedUpdateWithoutKomisyoncuInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutKomisyoncuInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutKomisyoncuInput>
  }

  export type UreticiUpsertWithWhereUniqueWithoutKomisyoncuInput = {
    where: UreticiWhereUniqueInput
    update: XOR<UreticiUpdateWithoutKomisyoncuInput, UreticiUncheckedUpdateWithoutKomisyoncuInput>
    create: XOR<UreticiCreateWithoutKomisyoncuInput, UreticiUncheckedCreateWithoutKomisyoncuInput>
  }

  export type UreticiUpdateWithWhereUniqueWithoutKomisyoncuInput = {
    where: UreticiWhereUniqueInput
    data: XOR<UreticiUpdateWithoutKomisyoncuInput, UreticiUncheckedUpdateWithoutKomisyoncuInput>
  }

  export type UreticiUpdateManyWithWhereWithoutKomisyoncuInput = {
    where: UreticiScalarWhereInput
    data: XOR<UreticiUpdateManyMutationInput, UreticiUncheckedUpdateManyWithoutKomisyoncuInput>
  }

  export type UreticiScalarWhereInput = {
    AND?: UreticiScalarWhereInput | UreticiScalarWhereInput[]
    OR?: UreticiScalarWhereInput[]
    NOT?: UreticiScalarWhereInput | UreticiScalarWhereInput[]
    id?: StringFilter<"Uretici"> | string
    ad?: StringFilter<"Uretici"> | string
    createdAt?: DateTimeFilter<"Uretici"> | Date | string
    updatedAt?: DateTimeFilter<"Uretici"> | Date | string
    cinsiyet?: EnumGenderFilter<"Uretici"> | $Enums.Gender
    dogumTarihi?: DateTimeNullableFilter<"Uretici"> | Date | string | null
    durum?: EnumStatusFilter<"Uretici"> | $Enums.Status
    iletisim?: StringNullableFilter<"Uretici"> | string | null
    komisyoncuId?: StringNullableFilter<"Uretici"> | string | null
    sehir?: StringFilter<"Uretici"> | string
    soyad?: StringFilter<"Uretici"> | string
    tcNo?: StringNullableFilter<"Uretici"> | string | null
  }

  export type MalKabulRecordCreateWithoutOzelFirmaInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutOzelFirmaInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutOzelFirmaInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutOzelFirmaInput, MalKabulRecordUncheckedCreateWithoutOzelFirmaInput>
  }

  export type MalKabulRecordCreateManyOzelFirmaInputEnvelope = {
    data: MalKabulRecordCreateManyOzelFirmaInput | MalKabulRecordCreateManyOzelFirmaInput[]
    skipDuplicates?: boolean
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutOzelFirmaInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutOzelFirmaInput, MalKabulRecordUncheckedUpdateWithoutOzelFirmaInput>
    create: XOR<MalKabulRecordCreateWithoutOzelFirmaInput, MalKabulRecordUncheckedCreateWithoutOzelFirmaInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutOzelFirmaInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutOzelFirmaInput, MalKabulRecordUncheckedUpdateWithoutOzelFirmaInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutOzelFirmaInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutOzelFirmaInput>
  }

  export type MalKabulRecordCreateWithoutUreticiInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutUreticiInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutUreticiInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutUreticiInput, MalKabulRecordUncheckedCreateWithoutUreticiInput>
  }

  export type MalKabulRecordCreateManyUreticiInputEnvelope = {
    data: MalKabulRecordCreateManyUreticiInput | MalKabulRecordCreateManyUreticiInput[]
    skipDuplicates?: boolean
  }

  export type KomisyoncuCreateWithoutUreticilerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dukkanAdi: string
    durum?: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutKomisyoncuInput
  }

  export type KomisyoncuUncheckedCreateWithoutUreticilerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dukkanAdi: string
    durum?: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutKomisyoncuInput
  }

  export type KomisyoncuCreateOrConnectWithoutUreticilerInput = {
    where: KomisyoncuWhereUniqueInput
    create: XOR<KomisyoncuCreateWithoutUreticilerInput, KomisyoncuUncheckedCreateWithoutUreticilerInput>
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutUreticiInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutUreticiInput, MalKabulRecordUncheckedUpdateWithoutUreticiInput>
    create: XOR<MalKabulRecordCreateWithoutUreticiInput, MalKabulRecordUncheckedCreateWithoutUreticiInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutUreticiInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutUreticiInput, MalKabulRecordUncheckedUpdateWithoutUreticiInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutUreticiInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutUreticiInput>
  }

  export type KomisyoncuUpsertWithoutUreticilerInput = {
    update: XOR<KomisyoncuUpdateWithoutUreticilerInput, KomisyoncuUncheckedUpdateWithoutUreticilerInput>
    create: XOR<KomisyoncuCreateWithoutUreticilerInput, KomisyoncuUncheckedCreateWithoutUreticilerInput>
    where?: KomisyoncuWhereInput
  }

  export type KomisyoncuUpdateToOneWithWhereWithoutUreticilerInput = {
    where?: KomisyoncuWhereInput
    data: XOR<KomisyoncuUpdateWithoutUreticilerInput, KomisyoncuUncheckedUpdateWithoutUreticilerInput>
  }

  export type KomisyoncuUpdateWithoutUreticilerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUpdateManyWithoutKomisyoncuNestedInput
  }

  export type KomisyoncuUncheckedUpdateWithoutUreticilerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutKomisyoncuNestedInput
  }

  export type MalKabulRecordCreateWithoutMustahsilInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutMustahsilInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutMustahsilInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutMustahsilInput, MalKabulRecordUncheckedCreateWithoutMustahsilInput>
  }

  export type MalKabulRecordCreateManyMustahsilInputEnvelope = {
    data: MalKabulRecordCreateManyMustahsilInput | MalKabulRecordCreateManyMustahsilInput[]
    skipDuplicates?: boolean
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutMustahsilInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutMustahsilInput, MalKabulRecordUncheckedUpdateWithoutMustahsilInput>
    create: XOR<MalKabulRecordCreateWithoutMustahsilInput, MalKabulRecordUncheckedCreateWithoutMustahsilInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutMustahsilInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutMustahsilInput, MalKabulRecordUncheckedUpdateWithoutMustahsilInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutMustahsilInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutMustahsilInput>
  }

  export type MalKabulRecordCreateWithoutUrunInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutUrunInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutUrunInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutUrunInput, MalKabulRecordUncheckedCreateWithoutUrunInput>
  }

  export type MalKabulRecordCreateManyUrunInputEnvelope = {
    data: MalKabulRecordCreateManyUrunInput | MalKabulRecordCreateManyUrunInput[]
    skipDuplicates?: boolean
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutUrunInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutUrunInput, MalKabulRecordUncheckedUpdateWithoutUrunInput>
    create: XOR<MalKabulRecordCreateWithoutUrunInput, MalKabulRecordUncheckedCreateWithoutUrunInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutUrunInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutUrunInput, MalKabulRecordUncheckedUpdateWithoutUrunInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutUrunInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutUrunInput>
  }

  export type MalKabulRecordCreateWithoutAmbalajInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    fatura?: FaturaCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutAmbalajInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutAmbalajInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutAmbalajInput, MalKabulRecordUncheckedCreateWithoutAmbalajInput>
  }

  export type MalKabulRecordCreateManyAmbalajInputEnvelope = {
    data: MalKabulRecordCreateManyAmbalajInput | MalKabulRecordCreateManyAmbalajInput[]
    skipDuplicates?: boolean
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutAmbalajInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutAmbalajInput, MalKabulRecordUncheckedUpdateWithoutAmbalajInput>
    create: XOR<MalKabulRecordCreateWithoutAmbalajInput, MalKabulRecordUncheckedCreateWithoutAmbalajInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutAmbalajInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutAmbalajInput, MalKabulRecordUncheckedUpdateWithoutAmbalajInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutAmbalajInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutAmbalajInput>
  }

  export type AmbalajCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    tipi: $Enums.AmbalajTipi
    daraKg: number
    aciklama?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AmbalajUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    tipi: $Enums.AmbalajTipi
    daraKg: number
    aciklama?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AmbalajCreateOrConnectWithoutMalKabulRecordsInput = {
    where: AmbalajWhereUniqueInput
    create: XOR<AmbalajCreateWithoutMalKabulRecordsInput, AmbalajUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type FaturaCreateWithoutMalKabulRecordsInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    satinAlmaci: UserCreateNestedOneWithoutFaturalarInput
  }

  export type FaturaUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    satinAlmaciId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FaturaCreateOrConnectWithoutMalKabulRecordsInput = {
    where: FaturaWhereUniqueInput
    create: XOR<FaturaCreateWithoutMalKabulRecordsInput, FaturaUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type KomisyoncuCreateWithoutMalKabulRecordsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dukkanAdi: string
    durum?: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    ureticiler?: UreticiCreateNestedManyWithoutKomisyoncuInput
  }

  export type KomisyoncuUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dukkanAdi: string
    durum?: $Enums.Status
    komisyonNo: string
    komisyonKodu: string
    sehir: string
    vkn?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    ureticiler?: UreticiUncheckedCreateNestedManyWithoutKomisyoncuInput
  }

  export type KomisyoncuCreateOrConnectWithoutMalKabulRecordsInput = {
    where: KomisyoncuWhereUniqueInput
    create: XOR<KomisyoncuCreateWithoutMalKabulRecordsInput, KomisyoncuUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type UserCreateWithoutMalKabulRecordsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    faturalar?: FaturaCreateNestedManyWithoutSatinAlmaciInput
  }

  export type UserUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    faturalar?: FaturaUncheckedCreateNestedManyWithoutSatinAlmaciInput
  }

  export type UserCreateOrConnectWithoutMalKabulRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMalKabulRecordsInput, UserUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type MustahsilCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: $Enums.Gender
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MustahsilUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    soyad: string
    dogumTarihi: Date | string
    tcKimlikNo: string
    mustahsilNo: string
    iletisim?: string | null
    bankaAdi?: string | null
    ibanAdresi?: string | null
    adres?: string | null
    cinsiyet: $Enums.Gender
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MustahsilCreateOrConnectWithoutMalKabulRecordsInput = {
    where: MustahsilWhereUniqueInput
    create: XOR<MustahsilCreateWithoutMalKabulRecordsInput, MustahsilUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type OzelFirmaCreateWithoutMalKabulRecordsInput = {
    id?: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OzelFirmaUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    firmaAdi: string
    firmaNo: string
    vkn?: string | null
    vergiDairesi?: string | null
    yetkiliAdi?: string | null
    yetkiliTelefon?: string | null
    sehir: string
    adres?: string | null
    durum?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OzelFirmaCreateOrConnectWithoutMalKabulRecordsInput = {
    where: OzelFirmaWhereUniqueInput
    create: XOR<OzelFirmaCreateWithoutMalKabulRecordsInput, OzelFirmaUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type UreticiCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
    komisyoncu?: KomisyoncuCreateNestedOneWithoutUreticilerInput
  }

  export type UreticiUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    komisyoncuId?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
  }

  export type UreticiCreateOrConnectWithoutMalKabulRecordsInput = {
    where: UreticiWhereUniqueInput
    create: XOR<UreticiCreateWithoutMalKabulRecordsInput, UreticiUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type UrunCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    createdAt?: Date | string
    updatedAt?: Date | string
    durum?: $Enums.Status
  }

  export type UrunUncheckedCreateWithoutMalKabulRecordsInput = {
    id?: string
    ad: string
    stokKodu: string
    kategori?: string | null
    birim: string
    createdAt?: Date | string
    updatedAt?: Date | string
    durum?: $Enums.Status
  }

  export type UrunCreateOrConnectWithoutMalKabulRecordsInput = {
    where: UrunWhereUniqueInput
    create: XOR<UrunCreateWithoutMalKabulRecordsInput, UrunUncheckedCreateWithoutMalKabulRecordsInput>
  }

  export type AmbalajUpsertWithoutMalKabulRecordsInput = {
    update: XOR<AmbalajUpdateWithoutMalKabulRecordsInput, AmbalajUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<AmbalajCreateWithoutMalKabulRecordsInput, AmbalajUncheckedCreateWithoutMalKabulRecordsInput>
    where?: AmbalajWhereInput
  }

  export type AmbalajUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: AmbalajWhereInput
    data: XOR<AmbalajUpdateWithoutMalKabulRecordsInput, AmbalajUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type AmbalajUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: EnumAmbalajTipiFieldUpdateOperationsInput | $Enums.AmbalajTipi
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AmbalajUncheckedUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    tipi?: EnumAmbalajTipiFieldUpdateOperationsInput | $Enums.AmbalajTipi
    daraKg?: FloatFieldUpdateOperationsInput | number
    aciklama?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaturaUpsertWithoutMalKabulRecordsInput = {
    update: XOR<FaturaUpdateWithoutMalKabulRecordsInput, FaturaUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<FaturaCreateWithoutMalKabulRecordsInput, FaturaUncheckedCreateWithoutMalKabulRecordsInput>
    where?: FaturaWhereInput
  }

  export type FaturaUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: FaturaWhereInput
    data: XOR<FaturaUpdateWithoutMalKabulRecordsInput, FaturaUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type FaturaUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    satinAlmaci?: UserUpdateOneRequiredWithoutFaturalarNestedInput
  }

  export type FaturaUncheckedUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    satinAlmaciId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KomisyoncuUpsertWithoutMalKabulRecordsInput = {
    update: XOR<KomisyoncuUpdateWithoutMalKabulRecordsInput, KomisyoncuUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<KomisyoncuCreateWithoutMalKabulRecordsInput, KomisyoncuUncheckedCreateWithoutMalKabulRecordsInput>
    where?: KomisyoncuWhereInput
  }

  export type KomisyoncuUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: KomisyoncuWhereInput
    data: XOR<KomisyoncuUpdateWithoutMalKabulRecordsInput, KomisyoncuUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type KomisyoncuUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiler?: UreticiUpdateManyWithoutKomisyoncuNestedInput
  }

  export type KomisyoncuUncheckedUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dukkanAdi?: StringFieldUpdateOperationsInput | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    komisyonNo?: StringFieldUpdateOperationsInput | string
    komisyonKodu?: StringFieldUpdateOperationsInput | string
    sehir?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiler?: UreticiUncheckedUpdateManyWithoutKomisyoncuNestedInput
  }

  export type UserUpsertWithoutMalKabulRecordsInput = {
    update: XOR<UserUpdateWithoutMalKabulRecordsInput, UserUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<UserCreateWithoutMalKabulRecordsInput, UserUncheckedCreateWithoutMalKabulRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMalKabulRecordsInput, UserUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type UserUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faturalar?: FaturaUpdateManyWithoutSatinAlmaciNestedInput
  }

  export type UserUncheckedUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    faturalar?: FaturaUncheckedUpdateManyWithoutSatinAlmaciNestedInput
  }

  export type MustahsilUpsertWithoutMalKabulRecordsInput = {
    update: XOR<MustahsilUpdateWithoutMalKabulRecordsInput, MustahsilUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<MustahsilCreateWithoutMalKabulRecordsInput, MustahsilUncheckedCreateWithoutMalKabulRecordsInput>
    where?: MustahsilWhereInput
  }

  export type MustahsilUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: MustahsilWhereInput
    data: XOR<MustahsilUpdateWithoutMalKabulRecordsInput, MustahsilUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type MustahsilUpdateWithoutMalKabulRecordsInput = {
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
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MustahsilUncheckedUpdateWithoutMalKabulRecordsInput = {
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
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OzelFirmaUpsertWithoutMalKabulRecordsInput = {
    update: XOR<OzelFirmaUpdateWithoutMalKabulRecordsInput, OzelFirmaUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<OzelFirmaCreateWithoutMalKabulRecordsInput, OzelFirmaUncheckedCreateWithoutMalKabulRecordsInput>
    where?: OzelFirmaWhereInput
  }

  export type OzelFirmaUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: OzelFirmaWhereInput
    data: XOR<OzelFirmaUpdateWithoutMalKabulRecordsInput, OzelFirmaUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type OzelFirmaUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OzelFirmaUncheckedUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmaAdi?: StringFieldUpdateOperationsInput | string
    firmaNo?: StringFieldUpdateOperationsInput | string
    vkn?: NullableStringFieldUpdateOperationsInput | string | null
    vergiDairesi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliAdi?: NullableStringFieldUpdateOperationsInput | string | null
    yetkiliTelefon?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    adres?: NullableStringFieldUpdateOperationsInput | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UreticiUpsertWithoutMalKabulRecordsInput = {
    update: XOR<UreticiUpdateWithoutMalKabulRecordsInput, UreticiUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<UreticiCreateWithoutMalKabulRecordsInput, UreticiUncheckedCreateWithoutMalKabulRecordsInput>
    where?: UreticiWhereInput
  }

  export type UreticiUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: UreticiWhereInput
    data: XOR<UreticiUpdateWithoutMalKabulRecordsInput, UreticiUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type UreticiUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncu?: KomisyoncuUpdateOneWithoutUreticilerNestedInput
  }

  export type UreticiUncheckedUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UrunUpsertWithoutMalKabulRecordsInput = {
    update: XOR<UrunUpdateWithoutMalKabulRecordsInput, UrunUncheckedUpdateWithoutMalKabulRecordsInput>
    create: XOR<UrunCreateWithoutMalKabulRecordsInput, UrunUncheckedCreateWithoutMalKabulRecordsInput>
    where?: UrunWhereInput
  }

  export type UrunUpdateToOneWithWhereWithoutMalKabulRecordsInput = {
    where?: UrunWhereInput
    data: XOR<UrunUpdateWithoutMalKabulRecordsInput, UrunUncheckedUpdateWithoutMalKabulRecordsInput>
  }

  export type UrunUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type UrunUncheckedUpdateWithoutMalKabulRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    stokKodu?: StringFieldUpdateOperationsInput | string
    kategori?: NullableStringFieldUpdateOperationsInput | string | null
    birim?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type UserCreateWithoutFaturalarInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordCreateNestedManyWithoutMalKabulcuInput
  }

  export type UserUncheckedCreateWithoutFaturalarInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    malKabulRecords?: MalKabulRecordUncheckedCreateNestedManyWithoutMalKabulcuInput
  }

  export type UserCreateOrConnectWithoutFaturalarInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFaturalarInput, UserUncheckedCreateWithoutFaturalarInput>
  }

  export type MalKabulRecordCreateWithoutFaturaInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
    ambalaj?: AmbalajCreateNestedOneWithoutMalKabulRecordsInput
    komisyoncu?: KomisyoncuCreateNestedOneWithoutMalKabulRecordsInput
    malKabulcu: UserCreateNestedOneWithoutMalKabulRecordsInput
    mustahsil?: MustahsilCreateNestedOneWithoutMalKabulRecordsInput
    ozelFirma?: OzelFirmaCreateNestedOneWithoutMalKabulRecordsInput
    uretici?: UreticiCreateNestedOneWithoutMalKabulRecordsInput
    urun: UrunCreateNestedOneWithoutMalKabulRecordsInput
  }

  export type MalKabulRecordUncheckedCreateWithoutFaturaInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordCreateOrConnectWithoutFaturaInput = {
    where: MalKabulRecordWhereUniqueInput
    create: XOR<MalKabulRecordCreateWithoutFaturaInput, MalKabulRecordUncheckedCreateWithoutFaturaInput>
  }

  export type MalKabulRecordCreateManyFaturaInputEnvelope = {
    data: MalKabulRecordCreateManyFaturaInput | MalKabulRecordCreateManyFaturaInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFaturalarInput = {
    update: XOR<UserUpdateWithoutFaturalarInput, UserUncheckedUpdateWithoutFaturalarInput>
    create: XOR<UserCreateWithoutFaturalarInput, UserUncheckedCreateWithoutFaturalarInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFaturalarInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFaturalarInput, UserUncheckedUpdateWithoutFaturalarInput>
  }

  export type UserUpdateWithoutFaturalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUpdateManyWithoutMalKabulcuNestedInput
  }

  export type UserUncheckedUpdateWithoutFaturalarInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutMalKabulcuNestedInput
  }

  export type MalKabulRecordUpsertWithWhereUniqueWithoutFaturaInput = {
    where: MalKabulRecordWhereUniqueInput
    update: XOR<MalKabulRecordUpdateWithoutFaturaInput, MalKabulRecordUncheckedUpdateWithoutFaturaInput>
    create: XOR<MalKabulRecordCreateWithoutFaturaInput, MalKabulRecordUncheckedCreateWithoutFaturaInput>
  }

  export type MalKabulRecordUpdateWithWhereUniqueWithoutFaturaInput = {
    where: MalKabulRecordWhereUniqueInput
    data: XOR<MalKabulRecordUpdateWithoutFaturaInput, MalKabulRecordUncheckedUpdateWithoutFaturaInput>
  }

  export type MalKabulRecordUpdateManyWithWhereWithoutFaturaInput = {
    where: MalKabulRecordScalarWhereInput
    data: XOR<MalKabulRecordUpdateManyMutationInput, MalKabulRecordUncheckedUpdateManyWithoutFaturaInput>
  }

  export type FaturaCreateManySatinAlmaciInput = {
    id?: string
    faturaNo: string
    tarih?: Date | string
    toplamTutar: number
    kdvOrani?: number
    kdvTutari: number
    genelToplam: number
    notlar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MalKabulRecordCreateManyMalKabulcuInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type FaturaUpdateWithoutSatinAlmaciInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaUncheckedUpdateWithoutSatinAlmaciInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaUncheckedUpdateManyWithoutSatinAlmaciInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaNo?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    toplamTutar?: FloatFieldUpdateOperationsInput | number
    kdvOrani?: FloatFieldUpdateOperationsInput | number
    kdvTutari?: FloatFieldUpdateOperationsInput | number
    genelToplam?: FloatFieldUpdateOperationsInput | number
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MalKabulRecordUpdateWithoutMalKabulcuInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutMalKabulcuInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutMalKabulcuInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordCreateManyKomisyoncuInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type UreticiCreateManyKomisyoncuInput = {
    id?: string
    ad: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cinsiyet: $Enums.Gender
    dogumTarihi?: Date | string | null
    durum?: $Enums.Status
    iletisim?: string | null
    sehir: string
    soyad: string
    tcNo?: string | null
  }

  export type MalKabulRecordUpdateWithoutKomisyoncuInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutKomisyoncuInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutKomisyoncuInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type UreticiUpdateWithoutKomisyoncuInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUpdateManyWithoutUreticiNestedInput
  }

  export type UreticiUncheckedUpdateWithoutKomisyoncuInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulRecords?: MalKabulRecordUncheckedUpdateManyWithoutUreticiNestedInput
  }

  export type UreticiUncheckedUpdateManyWithoutKomisyoncuInput = {
    id?: StringFieldUpdateOperationsInput | string
    ad?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cinsiyet?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    dogumTarihi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durum?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    iletisim?: NullableStringFieldUpdateOperationsInput | string | null
    sehir?: StringFieldUpdateOperationsInput | string
    soyad?: StringFieldUpdateOperationsInput | string
    tcNo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MalKabulRecordCreateManyOzelFirmaInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateWithoutOzelFirmaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutOzelFirmaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutOzelFirmaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordCreateManyUreticiInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateWithoutUreticiInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutUreticiInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutUreticiInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordCreateManyMustahsilInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateWithoutMustahsilInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutMustahsilInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutMustahsilInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordCreateManyUrunInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateWithoutUrunInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutUrunInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutUrunInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordCreateManyAmbalajInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    faturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateWithoutAmbalajInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    fatura?: FaturaUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutAmbalajInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutAmbalajInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    faturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordCreateManyFaturaInput = {
    id?: string
    tarih?: Date | string
    miktar: number
    birimFiyat?: number | null
    toplamFiyat?: number | null
    status?: $Enums.ProductStatus
    notlar?: string | null
    malKabulcuId: string
    komisyoncuId?: string | null
    ureticiId?: string | null
    urunId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fisNo: string
    mustahsilId?: string | null
    ozelFirmaId?: string | null
    saticiTipi?: $Enums.SaticiTipi
    ambalajId?: string | null
    paletSayisi?: number
    kasaSayisi?: number
    brutKg?: number
    daraKg?: number
    girisKg?: number
    cikmaFireKg?: number
    netKg?: number
  }

  export type MalKabulRecordUpdateWithoutFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
    ambalaj?: AmbalajUpdateOneWithoutMalKabulRecordsNestedInput
    komisyoncu?: KomisyoncuUpdateOneWithoutMalKabulRecordsNestedInput
    malKabulcu?: UserUpdateOneRequiredWithoutMalKabulRecordsNestedInput
    mustahsil?: MustahsilUpdateOneWithoutMalKabulRecordsNestedInput
    ozelFirma?: OzelFirmaUpdateOneWithoutMalKabulRecordsNestedInput
    uretici?: UreticiUpdateOneWithoutMalKabulRecordsNestedInput
    urun?: UrunUpdateOneRequiredWithoutMalKabulRecordsNestedInput
  }

  export type MalKabulRecordUncheckedUpdateWithoutFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
  }

  export type MalKabulRecordUncheckedUpdateManyWithoutFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tarih?: DateTimeFieldUpdateOperationsInput | Date | string
    miktar?: FloatFieldUpdateOperationsInput | number
    birimFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    toplamFiyat?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    notlar?: NullableStringFieldUpdateOperationsInput | string | null
    malKabulcuId?: StringFieldUpdateOperationsInput | string
    komisyoncuId?: NullableStringFieldUpdateOperationsInput | string | null
    ureticiId?: NullableStringFieldUpdateOperationsInput | string | null
    urunId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisNo?: StringFieldUpdateOperationsInput | string
    mustahsilId?: NullableStringFieldUpdateOperationsInput | string | null
    ozelFirmaId?: NullableStringFieldUpdateOperationsInput | string | null
    saticiTipi?: EnumSaticiTipiFieldUpdateOperationsInput | $Enums.SaticiTipi
    ambalajId?: NullableStringFieldUpdateOperationsInput | string | null
    paletSayisi?: IntFieldUpdateOperationsInput | number
    kasaSayisi?: IntFieldUpdateOperationsInput | number
    brutKg?: FloatFieldUpdateOperationsInput | number
    daraKg?: FloatFieldUpdateOperationsInput | number
    girisKg?: FloatFieldUpdateOperationsInput | number
    cikmaFireKg?: FloatFieldUpdateOperationsInput | number
    netKg?: FloatFieldUpdateOperationsInput | number
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