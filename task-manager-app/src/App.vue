<template>
  <div id="app">
    <div v-if="user">
      <h1>Welcome, {{ user.email }}</h1>
      <button @click="logout">Logout</button>
      <div class="task-form-container">
        <AddTaskForm @task-added="addNewTask" />
        <TaskList :tasks="tasks" @delete-task="deleteTask" @toggle-completion="toggleTaskCompletion" />
      </div>
    </div>
    <div v-else class="login-form-container">
      <h1>Login</h1>
      <form @submit.prevent="login" class="login-form">
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
import { auth, googleProvider, firebase } from './firebaseSdk';
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
  firebase.auth().signInWithPopup(googleProvider) // Corrected: only googleProvider as argument
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
/* Common Styles */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.form-container {
  max-width: 50%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.form {
  display: flex;
  flex-direction: column;
}

.form input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.form button:hover {
  background-color: #2980b9;
}

/* Specific Styles for Login Form */
.login-form-container {
  /* Additional specific styles for login form container */
}

.login-form {
  /* Additional specific styles for login form */
}

/* Specific Styles for Task Form */
.task-form-container {
  /* Additional specific styles for task form container */
}
</style>