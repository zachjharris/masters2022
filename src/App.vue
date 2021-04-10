<template>
  <v-app>
    <v-app-bar
      app
    >
    <v-img src="./masters_logo.png" max-width="156" max-height="38" contain />
    <!--
      <v-tabs show-arrows hide-slider optional>
        <v-tab disabled style="opacity:1!important;">
          Leaders
        </v-tab>
        <template v-for="(leader) in leaders">
          <v-tab :key="leader.id" class="px-3 mx-3" style="color:rgba(0, 0, 0, 0.54)!important;opacity:1!important;" disabled>
              <div class="text-center font-weight-bold" style="color:rgba(0, 0, 0, 0.54)!important;">
                {{ leader.display_name2 }}: {{ leader.topar }}
              </div>
          </v-tab>
        </template>
      </v-tabs>
      -->
      <v-spacer />
      <!--
      <v-btn @click="toggleMode" icon>
        <v-icon>{{ isDarkMode ? 'mdi-brightness-4' : 'mdi-brightness-6' }}</v-icon>
      </v-btn>
      -->
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="playing = !playing" icon>
            <v-icon>{{ playing ? 'mdi-video' : 'mdi-video-off' }}</v-icon>
          </v-btn>
        </template>
        <span>Toggle Video</span>
      </v-tooltip>
      
    </v-app-bar>

    <v-main>
      <v-row class="mx-0">
        <v-col :order="$vuetify.breakpoint.mdAndUp ? 1 : 2" cols="12" :md="playing ? 6 : 12">
          <v-tabs v-model="tab">
            <v-tab>Picks</v-tab>
            <v-tab>Players</v-tab>
            <!--<v-tab>Leaders</v-tab>-->
          </v-tabs>
          <v-row class="mx-0">
          <v-tabs-items touchless v-model="tab" style="width:100%;">
            <v-tab-item>
              <player-table :users="users" :pars="pars" />
            </v-tab-item>
            <v-tab-item>
              <pick-table :picks="players" :pars="pars" v-if="picks.length > 0 && scores.length > 0" />
            </v-tab-item>
          </v-tabs-items>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" v-if="playing" :order="$vuetify.breakpoint.smAndDown ? 1 : 2">
          <v-row class="mx-0">
          <v-divider v-if="playing" vertical />
          <div class="video-container">
            <div class="video-wrapper">
              <video id="video" autoplay playsinline muted controls="true" style="max-width:100%;width:100%;"></video>
            </div>
          </div>
          <div>
            <v-item-group v-model="selectedVideos" active-class="selected-video">
              <v-row>
                <v-col v-for="video in liveVideos" :key="video.channelId" cols="6" xs="6" sm="4" md="2" lg="2">
                  <v-item :value="video" v-slot="{toggle}">
                    <v-img :src="video.imagePath" @click="toggle">
                      <span class="caption" style="padding:3px;background-color:rgba(0,0,0,.7);color:#ffffff;">{{ video.name }}</span>
                    </v-img>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
            <!--
            <v-row>
              <v-tabs v-model="selectedVideo" grow>
                <v-tab value="Featured">Featured</v-tab>
                <v-tab value="Amen Corner">Amen Corner</v-tab>
                <v-tab value="Holes 4, 5 & 6">Holes 4, 5 & 6</v-tab>
                <v-tab value="Holes 15 & 16">Holes 15 & 16</v-tab>
              </v-tabs>
            </v-row>
            -->
          </div>
          </v-row>
        </v-col>

      </v-row>
    </v-main>
    
  </v-app>
</template>

<script>
import PlayerTable from './components/Table';
import PickTable from './components/PickTable';
import _ from 'lodash';
//import Hls from './plugins/hls';
import Hls from 'hls.js';
export default {
  name: 'App',
  components: {
    PlayerTable,
    PickTable
  },

  data: () => ({
    showPlayer: false,
    tab: 0,
    player: {},
    isDarkMode: false,
    video: null,
    playing: false,
    muted: true,
    isFullScreen: false,
    videos: {
      'Featured': 'https://ibm1-live-hls.secure.footprint.net/egress/chandler/ibmmasters/live1/fg/master_600.m3u8',
      'Amen Corner': `https://ibm1-live-hls.secure.footprint.net/egress/chandler/ibmmasters/live1/ac/master_5000.m3u8`,
      'Holes 4, 5 & 6': `https://ibmlive2021.akamaized.net/hls/live/2013854/456/master_600.m3u8`,
      'Holes 15 & 16': `https://ibm1-live-hls.secure.footprint.net/egress/chandler/ibmmasters/live1/1516/master_5000.m3u8`
    },
    videoTabs: [
      'Featured',
      'Amen Corner',
      'Holes 4, 5 & 6',
      'Holes 15 & 16'
    ],
    selectedVideo: 0,
    selectedVideos: {}
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
          if (pick.total == '') {
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
          if (pick.topar == '' || pick.topar == 'E') {
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
    players() {
      const scores = this.scores;
      const users = this.users;
      return scores.map((player) => {
          player.pickedBy = users.filter((user) => {
            return _.includes(user.golfers, player.id);
          }).map((user) => user.name);
          return player;
      })
    },
    picks() {
      const users = this.users;
      let picks = [];
      users.forEach((user) => {
        if (user.picks[0] != null) {
          picks.push(...user.picks);
        }
      });
      console.log('all picks', picks);
      picks = _.uniqBy(picks, 'id');
      console.log(picks);
      if (picks.length > 0) {
        picks = picks.map((pick) => {
          //pick.pickedBy = [];
          pick.pickedBy = users.filter((user) => {
            return _.includes(user.golfers, pick.id);
          }).map((user) => user.name);
          return pick;
        });
      }
      return _.orderBy(picks, ['index'], ['asc']);
    },
    allVideos() {
      const videos = JSON.parse(JSON.stringify(this.$store.state.videos));
      return videos.map((video) => {
        video.popout = `https://www.masters.com/webview/en_US/live/popout/${video.channelId}`;
        return video;
      });
    },
    liveVideos() {
      return this.allVideos.filter((video) => video.live && video.channelId != 'ms' && video.channelId != 'radio');
    }
  },
  async mounted() {
    console.log(this);
    this.retrieveScores();
    setInterval(() => {
      this.retrieveScores();
    }, 60 * 1000);
    await this.$store.dispatch('getVideos');
    if (this.liveVideos.length > 0) {
      this.selectedVideos = this.liveVideos[0];
    }
    this.playing = false;
    this.selectedVideo = 0;
  },
  beforeDestroy() {
    this.playing = false;
  },
  methods: {
    retrieveScores() {
      this.$store.dispatch('getScores');
    },
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
      this.$vuetify.theme.dark = this.isDarkMode;
    },
    showVideo() {
      this.$nextTick(() => {
        const video = document.querySelector('#video');
        if (this.selectedVideos.desktop.length == 0) {
          return;
        }
        const src = this.selectedVideos.desktop[0].url;
        console.log(src);
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.detachMedia();
          hls.loadSource(src);
          hls.attachMedia(video);
        }
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
        }
      });
    },
  },
  watch: {
    selectedVideo(newVal, oldVal) {
      console.log('newVal', newVal, 'oldVal', oldVal);
      console.log(this.videoTabs[newVal]);
      if (newVal !== oldVal) {
        this.showVideo(true);
      }
    },
    playing(newVal) {
      if (newVal) {
        this.showVideo();
      }
    },
    selectedVideos(newVal, oldVal) {
      if (!_.isEqual(newVal, oldVal)) {
        this.showVideo(true);
      }
    },
  }
};
</script>
<style lang="scss">
.video-container {
  /*
  position:relative;
  position:fixed;
  bottom:20px;
  right:20px;
  height:200px;
  width:300px;
  */
  &:hover {
    .video-wrapper {
      button {
        display:block;
      }
    }
  }
  .video-wrapper {
    position:relative;
    button {
      background: rgba(0,0,0,.5)!important;
      color: #ffffff!important;
      z-index: 1;
      display:none;
    }
    button.toggle-sound {
      position:absolute;
      right:5px;
      top:5px;

    }
    button.toggle-fullscreen {
      position:absolute;
      bottom:5px;
      right:0;
    }
    #video {
      /*
      */
    }
  }
}
.selected-video {
  border:3px solid #006746;
}
</style>