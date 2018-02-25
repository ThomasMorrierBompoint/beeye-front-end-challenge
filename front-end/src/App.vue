<template>
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <v-layout align-center>
        <v-flex text-xs-center>
          <h3 class="body-1">
            {{ text }}
          </h3>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <div>
      <v-progress-linear :indeterminate="indeterminate" :value="progressStatus" height="10" :color="progressColor">
      </v-progress-linear>
    </div>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      DEBUG: false,
      indeterminate: true,
      progressStatus: 0,
      progressColor: 'info',
      isAppRdy: false,
      snackbar: false,
      timeout: 5000,
      text: '',
    };
  },
  created() {
    this.DEBUG = this.debug();
    this.getAccessToken()
      .then((text) => {
        this.displaySnackbar({ text, timeout: 2000 });
        this.getAllSeasonsLeaderboardsList();
      })
      .catch((text) => {
        this.displaySnackbar({ text, timeout: 8000 });
      });
  },
  methods: {
    ...mapGetters({
      debug: 'api/debug',
      seasonsTopPlayers: 'api/seasonsTopPlayers',
      seasonsHeroesClass: 'api/seasonsHeroesClass',
      sharedHeroesClassData: 'api/sharedHeroesClassData',
      seasonsLeaderboardsLists: 'api/seasonsLeaderboardsLists',
    }),
    ...mapActions({
      getAccessToken: 'api/getAccessToken',
      getSeasonsLeaderboardsList: 'api/getSeasonsLeaderboardsList',
      getSeasonHeroClassData: 'api/getSeasonHeroClassData',
    }),
    displaySnackbar({ text, delay, timeout }) {
      setTimeout(() => {
        //  Quick fix, As to be async if not snackbar wont appear
        this.snackbar = false;
        setTimeout(() => {
          this.text = text;
          this.timeout = timeout;
          this.snackbar = true;
        }, 50);
      }, delay);
    },
    getAllSeasonsLeaderboardsList() {
      //  CHANGED Quick fix should be a Promise or async instead of setTimeout
      const TOTAL_SEASONS = (this.DEBUG) ? 3 : 12;
      const DELAY = 150;

      let seasonNumber = 0;

      for (let ind = 0; ind < TOTAL_SEASONS; ind += 1) {
        // eslint-disable-next-line
        setTimeout(() => this.getSeasonsLeaderboardsList({ season: ++seasonNumber }), ind * DELAY);
      }

      this.displaySnackbar({
        text: 'Seasons leaderboards loaded',
        delay: (TOTAL_SEASONS + 2) * DELAY,
        timeout: 3000,
      });
      this.getAllSeasonsAllClassData();
    },
    getAllSeasonsAllClassData() {
      //  CHANGED Quick fix should be a Promise or async instead of setTimeout
      //  Avoid double loop concat seasons class in 1 array then itterate
      //  getSeasonHeroClassData().then if ind < array.length call getSeasonHeroClassData again

      const seasonsLeaderboardsLists = this.seasonsLeaderboardsLists();
      const DELAY = (this.DEBUG) ? 400 : 300;

      this.indeterminate = false;

      /* eslint-disable */
      let ind = 0, allHeroesClass = [];

      for (var season in seasonsLeaderboardsLists) {
        for (var seasonClass of seasonsLeaderboardsLists[season].leaderboard) {
          allHeroesClass.push({ seasonId: season, heroClass: seasonClass.hero_class_string });
          setTimeout(() => {
            this.getSeasonHeroClassData(allHeroesClass[ind]);
            this.progressStatus = (++ind * 100) / allHeroesClass.length;
          }, allHeroesClass.length * DELAY);
        }
      }

      this.displaySnackbar({
        text: 'Season heroes class loaded',
        delay: (allHeroesClass.length + 2) * DELAY,
        timeout: 3000,
      });
      this.progressColor = 'success';
      this.isAppRdy = true;
      /* eslint-enable */
    },
  },
};
</script>

<style scoped>
  .progress-linear {
    margin-top: 0;
  }
</style>
