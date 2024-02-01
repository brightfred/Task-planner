<template>
  <div id="app" :style="{ backgroundColor: backgroundColor }">
    <div v-if="user" class="task-form-container">
      <h1>Welcome, {{ user.email }}</h1>
      <p class="daily-quote">{{ dailyQuote }}</p>
      <button @click="logout">Logout</button>

      <select v-model="backgroundColor">
        <option value="#FFFFFF">White</option>
        <option value="#F0E68C">Khaki</option>
        <option value="#ADD8E6">Light Blue</option>
      </select>

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

      <div class="task-form">
        <form @submit.prevent="addNewTask">
          <input type="text" v-model="newTaskTitle" placeholder="Enter a new task" />
          <button type="submit">Add Task</button>
        </form>
      </div>

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
      <button @click="showRegistration = !showRegistration">
        {{ showRegistration ? 'Login' : 'Register' }}
      </button>

      <div v-if="showRegistration">
        <h1>Register</h1>
        <form @submit.prevent="register" class="login-form">
          <input type="email" v-model="email" placeholder="Email">
          <input type="password" v-model="password" placeholder="Password">
          <button type="submit">Register</button>
        </form>
      </div>

      <div v-else>
        <h1>Login</h1>
        <form @submit.prevent="login" class="login-form">
          <input type="email" v-model="email" placeholder="Email">
          <input type="password" v-model="password" placeholder="Password">
          <button type="submit">Login</button>
        </form>
        <button @click="loginWithGoogle">Login with Google</button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider } from './firebaseSdk';

export default {
  name: 'App',
  data() {
    return {
      tasks: {
        General: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      },
      currentDay: 'General',
      newTaskTitle: '',
      email: '',
      password: '',
      user: null,
      quotes: [
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do. Steve",
        "Believe you can and you're halfway there. Theodore Roosevelt",
        "The only limit to our realization of tomorrow is our doubts of today. Franklin D. Roosevelt",
        "It does not matter how slowly you go as long as you do not stop. Confucius",
        "Your time is limited, don’t waste it living someone else’s life. Steve Jobs",
        "Don’t watch the clock; do what it does. Keep going. Sam Levenson",
        "You are never too old to set another goal or to dream a new dream. C.S. Lewis",
        "Keep your face always toward the sunshine—and shadows will fall behind you. Walt Whitman",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. Winston S. Churchill",
        "The future belongs to those who believe in the beauty of their dreams. Eleanor Roosevelt",
        "The best way to predict the future is to invent it. Alan Kay",
        "I can't change the direction of the wind, but I can adjust my sails to always reach my destination. Jimmy Dean",
        "Whether you think you can or you think you can’t, you’re right. Henry Ford",
        "The way to get started is to quit talking and begin doing. Walt Disney",
        "The secret of getting ahead is getting started. Mark Twain",
        "With the new day comes new strength and new thoughts. Eleanor Roosevelt",
        "Life is 10% what happens to us and 90% how we react to it. Charles R. Swindoll",
        "Act as if what you do makes a difference. It does. William James",
        "The harder you work for something, the greater you’ll feel when you achieve it. Anonymous",
        "Dream big and dare to fail. Norman Vaughan"
      ],
      dailyQuote: '',
      backgroundColor: '#FFFFFF',
      showRegistration: false,
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
    register() {
      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user;
          this.showRegistration = false;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    loginWithGoogle() {
      auth.signInWithPopup(googleProvider)
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
      }).catch((error) => {
        console.error("Logout failed: ", error);
      });
    },
  },
  created() {
    this.dailyQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }
};
</script>


<style>
#app {
  font-family: 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  padding: 20px;
  min-height: 100vh;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  color: #333;
  font-size: 20px;
  margin-top: 20px;
}

.daily-quote {
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
  font-size: 16px;
}

.task-form-container, .login-form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form input {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form button:hover {
  background-color: #45a049;
}

.weekdays {
  display: flex;
  justify-content: space-evenly;
  flex-direction:row;
  gap: 10px;
  margin-bottom: 20px;
}

.weekdays button {
  padding: 8px 16px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.weekdays button:hover {
  background-color: #e0e0e0;
}

.weekdays button.active {
  background-color: #3498db;
  color: white;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #ddd;
  margin-bottom: 20px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-item button {
  background-color: #FF5722;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-item button:hover {
  background-color: #f44336;
}

.completed {
  text-decoration: line-through;
  color: #777;
}
</style>