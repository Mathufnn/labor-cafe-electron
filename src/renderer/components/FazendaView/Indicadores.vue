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
              <b>{{i.text}}</b><br /><span class="indicator">{{formatN(i.value)}}</span> <span class="unidade"><b>{{i.unidade}}</b></span>
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
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  status: 3, value: 0, unidade: 'R$/Ano' },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',status: 3, value: 0, unidade: 'R$/Ano' },
        ct: { text: 'CUSTO TOTAL (CT)', status: 3, value: 0, unidade: 'R$/Ano'},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 3, value: 0, unidade: 'R$/Sc' },
        producao: { text: 'PRODUÇÃO',status: 3, value: 0, unidade: 'Sacas' },
        aplantada: { text: 'ÁREA PLANTADA', status: 3, value: 0, unidade: 'Ha' },
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'Und/Ha'  },
        coeap: { text: 'COE POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha' },
        coeu: { text: 'COE POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc'  },
        cotap: { text: 'COT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha' },
        cotu: { text: 'COT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc' },
        ctap: { text: 'CT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha' },
        ctu: { text: 'CT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc' },
        mb: { text: 'MARGEM BRUTA', status: 3, value: 0, unidade: 'R$/Ano'  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha'  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc' },
        ml: { text: 'MARGEM LÍQUIDA',status: 3, value: 0, unidade: 'R$/Ano'  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha'},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',status: 3, value: 0, unidade: 'R$/Sc'  },
        lucro: { text: 'LUCRO',status: 3, value: 0, unidade: 'R$/Ano'},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha'},
        lucrou: { text: 'LUCRO POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc'  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',status: 3, value: 0, unidade: '%'  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', status: 3, value: 0, unidade: '%'  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',status: 3, value: 0, unidade: 'R$' },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', status: 3, value: 0, unidade: 'R$/Sc' },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', status: 3, value: 0, unidade: 'R$/Sc'  },
        taxagiro: { text: 'TAXA DE GIRO', status: 3, value: 0, unidade: '%a.a' },
        lucrativ: { text: 'LUCRATIVIDADE', status: 3, value: 0, unidade: '%a.a' }
      }
    }
  },
  props: {
    fid: {
      default: '0'
    }
  },
  methods: {
    formatN(vr){
      return vr.toLocaleString('pt-BR');
    }
  },
  mounted: function() {
    var novo_rendabruta=0;
    var novo_coe = 0;
    var novo_cot = 0;
    var novo_ct = 0;
    var novo_pcv =0;
    var novo_producao = 0;
    var novo_aplantada = 0;
    var novo_ppaplantada = 0;
    var novo_coeap = 0;
    var novo_coeu =0;
    var novo_cotap =0;
    var novo_cotu =0;
    var novo_ctap = 0;
    var novo_ctu = 0;
    var novo_mb = 0;
    var novo_mbap = 0;
    var novo_mbu = 0;
    var novo_ml = 0;
    var novo_mlap = 0;
    var novo_mlu = 0;
    var novo_lucro = 0;
    var novo_lucroap = 0;
    var novo_lucrou =0;
    var novo_trcst = 0;
    var novo_trcct = 0;
    var novo_bencusto = 0;
    var novo_capitalest = 0;
    var novo_capitalct = 0;
    var novo_taxagiro = 0;
    var novo_lucrativ = 0;
  //  this.$backend.getFazenda(this.fid, (fazendaObj) => {
  this.$backend.getFazendaSafras(this.fid, all_safras => {
    if(all_safras!=null)
    all_safras.forEach(safraObj => {
      this.$backend.getSafraTalhao(safraObj.id, all_talhao => {
        if(all_talhao != null)
        Object.keys(all_talhao).forEach(function(key){
          //renda bruta
          novo_rendabruta += Math.floor(all_talhao[key].ProdTotal * all_talhao[key].PrecoVenda);

          // //coe
          novo_coe += Math.floor(all_talhao[key].ArrendamentoTerras + all_talhao[key].AluguelMaquinas + all_talhao[key].Combustivel + all_talhao[key].ManutencaoBenf + all_talhao[key].ManutencaoMaq + all_talhao[key].EnergiaEletrica + all_talhao[key].Frete + all_talhao[key].Impostos + all_talhao[key].MaoObraContratada + all_talhao[key].MaoObraFixa + all_talhao[key].Despesas + all_talhao[key].Assistencia + all_talhao[key].Certificacao + all_talhao[key].AnaliseSolo + all_talhao[key].AnaliseFoliar + all_talhao[key].EPi + all_talhao[key].Acidos + all_talhao[key].Adubos + all_talhao[key].Acaricida  + all_talhao[key].Bactericida + all_talhao[key].Espalhante + all_talhao[key].Fungicida + all_talhao[key].Inseticida + all_talhao[key].Nematicida + all_talhao[key].OleoMineral + all_talhao[key].Herbicida + all_talhao[key].Hormonios + all_talhao[key].Maturadores + all_talhao[key].MaterialColheita + all_talhao[key].Armazenamento + all_talhao[key].Beneficios + all_talhao[key].GasLenhaCarvao + all_talhao[key].PosColheita + all_talhao[key].Rebeneficio + all_talhao[key].Saco + all_talhao[key].Correntagem);
          console.log("novo_coe "+novo_coe);
          //cot
          novo_cot += Math.floor(novo_coe + all_talhao[key].MaoObraF) /* + CAPITALESTOQUE DEPRECIACAO */;

          //ct
          novo_ct += Math.floor(novo_cot) /* + CAPITALESTOQUE REMUNERACAO CAPITAL */;

          //pcv
          novo_pcv+= Math.floor(all_talhao[key].PrecoVenda);

          //producao
          novo_producao += Math.floor(all_talhao[key].ProdTotal);

          //aplantada
          novo_aplantada += Math.floor(all_talhao[key].Area);

          //ppaplantada
          novo_ppaplantada += Math.floor(novo_producao / novo_aplantada);

          //coeap
          novo_coeap += Math.floor(novo_coe / novo_aplantada);

          //coeu
          novo_coeu +=Math.floor( novo_coe / novo_producao);

          //cotap
          novo_cotap += Math.floor(novo_cot / novo_aplantada);

          //cotu
          novo_cotu += Math.floor(novo_cot / novo_producao);

          //ctap
          novo_ctap += Math.floor(novo_ct / novo_aplantada);

          //ctu
          novo_ctu += Math.floor(novo_ct / novo_producao);

          //mb
          novo_mb = Math.floor(novo_rendabruta - novo_coe);

          //mbap
          novo_mbap = Math.floor(novo_mb / novo_aplantada);


          novo_mbu = Math.floor(novo_mb/ novo_producao);

          novo_ml  = Math.floor(novo_rendabruta - novo_cot);

          novo_mlap  = Math.floor(novo_ml / novo_aplantada);

          novo_mlu  =Math.floor( novo_ml/ novo_producao);

          novo_lucro  = Math.floor(novo_rendabruta - novo_ct);

          novo_lucroap  = Math.floor(novo_lucro / novo_aplantada);

          novo_lucrou  = Math.floor(novo_lucro / novo_producao);

          novo_trcst  +=Math.floor( novo_ml); /* / ESTOQC EM LAVOURAS +   BENFEITORIAS */ ;

          novo_trcct  +=Math.floor( novo_ml); /* / ESTOQC EM LAVOURAS +   BENFEITORIAS  +  estoque capital em terra */;

          novo_bencusto  = Math.floor(novo_rendabruta  / novo_ct );

          novo_capitalest  =  /* ESTOQC EM LAVOURAS +   BENFEITORIAS  / */  Math.floor(novo_producao );

          novo_capitalct  =   /* ESTOQC EM LAVOURAS +   BENFEITORIAS + estoque de capital em terra / */ Math.floor(novo_producao );

          novo_taxagiro  = Math.floor((novo_rendabruta  / novo_producao ) / novo_capitalct );

          novo_lucrativ  = Math.floor(novo_mlu  / novo_capitalct);
        }),
        this.indicadores.rendabruta.value  = novo_rendabruta;
        this.indicadores.coe.value = novo_coe;
        this.indicadores.cot.value = novo_cot;
        this.indicadores.ct.value = novo_ct;
        this.indicadores.pcv.value = novo_pcv;
        this.indicadores.producao.value = novo_producao;
        this.indicadores.aplantada.value = novo_aplantada;
        this.indicadores.ppaplantada.value = novo_ppaplantada;
        this.indicadores.coeap.value = novo_coeap;
        this.indicadores.coeu.value = novo_coeu;
        this.indicadores.cotap.value = novo_cotap;
        this.indicadores.cotu.value = novo_cotu;
        this.indicadores.ctap.value = novo_ctap;
        this.indicadores.ctu.value = novo_ctu;
        this.indicadores.mb.value = novo_mb;
        this.indicadores.mbap.value = novo_mbap;
        this.indicadores.mbu.value = novo_mbu;
        this.indicadores.ml.value = novo_ml;
        this.indicadores.mlap.value = novo_mlap;
        this.indicadores.mlu.value = novo_mlu;
        this.indicadores.lucro.value = novo_lucro;
        this.indicadores.lucroap.value = novo_lucroap;
        this.indicadores.lucrou.value = novo_lucrou;
        this.indicadores.trcst.value = novo_trcst;
        this.indicadores.trcct.value = novo_trcct;
        this.indicadores.bencusto.value = novo_bencusto;
        this.indicadores.capitalest.value = novo_capitalest;
        this.indicadores.capitalct.value = novo_capitalct;
        this.indicadores.taxagiro.value = novo_taxagiro;
        this.indicadores.lucrativ.value = novo_lucrativ;
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

.unidade {
  font-size:15px;
  color:#B5B5B5;
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
