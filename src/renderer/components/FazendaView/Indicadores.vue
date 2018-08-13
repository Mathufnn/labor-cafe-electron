<template>
  <v-card>
    <v-card-title class="headline">
      <v-layout align-center justify-space-between row fill-height>
        <v-flex xs5>
            Indicadores da fazenda
        </v-flex>
        <v-flex xs5 style="text-align:left; font-size:10px; line-height:17px;">
          <v-tooltip bottom>
            <div slot="activator">
            <span style="font-size:8px;">LEGENDA:</span><br />
            <span ><v-icon style="color:red;">info</v-icon></span> Indicador abaixo do recomendável<br />
            <span><v-icon style="color:yellow;">info</v-icon></span> Indicador no limite recomendável<br />
            <span><v-icon style="color:green;">info</v-icon></span> Indicador acima do recomendável<br />
            </div>
            <span>Clicando sobre o ícone 'i' em um indicador específico você obtém a interpretação detalhada desse indicador.</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs2 style="text-align:right;">
          <v-tooltip top>
            <v-btn icon slot="activator" @click="export_dialog = true" color="primary"> <v-icon>publish</v-icon></v-btn>
            <span>Exportar dados</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout>
      <v-container row wrap justify-space-around>
        <v-layout row wrap class="text-xs-center">
          <v-flex xs4 v-for="i in indicadores" v-bind:key="i.text">
            <v-card @mouseover.native="fazendeiro_muda(i.fazendeiro,true)" @mouseleave.native="fazendeiro_muda(i.fazendeiro,false)">
              <b>{{i.text}} <v-btn v-if="i.help!=''" flat icon v-on:click="dialog = true, msg=i.help " :class="'status'+i.status" style="text-align:right; float:right; margin:0;"><v-icon>info</v-icon></v-btn></b><br />
              <span class="indicator">{{formatN(i.value, i.decimals)}}</span> <span class="unidade"><b>{{i.unidade}}</b></span>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-dialog max-width="390" v-model="dialog">
      <v-card>
        <v-card-text>
          <b>{{msg}}</b>
        </v-card-text>
        <v-btn color="green darken-1" flat="flat" @click="dialog = false">FECHAR</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog max-width="400" v-model="export_dialog">
      <v-card>
        <v-card-text>
          <b>Selecione o formato para qual deseja exportar esses dados:</b><br /><br />
          <v-layout align-center justify-space-between row fill-height>
            <v-flex v-if="!exporting" xs6 class="text-xs-center">
              <v-btn color="primary" big  @click="exportdata(1)">PDF</v-btn>
            </v-flex>
            <v-flex v-if="!exporting" xs6 class="text-xs-center">
              <v-btn color="primary" big @click="exportdata(2)">CSV</v-btn>
            </v-flex>
            <v-flex v-if="exporting" xs12 text-xs-center>
              <v-progress-circular :size="70" :width="7" indeterminate color="green"></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-btn color="green darken-1" flat="flat" @click="export_dialog = false">CANCELAR</v-btn>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import fs from 'fs'
import path from 'path'
import { remote, ipcRenderer } from 'electron'

export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/safra', help: '' },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/safra', help: '' },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/safra', help: '' },
        ct: { text: 'CUSTO TOTAL (CT)', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/safra', help: ''},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: '' },
        producao: { text: 'PRODUÇÃO',decimals: 0, value: 0, status:4, fazendeiro:0, unidade: 'Sacas', help: '' },
        aplantada: { text: 'ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'Ha', help: '' },
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'Und/Ha', help: ''  },
        coeap: { text: 'COE POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Ha', help: '' },
        coeu: { text: 'COE POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: ''  },
        cotap: { text: 'COT POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Ha', help: '' },
        cotu: { text: 'COT POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: '' },
        ctap: { text: 'CT POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Ha', help: '' },
        ctu: { text: 'CT POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: '' },
        mb: { text: 'MARGEM BRUTA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/safra', help: ''  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Ha', help: ''  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: '' },
        ml: { text: 'MARGEM LÍQUIDA',decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/safra', help: ''  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Ha', help: ''},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: ''  },
        lucro: { text: 'LUCRO',decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/safra', help: ''},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Ha', help: ''},
        lucrou: { text: 'LUCRO POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: ''  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',decimals: 2, value: 0, status:4, fazendeiro:0, unidade: '%', help: ''  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: '%', help: ''  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$', help: '' },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: '' },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: 'R$/Sc', help: ''  },
        taxagiro: { text: 'TAXA DE GIRO', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: '%a.a', help: '' },
        lucrativ: { text: 'LUCRATIVIDADE', decimals: 2, value: 0, status:4, fazendeiro:0, unidade: '%a.a', help: '' }
      },
      dialog: false,
      export_dialog: false,
      exporting: false,
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
    fazendeiro_muda(estado, iit){
      this.$root.$emit('fazendeiro_muda_estado', {estado, iit});
    },
    exportdata(type){
        //=============================================================  csv
      if(type==2){
        remote.dialog.showSaveDialog({title: 'Selecione local para salvar o arquivo csv',filters:[{name: 'Arquivo CSV (comma separeted values)', extensions: ['csv']}]}, (filename) => {
          if(typeof filename == 'undefined') return;
          //this.loading = true;
          let data = 'INDICADOR,VALOR\n';
          Object.keys(this.indicadores).forEach(key => {
            //this.indicadores[key].help = 'Para visualizar as interpretações é preciso selecionar pelo menos 1 safra para geração de indicadores.';
            data += this.indicadores[key].text + ',';
            data += parseFloat(this.indicadores[key].value.toFixed(2)) + '\n';
          });

          fs.writeFile(filename, data, 'UTF-8', (err) => {
            if (err) remote.dialog.showErrorBox('Erro ao gravar o arquivo!', 'Não foi possível criar o arquivo no local.');
            else remote.dialog.showMessageBox({type:'info', title:'Arquivo csv criado com sucesso!', message: 'O arquivo csv foi salvo no local escolhido com sucesso!'});
            //  this.loading = false;
          });
        });
      }

      //============================================================= PDF

      else if(type==1){
        let data = 'INDICADOR,VALOR\n';
        Object.keys(this.indicadores).forEach(key => {
          //this.indicadores[key].help = 'Para visualizar as interpretações é preciso selecionar pelo menos 1 safra para geração de indicadores.';
          data += this.indicadores[key].text + ',';
          data += parseFloat(this.indicadores[key].value.toFixed(2)) + '\n';
        });

        ipcRenderer.send('print-pdf', data);
      }
    },
    calculaInterpretacoes(){
      //fazendeiro
      //0 - normal / 1 - desapontado / 2- apontado / 3-olhaisso / 4- rico / 5- chorando / 6- assustado
      //cor (status)
      //1 - vermelho / 2 - amarelo / 3 - verde / 4 - preto
      this.limpaInterpretacoes();
      if(this.indicadores.mb.value<0){
        this.indicadores.mb.help='Atenção! Os custos de desembolso direto (pagamento de fertilizantes, energia, mão de obra, combustíveis, etc.) estão maiores que a renda obtida na atividade. Em curto prazo a atividade não sobrevive, portanto, ajuste seus desembolsos de acordo com a renda obtida, pois se continuar com este resultado, é melhor parar com a atividade.';
        this.indicadores.mb.fazendeiro=1;
        this.indicadores.mb.status=1;
      }
      if(this.indicadores.mb.value==0){
        this.indicadores.mb.help='Com a renda obtida na atividade, você consegue saldar todo o custo operacional efetivo (pagamento de fertilizantes, energia, mão de obra, defensivos, etc.), porém não sobra dinheiro para cobrir os custos de depreciação das máquinas, equipamentos e benfeitorias, bem como o seu pró-labore (custo de oportunidade do trabalho desempenhado pelo empresário rural). Se a empresa mantiver este resultado, no médio prazo a atividade estará comprometida, pois não haverá dinheiro para repor bens sucateados e não haverá remuneração pelo seu trabalho na propriedade.';
        this.indicadores.mb.fazendeiro=6;
        this.indicadores.mb.status=2;
      }
      if(this.indicadores.mb.value>0){
         this.indicadores.mb.help='Com a renda obtida na atividade, você consegue saldar todo o custo operacional efetivo (pagamento de fertilizantes, energia, mão de obra, defensivos, etc.) e ainda há sobras para saldar parte (ou a totalidade dos custos fixos). Nesta situação, no curto prazo você se mantém na atividade, mas para melhor avaliação, avance para a análise da margem líquida, pois ela mostrará se você consegue pagar todo o custo fixo, ou apenas parte dele.';
         this.indicadores.mb.fazendeiro=4;
         this.indicadores.mb.status=3;
       }

      if(this.indicadores.mb.value>0 && this.indicadores.ml.value<0){
        this.indicadores.ml.help='Você está se descapitalizando com o passar do tempo, uma vez que a renda obtida não é suficiente para saldar todos os custos com depreciações e remuneração da mão de obra familiar (custos fixos). Se continuar com este resultado, você estará empobrecendo a cada dia e no médio prazo será forçado a deixar a atividade, uma vez que não terá capital para repor os bens sucateados e indispensáveis para produção.';
        this.indicadores.ml.fazendeiro=1;
        this.indicadores.ml.status=1;
      }
      if(this.indicadores.ml.value==0){
        this.indicadores.ml.help = 'Com a renda obtida na atividade, você consegue saldar todo o custo operacional total (desembolso direto + depreciações + pró-labore), porém não possui sobras equivalentes a remuneração de todo o capital investido na atividade quando aplicado em um fundo de investimento, como a poupança. Com este resultado você se mantém na atividade, porém sem atratividade econômica.';
        this.indicadores.ml.fazendeiro=6;
        this.indicadores.ml.status=2;
      }
      if(this.indicadores.ml.value>0){
        this.indicadores.ml.help = 'Com a renda obtida na atividade, você consegue saldar todo o custo operacional total e também parte (ou a totalidade) do custo de oportunidade sobre o capital investido na atividade. Para melhor avaliação, avance para a análise do lucro, pois ele mostrará se você tem saldo equivalente a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança, ou apenas parte dele. ';
        this.indicadores.ml.fazendeiro=4;
        this.indicadores.ml.status=3;
      }

      if(this.indicadores.ml.value>0 && this.indicadores.lucro.value<0){
        this.indicadores.lucro.help = 'Sua atividade não é atrativa economicamente, uma vez que não há saldo equivalente a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança . No longo prazo a atividade poderá ser comprometida pela baixa capacidade de investimento na mesma.';
        this.indicadores.lucro.fazendeiro=1;
        this.indicadores.lucro.status=1;
      }
      if(this.indicadores.lucro.value==0){
        this.indicadores.lucro.help = 'A sua atividade apresenta lucro normal. A atividade está no ponto de cobertura total, ou seja, paga todo seu custo de desembolso direto (a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança) e todos os seus custos fixos (depreciações, pró-labore e remunerações), porém você deve focar no aumento do lucro para aumentar a atratividade do empreendimento, garantindo assim o seu crescimento na atividade.';
        this.indicadores.lucro.fazendeiro=6;
        this.indicadores.lucro.status=2;
      }
      if(this.indicadores.lucro.value>0){
        this.indicadores.lucro.help = 'A sua atividade apresenta lucro supernormal. A renda obtida na atividade é suficiente para pagar todos custos gerados e ainda proporciona uma remuneração superior às alternativas de investimento. Isso garante que parte do lucro possa ser reinvestido na atividade, garantindo sua competitividade no longo prazo. ';
        this.indicadores.lucro.fazendeiro=4;
        this.indicadores.lucro.status=3;
      }

      this.indicadores.coe.help = 'COE, é o custo referente aos desembolsos diretos de capital (pagamento de fertilizantes, energia, mão de obra, defensivos, etc.) destinados a toda atividade cafeeira. Por via de regra, são aqueles que variam de acordo com a produção, podendo aumentar ou diminuir.';
      this.indicadores.cot.help = 'COT, engloba os custos diretos e parte dos custos fixos da atividade. É o somatório do COE, custo com mão de obra familiar e depreciações.';
      this.indicadores.ct.help = 'CT, é o custo referente ao COT + o custo de oportunidade sobre o capital investido na atividade. Nele estão contemplados todos os custos gerados na atividade.';

      this.indicadores.capitalest.help = 'Mede a eficiência no uso de todo capital imobilizado, excluindo a terra nua, para produzir 1 saca de café. É a capacidade e eficiência que você possui em transformar patrimônio em produção de café. Quanto menor for o capital empatado a cada saca de café, maior é a sua eficiência no uso dos recursos da propriedade.';

      this.indicadores.capitalct.help = 'Mede a eficiência no uso de todo capital imobilizado, incluindo todo o valor da terra nua, para produzir 1 saca de café. É a capacidade e eficiência que você possui em transformar todo o patrimônio em produção de café. Quanto menor for o capital empatado a cada saca de café, maior é a sua eficiência no uso dos recursos da propriedade.';

      if(this.indicadores.lucrativ.value>=20){
        this.indicadores.lucrativ.help = 'A lucratividade mede o quanto você ganhou sobre as vendas realizadas no ano. A sua interpretação está ligada ao risco de ter prejuízos com a atividade. Quanto menor a lucratividade, maior o risco de prejuízos. Quando igual ou maior que 20%, significa que você suporta uma redução de 20% no volume de café produzido ou uma redução de 20% no preço recebido pela saca de café ou até mesmo um aumento de 20% no custo operacional total de produção. Este indicador representa o seu fôlego financeiro!';
        this.indicadores.lucrativ.fazendeiro=2;
        this.indicadores.lucrativ.status=3;
      }
      if(this.indicadores.lucrativ.value<20){
        this.indicadores.lucrativ.help = 'A lucratividade mede o quanto você ganhou sobre as vendas realizadas no ano. A sua interpretação está ligada ao risco de ter prejuízos com a atividade. Quanto menor a lucratividade, maior o risco de redução do lucro. Quando menor que 20%, significa que você suporta poucas oscilações negativas no volume de café produzido, no preço da saca de café e/ou no custo de produção. A porcentagem da lucratividade demonstra qual a redução no volume produzido ou qual a redução no preço recebido pela saca de café ou até mesmo qual o aumento no custo operacional total de produção você suporta. Este indicador representa o seu fôlego financeiro!';
        this.indicadores.lucrativ.fazendeiro=5;
        this.indicadores.lucrativ.status=1;
      }

      if(this.indicadores.taxagiro.value>=50){
        this.indicadores.taxagiro.help = 'Representa a sua capacidade em transformar patrimônio em receita bruta. Deve-se buscar no mínimo o resultado de 50% para este indicador, ou seja, nesta situação a receita bruta alcançada com a atividade se equivale a metade do seu patrimônio, o que proporciona giro de capital eficiente para desenvolver a sua atividade.';
        this.indicadores.taxagiro.fazendeiro=2;
        this.indicadores.taxagiro.status=3;
      }
      if(this.indicadores.taxagiro.value<50){
        this.indicadores.taxagiro.help = 'Representa a sua capacidade em transformar patrimônio em receita bruta. Deve-se buscar no mínimo 50% para este indicador, ou seja, nesta situação a receita bruta alcançada com a atividade se equivale a metade do seu patrimônio, o que proporciona giro de capital eficiente para desenvolver a sua atividade.';
        this.indicadores.taxagiro.fazendeiro=5;
        this.indicadores.taxagiro.status=1;
      }

      this.indicadores.trcct.help = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 10% ao ano.';
      this.indicadores.trcst.help = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 15% ao ano.';

      this.indicadores.coeu.help = 'COE/unidade permite ao produtor comparar os seus custos de desembolso direto com outras propriedades. O COE por saca demonstra quanto dos custos de desembolso direto (pagamento de fertilizantes, energia, defensivos, etc.) estão sendo gastos a cada saca de café produzida. Deve-se buscar valores menores que R$ 300,00/saca neste indicador.';
      this.indicadores.cotu.help = 'COT/unidade, permite ao produtor comparar os custos de desembolso direto e parte dos custos fixos da atividade cafeeira da propriedade com outras propriedades. Dentro dele está o COE + os custos com mão de obra familiar e depreciações gastos para produzir 1 saca de café.';
      this.indicadores.ctu.help = 'CT/unidade, permite ao produtor comparar o seu custo referente ao COT + o custo de oportunidade sobre o capital investido na atividade com outras propriedades. É o somatório que contempla todos os custos envolvidos na atividade cafeeira para produzir 1 saca de café.';

      this.indicadores.coeap.help = 'COE/hectare permite ao produtor comparar os seus custos de desembolso direto com outras propriedades. O COE por área demonstra quanto dos custos de desembolso direto (pagamento de fertilizantes, energia, defensivos, etc.) estão sendo gastos a cada saca de café produzida. Deve-se buscar valores menores que R$ 10.000,00/hectare neste indicador.';
      this.indicadores.cotap.help = 'COT/hectare, permite ao produtor comparar os custos de desembolso direto e parte dos custos fixos da atividade cafeeira da propriedade com outras propriedades. Dentro dele está o COE + os custos com mão de obra familiar e depreciações gastos para produzir em 1 hectare de café.';
      this.indicadores.ctap.help = 'CT/hectare, permite ao produtor comparar o seu custo referente ao COT + o custo de oportunidade sobre o capital investido na atividade com outras propriedades. É o somatório que contempla todos os custos envolvidos na atividade cafeeira para produzir em 1 hectare de café.';

      if(this.indicadores.mbu.value<0){
        this.indicadores.mbu.help = 'A margem bruta unitária permite ao produtor comparar seu resultado com outras propriedades. A margem bruta menor que zero indica que o produtor não está pagando seus custos de desembolso direto (custeio). Em curto prazo a atividade não sobrevive, portanto, se continuar com este resultado, é melhor parar com a atividade.';
        this.indicadores.mbu.fazendeiro=1;
        this.indicadores.mbu.status=1;
      }
      if(this.indicadores.mbu.value==0){
        this.indicadores.mbu.help = 'A margem bruta unitária permite ao produtor comparar seu resultado com outras propriedades. A margem bruta igual a zero indica que a propriedade consegue saldar todo o seu custo operacional efetivo (custeio), porém não possui sobras para pagamento de depreciação de lavouras, máquinas, equipamentos e benfeitorias e também o pró-labore do empresário. Se a empresa mantiver este resultado, no médio prazo a sua atividade estará comprometida.';
        this.indicadores.mbu.fazendeiro=6;
        this.indicadores.mbu.status=2;
      }
      if(this.indicadores.mbu.value>0){
        this.indicadores.mbu.help = 'A margem bruta unitária permite ao produtor comparar seu resultado com outras propriedades. A propriedade consegue pagar todo o custo operacional efetivo (custeio) e ainda tem sobras para saldar parte ou a totalidade dos custos fixos. No curto prazo se mantém na atividade, mas para melhor avaliação, deve-se avançar para a análise da margem líquida unitária.';
        this.indicadores.mbu.fazendeiro=4;
        this.indicadores.mbu.status=3;
      }

      if(this.indicadores.mbap.value<0){
        this.indicadores.mbap.help = 'A margem bruta por área permite ao produtor avaliar quanto de renda está sobrando no seu bolso após pagar os custos diretos da atividade por hectare. Com isso, é possível comparar, por exemplo, a atividade cafeeira com um possível arrendamento da área utilizada. A margem bruta menor que zero indica que o produtor não está pagando seus custos de desembolso direto (custeio). Em curto prazo a atividade não sobrevive, portanto, se continuar com este resultado, é melhor parar com a atividade.';
        this.indicadores.mbap.fazendeiro=1;
        this.indicadores.mbap.status=1;
      }
      if(this.indicadores.mbap.value==0){
        this.indicadores.mbap.help = 'A margem bruta por área permite ao produtor avaliar quanto de renda está sobrando no seu bolso após pagar os custos diretos da atividade por hectare. Com isso, é possível comparar, por exemplo, a atividade cafeeira com um possível arrendamento da área utilizada. A margem bruta igual a zero indica que a propriedade consegue saldar todo o seu custo operacional efetivo (custeio), porém não possui sobras para pagamento de depreciação de lavouras, máquinas, equipamentos e benfeitorias e também o pró-labore do empresário. Se a empresa mantiver este resultado, no médio prazo a sua atividade estará comprometida.';
        this.indicadores.mbap.fazendeiro=6;
        this.indicadores.mbap.status=2;
      }
      if(this.indicadores.mbap.value>0){
        this.indicadores.mbap.help = 'A margem bruta por área permite ao produtor avaliar quanto de renda está sobrando no seu bolso após pagar os custos diretos da atividade por hectare. Com isso, é possível comparar, por exemplo, a atividade cafeeira com um possível arrendamento da área utilizada. A propriedade consegue pagar todo o custo operacional efetivo (custeio) e ainda tem sobras para saldar parte ou a totalidade dos custos fixos. No curto prazo se mantém na atividade, mas para melhor avaliação, deve-se avançar para a análise da margem líquida por área.';
        this.indicadores.mbap.fazendeiro=4;
        this.indicadores.mbap.status=3;
      }

      if(this.indicadores.mbu.value>0 && this.indicadores.mlu.value<0){
        this.indicadores.mlu.help = 'A margem líquida unitária permite ao produtor comparar seu resultado com outras propriedades. Com a margem líquida menor que zero, o produtor está descapitalizando. Consegue arcar com os custos de desembolso direto e somente parte dos custos fixos. Caso o resultado continuar desta forma, no médio prazo haverá um empobrecimento do produtor e ele poderá deixar a atividade.';
        this.indicadores.mlu.fazendeiro=1;
        this.indicadores.mlu.status=1;
      }
      if(this.indicadores.mlu.value==0){
        this.indicadores.mlu.help = 'A margem líquida unitária permite ao produtor comparar seu resultado com outras propriedades. Com a margem líquida igual a zero, a propriedade consegue saldar todo o custo operacional total (custeio + depreciações + pró-labore), porém não possui sobras para pagamento do custo de oportunidade sobre o capital investido na atividade. Com este resultado a empresa se mantém na atividade no médio prazo, porém sem atratividade econômica.';
        this.indicadores.mlu.fazendeiro=6;
        this.indicadores.mlu.status=2;
      }
      if(this.indicadores.mlu.value>0){
        this.indicadores.mlu.help = 'A margem líquida unitária permite ao produtor comparar seu resultado com outras propriedades. Com a margem líquida maior que zero, o produtor paga todo o custo operacional total e também parte ou a totalidade do custo de oportunidade sobre o capital investido na atividade. Deve-se avançar para a análise de Lucro para uma melhor avaliação';
        this.indicadores.mlu.fazendeiro=4;
        this.indicadores.mlu.status=3;
      }

      if(this.indicadores.mbap.value>0 && this.indicadores.mlap.value<0){
        this.indicadores.mlap.help = 'A margem líquida por área demonstra quanto de capital sobra ao bolso do produtor após pagar os custos diretos e parte dos custos fixos por hectare utilizado na propriedade para a atividade cafeeira. Este indicador permite avaliar a eficiência de utilização do tamanho da área para gerar dinheiro para o produtor e compará-la com outras atividades. Com a margem líquida menor que zero, o produtor está descapitalizando. Consegue arcar com os custos de desembolso direto e somente parte dos custos fixos. Caso o resultado continuar desta forma, no médio prazo haverá um empobrecimento do produtor e ele poderá deixar a atividade.';
        this.indicadores.mlap.fazendeiro=1;
        this.indicadores.mlap.status=1;
      }
      if(this.indicadores.mlap.value==0){
        this.indicadores.mlap.help = 'A margem líquida por área demonstra quanto de capital sobra ao bolso do produtor após pagar os custos diretos e parte dos custos fixos por hectare utilizado na propriedade para a atividade cafeeira. Este indicador permite avaliar a eficiência de utilização do tamanho da área para gerar dinheiro para o produtor e compará-la com outras atividades. Com a margem líquida igual a zero, a propriedade consegue saldar todo o custo operacional total (custeio + depreciações + pró-labore), porém não possui sobras para pagamento do custo de oportunidade sobre o capital investido na atividade. Com este resultado a empresa se mantém na atividade no médio prazo, porém sem atratividade econômica.';
        this.indicadores.mlap.fazendeiro=6;
        this.indicadores.mlap.status=2;
      }
      if(this.indicadores.mlap.value>0){
        this.indicadores.mlap.help = 'A margem líquida por área demonstra quanto de capital sobra ao bolso do produtor após pagar os custos diretos e parte dos custos fixos por hectare utilizado na propriedade para a atividade cafeeira. Este indicador permite avaliar a eficiência de utilização do tamanho da área para gerar dinheiro para o produtor e compará-la com outras atividades. Com a margem líquida maior que zero, o produtor paga todo o custo operacional total e também parte ou a totalidade do custo de oportunidade sobre o capital investido na atividade. Deve-se avançar para a análise de Lucro para uma melhor avaliação';
        this.indicadores.mlap.fazendeiro=4;
        this.indicadores.mlap.status=3;
      }

      if(this.indicadores.mlu.value>0 && this.indicadores.lucrou.value<0){
        this.indicadores.lucrou.help = 'O lucro unitário permite ao produtor comparar o seu indicador com outras propriedades na atividade cafeeira. Com o lucro unitário menor que zero, o produtor paga todo seu custo operacional total, mas em um valor que proporcionou baixa atratividade econômica para a atividade. No longo prazo a atividade poderá ser comprometida pela baixa capacidade de investimento.';
        this.indicadores.lucrou.fazendeiro=1;
        this.indicadores.lucrou.status=1;
      }
      if(this.indicadores.lucrou.value==0){
        this.indicadores.lucrou.help = 'O lucro unitário permite ao produtor comparar o seu indicador com outras propriedades na atividade cafeeira. Com o lucro unitário igual a zero, a atividade cafeeira possui lucro normal. A atividade está no ponto de cobertura total, ou seja, paga todo seu custo de desembolso direto (custeio) e todos seus custos fixos, porém deve-se focar no aumento do lucro e aumentar a atratividade do empreendimento, garantindo o crescimento da atividade.';
        this.indicadores.lucrou.fazendeiro=6;
        this.indicadores.lucrou.status=2;
      }
      if(this.indicadores.lucrou.value>0){
        this.indicadores.lucrou.help = 'O lucro unitário permite ao produtor comparar o seu indicador com outras propriedades na atividade cafeeira. Com o lucro unitário maior que zero, o produtor paga todos os recursos aplicados na atividade e proporciona uma remuneração superior às alternativas de investimento, além de garantir que parte desse lucro poderá ser reinvestido na atividade, garantindo sua competitividade no longo prazo. A atividade cafeeira possui lucro supernormal. ';
        this.indicadores.lucrou.fazendeiro=4;
        this.indicadores.lucrou.status=3;
      }

      if(this.indicadores.mlap.value>0 && this.indicadores.lucroap.value<0){
        this.indicadores.lucroap.help = 'O lucro por área permite a avaliação do produtor do quanto de renda sobrou após pagar todos os custos da atividade por área utilizada. Sendo assim, é possível avaliar a eficiência do uso da área pela atividade cafeeira em gerar lucro. Com o lucro menor que zero, o produtor paga todo seu custo operacional total, mas em um valor que proporcionou baixa atratividade econômica para a atividade. No longo prazo a atividade poderá ser comprometida pela baixa capacidade de investimento.';
        this.indicadores.lucroap.fazendeiro=1;
        this.indicadores.lucroap.status=1;
      }
      if(this.indicadores.lucroap.value==0){
        this.indicadores.lucroap.help = 'O lucro por área permite a avaliação do produtor do quanto de renda sobrou após pagar todos os custos da atividade por área utilizada. Sendo assim, é possível avaliar a eficiência do uso da área pela atividade cafeeira em gerar lucro. Com o lucro igual a zero, a atividade cafeeira possui lucro normal. A atividade está no ponto de cobertura total, ou seja, paga todo seu custo de desembolso direto (custeio) e todos seus custos fixos, porém deve-se focar no aumento do lucro e aumentar a atratividade do empreendimento, garantindo o crescimento da atividade.';
        this.indicadores.lucroap.fazendeiro=6;
        this.indicadores.lucroap.status=2;
      }
      if(this.indicadores.lucroap.value>0){
        this.indicadores.lucroap.help = 'O lucro por área permite a avaliação do produtor do quanto de renda sobrou após pagar todos os custos da atividade por área utilizada. Sendo assim, é possível avaliar a eficiência do uso da área pela atividade cafeeira em gerar lucro. Com o lucro maior que zero, o produtor paga todos os recursos aplicados na atividade e proporciona uma remuneração superior às alternativas de investimento, além de garantir que parte desse lucro poderá ser reinvestido na atividade, garantindo sua competitividade no longo prazo. A atividade cafeeira possui lucro supernormal. ';
        this.indicadores.lucroap.fazendeiro=4;
        this.indicadores.lucroap.status=3;
      }

      this.indicadores.aplantada.help = 'Área destinada para a atividade cafeeira. No caso de duas atividades na mesma propriedade, deve-se realizar uma divisão das áreas para cada atividade.';
      this.indicadores.producao.help = 'Total de volume de sacas de café produzido na safra analisada';
      this.indicadores.ppaplantada.help = 'Representa a produtividade das lavouras em produção';
      this.indicadores.rendabruta.help = 'Soma da venda de café, venda do café escolha e de todas as outras rendas originadas da atividade cafeeira no período de uma safra ou mais.';
      this.indicadores.pcv.help = 'Média do preço do café da safra comercializado.';

      if(this.indicadores.bencusto.value<1){
        this.indicadores.bencusto.help = 'Quando a relação benefício/custo é menor que 1, significa que o custo é maior que a renda obtida na atividade cafeeira. Este resultado mostra o quanto você está perdendo a cada R$1,00 investido na atividade. ';
        this.indicadores.bencusto.fazendeiro=5;
        this.indicadores.bencusto.status=1;
      }
      if(this.indicadores.bencusto.value>=1){
        this.indicadores.bencusto.help = 'Quando a relação benefício/custo é maior que 1, significa que o custo é menor que a renda obtida na atividade. Este resultado mostra o quanto você está ganhando a cada R$1,00 investido na atividade. Quanto maior a relação benefício custo, melhor, uma vez que ao conseguir cobrir todos os custos com a renda, você se mantêm na atividade de forma viável e atrativa economicamente.';
        this.indicadores.bencusto.fazendeiro=2;
        this.indicadores.bencusto.status=3;
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

                // alteracao proposta dia 31/07
                thisindicadores.lucrativ.value = (thisindicadores.ml.value / thisindicadores.rendabruta.value) * 100;
                IndicadoresTalhao.lucrativ  = (IndicadoresTalhao.ml / IndicadoresTalhao.rendabruta) * 100;
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
  color: #FF0000;
}

.status2 {
  color: #FFFF00;
}

.status3 {
  color: #32CD32;
}

.status4 {
  color: black;
}
</style>
