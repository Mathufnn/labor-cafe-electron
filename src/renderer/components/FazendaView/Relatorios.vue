<template>
  <v-card>
    <v-card-title class="headline">
      Relatórios
      <v-tooltip right>
          <v-btn small color="primary" slot="activator" v-on:click="preview" ><v-icon center dark>description</v-icon>  GERAR RELATÓRIO</v-btn>
          <span>Gerar Relatório PDF</span>
      </v-tooltip>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap class="pa-3">
      <v-flex>
        O relatório é gerado em pdf na pasta especificada. Tal relatório contém todas as informações de indicadores da fazenda em questão.
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { BrowserWindow, remote } from 'electron'

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
      default: '-1'
    }
  },
  methods: {
    preview: function() {
      remote.dialog.showSaveDialog({title: 'Selecione local para salvar o PDF',defaultPath: 'Relatorio.pdf'}, (filename) => {

        var pdf = require('pdfkit');
        var fs = require('fs');

        var myDoc = new pdf;

        var i = {
          rendabruta: { text: 'RENDA BRUTA', status: 3, value: this.indicadores.rendabruta.value, unidade: 'R$/Ano' },
          coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  status: 3, value: this.indicadores.coe.value, unidade: 'R$/Ano' },
          cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',status: 3, value: this.indicadores.cot.value, unidade: 'R$/Ano' },
          ct: { text: 'CUSTO TOTAL (CT)', status: 3, value: this.indicadores.ct.value, unidade: 'R$/Ano'},
          pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 3, value: this.indicadores.pcv.value, unidade: 'R$/Sc' },
          producao: { text: 'PRODUÇÃO',status: 3, value: this.indicadores.producao.value, unidade: 'Sacas' },
          aplantada: { text: 'ÁREA PLANTADA', status: 3, value: this.indicadores.aplantada.value, unidade: 'Ha' },
          ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', status: 3, value: this.indicadores.ppaplantada.value, unidade: 'Und/Ha'  },
          coeap: { text: 'COE POR ÁREA PLANTADA', status: 3, value: this.indicadores.coeap.value, unidade: 'R$/Ha' },
          coeu: { text: 'COE POR UNIDADE', status: 3, value: this.indicadores.coeu.value, unidade: 'R$/Sc'  },
          cotap: { text: 'COT POR ÁREA PLANTADA', status: 3, value: this.indicadores.cotap.value, unidade: 'R$/Ha' },
          cotu: { text: 'COT POR UNIDADE', status: 3, value: this.indicadores.cotu.value, unidade: 'R$/Sc' },
          ctap: { text: 'CT POR ÁREA PLANTADA', status: 3, value: this.indicadores.ctap.value, unidade: 'R$/Ha' },
          ctu: { text: 'CT POR UNIDADE', status: 3, value: this.indicadores.ctu.value, unidade: 'R$/Sc' },
          mb: { text: 'MARGEM BRUTA', status: 3, value: this.indicadores.mb.value, unidade: 'R$/Ano'  },
          mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha'  },
          mbu: { text: 'MARGEM BRUTA POR UNIDADE', status: 3, value: this.indicadores.mbu.value, unidade: 'R$/Sc' },
          ml: { text: 'MARGEM LÍQUIDA',status: 3, value: this.indicadores.ml.value, unidade: 'R$/Ano'  },
          mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', status: 3, value: this.indicadores.mlap.value, unidade: 'R$/Ha'},
          mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',status: 3, value: this.indicadores.mlu.value, unidade: 'R$/Sc'  },
          lucro: { text: 'LUCRO',status: 3, value: this.indicadores.lucro.value, unidade: 'R$/Ano'},
          lucroap: { text: 'LUCRO POR ÁREA PLANTADA', status: 3, value: this.indicadores.lucroap.value, unidade: 'R$/Ha'},
          lucrou: { text: 'LUCRO POR UNIDADE', status: 3, value: this.indicadores.lucrou.value, unidade: 'R$/Sc'  },
          trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',status: 3, value: this.indicadores.trcst.value, unidade: '%'  },
          trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', status: 3, value: this.indicadores.trcct.value, unidade: '%'  },
          bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',status: 3, value: this.indicadores.bencusto.value, unidade: 'R$' },
          capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', status: 3, value: this.indicadores.capitalest.value, unidade: 'R$/Sc' },
          capitalct: { text: 'CAPITAL EMPATADO COM TERRA', status: 3, value: this.indicadores.capitalct.value, unidade: 'R$/Sc'  },
          taxagiro: { text: 'TAXA DE GIRO', status: 3, value: this.indicadores.taxagiro.value, unidade: '%a.a' },
          lucrativ: { text: 'LUCRATIVIDADE', status: 3, value: this.indicadores.lucrativ.value, unidade: '%a.a' }
        }

        myDoc.pipe(fs.createWriteStream(filename+".pdf"));
        this.errorCatch();

        let linha=160;
        let linhaOpacity=160;

        //posicao(coluna, linha)

        this.$backend.getFazenda(this.fid, (fazendaObj) => {
          if(fazendaObj==null) console.log("Fazenda não encontrada!");

          myDoc.font('Times-Roman')
               .fontSize(20)
          myDoc.text("Relatório dos indicadores de Fazenda", 100, 100)
               .text(fazendaObj.NomeFazenda)
               .fontSize(12);
          myDoc.moveTo(80,150)
               .lineTo(560,150)
               .stroke()
               .text("Valor/unidade", 460, 140);

          Object.keys(i).forEach(function(key) {

            if(linhaOpacity <= 580){
              myDoc.rect(80, linhaOpacity-4, 480, 16)
                  .fillOpacity(0.8)
                  .fillAndStroke("grey");
            }

            myDoc.fillAndStroke("black")
            myDoc.text(i[key].text + ": ", 100, linha)
                 .text(i[key].value + " " + i[key].unidade, 460, linha)

            linha+=15;
            linhaOpacity+=30;

            //console.log(i[key].text, i[key].value);

          });

          myDoc.end();
          //console.log(this.indicadores.rendabruta.value);
          //this.load = !this.load;

        });

      })

    },
    errorCatch: function(){
      window.addEventListener("error", handleError, true);

      function handleError(evt) {
        if (evt.message) { // Chrome sometimes provides this
          remote.dialog.showErrorBox('Ocorreu um error ao gerar o PDF.', 'Tente novamente.');
        }
      }
    },
  },
  mounted: function() {
    var novo_rendabruta= this.indicadores.rendabruta.value;
    var antigo_rendabruta =-1;
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
    //console.log(novo_rendabruta,novo_coe,novo_cot,novo_ct,novo_pcv,novo_producao,novo_aplantada,novo_ppaplantada,novo_coeap,novo_coeu,novo_cotap,novo_cotu,novo_ctap,novo_ctu,novo_mb,novo_mbap,novo_mbu,novo_ml,novo_mlap,novo_mlu,novo_lucro,novo_lucroap,novo_lucrou,novo_trcst,novo_trcct,novo_bencusto,novo_capitalct,novo_capitalest,novo_taxagiro,novo_lucrativ);

    this.$backend.getFazendaSafras(this.fid, all_safras => {
      if(all_safras!=null)
      all_safras.forEach(safraObj => {
        this.$backend.getSafraTalhao(safraObj.id, all_talhao => {
          if(all_talhao != null)
          Object.keys(all_talhao).forEach(function(key){
            //renda bruta
            //antigo_rendabruta = novo_rendabruta;
            novo_rendabruta += Math.floor(all_talhao[key].ProdTotal * all_talhao[key].PrecoVenda);

            // //coe
            novo_coe += Math.floor(all_talhao[key].ArrendamentoTerras + all_talhao[key].AluguelMaquinas + all_talhao[key].Combustivel + all_talhao[key].ManutencaoBenf + all_talhao[key].ManutencaoMaq + all_talhao[key].EnergiaEletrica + all_talhao[key].Frete + all_talhao[key].Impostos + all_talhao[key].MaoObraContratada + all_talhao[key].MaoObraFixa + all_talhao[key].Despesas + all_talhao[key].Assistencia + all_talhao[key].Certificacao + all_talhao[key].AnaliseSolo + all_talhao[key].AnaliseFoliar + all_talhao[key].EPi + all_talhao[key].Acidos + all_talhao[key].Adubos + all_talhao[key].Acaricida  + all_talhao[key].Bactericida + all_talhao[key].Espalhante + all_talhao[key].Fungicida + all_talhao[key].Inseticida + all_talhao[key].Nematicida + all_talhao[key].OleoMineral + all_talhao[key].Herbicida + all_talhao[key].Hormonios + all_talhao[key].Maturadores + all_talhao[key].MaterialColheita + all_talhao[key].Armazenamento + all_talhao[key].Beneficios + all_talhao[key].GasLenhaCarvao + all_talhao[key].PosColheita + all_talhao[key].Rebeneficio + all_talhao[key].Saco + all_talhao[key].Correntagem);

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
            novo_ppaplantada = Math.floor(novo_producao / novo_aplantada);

            //coeap
            novo_coeap = Math.floor(novo_coe / novo_aplantada);

            //coeu
            novo_coeu = Math.floor(novo_coe / novo_producao);

            //cotap
            novo_cotap = Math.floor(novo_cot / novo_aplantada);

            //cotu
            novo_cotu = Math.floor(novo_cot / novo_producao);

            //ctap
            novo_ctap = Math.floor(novo_ct / novo_aplantada);

            //ctu
            novo_ctu = Math.floor(novo_ct / novo_producao);

            //mb
            //if(antigo_rendabruta != Math.floor(novo_rendabruta){
              novo_mb = Math.floor(novo_rendabruta - novo_coe);
            //}

            //mbap)
            novo_mbap = Math.floor(novo_mb / novo_aplantada);


            novo_mbu = Math.floor(novo_mb/ novo_producao);

            novo_ml  = Math.floor(novo_rendabruta - novo_cot);

            novo_mlap  = Math.floor(novo_ml / novo_aplantada);

            novo_mlu  = Math.floor(novo_ml/ novo_producao);

            novo_lucro  = Math.floor(novo_rendabruta - novo_ct);

            novo_lucroap  = Math.floor(novo_lucro / novo_aplantada);

            novo_lucrou  = Math.floor(novo_lucro / novo_producao);

            novo_trcst  = Math.floor(novo_ml); /* / ESTOQC EM LAVOURAS +   BENFEITORIAS */ ;

            novo_trcct  = Math.floor(novo_ml); /* / ESTOQC EM LAVOURAS +   BENFEITORIAS  +  estoque capital em terra */;

            novo_bencusto  = Math.floor(novo_rendabruta  / novo_ct) ;

            novo_capitalest  = Math.floor( /* ESTOQC EM LAVOURAS +   BENFEITORIAS  / */  novo_producao);

            novo_capitalct  = Math.floor(  /* ESTOQC EM LAVOURAS +   BENFEITORIAS + estoque de capital em terra / */ novo_producao);

            novo_taxagiro  = Math.floor((novo_rendabruta  / novo_producao ) / novo_capitalct) ;

            novo_lucrativ  = Math.floor(novo_mlu  / novo_capitalct);
          });
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

</style>
