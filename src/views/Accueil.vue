<template>
  <div class="container">
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
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
            <!--{{ inFavoris(item.id) }}-->
            <a v-if="inFavoris(item.id) == -1" @click.stop.prevent="addFav(item.id, item.name)">
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
            <trains :idGare="id_gare" @loading="isLoading=false"></trains>
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
import { inflate } from 'zlib';

export default {
  name: "Accueil",
  data(){
    return{
      gares: [],
      favoris:[],
      isModalActive: false,
      id_gare:"",
      isLoading: true,
    }
  },
  components:{
    trains
  },
  created(){
    SncbService.getStations()
    .then(response => {
      this.gares = response.station
      this.isLoading = false
    })
    if(localStorage.favoris){
      this.favoris = JSON.parse(localStorage.getItem("favoris"))
    }
  },
  methods: {
    showTrains(idGare) {
      this.isModalActive = true
      this.id_gare = idGare
      this.isLoading = true
    },
    addFav(id, name){
      console.log( "j'ai id " + id + " et j'ai le nom " + name)
      this.favoris.push({id, name})
      localStorage.setItem("favoris", JSON.stringify(this.favoris))
      this.$root.favoris = true
      this.$router.push("/favoris")
    },
    inFavoris(id){
      if(localStorage.favoris){
        let favList = JSON.parse(localStorage.getItem("favoris"))
        let test = -1
        favList.forEach(el =>{
          if (el.id == id){
            test = 1} 
          })
          return test
      }
      return -1
    }
  },
    computed:{
    whoIsConnect(){
      return Store.getters.identification
    },
  },
}
</script>

<style lang="scss">
.section:nth-child(even) {
  background: #bbb;
}
</style>


