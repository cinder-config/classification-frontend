<template>
    <b-container class="mt-5">
        <div class="loading-container" v-if="loading">
            <font-awesome-icon class="loading-icon" spin :icon="['fas', 'spinner']"/>
        </div>
        <div v-else>
            <div class="mb-3 text-center">
                <h1>{{ project.name }}</h1>
            </div>
            <div class="mb-5 text-center">
                <p>{{ project.description }}</p>
            </div>
            <div class="configuration mb-3">
                <div class="configuration-header">
                    <font-awesome-icon class="mr-1" :icon="['fas', 'cogs']"/>
                    <strong>Build Configuration</strong>
                    <a :href="project.configurationUrl" target="_blank" class="view-file">
                        <font-awesome-icon class="mr-1" :icon="['fas', 'share']"/>
                        View full file
                    </a>
                </div>
                <div class="configuration-body">
                    <pre>{{ project.configuration }}</pre>
                </div>
            </div>
            <div class="quick-links mb-5">
                <a :href="project.gitUrl" target="_blank" class="view-file mr-5">
                    <font-awesome-icon class="mr-1" :icon="['fas', 'share']"/>
                    View Repository
                </a>
                <a :href="project.travisCiUrl" target="_blank" class="view-file">
                    <font-awesome-icon class="mr-1" :icon="['fas', 'share']"/>
                    View Travis-CI
                </a>
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
                <b-row>
                    <b-col cols="4">
                        <button :disabled="!isReady" v-on:click="classify" class="btn btn-lg btn-primary">Submit
                        </button>
                    </b-col>
                </b-row>
            </div>
            <div class="mb-5">
                {{ project }}
            </div>
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
          if (response.data === null) {
            that.$router.push('/thanks');
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
          that.loadProject();
        });
      },
    },
    computed: {
      isReady: function() {
        return this.evaluation.serious !== null && this.evaluation.tailored !== null && this.evaluation.interesting !==
            null && this.evaluation.include !== null;
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

    .quick-links {
        a {
            color: black;

            svg {
                color: black;
            }
        }
    }
</style>
