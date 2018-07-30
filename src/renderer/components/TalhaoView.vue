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
                <b>PRODUÇÃO TOTAL:</b> {{formatN(producao_total)}} <span class="caption">Sc</span><br />
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
          </v-card-title>
          <v-container fluid v-if="view">
            <hr/>
            <v-layout row wrap subheading>
              <v-flex xs12 sm4>
                <b>VENDA SUB PRODUTO</b><br /> {{formatN(venda_subp)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MÃO DE OBRA FAMILIAR </b><br /> {{formatN(mao_familiar)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ARRENDAMENTO TERRAS </b><br /> {{formatN(arrend_terra)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ALUGUEL DE MAQUINAS </b><br /> {{formatN(aluguel_maq)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>COMBUSTÍVEL </b><br /> {{formatN(combustivel)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MANUTENÇÃO MÁQUINAS </b><br /> {{formatN(manu_maq)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MANUTENÇÃO BENFEITORIAS </b><br /> {{formatN(manu_benf)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ENERGIA </b><br /> {{formatN(energia)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>FRETE </b><br /> {{formatN(frete)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>IMPOSTOS </b><br /> {{formatN(impostos)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MÃO DE OBRA CONTRATADA </b><br /> {{formatN(mao_contratada)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MÃO DE OBRA FIXA </b><br /> {{formatN(mao_fixa)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>DESPESAS GERAIS </b><br /> {{formatN(despesas_gerais)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ASSISTÊNCIA TÉCNICA </b><br /> {{formatN(ass_tec)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>CERTIFICAÇÃO </b><br /> {{formatN(certificacao)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ANÁLISE SOLO </b> <br />{{formatN(analise_solo)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ANÁLISE FOLIAR </b><br /> {{formatN(analise_foliar)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>EPI </b><br /> {{formatN(epi)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ÁCIDOS </b><br /> {{formatN(acidos)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ADUBOS </b><br /> {{formatN(adubos)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ACARICIDAS </b><br /> {{formatN(acaricida)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>BACTERICIDAS </b><br /> {{formatN(bactericida)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ESPALHANTE </b> <br />{{formatN(espalhante)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>INSETICIDA </b><br /> {{formatN(inseticida)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>FUNGICIDA </b><br /> {{formatN(fungicida)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>NEMATICIDA </b><br /> {{formatN(nematicida)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ÓLEO MINERAL </b><br /> {{formatN(oleo_mineral)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>HERBICIDA </b><br /> {{formatN(herbicida)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>HORMÔNIOS </b><br /> {{formatN(hormonios)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MATURADORES </b><br />{{formatN(maturadores)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MATERIAL COLHEITA </b><br /> {{formatN(material_colheita)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>ARMAZENAMENTO </b><br /> {{formatN(armazenamento)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>BENEFÍCIO </b><br /> {{formatN(beneficio)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>GÁS LENHA CARVAO </b><br /> {{formatN(gas_lenha)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>MATERIAIS PÓS COLHEITA </b><br /> {{formatN(material_colheita)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>REBENEFÍCIO </b><br /> {{formatN(rebeneficio)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>EMBALAGENS </b><br /> {{formatN(embalagens)}} <span class="caption">R$/safra</span>
              </v-flex>
              <v-flex xs12 sm4>
                <b>CORRETAGEM </b><br /> {{formatN(corretagem)}} <span class="caption">R$/safra</span>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs11 >
        <indicadores :tid="id"></indicadores>
      </v-flex>

      <v-flex xs11 >
        <relatorios :tid="id"></relatorios>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>
import Indicadores from './TalhaoView/Indicadores'
import Relatorios from './TalhaoView/Relatorios'
import fs from 'fs'

export default {
  name: 'TalhaoView',
  components: { Indicadores, Relatorios },
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
    view: false
  }),
  props:{
    id: {
      default: '-1'
    }
  },
  methods: {
    showElementos: function(){
      this.view = !this.view
    },
    formatN(vr){
      return parseFloat(vr).toFixed(2).toLocaleString('pt-BR');
      // return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR');
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

</style>
