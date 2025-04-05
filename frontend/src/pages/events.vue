<template>
    <div>
      <h2>Événements</h2>
      <div class="events-list">
        <EventCard v-for="event in events" :key="event._id" :event="event" />
      </div>
    </div>
  </template>
  
  <script>
  import EventCard from "@/components/EventCard.vue";
  import { mapState, mapActions } from "vuex";
  
  export default {
    components: { EventCard },
    computed: {
      ...mapState(["events"]),
    },
    methods: {
      ...mapActions(["fetchEvents"]),
    },
    mounted() {
      this.fetchEvents();
    },
  };
  </script>
  
  <style>
  .events-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>
  