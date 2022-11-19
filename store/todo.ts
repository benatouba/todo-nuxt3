import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid';
// crypto.randomUUID // alternative for uuid

export interface Todo {
	id: string;
	label: string;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export type Todos = Todo[] | undefined[];

export interface TodoAdd {
	label: string;
}

export interface TodoUpdate {
	label?: string;
	done?: boolean;
	// updatedAt?: Date;
}

export interface TodoState {
	items: Todos;
}

const state = (): TodoState => ({
	items: [],
})

const getters = {
	getTodoById: (state: TodoState) => {
		return (id: string) => {
			return state.items.find((item: Todo) => item.id === id);
		}
	},
	getOrderedTodos: (state: TodoState) =>
		[...state.items].sort((a: Todo, b: Todo) =>
			a.createdAt.getTime() - b.createdAt.getTime()
		)
};

const actions = {
	add(todo: TodoAdd) {
		const id = uuid();
		const itemToAdd = {
			id,
			...todo,
			done: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		this.items.push(itemToAdd);
	},

	remove(id: string) {
		this.items = this.items.filter(todo => todo.id !== id);
	},

	update(id: string, update: TodoUpdate) {
		const items = this.items as Todos;
		const index = this.items.findIndex(
			(item) => !!item && (item as Todo).id === id);
		items[index] = { ...items[index], ...update, updatedAt: new Date(), }
	}
};

export const useTodoStore = defineStore('todoStore', {
	state,
	getters,
	actions,
})
