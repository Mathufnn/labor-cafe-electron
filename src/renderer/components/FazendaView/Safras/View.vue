<template>
  <v-layout  row wrap justify-center id="wrapper">
    <v-flex xs12 >
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
          <td>{{ props.item.areaemproducao }}</td>
          <td>{{ props.item.producaodasafra }}</td>
          <td>{{ props.item.precodevenda }}</td>
          <td class="text-xs-center"><v-btn small color="primary" dark router :to="'/SafraView/' + props.item.id"><v-icon left dark>info</v-icon> Mostrar safra</v-btn>
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
        text: 'Nome da safra',
        align: 'left',
        value: 'name'
      },
      {
        text: 'Área em produção',
        value: 'areaemproducao'
      },
      {
        text: 'Produção',
        value: 'producaodasafra'
      },
      {
        text: 'Preço de venda',
        value: 'precodevenda'
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
    this.$backend.getAllSafras(all_safras => {
      all_safras.forEach(safraObj => {
        this.items.push({
          value: false,
          name: safraObj.IdentSafra,
          areaemproducao: safraObj.AreaProducao,
          precomedio: safraObj.PrecoMTerraN,
          producaodasafra: safraObj.ProducaoTotal,
          precodevenda: safraObj.PrecoVenda,
          actions: '',
          id: safraObj.id
        });
      })
    });
  }
}
</script>

<style scoped>

</style>
