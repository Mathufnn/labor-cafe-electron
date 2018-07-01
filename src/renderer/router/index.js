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
      path: '/FazendaView/:id',
      name: 'FazendaView',
      component: require('@/components/FazendaView').default,
      props: true
    },
    {
      path: '/Backup',
      name: 'Backup',
      component: require('@/components/Backup').default
    },
    {
      path: '/TalhaoView/:id',
      name: 'TalhaoView',
      component: require('@/components/TalhaoView').default,
      props: true
    },
    {
        path: '/SafraView/:id',
        name: 'SafraView',
        component: require('@/components/SafraView').default,
        props: true
    },
    {
      path: '/TalhaoEdit/:id',
      name: 'TalhaoEdit',
      component: require('@/components/TalhaoEdit').default,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
