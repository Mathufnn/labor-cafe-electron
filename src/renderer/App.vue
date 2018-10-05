<template>
  <div id="app">
    <div class="custom_overlay" id="co1"></div>
    <v-app>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
        style="background-color:#66BB6A; overflow: hidden;  padding-bottom:0; z-index:1000;"
      >
      <div class="custom_overlay" id="co2"></div>
        <v-list id="batata">
          <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
            style="z-index:40!important;"
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <div id="deseinhos">
          <center>
            <img v-bind:src="fazendeiro_image" height="250px" class="fazendeiro" :style="'-webkit-filter: drop-shadow(0px 0px 5px ' + cor_sombra +'); filter: drop-shadow(0px 0px 5px ' + cor_sombra + ');'">
          </center>
        </div>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-footer :fixed="fixed" app color="green darken-1" class="white--text">
        <v-spacer></v-spacer>
        <span><a href="#" style="color:#fff;" @click="showhelp()"><v-icon center small dark>help</v-icon> <span style="color:#fff;">AJUDA</span></a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <b>SEBRAE</b> &copy; {{(new Date()).getFullYear()}} &nbsp;</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  console.log(__static);
  import { ipcRenderer } from 'electron'
  export default {
    name: 'Café',
    data: () => ({
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'add', title: 'Cadastro de fazendas', to: '/' },
        { icon: 'list', title: 'Lista de Fazendas', to: '/ListaFazendas' },
        { icon: 'backup', title: 'Fazer backup', to: '/Backup' },
        { icon: 'get_app', title: 'Estoque de Capital', to: '/Estoque' }
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Café',
      fazendeiro_image: 'static/fazendeiro_normal.png',
      cor_sombra: '#222'
    }),
    mounted: function (){
      this.$root.$on('fazendeiro_muda_estado', (status) => {
        if(!status.iit){ this.fazendeiro_image = "static/fazendeiro_normal.png"; this.cor_sombra ='#222';  }
        else if(status.estado==0){ this.fazendeiro_image = "static/fazendeiro_normal.png"; this.cor_sombra ='#222';  }
        else if(status.estado==1){ this.fazendeiro_image = "static/fazendeiro_desapontado.png"; this.cor_sombra ='#CFCFCF';  }
        else if(status.estado==2){ this.fazendeiro_image = "static/fazendeiro_apontado.png"; this.cor_sombra ='#CFCFCF';  }
        else if(status.estado==3){ this.fazendeiro_image = "static/fazendeiro_olhaisso.png"; this.cor_sombra ='#CFCFCF';  }
        else if(status.estado==4){ this.fazendeiro_image = "static/fazendeiro_rico.png"; this.cor_sombra ='#CFCFCF';  }
        else if(status.estado==5){ this.fazendeiro_image = "static/fazendeiro_chorando.png"; this.cor_sombra ='#CFCFCF';  }
        else if(status.estado==6){ this.fazendeiro_image = "static/fazendeiro_assustado.png"; this.cor_sombra ='#CFCFCF';  }
      });

      this.$root.$on('overlay_toggle', (status) => {
        if(status.estado==1) document.getElementById("co1").style.display = "block";
        if(status.estado==1) document.getElementById("co2").style.display = "block";
        if(status.estado==0) document.getElementById("co1").style.display = "none";
        if(status.estado==0) document.getElementById("co2").style.display = "none";
      });


    },
    watch: {
      drawer: function (newV, oldV) {
        this.$root.$emit('menu_fechado', {newV});
      }
    },
    methods: {
      showhelp() {
        ipcRenderer.send('show-help');
      }
    }
  }
</script>

<style>
   /* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'); */
  /* Global CSS */
  #batata {
    background-color: #fff;
    padding-bottom: 30vh;
    background-image: url(~@/assets/sidetop.png);
    background-position: center bottom;
    height: 60vh;
  }

  #deseinhos {
    height:32%;
    background-image: url(~@/assets/fundoreal.png);
    background-position: center bottom;
    z-index: 9088!important;
  }

  .fazendeiro {
    position: fixed;
    bottom:6%;
    right:52px;
    z-index: 9088!important;
  }

  .custom_overlay {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 99; /* Specify a stack order in case you're using a different order for other elements */
  }

  .input-group__hint {
    font-size:14px;
    color:#000 !important;
  }
</style>
