<template>
  <div class="container">
    <section>
      <h1 class="title is-2">Bienvenue sur les trains de la SNCB</h1>
      <hr>
      <div>
        <nav class="panel">
          <p class="panel-heading">Liste des gares</p>
          <!-- Pour chaque "item" dans "gares", je dis que "gare" est égal à "item"-->
          <a
            v-for="item in gares"
            :gare="item"
            @click="showTrains(item.id)"
            class="panel-block is-active"
          >
            <span class="panel-icon">
              <i class="fas fa-warehouse" aria-hidden="true"></i>
            </span>
            {{item.name}}
          </a>
        </nav>
      </div>
    </section>
    <section>
      <b-modal :active.sync="isModalActive" has-modal-card>
        <div class="card">
          <div class="card-content">
            <trains :idGare="id_gare"></trains>
          </div>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>

import SncbService from "@/services/Sncb"
import trains from '@/components/trains.vue'

export default {
  name: "Accueil",
  data(){
    return{
      gares: [],
      isModalActive: false,
      id_gare:""
    }
  },
  components:{
    trains
  },
  created(){
    SncbService.getStations()
    .then(response => this.gares = response.station)
  },
  methods: {
    showTrains(idGare) {
      this.isModalActive = true
      this.id_gare = idGare
    }
  }
}
</script>

<style lang="scss">
.section:nth-child(even) {
  background: #bbb;
}
</style>


