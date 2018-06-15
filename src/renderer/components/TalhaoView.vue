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
                  <b>PRODUÇÃO TOTAL: </b> {{producao_total}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ÁREA: </b> {{area}} <span class="caption">ha</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>VENDA DUB PRODUTO: </b> {{venda_subp}} <span class="caption">R$</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MAO DE OBRA FAMILIAR: </b> {{mao_familiar}} <span class="caption">R$</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ARRENDAMENTO TERRAS: </b> {{arrend_terra}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ALUGUEL DE MAQUINAS: </b> {{aluguel_maq}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>COMBUSTIVEL: </b> {{combustivel}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MANUTENÇÃO MAQUINAS: </b> {{manu_maq}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MANUTENÇÃO BENFEITORIAS: </b> {{manu_benf}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ENERGIA: </b> {{energia}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FRETE: </b> {{frete}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>IMPOSTOS: </b> {{impostos}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CONTRATADA: </b> {{mao_contratada}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FIXA: </b> {{mao_fixa}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>DESPESAS GERAIS: </b> {{despesas_gerais}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ASSISTENCIA TECNICA: </b> {{ass_tec}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CERTIFICAÇÃO: </b> {{certificacao}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ANALISE SOLO: </b> {{analise_solo}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ANALISE FOLIAR: </b> {{analise_foliar}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>EPI: </b> {{epi}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ACIDOS: </b> {{acidos}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ADUBOS: </b> {{adubos}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ACARICIDAS: </b> {{acaricida}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>BACTERICIDAS: </b> {{bactericida}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ESPALHANTE: </b> {{espalhante}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>FUNGICIDA: </b> {{fungicida}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>NEMATICIDA: </b> {{nematicida}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>OLEO MINERAL: </b> {{oleo_mineral}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>HERBICIDA: </b> {{herbicida}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>HORMONIOS: </b> {{hormonios}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATURADORES: </b> {{maturadores}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATERIAL COLHEITA: </b> {{material_colheita}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>ARMAZENAMENTO: </b> {{armazenamento}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>BENEFICIO: </b> {{beneficio}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>GAS LENHA CARVAO: </b> {{gas_lenha}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>MATERIAIS POS COLHEITA: </b> {{material_colheita}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>REBENEFICIO: </b> {{rebeneficio}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>EMBALAGENS: </b> {{embalagens}} <span class="caption">Sc</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <b>CORRETAGEM: </b> {{corretagem}} <span class="caption">Sc</span>
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
<!--
      <v-flex xs11 >
        <indicadores></indicadores>
      </v-flex> -->


    </v-layout>
  </v-container>
</template>

<script>
import Indicadores from './TalhaoView/Indicadores'

export default {
  name: 'TalhaoView',
  components: { Indicadores },
  data: () => ({
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
    e6: 0
  }),
  props:{
    id: {
      default: '-1'
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

</style>
