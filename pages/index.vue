<template>
    <b-container class="mt-5">
        <div class="text-center mb-5">
            <h1>Separating Wheat From Chaff: Detecting Genuine Continuous Integration Configurations</h1>
        </div>
        <b-row>
            <b-col cols="8" offset="2">
                <div class="text-left">
                    <p>Continuous Integration (CI) is a corner stone of modern software engineering that makes it
                        possible to release reliable software fast. The benefits are widely accepted and have also been
                        confirmed in scientific studies.
                    </p>
                    <p>
                        It is very easy to get started. Services like Travis CI, Github Actions, or GitLab make it
                        straight-forward to adopt CI in new projects and to create an automated build pipeline from
                        scratch. Unfortunately, due to the low entrance barrier, many trivial or “toy-like” projects
                        exist that are not representative for serious CI pipelines. This makes it unnecessary hard for
                        newcomers to find good examples to learn from and also threatens the validity of studies that do
                        not exclude these immature projects.
                    </p>
                    <p><strong>This has to change!</strong></p>
                    <h3 class="mt-4">Master Thesis</h3>
                    <div class="row">
                        <div class="col-8">
                            <p>My name is Timothy Zemp. I am a student at the University of Zurich, Switzerland, and I
                                am working on my Master thesis right now. I envision a world, in which it is easy to
                                find genuine CI configurations in the vast numbers of open-source projects, without
                                having to work my way through countless meaningless config files. I would like to build
                                a system that can automatically find good and representative CI pipelines.
                            </p>
                            <p>
                                To make this vision come true, I need some feedback from professional developers to
                                learn which types of configuration files would be interesting to look at.</p>
                        </div>
                        <div class="col-3 offset-1">
                            <img src="~/assets/img/foto.jpg" alt="Timothy Zemp">
                        </div>
                    </div>
                    <h3 class="mt-4">What is my task in this survey</h3>
                    <p>
                        Your task is very simple. I will show you different projects and provide links to their CI
                        configuration, repository, and their Travis CI page. I will then ask you several short question
                        about the project, essentially, whether you think that a configuration could be interesting to
                        look at.
                    </p>
                    <p>
                        I will ask you to do this for 10 projects and you should be done in at most 10 minutes.
                    </p>
                    <p>
                        If you have further questions, please do not hesitate to contact me directly at <a href="mailto:timothy.zemp@uzh.ch">timothy.zemp@uzh.ch</a>
                    </p>
                    <br>
                    <button class="btn btn-primary" v-on:click="start">
                        <font-awesome-icon class="mr-1" :icon="['fas', 'thumbsUp']"/>
                        Sounds cool - let's start!
                    </button>
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
<style scoped>
    img {
        width: 100%;
        height: auto;
    }
</style>
