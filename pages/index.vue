<template>
    <b-container class="mt-5">
        <div class="text-center">
            <h1>CI Classifier</h1>
            <h3 class="mb-5">Help us build a great training set! :-)</h3>
            <button class="btn btn-primary" v-on:click="start">Start!</button>
        </div>
    </b-container>
</template>

<script>
  import axios from 'axios';

  export default {
    layout: 'default',
    data() {
      return {
        apiUrl: process.env.apiUrl,
      };
    },
    methods: {
      start: function() {
        this.$router.push('/demographics');
      },
    },
  };
</script>
