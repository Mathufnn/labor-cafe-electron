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
              <b>{{i.text}}</b><br /><span class="indicator">{{i.value}}</span>
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
        rendabruta: { text: 'RENDA BRUTA', status: 1, value: 1124.56 },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)', status: 3, value: 123.0 },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)', status: 4, value: 3124.56 },
        ct: { text: 'CUSTO TOTAL (CT)', status: 3, value: 'R$ ' + 21000 },
        pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 2, value: 500 },
        producao: { text: 'PRODUÇÃO', status: 1, value: 'R$ ' + 21000 },
        aplantada: { text: 'ÁREA PLANTADA', status: 1, value: 1254 + ' ha' },
        ppaplantada: { text: 'PRODUÇÃO PARA ÁREA PLANTADA', status: 1, value: 12  },
        coeap: { text: 'COE POR ÁREA PLANTADA', status: 4, value: 345  },
        coeu: { text: 'COE POR UNIDADE', status: 2, value: 234  },
        cotap: { text: 'COT POR ÁREA PLANTADA', status: 2, value: 532  },
        cotu: { text: 'COT POR UNIDADE', status: 4, value: 56.45  },
        ctap: { text: 'CT POR ÁREA PLANTADA', status: 3, value: 125.4  },
        ctu: { text: 'CT POR UNIDADE', status: 3, value: 432  },
        mb: { text: 'MARGEM BRUTA', status: 4, value: 45  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', status: 3, value: 152.21  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', status: 3, value: 255.61  },
        ml: { text: 'MARGEM LÍQUIDA', status: 3, value: 25.56  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', status: 2, value: 812.1  },
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE', status: 4, value: 124.13  },
        lucro: { text: 'LUCRO', status: 2, value: 975.13  },
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', status: 3, value: 64.1  },
        lucrou: { text: 'LUCRO POR UNIDADE', status: 4, value: 5172.1  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA', status: 2, value: 1245  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', status: 1, value: 12  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO', status: 1, value: 48  },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', status: 3, value: 8644.41  },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', status: 3, value: 2537  },
        taxagiro: { text: 'TAXA DE GIRO', status: 2, value: 1337  },
        lucrativ: { text: 'LUCRATIVIDADE', status: 4, value: 993  }
      }
    }
  },
  mounted: function() {
    this.$backend.getAllTalhoes(all_fazendas => {
      all_talhao.forEach(talhaoObj => {
        this.items.push({
          
        });
      });
    });
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
