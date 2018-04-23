<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <v-layout id="wrapper">
              <v-flex xs6>
                <h1>Talhão A21-3</h1>
                <b>FAZENDA LIGHT WHEAT</b>
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="info" slot="activator" router to="/FazendaView"><v-icon center dark>arrow_back</v-icon> VOLTAR ÀS INFORMAÇÕES DA FAZENDA</v-btn>
              </v-flex>
            </v-layout>
            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm4>
                  <b>IDENTIFICAÇÃO: </b> A21-3
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PRODUÇÃO TOTAL: </b> 
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁREA: </b> Viçosa, MG
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
        <safras></safras>
      </v-flex>

      <v-flex xs11 >
        <indicadores></indicadores>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>
import Safras from './TalhaoView/Safras'
import Indicadores from './TalhaoView/Indicadores'

export default {
  name: 'TalhaoView',
  components: { Safras, Indicadores }
}
</script>

<style scoped>

</style>
