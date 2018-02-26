<template>
  <v-tabs dark color="secondary" show-arrows>
    <v-tabs-slider color="primary"></v-tabs-slider>
    <v-tab
      v-for="i in appTOTAL_SEASONS"
      :key="i"
      :href="'#tab-' + i"
      v-on:click="getSeasonHeroesClass(i)"
      >
      Season {{ i }}
    </v-tab>
    <v-tabs-items style="position: absolute">
      <v-tab-item
        v-for="i in appTOTAL_SEASONS"
        :key="i"
        :id="'tab-' + i"
        >
        <v-card
          v-for="seasonHeroAvatar in seasonHeroesClassAvatar"
          flat
          >
          <v-card-text>
            <v-avatar>
              <img v-bind:src="seasonHeroAvatar.imgUrl" v-bind:alt="seasonHeroAvatar.title" />
            </v-avatar>
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
      }
    },
  },
};
</script>
