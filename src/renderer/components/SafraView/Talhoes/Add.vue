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
                  <v-text-field box label="Identificação do talhão" v-model="ident_talhao" hint = "Identificação referente ao talhão que será cadastrado."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0' label="Área de produção + reserva legal e APP" suffix="ha" v-model="area_prod" hint  = "Área destinada a cafeicultura somada a área de reserva legal da propriedade."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Produção Total" suffix="Sc" v-model="prod" hint = "Total de sacas produzidas no talhão."></v-text-field>
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
                  <v-text-field box type="text"  min='0' label="Venda de subproduto" prefix="R$" suffix="/safra" v-model="venda_subp" hint = "Renda obtida com a venda de subprodutos do talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Mão de obra familiar" prefix="R$" suffix="/safra" v-model="mao_familiar" hint = "Salário que os membros da família envolvidos na atividade cafeeira receberiam se estivessem exercendo a mesma função em outra propriedade como funcionário contratado."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Arrendamento da terra" prefix="R$" suffix="/safra" v-model="arrend_terra" hint = "Gasto referente ao arredamento de áreas destinadas ao talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Aluguel de máquinas" prefix="R$" suffix="/safra" v-model="aluguel_maq" hint = "Total de despesas com serviços terceirizados de máquinas."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Combustível" prefix="R$" suffix="/safra" v-model="combustivel" hint = "Total de despesas com combustíveis no talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Manutenção de benfeitorias" prefix="R$" suffix="/safra" v-model="manu_benf" hint = "Despesas com reformas de benfeitorias destinadas à cafeicultura para o talhão."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Manutenção de máquinas" prefix="R$" suffix="/safra" v-model="manu_maq" hint = "Despesas com manutenção de máquinas utilizadas para o talhão."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Energia elétrica" prefix="R$" suffix="/safra" v-model="energia" hint = "Despesa total com energia elétrica destinada a atividade cafeeira para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Frete/Deslocamento" prefix="R$" suffix="/safra" v-model="frete" hint = "Total de despesas com fretes e deslocamentos de produtos e insumos."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Impostos e taxas" prefix="R$" suffix="/safra" v-model="impostos" hint = "Total de despesas com impostos e taxas  (ex: FUNRURAL, IPVA, ITR) na atividade cafeeira para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Mão de obra contratada" prefix="R$" suffix="/safra" v-model="mao_contratada" hint = "Valor total gasto com mão de obra esporádica na atividade cafeeira para o talhão durante a safra, destinada a atividades específicas na propriedade."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Mão de obra fixa" prefix="R$" suffix="/safra" v-model="mao_fixa" hint = "Valor total gasto com mão de obra permanente na atividade cafeeira para o talhão durante a safra, considerando os encargos trabalhistas."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Despesas gerais de escritório" prefix="R$" suffix="/safra" v-model="despesas_gerais" hint = "Total de despesas com materiais de escritório destinados à atividade cafeeira."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Assistência técnica e gerencial" prefix="R$" suffix="/safra" v-model="ass_tec" hint = "Total de despesas com assistência técnica e gerencial destinada à atividade cafeeira."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Certificação" prefix="R$" suffix="/safra" v-model="certificacao" hint = "Total de despesas com taxas de auditoria, cobrança de uso do selo, cobrança análises laboratoriais e outras despesas destinadas à emissão da certificação da atividade cafeeira."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Análise de solo" prefix="R$" suffix="/safra" v-model="analise_solo" hint = "Total de despesas com análise de solo para o talhão na safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Análise foliar" prefix="R$" suffix="/safra" v-model="analise_foliar" hint = "Total de despesas destinadas à realização de análises foliares para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="EPI" prefix="R$" suffix="/safra" v-model="epi" hint = "Total de despesas com equipamentos de proteção individual utilizados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Fertilizantes de solo" prefix="R$" suffix="/safra" v-model="fertilizantes" hint = "Total de despesas com adubos e corretivos do solo para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Ácidos/aminoácidos" prefix="R$" suffix="/safra"  v-model="acidos" hint = "Total de despesas com ácidos e aminoácidos destinados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Adubos foliares" prefix="R$" suffix="/safra" v-model="adubos" hint = "Total de despesas com adubos foliares destinados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Acaricida" prefix="R$" suffix="/safra" v-model="acaricida" hint = "Total de despesas com acaricidas destinados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Bactericida"  prefix="R$" suffix="/safra" v-model="bactericida" hint = "Total de despesas com bactericidas destinados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Espalhante adesivo" prefix="R$" suffix="/safra" v-model="espalhante" hint = "Total de despesas com espalhantes adesivos destinados para o talhão durante a safra. "></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Inseticida" prefix="R$" suffix="/safra" v-model="inseticida" hint = "Total de despesas com inseticidas destinados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Fungicida" prefix="R$" suffix="/safra" v-model="fungicida" hint = "Total de despesas com fungicidas destinados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Nematicida" prefix="R$" suffix="/safra" v-model="nematicida" hint = "Total de despesas com nematicidas destinados para o talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Óleo mineral" prefix="R$" suffix="/safra" v-model="oleo_mineral" hint = "Total de despesas com óleos minerais utilizados no talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Herbicida" prefix="R$" suffix="/safra" v-model="herbicida" hint = "Total de despesas com herbicidas utilizados no talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Hormônios" prefix="R$" suffix="/safra" v-model="hormonios" hint = "Total de despesas com hormônios utilizados no talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Maturadores" prefix="R$" suffix="/safra" v-model="maturadores" hint = "Total de despesas com maturadores utilizados no talhão durante a safra."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Material de colheita" prefix="R$" suffix="/safra" v-model="material_colheita" hint = "Total de despesas com materiais destinados a colheita de café do talhão durante a safra. Como por exemplo: Escada, balaio, pano e/ou plástico."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Armazenamento" prefix="R$" suffix="/safra" v-model="armazenamento" hint = "Total de despesas com armazenamento das sacas de café em galpões de terceiros."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Benefício" prefix="R$" suffix="/safra" v-model="beneficio" hint = "Total de despesas com beneficiamento do café na propriedade e/ou por terceiros (eliminação de cascas, pedras dos grãos)."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Gás/lenha/carvão" prefix="R$" suffix="/safra" v-model="gas_lenha" hint = "Total de despesas com gás, lenha e carvão durante o processo de pós colheita."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Materiais pós-colheita" prefix="R$" suffix="/safra" v-model="poscolheita" hint = ""></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text" min='0'  label="Rebenefício" prefix="R$" suffix="/safra" v-model="rebeneficio" hint = "Total de despesas com o rebenefício do café feito por terceiros como separação simples por peneiras, separação com catação de pedras e separação completa com catação de pedras, peneiras e ventilação."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Saco/Embalagens" prefix="R$" suffix="/safra" v-model="embalagens" hint = "Total de despesas com sacos e embalagens para armazenamento do café."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field box type="text"  min='0' label="Corretagem" prefix="R$" suffix="/safra" v-model="corretagem" hint = "Total de despesas com profissionais que indicarão a atual qualidade do café e quais são as suas possibilidades de venda a agroindústria nacional ou exportação."></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.native="SalvarTalhao">Salvar novo talhão</v-btn>
          <v-btn flat @click.native="e6 = 1">Voltar</v-btn>
        </v-stepper-content>
      </v-stepper>
      <div id="dialog_p" v-if="dialog" :style="'background: url('+dialog_partezinha+')  no-repeat left 9px bottom 10px; border-right: 4px solid transparent;'">
        <div id="dialog_s" style="font-size:18px;">
            <v-btn small icon color="green darken-1" style="float:right; margin:-15px;" flat="flat" @click="dialog = false, overtoggle(0)"><v-icon>close</v-icon></v-btn><br />
              <center><b>Atenção</b></center>
              <br />
              <br />
              Quanto mais precisos forem os seus lançamentos, mais confiáveis serão os relatórios gerados.
              <br />
              <br />
            <v-btn color="white" style="float:right"  @click="dialog = false, overtoggle(0)">FECHAR</v-btn>
        </div>
      </div>
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
    e6: 0,
    dialog: false,
    dialog_partezinha: 'static/fala.png'
  }),
  props:{
    sid:{
      default: '-1'
    }
  },
  methods: {
    overtoggle(estado){
      this.$root.$emit('overlay_toggle', {estado});
    },
    SalvarTalhao: function() {
      if(this.sid == -1) return;
      Object.keys(this.$data).forEach((key, original_values) => {
        this.$data[key] = this.$data[key].toString().replace(/\./g,'').replace(/,/g,'.');
      });
      this.$backend.addTalhao({
        SafraID: this.sid,
        NomeTalhao: this.ident_talhao,
        ProdTotal: this.prod,
        Area: this.area_prod,
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
        Correntagem: this.corretagem
      }, (created) => {
        console.log(this.id);
        this.$router.push("/TalhaoView/"+created.id)
      });
    }
  },
  mounted: function(){
    this.dialog = true;
    this.overtoggle(1);
  },
  created: function(){
    Object.keys(this.$data).forEach((key, original_values) => {
      if(key=='e6' || key=='msg' || key=='dialog' || key=='ident_talhao' || key=='dialog_partezinha') return;
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
