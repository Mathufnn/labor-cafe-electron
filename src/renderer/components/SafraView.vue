<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <v-layout id="wrapper">
              <v-flex xs6>
                <h1>Safra 2017q3</h1>
                <b>FAZENDA LIGHT WHEAT</b><br />
                <b>TALHAO A21-3</b>
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="info" slot="activator" router to="/TalhaoView"><v-icon center dark>arrow_back</v-icon> VOLTAR ÀS INFORMAÇÕES DO TALHÃO</v-btn>
              </v-flex>
            </v-layout>
            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm4>
                  <b>IDENTIFICAÇÃO: </b> 2017q3
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁREA EM PRODUÇÃO: </b> 1454 ha
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PREÇO MÉDIO DA TERRA NUA: </b> R$ 15 / ha
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PRODUÇÃO TOTAL DA SAFRA: </b> 3943 Sc
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PREÇO DE VENDA: </b> R$ 15 / Sc
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>

</script>

<style scoped>

</style>
