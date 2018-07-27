<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 class="mt-4">
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
          <td>{{ formatN(props.item.producaototal) }} Sc</td>
          <td class="text-xs-center"><v-btn small color="primary" dark router :to=" '/TalhaoView/' + props.item.id" ><v-icon left dark>info</v-icon> Mostrar talhão</v-btn>
            <v-menu right color="primary">
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile router :to=' "/TalhaoEdit/" + props.item.id '>
                  <v-list-tile-title>Editar</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="removeT(props.item.id)">
                  <v-list-tile-title>Remover</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
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
import { remote } from 'electron'
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
        text: 'Produção total',
        value: 'producaototal'
      },
      {
        text: '',
        value: 'actions'
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
    },
    atualizaTalhoes() {
      this.items=[];
      this.$backend.getSafraTalhao(this.sid, all_talhao => {
        if(all_talhao != null)
        all_talhao.forEach(talhaoObj => {
          this.items.push({
            value: false,
            name: talhaoObj.NomeTalhao,
            producaototal: talhaoObj.ProdTotal,
            actions: '',
            id: talhaoObj.id
          })
        })
      })
    },
    formatN(vr){
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR');
    },
    removeT(TtoRID){
      remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Todos os dados relacionados a esse talhão serão excluídos.\nVocê tem certeza que deseja fazer isso?',
                                    buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
                                      if(idx==0){
                                        this.$backend.deleteTalhao(TtoRID, () => {
                                          this.atualizaTalhoes();
                                        });
                                      }
                                    });
    }
  },

  mounted: function(){
    this.atualizaTalhoes();
  }
}
</script>

<style scoped>

</style>
