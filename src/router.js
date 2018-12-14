import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import customerForm from './views/customerForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home    },
    {
      path: '/add-new-customer',
      name: 'addNewCustomer ',
      component: customerForm
    },
    {
      path: '/customer-detail/:id',
      name: 'customerDetail',
      component: customerForm
    }
  ]
})
