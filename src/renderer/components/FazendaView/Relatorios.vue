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
var pdf = require('pdfkit');
var fs = require('fs');

export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', decimals: 2, value: 0, unidade: 'R$/Ano', help: '' },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  decimals: 2, value: 0, unidade: 'R$/Ano', help: '' },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',decimals: 2, value: 0, unidade: 'R$/Ano', help: '' },
        ct: { text: 'CUSTO TOTAL (CT)', decimals: 2, value: 0, unidade: 'R$/Ano', help: ''},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        producao: { text: 'PRODUÇÃO',decimals: 0, value: 0, unidade: 'Sacas', help: '' },
        aplantada: { text: 'ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'Ha', help: '' },
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'Und/Ha', help: ''  },
        coeap: { text: 'COE POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: '' },
        coeu: { text: 'COE POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        cotap: { text: 'COT POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: '' },
        cotu: { text: 'COT POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        ctap: { text: 'CT POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: '' },
        ctu: { text: 'CT POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        mb: { text: 'MARGEM BRUTA', decimals: 2, value: 0, unidade: 'R$/Ano', help: ''  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: ''  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        ml: { text: 'MARGEM LÍQUIDA',decimals: 2, value: 0, unidade: 'R$/Ano', help: ''  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: ''},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        lucro: { text: 'LUCRO',decimals: 2, value: 0, unidade: 'R$/Ano', help: ''},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: ''},
        lucrou: { text: 'LUCRO POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',decimals: 2, value: 0, unidade: '%', help: ''  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', decimals: 2, value: 0, unidade: '%', help: ''  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',decimals: 2, value: 0, unidade: 'R$', help: '' },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        taxagiro: { text: 'TAXA DE GIRO', decimals: 2, value: 0, unidade: '%a.a', help: '' },
        lucrativ: { text: 'LUCRATIVIDADE', decimals: 2, value: 0, unidade: '%a.a', help: '' }
      }
    }

  },
  props: {
    fid: {
      default: '-1'
    },
    checkeds: {
      default: []
    }
  },
  methods: {
    preview: function() {
      remote.dialog.showSaveDialog({title: 'Selecione local para salvar o PDF',defaultPath: 'Relatorio'}, (filename) => {
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
    geraIndicadores(SafraIDs){
      if(SafraIDs.length==0){
        Object.keys(this.indicadores).forEach(key => {
          this.indicadores[key].value = 0;
        });
        this.limpaInterpretacoes();
        return;
      }

      let estoqueCapitalObj = JSON.parse(fs.readFileSync('estoquecapital.json', 'utf8'));
      let CidadeTipoEstoque = require('./../cidades_estoque.json');

      let thisindicadores = {};
      Object.assign(thisindicadores, this.indicadores);
      Object.keys(thisindicadores).forEach(key => {
        thisindicadores[key].value = 0;
      });

      this.$backend.getFazenda(this.fid, (fazendaObj) => {
        let EstoqueCapital = estoqueCapitalObj[CidadeTipoEstoque[fazendaObj.Cidade]];
        this.$backend.getSafras(this.checkeds, safras => {
          let SafraCount = 0;
          if(safras!=null)
          safras.forEach(safraObj => {
            SafraCount++;
            //PRECO MEDIO DE VENDA
            //EH MEDIA, TEM QUE DIVIDR DEPOIS
            thisindicadores.pcv.value += safraObj.PrecoVenda;

            this.$backend.getSafraTalhao(safraObj.id, (talhoes) => {
              if(talhoes!=null)
              talhoes.forEach(talhaoObj => {
                let IndicadoresTalhao = {};
                //renda bruta
                thisindicadores.rendabruta.value += (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;
                IndicadoresTalhao.rendabruta = (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;

                //coe
                thisindicadores.coe.value += talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
                talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
                + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;

                IndicadoresTalhao.coe = talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
                talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
                + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;


                //cot
                thisindicadores.cot.value += IndicadoresTalhao.coe + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);
                IndicadoresTalhao.cot = IndicadoresTalhao.coe + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);

                //ct
                thisindicadores.ct.value += IndicadoresTalhao.cot + (EstoqueCapital["remuneracao"] * talhaoObj.Area);
                IndicadoresTalhao.ct = IndicadoresTalhao.cot + (EstoqueCapital["remuneracao"] * talhaoObj.Area);

                //producao
                thisindicadores.producao.value += talhaoObj.ProdTotal;
                IndicadoresTalhao.producao = talhaoObj.ProdTotal;

                //aplantada
                thisindicadores.aplantada.value += talhaoObj.Area;
                IndicadoresTalhao.aplantada = talhaoObj.Area;

                //ppaplantada
                thisindicadores.ppaplantada.value = thisindicadores.producao.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.ppaplantada = IndicadoresTalhao.producao / IndicadoresTalhao.aplantada;

                //coeap
                thisindicadores.coeap.value = thisindicadores.coe.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.coeap = IndicadoresTalhao.coe / IndicadoresTalhao.aplantada;

                //coeu
                thisindicadores.coeu.value = thisindicadores.coe.value / thisindicadores.producao.value;
                IndicadoresTalhao.coeu = IndicadoresTalhao.coe / IndicadoresTalhao.producao;

                //cotap
                thisindicadores.cotap.value = thisindicadores.cot.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.cotap = IndicadoresTalhao.cot / IndicadoresTalhao.aplantada;

                //cotu
                thisindicadores.cotu.value = thisindicadores.cot.value / thisindicadores.producao.value;
                IndicadoresTalhao.cotu = IndicadoresTalhao.cot / IndicadoresTalhao.producao;

                //ctap
                thisindicadores.ctap.value = thisindicadores.ct.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.ctap = IndicadoresTalhao.ct / IndicadoresTalhao.aplantada;

                //ctu
                thisindicadores.ctu.value = thisindicadores.ct.value / thisindicadores.producao.value;
                IndicadoresTalhao.ctu = IndicadoresTalhao.ct / IndicadoresTalhao.producao;

                //mb
                thisindicadores.mb.value = thisindicadores.rendabruta.value - thisindicadores.coe.value;
                IndicadoresTalhao.mb = IndicadoresTalhao.rendabruta - IndicadoresTalhao.coe;

                //mbap
                thisindicadores.mbap.value = thisindicadores.mb.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.mbap  = IndicadoresTalhao.mb / IndicadoresTalhao.aplantada;


                thisindicadores.mbu.value = thisindicadores.mb.value / thisindicadores.producao.value;
                IndicadoresTalhao.mbu = IndicadoresTalhao.mb / IndicadoresTalhao.producao;

                thisindicadores.ml.value = thisindicadores.rendabruta.value - thisindicadores.cot.value;
                IndicadoresTalhao.ml = IndicadoresTalhao.rendabruta - IndicadoresTalhao.cot;

                thisindicadores.mlap.value = thisindicadores.ml.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.mlap = IndicadoresTalhao.ml / IndicadoresTalhao.aplantada;

                thisindicadores.mlu.value = thisindicadores.ml.value / thisindicadores.producao.value;
                IndicadoresTalhao.mlu = IndicadoresTalhao.ml / IndicadoresTalhao.producao;

                thisindicadores.lucro.value = thisindicadores.rendabruta.value - thisindicadores.ct.value;
                IndicadoresTalhao.lucro = IndicadoresTalhao.rendabruta - IndicadoresTalhao.ct;

                thisindicadores.lucroap.value = thisindicadores.lucro.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.lucroap = IndicadoresTalhao.lucro / IndicadoresTalhao.aplantada;

                thisindicadores.lucrou.value = thisindicadores.lucro.value / thisindicadores.producao.value;
                IndicadoresTalhao.lucrou = IndicadoresTalhao.lucro / IndicadoresTalhao.producao;

                thisindicadores.trcst.value = (thisindicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value))*100 ;
                IndicadoresTalhao.trcst = (IndicadoresTalhao.ml / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area))*100 ;


                //verificar isso aqui
                //estou usando a área do talhao atual, contudo, parece que ela quer a área TOTAL DE TODOS TALHOES DA SAFRA
                thisindicadores.trcct.value = (thisindicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value + thisindicadores.aplantada.value*safraObj.PrecoMTerraN))*100 ;
                IndicadoresTalhao.trcct = (IndicadoresTalhao.ml / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN))*100 ;


                thisindicadores.bencusto.value = thisindicadores.rendabruta.value / thisindicadores.ct.value;
                IndicadoresTalhao.bencusto = IndicadoresTalhao.rendabruta / IndicadoresTalhao.ct;

                thisindicadores.capitalest.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value) / thisindicadores.producao.value;
                IndicadoresTalhao.capitalest = ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area) / IndicadoresTalhao.producao;


                thisindicadores.capitalct.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value + thisindicadores.aplantada.value*safraObj.PrecoMTerraN ) / thisindicadores.producao.value;
                IndicadoresTalhao.capitalct =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN ) / IndicadoresTalhao.producao;


                thisindicadores.taxagiro.value = ((thisindicadores.rendabruta.value / thisindicadores.producao.value) / thisindicadores.capitalct.value ) * 100;
                IndicadoresTalhao.taxagiro = ((IndicadoresTalhao.rendabruta / IndicadoresTalhao.producao) / IndicadoresTalhao.capitalct ) * 100;

                thisindicadores.lucrativ.value = (thisindicadores.mlu.value / thisindicadores.capitalct.value) * 100;
                IndicadoresTalhao.lucrativ  = (IndicadoresTalhao.mlu / IndicadoresTalhao.capitalct) * 100;
              });

            //  this.indicadores = thisindicadores;
            this.indicadores = {}
            Object.assign(this.indicadores, thisindicadores);
            this.calculaInterpretacoes();
            });
          });

          //media preco venda
          thisindicadores.pcv.value = thisindicadores.pcv.value / SafraCount;

        });
      });
    }
  },
  mounted: function() {


  },
  watch: {
    checkeds: function (newV, oldV) {
      console.log(121312);
      this.geraIndicadores(this.checkeds);
    }
  }

}
</script>

<style scoped>

</style>
