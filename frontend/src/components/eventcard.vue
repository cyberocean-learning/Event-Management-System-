<template>
    <div class="event-card">
      <img :src="event.image" alt="Event Image" />
      <h2>{{ event.title }}</h2>
      <p>{{ event.description }}</p>
      <router-link :to="`/events/${event._id}`">Voir Détails</router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      event: Object,
    },
  };
  </script>
  
  <style scoped>
  .event-card {
    border: 1px solid #ddd;
    padding: 15px;
    text-align: center;
  }
  </style>
  