<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <v-layout id="wrapper">
              <v-flex xs6>
                <h1>Safra {{nome_safra}}</h1>
                <b>FAZENDA {{fazenda_name}}</b><br />
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="info" slot="activator" router :to="'/FazendaView/'+ fazenda_id"><v-icon center dark>arrow_back</v-icon> VOLTAR ÀS INFORMAÇÕES DA FAZENDA</v-btn>
              </v-flex>
            </v-layout>
            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm4>
                  <b>IDENTIFICAÇÃO: </b> {{nome_safra}}
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁREA EM PRODUÇÃO: </b> {{area_producao}}
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PREÇO MÉDIO DA TERRA NUA: </b> {{preco_terra}}
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PRODUÇÃO TOTAL DA SAFRA: </b> {{producao_total}}
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PREÇO DE VENDA: </b> {{preco_venda}}
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs11 >
        <talhoes></talhoes>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Talhoes from './SafraView/Talhoes'

export default {
  name: 'SafraView',

  components: { Talhoes },

  data: () => ({
    nome_safra: '',
    area_producao: '',
    preco_terra: '',
    producao_total: '',
    preco_venda: '',
    fazenda_id: -1,
    fazenda_name: ''
  }),

  props: {
    id: {
      default: '-1'
    }
  },

  mounted: function () {
    this.$backend.getSafra(this.id, (safraObj) => {
      if(safraObj==null) {  this.$router.push('/'); return; }
      this.nome_safra = safraObj.IdentSafra;
      this.area_producao = safraObj.AreaProducao;
      this.preco_terra = safraObj.PrecoMTerraN;
      this.producao_total = safraObj.ProducaoTotal;
      this.preco_venda = safraObj.PrecoVenda;
      this.fazenda_id = safraObj.FazendaID;

      //assincrono, logo, tem que ficar aqui dentro, pq precisamos do fazenda_id
      this.$backend.getFazenda(this.fazenda_id, (fazendaObj) => {
        this.fazenda_name = fazendaObj.NomeFazenda;
      });

    });




  }
}
</script>

<style scoped>

</style>
