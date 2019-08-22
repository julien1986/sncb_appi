import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessage: "Test de Julien",
    ident: {
      nom: "",
      prenom: "",
      email: ""
    }
  },
  getters: {
    bonjour: state => {
      return 'Ceci est un ' + state.alertMessage
    },
    identification: state => {
      return state.ident
    },
    favoris: state => {
      return state.ident.prenom + " voici vos favoris"
    }
  },
  mutations: {
    connexion(state, ident) {
      state.ident = ident
    }
  }
})