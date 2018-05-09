<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <h1>Fazenda {{nome_fazenda}}</h1>

            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm4>
                  <b>SISTEMA DE PRODUÇÃO: </b> {{sistema_producao}}
                </v-flex>
                <v-flex xs12 sm4>
                  <b>AGRONEGÓCIO: </b> {{agronegocio}}
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CIDADE: </b> {{cidade}}
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
        <safras :fid="id"></safras>
      </v-flex>

      <v-flex xs11>
        <indicadores></indicadores>
      </v-flex>

      <v-flex xs11>
        <relatorios></relatorios>
      </v-flex>

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
    agronegocio: '',
    cidade: ''
  }),
  props: {
    id: {
      default: '-1'
    }
  },
  mounted: function () {
    this.$backend.getFazenda(this.id, (fazendaObj) => {
      if(fazendaObj==null) {  this.$router.push('/'); return; }

      this.nome_fazenda = fazendaObj.NomeFazenda;
      this.sistema_producao = fazendaObj.SistemaProducao;
      this.agronegocio = fazendaObj.Agronegocio;
      this.cidade = fazendaObj.Cidade;

    });
  }
}
</script>

<style scoped>

</style>
