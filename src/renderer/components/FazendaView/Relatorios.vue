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
        lorem ipsum
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
          alert("Ocorreu um erro durante a geração do PDF.")
        }
      }
    },
  },
  mounted: function() {
  //  this.$backend.getFazenda(this.fid, (fazendaObj) => {
      this.$backend.getFazendaSafras(this.fid, all_safras => {
        if(all_safras!=null)
        all_safras.forEach(safraObj => {
          this.$backend.getSafraTalhao(safraObj.id, all_talhao => {
            if(all_talhao != null)
            all_talhao.forEach(talhaoObj => {
              //renda bruta
              this.indicadores.rendabruta.value += Math.floor(talhaoObj.ProdTotal * talhaoObj.PrecoVenda);
              //coe
              this.indicadores.coe.value += Math.floor(talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo + talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem);

              //cot
              this.indicadores.cot.value += Math.floor(this.indicadores.coe.value + talhaoObj.MaoObraF) /* + CAPITALESTOQUE DEPRECIACAO */;

              //ct
              this.indicadores.ct.value += Math.floor(this.indicadores.cot.value) /* + CAPITALESTOQUE REMUNERACAO CAPITAL */;

              //pcv
              this.indicadores.pcv.value += Math.floor(talhaoObj.PrecoVenda);

              //producao
              this.indicadores.producao.value += Math.floor(talhaoObj.ProdTotal);

              //aplantada
              this.indicadores.aplantada.value += Math.floor(talhaoObj.Area);

              //ppaplantada
              this.indicadores.ppaplantada.value += Math.floor(this.indicadores.producao.value / this.indicadores.aplantada.value);

              //coeap
              this.indicadores.coeap.value += Math.floor(this.indicadores.coe.value / this.indicadores.aplantada.value);

              //coeu
              this.indicadores.coeu.value +=Math.floor( this.indicadores.coe.value / this.indicadores.producao.value);

              //cotap
              this.indicadores.cotap.value += Math.floor(this.indicadores.cot.value / this.indicadores.aplantada.value);

              //cotu
              this.indicadores.cotu.value += Math.floor(this.indicadores.cot.value / this.indicadores.producao.value);

              //ctap
              this.indicadores.ctap.value += Math.floor(this.indicadores.ct.value / this.indicadores.aplantada.value);

              //ctu
              this.indicadores.ctu.value += Math.floor(this.indicadores.ct.value / this.indicadores.producao.value);

              //mb
              this.indicadores.mb.value += Math.floor(this.indicadores.rendabruta.value - this.indicadores.coe.value);

              //mbap
              this.indicadores.mbap.value += Math.floor(this.indicadores.mb.value / this.indicadores.aplantada.value);


              this.indicadores.mbu.value += Math.floor(this.indicadores.mb.value / this.indicadores.producao.value);

              this.indicadores.ml.value += Math.floor(this.indicadores.rendabruta.value - this.indicadores.cot.value);

              this.indicadores.mlap.value += Math.floor(this.indicadores.ml.value / this.indicadores.aplantada.value);

              this.indicadores.mlu.value +=Math.floor( this.indicadores.ml.value / this.indicadores.producao.value);

              this.indicadores.lucro.value += Math.floor(this.indicadores.rendabruta.value - this.indicadores.ct.value);

              this.indicadores.lucroap.value += Math.floor(this.indicadores.lucro.value / this.indicadores.aplantada.value);

              this.indicadores.lucrou.value += Math.floor(this.indicadores.lucro.value / this.indicadores.producao.value);

              this.indicadores.trcst.value +=Math.floor( this.indicadores.ml.value); /* / ESTOQC EM LAVOURAS +   BENFEITORIAS */ ;

              this.indicadores.trcct.value +=Math.floor( this.indicadores.ml.value); /* / ESTOQC EM LAVOURAS +   BENFEITORIAS  +  estoque capital em terra */;

              this.indicadores.vbencusto.value += Math.floor(this.indicadores.rendabruta.value / this.indicadores.ct.value);

              this.indicadores.capitalest.value +=  /* ESTOQC EM LAVOURAS +   BENFEITORIAS  / */  Math.floor(this.indicadores.producao.value);

              this.indicadores.capitalct.value +=   /* ESTOQC EM LAVOURAS +   BENFEITORIAS + estoque de capital em terra / */ Math.floor(this.indicadores.producao.value);

              this.indicadores.taxagiro.value += Math.floor((this.indicadores.rendabruta.value / this.indicadores.producao.value) / this.indicadores.capitalct.value);

              this.indicadores.lucrativ.value += Math.floor(this.indicadores.mlu.value / this.indicadores.capitalct.value);

            });
          });
        });
      });
  //  });
  }

 }
</script>

<style scoped>

</style>
