import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customerList: [
      {
        "_id": 1, 
        "firstName": "John",
        "lastName": "Doe",
        "email": "Johndoe@nobody.org",
        "phoneNumber": ["007001002"],
        "shippingAddress": "No where street",
        "billingAddress": "No where street",
        "active": true
      },
      {
        "_id": 2, 
        "firstName": "Mary",
        "lastName": "Someone",
        "email": "mary@nobody.org",
        "phoneNumber": ["098123456", "098715234"],
        "shippingAddress": "Sunflower street",
        "billingAddress": "",
        "active": true
      }
    ]   
    
  },
  mutations: {
    /** Changes the customer active field value to false
     * @mutation ChangeActiveField
     * @param {Object[]} state 
     * @param {Number} index 
     */
    changeActiveField (state, index) {
      state.customerList[index].active = false
      console.log('state.customer.list', state.customerList[index])
    },
    /**
     * Add new customer
     * @mutation addNewCustomer
     * @param {Object[]} state 
     * @param {Object} customer 
     */
    addNewCustomer (state, customer) {
        state.customerList.unshift(customer)
    },
    /**
     * Updates customer Information
     * @mutation updateCustomer
     * @param {Object[]} state 
     * @param {Object} params 
     */
    updateCustomer (state, params) {
      let index = params.customerIndex
      let customer = params.customer

      state.customerList[index].firstName = customer.firstName
      state.customerList[index].lastName = customer.lastName
      state.customerList[index].email = customer.email
      state.customerList[index].phoneNumber = customer.phoneNumber
      state.customerList[index].shippingAddress = customer.shippingAddress
      state.customerList[index].billingAddress = customer.billingAddress
      state.customerList[index].active = customer.active
    }
  },
  actions: {
    /**
     * Action to changes the customer active state
     * @action setCustomerInative
     * @param {Object} context 
     * @param {Number} id 
     */
    setCustomerInative (context, id) {
      let removeIndex = context.state.customerList.map(customer => customer._id).indexOf(id)
      context.commit('changeActiveField', removeIndex)
    },
    /**
     * Action to add new customer
     * @action addNewCustomer
     * @param {Object} context 
     * @param {Object} customer 
     */
    addNewCustomer (context, customer) {
      //generate new sequential ID
      let i = 0;
      let allIDs = [];
      let customerList = context.state.customerList
    
      // get customerID all _ids
      for(i; i < customerList.length; i++) {
        console.log(customerList[i]._id)
        allIDs.push(customerList[i]._id)
       }
      
       let lastIDNumber = Math.max.apply(null, allIDs)
       let newID = lastIDNumber + 1

      customer._id = newID
      context.commit('addNewCustomer', customer)
    }, /**
     * Action to get customer information
     * @action getCustomerInfo
     * @param {Object} context 
     * @param {Number} id 
     */
     getCustomerInfo (context, id) {
      let teste = context.state.customerList
      teste = teste.filter(x => x._id == id ) 
      return teste[0]
    },
    /**
     * Action to update customer information
     * @action updateCustomer
     * @param {Object} context 
     * @param {Object} customer 
     */
    updateCustomer (context, customer) {
      let customerIndex = context.state.customerList.map(customer => customer._id).indexOf(customer._id)
      context.commit('updateCustomer', {customerIndex, customer})
    },
  },
  getters: {
    /**
     * Get all active customers
     * @getter activeCustomers
     * @param {Object} state
     */
    activeCustomers: state => {
      return state.customerList.filter(customer => customer.active)
    }
  }
})
