<template>
    <b-container class="mt-5 mb-5">
        <b-row>
            <b-col cols="6" offset="3">
                <div class="text-center mb-5">
                    <h1>Demographics</h1>
                    <h5>Before we start, I would like to collect some anonymous data, so I know who participated in my
                        survey.</h5>
                </div>
                <form ref="form" class="demographics-form">
                    <!-- Years of Experience -->
                    <div class="form-group">
                        <label for="experienceYears">How many years of professional experience do you have in a software
                            development context that uses CI?</label>
                        <input v-model.number="form.experienceYears" required type="number" min="0" class="form-control"
                               id="experienceYears" name="experienceYears"
                               placeholder="Enter a number">
                    </div>
                    <!-- Compared to others -->
                    <div class="form-group">
                        <label for="experienceComparedToOthers">How would you rate your own skills and knowledge about
                            CI?</label>
                        <input v-model.number="form.experienceComparedToOthers" type="range" class="custom-range"
                               min="1" max="9" value="5"
                               id="experienceComparedToOthers" name="experienceComparedToOthers">
                        <div class="d-flex justify-content-between ruler-labels">
                            <span class="small">Non-Existent</span>
                            <span class="small text-center">Average</span>
                            <span class="small text-right">Excellent</span>
                        </div>
                    </div>
                    <!-- Used Travis CI -->
                    <div class="form-group">
                        <label>Have you ever used Travis CI in one of your own projects?</label>
                        <div class="form-check">
                            <input v-model="form.usedTravisCI" class="form-check-input" type="radio" name="usedTravisCI"
                                   id="usedTravisCI_yes" :value="true">
                            <label class="form-check-label" for="usedTravisCI_yes">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input v-model="form.usedTravisCI" class="form-check-input" type="radio" name="usedTravisCI"
                                   id="usedTravisCI_no" :value="false">
                            <label class="form-check-label" for="usedTravisCI_no">
                                No
                            </label>
                        </div>
                    </div>
                    <!-- Consent -->
                    <div class="form-check form-group">
                        <input v-model="form.consent" required class="form-check-input" type="checkbox" value=""
                               id="consent" name="consent">
                        <label class="form-check-label" for="consent">
                            I know that I can stop working on the survey at any time. I allow the researchers of this
                            study to use my answers for the purpose of this study. I am also aware that I cannot
                            withdraw a completed survey after finishing, because my answers can no longer be identified
                            in the anonymous data
                        </label>
                    </div>
                    <button :disabled="!isReady" type="submit" class="btn btn-primary" v-on:click="start">Lets go!
                    </button>
                </form>
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
        form: {
          experienceYears: null,
          experienceComparedToOthers: 5,
          usedTravisCI: null,
          consent: false,
        },
      };
    },
    methods: {
      start: function(e) {
        e.preventDefault();
        let that = this;
        this.form.experienceYears = parseInt(this.form.experienceYears);
        axios.post(this.apiUrl + '/api/users', this.form, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(function(response) {
          that.$store.commit('SET_USER', response.data);
          that.$router.push('/classify');
        });
      },
    },
    computed: {
      isReady: function() {
        return this.form.experienceYears !== null
            && this.form.experienceComparedToOthers !== ''
            && this.form.usedTravisCI !== ''
            && this.form.consent !== false;
      },
    },
  };
</script>
<style>
    .ruler-labels span {
        flex: 1 1 0px;
    }
</style>
