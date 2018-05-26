<template>
  <v-card>
    <v-card-title class="headline">
      Safras
      <v-tooltip right>
        <v-btn small color="secondary" slot="activator" v-on:click="loadtalhaoadd" v-if="view"><v-icon center dark>add</v-icon></v-btn>
        <v-btn small color="secondary" slot="activator" v-on:click="loadtalhaoadd" v-if="add"><v-icon center dark>arrow_back</v-icon></v-btn>
        <span v-if="view">Adicionar Nova Safra</span>
        <span v-if="add">Voltar a lista de Safra</span>
      </v-tooltip>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap class="pa-3">
      <SafrasView v-if="view" :fid="fid"></SafrasView>
      <SafrasAdd v-if="add" :fid="fid"></SafrasAdd>
    </v-layout>
  </v-card>
</template>

<script>
import SafrasAdd from './Safras/Add'
import SafrasView from './Safras/View'

export default {
  components: { SafrasAdd, SafrasView },
  data: () => ({
    view: true,
    add: false
  }),
  props: {
    fid: {
      default: '-1'
    }
  },
  methods: {
    loadtalhaoadd: function () {
      this.add = !this.add
      this.view = !this.view
    }
  }

}
</script>

<style scoped>

</style>
