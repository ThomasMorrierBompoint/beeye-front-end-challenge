<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card :dark="appDarkTheme" class="elevation-15">
        <v-switch
          v-model="tableSwitch"
          :label="`${(tableSwitch) ? 'Table' : 'Graphs TODO'}`"
          style="position: absolute; left: 1.75em; top: 1em;">
        </v-switch>
        <v-card-text class="text-xs-center">
          <h2>Season {{ $route.params.id }}</h2>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="elevation-15">
        <v-card-title>
          <v-chip color="primary">
            <v-avatar v-if="getHeroClassAvatarImg()">
              <img v-bind:src="getHeroClassAvatarImg()" v-bind:alt="selectedHeroesClassData.title">
            </v-avatar>
            {{ selectedHeroesClassData.title }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search">
          </v-text-field>
        </v-card-title>
        <v-card-text>
          <p class="text-xs-center">
            <strong>
              Few stats from (Selected Season && Selected Hero Class) display here.
            </strong>
          </p>
        </v-card-text>
        <v-data-table
          :headers="heroesClassTableHeaders"
          :items="heroesClassTableRow"
          :search="search"
          :rows-per-page-items="rowsPerPageItems">
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.Rank || 'N/A' }}</td>
            <td class="text-xs-center">{{ props.item.BattleTag | strHashTagCleaner }}</td>
            <td class="text-xs-center">{{ props.item.RiftLevel || 'N/A' }}</td>
            <td class="text-xs-center">{{ props.item.RiftTime | toTime }}</td>
            <td class="text-xs-center">{{ props.item.CompletedTime | toDateString }}</td>
            <td class="text-xs-center">{{ props.item.HeroGender || 'N/A' }}</td>
          <!--
            <td class="text-xs-center">{{ props.item.ClanName || 'N/A' }}</td>
          -->
          </template>
          <template slot="footer">
            <v-btn small color="primary"
              v-on:click="onToggleAppDarkTheme"
              style="position: relative; left: 2em; top: 0.22em;">
              {{ (appDarkTheme) ? 'Dark' : 'Light' }}
            </v-btn>
            <td colspan="100%" class="text-xs-center">
              Season Last update
            </td>
          </template>
          <template slot="no-results">
            <v-alert :value="true" color="error" icon="warning" class="text-xs-center">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning" class="text-xs-center">
              Sorry, nothing to display here :(
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'SeasonTable',
  data() {
    return {
      search: '',
      rowsPerPageItems: [10, 25, 50],
      tableSwitch: true,
      isDarkTheme: true,
    };
  },
  filters: {
    //  CHANGED Filter should be imported and set globally
    toDateString(value) {
      if (!value) return 'N/A';
      return new Date(value).toDateString();
    },
    toTime(ms) {
      if (!ms) return 'N/A';
      // eslint-disable-next-line
      let h, m, s;
      s = Math.floor(ms / 1000);
      m = Math.floor(s / 60);
      s %= 60;
      h = Math.floor(m / 60);
      m %= 60;
      const d = Math.floor(h / 24);
      h %= 24;
      let time = (d) ? `${d}d ` : '';
      time += (h) ? `${h}h ` : '';
      time += (m) ? `${m}m ` : '';
      time += (s) ? `${s}s` : '';
      return time;
    },
    strHashTagCleaner(value) {
      if (!value) return 'N/A';
      return value.split('#')[0] || 'N/A';
    },
  },
  computed: {
    ...mapGetters({
      //  NOTE Could be set has a method to save processing power
      selectedHeroesClassData: 'pages/selectedHeroesClassData',
      heroesClassTableHeaders: 'pages/heroesClassTableHeaders',
      heroesClassTableRow: 'pages/heroesClassTableRow',
      appDarkTheme: 'api/appDarkTheme',
    }),
  },
  methods: {
    ...mapGetters({
      appAssets: 'api/appAssets',
      selectedHeroClass: 'pages/selectedHeroClass',
    }),
    ...mapMutations({
      setAppDarkTheme: 'api/SET_APP_DARK_THEME',
    }),
    getHeroClassAvatarImg() {
      const selectedHeroClass = this.selectedHeroClass();
      if (selectedHeroClass && this.appAssets().heroesClassAvatar) {
        return this.appAssets().heroesClassAvatar[selectedHeroClass] || '';
      }
      return '';
    },
    onToggleAppDarkTheme() {
      this.setAppDarkTheme({ darkTheme: !this.isDarkTheme });
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
};
</script>
