<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs10 md11 offset-xs2 offset-md1>
        <season-table></season-table>
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
