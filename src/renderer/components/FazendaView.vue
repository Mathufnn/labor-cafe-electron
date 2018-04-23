<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <h1>Fazenda Light Wheat</h1>

            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm4>
                  <b>SISTEMA DE PRODUÇÃO: </b> Sequeiro
                </v-flex>
                <v-flex xs12 sm4>
                  <b>AGRONEGÓCIO: </b> Brasileiro
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CIDADE: </b> Viçosa, MG
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
import Talhoes from './FazendaView/Talhoes'
import Indicadores from './FazendaView/Indicadores'

export default {
  name: 'FazendaView',
  components: { Relatorios, Talhoes, Indicadores }
}
</script>

<style scoped>

</style>
