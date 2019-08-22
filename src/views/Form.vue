<template>
  <section>
    <h1>Qui etes-vous ?</h1>
    <b-field label="Nom ">
      <b-input v-model="ident.nom"></b-input>
      <span
        v-show="$v.ident.nom.required && !$v.ident.nom.minLength"
      >Vous devez saisir au minimum deux caractères</span>
    </b-field>
    <b-field label="Prénom ">
      <b-input v-model="ident.prenom"></b-input>
      <span
        v-show="$v.ident.prenom.required && !$v.ident.prenom.minLength"
      >Vous devez saisir au minimum deux caractères</span>
    </b-field>
    <b-field label="email ">
      <b-input type="email" v-model="ident.email"></b-input>
      <span v-show="!$v.ident.email.$error && !$v.ident.email.required">Champ obligatoire /</span>
      <span v-show="!$v.ident.email.$error && !$v.ident.email.email">Mail intranet</span>
    </b-field>
    <b-button
      @click.prevent="identification"
      :disabled="$v.ident.$invalid"
      type="is-success"
    >Success</b-button>
  </section>
</template>

<script>
import {required, minLength, email} from 'vuelidate/lib/validators'
import customValidators from '@/tools/customValidators'

export default {
  name: "Form",
  data(){
    return{
      ident:{
        nom:"",
        prenom: "",
        email:""
      }
    }
  },
  validations:{
    //besoin du memem nom d'objet qu'on veut valider
    ident:{
      nom:{
        required,
        minLength: minLength(2)
      },
      prenom:{
        required,
        minLength: minLength(2)
      },
      email:{
        required,
        email,
        pattern:customValidators.intraMail()
      }
    }
  },
  methods:{
    identification(){
      console.log(this.ident)
    }
  }
}
</script>

<style lang="scss">
</style>

