<template>
  <div class="container">
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <section>
      <h1 class="title is-2">{{bonjour}}</h1>
      <hr>
      <div>
        <nav class="panel">
          <p class="panel-heading">Liste des gares</p>
          <!-- Pour chaque instance d'"item" dans "favoris", je dis que "favori" est égal à "item"-->
          <a
            v-for="item in favoris"
            :favori="item"
            @click="showTrains(item.id)"
            class="panel-block is-active"
          >
            <span class="panel-icon">
              <i class="fas fa-warehouse" aria-hidden="true"></i>
            </span>
            <!-- c'est ici que je me sert du contenu de item -->
            {{item.name}}
            <a @click.stop.prevent="delFav(item.id)">
              <b-icon pack="fa" icon="trash" size="is-small"></b-icon>
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

export default {
  name: "Accueil",
  data(){
    return{
      favoris: [],
      isModalActive: false,
      id_gare:"",
      isLoading: false
    }
  },
  components:{
    trains
  },
  created(){
    if(localStorage.favoris){
      this.favoris = JSON.parse(localStorage.getItem("favoris"))
      this.isLoading = false
    }
  },
  methods: {
    showTrains(idGare) {
      this.isModalActive = true
      this.id_gare = idGare
      this.isLoading = true
    },
    delFav(id){
      this.favoris.splice(id,1)
      localStorage.setItem("favoris", JSON.stringify(this.favoris))
      if(this.favoris.length == 0){
        localStorage.removeItem("favoris")
        this.$root.favoris = false
        this.$router.push("/")
      }
    },
  },
  computed:{
    bonjour(){
      return Store.getters.favoris
    }
  }
}
</script>

<style lang="scss">
.section:nth-child(even) {
  background: #bbb;
}
</style>


