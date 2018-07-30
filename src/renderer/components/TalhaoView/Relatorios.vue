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
        O relatório é gerado em pdf na pasta especificada. Tal relatório contém todas as informações de indicadores do talhão em questão.
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { BrowserWindow, remote } from 'electron'
import fs from 'fs'

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
    tid: {
      default: '-1'
    }
  },
  methods: {
    formatN(vr){
      // vr = (vr*1);
      console.log("olaaaaaaaaaaaaa");
      return parseFloat(vr).toFixed(2).toLocaleString('pt-BR');
      // return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR');
    },
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
        var desp = {
          venda_subp: {text: "VENDA SUB PRODUTO", value: 0 },
          mao_familiar: {text: "MÃO DE OBRA FAMILIAR", value: 0 },
          arrend_terra: {text: "ARRENDAMENTO TERRAS", value: 0 },
          aluguel_maq: {text: "ALUGUEL DE MAQUINAS", value: 0 },
          combustivel: {text: "COMBUSTÍVEL", value: 0 },
          manu_benf: {text: "MANUTENÇÃO MÁQUINAS", value: 0 },
          manu_maq: {text: "MANUTENÇÃO BENFEITORIAS", value: 0 },
          energia: {text: "ENERGIA", value: 0 },
          frete: {text: "FRETE", value: 0 },
          impostos: {text: "IMPOSTOS", value: 0 },
          mao_contratada: {text: "MÃO DE OBRA CONTRATADA", value: 0 },
          mao_fixa: {text: "MÃO DE OBRA FIXA", value: 0 },
          despesas_gerais: {text: "DESPESAS GERAIS", value: 0 },
          ass_tec: {text: "ASSISTÊNCIA TÉCNICA", value: 0 },
          certificacao: {text: "CERTIFICAÇÃO", value: 0 },
          analise_solo: {text: "ANÁLISE SOLO", value: 0 },
          analise_foliar: {text: "ANÁLISE FOLIAR", value: 0 },
          epi: {text: "EPI", value: 0 },
          acidos: {text: "ÁCIDOS", value: 0 },
          adubos: {text: "ADUBOS", value: 0 },
          acaricida: {text: "ACARICIDAS", value: 0 },
          bactericida: {text: "BACTERICIDAS", value: 0 },
          espalhante: {text: "ESPALHANTE", value: 0 },
          fungicida: {text: "FUNGICIDA", value: 0 },
          inseticida: {text: "INSETICIDA", value: 0 },
          nematicida: {text: "NEMATICIDA", value: 0 },
          oleo_mineral: {text: "ÓLEO MINERAL", value: 0 },
          herbicida: {text: "HERBICIDA", value: 0 },
          hormonios: {text: "HORMÔNIOS", value: 0 },
          maturadores: {text: "MATURADORES", value: 0 },
          material_colheita: {text: "MATERIAL COLHEITA", value: 0 },
          armazenamento: {text: "ARMAZENAMENTO", value: 0 },
          beneficio: {text: "BENEFÍCIO", value: 0 },
          gas_lenha: {text: "GÁS LENHA CARVAO", value: 0 },
          materiais_colheita: {text: "MATERIAIS PÓS COLHEITA", value: 0 },
          rebeneficio: {text: "REBENEFÍCIO", value: 0 },
          corretagem: {text: "CORRETAGEM", value: 0 }
        }

        this.$backend.getTalhao(this.tid, (talhaoObj) => {
          desp.venda_subp.value = talhaoObj.VendaSubP;
          desp.mao_familiar.value = talhaoObj.MaoObraF;
          desp.arrend_terra.value = talhaoObj.ArrendamentoTerras;
          desp.aluguel_maq.value = talhaoObj.AluguelMaquinas;
          desp.combustivel.value = talhaoObj.Combustivel;
          desp.manu_benf.value = talhaoObj.ManutencaoBenf;
          desp.manu_maq.value = talhaoObj.ManutencaoMaq;
          desp.energia.value = talhaoObj.Energia;
          desp.frete.value = talhaoObj.Frete;
          desp.impostos.value = talhaoObj.Impostos;
          desp.mao_contratada.value = talhaoObj.MaoObraContratada;
          desp.mao_fixa.value = talhaoObj.MaoObraFixa;
          desp.despesas_gerais.value = talhaoObj.Despesas;
          desp.ass_tec.value = talhaoObj.Assistencia;
          desp.certificacao.value = talhaoObj.Certificacao;
          desp.analise_solo.value = talhaoObj.AnaliseSolo;
          desp.analise_foliar.value = talhaoObj.AnaliseFoliar;
          desp.epi.value = talhaoObj.EPi;
          desp.acidos.value = talhaoObj.Acidos;
          desp.adubos.value = talhaoObj.Adubos;
          desp.acaricida.value = talhaoObj.Acaricida;
          desp.bactericida.value = talhaoObj.Bactericida;
          desp.espalhante.value = talhaoObj.Espalhante;
          desp.fungicida.value = talhaoObj.Fungicida;
          desp.inseticida.value = talhaoObj.Inseticida;
          desp.nematicida.value = talhaoObj.Nematicida;
          desp.oleo_mineral.value = talhaoObj.OleoMineral;
          desp.herbicida.value = talhaoObj.Herbicida;
          desp.hormonios.value = talhaoObj.Hormonios;
          desp.maturadores.value = talhaoObj.Maturadores;
          desp.material_colheita.value = talhaoObj.MaterialColheita;
          desp.armazenamento.value = talhaoObj.Armazenamento;
          desp.beneficio.value = talhaoObj.Beneficios;
          desp.gas_lenha.value = talhaoObj.GasLenhaCarvao;
          desp.rebeneficio.value = talhaoObj.Rebeneficio;
          desp.corretagem.value = talhaoObj.Correntagem;
        })

        myDoc.pipe(fs.createWriteStream(filename+".pdf"));
        this.errorCatch();

        let linha=160;
        let linhaOpacity=160;

        //posicao(coluna, linha)

        this.$backend.getTalhao(this.tid, (talhaoObj) => {
          if(talhaoObj==null) console.log("Fazenda não encontrada!");

          myDoc.font('Times-Roman')
               .fontSize(20)
          myDoc.text("Relatório dos indicadores de Talhão", 100, 100)
               .text(talhaoObj.NomeTalhao)
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
                 .text(parseFloat(i[key].value).toFixed(2).toLocaleString('pt-BR') + " " + i[key].unidade, 460, linha)

            linha+=15;
            linhaOpacity+=30;

            //console.log(i[key].text, i[key].value);

          });

          //Elementos de Despesa
          myDoc.addPage();
          let linha1=160;
          let linhaOpacity1=160;


          myDoc.font('Times-Roman')
               .fontSize(20)
          myDoc.text("Elementos de Despesas", 100, 100)
               .text(talhaoObj.NomeTalhao)
               .fontSize(12);
          myDoc.moveTo(80,150)
               .lineTo(560,150)
               .stroke()
               .text("Valor/unidade", 460, 140);

          Object.keys(desp).forEach(function(index) {

            if(linhaOpacity1 <= 700){
              myDoc.rect(80, linhaOpacity1-4, 480, 16)
                  .fillOpacity(0.8)
                  .fillAndStroke("grey");
            }

            myDoc.fillAndStroke("black")
            myDoc.text(desp[index].text + ": ", 100, linha1)
                 .text(parseFloat(desp[index].value).toFixed(2).toLocaleString('pt-BR') + " R$/safra", 460, linha1)

            linha1+=15;
            linhaOpacity1+=30;

            //console.log(i[key].text, i[key].value);

          });

          myDoc.end();



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
    let estoqueCapitalObj = JSON.parse(fs.readFileSync('estoquecapital.json', 'utf8'));
    let CidadeTipoEstoque = require('./../cidades_estoque.json');

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

    this.$backend.getTalhao(this.tid, (talhaoObj) => {
      this.$backend.getSafra(talhaoObj.SafraID, (safraObj) => {
      this.$backend.getFazenda(safraObj.FazendaID, (fazendaObj) => {
        let EstoqueCapital = estoqueCapitalObj[CidadeTipoEstoque[fazendaObj.Cidade]];


        //renda bruta
        this.indicadores.rendabruta.value = (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;
        //coe
        this.indicadores.coe.value = talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
          talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
          + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;

        //cot
        this.indicadores.cot.value = this.indicadores.coe.value + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);

        //ct
        this.indicadores.ct.value = this.indicadores.cot.value + (EstoqueCapital["remuneracao"] * talhaoObj.Area);

        //pcv
        this.indicadores.pcv.value = safraObj.PrecoVenda;

        //producao
        this.indicadores.producao.value = talhaoObj.ProdTotal;

        //aplantada
        this.indicadores.aplantada.value = talhaoObj.Area;

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

        this.indicadores.trcst.value = (this.indicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area))*100 ;


        //verificar isso aqui
        //estou usando a área do talhao atual, contudo, parece que ela quer a área TOTAL DE TODOS TALHOES DA SAFRA
        this.indicadores.trcct.value = (this.indicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN))*100 ;

        this.indicadores.bencusto.value = this.indicadores.rendabruta.value / this.indicadores.ct.value;

        this.indicadores.capitalest.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area) / this.indicadores.producao.value;

        this.indicadores.capitalct.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN ) / this.indicadores.producao.value;

        this.indicadores.taxagiro.value = ((this.indicadores.rendabruta.value / this.indicadores.producao.value) / this.indicadores.capitalct.value ) * 100;

        this.indicadores.lucrativ.value = (this.indicadores.mlu.value / this.indicadores.capitalct.value) * 100;

      });
      });
    });

  }

}
</script>

<style scoped>

</style>
