<template>
  <v-layout mt-2 row wrap>
    <!--
    <v-flex xs12>
      <v-card light>
        <v-card-text class="text-xs-center">
          <h2>Season {{ $route.params.id }} Hero Class Title + Rift</h2>
        </v-card-text>
      </v-card>
    </v-flex>
    -->
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Season {{ $route.params.id }} Hero Class Title + Rift ? Season Last update?
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search">
          </v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :rows-per-page-items="rowsPerPageItems">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.calories }}</td>
            <td class="text-xs-center">{{ props.item.fat }}</td>
            <td class="text-xs-center">{{ props.item.carbs }}</td>
            <td class="text-xs-center">{{ props.item.protein }}</td>
            <td class="text-xs-center">{{ props.item.iron }}</td>
          </template>
          <template slot="footer">
            <td colspan="100%" class="text-xs-center">
              <strong>Few stats will be display here</strong>
            </td>
          </template>
          <template slot="no-results">
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Sorry, nothing to display here :(
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */

export default {
  name: 'SeasonTable',
  data () {
    return {
      rowsPerPageItems: [10,50,150],
      search: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', align: 'center', value: 'calories' },
        { text: 'Fat (g)', align: 'center', value: 'fat' },
        { text: 'Carbs (g)', align: 'center', value: 'carbs' },
        { text: 'Protein (g)', align: 'center', value: 'protein' },
        { text: 'Iron (%)', align: 'center', value: 'iron' }
      ],
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
      ]
    }
  }
};
</script>
