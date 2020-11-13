<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-spacer />
      <template v-for="(leader) in leaders">
        <div :key="leader.id" class="px-3 mx-3">
            <div>
              <div class="text-center font-weight-bold">{{ leader.name }}</div>
              <div class="text-center">Today: {{ leader.today }}</div>
            </div>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <player-table :users="users" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PlayerTable from './components/Table';
import _ from 'lodash';
export default {
  name: 'App',
  components: {
    PlayerTable
  },

  data: () => ({
    //
  }),
  computed: {
    scores() {
      const scores = this.$store.state.scores;
      return scores.map((score) => {
        score.name = score.first_name + ' ' + score.last_name;
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
          if (pick.today == 'E') {
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
    }
  },
  mounted() {
    console.log(this);
    this.$store.dispatch('getScores');
  }
};
</script>
