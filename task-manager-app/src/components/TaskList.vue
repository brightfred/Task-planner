<template>
    <div>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @delete-task="deleteTask" />
    </div>
  </template>
  
  <script>
  import TaskItem from './TaskItem.vue';
  
  export default {
    name: 'TaskList',
    components: {
      TaskItem
    },
    props: {
      tasks: Array
    },
    methods: {
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