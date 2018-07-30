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
                  <b>FAZENDA: </b>
                  <v-text-field type="string" :placeholder="fazenda_ident" suffix="" v-model="novo_fazenda_ident"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>TALHÃO: </b>
                  <v-text-field type="string" :placeholder="talhao_ident" suffix="" v-model="novo_talhao_ident"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>SAFRA: </b>
                  <v-text-field type="string" :placeholder="safra_ident" suffix="" v-model="novo_safra_ident"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>PRODUÇÃO TOTAL: </b>
                  <v-text-field type="number" :placeholder="producao_total" suffix="Sc" v-model="novo_producao_total"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁREA: </b>
                    <v-text-field type="number" :placeholder="area" suffix="ha" v-model="novo_area"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>VENDA DE SUB PRODUTO: </b>
                  <v-text-field type="number" :placeholder="venda_subp" suffix="R$/safra" v-model="novo_venda_subp"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MÃO DE OBRA FAMILIAR: </b>
                  <v-text-field type="number" :placeholder="mao_familiar" suffix="R$/safra" v-model="novo_mao_familiar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ARRENDAMENTO DE TERRAS: </b>
                  <v-text-field type="number" :placeholder="arrend_terra" suffix="R$/safra" v-model="novo_arrend_terra"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ALUGUEL DE MÁQUINAS: </b>
                  <v-text-field type="number" :placeholder="aluguel_maq" suffix="R$/safra" v-model="novo_aluguel_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>COMBUSTÍVEL: </b>
                  <v-text-field type="number" :placeholder="combustivel" suffix="R$/safra" v-model="novo_combustivel"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MANUTENÇÃO DE MÁQUINAS: </b>
                  <v-text-field type="number" :placeholder="manu_maq" suffix="R$/safra" v-model="novo_manu_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MANUTENÇÃO DE BENFEITORIAS: </b>
                  <v-text-field type="number" :placeholder="manu_benf" suffix="R$/safra" v-model="novo_manu_benf"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ENERGIA ELÉTRICA: </b>
                  <v-text-field type="number" :placeholder="energia" suffix="R$/safra" v-model="novo_energia"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FRETE E DESLOCAMENTO: </b>
                  <v-text-field type="number" :placeholder="frete" suffix="R$/safra" v-model="novo_frete"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>IMPOSTOS E TAXAS: </b>
                  <v-text-field type="number" :placeholder="impostos" suffix="R$/safra" v-model="novo_impostos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MÃO DE OBRA CONTRATADA: </b>
                  <v-text-field type="number" :placeholder="mao_contratada" suffix="R$/safra" v-model="novo_mao_contratada"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MÃO DE OBRA FIXA: </b>
                  <v-text-field type="number" :placeholder="mao_fixa" suffix="R$/safra" v-model="novo_mao_fixa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>DESPESAS GERAIS: </b>
                  <v-text-field type="number" :placeholder="despesas_gerais" suffix="R$/safra" v-model="novo_despesas_gerais"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ASSISTÊNCIA TÉCNICA: </b>
                  <v-text-field type="number" :placeholder="ass_tec" suffix="R$/safra" v-model="novo_ass_tec"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CERTIFICAÇÃO: </b>
                  <v-text-field type="number" :placeholder="certificacao" suffix="R$/safra" v-model="novo_certificacao"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ANÁLISE DE SOLO: </b>
                  <v-text-field type="number" :placeholder="analise_solo" suffix="R$/safra" v-model="novo_analise_solo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ANALISE FOLIAR: </b>
                  <v-text-field type="number" :placeholder="analise_foliar" suffix="R$/safra" v-model="novo_analise_foliar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>EPI: </b>
                  <v-text-field type="number" :placeholder="epi" suffix="R$/safra" v-model="novo_epi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FERTILIZANTES DE SOLO: </b>
                  <v-text-field type="number" :placeholder="fertilizantes" suffix="R$/safra" v-model="novo_epi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁCIDOS/AMINOÁCIDOS: </b>
                  <v-text-field type="number" :placeholder="acidos" suffix="R$/safra" v-model="novo_acidos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ADUBOS FOLIARES: </b>
                  <v-text-field type="number" :placeholder="adubos" suffix="R$/safra" v-model="novo_adubos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ACARICIDA: </b>
                  <v-text-field type="number" :placeholder="acaricida" suffix="R$/safra" v-model="novo_acaricida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>BACTERICIDA: </b>
                  <v-text-field type="number" :placeholder="bactericida" suffix="R$/safra" v-model="novo_bactericida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ESPALHANTE ADESIVO: </b>
                  <v-text-field type="number" :placeholder="espalhante" suffix="R$/safra" v-model="novo_espalhante"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FUNGICIDA: </b>
                  <v-text-field type="number" :placeholder="fungicida" suffix="R$/safra" v-model="novo_fungicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>INSETICIDA: </b>
                  <v-text-field type="number" :placeholder="inseticida" suffix="R$/safra" v-model="novo_inseticida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>NEMATICIDA: </b>
                  <v-text-field type="number" :placeholder="nematicida" suffix="R$/safra" v-model="novo_nematicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÓLEO MINERAL: </b>
                  <v-text-field type="number" :placeholder="oleo_mineral" suffix="R$/safra" v-model="novo_oleo_mineral"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>HERBICIDA: </b>
                  <v-text-field type="number" :placeholder="herbicida" suffix="R$/safra" v-model="novo_herbicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>HORMÔNIOS: </b>
                  <v-text-field type="number" :placeholder="hormonios" suffix="R$/safra" v-model="novo_hormonios"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATURADORES: </b>
                  <v-text-field type="number" :placeholder="maturadores" suffix="R$/safra" v-model="novo_maturadores"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATERIAL DE COLHEITA: </b>
                  <v-text-field type="number" :placeholder="material_colheita" suffix="R$/safra" v-model="novo_material_colheita"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ARMAZENAMENTO: </b>
                  <v-text-field type="number" :placeholder="armazenamento" suffix="R$/safra" v-model="novo_armazenamento"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>BENEFÍCIO: </b>
                  <v-text-field type="number" :placeholder="beneficio" suffix="R$/safra" v-model="novo_beneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>GÁS/LENHA/CARVÃO: </b>
                  <v-text-field type="number" :placeholder="gas_lenha" suffix="R$/safra" v-model="novo_gas_lenha"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATERIAIS DE PÓS COLHEITA: </b>
                  <v-text-field type="number" :placeholder="material_colheita" suffix="R$/safra" v-model="novo_material_colheita"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>REBENEFÍCIO: </b>
                  <v-text-field type="number" :placeholder="rebeneficio" suffix="R$/safra" v-model="novo_rebeneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>SACOS/EMBALAGENS: </b>
                  <v-text-field type="number" :placeholder="embalagens" suffix="R$/safra" v-model="novo_embalagens"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CORRETAGEM: </b>
                  <v-text-field type="number" :placeholder="corretagem" suffix="R$/safra" v-model="novo_corretagem"></v-text-field>
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

      <v-flex xs11 >
        <safras></safras>
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
    materiais_colheita: '',
    rebeneficio: '',
    embalagens: '',
    corretagem: '',
    e6: 0,

    idFazenda: '',
    idSafra: '',
    novo_talhao_ident: '',
    novo_safra_ident: '',
    novo_fazenda_ident: '',
    novo_preco_venda: '',
    novo_producao_total: '',
    novo_area: '',
    novo_venda_subp: '',
    novo_mao_familiar: '',
    novo_arrend_terra: '',
    novo_aluguel_maq: '',
    novo_combustivel: '',
    novo_manu_benf: '',
    novo_manu_maq: '',
    novo_energia: '',
    novo_frete: '',
    novo_impostos: '',
    novo_mao_contratada: '',
    novo_mao_fixa: '',
    novo_despesas_gerais: '',
    novo_ass_tec: '',
    novo_despesas_gerais: '',
    novo_certificacao: '',
    novo_analise_solo: '',
    novo_analise_foliar: '',
    novo_epi: '',
    novo_acidos: '',
    novo_adubos: '',
    novo_acaricida: '',
    novo_bactericida: '',
    novo_espalhante: '',
    novo_fungicida: '',
    novo_inseticida: '',
    novo_nematicida: '',
    novo_oleo_mineral: '',
    novo_herbicida: '',
    novo_hormonios: '',
    novo_maturadores: '',
    novo_material_colheita: '',
    novo_armazenamento: '',
    novo_beneficio: '',
    novo_gas_lenha: '',
    novo_materiais_colheita: '',
    novo_rebeneficio: '',
    novo_embalagens: '',
    novo_corretagem: '',
  }),
  props:{
    id: {
      default: '-1'
    }
  },
  methods: {
    editarTalhao(){
      console.log("IdFazenda: "+this.idFazenda);
      let obj = {
        talhao_ident: this.novo_talhao_ident,
        safra_ident: this.novo_safra_ident,
        fazenda_ident: this.novo_fazenda_ident,
        producao_total: this.novo_producao_total,
        preco_venda: this.novo_preco_venda,
        area: this.novo_area,
        venda_subp: this.novo_venda_subp,
        mao_familiar: this.novo_mao_familiar,
        arrend_terra: this.novo_arrend_terra,
        aluguel_maq: this.novo_aluguel_maq,
        combustivel: this.novo_combustivel,
        manu_benf: this.novo_manu_benf,
        manu_maq: this.novo_manu_maq,
        energia: this.novo_energia,
        frete: this.novo_frete,
        impostos: this.novo_impostos,
        mao_contratada: this.novo_mao_contratada,
        mao_fixa: this.novo_mao_fixa,
        despesas_gerais: this.novo_despesas_gerais,
        ass_tec: this.novo_ass_tec,
        certificacao: this.novo_certificacao,
        analise_solo: this.novo_analise_solo,
        analise_foliar: this.novo_analise_foliar,
        epi: this.novo_epi,
        acidos: this.novo_acidos,
        adubos: this.novo_adubos,
        acaricida: this.novo_acaricida,
        bactericida: this.novo_bactericida,
        espalhante: this.novo_espalhante,
        fungicida: this.novo_fungicida,
        inseticida: this.novo_inseticida,
        nematicida: this.novo_nematicida,
        oleo_mineral: this.novo_oleo_mineral,
        herbicida: this.novo_herbicida,
        hormonios: this.novo_hormonios,
        maturadores: this.novo_maturadores,
        material_colheita: this.novo_material_colheita,
        armazenamento: this.novo_armazenamento,
        beneficio: this.novo_beneficio,
        gas_lenha: this.novo_gas_lenha,
        materiais_colheita: this.novo_material_colheita,
        rebeneficio: this.novo_rebeneficio,
        embalagens: this.novo_embalagens,
        corretagem: this.novo_corretagem
      };

      remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Os dados serão alterados. É recomendavel fazer um backup antes de alterar valores.\nVocê tem certeza que deseja fazer isso?',
                                      buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
                                        if(idx==0){
                                          this.$backend.updateTalhao(this.id, obj, this.idFazenda, this.idSafra);
                                          this.$router.push("/TalhaoView/" + this.id);
                                        }
                                      });
    }
  },
  mounted: function () {
    this.$backend.getTalhao(this.id, (talhaoObj) => {
      if(talhaoObj==null) {  this.$router.push('/'); return; }
      this.talhao_ident = talhaoObj.NomeTalhao;
      this.safra_id = talhaoObj.SafraID;
      this.producao_total = talhaoObj.ProdTotal;
      this.preco_venda = talhaoObj.PrecoVenda;
      this.area = talhaoObj.Area;
      this.venda_subp = talhaoObj.VendaSubP;
      this.mao_familiar = talhaoObj.MaoObraF;
      this.arrend_terra = talhaoObj.ArrendamentoTerras;
      this.aluguel_maq = talhaoObj.AluguelMaquinas;
      this.combustivel = talhaoObj.Combustivel;
      this.manu_benf = talhaoObj.ManutencaoBenf;
      this.manu_maq = talhaoObj.ManutencaoMaq;
      this.energia = talhaoObj.Energia;
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
      this.armazenamento = talhaoObj.Armazenamento;
      this.beneficio = talhaoObj.Beneficio;
      this.gas_lenha = talhaoObj.GasLenhaCarvao;
      this.rebeneficio = talhaoObj.Rebeneficio;
      this.embalagens = talhaoObj.Embalagens;
      this.corretagem = talhaoObj.Corretagem;

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




  }
}
</script>

<style scoped>

</style>
