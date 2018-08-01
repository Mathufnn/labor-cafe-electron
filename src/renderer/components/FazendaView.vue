<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card color="green lighten-3">
          <!-- TROCAR A FONTE OU DEIXAR EM NEGRITO! -->
          <v-card-text>
            <h1>Fazenda {{nome_fazenda}}</h1>

            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm6>
                  <b>SISTEMA DE PRODUÇÃO</b><br /> {{sistema_producao}}
                </v-flex>
                <v-flex xs12 sm6>
                  <b>CIDADE</b><br /> {{cidade}}
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
        <safras :fid="id" @checkeds="onCheckedsChange"></safras>
      </v-flex>

      <v-flex xs11>
        <indicadores :fid="id" :checkeds="checkeds_safras"></indicadores>
      </v-flex>
<!--
      <v-flex xs11>
        <relatorios :fid="id" :checkeds="checkeds_safras"></relatorios>
      </v-flex>
-->
    </v-layout>
  </v-container>
</template>

<script>
import Relatorios from './FazendaView/Relatorios'
import Safras from './FazendaView/Safras'
import Indicadores from './FazendaView/Indicadores'

export default {
  name: 'FazendaView',
  components: { Relatorios, Safras, Indicadores },
  data: () => ({
    nome_fazenda: '',
    sistema_producao: '',
    cidade: '',
    checkeds_safras: []
  }),
  props: {
    id: {
      default: '-1'
    }
  },
  methods: {
    onCheckedsChange (checkeds) {
      this.checkeds_safras = checkeds;
    }
  },
  mounted: function () {
    this.$backend.getFazenda(this.id, (fazendaObj) => {
      if(fazendaObj==null) {  this.$router.push('/'); return; }

      this.nome_fazenda = fazendaObj.NomeFazenda;
      this.sistema_producao = fazendaObj.SistemaProducao==1?'Irrigado':'Sequeiro';
      this.cidade = fazendaObj.Cidade;

    });
  }
}
</script>

<style scoped>

</style>
