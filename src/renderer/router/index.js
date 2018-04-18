import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CadastroFazendas',
      component: require('@/components/CadastroFazendas').default
    },
    {
      path: '/CadastroTalhoes',
      name: 'CadastroTalhoes',
      component: require('@/components/CadastroTalhoes').default
    },
    {
      path: '/CadastroSafras',
      name: 'CadastroSafras',
      component: require('@/components/CadastroSafras').default
    },
    {
      path: '/ListaFazendas',
      name: 'ListaFazendas',
      component: require('@/components/ListaFazendas').default
    },
    {
      path: '/ListaTalhoes',
      name: 'ListaTalhoes',
      component: require('@/components/ListaTalhoes').default
    },
    {
      path: '/ListaSafras',
      name: 'ListaSafras',
      component: require('@/components/ListaSafras').default
    },
    {
      path: '/FazendaView',
      name: 'FazendaView',
      component: require('@/components/FazendaView').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
