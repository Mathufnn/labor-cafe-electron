<template>
  <v-card>
    <v-card-title class="headline"  style="background-color:#A5D6A7;">
      <v-layout align-center justify-space-between row fill-height >
        <v-flex xs8 >
            Indicadores da fazenda
        </v-flex>
        <v-flex xs4 style="text-align:center;">
          <v-tooltip top>
            <v-btn icon slot="activator" @click="export_dialog = true" color="primary"> <v-icon>publish</v-icon></v-btn>
            <span>Exportar dados</span>
          </v-tooltip><br /><br />
          <v-tooltip left style="text-align:center; font-size:15px; line-height:17px;">
            <div slot="activator">
            <center><span style="font-size:15px;"><b>LEGENDA</b></span><br />
            <table>
            <tr><td><span><v-icon style="color:#32CD32; ">info</v-icon></span></td> <td>Indicador favorável</td></tr>
            <tr><td><span><v-icon style="color:#FFFF00;">info</v-icon></span></td> <td>Indicador de alerta</td></tr>
            <tr><td><span ><v-icon style="color:#FF0000;">info</v-icon></span></td> <td>Indicador desfavorável</td></tr>
            <tr><td><span><v-icon style="color:black;">info</v-icon></span></td> <td>Indicador descritivo</td></tr>
            </table>
            </center>
            </div>
            <span>Clicando sobre o ícone 'i' em um indicador específico você obtém a interpretação detalhada desse indicador.</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout>
      <v-container row wrap justify-space-around>
        <v-layout row wrap class="text-xs-center">
          <v-flex class="text-xs-left" style="margin-bottom:35px;" xs12>
            <v-card style="padding-left:25px; padding-right:25px;">
              <v-layout row wrap >
                <v-flex xs12><b>FILTRAR INDICADORES</b></v-flex>
                <v-flex xs4 style="padding-top:30px;"><v-checkbox
                              v-model="filt_tec"
                              label="Indicadores Técnicos"
                              hide-details
                            ></v-checkbox></v-flex>
                <v-flex xs4 style="padding-top:30px;"><v-checkbox
                              v-model="filt_eco"
                              label="Indicadores Econômicos"
                              hide-details
                            ></v-checkbox></v-flex>
                <v-flex xs4><v-text-field
                            v-model="filt_nome"
                            label="Filtrar por nome"
                            hint="Filtrar os indicadores por nome"
                          ></v-text-field></v-flex>
              </v-layout>

            </v-card>
          </v-flex>

          <v-flex xs4 v-for="i in indicadores" v-if="(String(filt_nome).length==0 && ((!filt_tec && !filt_eco) || (i.categoria==1 && filt_tec) || (i.categoria==2 && filt_eco))) || (String(filt_nome).length!=0 && String(i.text).toLowerCase().includes(String(filt_nome).toLowerCase()))" v-bind:key="i.text">
            <v-card style="margin-bottom:20px;" @mouseover.native="fazendeiro_muda(i.fazendeiro,true)" @mouseleave.native="fazendeiro_muda(i.fazendeiro,false)">
              <v-layout >
                <v-flex xs11>
                  <b>{{i.text}}</b><br />
                  <span class="indicator">{{formatN(i.value, i.decimals)}}</span> <span class="unidade"><b>{{i.unidade}}</b></span>
                </v-flex>
                <v-flex xs1>
                  <v-btn v-if="i.help!=''" flat icon v-on:click="dialog = true, msg=i.help, msg_t=i.text, submsg=i.subhelp, overtoggle(1) " :class="'status'+i.status" style="text-align:right; float:right; margin:0;"><v-icon>info</v-icon></v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout><!--
    <v-dialog max-width="700" style="height:10px;" hide-overlay="true" v-model="dialog">
      <div style="position: relative;">
        <div id="partezinha"></div>
        <v-card id="dialog_interp">
          <v-card-text>
            <b>{{msg}}</b>
          </v-card-text>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">FECHAR</v-btn>
        </v-card>
      </div>
    </v-dialog> -->
    <div id="dialog_p" v-if="dialog" :style="'background: url('+dialog_partezinha+')  no-repeat left 9px bottom 10px; border-right: 4px solid transparent;'">
      <div id="dialog_s">
          <v-btn small icon color="green darken-1" style="float:right; margin:-15px;" flat="flat" @click="dialog = false, detalha = false, overtoggle(0)"><v-icon>close</v-icon></v-btn><br />
            <center><b>{{msg_t}}</b></center>
            <br />
            <br />
            {{msg}}
            <br />
            <br />
            <center>
              <v-btn v-if="!detalha && submsg!=''" color="" @click="detalha = true">[+] INTERPRETAÇÃO DETALHADA</v-btn>
              <v-btn v-if="detalha && submsg!=''" color="" @click="detalha = false">[-] INTERPRETAÇÃO DETALHADA</v-btn>
            </center>
            <br />
            <v-card v-if="detalha">
              <v-card-text>
                {{submsg}}
              </v-card-text>
            </v-card>
          <v-btn color="white" style="float:right"  @click="dialog = false, detalha = false, overtoggle(0)">FECHAR</v-btn>

      </div>
    </div>
    <v-dialog max-width="400" v-model="export_dialog" hide-overlay="true">
      <v-card>
        <v-card-text>
          <b>Selecione o formato para qual deseja exportar esses dados:</b><br /><br />
          <v-layout align-center justify-space-between row fill-height>
            <v-flex v-if="!exporting" xs6 class="text-xs-center">
              <v-btn color="primary" big  @click="exportdata(1)">PDF</v-btn>
            </v-flex>
            <v-flex v-if="!exporting" xs6 class="text-xs-center">
              <v-btn color="primary" big @click="exportdata(2)">Excel</v-btn>
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
import XLSX from 'XLSX'

export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/safra', help: '', subhelp: '', categoria: 2},
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/safra', help: '', subhelp: '', categoria: 2},
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/safra', help: '', subhelp: '', categoria: 2},
        ct: { text: 'CUSTO TOTAL (CT)', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/safra', help: '', subhelp: '', categoria: 2},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2},
        producao: { text: 'PRODUÇÃO',decimals: 0, value: 0, status:4, fazendeiro:3, unidade: 'Sacas', help: '', subhelp: '', categoria: 1},
        aplantada: { text: 'ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'Ha', help: '', subhelp: '', categoria: 1},
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'Sc/Ha', help: '', subhelp: '', categoria: 1 },
        coeap: { text: 'COE POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Ha', help: '', subhelp: '', categoria: 2},
        coeu: { text: 'COE POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2 },
        cotap: { text: 'COT POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Ha', help: '', subhelp: '', categoria: 2},
        cotu: { text: 'COT POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2},
        ctap: { text: 'CT POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Ha', help: '', subhelp: '', categoria: 2},
        ctu: { text: 'CT POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2},
        mb: { text: 'MARGEM BRUTA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/safra', help: '', subhelp: '', categoria: 2 },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Ha', help: '', subhelp: '', categoria: 2 },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2},
        ml: { text: 'MARGEM LÍQUIDA',decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/safra', help: '', subhelp: '', categoria: 2 },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Ha', help: '', subhelp: '', categoria: 2},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2 },
        lucro: { text: 'LUCRO',decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/safra', help: '', subhelp: '', categoria: 2},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Ha', help: '', subhelp: '', categoria: 2},
        lucrou: { text: 'LUCRO POR UNIDADE', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2 },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',decimals: 2, value: 0, status:4, fazendeiro:3, unidade: '%', help: '', subhelp: '', categoria: 2 },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: '%', help: '', subhelp: '', categoria: 2 },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$', help: '', subhelp: '', categoria: 2},
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2},
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: 'R$/Sc', help: '', subhelp: '', categoria: 2 },
        taxagiro: { text: 'TAXA DE GIRO', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: '%a.a', help: '', subhelp: '', categoria: 2},
        lucrativ: { text: 'LUCRATIVIDADE', decimals: 2, value: 0, status:4, fazendeiro:3, unidade: '%a.a', help: '', subhelp: '', categoria: 2}
      },
      dialog: false,
      export_dialog: false,
      exporting: false,
      detalha:false,
      msg: '',
      msg_t: '',
      submsg: '',
      dialog_partezinha: 'static/fala.png',
      nome_fazenda: '',
      filt_tec:false,
      filt_eco:false,
      filt_nome: ''
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
      if(vr=='-') return '-';
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
    overtoggle(estado){
      this.$root.$emit('overlay_toggle', {estado});
    },
    exportdata(type){
        //=============================================================  csv
      if(type==2){
        remote.dialog.showSaveDialog({title: 'Selecione local para salvar o arquivo xlsx',filters:[{name: 'Arquivo XLSX', extensions: ['xlsx']}]}, (filename) => {
          if(typeof filename == 'undefined') return;
          //this.loading = true;
          let data = [];
          let count = 1;
          Object.keys(this.indicadores).forEach(key => {
            //this.indicadores[key].help = 'Para visualizar as interpretações é preciso selecionar pelo menos 1 safra para geração de indicadores.';
            data.push({'ORDEM': count,
            'INDICADORES': this.indicadores[key].text,
            'UNIDADE': this.indicadores[key].unidade,
            'VALOR': this.formatN(this.indicadores[key].value)});
            count++;
          });

          let ws = XLSX.utils.json_to_sheet(data);
          let wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Indicadores");

          try {
            XLSX.writeFileAsync(filename, wb, (err)=>{
              if(err) remote.dialog.showErrorBox('Erro ao gravar o arquivo!', 'Não foi possível criar o arquivo no local.');
              else remote.dialog.showMessageBox({type:'info', title:'Arquivo XLSX criado com sucesso!', message: 'O arquivo XLSX foi salvo no local escolhido com sucesso!'});
            });
          }
          catch (e){
            remote.dialog.showErrorBox('Erro ao gravar o arquivo!', 'Não foi possível criar o arquivo no local.');
          }

        });
      }

      //============================================================= PDF

      else if(type==1){
        let data = `<style>
        table {
          border-collapse: collapse;
          width:100%;
        }

        table, th, td {
          border: 1px solid black;
        }
        th,thead {
          text-align:center;
          height:35px;
        }
        td {
          height:26px;
        }
        </style>`;

        data += `<body style="font-family: Arial, Helvetica, sans-serif; margin:20px; line-height:15px;">
          <h1>Fazenda ${this.nome_fazenda}</h1>
          <b>INDICADORES</b><br /><br />
          <table>
            <thead>
              <tr><th>#</th><th>INDICADOR</th><th>UNIDADE</th><th>VALOR</th></tr>
            </thead>
            <tbody>`;

        let count=1;
        Object.keys(this.indicadores).forEach(key => {
          let tmp = this.formatN(this.indicadores[key].value, this.indicadores[key].decimals);
          data += `<tr>
            <td>${count}</td>
            <td>${this.indicadores[key].text}</td>
            <td>${this.indicadores[key].unidade}</td>
            <td>${tmp}</td>
          </tr>`;
          count++;
        });

        data += `</tbody></table>
        </body>`;
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
        this.indicadores.mb.help='Atenção! O Custo Operacional Efetivo (COE) está maior que a Renda Bruta. Ponto de fechamento da empresa!';
        this.indicadores.mb.subhelp='Atenção! Os custos de desembolso direto (pagamento de fertilizantes, energia, mão de obra, combustíveis, etc.) estão maiores que a renda obtida na atividade. Em curto prazo a atividade não sobrevive, portanto, ajuste seus desembolsos de acordo com a renda obtida, pois se continuar com este resultado, é melhor parar com a atividade.';
        this.indicadores.mb.status=1;
        this.indicadores.mb.fazendeiro=1;
      }
      if(this.indicadores.mb.value==0){
        this.indicadores.mb.help='Atenção! O Custo Operacional Efetivo (COE) é igual a Renda Bruta. Não há sobras monetárias para a empresa!';
        this.indicadores.mb.subhelp='Com a renda obtida na atividade, você consegue saldar todo o Custo Operacional Efetivo (pagamento de fertilizantes, energia, mão de obra, defensivos, etc.), porém não sobra dinheiro para cobrir os custos de depreciação das máquinas, equipamentos e benfeitorias, bem como o seu pró-labore (custo de oportunidade do trabalho desempenhado pelo empresário rural). Se a empresa mantiver este resultado, no médio prazo a atividade estará comprometida, pois não haverá dinheiro para repor bens sucateados e não haverá remuneração pelo seu trabalho na propriedade.';
        this.indicadores.mb.status=2;
        this.indicadores.mb.fazendeiro=6;
      }
      if(this.indicadores.mb.value>0){
         this.indicadores.mb.help='A Renda Bruta é maior que o Custo Operacional Efetivo (COE). Paga-se o COE e devemos avançar para a análise de Margem Líquida para avaliar se paga todas as depreciações e custo de oportunidade da mão de obra familiar!';
         this.indicadores.mb.subhelp='Com a renda obtida na atividade, você consegue saldar todo o Custo Operacional Efetivo (pagamento de fertilizantes, energia, mão de obra, defensivos, etc.) e ainda há sobras para saldar parte (ou a totalidade dos custos fixos). Nesta situação, no curto prazo você se mantém na atividade, mas para melhor avaliação, avance para a análise da margem líquida, pois ela mostrará se você consegue pagar todo o custo fixo, ou apenas parte dele.';
         this.indicadores.mb.status=3;
         this.indicadores.mb.fazendeiro=4;
       }

      if(this.indicadores.ml.value<0){
        this.indicadores.ml.help='Atenção! O Custo Operacional Total (COT) está maior que a Renda Bruta. A empresa está descapitalizando!';
        this.indicadores.ml.subhelp='Você está se descapitalizando com o passar do tempo, uma vez que a Renda obtida não é suficiente para saldar todos os custos com depreciações e remuneração da mão de obra familiar (custos fixos). Se continuar com este resultado, você estará empobrecendo a cada dia e no médio prazo será forçado a deixar a atividade, uma vez que não terá capital para repor os bens sucateados e indispensáveis para produção.';
        this.indicadores.ml.status=1;
        this.indicadores.ml.fazendeiro=1;
      }
      if(this.indicadores.ml.value==0){
        this.indicadores.ml.help = 'Atenção! O Custo Operacional Total (COT) é igual a Renda Bruta. Empresa sustentável, porém sem atratividade econômica!';
        this.indicadores.ml.subhelp='Com a renda obtida na atividade, você consegue saldar todo o custo operacional total (desembolso direto + depreciações + pró-labore), porém não possui sobras equivalentes a remuneração de todo o capital investido na atividade quando aplicado em um fundo de investimento, como a poupança. Com este resultado você se mantém na atividade, porém sem atratividade econômica.';
        this.indicadores.ml.status=2;
        this.indicadores.ml.fazendeiro=6;
      }
      if(this.indicadores.ml.value>0){
        this.indicadores.ml.help = 'A Renda Bruta é maior que o Custo Operacional Total (COT). Paga-se todo o custeio, depreciações e custo de oportunidade da mão de obra familiar!';
        this.indicadores.ml.subhelp='Com a renda obtida na atividade, você consegue saldar todo o custo operacional total e também parte (ou a totalidade) do custo de oportunidade sobre o capital investido na atividade. Para melhor avaliação, avance para a análise do lucro, pois ele mostrará se você tem saldo equivalente a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança, ou apenas parte dele. ';
        this.indicadores.ml.status=3;
        this.indicadores.ml.fazendeiro=4;
      }

      if(this.indicadores.lucro.value<0){
        this.indicadores.lucro.help = 'Atenção! O Custo Total (CT) está maior que a Renda Bruta. A empresa paga todo o COT, porém não é atrativa economicamente!';
        this.indicadores.lucro.subhelp = 'Sua atividade não é atrativa economicamente, uma vez que não há saldo equivalente a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança . No longo prazo a atividade poderá ser comprometida pela baixa capacidade de investimento na mesma.';
        this.indicadores.lucro.status=1;
        this.indicadores.lucro.fazendeiro=1;
      }
      if(this.indicadores.lucro.value==0){
        this.indicadores.lucro.help = 'O Custo Total (CT) é igual a Renda Bruta. Paga-se todo o CT. Lucro normal!';
        this.indicadores.lucro.subhelp = 'A sua atividade apresenta lucro normal. A atividade está no ponto de cobertura total, ou seja, paga todo seu custo de desembolso direto (a remuneração do capital investido na atividade quando aplicado em um fundo de investimento, como a poupança) e todos os seus custos fixos (depreciações, pró-labore e remunerações), porém você deve focar no aumento do lucro para aumentar a atratividade do empreendimento, garantindo assim o seu crescimento na atividade.';
        this.indicadores.lucro.status=2;
        this.indicadores.lucro.fazendeiro=6;
      }
      if(this.indicadores.lucro.value>0){
        this.indicadores.lucro.help = 'A Renda Bruta é maior que o Custo Total (CT). Paga-se todo o CT. Lucro supernormal!';
        this.indicadores.lucro.subhelp = 'A sua atividade apresenta lucro supernormal. A renda obtida na atividade é suficiente para pagar todos custos gerados e ainda proporciona uma remuneração superior às alternativas de investimento. Isso garante que parte do lucro possa ser reinvestido na atividade, garantindo sua competitividade no longo prazo. ';
        this.indicadores.lucro.status=3;
        this.indicadores.lucro.fazendeiro=4;
      }

      this.indicadores.coe.help = 'COE, é o custo referente aos desembolsos diretos de capital (pagamento de fertilizantes, energia, mão de obra, defensivos, etc.) destinados a toda atividade cafeeira. Por via de regra, são aqueles que variam de acordo com a produção, podendo aumentar ou diminuir.';
      this.indicadores.cot.help = 'COT, engloba os custos diretos e parte dos custos fixos da atividade. É o somatório do COE, custo com mão de obra familiar e depreciações.';
      this.indicadores.ct.help = 'CT, é o custo referente ao COT + o custo de oportunidade sobre o capital investido na atividade. Nele estão contemplados todos os custos gerados na atividade.';

      if(this.indicadores.capitalest.value>=350){ // vermelho
        this.indicadores.capitalest.help='Sua propriedade não possui eficiência na utilização dos investimentos para produção de café, excluindo a terra.';
        this.indicadores.capitalest.subhelp='Mede a eficiência no uso de todo capital imobilizado, excluindo a terra nua, para produzir 1 saca de café. É a capacidade e eficiência que você possui em transformar patrimônio em produção de café. Quanto menor for o capital empatado a cada saca de café, maior é a sua eficiência no uso dos recursos da propriedade. Uma propriedade considerada eficiente é que possui R$ 350,00 ou menos de estoque de capital empatado por saca de café.';
        this.indicadores.capitalest.status=1;
        this.indicadores.capitalest.fazendeiro=1;
      }
      else{                                      // verde
        this.indicadores.capitalest.help='Sua propriedade é eficiente na utilização dos recursos para produção de café, excluindo a terra.';
        this.indicadores.capitalest.subhelp='Mede a eficiência no uso de todo capital imobilizado, excluindo a terra nua, para produzir 1 saca de café. É a capacidade e eficiência que você possui em transformar patrimônio em produção de café. Quanto menor for o capital empatado a cada saca de café, maior é a sua eficiência no uso dos recursos da propriedade. Uma propriedade considerada eficiente é que possui R$ 350,00 ou menos de estoque de capital empatado por saca de café.';
        this.indicadores.capitalest.status=3;
        this.indicadores.capitalest.fazendeiro=2;
      }

      if(this.indicadores.capitalct.value>=800){ // vermelho
        this.indicadores.capitalct.help='Sua propriedade não possui eficiência na utilização dos investimentos para produção de café, excluindo a terra.';
        this.indicadores.capitalct.subhelp='Mede a eficiência no uso de todo capital imobilizado, incluindo todo o valor da terra nua, para produzir 1 saca de café. É a capacidade e eficiência que você possui em transformar todo o patrimônio em produção de café. Quanto menor for o capital empatado a cada saca de café, maior é a sua eficiência no uso dos recursos da propriedade. Uma propriedade considerada eficiente é que possui R$ 800,00 ou menos de estoque de capital empatado por saca de café.';
        this.indicadores.capitalct.status=1;
        this.indicadores.capitalct.fazendeiro=1;
      }
      else{                                      // verde
        this.indicadores.capitalct.help='Sua propriedade é eficiente na utilização dos recursos para produção de café, excluindo a terra.';
        this.indicadores.capitalct.subhelp='Mede a eficiência no uso de todo capital imobilizado, incluindo todo o valor da terra nua, para produzir 1 saca de café. É a capacidade e eficiência que você possui em transformar todo o patrimônio em produção de café. Quanto menor for o capital empatado a cada saca de café, maior é a sua eficiência no uso dos recursos da propriedade. Uma propriedade considerada eficiente é que possui R$ 800,00 ou menos de estoque de capital empatado por saca de café.';
        this.indicadores.capitalct.status=3;
        this.indicadores.capitalct.fazendeiro=2;
      }

      if(this.indicadores.lucrativ.value>=20){ // verde
        this.indicadores.lucrativ.help = 'Sua propriedade possui baixo risco na atividade cafeeira.';
        this.indicadores.lucrativ.subhelp = 'A lucratividade mede o quanto você ganhou sobre as vendas realizadas no ano. A sua interpretação está ligada ao risco de ter prejuízos com a atividade. Quanto menor a lucratividade, maior o risco de prejuízos. Quando igual ou maior que 20%, significa que você suporta uma redução de 20% no volume de café produzido ou uma redução de 20% no preço recebido pela saca de café ou até mesmo um aumento de 20% no custo operacional total de produção. Este indicador representa o seu fôlego financeiro!';
        this.indicadores.lucrativ.status=3;
        this.indicadores.lucrativ.fazendeiro=2;
      }
      else{                                   // vermelho
        this.indicadores.lucrativ.help = 'Sua propriedade possui alto risco na atividade cafeeira.';
        this.indicadores.lucrativ.subhelp = 'A lucratividade mede o quanto você ganhou sobre as vendas realizadas no ano. A sua interpretação está ligada ao risco de ter prejuízos com a atividade. Quanto menor a lucratividade, maior o risco de redução do lucro. Quando menor que 20%, significa que você suporta poucas oscilações negativas no volume de café produzido, no preço da saca de café e/ou no custo de produção. A porcentagem da lucratividade demonstra qual a redução no volume produzido ou qual a redução no preço recebido pela saca de café ou até mesmo qual o aumento no custo operacional total de produção você suporta. Este indicador representa o seu fôlego financeiro!';
        this.indicadores.lucrativ.status=1;
        this.indicadores.lucrativ.fazendeiro=5;
      }

      if(this.indicadores.taxagiro.value>=50){
        this.indicadores.taxagiro.help = 'Sua propriedade possui eficiência para gerar receita de acordo com o seu patrimônio.';
        this.indicadores.taxagiro.subhelp = 'Representa a sua capacidade em transformar patrimônio em receita bruta. Deve-se buscar no mínimo o resultado de 50% para este indicador, ou seja, nesta situação a receita bruta alcançada com a atividade se equivale a metade do seu patrimônio, o que proporciona giro de capital eficiente para desenvolver a sua atividade.';
        this.indicadores.taxagiro.status=3;
        this.indicadores.taxagiro.fazendeiro=2;
      }
      else{
        this.indicadores.taxagiro.help = 'Sua propriedade não é eficiente para gerar receita de acordo com o seu patrimônio.';
        this.indicadores.taxagiro.subhelp = 'Representa a sua capacidade em transformar patrimônio em receita bruta. Deve-se buscar no mínimo 50% para este indicador, ou seja, nesta situação a receita bruta alcançada com a atividade se equivale a metade do seu patrimônio, o que proporciona giro de capital eficiente para desenvolver a sua atividade.';
        this.indicadores.taxagiro.status=1;
        this.indicadores.taxagiro.fazendeiro=5;
      }

      if(this.indicadores.trcct.value>=10){ // verde
        this.indicadores.trcct.help = 'Sua propriedade é viável e atrativa economicamente.';
        this.indicadores.trcct.subhelp = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 10% ao ano.';
        this.indicadores.trcct.status=3;
        this.indicadores.trcct.fazendeiro=4;
      }
      if(this.indicadores.trcct.value<10 && this.indicadores.trcct.value>0){ // amarelo
        this.indicadores.trcct.help = 'Sua propriedade é viável, porém não é atrativa economicamente.';
        this.indicadores.trcct.subhelp = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 10% ao ano.';
        this.indicadores.trcct.status=2;
        this.indicadores.trcct.fazendeiro=6;
      }
      if(this.indicadores.trcct.value<0){ // vermelho
        this.indicadores.trcct.help = 'Sua propriedade não é viável e não é atrativa economicamente.';
        this.indicadores.trcct.subhelp = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 10% ao ano.';
        this.indicadores.trcct.status=1;
        this.indicadores.trcct.fazendeiro=1;
        this.indicadores.trcct.value='-';
      }

      if(this.indicadores.trcst.value>=15){ // verde
        this.indicadores.trcst.help = 'Sua propriedade é viável e atrativa economicamente.';
        this.indicadores.trcst.subhelp = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 15% ao ano.';
        this.indicadores.trcst.status=3;
        this.indicadores.trcst.fazendeiro=4;
      }
      if(this.indicadores.trcst.value<15){ // amarelo
        this.indicadores.trcst.help = 'Sua propriedade é viável, porém não é atrativa economicamente.';
        this.indicadores.trcst.subhelp = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 15% ao ano.';
        this.indicadores.trcst.status=2;
        this.indicadores.trcst.fazendeiro=6;
      }
      if(this.indicadores.trcst.value<0){ // vermelho
        this.indicadores.trcst.help = 'Sua propriedade não é viável e não é atrativa economicamente.';
        this.indicadores.trcst.subhelp = 'O seu resultado se equivale a quanto de todo o capital imobilizado na atividade está gerando de margem líquida e retornando para o bolso do produtor. Este resultado está ligado com a eficiência no uso do capital e a atratividade econômica do empreendimento. Para a atividade cafeeira consideramos como satisfatório um resultado de no mímimo 15% ao ano.';
        this.indicadores.trcst.status=1;
        this.indicadores.trcst.fazendeiro=1;
        this.indicadores.trcst.value='-';
      }

      if(this.indicadores.coeu.value>=300){ // vermelho
        this.indicadores.coeu.help = 'Sua propriedade possui o Custo Operacional Efetivo (COE) alto.';
        this.indicadores.coeu.subhelp = 'COE/unidade permite comparar os seus custos de desembolso direto com outras propriedades. O COE por saca demonstra quanto dos custos de desembolso direto (pagamento de fertilizantes, energia, defensivos, etc.) estão sendo gastos a cada saca produzida. Deve-se buscar valores menores que R$ 300,00/saca neste indicador.';
        this.indicadores.coeu.status=1;
        this.indicadores.coeu.fazendeiro=5;
      }
      else{                                // verde
        this.indicadores.coeu.help = 'Sua propriedade é eficiente na utilização dos recursos para produção de café e por isso possui Custo Operacional Efetivo (COE) equilibrado.';
        this.indicadores.coeu.subhelp = 'COE/unidade permite comparar os seus custos de desembolso direto com outras propriedades. O COE por saca demonstra quanto dos custos de desembolso direto (pagamento de fertilizantes, energia, defensivos, etc.) estão sendo gastos a cada saca produzida. Deve-se buscar valores menores que R$ 300,00/saca neste indicador.';
        this.indicadores.coeu.status=3;
        this.indicadores.coeu.fazendeiro=2;
      }

      if(this.indicadores.cotu.value>=350){ // vermelho
        this.indicadores.cotu.help = 'Sua propriedade possui o Custo Operacional Total (COT) alto.';
        this.indicadores.cotu.subhelp = 'COT/unidade, permite comparar os custos de desembolso direto e parte dos custos fixos da atividade cafeeira da propriedade com outras propriedades. Dentro dele está o COE mais os custos com mão de obra familiar e depreciações gastos para produzir 1 saca de café. Deve-se buscar valores menores que R$ 350,00/saca neste indicador.';
        this.indicadores.cotu.status=1;
        this.indicadores.cotu.fazendeiro=5;
      }
      else{                                 // verde
        this.indicadores.cotu.help = 'Sua propriedade é eficiente na utilização dos recursos para produção de café e por isso possui Custo Operacional Total (COT) equilibrado.';
        this.indicadores.cotu.subhelp = 'COT/unidade, permite comparar os custos de desembolso direto e parte dos custos fixos da atividade cafeeira da propriedade com outras propriedades. Dentro dele está o COE mais os custos com mão de obra familiar e depreciações gastos para produzir 1 saca de café. Deve-se buscar valores menores que R$ 350,00/saca neste indicador.';
        this.indicadores.cotu.status=3;
        this.indicadores.cotu.fazendeiro=2;
      }

      if(this.indicadores.ctu.value>=400){ // vermelho
        this.indicadores.ctu.help = 'Sua propriedade possui o Custo Total (CT) alto.';
        this.indicadores.ctu.subhelp = 'CT/unidade, permite comparar o seu custo referente ao COT mais o custo de oportunidade sobre o capital investido na atividade com outras propriedades. É o somatório que contempla todos os custos envolvidos na atividade cafeeira para produzir 1 saca de café. Deve-se buscar valores menores que R$ 400,00/saca neste indicador.';
        this.indicadores.ctu.status=1;
        this.indicadores.ctu.fazendeiro=5;
      }
      else{                                 // verde
        this.indicadores.ctu.help = 'Sua propriedade é eficiente na utilização dos recursos para produção de café e por isso possui Custo Total (CT) equilibrado.';
        this.indicadores.ctu.subhelp = 'CT/unidade, permite comparar o seu custo referente ao COT mais o custo de oportunidade sobre o capital investido na atividade com outras propriedades. É o somatório que contempla todos os custos envolvidos na atividade cafeeira para produzir 1 saca de café. Deve-se buscar valores menores que R$ 400,00/saca neste indicador.';
        this.indicadores.ctu.status=3;
        this.indicadores.ctu.fazendeiro=2;
      }

      this.indicadores.coeap.help = 'COE/hectare permite ao produtor comparar os seus custos de desembolso direto com outras propriedades. O COE por área demonstra quanto dos custos de desembolso direto (pagamento de fertilizantes, energia, defensivos, etc.) estão sendo gastos a cada saca de café produzida. Deve-se buscar valores menores que R$ 10.000,00/hectare neste indicador.';
      this.indicadores.cotap.help = 'COT/hectare, permite ao produtor comparar os custos de desembolso direto e parte dos custos fixos da atividade cafeeira da propriedade com outras propriedades. Dentro dele está o COE + os custos com mão de obra familiar e depreciações gastos para produzir em 1 hectare de café.';
      this.indicadores.ctap.help = 'CT/hectare, permite ao produtor comparar o seu custo referente ao COT + o custo de oportunidade sobre o capital investido na atividade com outras propriedades. É o somatório que contempla todos os custos envolvidos na atividade cafeeira para produzir em 1 hectare de café.';

      if(this.indicadores.mbu.value<0){
        this.indicadores.mbu.help='Atenção! O Custo Operacional Efetivo (COE) por saca está maior que o Preço pago pela saca de café. Ponto de fechamento da empresa!';
        this.indicadores.mbu.subhelp='A margem bruta unitária permite ao produtor comparar seu resultado com outras propriedades. A margem bruta menor que zero indica que o produtor não está pagando seus custos de desembolso direto (custeio). Em curto prazo a atividade não sobrevive, portanto, se continuar com este resultado, é melhor parar com a atividade.';
        this.indicadores.mbu.status=1;
        this.indicadores.mbu.fazendeiro=1;
      }
      if(this.indicadores.mbu.value==0){
        this.indicadores.mbu.help='Atenção! O Custo Operacional Efetivo (COE) por saca é igual ao Preço pago pela saca de café. Não há sobras monetárias para a empresa!';
        this.indicadores.mbu.subhelp='A margem bruta unitária permite ao produtor comparar seu resultado com outras propriedades. A margem bruta igual a zero indica que a propriedade consegue saldar todo o seu custo operacional efetivo (custeio), porém não possui sobras para pagamento de depreciação de lavouras, máquinas, equipamentos e benfeitorias e também o pró-labore do empresário. Se a empresa mantiver este resultado, no médio prazo a sua atividade estará comprometida.';
        this.indicadores.mbu.status=2;
        this.indicadores.mbu.fazendeiro=6;
      }
      if(this.indicadores.mbu.value>0){
        this.indicadores.mbu.help='O Preço pago pela saca de café é maior que o Custo Operacional Efetivo (COE). Paga-se o COE por saca e devemos avançar para a análise de Margem Líquida para avaliar se paga todas as depreciações e custo de oportunidade da mão de obra familiar!';
        this.indicadores.mbu.subhelp='A margem bruta unitária permite ao produtor comparar seu resultado com outras propriedades. A propriedade consegue pagar todo o custo operacional efetivo (custeio) e ainda tem sobras para saldar parte ou a totalidade dos custos fixos. No curto prazo se mantém na atividade, mas para melhor avaliação, deve-se avançar para a análise da margem líquida unitária.';
        this.indicadores.mbu.status=3;
        this.indicadores.mbu.fazendeiro=4;
      }

      if(this.indicadores.mbap.value<0){
        this.indicadores.mbap.help='Atenção! O Custo Operacional Efetivo (COE) por hectare está maior que a Renda Bruta por hectare de café em produção. Ponto de fechamento da empresa!';
        this.indicadores.mbap.subhelp='A margem bruta por área permite ao produtor avaliar quanto de renda está sobrando no seu bolso após pagar os custos diretos da atividade por hectare. Com isso, é possível comparar, por exemplo, a atividade cafeeira com um possível arrendamento da área utilizada. A margem bruta menor que zero indica que o produtor não está pagando seus custos de desembolso direto (custeio). Em curto prazo a atividade não sobrevive, portanto, se continuar com este resultado, é melhor parar com a atividade.';
        this.indicadores.mbap.status=1;
        this.indicadores.mbap.fazendeiro=1;
      }
      if(this.indicadores.mbap.value==0){
        this.indicadores.mbap.help = 'Atenção! O Custo Operacional Efetivo (COE) por hectare é igual a Renda Bruta por hectare de café em produção. Não há sobras monetárias para a empresa!';
        this.indicadores.mbap.subhelp='A margem bruta por área permite ao produtor avaliar quanto de renda está sobrando no seu bolso após pagar os custos diretos da atividade por hectare. Com isso, é possível comparar, por exemplo, a atividade cafeeira com um possível arrendamento da área utilizada. A margem bruta igual a zero indica que a propriedade consegue saldar todo o seu custo operacional efetivo (custeio), porém não possui sobras para pagamento de depreciação de lavouras, máquinas, equipamentos e benfeitorias e também o pró-labore do empresário. Se a empresa mantiver este resultado, no médio prazo a sua atividade estará comprometida.';
        this.indicadores.mbap.status=2;
        this.indicadores.mbap.fazendeiro=6;
      }
      if(this.indicadores.mbap.value>0){
        this.indicadores.mbap.help = 'A Renda Bruta por hectare de café em produção é maior que o Custo Operacional Efetivo (COE) por hectare. Paga-se o COE por hectare e devemos avançar para a análise de Margem Líquida para avaliar se paga todas as depreciações e custo de oportunidade da mão de obra familiar!';
        this.indicadores.mbap.subhelp='A margem bruta por área permite ao produtor avaliar quanto de renda está sobrando no seu bolso após pagar os custos diretos da atividade por hectare. Com isso, é possível comparar, por exemplo, a atividade cafeeira com um possível arrendamento da área utilizada. A propriedade consegue pagar todo o custo operacional efetivo (custeio) e ainda tem sobras para saldar parte ou a totalidade dos custos fixos. No curto prazo se mantém na atividade, mas para melhor avaliação, deve-se avançar para a análise da margem líquida por área.';
        this.indicadores.mbap.status=3;
        this.indicadores.mbap.fazendeiro=4;
      }

      if(this.indicadores.mlu.value<0){
        this.indicadores.mlu.help='Atenção! O Custo Operacional Total (COT) por saca está maior que o Preço pago pela saca de café. A empresa está descapitalizando!';
        this.indicadores.mlu.subhelp='A margem líquida unitária permite ao produtor comparar seu resultado com outras propriedades. Com a margem líquida menor que zero, o produtor está descapitalizando. Consegue arcar com os custos de desembolso direto e somente parte dos custos fixos. Caso o resultado continuar desta forma, no médio prazo haverá um empobrecimento do produtor e ele poderá deixar a atividade.';
        this.indicadores.mlu.status=1;
        this.indicadores.mlu.fazendeiro=1;
      }
      if(this.indicadores.mlu.value==0){
        this.indicadores.mlu.help='Atenção! O Custo Operacional Total (COT) por saca é igual ao Preço pago pela saca de café. Empresa sustentável, porém sem atratividade econômica!';
        this.indicadores.mlu.subhelp='A margem líquida unitária permite ao produtor comparar seu resultado com outras propriedades. Com a margem líquida igual a zero, a propriedade consegue saldar todo o custo operacional total (custeio + depreciações + pró-labore), porém não possui sobras para pagamento do custo de oportunidade sobre o capital investido na atividade. Com este resultado a empresa se mantém na atividade no médio prazo, porém sem atratividade econômica.';
        this.indicadores.mlu.status=2;
        this.indicadores.mlu.fazendeiro=6;
      }
      if(this.indicadores.mlu.value>0){
        this.indicadores.mlu.help='O Preço pago pela saca de café é maior que o Custo Operacional Total (COT) por saca. Paga-se todo o custeio, depreciações e custo de oportunidade da mão de obra familiar!';
        this.indicadores.mlu.subhelp='A margem líquida unitária permite ao produtor comparar seu resultado com outras propriedades. Com a margem líquida maior que zero, o produtor paga todo o custo operacional total e também parte ou a totalidade do custo de oportunidade sobre o capital investido na atividade. Deve-se avançar para a análise de Lucro para uma melhor avaliação';
        this.indicadores.mlu.status=3;
        this.indicadores.mlu.fazendeiro=4;
      }

      if(this.indicadores.mlap.value<0){
        this.indicadores.mlap.help='Atenção! O Custo Operacional Total (COT) por hectare está maior que a Renda Bruta por área de café em produção. A empresa está descapitalizando!';
        this.indicadores.mlap.subhelp='A margem líquida por área demonstra quanto de capital sobra ao bolso do produtor após pagar os custos diretos e parte dos custos fixos por hectare utilizado na propriedade para a atividade cafeeira. Este indicador permite avaliar a eficiência de utilização do tamanho da área para gerar dinheiro para o produtor e compará-la com outras atividades. Com a margem líquida menor que zero, o produtor está descapitalizando. Consegue arcar com os custos de desembolso direto e somente parte dos custos fixos. Caso o resultado continuar desta forma, no médio prazo haverá um empobrecimento do produtor e ele poderá deixar a atividade.';
        this.indicadores.mlap.status=1;
        this.indicadores.mlap.fazendeiro=1;
      }
      if(this.indicadores.mlap.value==0){
        this.indicadores.mlap.help='Atenção! O Custo Operacional Total (COT) por hectare é igual a Renda Bruta por área de café em produção. Empresa sustentável, porém sem atratividade econômica!';
        this.indicadores.mlap.subhelp='A margem líquida por área demonstra quanto de capital sobra ao bolso do produtor após pagar os custos diretos e parte dos custos fixos por hectare utilizado na propriedade para a atividade cafeeira. Este indicador permite avaliar a eficiência de utilização do tamanho da área para gerar dinheiro para o produtor e compará-la com outras atividades. Com a margem líquida igual a zero, a propriedade consegue saldar todo o custo operacional total (custeio + depreciações + pró-labore), porém não possui sobras para pagamento do custo de oportunidade sobre o capital investido na atividade. Com este resultado a empresa se mantém na atividade no médio prazo, porém sem atratividade econômica.';
        this.indicadores.mlap.status=2;
        this.indicadores.mlap.fazendeiro=6;
      }
      if(this.indicadores.mlap.value>0){
        this.indicadores.mlap.help='A Renda Bruta por área de café em produção é maior que o Custo Operacional Total (COT) por hectare. Paga-se todo o custeio, depreciações e custo de oportunidade da mão de obra familiar!';
        this.indicadores.mlap.subhelp='A margem líquida por área demonstra quanto de capital sobra ao bolso do produtor após pagar os custos diretos e parte dos custos fixos por hectare utilizado na propriedade para a atividade cafeeira. Este indicador permite avaliar a eficiência de utilização do tamanho da área para gerar dinheiro para o produtor e compará-la com outras atividades. Com a margem líquida maior que zero, o produtor paga todo o custo operacional total e também parte ou a totalidade do custo de oportunidade sobre o capital investido na atividade. Deve-se avançar para a análise de Lucro para uma melhor avaliação';
        this.indicadores.mlap.status=3;
        this.indicadores.mlap.fazendeiro=4;
      }

      if(this.indicadores.lucrou.value<0){
        this.indicadores.lucrou.help='Atenção! O Custo Total (CT) por saca está maior que o Preço pago pela saca de café. A empresa paga todo o COT, porém não é atrativa economicamente!';
        this.indicadores.lucrou.subhelp='O lucro unitário permite ao produtor comparar o seu indicador com outras propriedades na atividade cafeeira. Com o lucro unitário menor que zero, o produtor paga todo seu custo operacional total, mas em um valor que proporcionou baixa atratividade econômica para a atividade. No longo prazo a atividade poderá ser comprometida pela baixa capacidade de investimento.';
        this.indicadores.lucrou.status=1;
        this.indicadores.lucrou.fazendeiro=1;
      }
      if(this.indicadores.lucrou.value==0){
        this.indicadores.lucrou.help='O Custo Total (CT) por saca é igual ao Preço pago pela saca de café. Paga-se todo o CT. Lucro normal!';
        this.indicadores.lucrou.subhelp='O lucro unitário permite ao produtor comparar o seu indicador com outras propriedades na atividade cafeeira. Com o lucro unitário igual a zero, a atividade cafeeira possui lucro normal. A atividade está no ponto de cobertura total, ou seja, paga todo seu custo de desembolso direto (custeio) e todos seus custos fixos, porém deve-se focar no aumento do lucro e aumentar a atratividade do empreendimento, garantindo o crescimento da atividade.';
        this.indicadores.lucrou.status=2;
        this.indicadores.lucrou.fazendeiro=6;
      }
      if(this.indicadores.lucrou.value>0){
        this.indicadores.lucrou.help='O Preço pago pela saca de café é maior que o Custo Total (CT) por saca. Paga-se todo o CT. Lucro supernormal!';
        this.indicadores.lucrou.subhelp='O lucro unitário permite ao produtor comparar o seu indicador com outras propriedades na atividade cafeeira. Com o lucro unitário maior que zero, o produtor paga todos os recursos aplicados na atividade e proporciona uma remuneração superior às alternativas de investimento, além de garantir que parte desse lucro poderá ser reinvestido na atividade, garantindo sua competitividade no longo prazo. A atividade cafeeira possui lucro supernormal. ';
        this.indicadores.lucrou.status=3;
        this.indicadores.lucrou.fazendeiro=4;
      }

      if(this.indicadores.lucroap.value<0){
        this.indicadores.lucroap.help='Atenção! O Custo Total (CT) por hectare está maior que a Renda Bruta por área de café em produção. A empresa paga todo o COT, porém não é atrativa economicamente!';
        this.indicadores.lucroap.subhelp='O lucro por área permite a avaliação do produtor do quanto de renda sobrou após pagar todos os custos da atividade por área utilizada. Sendo assim, é possível avaliar a eficiência do uso da área pela atividade cafeeira em gerar lucro. Com o lucro menor que zero, o produtor paga todo seu custo operacional total, mas em um valor que proporcionou baixa atratividade econômica para a atividade. No longo prazo a atividade poderá ser comprometida pela baixa capacidade de investimento.';
        this.indicadores.lucroap.status=1;
        this.indicadores.lucroap.fazendeiro=1;
      }
      if(this.indicadores.lucroap.value==0){
        this.indicadores.lucroap.help='O Custo Total (CT) por hectare é igual a Renda Bruta por área de café em produção. Paga-se todo o CT. Lucro normal!';
        this.indicadores.lucroap.subhelp='O lucro por área permite a avaliação do produtor do quanto de renda sobrou após pagar todos os custos da atividade por área utilizada. Sendo assim, é possível avaliar a eficiência do uso da área pela atividade cafeeira em gerar lucro. Com o lucro igual a zero, a atividade cafeeira possui lucro normal. A atividade está no ponto de cobertura total, ou seja, paga todo seu custo de desembolso direto (custeio) e todos seus custos fixos, porém deve-se focar no aumento do lucro e aumentar a atratividade do empreendimento, garantindo o crescimento da atividade.';
        this.indicadores.lucroap.status=2;
        this.indicadores.lucroap.fazendeiro=6;
      }
      if(this.indicadores.lucroap.value>0){
        this.indicadores.lucroap.help='A Renda Bruta por área de café em produção é maior que o Custo Total (CT) por hectare. Paga-se todo o CT. Lucro supernormal!';
        this.indicadores.lucroap.subhelp='O lucro por área permite a avaliação do produtor do quanto de renda sobrou após pagar todos os custos da atividade por área utilizada. Sendo assim, é possível avaliar a eficiência do uso da área pela atividade cafeeira em gerar lucro. Com o lucro maior que zero, o produtor paga todos os recursos aplicados na atividade e proporciona uma remuneração superior às alternativas de investimento, além de garantir que parte desse lucro poderá ser reinvestido na atividade, garantindo sua competitividade no longo prazo. A atividade cafeeira possui lucro supernormal. ';
        this.indicadores.lucroap.status=3;
        this.indicadores.lucroap.fazendeiro=4;
      }

      this.indicadores.aplantada.help = 'Área destinada para a atividade cafeeira. No caso de duas atividades na mesma propriedade, deve-se realizar uma divisão das áreas para cada atividade.';
      this.indicadores.producao.help = 'Total de volume de sacas de café produzido na safra analisada';

      if(this.indicadores.ppaplantada.value>=30){ // verde
        this.indicadores.ppaplantada.help = 'A produtividade média está acima do preconizado para alcançar sucesso econômico.';
        this.indicadores.ppaplantada.subhelp = 'Representa a produtividade das lavouras em produção. Preconiza-se que as lavouras alcancem produtividade superior a 30 sc/ha.';
        this.indicadores.ppaplantada.status=3;
        this.indicadores.ppaplantada.fazendeiro=2;
      }
      else{                                // vermelho
        this.indicadores.ppaplantada.help = 'A produtividade média está abaixo do preconizado para alcançar sucesso econômico.';
        this.indicadores.ppaplantada.subhelp = 'Representa a produtividade das lavouras em produção. Preconiza-se que as lavouras alcancem produtividade superior a 30 sc/ha.';
        this.indicadores.ppaplantada.status=1;
        this.indicadores.ppaplantada.fazendeiro=5;
      }

      this.indicadores.rendabruta.help = 'Soma da venda de café, venda do café escolha e de todas as outras rendas originadas da atividade cafeeira no período de uma safra ou mais.';

      if(this.indicadores.pcv.value<490){ // vermelho
        this.indicadores.pcv.help = 'A comercialização do seu café está ineficiente!';
        this.indicadores.pcv.subhelp = 'Média do preço da saca de café comercializado. Devemos sempre buscar alcançar os maiores preços. Como referência, devemos buscar preços médios de venda acima de R$ 490,00, que é a média histórica de preços dos últimos 14 anos de acordo com os levantamentos do CEPEA.';
        this.indicadores.pcv.status=1;
        this.indicadores.pcv.fazendeiro=1;
      }
      else{                                // verde
        this.indicadores.pcv.help = 'Parabéns! Há eficiência na venda do seu café!';
        this.indicadores.pcv.subhelp = 'Média do preço da saca de café comercializado. Devemos sempre buscar alcançar os maiores preços. Como referência, devemos buscar preços médios de venda acima de R$ 490,00, que é a média histórica de preços dos últimos 14 anos de acordo com os levantamentos do CEPEA.';
        this.indicadores.pcv.status=3;
        this.indicadores.pcv.fazendeiro=2;
      }

      if(this.indicadores.bencusto.value<1){ // vermelho
        this.indicadores.bencusto.help='Atenção! A atividade está incorrendo em prejuízos!';
        this.indicadores.bencusto.subhelp='Quando a relação benefício/custo é menor que 1, significa que o custo é maior que a renda obtida na atividade cafeeira. Este resultado mostra o quanto você está perdendo a cada R$1,00 investido na atividade.';
        this.indicadores.bencusto.status=1;
        this.indicadores.bencusto.fazendeiro=5;
      }
      else{                                   // verde
        this.indicadores.bencusto.help='A atividade possui custo/benefício positivo!';
        this.indicadores.bencusto.subhelp='Quando a relação benefício/custo é maior que 1, significa que o custo é menor que a renda obtida na atividade. Este resultado mostra o quanto você está ganhando a cada R$1,00 investido na atividade. Quanto maior a relação benefício custo, melhor, uma vez que ao conseguir cobrir todos os custos com a renda, você se mantêm na atividade de forma viável e atrativa economicamente.';
        this.indicadores.bencusto.status=3;
        this.indicadores.bencusto.fazendeiro=2;
      }

    },
    geraIndicadores(SafraIDs){
      if(SafraIDs.length==0){
        Object.keys(this.indicadores).forEach(key => {
          this.indicadores[key].value = 0;
          this.indicadores[key].fazendeiro = 3;
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
        this.nome_fazenda = fazendaObj.NomeFazenda;
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
                IndicadoresTalhao.bencusto = IndicadoresTalhao.ct / IndicadoresTalhao.rendabruta;

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
    this.$root.$on('menu_fechado', (menu) => {
              console.log(menu);
      if(!menu.newV) this.dialog_partezinha = '';
      else this.dialog_partezinha = 'static/fala.png';
    });
  },
  watch: {
    checkeds: function (newV, oldV) {
      this.geraIndicadores(this.checkeds);
    },
    filt_eco: function(nv,no){

    }
  }
}
</script>

<style scoped>
.indicator {
  font-size:23px;
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

#dialog_interp {
  width:80%;
  margin-left:20%;
}

.dialog_pai {
  height:555px!important;
}

#dialog_p{
  width: 770px;
  height: 400px;
  position: fixed;
  bottom:21%;
  left:251px;

  z-index:1000;

  -webkit-filter: drop-shadow(0px 0px 5px #000);
   filter: drop-shadow(0px 0px 5px #000);
}

#dialog_s{
  width:80%;
  height: 80%;
  margin-left:13%;
  overflow-y: scroll;
  overflow: auto;
  background-color:#fff;
  padding:21px;
  background-image: url(~@/assets/fundo_dialog2.png);
  background-position: center bottom;
}
</style>
