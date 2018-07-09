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
    let estoqueCapitalObj = require('../../../../estoquecapital.json');

    var novo_rendabruta= this.indicadores.rendabruta.value;
    var novo_coe = this.indicadores.coe.value;
    var novo_cot = this.indicadores.cot.value;
    var novo_ct = this.indicadores.ct.value;
    var novo_pcv =this.indicadores.pcv.value;
    var novo_producao = this.indicadores.producao.value;
    var novo_aplantada = this.indicadores.aplantada.value;
    var novo_ppaplantada = this.indicadores.ppaplantada.value;
    var novo_coeap = this.indicadores.coeap.value;
    var novo_coeu =this.indicadores.coeu.value;
    var novo_cotap =this.indicadores.cotap.value;
    var novo_cotu =this.indicadores.cotu.value;
    var novo_ctap = this.indicadores.ctap.value;
    var novo_ctu = this.indicadores.ctu.value;
    var novo_mb = this.indicadores.mb.value;
    var novo_mbap = this.indicadores.mbap.value;
    var novo_mbu = this.indicadores.mbu.value;
    var novo_ml = this.indicadores.ml.value;
    var novo_mlap = this.indicadores.mlap.value;
    var novo_mlu = this.indicadores.mlu.value;
    var novo_lucro = this.indicadores.lucro.value;
    var novo_lucroap = this.indicadores.lucroap.value;
    var novo_lucrou =this.indicadores.lucrou.value;
    var novo_trcst = this.indicadores.trcst.value;
    var novo_trcct = this.indicadores.trcct.value;
    var novo_bencusto = this.indicadores.bencusto.value;
    var novo_capitalest = this.indicadores.capitalest.value;
    var novo_capitalct = this.indicadores.capitalct.value;
    var novo_taxagiro = this.indicadores.taxagiro.value;
    var novo_lucrativ = this.indicadores.lucrativ.value;
    console.log(novo_rendabruta,novo_coe,novo_cot,novo_ct,novo_pcv,novo_producao,novo_aplantada,novo_ppaplantada,novo_coeap,novo_coeu,novo_cotap,novo_cotu,novo_ctap,novo_ctu,novo_mb,novo_mbap,novo_mbu,novo_ml,novo_mlap,novo_mlu,novo_lucro,novo_lucroap,novo_lucrou,novo_trcst,novo_trcct,novo_bencusto,novo_capitalct,novo_capitalest,novo_taxagiro,novo_lucrativ);

    this.$backend.getFazendaSafras(this.fid, all_safras => {
      if(all_safras!=null)
      all_safras.forEach(safraObj => {
        this.$backend.getSafraTalhao(safraObj.id, all_talhao => {
          if(all_talhao != null)
          Object.keys(all_talhao).forEach(function(key){
            console.log(all_talhao[key].id);
            //renda bruta
            console.log("antes renda "+novo_rendabruta);
            console.log("preco venda" + all_talhao[key].PrecoVenda);
            console.log("prod total "+all_talhao[key].ProdTotal);
            //antigo_rendabruta = novo_rendabruta;
            novo_rendabruta += Math.floor(all_talhao[key].ProdTotal * all_talhao[key].PrecoVenda);
            console.log("dps renda " + novo_rendabruta);

            // //coe
            console.log("antes coe" + novo_coe)
            novo_coe += Math.floor(all_talhao[key].ArrendamentoTerras + all_talhao[key].AluguelMaquinas + all_talhao[key].Combustivel + all_talhao[key].ManutencaoBenf + all_talhao[key].ManutencaoMaq + all_talhao[key].EnergiaEletrica + all_talhao[key].Frete + all_talhao[key].Impostos + all_talhao[key].MaoObraContratada + all_talhao[key].MaoObraFixa + all_talhao[key].Despesas + all_talhao[key].Assistencia + all_talhao[key].Certificacao + all_talhao[key].AnaliseSolo + all_talhao[key].AnaliseFoliar + all_talhao[key].EPi + all_talhao[key].Acidos + all_talhao[key].Adubos + all_talhao[key].Acaricida  + all_talhao[key].Bactericida + all_talhao[key].Espalhante + all_talhao[key].Fungicida + all_talhao[key].Inseticida + all_talhao[key].Nematicida + all_talhao[key].OleoMineral + all_talhao[key].Herbicida + all_talhao[key].Hormonios + all_talhao[key].Maturadores + all_talhao[key].MaterialColheita + all_talhao[key].Armazenamento + all_talhao[key].Beneficios + all_talhao[key].GasLenhaCarvao + all_talhao[key].PosColheita + all_talhao[key].Rebeneficio + all_talhao[key].Saco + all_talhao[key].Correntagem);
            console.log("dps coe" + novo_coe)

            //cot
            console.log("antes cot "+novo_cot)
            novo_cot += Math.floor(novo_coe + all_talhao[key].MaoObraF) /* + CAPITALESTOQUE DEPRECIACAO */;
            console.log("dps cot" + novo_cot)

            //ct
            console.log("antes cot "+novo_ct)
            novo_ct += Math.floor(novo_cot) /* + CAPITALESTOQUE REMUNERACAO CAPITAL */;
            console.log("dps ct "+novo_ct)

            //pcv
            console.log("antes cot "+novo_pcv)
            novo_pcv+= Math.floor(all_talhao[key].PrecoVenda);
            console.log("dps pcv "+novo_pcv)

            //producao
            console.log("antes producao "+novo_producao)
            novo_producao += Math.floor(all_talhao[key].ProdTotal);
            console.log("dps producao "+novo_producao)

            //aplantada
            console.log("antes area "+novo_aplantada)
            novo_aplantada += Math.floor(all_talhao[key].Area);
            console.log("dps area "+novo_aplantada)

            //ppaplantada
            novo_ppaplantada = novo_producao / novo_aplantada;

            //coeap
            novo_coeap = novo_coe / novo_aplantada;

            //coeu
            novo_coeu = novo_coe / novo_producao;

            //cotap
            novo_cotap = novo_cot / novo_aplantada;

            //cotu
            novo_cotu = novo_cot / novo_producao;

            //ctap
            novo_ctap = novo_ct / novo_aplantada;

            //ctu
            novo_ctu = novo_ct / novo_producao;

            //mb
            //if(antigo_rendabruta != novo_rendabruta){
              novo_mb = novo_rendabruta - novo_coe;
            //}

            //mbap
            novo_mbap = novo_mb / novo_aplantada;


            novo_mbu = novo_mb/ novo_producao;

            novo_ml  = novo_rendabruta - novo_cot;

            novo_mlap  = novo_ml / novo_aplantada;

            novo_mlu  = novo_ml/ novo_producao;

            novo_lucro  = novo_rendabruta - novo_ct;

            novo_lucroap  = novo_lucro / novo_aplantada;

            novo_lucrou  = novo_lucro / novo_producao;

            novo_trcst  = novo_ml; /* / ESTOQC EM LAVOURAS +   BENFEITORIAS */ ;

            novo_trcct  = novo_ml; /* / ESTOQC EM LAVOURAS +   BENFEITORIAS  +  estoque capital em terra */;

            novo_bencusto  = novo_rendabruta  / novo_ct ;

            novo_capitalest  =  /* ESTOQC EM LAVOURAS +   BENFEITORIAS  / */  novo_producao;

            novo_capitalct  =   /* ESTOQC EM LAVOURAS +   BENFEITORIAS + estoque de capital em terra / */ novo_producao;

            novo_taxagiro  = (novo_rendabruta  / novo_producao ) / novo_capitalct ;

            novo_lucrativ  = novo_mlu  / novo_capitalct;
          });
          console.log("novo_rendabruta "+novo_rendabruta);
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
