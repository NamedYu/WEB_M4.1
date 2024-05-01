<template>
    <div>
      <table class="todo-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
            <td>{{ todo.userId }}</td>
            <td>{{ todo.id }}</td>
            <td>{{ todo.title }}</td>
            <td>{{ todo.completed ? 'True' : 'False' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axio from 'axios';
  export default {
    data() {
      return {
        todos: []
      };
    },
    mounted() {
      this.fetchTodos();
    },
    methods: {
      async fetchTodos() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos');
          if (!response.ok) {
            throw new Error('Failed to fetch todos');
          }
          const data = await response.json();
          this.todos = data;
        } catch (error) {
          console.error('Error fetching todos:', error.message);
        }
      }
    }
  };
  </script>
  
  <style>
  .todo-table th,
  .todo-table td {
    padding: 10px;
    text-align: center; 
  }
  </style>
  