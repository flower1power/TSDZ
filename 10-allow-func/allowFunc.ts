class User29 {
  @AllowFunc((a: number) => a > 10)
  age: number = 30;
}

function AllowFunc(func: (arg: any) => boolean) {
  return (target: Object, propertyKey: string | symbol) => {
    let value: number;

    function getter() {
      return value;
    }

    function setter(newValue: number) {
      if (func(newValue)) {
        value = newValue;
      } else {
        console.log('Не удовлетворяет требованиям');
      }
    }

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
    });
  };
}

const user29 = new User29();
console.log(user29.age);
user29.age = 40;
console.log(user29.age);
user29.age = 10;
console.log(user29.age);
