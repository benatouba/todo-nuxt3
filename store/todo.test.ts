import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTodoStore } from './todo';

const getFirstTodoId = (store: ReturnType<useTodoStore>) => {
  return store.items[0].id;
};

beforeAll(() => {
  setActivePinia(createPinia());
});

describe('initializes', () => {
  test('works', () => {
    expect(true).toBe(true);
  });
});

describe('useTodoStore', () => {
  let store: ReturnType<typeof useTodoStore>;
  const label = 'Test my code!';

  beforeEach(() => {
    store = useTodoStore();
  });

  afterEach(() => {
    store.$reset();
  });

  test('references a store', () => {
    expect(store).toBeDefined();
  });

  test('has empty todos on init', () => {
    expect(store.items).toStrictEqual([]);
  });

  test('adds a todo', () => {
    store.add({ label });
    expect(store.items).toStrictEqual([
      {
        id: expect.any(String),
        label,
        done: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }
    ]);
  });

  test('gets todo by id', () => {
    store.add({ label: label });
    const id = getFirstTodoId(store);
    const item = store.getTodoById(id);
    expect(item.label).toBe(label);
  });

  test('gets ordered todos without mutating original', async () => {
    const items = [
      {
        createdAt: new Date(2022, 2, 14)
      },
      {
        createdAt: new Date(2020, 2, 14)
      },
      {
        createdAt: new Date(2021, 2, 14)
      },
      {
        createdAt: new Date(2019, 2, 14)
      }
    ];

    // @ts-ignore
    store.items = items;

    const sortedItems = store.getOrderedTodos;

    expect(sortedItems[0].createdAt.getFullYear()).toBe(2019);
    expect(sortedItems[1].createdAt.getFullYear()).toBe(2020);
    expect(sortedItems[2].createdAt.getFullYear()).toBe(2021);
    expect(sortedItems[3].createdAt.getFullYear()).toBe(2022);
    expect(store.items[0].createdAt.getFullYear()).toBe(2022);
  });

  test('removes a todo', () => {
    store.add({ label });
    const id = getFirstTodoId(store);
    store.remove(id);
    expect(store.items).toStrictEqual([]);
  });

  test('updates a todo done', () => {
    store.add({ label });
    const id = getFirstTodoId(store);
    store.update(id, { done: true });
    expect(store.getTodoById(id).done).toBe(true);
  });

  test('updates a todo label', () => {
    store.add({ label });
    const id = getFirstTodoId(store);
    store.update(id, { label: 'Updated label' });
    expect(store.getTodoById(id).label).toBe('Updated label');
  });
});
