<template>
  <v-tabs dark color="secondary" show-arrows>
    <v-tabs-slider color="primary"></v-tabs-slider>
    <v-tab
      v-for="i in appTOTAL_SEASONS"
      :key="i"
      :href="'#/season/' + i"
      v-on:click="getSeasonHeroesClass(i)"
      >
      Season {{ i }}
    </v-tab>
    <v-tabs-items style="position: absolute">
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
          >
          <v-card-text>
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
import { mapGetters } from 'vuex';

export default {
  name: 'SeasonsTabs',
  data() {
    return {
      seasonHeroesClassAvatar: [],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getSeasonHeroesClass(this.$route.params.id);
    }
  },
  computed: {
    ...mapGetters({
      appIsRdy: 'api/appIsRdy',
      appTOTAL_SEASONS: 'api/appTOTAL_SEASONS',
    }),
  },
  methods: {
    ...mapGetters({
      appAssets: 'api/appAssets',
      seasonsHeroesClass: 'api/seasonsHeroesClass',
    }),
    getSeasonHeroesClass(seasonId) {
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

        this.seasonHeroesClassAvatar.sort(function(a, b) { return a.heroClass - b.heroClass });

        this.$router.push({ path: `/season/${seasonId}` });
      }
    },
  },
};
</script>
