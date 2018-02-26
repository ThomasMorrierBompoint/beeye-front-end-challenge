<template>
  <v-container fluid>
    <h1 class="text-xs-center">
      {{ (appIsRdy) ? 'Beeye front-end challenge Ready!' : 'Loading... few seconds to go' }}
    </h1>
    <br><br>
    <h3 v-if="!appIsRdy" class="text-xs-center">
      It was very cool to do. I hope you will like it!<br>
      I left some comments inside README.md.
    </h3>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      appIsRdy: 'api/appIsRdy',
    }),
  },
};
</script>
