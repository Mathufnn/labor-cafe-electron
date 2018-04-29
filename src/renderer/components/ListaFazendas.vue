<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs11 class="mt-4">
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      item-key="id"
      class="elevation-1"
      rows-per-page-text="Linhas por página"
      :rows-per-page-items="rowsppitems"
      >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.production_sys }}</td>
          <td>{{ props.item.agronegocy }}</td>
          <td>{{ props.item.city }}</td>
          <td class="text-xs-center"><v-btn small color="primary" dark router to="/FazendaView"><v-icon left dark>info</v-icon> Mostrar fazenda</v-btn>
          </td>
        </tr>
      </template>
      <template slot="pageText" slot-scope="item">
        Mostrando {{item.pageStart}} - {{item.pageStop}}, de um total de {{item.itemsLength}}
      </template>
    </v-data-table>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data: () => ({
    pagination: {
      sortBy: 'name'
    },
    rowsppitems: [10,25,50,{"text":"Tudo","value":-1}],
    selected: [],
    headers: [
      {
        text: 'Nome da Fazenda',
        align: 'left',
        value: 'name'
      },
      {
        text: 'Sistema de Produção',
        value: 'production_sys'
      },
      {
        text: 'Agronegócio',
        value: 'agronegocy'
      },
      {
        text: 'Cidade',
        value: 'city'
      },
      {
        text: '',
        value: 'actions'
      }
    ],
    items: []
  }),

  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  },
  mounted: function () {
    this.$backend.getAllFazendas(all_fazendas => {
      all_fazendas.forEach(fazendaObj => {
        this.items.push({
          value: false,
          name: fazendaObj.NomeFazenda,
          production_sys: fazendaObj.SistemaProducao==1?'Irrigado':'Sequeiro',
          agronegocy: fazendaObj.Agronegocio,
          city: fazendaObj.Cidade,
          actions: '',
          id: fazendaObj.id
        });
      })
    });
  }
}
</script>

<style scoped>

</style>
