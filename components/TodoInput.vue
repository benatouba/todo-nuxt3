<template>
  <div
    class="w-10/12 sm:v-8/12 max-w-lg mx-auto h-24 bg-white rounded-md shadow-sm py-5 px-10 flex items-center justify-between mb-5"
  >
    <input
      v-model="localState"
      type="text"
      placeholder="Create a Todo"
      :class="{
        'border-red-300': error,
        'border-gray-300': !error,
      }"
      class="border rounded py-2 px-4 w-9/12 focus:outline-1 focus:outline-blue-100"
      @keyup.enter="$emit('save')"
    />
    <button
      class="transition-all duration-200 border border-gray-300 py-2 px-4 ml-2 hover:bg-green-100 rounded"
      @click="$emit('save')"
    >
      Save
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  error: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'save'): void;
}>();

const localState = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>
