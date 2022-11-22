<template>
  <main class="pt-18 min-h-screen bg-gray-100">
    <section class="text-center pt-10">
      <h1 class="text-5xl font-bold text-gray-700">What are we doing today?</h1>
    </section>
    <section class="w-8/12 md:mx-auto lg:w-6/12 py-4 rounded-lg">
      <!-- <form @submit.prevent> -->
      <todo-input v-model="newTodo" @save="saveNewTodo" :error="error" />
      <todo-list :items="todoStore.getSortedTodos.reverse()" />
      <!-- </form> -->
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/store/todo';
const todoStore = useTodoStore();
const newTodo = useState('newTodo', () => {
  return '';
});
const error = ref(false);

watch(error, (value: boolean) => {
  if (value) {
    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
});

const saveNewTodo = () => {
  if (newTodo.value.length <= 0) {
    error.value = true;
    return;
  }

  todoStore.add({
    label: newTodo.value
  });

  newTodo.value = '';

  console.log(todoStore.items);
};
</script>
