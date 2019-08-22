<template>
  <div class="container">
    <section>
      <h1 class="title is-2">Bienvenue sur les trains de la SNCB</h1>
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
      favoris: [],
      isModalActive: false,
      id_gare:""
    }
  },
  components:{
    trains
  },
  created(){
    if(localStorage.favoris){
      this.favoris = JSON.parse(localStorage.getItem("favoris"))
    }
  },
  methods: {
    showTrains(idGare) {
      this.isModalActive = true
      this.id_gare = idGare
    },
    delFav(id){
      this.favoris.splice(id,1)
      localStorage.setItem("favoris", JSON.stringify(this.favoris))
      if(this.favoris.length == 0){
        localStorage.removeItem("favoris")
        this.$root.favoris = false
        this.$router.push("/")
      }
    }
  }
}
</script>

<style lang="scss">
.section:nth-child(even) {
  background: #bbb;
}
</style>


