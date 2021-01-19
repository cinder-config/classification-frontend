<template>
    <b-container class="mt-5">
        <b-row>
            <b-col cols="6" offset="3">
                <div class="text-center">
                    <h1>Thank You!</h1>
                    <p>Thank you for investing your time and for helping me out by participating in my study, you are awesome!</p>
                    <p>If it is not too much to ask, I would be super happy if you could rate some more projects to help me improve my dataset. You can just continue and drop out any time, but every additional project helps me a lot!</p>
                    <button v-on:click="moreProjects" class="btn btn-primary">Yeah, I can do a couple more</button>
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
