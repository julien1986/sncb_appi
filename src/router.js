import Vue from 'vue'
import Router from 'vue-router'
import Accueil from './views/Accueil.vue'
import Favoris from './views/Favoris.vue'
import Form from './views/Form.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Accueil",
      component: Accueil
    },
    {
      path: "/favoris",
      name: "Favoris",
      component: Favoris
    },
    {
      path: "/formulaire",
      name: "Formulaire",
      component: Form
    }
  ]
})
