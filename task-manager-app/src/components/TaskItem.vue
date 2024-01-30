<template>
    <div class="task-item">
      <input type="checkbox" :checked="task.completed" @change="toggleCompletion(task.id)">
      <span :class="{ 'completed-task': task.completed }">{{ task.title }}</span>
      <button @click="deleteTask(task.id)">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TaskItem',
    props: {
      task: Object
    },
    methods: {
      toggleCompletion(taskId) {
        this.$emit('toggle-completion', taskId);
      },
      deleteTask(taskId) {
        this.$emit('delete-task', taskId);
      }
    }
  };
  </script>
  
  <style>
  .task-item {
    background-color: #ecf0f1;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .completed-task {
    color: #95a5a6;
    text-decoration: line-through;
  }
  </style>