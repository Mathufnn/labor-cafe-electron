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
              <v-flex xs12 sm6>
                <v-text-field box label="Venda de subproduto" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Mão de obra familiar" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Arrendamento da terra" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Aluguel de máquinas" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Combustível" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Manutenção de benfeitorias" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Manutenção de máquinas" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Energia elétrica" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Frete/Deslocamento" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Impostos e taxas" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Mão de obra contratada" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Mão de obra fixa" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Despesas gerais de escritório" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Assistência técnica e gerencial" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Certificação" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Análise de solo" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Análise foliar" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="EPI" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Ácidos/aminoácidos" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Adubos foliares" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Acaricida" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Bactericida" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Espalhante adesivo" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Fungicida" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Nematicida" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Óleo mineral" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Herbicida" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Hormônios" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Maturadores" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Material de colheita" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Armazenamento" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Benefício" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Gás/lenha/carvão" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Materiais pós-colheita" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Rebenefício" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Embalagens" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Corretagem" ></v-text-field>
              </v-flex>
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
