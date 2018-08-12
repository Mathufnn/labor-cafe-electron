<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 class="mf">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Informações
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-card class="mb-3">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm12>
                  <v-text-field box label="Identificação do talhão" v-model="ident_talhao"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0' label="Área de produção + reserva legal e APP" suffix="ha" v-model="area_prod"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Produção Total" suffix="Sc" v-model="prod"></v-text-field>
                </v-flex>
                <!--
                <v-flex xs12 sm4>
                  <v-text-field box type="text" min='0'  label="Preço de venda (R$/Sc)" v-model="preco_venda"></v-text-field>
                </v-flex> -->
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.native="e6 = 2">Continuar</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 2" step="2">Elementos de despesa</v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="mb-3">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Venda de subproduto" prefix="R$" suffix="/safra" v-model="venda_subp"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Mão de obra familiar" prefix="R$" suffix="/safra" v-model="mao_familiar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Arrendamento da terra" prefix="R$" suffix="/safra" v-model="arrend_terra"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Aluguel de máquinas" prefix="R$" suffix="/safra" v-model="aluguel_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'   label="Combustível" prefix="R$" suffix="/safra" v-model="combustivel" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Manutenção de benfeitorias" prefix="R$" suffix="/safra" v-model="manu_benf"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Manutenção de máquinas" prefix="R$" suffix="/safra" v-model="manu_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Energia elétrica" prefix="R$" suffix="/safra" v-model="energia"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Frete/Deslocamento" prefix="R$" suffix="/safra" v-model="frete"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Impostos e taxas" prefix="R$" suffix="/safra" v-model="impostos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Mão de obra contratada" prefix="R$" suffix="/safra" v-model="mao_contratada"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Mão de obra fixa" prefix="R$" suffix="/safra" v-model="mao_fixa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Despesas gerais de escritório" prefix="R$" suffix="/safra" v-model="despesas_gerais"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Assistência técnica e gerencial" prefix="R$" suffix="/safra" v-model="ass_tec"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Certificação" prefix="R$" suffix="/safra" v-model="certificacao"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Análise de solo" prefix="R$" suffix="/safra" v-model="analise_solo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Análise foliar" prefix="R$" suffix="/safra" v-model="analise_foliar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="EPI" prefix="R$" suffix="/safra" v-model="epi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Fertilizantes de solo" prefix="R$" suffix="/safra" v-model="fertilizantes"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Ácidos/aminoácidos" prefix="R$" suffix="/safra"  v-model="acidos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Adubos foliares" prefix="R$" suffix="/safra" v-model="adubos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Acaricida" prefix="R$" suffix="/safra" v-model="acaricida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Bactericida"  prefix="R$" suffix="/safra" v-model="bactericida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Espalhante adesivo" prefix="R$" suffix="/safra" v-model="espalhante"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Inseticida" prefix="R$" suffix="/safra" v-model="inseticida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Fungicida" prefix="R$" suffix="/safra" v-model="fungicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Nematicida" prefix="R$" suffix="/safra" v-model="nematicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Óleo mineral" prefix="R$" suffix="/safra" v-model="oleo_mineral"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Herbicida" prefix="R$" suffix="/safra" v-model="herbicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Hormônios" prefix="R$" suffix="/safra" v-model="hormonios"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Maturadores" prefix="R$" suffix="/safra" v-model="maturadores"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Material de colheita" prefix="R$" suffix="/safra" v-model="material_colheita" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Armazenamento" prefix="R$" suffix="/safra" v-model="armazenamento"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Benefício" prefix="R$" suffix="/safra" v-model="beneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Gás/lenha/carvão" prefix="R$" suffix="/safra" v-model="gas_lenha"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Materiais pós-colheita" prefix="R$" suffix="/safra" v-model="poscolheita"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Rebenefício" prefix="R$" suffix="/safra" v-model="rebeneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Saco/Embalagens" prefix="R$" suffix="/safra" v-model="embalagens"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Corretagem" prefix="R$" suffix="/safra" v-model="corretagem"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.native="SalvarTalhao">Salvar novo talhão</v-btn>
          <v-btn flat @click.native="e6 = 1">Voltar</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    ident_talhao: '',
    prod: '',
    area_prod: '',
    preco_venda: '',
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
    inseticida: '',
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
    poscolheita: '',
    rebeneficio: '',
    embalagens: '',
    corretagem: '',
    e6: 0
  }),
  props:{
    sid:{
      default: '-1'
    }
  },
  methods: {
    SalvarTalhao: function() {
      if(this.sid == -1) return;
      Object.keys(this.$data).forEach((key, original_values) => {
        this.$data[key] = this.$data[key].toString().replace(/\./g,'').replace(/,/g,'.');
      });
      this.$backend.addTalhao({
        NomeTalhao: this.ident_talhao,
        Area: this.area_prod,
        ProdTotal: this.prod,
        PrecoVenda: this.preco_venda,
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
        Fertilizantes: this.fertilizantes,
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
        PosColheita: this.poscolheita,
        Rebeneficio: this.rebeneficio,
        Saco: this.embalagens,
        Correntagem: this.corretagem,
        SafraID: this.sid
      }, (created) => {
        console.log(this.id);
        this.$router.push("/TalhaoView/"+created.id)
      });
    }
  },
  created: function(){
    Object.keys(this.$data).forEach((key, original_values) => {
      if(key=='e6' || key=='msg' || key=='dialog' || key=='ident_talhao') return;
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
