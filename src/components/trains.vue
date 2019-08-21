<template>
  <ul>
    <li v-for="train in trains">
      {{ train.station }}
      <b-table :data="trains">
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.trains.id }}</b-table-column>
        </template>
      </b-table>
    </li>
  </ul>
</template>

<script>
import SncbService from "@/services/Sncb"
export default {
  name:"trains",
  data() {
    return {
      trains:[]
    }
  },
  props:["idGare"],
  created() {
    SncbService.getTrains(this.idGare)
    .then(response => this.trains = response.departures.departure)
  }
}
</script>

<style lang="scss">
</style>


