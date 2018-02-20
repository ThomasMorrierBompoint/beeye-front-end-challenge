<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    /* eslint-disable */
    this.getSeasonsLeaderboarsList({ season: 12 });
  },
  methods: {
    ...mapActions({
      getSeasonsLeaderboarsList: 'api/getSeasonsLeaderboarsList',
    }),
  },
};
</script>
