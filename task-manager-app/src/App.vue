<template>
  <div id="app">
    <div v-if="user" class="task-form-container">
      <h1>Welcome, {{ user.email }}</h1>
      <p class="daily-quote">{{ dailyQuote }}</p>
      <button @click="logout">Logout</button>

      <!-- Weekday Tabs -->
      <div class="weekdays">
        <button
          v-for="day in Object.keys(tasks)"
          :key="day"
          @click="currentDay = day"
          :class="{ active: currentDay === day }"
        >
          {{ day }}
        </button>
      </div>

      <!-- Task Add Form -->
      <div class="task-form">
        <form @submit.prevent="addNewTask">
          <input type="text" v-model="newTaskTitle" placeholder="Enter a new task" />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <!-- Task List -->
      <div>
        <h2>Ongoing Tasks</h2>
        <div v-for="task in ongoingTasks" :key="task.id">
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
          <button @click="toggleTaskCompletion(task.id)">Toggle</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>

        <h2>Completed Tasks</h2>
        <div v-for="task in completedTasks" :key="task.id">
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
          <button @click="toggleTaskCompletion(task.id)">Toggle</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
      </div>
    </div>
    
    <div v-else class="login-form-container">
      <!-- Login Form -->
      <h1>Login</h1>
      <form @submit.prevent="login" class="login-form">
        <input type="email" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">Login</button>
      </form>
      <button @click="loginWithGoogle">Login with Google</button>
    </div>
  </div>
</template>

<script>
import { auth, firebase, googleProvider } from './firebaseSdk';

export default {
  name: 'App',
  data() {
    return {
      tasks: {
        Monday: [],
        Tuesday: [],
        // ... rest of the days
      },
      currentDay: 'Monday',
      newTaskTitle: '',
      email: '',
      password: '',
      user: null,
      quotes: [
        "Believe you can and you're halfway there.",
        "It does not matter how slowly you go as long as you do not stop.",
        "You are never too old to set another goal or to dream a new dream.",
        // ... additional quotes
      ],
      dailyQuote: '',
    };
  },
  computed: {
    ongoingTasks() {
      return this.tasks[this.currentDay].filter(task => !task.completed);
    },
    completedTasks() {
      return this.tasks[this.currentDay].filter(task => task.completed);
    },
  },
  methods: {
    addNewTask() {
      if (this.newTaskTitle.trim()) {
        const newTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          completed: false
        };
        this.tasks[this.currentDay].push(newTask);
        this.newTaskTitle = '';
      }
    },
    toggleTaskCompletion(taskId) {
      this.tasks[this.currentDay] = this.tasks[this.currentDay].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    },
    deleteTask(taskId) {
      this.tasks[this.currentDay] = this.tasks[this.currentDay].filter(task => task.id !== taskId);
    },
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
      firebase.auth().signInWithPopup(googleProvider)
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
    },
    startNotifications() {
      setInterval(() => {
        new Notification("Reminder", { body: "Check your tasks!" });
      }, 7200000); // 2 hours in milliseconds
    },
  },
  created() {
    this.dailyQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
    if (Notification.permission === "granted") {
      this.startNotifications();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          this.startNotifications();
        }
      });
    }
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

.form-container {
  max-width: 50%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.task-form-container, .login-form-container {
  max-width: 50%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.completed {
  text-decoration: line-through;
}

.weekdays button {
  margin: 5px;
  padding: 10px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
}

.weekdays button.active {
  background-color: #3498db;
  color: white;
}

.daily-quote {
  font-style: italic;
  margin-bottom: 20px;
}

</style>