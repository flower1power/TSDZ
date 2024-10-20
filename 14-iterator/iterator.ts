class ObjTest {
  constructor(
    public id: number,
    public date: Date,
    public title: string,
  ) {}
}

interface ISort {
  iteratorType: 'id' | 'date';
  sortBy?: 'asc' | 'desc';
}

class ListObj {
  private objs: ObjTest[] = [];

  public sortById(sortBy: ISort['sortBy']) {
    let newObjs = this.objs.slice().sort((a, b) => a.id - b.id);

    if (sortBy === 'desc') {
      newObjs.reverse();
    }

    this.objs = newObjs;
  }

  public sortByDate(sortBy: ISort['sortBy']) {
    const newObjs = this.objs
      .slice()
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    if (sortBy === 'desc') {
      newObjs.reverse();
    }

    this.objs = newObjs;
  }

  addObj(data: ObjTest): void {
    this.objs.push(data);
  }

  getObjs(): ObjTest[] {
    return this.objs;
  }

  count(): number {
    return this.objs.length;
  }

  getIterator(sort: ISort): IIterator2<ObjTest> {
    return sort.iteratorType === 'id'
      ? new IdObjIteration(this, sort.sortBy)
      : new DateObjIteration(this, sort.sortBy);
  }
}

interface IIterator2<T> {
  current(): T | undefined;

  next(): T | undefined;

  prev(): T | undefined;

  index(): number;

  reset(): void;
}

class IdObjIteration implements IIterator2<ObjTest> {
  private position: number = 0;
  private listObj: ListObj;

  constructor(listObj: ListObj, sortBy: ISort['sortBy']) {
    listObj.sortById(sortBy);
    this.listObj = listObj;
  }

  current(): ObjTest | undefined {
    return this.listObj.getObjs()[this.position];
  }

  next(): ObjTest | undefined {
    if (this.position >= this.listObj.count() - 1) {
      console.log('Это конец массива');
      return undefined;
    }

    this.position += 1;
    return this.current();
  }

  prev(): ObjTest | undefined {
    if (this.position <= 0) {
      console.log('Это начало массива');
      return undefined;
    }

    this.position -= 1;
    return this.current();
  }

  index(): number {
    return this.position;
  }

  reset(): void {
    this.position = 0;
  }
}

class DateObjIteration implements IIterator2<ObjTest> {
  private position: number = 0;
  private listObj: ListObj;

  constructor(listObj: ListObj, sortBy: ISort['sortBy']) {
    listObj.sortByDate(sortBy);
    this.listObj = listObj;
  }

  current(): ObjTest | undefined {
    return this.listObj.getObjs()[this.position];
  }

  next(): ObjTest | undefined {
    if (this.position >= this.listObj.count() - 1) {
      console.log('Это конец массива');
      return undefined;
    }

    this.position += 1;
    return this.current();
  }

  prev(): ObjTest | undefined {
    if (this.position <= 0) {
      console.log('Это начало массива');
      return undefined;
    }

    this.position -= 1;
    return this.current();
  }

  index(): number {
    return this.position;
  }

  reset(): void {
    this.position = 0;
  }
}

const objList = new ListObj();
objList.addObj(new ObjTest(5, new Date('2024-03-03'), 'TECT5'));
objList.addObj(new ObjTest(3, new Date('2024-02-02'), 'TECT3'));
objList.addObj(new ObjTest(1, new Date('2024-01-01'), 'TECT1'));

const iterator2 = objList.getIterator({ iteratorType: 'id' });

console.log(iterator2.current());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.index());

const iterator3 = objList.getIterator({
  iteratorType: 'id',
  sortBy: 'desc',
});

console.log(iterator3.current());
console.log(iterator3.next());
console.log(iterator3.next());
console.log(iterator3.index());

const iterator4 = objList.getIterator({ iteratorType: 'date' });

console.log(iterator4.current());
console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.index());

const iterator5 = objList.getIterator({
  iteratorType: 'date',
  sortBy: 'desc',
});

console.log(iterator5.current());
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.index());
