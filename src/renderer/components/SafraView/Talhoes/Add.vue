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
                <v-flex xs12 sm12>
                  <v-text-field box type="number" label="Produção (Sc)" v-model="prod"></v-text-field>
                </v-flex>
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
                  <v-text-field box type="number"label="Venda de subproduto" suffix="R$/safra" v-model="venda_subp"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Mão de obra familiar" suffix="R$/safra" v-model="mao_familiar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Arrendamento da terra" suffix="R$/safra" v-model="arrend_terra"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Aluguel de máquinas" suffix="R$/safra" v-model="aluguel_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Combustível" suffix="R$/safra" v-model="combustivel" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Manutenção de benfeitorias" suffix="R$/safra" v-model="manu_benf"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Manutenção de máquinas" suffix="R$/safra" v-model="manu_maq"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Energia elétrica" suffix="R$/safra" v-model="energia"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Frete/Deslocamento" suffix="R$/safra" v-model="frete"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Impostos e taxas" suffix="R$/safra" v-model="impostos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Mão de obra contratada" suffix="R$/safra" v-model="mao_contratada"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Mão de obra fixa" suffix="R$/safra" v-model="mao_fixa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Despesas gerais de escritório" suffix="R$/safra" v-model="despesas_gerais"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Assistência técnica e gerencial" suffix="R$/safra" v-model="ass_tec"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Certificação" suffix="R$/safra" v-model="certificacao"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Análise de solo" suffix="R$/safra" v-model="analise_solo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Análise foliar" suffix="R$/safra" v-model="analise_foliar"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="EPI" suffix="R$/safra" v-model="epi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Ácidos/aminoácidos" suffix="R$/safra"  v-model="acidos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Adubos foliares" suffix="R$/safra" v-model="adubos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Acaricida" suffix="R$/safra" v-model="acaricida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Bactericida"  suffix="R$/safra" v-model="bactericida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Espalhante adesivo" suffix="R$/safra" v-model="espalhante"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Inseticida" suffix="R$/safra" v-model="inseticida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Fungicida" suffix="R$/safra" v-model="fungicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Nematicida" suffix="R$/safra" v-model="nematicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Óleo mineral" suffix="R$/safra" v-model="oleo_mineral"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Herbicida" suffix="R$/safra" v-model="herbicida"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Hormônios" suffix="R$/safra" v-model="hormonios"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Maturadores" suffix="R$/safra" v-model="maturadores"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Material de colheita" suffix="R$/safra" v-model="material_colheita" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Armazenamento" suffix="R$/safra" v-model="armazenamento"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Benefício" suffix="R$/safra" v-model="beneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Gás/lenha/carvão" suffix="R$/safra" v-model="gas_lenha"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Materiais pós-colheita" suffix="R$/safra" v-model="materiais_colheita"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Rebenefício" suffix="R$/safra" v-model="rebeneficio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Saco/Embalagens" suffix="R$/safra" v-model="embalagens"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="number" label="Corretagem" suffix="R$/safra" v-model="corretagem"></v-text-field>
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
    materiais_colheita: '',
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
      this.$backend.addTalhao({
        NomeTalhao: this.ident_talhao,
        Area: this.area,
        ProdTotal: this.prod,
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
        PosColheita: this.material_colheita,
        Rebeneficio: this.rebeneficio,
        Saco: this.embalagens,
        Correntagem: this.corretagem,
        SafraID: this.sid
      }, (created) => {
        console.log(this.id);
        this.$router.push("/TalhaoView/"+created.id)
      });
    }
  }
}
</script>

<style scoped>

</style>
