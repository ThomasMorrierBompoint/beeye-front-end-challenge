<template>
  <v-app dark>
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
    <season-tabs v-if="appIsRdy"></season-tabs>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import SeasonTabs from '@/components/season/season-tabs';

export default {
  name: 'App',
  components: {
    'season-tabs': SeasonTabs,
  },
  data() {
    return {
      DEBUG: false,
      indeterminate: true,
      progressColor: 'info',
      progressStatus: 0,
      snackbar: false,
      timeout: 5000,
      text: '',
    };
  },
  computed: {
    ...mapGetters({
      appIsRdy: 'api/appIsRdy',
    }),
  },
  created() {
    this.DEBUG = this.appDEBUG();
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
      appDEBUG: 'api/appDEBUG',
      appTOTAL_SEASONS: 'api/appTOTAL_SEASONS',
      seasonsTopPlayers: 'api/seasonsTopPlayers',
      sharedHeroesClassData: 'api/sharedHeroesClassData',
      seasonsLeaderboardsLists: 'api/seasonsLeaderboardsLists',
    }),
    ...mapActions({
      getAccessToken: 'api/getAccessToken',
      getSeasonsLeaderboardsList: 'api/getSeasonsLeaderboardsList',
      getSeasonHeroClassData: 'api/getSeasonHeroClassData',
    }),
    ...mapMutations({
      setAppStateRdy: 'api/SET_APP_STATE_RDY',
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
      //  getSeasonsLeaderboardsList().then if ind < array.length call getSeasonHeroClassData again
      const TOTAL_SEASONS = this.appTOTAL_SEASONS();
      const DELAY = 250;
      const TOTAL_DELAY = (TOTAL_SEASONS + 2) * DELAY;

      let seasonNumber = 0;

      for (let ind = 0; ind < TOTAL_SEASONS; ind += 1) {
        // eslint-disable-next-line
        setTimeout(() => this.getSeasonsLeaderboardsList({ season: ++seasonNumber }), ind * DELAY);
      }

      this.displaySnackbar({
        text: 'Seasons leaderboards loaded',
        delay: TOTAL_DELAY,
        timeout: 3000,
      });

      setTimeout(() => this.getAllSeasonsAllClassData(), TOTAL_DELAY);
    },
    getAllSeasonsAllClassData() {
      //  CHANGED Quick fix should be a Promise or async instead of setTimeout
      //  Avoid double loop concat seasons class in 1 array then itterate
      //  getSeasonHeroClassData().then if ind < array.length call getSeasonHeroClassData again

      const seasonsLeaderboardsLists = this.seasonsLeaderboardsLists();
      const DELAY = (this.DEBUG) ? 250 : 400;

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

      setTimeout(() => {
        this.progressColor = 'primary';
        this.setAppStateRdy({ isRdy: true });
        this.$router.push({ path: `/season/1` });
      }, (allHeroesClass.length + 2) * DELAY);
      /* eslint-enable */
    },
  },
};
</script>

<style scoped>
  .progress-linear {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
