<template>
  <v-container fluid>
    <h1 class="text-xs-center">Season {{ $route.params.id }} Page</h1>
    <season-table></season-table>
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
