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
              <b>{{i.text}} <v-btn v-if="i.help!=''" flat icon v-on:click="dialog = true, msg=i.help" style="text-align:right; float:right; margin:0;"><v-icon>info</v-icon></v-btn></b>
              <v-dialog max-width="290" v-model="dialog" :class="'status' + i.status">
                <v-card>
                  <v-card-text>
                    <b>{{msg}}</b>
                  </v-card-text>
                  <v-btn color="green darken-1" flat="flat" @click="dialog = false">FECHAR</v-btn>
                </v-card>
              </v-dialog>
              <span class="indicator">{{formatN(i.value, i.decimals)}}</span> <span class="unidade"><b>{{i.unidade}}</b></span>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
import fs from 'fs'
import path from 'path'
import { remote } from 'electron'

let estoqueCapitalObj = JSON.parse(fs.readFileSync('estoquecapital.json', 'utf8'));
let CidadeTipoEstoque = require('./../cidades_estoque.json');

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
      },
      dialog: false,
      msg: ''
    }
  },
  props: {
    fid: {
      default: '0'
    },
    checkeds: {
      default: []
    }
  },
  methods: {
    formatN(vr,minimium=2){
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: minimium});
    },
    limpaInterpretacoes(){
      Object.keys(this.indicadores).forEach(key => {
        //this.indicadores[key].help = 'Para visualizar as interpretações é preciso selecionar pelo menos 1 safra para geração de indicadores.';
        this.indicadores[key].help = '';
      });
    },
    calculaInterpretacoes(){
      this.limpaInterpretacoes();
      if(this.indicadores.mb.value<0) this.indicadores.mb.help='Atenção! Os custos de desembolso direto (pagamento de fertilizantes, energia, mão de obra, volumosos etc) estão maiores que a renda obtida na atividade. Em curto prazo a atividade não sobrevive, portanto, ajuste seus desembolsos de acordo com a renda obtida, pois se continuar com este resultado, é melhor parar com a atividade.';
      if(this.indicadores.mb.value==0) this.indicadores.mb.help='Com a renda obtida na atividade, você consegue saldar todo o custo operacional efetivo (pagamento de concentrado, energia, mão de obra, volumosos etc), porém não sobra dinheiro para cobrir os custos de depreciação das forrageiras não anuais, máquinas, equipamentos e benfeitorias, bem como o seu pró-labore (custo de oportunidade do trabalho desempenhado pelo empresário rural). Se a empresa mantiver este resultado, no médio prazo a atividade estará comprometida, pois não haverá dinheiro para repor bens sucateados e não haverá remuneração pelo seu trabalho na propriedade.';
      if(this.indicadores.mb.value>0) this.indicadores.mb.help='Com a renda obtida na atividade, você consegue saldar todo o custo operacional efetivo (pagamento de concentrado, energia, mão de obra, volumosos etc) e ainda há sobras para saldar parte (ou a totalidade dos custos fixos). Nesta situação, no curto prazo você se mantém na atividade, mas para melhor avaliação, avance para a análise da margem líquida, pois ela mostrará se você consegue pagar todo o custo fixo, ou apenas parte dele.';

      if(this.indicadores.mb.value>0 && this.indicadores.ml.value<0) this.indicadores.ml.help='Você está se descapitalizando com o passar do tempo, uma vez que a renda obtida não é suficiente para saldar todos os custos com depreciações e remuneração da mão de obra familiar (custos fixos). Se continuar com este resultado, você estará empobrecendo a cada dia e no médio prazo será forçado a deixar a atividade, uma vez que não terá capital para repor os bens sucateados e indispensáveis para produção.';
      if(this.indicadores.ml.value==0) this.indicadores.ml.help = 'Com a renda obtida na atividade, você consegue saldar todo o custo operacional total (desembolso direto + depreciações + pró-labore), porém não possui sobras equivalentes a remuneração de todo o capital investido na atividade quando aplicado em um fundo de investimento, como a poupança. Com este resultado você se mantém na atividade, porém sem atratividade econômica.';
      if(this.indicadores.ml.value>0) this.indicadores.ml.help = 'Com a renda obtida na atividade, você consegue saldar todo o custo operacional total e também parte (ou a totalidade) do custo de oportunidade sobre o capital investido na atividade. Para melhor avaliação, avance para a análise do lucro, pois ele mostrará se você tem saldo equivalente a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança, ou apenas parte dele. ';

      if(this.indicadores.ml.value>0 && this.indicadores.lucro.value<0) this.indicadores.lucro.help = 'Sua atividade não é atrativa economicamente, uma vez que não há saldo equivalente a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança . No longo prazo a atividade poderá ser comprometida pela baixa capacidade de investimento na mesma.';
      if(this.indicadores.lucro.value==0) this.indicadores.lucro.help = 'A sua atividade apresenta lucro normal. A atividade está no ponto de cobertura total, ou seja, paga todo seu custo de desembolso direto (a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança) e todos os seus custos fixos (depreciações, pró-labore e remunerações), porém você deve focar no aumento do lucro para aumentar a atratividade do empreendimento, garantindo assim o seu crescimento na atividade.';
      if(this.indicadores.lucro.value>0) this.indicadores.lucro.help = 'A sua atividade apresneta lucro supernormal. A renda obtida na atividade é suficiente para pagar todos custos gerados e ainda proporciona uma remuneração superior às alternativas de investimento. Isso garante que parte do lucro possa ser reinvestido na atividade, garantindo sua competitividade no longo prazo. ';
    
      // A PLANILHA DO WALTER COM AS INTERPRETAÇÕES TÁ MUITO ZOADA!

      // this.indicadores.coe.help = 'COE, é o custo referente aos desembolsos diretos de capital (pagamento de concentrado, energia, mão de obra, volumosos etc) destinados a toda atividade leiteira. Por via de regra, são aqueles que variam de acordo com a produção, podendo aumentar ou diminuir.';
      // this.indicadores.cot.help = 'COT, engloba os custos diretos e parte dos custos fixos da atividade. É o somatório do COE, custos com mão de obra familiar e depreciações.';
      // this.indicadores.ct.help = 'CT, é o custo referente ao COE + COT + o custo de oportunidade sobre o capital investido na atividade. Nele estão contemplados todos os custos gerados na atividade.';

      // if(this.indicadores.lucrativ.value>=20) this.indicadores.lucrativ.help = 'A lucratividade mede o quanto você ganhou sobre as vendas realizadas no ano. A sua interpretação está ligada ao risco de ter prejuízos com a atividade. Quanto menor a lucratividade, maior o risco de prejuízos. Quando igual ou maior que 20%, significa que você suporta uma redução de 20% no volume de leite produzido ou uma redução de 20% no preço recebido pelo leite ou até mesmo um aumento de 20% no custo total de produção. Este indicador representa o seu fôlego financeiro!';
      // if(this.indicadores.lucrativ.value<20) this.indicadores.lucrativ.help = 'A lucratividade mede o quanto você ganhou sobre as vendas realizadas no ano. A sua interpretação está ligada ao risco de ter prejuízos com a atividade. Quanto menor a lucratividade, maior o risco de redução do lucro. Quando menor que 20%, significa que você suporta poucas oscilações negativas no volume de leite produzido, no preço do leite e/ou no custo de produção. A porcentagem da lucratividade demonstra qual a redução no volume produzido ou qual a redução no preço recebido pelo leite ou até mesmo qual o aumento no custo total de produção você suporta. Este indicador representa o seu fôlego financeiro!';

      // if(this.indicadores..value) this.indicadores..help = '';

      // if(this.indicadores.taxagiro.value>=50) this.indicadores.taxagiro.help = 'Representa a sua capacidade em transformar patrimônio em receita bruta. Deve-se buscar no mínimo o resultado de 50% para este indicador, ou seja, nesta situação a receita bruta alcançada com a atividade se equivale a metade do seu patrimônio, o que proporciona giro de capital eficiente para desenvolver a sua atividade.';
      // if(this.indicadores.taxagiro.value<50) this.indicadores.taxagiro.help = 'Representa a sua capacidade em transformar patrimônio em receita bruta. Deve-se buscar no mínimo 50% para este indicador, ou seja, nesta situação a receita bruta alcançada com a atividade se equivale a metade do seu patrimônio, o que proporciona giro de capital eficiente para desenvolver a sua atividade.';

      // this.indicadores.trcct.help = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade leiteira consideramos como satisfatório um resultado de no mímimo 10% ao ano.';
      // this.indicadores.trcst.help = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade leiteira consideramos como satisfatório um resultado de no mímimo 15% ao ano.';

      // if(this.indicadores..value) this.indicadores..help = '';

    },
    geraIndicadores(SafraIDs){
      if(SafraIDs.length==0){
        Object.keys(this.indicadores).forEach(key => {
          this.indicadores[key].value = 0;
        });
        this.limpaInterpretacoes();
        return;
      }

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
    //this.geraIndicadores(this.checkeds);
  },
  watch: {
    checkeds: function (newV, oldV) {
      this.geraIndicadores(this.checkeds);
    }
  }
}
</script>

<style scoped>
.indicator {
  font-size:25px;
}

.unidade {
  font-size:13px;
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
