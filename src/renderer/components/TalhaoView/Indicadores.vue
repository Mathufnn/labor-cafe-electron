<template>
  <v-card>
    <v-card-title class="headline">
      Indicadores do talhão
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
    tid: {
      default: '-1'
    }
  },
  mounted: function() {
    this.$backend.getTalhao(this.tid, (talhaoObj) => {
      this.$backend.getSafra(talhaoObj.SafraID, (safraObj) => {
        //renda bruta
        this.indicadores.rendabruta.value = talhaoObj.ProdTotal * safraObj.PrecoVenda;
        //coe
        this.indicadores.coe.value = talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo + talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;

        //cot
        this.indicadores.cot.value = this.indicadores.coe.value + talhaoObj.MaoObraF /* + CAPITALESTOQUE DEPRECIACAO */;

        //ct
        this.indicadores.ct.value = this.indicadores.cot.value /* + CAPITALESTOQUE REMUNERACAO CAPITAL */;

        //pcv
        this.indicadores.pcv.value = safraObj.PrecoVenda;

        //producao
        this.indicadores.producao.value = talhaoObj.ProdTotal;

        //aplantada
        this.indicadores.aplantada.value = safraObj.AreaProducao;

        //ppaplantada
        this.indicadores.ppaplantada.value = this.indicadores.producao.value / this.indicadores.aplantada.value;

        //coeap
        this.indicadores.coeap.value = this.indicadores.coe.value / this.indicadores.aplantada.value;

        //coeu
        this.indicadores.coeu.value = this.indicadores.coe.value / this.indicadores.producao.value;

        //cotap
        this.indicadores.cotap.value = this.indicadores.cot.value / this.indicadores.aplantada.value;

        //cotu
        this.indicadores.cotu.value = this.indicadores.cot.value / this.indicadores.producao.value;

        //ctap
        this.indicadores.ctap.value = this.indicadores.ct.value / this.indicadores.aplantada.value;

        //ctu
        this.indicadores.ctu.value = this.indicadores.ct.value / this.indicadores.producao.value;

        //mb
        this.indicadores.mb.value = this.indicadores.rendabruta.value - this.indicadores.coe.value;

        //mbap
        this.indicadores.mbap.value = this.indicadores.mb.value / this.indicadores.aplantada.value;


        this.indicadores.mbu.value = this.indicadores.mb.value / this.indicadores.producao.value;

        this.indicadores.ml.value = this.indicadores.rendabruta.value - this.indicadores.cot.value;

        this.indicadores.mlap.value = this.indicadores.ml.value / this.indicadores.aplantada.value;

        this.indicadores.mlu.value = this.indicadores.ml.value / this.indicadores.producao.value;

        this.indicadores.lucro.value = this.indicadores.rendabruta.value - this.indicadores.ct.value;

        this.indicadores.lucroap.value = this.indicadores.lucro.value / this.indicadores.aplantada.value;

        this.indicadores.lucrou.value = this.indicadores.lucro.value / this.indicadores.producao.value;

        this.indicadores.trcst.value = this.indicadores.ml.value /* / ESTOQC EM LAVOURAS +   BENFEITORIAS */ ;

        this.indicadores.trcct.value = this.indicadores.ml.value /* / ESTOQC EM LAVOURAS +   BENFEITORIAS  +  estoque capital em terra */;

        this.indicadores.vbencusto.value = this.indicadores.rendabruta.value / this.indicadores.ct.value;

        this.indicadores.capitalest.value =  /* ESTOQC EM LAVOURAS +   BENFEITORIAS  / */  this.indicadores.producao.value;

        this.indicadores.capitalct.value =   /* ESTOQC EM LAVOURAS +   BENFEITORIAS + estoque de capital em terra / */ this.indicadores.producao.value

        this.indicadores.taxagiro.value = (this.indicadores.rendabruta.value / this.indicadores.producao.value) / this.indicadores.capitalct.value;

        this.indicadores.lucrativ.value = this.indicadores.mlu.value / this.indicadores.capitalct.value;

      });
    });
//
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
