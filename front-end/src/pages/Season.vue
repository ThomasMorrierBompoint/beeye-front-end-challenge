<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <!-- Forcing offset to 80px (because of the Heroes Class Avatar) -->
      <v-flex xs8 md9 offset-xs2 offset-md1 style="margin-left: 80px">
        <season-table></season-table>
      </v-flex>
      <!-- TEMP CHANGED TODO this will be a components -->
      <v-flex xs2 md2 style="margin-left: auto; margin-right: auto;">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card dark class="elevation-15">
              <v-card-text class="text-xs-center">
                <h2>Season {{ $route.params.id }} Global Stats / All season global stats (toggle)</h2>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card class="elevation-15">
              <v-card-text class="text-xs-center">
                <h2>TODO</h2>
                <p>I'll put a list of ideas soon</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SeasonTable from '@/components/season/season-table';

export default {
  name: 'Season',
  components: {
    'season-table': SeasonTable,
  },
};
</script>
