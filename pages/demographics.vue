<template>
    <b-container class="mt-5 mb-5">
        <b-row>
            <b-col cols="6" offset="3">
                <div class="text-center mb-5">
                    <h1>Demographics</h1>
                    <h3>Before we start, we would like to collect some anonyoums data about yourself.</h3>
                </div>
                <form ref="form" class="demographics-form">
                    <!-- Years of Experience -->
                    <div class="form-group">
                        <label for="experienceYears">How many year of experience do you have in professional
                            development environment?</label>
                        <input v-model.number="form.experienceYears" required type="number" min="0" class="form-control"
                               id="experienceYears" name="experienceYears"
                               placeholder="Enter a number">
                    </div>
                    <!-- Compared to others -->
                    <div class="form-group">
                        <label for="experienceComparedToOthers">How do you rate your skills compared to other
                            developers?</label>
                        <input v-model.number="form.experienceComparedToOthers" type="range" class="custom-range" min="1" max="9" value="5"
                               id="experienceComparedToOthers" name="experienceComparedToOthers">
                        <div class="clearfix">
                            <span class="small float-left">Bad</span>
                            <span class="small float-right">Exellent</span>
                        </div>
                    </div>
                    <!-- Used Travis CI -->
                    <div class="form-group">
                        <label>Have you ever used Travis-CI in an own project?</label>
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
                            I allow the researchers of this study to use my data and answers for the purpose of this
                            study. I'm also aware that I cannot withdraw my data at a later point in time due to the
                            anonymous data collection.
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary" v-on:click="start">Lets go!</button>
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
          experienceYears: '',
          experienceComparedToOthers: '',
          usedTravisCI: '',
          consent: '',
        },
      };
    },
    methods: {
      start: function(e) {
        e.preventDefault();
        let that = this;
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
  };
</script>
