<template>
  <v-card>
    <v-card-title class="headline">
      Talhões
      <v-tooltip right>
        <v-btn small color="secondary" slot="activator" v-on:click="loadtalhaoadd" v-if="view"><v-icon center dark>add</v-icon></v-btn>
        <v-btn small color="secondary" slot="activator" v-on:click="loadtalhaoadd" v-if="add"><v-icon center dark>arrow_back</v-icon></v-btn>
        <span v-if="view">Adicionar Novo Talhão</span>
        <span v-if="add">Voltar a lista de talhões</span>
      </v-tooltip>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap class="pa-3">
      <TalhoesView v-if="view" :sid="sid"></TalhoesView>
      <TalhoesAdd v-if="add" :sid="sid"></TalhoesAdd>
    </v-layout>
  </v-card>
</template>

<script>
import TalhoesAdd from './Talhoes/Add'
import TalhoesView from './Talhoes/View'

export default {
  data: () => ({
    view: true,
    add: false
  }),
  props: {
    sid: {
      default: '-1'
    }
  },
  methods: {
    loadtalhaoadd: function () {
      this.add = !this.add
      this.view = !this.view
    }
  },
  components: { TalhoesAdd, TalhoesView }
}
</script>

<style scoped>

</style>
