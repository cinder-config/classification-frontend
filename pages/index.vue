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
    methods: {
      start: function() {
        if (false && this.$store.state.user !== {}) {
          this.$router.push('/classify');
        }
        let that = this;
        axios.post('http://localhost:8000/api/users', {}, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(function(response) {
          that.$store.commit('SET_USER',response.data);
          that.$router.push('/classify');
        });
      },
    },
  };
</script>
