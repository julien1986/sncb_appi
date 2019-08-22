<template>
  <div>
    <!--{{ train.station }}-->
    <section v-if="(!errorTrains)">
      <h1>Trains au départ de {{stationName}}</h1>
      <b-table :data="trains" :paginated="isPaginated" :per-page="10">
        <template slot-scope="props">
          <b-table-column field="station" label="to station" sortable>{{ props.row.station }}</b-table-column>
          <b-table-column field="time" label="time" sortable>{{ props.row.time | date}}</b-table-column>
          <b-table-column field="delay" label="delay" sortable>{{ props.row.delay }} mins</b-table-column>
          <b-table-column
            :class="{'canceled' :props.row.canceled == 1}"
            field="canceled"
            label="canceled"
            sortable
          >
            <span v-if="props.row.canceled ==0">non</span>
            <span v-else>oui</span>
          </b-table-column>
        </template>
      </b-table>
    </section>
    <section v-else>Pas de train</section>
  </div>
</template>

<script>
import SncbService from "@/services/Sncb"
import date from '@/filters/date'

export default {
  name:"trains",
  data() {
    return {
      trains:[],
      stationName: "",
      errorTrains: false
    }
  },
  filters: {
    date: date
  },
  props:["idGare"],
  created() {
    SncbService.getTrains(this.idGare)
    .then(response => {
      this.trains = response.departures.departure
      this.stationName = response.station})
    .cath(error => this.errorTrains = true)
  }
}
</script>

<style lang="scss">
.canceled {
  color: #f00;
}
</style>


