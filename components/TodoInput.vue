<template>
  <div class="todoInput">
    <input v-model="localState" @keyup.enter="$emit('save')" type="text" />
    <button @click="$emit('save')" class="transition-all duration-200 border border-blue-200 py2 px-4 ml-3 hover:bg-blue-200 rounded">Add Todo</button>
  </div>
</template>


<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  error: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'save'): void;
}>()

const localState = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
