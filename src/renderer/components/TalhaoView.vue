<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <v-layout id="wrapper">
              <v-flex xs6>
                <h1>Talhão {{talhao_ident}}</h1>
                <h2>Safra {{safra_ident}}</h2>
                <b>Fazenda {{fazenda_ident}}</b><br /><br />
                <b>PRODUÇÃO TOTAL:</b> {{formatN(producao_total,0)}} <span class="caption">Sc</span><br />
                <b>ÁREA DE PRODUÇÃO:</b> {{formatN(area)}} <span class="caption">Ha</span>
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="secondary" slot="activator" router :to="'/SafraView/'+ safra_id"><v-icon center dark>arrow_back</v-icon> VOLTAR ÀS INFORMAÇÕES DA SAFRA</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs11>
        <v-card>
          <v-card-title class="headline">
            Elementos de Despesa:
            <v-tooltip right>
              <v-btn small color="secondary" slot="activator" v-on:click="showElementos"><v-icon center dark>menu</v-icon></v-btn>
              <span>Mostrar elementos de despesa</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn icon slot="activator" @click="export_dialog = true" color="primary"> <v-icon>publish</v-icon></v-btn>
              <span>Exportar dados</span>
            </v-tooltip>
          </v-card-title>
          <v-container fluid v-if="view">
            <h2>ELEMENTOS DE DESPESA:</h2><br />
            <v-layout row wrap subheading>
              <table>
              <tr><td>
                <b>VENDA DE SUB PRODUTO</b></td><td> {{formatN(venda_subp)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MÃO DE OBRA FAMILIAR </b></td><td> {{formatN(mao_familiar)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ARRENDAMENTO DE TERRAS </b></td><td> {{formatN(arrend_terra)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ALUGUEL DE MÁQUINAS </b></td><td> {{formatN(aluguel_maq)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>COMBUSTÍVEL </b></td><td> {{formatN(combustivel)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MANUTENÇÃO DE MÁQUINAS </b></td><td> {{formatN(manu_maq)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MANUTENÇÃO DE BENFEITORIAS </b></td><td> {{formatN(manu_benf)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ENERGIA </b></td><td> {{formatN(energia)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>FRETE E DESLOCAMENTO </b></td><td> {{formatN(frete)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>IMPOSTOS E TAXAS </b></td><td> {{formatN(impostos)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MÃO DE OBRA CONTRATADA </b></td><td> {{formatN(mao_contratada)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MÃO DE OBRA FIXA </b></td><td> {{formatN(mao_fixa)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>DESPESAS GERAIS </b></td><td> {{formatN(despesas_gerais)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ASSISTÊNCIA TÉCNICA </b></td><td> {{formatN(ass_tec)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>CERTIFICAÇÃO </b></td><td> {{formatN(certificacao)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ANÁLISE DE SOLO </b> </td><td>{{formatN(analise_solo)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ANÁLISE FOLIAR </b></td><td> {{formatN(analise_foliar)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>EPI </b></td><td> {{formatN(epi)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>FERTILIZANTES DE SOLO </b></td><td> {{formatN(fertilizantes)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ÁCIDOS </b></td><td> {{formatN(acidos)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ADUBOS </b></td><td> {{formatN(adubos)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ACARICIDAS </b></td><td> {{formatN(acaricida)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>BACTERICIDAS </b></td><td> {{formatN(bactericida)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ESPALHANTE ADESIVO </b> </td><td>{{formatN(espalhante)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>INSETICIDA </b></td><td> {{formatN(inseticida)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>FUNGICIDA </b></td><td> {{formatN(fungicida)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>NEMATICIDA </b></td><td> {{formatN(nematicida)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ÓLEO MINERAL </b></td><td> {{formatN(oleo_mineral)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>HERBICIDA </b></td><td> {{formatN(herbicida)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>HORMÔNIOS </b></td><td> {{formatN(hormonios)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MATURADORES </b></td><td>{{formatN(maturadores)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MATERIAL COLHEITA </b></td><td> {{formatN(material_colheita)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>ARMAZENAMENTO </b></td><td> {{formatN(armazenamento)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>BENEFÍCIO </b></td><td> {{formatN(beneficio)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>GÁS/LENHA/CARVÃO </b></td><td> {{formatN(gas_lenha)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>MATERIAIS PÓS COLHEITA </b></td><td> {{formatN(material_pos_colheita)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>REBENEFÍCIO </b></td><td> {{formatN(rebeneficio)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>SACOS/EMBALAGENS </b></td><td> {{formatN(embalagens)}} <span class="caption">R$/safra</span>
              </td></tr>
              <tr><td>
                <b>CORRETAGEM </b></td><td> {{formatN(corretagem)}} <span class="caption">R$/safra</span>
              </td></tr>
            </table>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs11 >
        <indicadores :tid="id"></indicadores>
      </v-flex>


    </v-layout>
    <v-dialog max-width="400" v-model="export_dialog" hide-overlay="true">
      <v-card>
        <v-card-text>
          <b>Selecione o formato para qual deseja exportar esses dados:</b><br /><br />
          <v-layout align-center justify-space-between row fill-height>
            <v-flex xs6 class="text-xs-center">
              <v-btn color="primary" big  @click="exportdata(1)">PDF</v-btn>
            </v-flex>
            <v-flex  xs6 class="text-xs-center">
              <v-btn color="primary" big @click="exportdata(2)">Excel</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-btn color="green darken-1" flat="flat" @click="export_dialog = false">CANCELAR</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Indicadores from './TalhaoView/Indicadores'
import { remote, ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'
import XLSX from 'XLSX'

export default {
  name: 'TalhaoView',
  components: { Indicadores },
  data: () => ({
    dados_comp: {
      venda_subp:  { text: 'VENDA DE SUB PRODUTO', dado: () => this.venda_subp, unidade: 'R$/safra' },
      mao_familiar:  { text: 'MÃO DE OBRA FAMILIAR ', dado: () => this.mao_familiar, unidade: 'R$/safra' },
      arrend_terra:  { text: 'ARRENDAMENTO DE TERRAS ', dado: () => this.arrend_terra, unidade: 'R$/safra' },
      aluguel_maq:  { text: 'ALUGUEL DE MÁQUINAS ', dado: () => this.aluguel_maq, unidade: 'R$/safra' },
      combustivel:  { text: 'COMBUSTÍVEL ', dado: () => this.combustivel, unidade: 'R$/safra' },
      manu_benf:  { text: 'MANUTENÇÃO DE MÁQUINAS ', dado: () => this.manu_maq, unidade: 'R$/safra' },
      manu_maq:  { text: 'MANUTENÇÃO DE BENFEITORIAS ', dado: () => this.manu_benf, unidade: 'R$/safra' },
      energia:  { text: 'ENERGIA ', dado: () => this.energia, unidade: 'R$/safra' },
      frete:  { text: 'FRETE E DESLOCAMENTO ', dado: () => this.frete, unidade: 'R$/safra' },
      impostos:  { text: 'IMPOSTOS E TAXAS ', dado: () => this.impostos, unidade: 'R$/safra' },
      mao_contratada:  { text: 'MÃO DE OBRA CONTRATADA ', dado: () => this.mao_contratada, unidade: 'R$/safra' },
      mao_fixa:  { text: 'MÃO DE OBRA FIXA ', dado: () => this.mao_fixa, unidade: 'R$/safra' },
      despesas_gerais:  { text: 'DESPESAS GERAIS ', dado: () => this.despesas_gerais, unidade: 'R$/safra' },
      ass_tec:  { text: 'ASSISTÊNCIA TÉCNICA ', dado: () => this.ass_tec, unidade: 'R$/safra' },
      certificacao:  { text: 'CERTIFICAÇÃO ', dado: () => this.certificacao, unidade: 'R$/safra' },
      analise_solo:  { text: 'ANÁLISE DE SOLO', dado: () => this.analise_solo, unidade: 'R$/safra' },
      analise_foliar:  { text: 'ANÁLISE FOLIAR ', dado: () => this.analise_foliar, unidade: 'R$/safra' },
      epi:  { text: 'EPI ', dado: () => this.epi, unidade: 'R$/safra' },
      fertilizantes:  { text: 'FERTILIZANTES DE SOLO ', dado: () => this.fertilizantes, unidade: 'R$/safra' },
      acidos:  { text: 'ÁCIDOS ', dado: () => this.acidos, unidade: 'R$/safra' },
      adubos: { text: 'ADUBOS ', dado: () => this.adubos, unidade: 'R$/safra' },
      acaricida:  { text: 'ACARICIDAS ', dado: () => this.acaricida, unidade: 'R$/safra' },
      bactericida:  { text: 'BACTERICIDAS ', dado: () => this.bactericida, unidade: 'R$/safra' },
      espalhante:  { text: 'ESPALHANTE ADESIVO', dado: () => this.espalhante, unidade: 'R$/safra' },
      inseticida:  { text: 'INSETICIDA ', dado: () => this.inseticida, unidade: 'R$/safra' },
      fungicida:  { text: 'FUNGICIDA ', dado: () => this.fungicida, unidade: 'R$/safra' },
      nematicida:  { text: 'NEMATICIDA ', dado: () => this.nematicida, unidade: 'R$/safra' },
      oleo_mineral:  { text: 'ÓLEO MINERAL ', dado: () => this.oleo_mineral, unidade: 'R$/safra' },
      herbicida:  { text: 'HERBICIDA ', dado: () => this.herbicida, unidade: 'R$/safra' },
      hormonios:  { text: 'HORMÔNIOS ', dado: () => this.hormonios, unidade: 'R$/safra' },
      maturadores:  { text: 'MATURADORES ',dado: () => this.maturadores, unidade: 'R$/safra' },
      material_colheita:  { text: 'MATERIAL COLHEITA ', dado: () => this.material_colheita, unidade: 'R$/safra' },
      armazenamento:  { text: 'ARMAZENAMENTO ', dado: () => this.armazenamento, unidade: 'R$/safra' },
      beneficio:  { text: 'BENEFÍCIO ', dado: () => this.beneficio, unidade: 'R$/safra' },
      gas_lenha:  { text: 'GÁS/LENHA/CARVÃO ', dado: () => this.gas_lenha, unidade: 'R$/safra' },
      material_pos_colheita:  { text: 'MATERIAIS PÓS COLHEITA ', dado: () => this.materiais_pos_colheita, unidade: 'R$/safra' },
      rebeneficio:  { text: 'REBENEFÍCIO ', dado: () => this.rebeneficio, unidade: 'R$/safra' },
      embalagens:  { text: 'SACOS/EMBALAGENS ', dado: () => this.embalagens, unidade: 'R$/safra' },
      corretagem:  { text: 'CORRETAGEM ', dado: () => this.corretagem, unidade: 'R$/safra' }
    },
    export_dialog: false,
    talhao_ident: '',
    safra_ident: '',
    fazenda_ident: '',
    safra_id: -1,
    producao_total: '',
    area: '',
    venda_subp: '',
    mao_familiar: '',
    arrend_terra: '',
    aluguel_maq: '',
    combustivel: '',
    manu_benf: '',
    manu_maq: '',
    energia: '',
    frete: '',
    impostos: '',
    mao_contratada: '',
    mao_fixa: '',
    despesas_gerais: '',
    ass_tec: '',
    certificacao: '',
    analise_solo: '',
    analise_foliar: '',
    epi: '',
    fertilizantes: '',
    acidos: '',
    adubos: '',
    acaricida: '',
    bactericida: '',
    espalhante: '',
    fungicida: '',
    inseticida: '',
    nematicida: '',
    oleo_mineral: '',
    herbicida: '',
    hormonios: '',
    maturadores: '',
    material_colheita: '',
    armazenamento: '',
    beneficio: '',
    gas_lenha: '',
    materiais_pos_colheita: '',
    rebeneficio: '',
    embalagens: '',
    corretagem: '',
    e6: 0,
    view: false
  }),
  props:{
    id: {
      default: '-1'
    }
  },
  methods: {
    exportdata(type){
        //=============================================================  csv
        if(type==2){
          remote.dialog.showSaveDialog({title: 'Selecione local para salvar o arquivo excel',filters:[{name: 'Arquivo XLSX', extensions: ['xlsx']}]}, (filename) => {
            if(typeof filename == 'undefined') return;
            //this.loading = true;
            let data = [];
            let count = 1;
            Object.keys(this.dados_comp).forEach(key => {
              //this.indicadores[key].help = 'Para visualizar as interpretações é preciso selecionar pelo menos 1 safra para geração de indicadores.';
              data.push({
              'ORDEM': count,
              'INFORMAÇÃO': this.dados_comp[key].text,
              'UNIDADE': this.dados_comp[key].unidade,
              'VALOR': this.formatN(this[key])
              })
              count++;
            });

            let ws = XLSX.utils.json_to_sheet(data);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Registro ' + (this.m_mes!=null?'mensal '+this.m_mes+'-':'anual de ') + this.m_ano);

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
          <h1>Fazenda ${this.fazenda_ident}</h1>
          <b>Registro ${this.m_mes!=null?'mensal '+this.m_mes+'/':'anual de '}${ this.m_ano } </b><br /><br />
          <table>
            <thead>
              <tr><th>#</th><th>INFORMAÇÃO</th><th>UNIDADE</th><th>VALOR</th></tr>
            </thead>
            <tbody>`;

        let count=1;
        Object.keys(this.dados_comp).forEach(key => {
          console.log(key);
          let tmp = this.formatN(this[key])
          data += `<tr>
            <td>${count}</td>
            <td>${this.dados_comp[key].text}</td>
            <td>${this.dados_comp[key].unidade}</td>
            <td>${tmp}</td>
          </tr>`;
          count++;
        });

        data += `</tbody></table>
        </body>`;
        ipcRenderer.send('print-pdf', data);
      }
    },
    showElementos: function(){
      this.view = !this.view
    },
    formatN(vr,minimium=2){
      if(vr=='-') return '-';
      if(isNaN(vr)) return parseFloat(parseFloat(0).toFixed(2)).toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: minimium});
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: minimium});
    }
  },
  mounted: function () {
    this.$backend.getTalhao(this.$route.params.id, (talhaoObj) => {
      if(talhaoObj==null) {  this.$router.push('/'); return; }
      this.talhao_ident = talhaoObj.NomeTalhao;
      this.safra_id = talhaoObj.SafraID;
      this.producao_total = talhaoObj.ProdTotal;
      this.area = talhaoObj.Area;
      this.venda_subp = talhaoObj.VendaSubP;
      this.mao_familiar = talhaoObj.MaoObraF;
      this.arrend_terra = talhaoObj.ArrendamentoTerras;
      this.aluguel_maq = talhaoObj.AluguelMaquinas;
      this.combustivel = talhaoObj.Combustivel;
      this.manu_benf = talhaoObj.ManutencaoBenf;
      this.manu_maq = talhaoObj.ManutencaoMaq;
      this.energia = talhaoObj.EnergiaEletrica;
      this.frete = talhaoObj.Frete;
      this.impostos = talhaoObj.Impostos;
      this.mao_contratada = talhaoObj.MaoObraContratada;
      this.mao_fixa = talhaoObj.MaoObraFixa;
      this.despesas_gerais = talhaoObj.Despesas;
      this.ass_tec = talhaoObj.Assistencia;
      this.certificacao = talhaoObj.Certificacao;
      this.analise_solo = talhaoObj.AnaliseSolo;
      this.analise_foliar = talhaoObj.AnaliseFoliar;
      this.epi = talhaoObj.EPi;
      this.fertilizantes = talhaoObj.Fertilizantes;
      this.acidos = talhaoObj.Acidos;
      this.adubos = talhaoObj.Adubos;
      this.acaricida = talhaoObj.Acaricida;
      this.bactericida = talhaoObj.Bactericida;
      this.espalhante = talhaoObj.Espalhante;
      this.fungicida = talhaoObj.Fungicida;
      this.inseticida = talhaoObj.Inseticida;
      this.nematicida = talhaoObj.Nematicida;
      this.oleo_mineral = talhaoObj.OleoMineral;
      this.herbicida = talhaoObj.Herbicida;
      this.hormonios = talhaoObj.Hormonios;
      this.maturadores = talhaoObj.Maturadores;
      this.material_colheita = talhaoObj.MaterialColheita;
      this.material_pos_colheita = talhaoObj.PosColheita;
      this.armazenamento = talhaoObj.Armazenamento;
      this.beneficio = talhaoObj.Beneficios;
      this.gas_lenha = talhaoObj.GasLenhaCarvao;
      this.rebeneficio = talhaoObj.Rebeneficio;
      this.embalagens = talhaoObj.Saco;
      this.corretagem = talhaoObj.Correntagem;

      //assincrono, logo, tem que ficar aqui dentro
      this.$backend.getSafra(talhaoObj.SafraID, (safraObj) => {
        this.safra_ident = safraObj.IdentSafra;
        //aqui tambem
        this.$backend.getFazenda(safraObj.FazendaID, (fazendaObj) => {
          this.fazenda_ident = fazendaObj.NomeFazenda;
        });
      });

    });




  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width:100%;
}

table, th, td {
  border-bottom: 1px solid black;
}
th,thead {
  text-align:center;
  height:35px;
}
td {
  height:26px;
}
</style>
