declare module 'sort-by' {
  type FilterType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'function'
    | 'undefined';

  export function type(type: FilterType): (arg: any) => boolean;

  export function sort<T extends string>(
    prop: T,
    map?: (prop: T, value: any) => any,
  ): (a: Record<T, any>, b: Record<T, any>) => number;

  export function sortBy<T extends string>(
    ...args: (T | ((prop: T, value: any) => any))[]
  ): (obj1: Record<T, any>, obj2: Record<T, any>) => number;
}
