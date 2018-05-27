<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-card>
        <v-card-title class="headline">
          Cadastrar novo talhão
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <h2 class="subheading" >INFORMAÇÕES BÁSICAS</h2>
          <v-divider></v-divider>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field box label="Indentificação do talhão" v-model="ident_talhao"></v-text-field>
              </v-flex>
              <v-flex xs12 sm3>
                <v-text-field box label="Produção Total" v-model="prod_total"></v-text-field>
              </v-flex>
              <v-flex xs12 sm3>
                <v-text-field box label="Área" v-model="area"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Venda de subproduto" v-model="venda_subp"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Mão de obra familiar" v-model="mao_familiar"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Arrendamento da terra" v-model="arrend_terra"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Aluguel de máquinas" v-model="aluguel_maq"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Combustível"v-model="combustivel" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Manutenção de benfeitorias" v-model="manu_benf"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Manutenção de máquinas" v-model="manu_maq"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Energia elétrica" v-model="energia"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Frete/Deslocamento" v-model="frete"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Impostos e taxas" v-model="impostos"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Mão de obra contratada" v-model="mao_contratada"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Mão de obra fixa" v-model="mao_fixa"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Despesas gerais de escritório" v-model="despesas_gerais"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Assistência técnica e gerencial" v-model="ass_tec"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Certificação" v-model="certificacao"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Análise de solo" v-model="analise_solo"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Análise foliar" v-model="analise_foliar"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="EPI" v-model="epi"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Ácidos/aminoácidos" v-model="acidos"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Adubos foliares" v-model="adubos"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Acaricida" v-model="acaricida"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Bactericida" v-model="bactericida"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Espalhante adesivo" v-model="espalhante"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Fungicida" v-model="fungicida"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Nematicida" v-model="nematicida"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Óleo mineral" v-model="oleo_mineral"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Herbicida" v-model="herbicida"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Hormônios" v-model="hormonios"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Maturadores" v-model="maturadores"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Material de colheita"v-model="material_colheita" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Armazenamento" v-model="armazenamento"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Benefício" v-model="beneficio"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Gás/lenha/carvão" v-model="gas_lenha"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Materiais pós-colheita" v-model="materiais_colheita"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Rebenefício" v-model="rebeneficio"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Embalagens" v-model="embalagens"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field box label="Corretagem" v-model="correntagem"></v-text-field>
              </v-flex>
            </v-layout>


          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn block color="info" large>SALVAR NOVO TALHÃO</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    ident_talhao: '',
    prod_total: '',
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
    correntagem: ''
  }),
  props:{
    fid:{
      default: "-1"
    }
  },
  methods: {
    SalvarTalhao: function() {
      if(this.fid == -1) return;
      this.$backend.addTalhao({
        TalhaoID: this.ident_talhao,
        Area: this.area,
        ProdTotal: this.prod_total,
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
        Despesas: this.despesas,
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
        Benficios: this.beneficios,
        GasLenhaCarvao: this.gas_lenha,
        PosColheita: this.material_colheita,
        Rebeneficio: this.rebeneficio,
        //  Saco: this.Saco,
        Correntagem: this.correntagem,
        SafraID: this.fid
      }), (created) => {
        console.log(this.id);
        this.$router.push("/TalhaoView/"+created.id)
      }
    }
  }
}
</script>

<style scoped>

</style>
