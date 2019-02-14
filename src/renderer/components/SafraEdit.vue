<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <v-layout id="wrapper">
              <v-flex xs6>
                <h1>Safra {{identificacao_safra}}</h1>
                <h2>Fazenda {{fazenda_ident}}</h2>
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="secondary" slot="activator" router :to="'/FazendaView/'+ fazenda_id"><v-icon center dark>arrow_back</v-icon> VOLTAR ÀS INFORMAÇÕES DA FAZENDA</v-btn>
              </v-flex>
            </v-layout>
            <v-container fluid>
              <v-layout row wrap subheading>
                <v-flex xs12 sm12>
                  <v-text-field box label="Identificação da safra" v-model="identificacao_safra"></v-text-field>
                </v-flex> <!--
                <v-flex xs12 sm6>
                  <v-text-field box label="Área em produção" suffix="ha" v-model="area_producao"></v-text-field>
                </v-flex> -->
                <v-flex xs12 sm6>
                  <v-text-field box type="text" label="Preço médio da terra nua" prefix="R$" suffix="/ha" v-model="preco_medio"></v-text-field>
                </v-flex> <!--
                <v-flex xs12 sm6>
                  <v-text-field box label="Produção total da safra" suffix="Sc" v-model="producao_total"></v-text-field>
                </v-flex>-->
                <v-flex xs12 sm6 >
                  <v-text-field box type="text" label="Preço de venda" prefix="R$" suffix="/Sc" v-model="preco_venda"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-btn block color="primary" large @click="editarSafra">SALVAR ALTERAÇÕES</v-btn>
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
import { remote } from 'electron'
export default {
  data: () => ({
    identificacao_safra: '',
    area_producao: '',
    preco_medio: '',
    producao_total: '',
    preco_venda: '',
    fazenda_id: '',
    fazenda_ident: ''
  }),
  props:{
    id: {
      default: '-1'
    }
  },
  methods: {
    formatN(vr,minimium=2){
      if(typeof vr == 'undefined') return '';
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: 0})
    },
    editarSafra(){
      remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Os dados serão alterados. É recomendavel fazer um backup antes de alterar valores.\nVocê tem certeza que deseja fazer isso?',
      buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
        if(idx==0){
          Object.keys(this.$data).forEach((key, original_values) => {
            this.$data[key] = this.$data[key].toString().replace(/\./g,'').replace(/,/g,'.');
          });

          let obj = {
            IdentSafra: this.identificacao_safra,
            PrecoMTerraN: this.preco_medio,
            PrecoVenda: this.preco_venda
          };


          this.$backend.updateSafra(this.id, obj, () => {
            this.$router.push("/SafraView/" + this.id);
          });
        }
      });
    }
  },
  mounted: function () {
    this.$backend.getSafra(this.id, (safraObj) => {
      if(safraObj==null) {  this.$router.push('/'); return; }

      this.identificacao_safra = safraObj.IdentSafra;
      this.preco_medio = this.formatN(safraObj.PrecoMTerraN);
      this.preco_venda  =  this.formatN(safraObj.PrecoVenda);
      this.fazenda_id = safraObj.FazendaID;

        //aqui tambem
      this.$backend.getFazenda(safraObj.FazendaID, (fazendaObj) => {
        this.fazenda_ident = fazendaObj.NomeFazenda;
      });

    });
  },
  created: function(){
    Object.keys(this.$data).forEach((key, original_values) => {
      if(key=='fazenda_id' || key=='fazenda_ident' || key=='identificacao_safra') return;
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
