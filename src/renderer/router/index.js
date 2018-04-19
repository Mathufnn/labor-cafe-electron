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
      path: '/ListaFazendas',
      name: 'ListaFazendas',
      component: require('@/components/ListaFazendas').default
    },
    {
      path: '/FazendaView',
      name: 'FazendaView',
      component: require('@/components/FazendaView').default
    },
    {
      path: '/Backup',
      name: 'Backup',
      component: require('@/components/Backup').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
