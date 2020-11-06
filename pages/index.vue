<template>
    <b-container class="mt-5">
        <div class="text-center mb-5">
            <h1>Separating Wheat From Chaff: Detecting Genuine Continuous Integration Configurations</h1>
        </div>
        <b-row>
            <b-col cols="8" offset="2">
                <div class="text-left">
                    <h3>Introduction</h3>
                    <p>Continuous Integration (CI) is a software development practice introduced by the Agile movement
                        with the aim of delivering reliable software releases fast. CI is very easy to adopt, it is a
                        simple as copy a "template-file" to the repository and activate the given service. The success
                        of CI has also lead to a spike in empirical research on this topic that investigated the impact
                        of CI on code review or developers. Unfortunately, due to this low entrance barrier of CI, many
                        studies do not differentiate between "toy-like" and serious configuration, thus presenting a
                        thread to valitly to the study. </p>
                    <h3 class="mt-4">Thesis Goal</h3>
                    <p>The goal of my master’s thesis is to understand how to automatically detect genuine CI
                        configurations and further to study the impact of such a classifier on existing
                        empirical studies.</p>
                    <h3 class="mt-4">Dataset</h3>
                    <p>To build our classifier, we need some data. With your input we will establish a Ground Truth
                        dataset that can be used to train the classifier. </p>
                    <h3 class="mt-4">What to do?</h3>
                    <p>You will be presented with different projects, each containing a small summary, the CI
                        configuration as well as a link to the Travis-CI page. For each project, you'll receive some
                        questions to answer.</p>
                    <p></p>
                    <button class="btn btn-primary" v-on:click="start"><font-awesome-icon class="mr-1" :icon="['fas', 'thumbsUp']"/>Sounds cool - let's start!</button>
                </div>
            </b-col>
        </b-row>
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
