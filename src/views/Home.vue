<template>
  <div class="home">

    <router-link to="/add-new-customer" style="color: white"><button class="btn btn-success">Add new customer</button></router-link>

    <table class="table table-hover mt-3" >
      <thead>
        <tr>
          <th scope="col">First Name:</th>
          <th scope="col">Last Name:</th>
          <th scope="col">Email:</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="data in allActiveCustomers" :key="data._id">
        <tr>
          <th >{{data.firstName}}</th>
          <td >{{data.lastName}}</td>
          <td >{{data.email}}</td>
          <td >
            <i @click="removeCustomer(data._id)" style="color: red;" class="fas fa-trash" data-toggle="tooltip" data-placement="top" title="Remove Customer"></i>
            <i class="fas fa-edit ml-3" style="color: blue" @click="seeDetails(data._id)" data-toggle="tooltip" data-placement="top" title="Edit Customer"></i>
          </td>
        </tr>
    </tbody>
  </table>

  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="allActiveCustomers.length === 0">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>No data</strong> Please add a new customer.
  </div>
  
  </div>
</template>

<script>
export default {
  name: 'customerListView',
  created () {
    this.allActiveCustomers = this.$store.getters.activeCustomers
  },
  data() {
    return {
      allActiveCustomers: ''
    }
  },
  methods: {
    /**
     * Remove a customer - updates customer active state to false
     * @function removeCustomer
     * 
     * @params {Number} id Customer Id to remove
     */
    removeCustomer (id) {
     this.$store.dispatch('setCustomerInative', id)
      .then(x => this.allActiveCustomers = this.$store.getters.activeCustomers)
    },
    /**
     * Changes route to a form view to see customer details
     * @function seeDetails
     * 
     * @params {number} id Customer Id to see details
     */
    seeDetails (id) {
      this.$router.push({name: 'customerDetail', params: {id}})
    }
  }
}
</script>
