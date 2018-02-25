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
    displaySnackbar({ text, timeout }) {
      this.snackbar = false;
      setTimeout(() => {
        this.text = text;
        this.timeout = timeout;
        this.snackbar = true;
      }, 50);
    },
    getAllSeasonsLeaderboardsList() {
      //  CHANGED Quick fix should be a Promise or async instead of setTimeout
      const TOTAL_SEASONS = (this.DEBUG) ? 3 : 12;
      const DELAY = 100;

      let seasonNumber = 0;

      for (let ind = 0; ind < TOTAL_SEASONS; ind += 1) {
        // eslint-disable-next-line
        setTimeout(() => this.getSeasonsLeaderboardsList({ season: ++seasonNumber }), ind * DELAY);
      }
      setTimeout(() => {
        this.displaySnackbar({ text: 'Seasons leaderboards loaded', timeout: 3000 });
        this.getAllSeasonsAllClassData();
      }, TOTAL_SEASONS * DELAY);
    },
    getAllSeasonsAllClassData() {
      //  CHANGED Quick fix should be a Promise or async instead of setTimeout
      const seasonsLeaderboardsLists = this.seasonsLeaderboardsLists();
      const DELAY = (this.DEBUG) ? 500 : 300;

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
      setTimeout(() => {
        this.displaySnackbar({ text: 'Season heroes class loaded', timeout: 3000 });
        this.isAppRdy = true;
        this.progressColor = 'success';
      }, allHeroesClass.length * DELAY);
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
