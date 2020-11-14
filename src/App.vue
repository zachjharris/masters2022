<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-tabs show-arrows hide-slider optional>
        <template v-for="(leader) in leaders">

          <v-tab :key="leader.id" class="px-3 mx-3">
              <div class="text-center font-weight-bold">
                {{ leader.display_name2 }}: {{ leader.topar }}
              </div>
          </v-tab>
        </template>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-tabs>
          <v-tab>Picks</v-tab>
          <v-tab>Players</v-tab>
          <v-tab-item touchless>
            <player-table :users="users" :pars="pars" />
          </v-tab-item>
          <v-tab-item touchless>
            <pick-table :picks="picks" :pars="pars" v-if="picks.length > 0 && scores.length > 0" />
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PlayerTable from './components/Table';
import PickTable from './components/PickTable';
import _ from 'lodash';
export default {
  name: 'App',
  components: {
    PlayerTable,
    PickTable
  },

  data: () => ({
    showPlayer: false,
    player: {}
  }),
  computed: {
    pars() {
      const pars = this.$store.state.pars;
      return pars;
    },
    scores() {
      const scores = this.$store.state.scores;
      const pars = this.pars;
      return scores.map((score, index) => {
        score.name = score.first_name + ' ' + score.last_name;
        score.index = index;
        score.round1Total = score.round1.scores.reduce((accumulator, score, index) => {
          const holePar = pars.round1[index];
          if (holePar != null) {
            if (score != null) {
              return accumulator + (score - holePar);
            }
          }
          return accumulator;
        }, 0);
        score.round2Total = score.round2.scores.reduce((accumulator, score, index) => {
          const holePar = pars.round2[index];
          if (holePar != null) {
            if (score != null) {
              return accumulator + (score - holePar);
            }
          }
          return accumulator;
        }, 0);
        score.round3Total = score.round3.scores.reduce((accumulator, score, index) => {
          const holePar = pars.round3[index];
          if (holePar != null) {
            if (score != null) {
              return accumulator + (score - holePar);
            }
          }
          return accumulator;
        }, 0);
        score.round4Total = score.round4.scores.reduce((accumulator, score, index) => {
          const holePar = pars.round4[index];
          if (holePar != null) {
            if (score != null) {
              return accumulator + (score - holePar);
            }
          }
          return accumulator;
        }, 0);
        return score;
      });
    },
    usersRaw() {
      return this.$store.state.users;
    },
    users() {
      const users = this.usersRaw;
      const scores = this.scores;
      return users.map((user) => {
        user.picks = user.golfers.map((golferId) => {
          return _.find(scores, (score) => {
            return parseInt(score.id) == golferId;
          });
        });
        user.bestPosition = '';
        user.totalStrokes = user.picks.reduce((accumulator, pick) => {
          if (pick == null) {
            return accumulator;
          }
          return accumulator + parseInt(pick.total);
        }, 0);
        user.today = user.picks.reduce((accumulator, pick) => {
          if (pick == null) {
            return accumulator;
          }
          if (pick.today.indexOf('+') > -1) {
            return accumulator + parseInt(pick.today.replace('+', ''));
          }
          if (pick.today.indexOf('-') > -1) {
            return accumulator - parseInt(pick.today.replace('-', ''));
          }
          if (pick.today == 'E' || pick.today == '') {
            return accumulator;
          }
        }, 0);
        user.topar = user.picks.reduce((accumulator, pick) => {
          if (pick == null) {
            return accumulator;
          }
          if (pick.topar.indexOf('+') > -1) {
            return accumulator + parseInt(pick.topar.replace('+', ''));
          }
          if (pick.topar.indexOf('-') > -1) {
            return accumulator - parseInt(pick.topar.replace('-', ''));
          }
          if (pick.topar == 'E') {
            return accumulator;
          }
        }, 0);
        return user;
      });
    },
    leaders() {
      const scores = this.scores;
      return scores.filter((score) => {
        return score.pos == 'T1' || score.pos == '1';
      });
    },
    picks() {
      const users = this.users;
      const picks = [];
      users.forEach((user) => {
        picks.push(...user.picks);
      });
      return _.orderBy(_.uniqBy(picks, 'id'), ['index'], ['asc']);
    }
  },
  mounted() {
    console.log(this);
    this.retrieveScores();
    setInterval(() => {
      this.retrieveScores();
    }, 60 * 1000);
  },
  methods: {
    retrieveScores() {
      this.$store.dispatch('getScores');
    }
  }
};
</script>
