<template>
    <div>
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      ...mapActions(["login"]),
    },
  };
  </script>
  