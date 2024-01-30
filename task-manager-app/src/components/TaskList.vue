<template>
    <div>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete-task="deleteTask"
        @toggle-completion="toggleCompletion"
      />
    </div>
  </template>
  
  <script>
  import TaskItem from './TaskItem.vue';
  
  export default {
    components: {
      TaskItem,
    },
    props: {
      tasks: Array,
    },
    methods: {
      deleteTask(id) {
        this.$emit('delete-task', id);
      },
      toggleCompletion(id) {
        this.$emit('toggle-completion', id);
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>