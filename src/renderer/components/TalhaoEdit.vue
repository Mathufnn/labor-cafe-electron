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
                <b>Fazenda {{fazenda_ident}}</b>
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="secondary" slot="activator" router :to="'/SafraView/'+ safra_id"><v-icon center dark>arrow_back</v-icon> VOLTAR ÀS INFORMAÇÕES DA SAFRA</v-btn>
              </v-flex>
            </v-layout>
            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm4>
                  <b>IDENTIFICAÇÃO DO TALHÃO: </b>
                  <v-text-field type="string" :placeholder="talhao_ident" suffix="" v-model="talhao_ident"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PRODUÇÃO TOTAL: </b>
                  <v-text-field type="text" :placeholder="producao_total" suffix="Sc" v-model="producao_total"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁREA: </b>
                    <v-text-field type="text" :placeholder="area" suffix="ha" v-model="area"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>VENDA DE SUB PRODUTO: </b>
                  <v-text-field type="text" :placeholder="venda_subp" suffix="R$/safra" v-model="venda_subp"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MÃO DE OBRA FAMILIAR: </b>
                  <v-text-field type="text" :placeholder="mao_familiar" suffix="R$/safra" v-model="mao_familiar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ARRENDAMENTO DE TERRAS: </b>
                  <v-text-field type="text" :placeholder="arrend_terra" suffix="R$/safra" v-model="arrend_terra"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ALUGUEL DE MÁQUINAS: </b>
                  <v-text-field type="text" :placeholder="aluguel_maq" suffix="R$/safra" v-model="aluguel_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>COMBUSTÍVEL: </b>
                  <v-text-field type="text" :placeholder="combustivel" suffix="R$/safra" v-model="combustivel"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MANUTENÇÃO DE MÁQUINAS: </b>
                  <v-text-field type="text" :placeholder="manu_maq" suffix="R$/safra" v-model="manu_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MANUTENÇÃO DE BENFEITORIAS: </b>
                  <v-text-field type="text" :placeholder="manu_benf" suffix="R$/safra" v-model="manu_benf"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ENERGIA ELÉTRICA: </b>
                  <v-text-field type="text" :placeholder="energia" suffix="R$/safra" v-model="energia"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FRETE E DESLOCAMENTO: </b>
                  <v-text-field type="text" :placeholder="frete" suffix="R$/safra" v-model="frete"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>IMPOSTOS E TAXAS: </b>
                  <v-text-field type="text" :placeholder="impostos" suffix="R$/safra" v-model="impostos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MÃO DE OBRA CONTRATADA: </b>
                  <v-text-field type="text" :placeholder="mao_contratada" suffix="R$/safra" v-model="mao_contratada"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MÃO DE OBRA FIXA: </b>
                  <v-text-field type="text" :placeholder="mao_fixa" suffix="R$/safra" v-model="mao_fixa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>DESPESAS GERAIS: </b>
                  <v-text-field type="text" :placeholder="despesas_gerais" suffix="R$/safra" v-model="despesas_gerais"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ASSISTÊNCIA TÉCNICA: </b>
                  <v-text-field type="text" :placeholder="ass_tec" suffix="R$/safra" v-model="ass_tec"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CERTIFICAÇÃO: </b>
                  <v-text-field type="text" :placeholder="certificacao" suffix="R$/safra" v-model="certificacao"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ANÁLISE DE SOLO: </b>
                  <v-text-field type="text" :placeholder="analise_solo" suffix="R$/safra" v-model="analise_solo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ANALISE FOLIAR: </b>
                  <v-text-field type="text" :placeholder="analise_foliar" suffix="R$/safra" v-model="analise_foliar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>EPI: </b>
                  <v-text-field type="text" :placeholder="epi" suffix="R$/safra" v-model="epi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FERTILIZANTES DE SOLO: </b>
                  <v-text-field type="text" :placeholder="fertilizantes" suffix="R$/safra" v-model="fertilizantes"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁCIDOS/AMINOÁCIDOS: </b>
                  <v-text-field type="text" :placeholder="acidos" suffix="R$/safra" v-model="acidos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ADUBOS FOLIARES: </b>
                  <v-text-field type="text" :placeholder="adubos" suffix="R$/safra" v-model="adubos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ACARICIDA: </b>
                  <v-text-field type="text" :placeholder="acaricida" suffix="R$/safra" v-model="acaricida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>BACTERICIDA: </b>
                  <v-text-field type="text" :placeholder="bactericida" suffix="R$/safra" v-model="bactericida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ESPALHANTE ADESIVO: </b>
                  <v-text-field type="text" :placeholder="espalhante" suffix="R$/safra" v-model="espalhante"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FUNGICIDA: </b>
                  <v-text-field type="text" :placeholder="fungicida" suffix="R$/safra" v-model="fungicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>INSETICIDA: </b>
                  <v-text-field type="text" :placeholder="inseticida" suffix="R$/safra" v-model="inseticida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>NEMATICIDA: </b>
                  <v-text-field type="text" :placeholder="nematicida" suffix="R$/safra" v-model="nematicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÓLEO MINERAL: </b>
                  <v-text-field type="text" :placeholder="oleo_mineral" suffix="R$/safra" v-model="oleo_mineral"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>HERBICIDA: </b>
                  <v-text-field type="text" :placeholder="herbicida" suffix="R$/safra" v-model="herbicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>HORMÔNIOS: </b>
                  <v-text-field type="text" :placeholder="hormonios" suffix="R$/safra" v-model="hormonios"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATURADORES: </b>
                  <v-text-field type="text" :placeholder="maturadores" suffix="R$/safra" v-model="maturadores"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATERIAL DE COLHEITA: </b>
                  <v-text-field type="text" :placeholder="material_colheita" suffix="R$/safra" v-model="material_colheita"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ARMAZENAMENTO: </b>
                  <v-text-field type="text" :placeholder="armazenamento" suffix="R$/safra" v-model="armazenamento"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>BENEFÍCIO: </b>
                  <v-text-field type="text" :placeholder="beneficio" suffix="R$/safra" v-model="beneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>GÁS/LENHA/CARVÃO: </b>
                  <v-text-field type="text" :placeholder="gas_lenha" suffix="R$/safra" v-model="gas_lenha"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATERIAIS DE PÓS COLHEITA: </b>
                  <v-text-field type="text" :placeholder="material_pos_colheita" suffix="R$/safra" v-model="material_pos_colheita"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>REBENEFÍCIO: </b>
                  <v-text-field type="text" :placeholder="rebeneficio" suffix="R$/safra" v-model="rebeneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>SACOS/EMBALAGENS: </b>
                  <v-text-field type="text" :placeholder="embalagens" suffix="R$/safra" v-model="embalagens"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CORRETAGEM: </b>
                  <v-text-field type="text" :placeholder="corretagem" suffix="R$/safra" v-model="corretagem"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-btn block color="primary" large @click="editarTalhao">SALVAR ALTERAÇÕES</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Indicadores from './TalhaoView/Indicadores'
import { remote } from 'electron'
export default {
  name: 'TalhaoView',
  components: { Indicadores },
  data: () => ({
    talhao_ident: '',
    safra_ident: '',
    fazenda_ident: '',
    safra_id: -1,
    preco_venda: '',
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
    fertilizantes: '',
    impostos: '',
    mao_contratada: '',
    mao_fixa: '',
    despesas_gerais: '',
    ass_tec: '',
    despesas_gerais: '',
    certificacao: '',
    analise_solo: '',
    analise_foliar: '',
    epi: '',
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
    idFazenda: '',
    idSafra: ''
  }),
  props:{
    id: {
      default: '-1'
    }
  },
  methods: {
    formatN(vr,minimium=2){
      if(typeof vr == 'undefined') return '';
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: 0});
    },
    editarTalhao(){
      remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Os dados serão alterados. É recomendavel fazer um backup antes de alterar valores.\nVocê tem certeza que deseja fazer isso?',
      buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
        if(idx==0){
          Object.keys(this.$data).forEach((key, original_values) => {
            this.$data[key] = this.$data[key].toString().replace(/\./g,'').replace(/,/g,'.');
          });

          let obj = {
            talhao_ident: this.talhao_ident,
            ProdTotal: this.producao_total,
            PrecoVenda: this.preco_venda,
            Area: this.area,
            VendaSubP: this.venda_subp,
            MaoObraF: this.mao_familiar,
            ArrendamentoTerras: this.arrend_terra,
            AluguelMaquinas: this.aluguel_maq,
            Combustivel: this.combustivel,
            ManutencaoBenf: this.manu_benf,
            ManutencaoMaq: this.manu_maq,
            EnergiaEletrica: this.energia,
            Frete: this.frete,
            Impostos: this.impostos,
            MaoObraContratada: this.mao_contratada,
            MaoObraFixa: this.mao_fixa,
            Despesas: this.despesas_gerais,
            Assistencia: this.ass_tec,
            Certificacao: this.certificacao,
            AnaliseSolo: this.analise_solo,
            AnaliseFoliar: this.analise_foliar,
            EPi: this.epi,
            Acidos: this.acidos,
            Adubos: this.adubos,
            Acaricida: this.acaricida,
            Bactericida: this.bactericida,
            Espalhante: this.espalhante,
            Fungicida: this.fungicida,
            Inseticida: this.inseticida,
            Nematicida: this.nematicida,
            OleoMineral: this.oleo_mineral,
            Herbicida: this.herbicida,
            Hormonios: this.hormonios,
            Maturadores: this.maturadores,
            MaterialColheita: this.material_colheita,
            Armazenamento: this.armazenamento,
            Beneficios: this.beneficio,
            GasLenhaCarvao: this.gas_lenha,
            PosColheita: this.material_pos_colheita,
            Rebeneficio: this.rebeneficio,
            Saco: this.embalagens,
            Correntagem: this.corretagem
          };


          this.$backend.updateTalhao(this.id, obj, () => {
            this.$router.push("/TalhaoView/" + this.id);
          });
        }
      });
    }
  },
  mounted: function () {
    this.$backend.getTalhao(this.id, (talhaoObj) => {
      if(talhaoObj==null) {  this.$router.push('/'); return; }
      this.talhao_ident = talhaoObj.NomeTalhao;
      this.safra_id = talhaoObj.SafraID;
      this.producao_total = this.formatN(talhaoObj.ProdTotal);
      this.preco_venda = this.formatN(talhaoObj.PrecoVenda);
      this.area = this.formatN(talhaoObj.Area);
      this.venda_subp = this.formatN(talhaoObj.VendaSubP);
      this.mao_familiar = this.formatN(talhaoObj.MaoObraF);
      this.arrend_terra = this.formatN(talhaoObj.ArrendamentoTerras);
      this.aluguel_maq = this.formatN(talhaoObj.AluguelMaquinas);
      this.combustivel = this.formatN(talhaoObj.Combustivel);
      this.manu_benf = this.formatN(talhaoObj.ManutencaoBenf);
      this.manu_maq = this.formatN(talhaoObj.ManutencaoMaq);
      this.energia = this.formatN(talhaoObj.EnergiaEletrica);
      this.fertilizantes = this.formatN(talhaoObj.Fertilizantes);
      this.frete = this.formatN(talhaoObj.Frete);
      this.impostos = this.formatN(talhaoObj.Impostos);
      this.mao_contratada = this.formatN(talhaoObj.MaoObraContratada);
      this.mao_fixa = this.formatN(talhaoObj.MaoObraFixa);
      this.despesas_gerais = this.formatN(talhaoObj.Despesas);
      this.ass_tec = this.formatN(talhaoObj.Assistencia);
      this.certificacao = this.formatN(talhaoObj.Certificacao);
      this.analise_solo = this.formatN(talhaoObj.AnaliseSolo);
      this.analise_foliar = this.formatN(talhaoObj.AnaliseFoliar);
      this.epi = this.formatN(talhaoObj.EPi);
      this.acidos = this.formatN(talhaoObj.Acidos);
      this.adubos = this.formatN(talhaoObj.Adubos);
      this.acaricida = this.formatN(talhaoObj.Acaricida);
      this.bactericida = this.formatN(talhaoObj.Bactericida);
      this.espalhante = this.formatN(talhaoObj.Espalhante);
      this.fungicida = this.formatN(talhaoObj.Fungicida);
      this.inseticida = this.formatN(talhaoObj.Inseticida);
      this.nematicida = this.formatN(talhaoObj.Nematicida);
      this.oleo_mineral = this.formatN(talhaoObj.OleoMineral);
      this.herbicida = this.formatN(talhaoObj.Herbicida);
      this.hormonios = this.formatN(talhaoObj.Hormonios);
      this.maturadores = this.formatN(talhaoObj.Maturadores);
      this.material_colheita = this.formatN(talhaoObj.MaterialColheita);
      this.material_pos_colheita = this.formatN(talhaoObj.PosColheita);
      this.armazenamento = this.formatN(talhaoObj.Armazenamento);
      this.beneficio = this.formatN(talhaoObj.Beneficios);
      this.gas_lenha = this.formatN(talhaoObj.GasLenhaCarvao);
      this.rebeneficio = this.formatN(talhaoObj.Rebeneficio);
      this.embalagens = this.formatN(talhaoObj.Saco);
      this.corretagem = this.formatN(talhaoObj.Correntagem);

      this.idSafra = talhaoObj.SafraID;

      //assincrono, logo, tem que ficar aqui dentro
      this.$backend.getSafra(talhaoObj.SafraID, (safraObj) => {
        this.safra_ident = safraObj.IdentSafra;
        this.idFazenda = safraObj.FazendaID;
        //aqui tambem
        this.$backend.getFazenda(safraObj.FazendaID, (fazendaObj) => {
          this.fazenda_ident = fazendaObj.NomeFazenda;
        });
      });

    });
  },
  created: function(){
    Object.keys(this.$data).forEach((key, original_values) => {
      if(key=='talhao_ident' || key=='safra_ident' || key=='fazenda_ident' || key=='ident_talhao' || key=='e6' ||
      key=='idFazenda' || key=='idSafra') return;
      this.$watch(() => (this.$data[key]),function (newVal, oldVal) {
        if(newVal=='' || oldVal=='') return;
        if(this.$data[key].toString().replace(/\./g,'').replace(/,/g,'')==oldVal.toString().replace(/\./g,'').replace(/,/g,'')) return;
        let tmp = this.$data[key];
        tmp = tmp.toString().replace(/\./g,'').replace(/,/g,'.');
        tmp = parseFloat(tmp).toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: 0});
        this.$data[key] = tmp.toString();
      },{ deep: true });
    });

  },
}
</script>

<style scoped>

</style>
