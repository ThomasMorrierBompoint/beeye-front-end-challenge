<template>
  <v-tabs dark show-arrows class="elevation-15">
    <v-tabs-slider color="primary"></v-tabs-slider>
    <v-tab
      v-for="i in appTOTAL_SEASONS"
      :key="i"
      :href="'#/season/' + i"
      v-on:click="onClickSeasonTab(i)"
      >
      Season {{ i }}
    </v-tab>
    <v-tabs-items
      style="position: absolute"
      class="elevation-15">
      <v-tab-item
        v-for="i in appTOTAL_SEASONS"
        :key="i"
        :id="'/season/' + i"
        >
        <v-card
          v-for="seasonHeroAvatar in seasonHeroesClassAvatar"
          :key="seasonHeroAvatar.heroClass"
          flat
          hover
          style="border-radius: 0"
          :class="{ 'card-active': seasonHeroAvatar.heroClass === selectedHeroClass }"
          >
          <v-card-text
            v-on:click="onClickHeroeClassAvatar(seasonHeroAvatar)">
            <v-tooltip bottom>
              <v-avatar slot="activator">
                <img v-bind:src="seasonHeroAvatar.imgUrl" v-bind:alt="seasonHeroAvatar.title" />
              </v-avatar>
              <span>{{ seasonHeroAvatar.title }}</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'SeasonTabs',
  data() {
    return {
      seasonHeroesClassAvatar: [],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.onClickSeasonTab(this.$route.params.id);
    }
  },
  computed: {
    ...mapGetters({
      appIsRdy: 'api/appIsRdy',
      appTOTAL_SEASONS: 'api/appTOTAL_SEASONS',
      selectedHeroClass: 'pages/selectedHeroClass',
    }),
  },
  methods: {
    ...mapGetters({
      appAssets: 'api/appAssets',
      appIsLoadingData: 'api/appIsLoadingData',
      seasonsHeroesClass: 'api/seasonsHeroesClass',
    }),
    ...mapActions({
      getSeasonHeroClassData: 'pages/getSeasonHeroClassData',
    }),
    ...mapMutations({
      setAppIsLoadingData: 'api/SET_APP_IS_LOADING_DATA',
      setPagesSelectedSeasonId: 'pages/SET_PAGES_SELECTED_SEASON_ID',
      setPagesSelectedHeroClass: 'pages/SET_PAGES_SELECTED_HERO_CLASS',
    }),
    onClickSeasonTab(seasonId) {
      this.setAppIsLoadingData({ isLoadingData: true });
      /* eslint-disable */
      const seasonsHeroesClass = this.seasonsHeroesClass();

      if (seasonsHeroesClass && seasonsHeroesClass[seasonId]) {
        const seasonHeroesClass = seasonsHeroesClass[seasonId];
        const heroesClassAvatar = this.appAssets().heroesClassAvatar;

        this.seasonHeroesClassAvatar = [];

        Object.keys(seasonHeroesClass).forEach((heroClass) => {
          this.seasonHeroesClassAvatar.push({
            heroClass,
            title: seasonHeroesClass[heroClass].title,
            imgUrl: heroesClassAvatar[heroClass],
          });
        });

        this.seasonHeroesClassAvatar.sort((a, b) => {
          return b.heroClass < a.heroClass;
        });

        this.$router.push({ path: `/season/${seasonId}` });

        this.setPagesSelectedSeasonId({ seasonId });
        this.onGetSeasonHeroClassData();
      }
    },
    onGetSeasonHeroClassData() {
      this.getSeasonHeroClassData();
      setTimeout(() => this.setAppIsLoadingData({ isLoadingData: false }), 500);
    },
    onClickHeroeClassAvatar(seasonHeroAvatar) {
      if (!this.appIsLoadingData()) {
        this.setAppIsLoadingData({ isLoadingData: true });
        this.setPagesSelectedHeroClass({ heroClass: seasonHeroAvatar.heroClass });
        this.getSeasonHeroClassData();
        setTimeout(() => this.setAppIsLoadingData({ isLoadingData: false }), 500);
      }
    },
  },
};
</script>

<style scoped>
.card-active {
  background-color: #f37d37;  /* TODO Should be bind with vuetify theme variable */
}
</style>
