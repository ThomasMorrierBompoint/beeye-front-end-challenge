<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card dark class="elevation-15">
        <v-card-text class="text-xs-center">
          <h2>Season {{ $route.params.id }} Hero Class Title + Rift</h2>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card
        class="elevation-15">
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
          :headers="heroesClassTableHeaders"
          :items="heroesClassTableRow"
          :search="search"
          :rows-per-page-items="rowsPerPageItems">
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.Rank }}</td>
            <td class="text-xs-center">{{ props.item.BattleTag }}</td>
            <td class="text-xs-center">{{ props.item.RiftLevel }}</td>
            <td class="text-xs-center">{{ props.item.RiftTime }}</td>
            <td class="text-xs-center">{{ props.item.CompletedTime }}</td>
            <td class="text-xs-center">{{ props.item.HeroGender }}</td>
            <td class="text-xs-center">{{ props.item.ClanName }}</td>
          </template>
          <template slot="footer">
            <td colspan="100%" class="text-xs-center">
              <br>
              <p><strong>Few stats from (Selected Season && Selected Hero Class) will be display here.</strong></p>
              <p>Selected Season stats will be display on the right.</p>
              <p>All Season stats may have another page I don't know yet.</p>
              <p>I may had a toggle button to switch between selected season and global season.</p>
              <p>I may put a toggle button to switch between graph and table data.</p>
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
import { mapGetters } from 'vuex';

export default {
  name: 'SeasonTable',
  data () {
    return {
      rowsPerPageItems: [10,25,50],
      search: '',
      items: [
        {
          value: false,
          Rank: 1,
          BattleTag:'Name wadaw',
          RiftLevel: 153,
          RiftTime: 13213154,
          CompletedTime: 13213154,
          HeroGender: 'M',
          ClanName: 'Temp name',
        },
        {
          value: false,
          Rank: 2,
          BattleTag:'Name awdw',
          RiftLevel: 143,
          RiftTime: 13154,
          CompletedTime: 23213154,
          HeroGender: 'M',
          ClanName: 'Temp name',
        },
        {
          value: false,
          Rank: 3,
          BattleTag:'Name awda',
          RiftLevel: 113,
          RiftTime: 7213154,
          CompletedTime: 253154,
          HeroGender: 'F',
          ClanName: 'Temp name',
        },
        {
          value: false,
          Rank: 4,
          BattleTag:'Name awda',
          RiftLevel: 110,
          RiftTime: 7213154,
          CompletedTime: 253154,
          HeroGender: 'F',
          ClanName: 'Temp name',
        },
        {
          value: false,
          Rank: 5,
          BattleTag:'Name awda',
          RiftLevel: 109,
          RiftTime: 7213154,
          CompletedTime: 253154,
          HeroGender: 'F',
          ClanName: 'Temp name',
        },
      ]
    };
  },
  computed: {
    ...mapGetters({
      //  NOTE Could be set has a method to save processing power
      heroesClassTableHeaders: 'pages/heroesClassTableHeaders',
      heroesClassTableRow: 'pages/heroesClassTableRow',
    }),
  },
};
</script>
