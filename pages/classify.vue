<template>
    <b-container class="mt-5">
        <div class="progress-wrapper mb-5" v-if="this.$store.state.counter <= this.amountOfClassifications">
            <div class="text-center">
                <p class="small mb-1">Evaluation {{ this.$store.state.counter }} out of {{ this.amountOfClassifications
                    }}.</p>
            </div>
            <b-progress :value="this.$store.state.counter" :max="this.amountOfClassifications" show-value
                        animated></b-progress>
        </div>

        <div class="loading-container" v-if="loading">
            <font-awesome-icon class="loading-icon" spin :icon="['fas', 'spinner']"/>
        </div>
        <div v-else>
            <b-row>
                <b-col cols="8">
                    <h1 class="mb-5">{{ project.name }}</h1>
                    <table class="table table-striped">
                        <thead/>
                        <tbody>
                        <tr>
                            <th>Description</th>
                            <td>{{ project.description }}</td>
                        </tr>
                        <tr>
                            <th>Commits</th>
                            <td>{{project.commits}}</td>
                        </tr>
                        <tr>
                            <th>Forks</th>
                            <td>{{project.forks}}</td>
                        </tr>
                        <tr>
                            <th>Stars</th>
                            <td>{{project.stars}}</td>
                        </tr>
                        <tr>
                            <th>Last Change</th>
                            <td>{{ project.lastChangeAt | moment }}</td>
                        </tr>
                        <tr>
                            <th>GitHub</th>
                            <td>
                                <a :href="gitHubUrl" target="_blank" class="view-file mr-5">
                                    <font-awesome-icon class="mr-1" :icon="['fas', 'share']"/>
                                    GitHub Repository
                                </a></td>
                        </tr>
                        </tbody>
                    </table>
                </b-col>
                <b-col cols="3" offset="1">
                    <div class="help-box">
                        <div class="box-header d-flex">
                            <font-awesome-icon class="mr-2" :icon="['fas', 'info-circle']"/>
                            <h6>What to do?</h6>
                        </div>
                        <div class="box-body">
                            <p>We want to assess the seriousnes of the given project. Please check the repository, the
                                CI configuration as
                                well as the Travis-CI page to answer the questions below.</p>
                        </div>
                    </div>
                </b-col>
            </b-row>

            <div class="travis-ci-part mt-5">
                <h3>Travis CI</h3>
                <a target="_Blank" :href="travisCiUrl">
                    <img class="travis-status mb-3" :src="travisCiStatus" alt="Travis-CI Build Status">&nbsp;
                    <font-awesome-icon class="mr-1" :icon="['fas', 'share']"/>
                    Project Site on Travis-CI
                </a>
                <div class="configuration mb-3">
                    <div class="configuration-header">
                        <font-awesome-icon class="mr-1" :icon="['fas', 'cogs']"/>
                        <strong>Build Configuration</strong>
                        <a :href="configurationUrl" target="_blank" class="view-file">
                            <font-awesome-icon class="mr-1" :icon="['fas', 'share']"/>
                            Raw Configuration File
                        </a>
                    </div>
                    <div class="configuration-body">
                        <pre>{{ project.configuration }}</pre>
                    </div>
                </div>
            </div>
            <hr class="mb-5">
            <div class="mb-5">
                <h2 class="mb-3">Evaluation</h2>
                <b-row mb-5>
                    <b-col cols="10">
                        <b-row :key="slug" v-for="(question, slug) in this.questions" class="question">
                            <b-col cols="10" class="text-left question-title">
                                <h4>{{ question }}</h4>
                            </b-col>
                            <b-col cols="1">
                                <div :class="{active: evaluation[slug] === true}" class="radio-tile yes"
                                     v-on:click="toggle(slug, true)">
                                    <font-awesome-icon :icon="['fas', 'check']"/>
                                </div>
                            </b-col>
                            <b-col cols="1">
                                <div :class="{active: evaluation[slug] === false}" class="radio-tile no"
                                     v-on:click="toggle(slug, false)">
                                    <font-awesome-icon :icon="['fas', 'times']"/>
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <div class="text-right mt-5">
                    <button :disabled="!isReady" v-on:click="classify" class="btn btn-lg btn-primary">Next Page
                    </button>
                </div>
            </div>
        </div>
    </b-container>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';

  export default {
    layout: 'default',
    data() {
      return {
        amountOfClassifications: 5,
        apiUrl: process.env.apiUrl,
        loading: true,
        project: {},
        classification: {},
        questions: {
          serious: 'Do you think that this is a serious (e.g not a study project) software project?',
          tailored: 'Do you think that the configuration is specifically tailored to the needs of the project?',
          interesting: 'Do you think that this configuration can be interesting (e.g learn something new) to other developers??',
          include: 'Do you think that we should include this configuration in a dataset to study continuous integration configurations?',
        },
        evaluation: {
          serious: null,
          tailored: null,
          interesting: null,
          include: null,
        },
      };
    },
    async fetch() {
      this.loadProject();
    },
    methods: {
      reset: function() {
        this.classification = {};
        this.project = {};
        this.evaluation = {
          serious: null,
          tailored: null,
          interesting: null,
          include: null,
        };
      },
      loadProject: function() {
        let that = this;
        axios.get(that.apiUrl + '/api/project_classification/next', {
          headers: {
            'Content-Type': 'application/json+ld',
            'Authorization': that.$store.state.user.accessKey,
          },
        }).then(function(response) {
          // we are finished :-D
          if (that.$store.state.counter > that.amountOfClassifications && !that.$store.state.hasSeenFinishScreen) {
            that.$router.push('/thanks');
            return;
          }
          if (response.data === null) {
            that.$router.push('/finish');
            return;
          }
          that.classification = response.data;
          if (that.classification.project) {
            axios.get(that.apiUrl + that.classification.project, {
              headers: {
                'Content-Type': 'application/json+ld',
                'Authorization': that.$store.state.user.accessKey,
              },
            }).then(function(response) {
              that.project = response.data;
              that.loading = false;
            });
          }
        });
      },
      toggle: function(slug, state) {
        this.evaluation[slug] = state;
      },
      classify: function() {
        this.loading = true;
        const data = {...{'status': 'done'}, ...this.evaluation};
        let that = this;
        axios.patch(that.apiUrl + '/api/project_classifications/' + that.classification.id, data, {
          headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': that.$store.state.user.accessKey,
          },
        }).then(function(response) {
          that.reset();
          that.$store.commit('INCREMENT_COUNTER');
          that.loadProject();
        });
      },
    },
    computed: {
      isReady: function() {
        return this.evaluation.serious !== null && this.evaluation.tailored !== null && this.evaluation.interesting !==
            null && this.evaluation.include !== null;
      },
      gitHubUrl: function() {
        return 'https://github.com/' + this.project.name;
      },
      configurationUrl: function() {
        return 'https://github.com/' + this.project.name + '/blob/' + this.project.defaultBranch + '/.travis.yml';
      },
      travisCiUrl: function() {
        return 'https://travis-ci.org/' + this.project.name;
      },
      travisCiStatus: function() {
        return 'https://api.travis-ci.org/' + this.project.name + '.svg?branch=' + this.project.defaultBranch;
      },
    },
    filters: {
      moment: function(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      },
    },
  };
</script>

<style lang="scss">
    .question {
        margin-bottom: 1rem;
    }

    .question-title {
        display: flex;
        align-items: center;

        h4 {
            font-size: 1.25rem;
        }
    }

    .travis-status {
        height: 25px;
    }

    .radio-tile {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        cursor: pointer;

        svg {
            color: white;
            font-size: 1rem;

        }

        &.active {
            opacity: 1;
        }
    }

    .radio-tile.yes {
        background-color: #27ae60;
    }

    .radio-tile.no {
        background-color: #c0392b;
    }

    .loading-container {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading-icon {
        font-size: 100px;
    }

    .card {
        flex-direction: row;
        align-items: center;

        &:hover {
            background: lightgray;
        }

        img {
            width: 50px;
            padding: 10px;
            margin-right: 10px;
        }

        span {
            font-size: 18px;
            font-weight: 700;
            color: black;
            text-decoration: none;
        }
    }

    .button-wrapper {
        width: 250px;
        margin: 0 auto;

        .button-group {
            display: flex;

            .btn {
                width: 100%;
            }
        }
    }

    a:hover {
        text-decoration: none;
    }

    .configuration-header {
        padding: 0.75rem 1rem;
        border: 1px solid #34495e;
        border-bottom: 0;
        background-color: #34495e;
        color: white;

        svg {
            color: white;
        }

        .view-file {
            float: right;
            color: white;
        }
    }

    .configuration-body {
        height: 20rem;
        overflow-y: scroll;
        border: 1px solid #34495e;
        padding: 1rem;
        background: #ecf0f1;
    }

    .help-box {
        background-color: #e67e22;
        padding: 15px;

        * {
            color: white;
        }
    }
</style>
