<template>
  <v-container fluid>
    <v-layout mt-5 row wrap class="elevation-15">
      <v-flex xs12>
        <v-card class="text-xs-center">
          <br>
          <v-card-text>
            <h1>
              {{ (appIsRdy) ? 'Beeye front-end challenge Ready!' : 'Loading... Ready in few seconds' }}
            </h1>
          </v-card-text>
          <v-card-text>
            <h3 v-if="!appIsRdy">
              I really enjoy doing this project, I hope you will like it!<br>
              I left some comments in README.md file.
            </h3>
          </v-card-text>
          <br>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="text-xs-center">
          <v-card-text>
            <v-progress-circular
              :size="275"
              :width="25"
              :rotate="360"
              :value="progressStatus"
              color="primary">
              <h1>{{ Math.floor(progressStatus) }}</h1>
            </v-progress-circular>
          </v-card-text>
          <br><br><br>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  props: ['progressStatus'],
  computed: {
    ...mapGetters({
      appIsRdy: 'api/appIsRdy',
    }),
  },
};
</script>
