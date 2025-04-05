<template>
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/events">Événements</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Connexion</router-link>
      <button v-if="isAuthenticated" @click="logout">Déconnexion</button>
    </nav>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  
  export default {
    computed: {
      ...mapState(["isAuthenticated"]),
    },
    methods: {
      ...mapActions(["logout"]),
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    gap: 20px;
    padding: 10px;
    background-color: #333;
    color: white;
  }
  </style>
  