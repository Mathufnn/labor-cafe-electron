<template>
  <v-container grid-list-xl fill-height >
    <v-layout row wrap justify-space-around id="wrapper">
      <v-flex xs11>
        <v-card>
          <v-card-text>
            <v-layout id="wrapper">
              <v-flex xs6>
                <h1>Fazenda {{nome_fazenda}}</h1>
              </v-flex>
              <v-flex xs6 class="text-xs-right" >
                <v-btn small  color="secondary" slot="activator" router to="/ListaFazendas"><v-icon center dark>arrow_back</v-icon> VOLTAR À LISTA DE FAZENDAS</v-btn>
              </v-flex>
            </v-layout>
            <v-container fluid>
              <v-layout row wrap subheading>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-text-field box label="Nome da fazenda" v-model="nome_fazenda"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 mt-4>
                    <v-select
                    :items="production_sys_l"
                    v-model="sistema_producao"
                    label="Sistema de Produção"
                    box
                    ></v-select>

                  </v-flex>
                  <v-flex xs12 sm6 mt-4>
                    <v-select
                    :items="states"
                    v-model="cidade"
                    label="Cidade"
                    autocomplete
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-flex>
                  <v-btn block color="primary" large @click="editarFazenda">SALVAR ALTERAÇÕES</v-btn>
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
    production_sys_l: ["Irrigado", "Sequeiro"],
    nome_fazenda: '',
    sistema_producao: '',
    agronegocio: '',
    cidade: '',
    states: require('./cidades.json').mg_city_list
  }),
  props:{
    id: {
      default: '-1'
    }
  },
  methods: {
    editarFazenda(){
      remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Os dados serão alterados. É recomendavel fazer um backup antes de alterar valores.\nVocê tem certeza que deseja fazer isso?',
      buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
        if(idx==0){
          let obj = {
            NomeFazenda: this.nome_fazenda,
            SistemaProducao: this.sistema_producao,
            Cidade: this.cidade
          };


          this.$backend.updateFazenda(this.id, obj, () => {
            this.$router.push("/FazendaView/" + this.id);
          });
        }
      });
    }
  },
  mounted: function () {
    this.$backend.getFazenda(this.id, (fazendaObj) => {
      if(fazendaObj==null) {  this.$router.push('/'); return; }

      this.nome_fazenda = fazendaObj.NomeFazenda;
      this.sistema_producao = fazendaObj.SistemaProducao==1?'Irrigado':'Sequeiro';
      this.cidade = fazendaObj.Cidade;

    });
  },
  created: function(){

  },
}
</script>

<style scoped>

</style>
