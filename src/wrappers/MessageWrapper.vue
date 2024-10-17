<template>
    <div
      :class="computedClasses"
      class="w-full text-center text-sm md:text-base border rounded-md p-2"
    >
      <slot></slot> <!-- This is where the dynamic content will go -->
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Define the props
  const props = defineProps({
    type: {
      type: String,
      default: 'normal', // Default to normal if no type is passed
      validator: (value) => ['normal', 'error', 'success'].includes(value),
    }
  })
  
  // Computed property to dynamically change the classes based on the `type`
  const computedClasses = computed(() => {
    if (props.type === 'error') {
      return 'bg-red-50 text-red-600 border-red-300'
    } else if (props.type === 'success') {
      return 'bg-green-50 text-green-600 border-green-300'
    } else {
      return 'bg-slate-50 text-slate-600 border-slate-300'
    }
  })
  </script>