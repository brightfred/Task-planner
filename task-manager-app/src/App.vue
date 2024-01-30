<template>
  <div id="app">
    <AddTaskForm @task-added="addNewTask" />
    <TaskList :tasks="tasks" @delete-task="deleteTask" @toggle-completion="toggleTaskCompletion" />
  </div>
</template>

<script>
import AddTaskForm from './components/AddTaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  name: 'App',
  components: {
    AddTaskForm,
    TaskList
  },
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    addNewTask(taskTitle) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false
      };
      this.tasks.push(newTask);
    },
    toggleTaskCompletion(taskId) {
      this.tasks = this.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

input[type="text"] {
  padding: 10px;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 5px;
}

input[type="checkbox"] {
  transform: scale(1.5);
  margin-right: 10px;
}
</style>
