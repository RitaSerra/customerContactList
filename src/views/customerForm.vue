<template>
  <div id="customerForm">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Customers</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Add new Customer</li>
      </ol>
    </nav>
 
    <div id="form" class="row mt-5">
        <div class="col-12 mb-3">
          <h1 class="float-left">New Customer:</h1>
        </div>
        <p v-if="validationError" class="error-validation-warning">Fill the required Fields please</p>
        <div class="form-group row">
          <label for="customerFirstname" class="col-2 col-form-label">Firstname</label>
          <div class="col-10 mt-2">
            <input required :disabled="!enableEdit && id" :class="(validationError) ? 'form-control error-validation' : 'form-control'" type="text" value="John" id="customerFirstname" v-model="customer.firstName">
          </div>
          <label for="customerLastname" class="col-2 col-form-label">Lastname</label>
          <div class="col-10 mt-2">
            <input :disabled="!enableEdit && id" class="form-control" type="text" value="Doe" id="customerLastname" v-model="customer.lastName">
          </div>
          <label for="customerEmail" class="col-2 col-form-label">Email</label>
          <div class="col-10 mt-2">
            <input requried :disabled="!enableEdit && id" :class="(validationError) ? 'form-control error-validation' : 'form-control'" type="email" value="myEmail@example.com" id="customerEmail" v-model="customer.email">
          </div>
          <label for="customerPhoneNumber" class="col-2 col-form-label">
              Telephone <i class="fas fa-plus" data-toogle="tooltip" data-placement="top" title="Add another number" @click="addRow"></i>
          </label>
          <div class="col-10 mt-2">
            <ul v-for="(numbers,i) in customer.phoneNumber" :key="i" >
              <input :disabled="!enableEdit && id" class="form-control" syle="width: inherit;" type="number" value="1-(555)-555-5555" v-model="customer.phoneNumber[i]">  
            </ul>
          </div>
          <label for="customerBillingAddress" class="col-2 col-form-label">Billing Address</label>
          <div class="col-10 mt-2">
            <input  :disabled="!enableEdit && id" class="form-control" type="text" value="Sun Street" id="customerBillingAddress" v-model="customer.billingAddress">
          </div>
          <label for="customerShippingAddress" class="col-2 col-form-label">Shipping Address</label>
          <div class="col-10 mt-2">
            <input :disabled="!enableEdit && id" class="form-control" type="text" value="Moon Street" id="customerShippingAddress" v-model="customer.shippingAddress">
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-outline-primary mr-2" @click="enableEdit = true" v-if="!enableEdit && id">Enable Editing</button>
      <button type="button" class="btn btn-outline-success mr-2" @click="addNewCustomer" v-if="!id">Add new customer</button>
      <button type="button" class="btn btn-outline-success mr-2" @click="updateCustomer" v-if="id && enableEdit" :disabled="!enableEdit && id">Update customer</button>
      <button type="button" class="btn btn-outline-danger" @click="goBack">Cancel</button>
    </div>
</template>

<script>
import $ from 'jquery'

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

export default {
  name: 'customerForm',
  created () {
    this.id = this.$route.params.id
    if(this.id) {
      this.enableEdit =  false
      this.getCustomerInfo(this.id)
    } 
    this.customer.phoneNumber.push('')
  },
  data () {
    return {
      customer: {
        'firstName': '',
        'lastName': '',
        'email': '',
        'phoneNumber': [],
        'shippingAddress': '',
        'billingAddress': '',
        'active': true
      },
      id: '',
      enableEdit: false,
      validationError: false
    }
  },
  methods: {
    /**
     * Change route to customer list view
     * @function goBack
     */
    goBack () {
      this.enableEdit = false
      this.$router.push('/')
    },
    /**
     * Add new row for insert new phone number
     * @function addRow
     */
    addRow () {
      this.customer.phoneNumber.push('')
    },
    /**
     * Add new customer to the list
     * @function addNewCustomer
     */
    addNewCustomer () {
      this.enableEdit = false
      if(this.customer.firstName === '') {
        this.validationError = true
      } else {
        this.$store.dispatch('addNewCustomer', this.customer)
        .then(response => {
          this.$router.push({path: '/', params: {teste: true}})
        })
      }
    },
    /**
     * Get customer details
     * @function getCustomerInfo
     * @params {number} id Customer Id
     */
    getCustomerInfo(id) {
      this.$store.dispatch('getCustomerInfo', id)
        .then(response => {
          this.customer = response
        })

    },
    /**
     * Updates customer information
     * @function updateCustomer
     */
    updateCustomer () {      
      let teste = this.$store.dispatch('updateCustomer', this.customer)
        .then(response => {
          let updated =  true
          this.$router.push({path: '/', params: {updated}})
        })
    }
  }
  
}
</script>

<style>
.teste {
  text-decoration: none;
}
.error-validation {
  border: 1px solid red !important;
}
.error-validation-warning {
  color: red;
  font-size: 14px;
}
</style>
