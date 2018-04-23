<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <v-layout id="wrapper">
              <v-flex xs6>
                <h1>Safra 2017q3</h1>
                <b>FAZENDA LIGHT WHEAT</b>
                <b>TALHAO A21-3</b>
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="info" slot="activator" router to="/TalhaoView"><v-icon center dark>arrow_back</v-icon> VOLTAR ÀS INFORMAÇÕES DO TALHÃO</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs11 >
        <indicadores></indicadores>
      </v-flex>

      <v-flex xs11 >
        <estoquecapital></estoquecapital>
      </v-flex>

      <v-flex xs11 >
        <fluxocaixa></fluxocaixa>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Indicadores from './SafraView/Indicadores'
import EstoqueCapital from './SafraView/EstoqueCapital'
import FluxoCaixa from './SafraView/FluxoCaixa'

export default {
  //name: 'SafraView',
  components: { fluxocaixa: FluxoCaixa, estoquecapital: EstoqueCapital, Indicadores }
}
</script>

<style scoped>

</style>
