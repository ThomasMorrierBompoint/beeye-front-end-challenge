<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <!-- Forcing offset to 80px (because of the Heroes Class Avatar) -->
      <v-flex xs7 md8 offset-xs2 offset-md1 style="margin-left: 80px">
        <season-table></season-table>
      </v-flex>
      <!-- TEMP CHANGED TODO this will be a components -->
      <v-flex xs3 md3 style="margin-left: auto; margin-right: auto;">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card :dark="appDarkTheme" class="elevation-15">
              <v-card-text class="text-xs-center">
                <h2>Statistics</h2>
                <v-switch
                  v-model="statsSwitch"
                  :label="`${(statsSwitch) ? 'All class' : 'Selected class'}`">
                </v-switch>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card class="elevation-15">
              <v-card-text>
                <h3>DEV Notes:</h3>
                <p>In the right pannel toggle button switch selected season stats for selected class or all class.</p>
                <p>In the table area toggle button switch layout between table and graphs (table would be hidden and we would see some graphs).</p>
                <p>All Season all class global stats would probably have another page.</p>
                <h3 class="text-xs-center">Overview</h3>
                Total men<br>
                Total women<br>
                % men vs women (donut graph)<br>
                Total of each class in all class top 100<br>
                Avg Time spent<br>
                Avg Time spent/Tier<br>
                Time spent/Tier<br>
                Avg Tier<br>
                Tier High<br>
                Tier Low<br>
                Delta H/L<br>
                Tier Standard deviation<br>
                Time spent/Tier SD<br>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SeasonTable from '@/components/season/season-table';

export default {
  name: 'Season',
  components: {
    'season-table': SeasonTable,
  },
  data() {
    return {
      statsSwitch: true,
    };
  },
  computed: {
    ...mapGetters({
      appDarkTheme: 'api/appDarkTheme',
    }),
  },
};
</script>
