<template>
  <v-container fluid>
    <br><br>
    <h1 class="text-xs-center">
      {{ (appIsRdy) ? 'Beeye front-end challenge Ready!' : 'Loading... few seconds to go' }}
    </h1>
    <br><br><br>
    <h3 v-if="!appIsRdy" class="text-xs-center">
      I really enjoy doing this project, I hope you will like it!<br>
      I left some comments in README.md file.
    </h3>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      appIsRdy: 'api/appIsRdy',
    }),
  },
};
</script>
