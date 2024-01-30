<template>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTaskTitle" placeholder="Add a new task">
      <button type="submit">Add Task</button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'AddTaskForm',
    data() {
      return {
        newTaskTitle: ''
      };
    },
    methods: {
      addTask() {
        if (this.newTaskTitle.trim()) {
          this.$emit('task-added', this.newTaskTitle);
          this.newTaskTitle = '';
        }
      }
    }
  };
  </script>
  
  <style>
  form {
    margin-bottom: 20px;
  }
  </style>