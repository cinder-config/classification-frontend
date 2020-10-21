<template>
    <b-container class="mt-5">
        <b-row>
            <b-col cols="6" offset="3">
                <div class="text-center">
                    <h1>Thank You!</h1>
                    <p>Thank you for investing your time participating in our study. We still have some more projects to
                        classify. We would be super happy if you spend a little more time. Are you in?</p>
                    <button v-on:click="moreProjects" class="btn btn-primary">Yeah, absolutely!</button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    layout: 'default',
    methods: {
      moreProjects: function() {
        this.$store.commit('SET_HAS_SEEN_FINISH_SCREEN',true);
        this.$router.push('classify');
        return;
      }
    }
  };
</script>

<style lang="scss">
</style>
