<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Nom" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      ...mapActions(["register"]),
    },
  };
  </script>
  