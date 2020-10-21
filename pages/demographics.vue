<template>
    <b-container class="mt-5">
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
                        <select v-model.number="form.experienceComparedToOthers" required class="form-control"
                                id="experienceComparedToOthers" name="experienceComparedToOthers">
                            <option selected disabled>Please choose</option>
                            <option value="1">Bad</option>
                            <option value="2">Below Average</option>
                            <option value="3">Average</option>
                            <option value="4">Above Average</option>
                            <option value="5">Excellent</option>
                        </select>
                    </div>
                    <!-- Used Travis CI -->
                    <div class="form-group">
                        <label for="usedTravisCI">Have you ever used Travis-CI in an own project?</label>
                        <select v-model="form.usedTravisCI" required class="form-control" id="usedTravisCI"
                                name="usedTravisCI">
                            <option selected disabled>Please choose</option>
                            <option :value="true">Yes</option>
                            <option :value="false">No</option>
                        </select>
                    </div>
                    <!-- Consent -->
                    <div class="form-check form-group">
                        <input v-model="form.consent" required class="form-check-input" type="checkbox" value=""
                               id="consent" name="consent">
                        <label class="form-check-label" for="consent">
                            I allow the researchers of this study to use my data and answers for the purpose of the
                            study. I also confirm that I cannot withdraw my data at a later point in time due to the
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
