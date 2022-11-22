import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
// crypto.randomUUID // alternative for uuid

export interface Todo {
  id: string;
  label: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Todos = Todo[];

export interface TodoAdd {
  label: string;
}

export interface TodoUpdate {
  label?: string;
  done?: boolean;
}

interface TodoState {
  items: Todos;
}

const state = (): TodoState => ({
  items: [],
});

const getters = {
  getTodoById: (state: TodoState) => {
    return (id: string) =>
      state.items.find((item) => !!item && (item as Todo).id === id);
  },
  getSortedTodos: (state: TodoState) => {
    return [...state.items].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  },
};

export const useTodoStore = defineStore('todoStore', {
  state,
  getters,
  actions: {
  add(todo: TodoAdd) {
    const id = uuid();
    const itemToAdd = {
      id,
      ...todo,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.items.push(itemToAdd);
  },

  remove(id: string) {
    this.items = this.items.filter((todo) => todo.id !== id);
  },

  update(id: string, update: TodoUpdate) {
    const items = this.items as Todos;
    const index = this.items.findIndex((item) => !!item && (item as Todo).id === id);
    items[index] = { ...items[index], ...update, updatedAt: new Date() };
  }
}
});
