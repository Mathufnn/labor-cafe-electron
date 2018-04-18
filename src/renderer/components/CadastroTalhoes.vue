<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs11 class="mt-4">
      <v-card>
        <v-card-title class="headline">
          Cadastrar nova fazenda
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <h2 class="subheading mb-5 grey--text lighten-2" >texto informativo.......</h2>
          <v-divider></v-divider>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field box label="Nome da fazenda" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 mt-4>
                <v-select
                :items="production_sys_l"

                label="Sistema de Produção"
                box
                ></v-select>

              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field box label="Agronegócio"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Cidade" ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn block color="info" large router to="/FazendaView">SALVAR NOVA FAZENDA</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    production_sys_l: ["Irrigado", "Sequeiro", "Semi-irrigado"]
  }),
  methods: {

  }
}
</script>

<style scoped>
.centered
{
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo
{
  max-width: 100%;
}

.link-btn
{
  width: 150px;
}
</style>
