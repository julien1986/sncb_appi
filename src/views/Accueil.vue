<template>
  <div class="container">
    <section>
      <h1 class="title is-2">Bienvenue sur les trains de la SNCB, {{whoIsConnect.prenom}}</h1>
      <hr>
      <div>
        <nav class="panel">
          <p class="panel-heading">Liste des gares</p>
          <!-- Pour chaque "item" dans "gares", je dis que "gare" est égal à l'objet "item"-->
          <a
            v-for="item in gares"
            :gare="item"
            @click="showTrains(item.id)"
            class="panel-block is-active"
          >
            <span class="panel-icon">
              <i class="fas fa-warehouse" aria-hidden="true"></i>
            </span>
            <!-- c'est ici que je me sert du contenu -->
            {{item.name}}
            <a @click.stop.prevent="addFav(item.id, item.name)">
              <b-icon pack="far" icon="star" size="is-small"></b-icon>
            </a>
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
import Store from '@/store.js'

export default {
  name: "Accueil",
  data(){
    return{
      gares: [],
      favoris:[],
      isModalActive: false,
      id_gare:"",
    }
  },
  components:{
    trains
  },
  created(){
    SncbService.getStations()
    .then(response => this.gares = response.station)
    if(localStorage.favoris){
      this.favoris = JSON.parse(localStorage.getItem("favoris"))
    }
  },
  methods: {
    showTrains(idGare) {
      this.isModalActive = true
      this.id_gare = idGare
    },
    addFav(id, name){
      console.log( "j'ai id " + id + " et j'ai le nom " + name)
      this.favoris.push({id, name})
      localStorage.setItem("favoris", JSON.stringify(this.favoris))
      this.$root.favoris = true
    }
  },
    computed:{
    whoIsConnect(){
      return Store.getters.identification
    }
  },
}
</script>

<style lang="scss">
.section:nth-child(even) {
  background: #bbb;
}
</style>


