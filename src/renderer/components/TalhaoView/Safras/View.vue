<template>
  <v-layout  row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      item-key="name"
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
          <td class="text-xs-center"><v-btn small color="primary" dark ><v-icon left dark>info</v-icon> Mostrar safra</v-btn>
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
    items: [ //itens de teste
      {
        value: false,
        name: 'afssadgas',
        areaemproducao: 'hauehau',
        producaodasafra: 'rqwerqw',
        precodevenda: 'nbmnmnb',
        actions: '',
        id: 0
      },
      {
        value: false,
        name: 'nbxkjs',
        areaemproducao: '8714298',
        producaodasafra: '142917',
        precodevenda: '481279821',
        actions: '',
        id: 0
      }
    ]
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
  }
}
</script>

<style scoped>

</style>
