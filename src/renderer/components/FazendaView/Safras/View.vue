<template>
  <v-layout  row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-data-table

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
          <td><v-checkbox v-model="checked" :value="props.item.id"></v-checkbox></td>
          <td>{{ props.item.name }}</td> <!--
          <td>{{ formatN(props.item.areaemproducao) }} ha</td> -->
          <td>{{ formatN(props.item.producaodasafra) }} Sc</td>
          <td class="text-xs-center"><v-btn small color="primary" dark router :to="'/SafraView/' + props.item.id"><v-icon left dark>info</v-icon> Mostrar safra</v-btn>
          </td>
          <td>
            <v-menu right color="primary">
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile router :to=' "/SafraEdit/" + props.item.id '>
                  <v-list-tile-title>Editar</v-list-tile-title>
                </v-list-tile>
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
      <template slot="no-data">
        <v-layout class="text-xs-center pa-3">
          <v-flex xs12>
            <p>
            <b>Não há safras cadastradas ainda!</b><br />
            Clique no botão <span color="secondary"><v-icon center>add</v-icon></span> para adicionar a primeira safra!
          </p>
          </v-flex>
        </v-layout>
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
        text: 'Indicadores',
        align: 'center',
        value: 'checkbox',
        sortable: false
      },
      {
        text: 'Identificação',
        value: 'name'
      }, /*
      {
        text: 'Área total',
        value: 'areaemproducao'
      }, */
      {
        text: 'Produção total',
        value: 'producaodasafra'
      },
      {
        text: '',
        value: 'actions',
        sortable: false
      },
      {
        text: '',
        value: 'actionsrm',
        sortable: false
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
    //  if (this.selected.length) this.selected = []
    //  else this.selected = this.items.slice()
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
      this.checked = [];
      this.$backend.getFazendaSafras(this.fid, all_safras => {
        let checked_temp = [];
        if(all_safras!=null)
        all_safras.forEach(safraObj => {
          cont++;
          this.$backend.getSafraTalhao(safraObj.id, all_talhao => {
            if(all_talhao != null)
            all_talhao.forEach(talhaoObj => {
              //producao
              prodtotal += talhaoObj.ProdTotal;
              //aplantada
              area += talhaoObj.Area;
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

          if(checked_temp.length<4) checked_temp.push(safraObj.id);
        });

        this.checked = checked_temp;
      });

    },
    formatN(vr){
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR');
      // return vr;
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
    this.atualizaSafras();
  },
  watch: {
    checked: function (newV, oldV) {
      console.log(JSON.stringify(this.checked));
        this.$emit('checkeds', this.checked);
    }
  }
}
</script>

<style scoped>

</style>
