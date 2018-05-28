<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 class="mt-4">
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
          <td>{{ props.item.producaototal }}</td>
          <td>{{ props.item.area }}</td>
          <td class="text-xs-center"><v-btn small color="primary" dark router :to=" '/TalhaoView/' + props.item.id" ><v-icon left dark>info</v-icon> Mostrar talhão</v-btn>
          </td>
          <td>
            <v-btn flat icon color="primary" ark>
              <v-icon>build</v-icon>
            </v-btn>
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
        text: 'Identificação Talhão',
        align: 'left',
        value: 'name'
      },
      {
        text: 'Produção total (R$)',
        value: 'producaototal'
      },
      {
        text: 'Área (m²)',
        value: 'area'
      },
      {
        text: '',
        value: 'actions'
      },
      {
        text: '',
        value: 'edit'
      }
    ],
    items: []
  }),

  props: {
    sid: {
      default: '-1'
    }
  },

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

  mounted: function(){
    this.$backend.getSafraTalhao(this.sid, all_talhao => {
      if(all_talhao != null)
      all_talhao.forEach(talhaoObj => {
        this.items.push({
          value: false,
          name: talhaoObj.NomeTalhao,
          producaototal: talhaoObj.ProdTotal,
          area: talhaoObj.Area,
          actions: '',
          id: talhaoObj.id
        })
      })
    })
  }
}
</script>

<style scoped>

</style>
