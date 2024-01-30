<template>
  <div id="app">
    <div v-if="user">
      <h1>Welcome, {{ user.email }}</h1>
      <button @click="logout">Logout</button>
      <AddTaskForm @task-added="addNewTask" />
      <TaskList :tasks="tasks" @delete-task="deleteTask" @toggle-completion="toggleTaskCompletion" />
    </div>
    <div v-else>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">Login</button>
      </form>
      <button @click="loginWithGoogle">Login with Google</button>
      <!-- Add buttons for other providers as needed -->
    </div>
  </div>
</template>

<script>
import { auth, googleProvider, signInWithPopup } from './firebaseSdk';

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
      email: '',
      password: '',
      user: null
    };
  },
  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    loginWithGoogle() {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          this.user = result.user;
        })
        .catch((error) => {
          alert(error.message);
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
/* Your styles here */
</style>

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
