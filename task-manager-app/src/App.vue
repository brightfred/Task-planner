<template>
  <div id="app">
    <div v-if="user">
      <h1>Welcome, {{ user.email }}</h1>
      <button @click="logout">Logout</button>
      <!-- Task manager components -->
      <AddTaskForm @task-added="addNewTask" />
      <TaskList :tasks="tasks" @delete-task="deleteTask" @toggle-completion="toggleTaskCompletion" />
    </div>
    <div v-else>
      <h1>Login</h1>
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import { auth } from './firebaseSdk'; // Import the auth object from firebaseSdk.js
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
      tasks: [],
      email: '',
      password: '',
      user: null
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
    },
    login() {
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.user = res.user;
          this.email = '';
          this.password = '';
        })
        .catch(err => {
          alert(err.message);
        });
    },
    logout() {
      auth.signOut().then(() => {
        this.user = null;
      });
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
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
  width: 100px;
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
