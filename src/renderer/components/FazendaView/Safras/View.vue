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
          <td><v-checkbox v-model="checked" :value="props.item.name"></v-checkbox></td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.areaemproducao }}</td>
          <td>{{ props.item.producaodasafra }}</td>
          <td class="text-xs-center"><v-btn small color="primary" dark router :to="'/SafraView/' + props.item.id"><v-icon left dark>info</v-icon> Mostrar safra</v-btn>
            <v-menu right color="primary">
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="removeS(props.item.id)">
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
        text: '',
        align: 'left',
        value: 'checkbox'
      },
      {
        text: 'Identificação da safra',
        value: 'name'
      },
      {
        text: 'Área em produção (ha)',
        value: 'areaemproducao'
      },
      {
        text: 'Produção (Sc)',
        value: 'producaodasafra'
      },
      {
        text: '',
        value: 'actions'
      }
    ],
    checked: [],
    items: []
  }),
  props:{
    fid :{
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
    atualizaSafras() {
      let area=0;
      let prodtotal=0;
      let cont=0;
      this.items = [];
      this.$backend.getFazendaSafras(this.fid, all_safras => {
        if(all_safras!=null)
        all_safras.forEach(safraObj => {
          if(cont < 4){
            this.checked[cont] = safraObj.IdentSafra;
            cont++;
          }
          this.$backend.getSafraTalhao(safraObj.id, all_talhao => {
            if(all_talhao != null)
            all_talhao.forEach(talhaoObj => {
              //producao
              prodtotal += Math.floor(talhaoObj.ProdTotal);

              //aplantada
              area += Math.floor(talhaoObj.Area);
            });
            this.items.push({
              value: false,
              name: safraObj.IdentSafra,
              areaemproducao: area,
              precomedio: safraObj.PrecoMTerraN,
              producaodasafra: prodtotal,
              precodevenda: safraObj.PrecoVenda,
              actions: '',
              id: safraObj.id
            });
            prodtotal=0;
            area=0;
          });
        })
      });
    },
    removeS(StRID){
      remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Todos os dados relacionados a essa safra serão excluídos, incluindo, todos os talhões associados à ela.\nVocê tem certeza que deseja fazer isso?',
                                    buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
                                      if(idx==0){
                                        this.$backend.deleteSafra(StRID, () => {
                                          this.atualizaSafras();
                                        });
                                      }
                                    });
    }
  },

  mounted: function () {
    console.log(this.selecionado)
    this.atualizaSafras();
  }
}
</script>

<style scoped>

</style>
