<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-card>
        <v-card-title class="headline">
          Fazer backup
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field box label="Diretorio de destino dos arquivos do backup"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn block color="info" large>Salvar backup</v-btn>
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
