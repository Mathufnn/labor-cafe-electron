<template>
  <v-card>
    <v-card-title class="headline">
      Atributos da safra
    </v-card-title>
    <v-divider></v-divider>
    <v-layout>
      <v-container row wrap justify-space-around>
        <v-layout row wrap class="text-xs-center">

          <v-flex xs4 v-for="i in indicadores">
            <v-card :class="'status' + i.status">
              <b>{{i.text}}</b><br /><span class="indicator">{{i.value}}</span>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
</script>

<style scoped>
  .indicator {
    font-size:41px;
  }

  .status1 {
    background-color: #00b0ff;
  }

  .status2 {
    background-color: #00b0ff;
  }

  .status3 {
    background-color: #00b0ff;
  }

  .status4 {
    background-color: #00b0ff;
  }
</style>
