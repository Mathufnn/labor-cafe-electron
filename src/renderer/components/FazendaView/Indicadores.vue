<template>
  <v-card>
    <v-card-title class="headline">
      Indicadores da fazenda
    </v-card-title>
    <v-divider></v-divider>
    <v-layout>
      <v-container row wrap justify-space-around>
        <v-layout row wrap class="text-xs-center">
          <v-flex xs4 v-for="i in indicadores" v-bind:key="i.text">
            <v-card :class="'status' + i.status">
              <b>{{i.text}}</b><br /><span class="indicator">{{i.value}} <span class="caption">{{i.unidade}}</span></span>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', status: 3, value: 0, unidade: 'R$/Ano' },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  status: 3, value: 0 },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',status: 3, value: 0 },
        ct: { text: 'CUSTO TOTAL (CT)', status: 3, value: 0},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 3, value: 0 },
        producao: { text: 'PRODUÇÃO',status: 3, value: 0 },
        aplantada: { text: 'ÁREA PLANTADA', status: 3, value: 0 },
        ppaplantada: { text: 'PRODUÇÃO PARA ÁREA PLANTADA', status: 3, value: 0  },
        coeap: { text: 'COE POR ÁREA PLANTADA', status: 3, value: 0 },
        coeu: { text: 'COE POR UNIDADE', status: 3, value: 0  },
        cotap: { text: 'COT POR ÁREA PLANTADA', status: 3, value: 0 },
        cotu: { text: 'COT POR UNIDADE', status: 3, value: 0 },
        ctap: { text: 'CT POR ÁREA PLANTADA', status: 3, value: 0 },
        ctu: { text: 'CT POR UNIDADE', status: 3, value: 0 },
        mb: { text: 'MARGEM BRUTA', status: 3, value: 0  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', status: 3, value: 0  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', status: 3, value: 0 },
        ml: { text: 'MARGEM LÍQUIDA',status: 3, value: 0  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', status: 3, value: 0},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',status: 3, value: 0  },
        lucro: { text: 'LUCRO',status: 3, value: 0},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', status: 3, value: 0},
        lucrou: { text: 'LUCRO POR UNIDADE', status: 3, value: 0  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',status: 3, value: 0  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', status: 3, value: 0  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',status: 3, value: 0 },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', status: 3, value: 0 },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', status: 3, value: 0  },
        taxagiro: { text: 'TAXA DE GIRO', status: 3, value: 0 },
        lucrativ: { text: 'LUCRATIVIDADE', status: 3, value: 0 }
      }
    }
  },
  props: {
    fid: {
      default: '-1'
    }
  },
  mounted: function() {
  //  this.$backend.getFazenda(this.fid, (fazendaObj) => {
      this.$backend.getFazendaSafras(this.fid, all_safras => {
        if(all_safras!=null)
        all_safras.forEach(safraObj => {
          this.$backend.getSafraTalhao(safraObj.id, all_talhao => {
            if(all_talhao != null)
            all_talhao.forEach(talhaoObj => {
              this.indicadores.rendabruta.value += talhaoObj.ProdTotal * safraObj.PrecoVenda;

            });
          });
        });
      });
  //  });
  }
}
</script>

<style scoped>
.indicator {
  font-size:41px;
}

.status1 {
  background-color: #F08080;
}

.status2 {
  background-color: #FFEC8B;
}

.status3 {

}

.status4 {
  background-color: #98FB98;
}
</style>
