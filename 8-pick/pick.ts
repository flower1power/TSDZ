const user26 = {
  name: 'Viktor',
  age: 28,
  skills: ['TS', 'JS'],
};

const result1 = pickObjectKeys(user26, ['age', 'skills']); // { age: 28, skills: ['TS', 'JS'] }

type TPickObjectKeys<T, K extends keyof T> = {
  [P in K]: T[P];
};

function pickObjectKeys<T extends Record<PropertyKey, any>, K extends keyof T>(
  user: T,
  keys: K[],
): TPickObjectKeys<T, K> {
  return keys.reduce(
    (obj, key) => {
      return { ...obj, [key]: user[key] };
    },
    {} as TPickObjectKeys<T, K>,
  );
}

console.log(result1);
