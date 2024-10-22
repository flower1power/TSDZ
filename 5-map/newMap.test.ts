import { newMap } from './newMap.js';

describe('test newMap', () => {
  let newMapInstance: newMap;

  beforeEach(() => {
    newMapInstance = new newMap();
  });

  test('Добавление элемента', () => {
    newMapInstance.set('key', 'value');
    const result = newMapInstance.get('key');
    expect(result).toEqual([['key', 'value']]);
  });

  test('Перезапись элемента', () => {
    newMapInstance.set('key', 'value');
    newMapInstance.set('key', 'newValue');
    const result = newMapInstance.get('key');
    expect(result).toEqual([['key', 'newValue']]);
  });

  test('Удаление единственного элемента', () => {
    newMapInstance.set('key', 'value');
    newMapInstance.delete('key');
    const result = newMapInstance.get('key');
    expect(result).toEqual([]);
  });

  test('Удаление одного элемента из нескольких', () => {
    newMapInstance.set('name', 'value');
    newMapInstance.set('nama', 'value2');
    newMapInstance.delete('name');
    const result = newMapInstance.bucket[0].data;
    expect(result).toEqual([['nama', 'value2']]);
  });
});
