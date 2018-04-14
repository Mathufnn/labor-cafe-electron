<template>
  <v-container grid-list-xl fill-height >
  <v-layout row wrap justify-space-around id="wrapper">
    <v-flex xs11>
      <v-card>
        <v-card-text>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Donec nec turpis quis enim sodales elementum lobortis id urna. Maecenas porta vehicula ligula eget sollicitudin. Nulla accumsan nunc eget tortor blandit fermentum. Sed id elementum velit</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis dui mollis, ultrices lectus tristique, finibus tellus</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary flat router to="/ListaFazendas">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs11 fill-height>
      <relatorios></relatorios>
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
import Relatorios from './FazendaView/Relatorios'

export default {
  name: 'FazendaView',
  components: { Relatorios }
}
</script>

<style scoped>

</style>
