<template>
    <div>
      <span :class="{ completed: task.completed }">{{ task.title }}</span>
      <button @click="toggleCompletion(task.id)">Toggle</button>
      <button @click="deleteTask(task.id)">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      task: Object,
    },
    methods: {
      toggleCompletion(id) {
        this.$emit('toggle-completion', id);
      },
      deleteTask(id) {
        this.$emit('delete-task', id);
      },
    },
  };
  </script>
  
  <style>
  .completed {
    text-decoration: line-through;
  }
  /* Add more styles as needed */
  </style>