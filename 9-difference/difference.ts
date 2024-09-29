interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

type TDifference = Omit<IA, keyof IB>;
type TObj = Record<PropertyKey, any>;

let aa: IA = { a: 5, b: '' };
let bb: IB = { a: 10, c: true };

function difference<T extends TObj, K extends TObj>(
  objA: T,
  objB: K,
): TDifference {
  return Object.fromEntries(
    Object.entries(objA).filter(([key]) => {
      return !Object.keys(objB).includes(key);
    }),
  ) as TDifference;
}

let v0: TDifference = difference(aa, bb);
console.log(v0);
