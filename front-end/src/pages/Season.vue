<template>
  <v-container fluid>
    <h1 class="text-xs-center">Season {{ $route.params.id }} Page</h1>
    <seasons-tabs-table></seasons-tabs-table>
  </v-container>
</template>

<script>
import SeasonsTabsTable from '@/components/seasons-tabs/seasons-tabs-table';

export default {
  name: 'Season',
  components: {
    'seasons-tabs-table': SeasonsTabsTable,
  },
};
</script>
