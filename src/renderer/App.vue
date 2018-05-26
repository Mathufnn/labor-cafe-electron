<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
        style="background-color:#66BB6A;"
      >
        <v-list id="batata">
          <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
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
        <span>&copy; 2018 &nbsp;</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  console.log(__static);
  export default {
    name: 'labor-cafe',
    data: () => ({
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'add', title: 'Cadastro de fazendas', to: '/' },
        { icon: 'list', title: 'Lista de Fazendas', to: '/ListaFazendas' },
        { icon: 'backup', title: 'Fazer backup', to: '/Backup' }
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Labor Café'
    })
  }
</script>

<style>
   /* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'); */
  /* Global CSS */
  #batata {
    background-color: #fff;
    padding-bottom: 50vh;
    background-image: url(~@/assets/sidetop.png);
    background-position: center bottom
  }
</style>
