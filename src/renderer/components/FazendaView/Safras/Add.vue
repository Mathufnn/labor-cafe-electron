<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-card>
        <v-card-title class="headline">
          Cadastrar nova safra
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <h2 class="subheading" >INFORMAÇÕES BÁSICAS</h2>
          <v-divider></v-divider>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-layout row wrap>
                <v-flex xs12 sm12>
                  <v-text-field box label="Identificação da safra" v-model="identificacao_safra"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field box label="Área em produção (ha)" v-model="area_producao"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box label="Preço médio da terra nua (R$/ha)" v-model="preco_medio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box label="Produção total da safra (Sc)" v-model="producao_total"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box label="Preço de venda (R$/Sc)" v-model="preco_venda"></v-text-field>
                </v-flex>
              </v-layout>
            </v-layout>


          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn block color="info" large @click="SalvarSafra">SALVAR NOVA SAFRA</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    identificacao_safra: '',
    area_producao: '',
    preco_medio: '',
    producao_total: '',
    preco_venda: ''
  }),
  props:{
    fid: {
      default: "-1"
    }
  },
  methods: {
    SalvarSafra: function () {
      if(this.fid==-1) return;
      this.$backend.addSafra({
        IdentSafra: this.identificacao_safra,
        AreaProducao: this.area_producao,
        PrecoMTerraN: this.preco_medio,
        ProducaoTotal: this.producao_total,
        PrecoVenda: this.preco_venda,
        FazendaID: this.fid
      }, (created) => {
        console.log(created.id);
        this.$router.push("/SafraView/"+created.id);
      });
    }
  }
}
</script>

<style scoped>

</style>
