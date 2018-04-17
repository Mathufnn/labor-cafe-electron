<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-card>
        <v-card-title class="headline">
          Cadastrar novo talhão
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <h2 class="subheading" >INFORMAÇÕES BÁSICAS</h2>
          <v-divider></v-divider>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field box label="Indentificação do talhão"></v-text-field>
              </v-flex>
              <v-flex xs12 sm3>
                <v-text-field box label="Produção Total"></v-text-field>
              </v-flex>
              <v-flex xs12 sm3>
                <v-text-field box label="Área"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              [...]
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn block color="info" large>SALVAR NOVO TALHÃO</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
