<template>
  <div style="padding : 20px">
    <div> 
      <h2 class="subtitle">
        Enter below data to execute ownershipTransfer transaction (Sell the batch)
      </h2>

    <b-form @submit="onSubmit" @reset="onReset">

      <b-form-group
        id="input-group-1"
        label="Batch Id :"
        label-for="input-1"
        description="Batch Id or Batch Number"
      >
        <b-form-input
          id="input-1"
          v-model="form.batchId"
          type="text"
          
          placeholder="Enter BatchId "
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Upcoming Owner :"
        label-for="input-1"
        description="Licence Number of upcoming owner"
      >
        <b-form-input
          id="input-1"
          v-model="form.upcomingOwner"
          type="text"
          
          placeholder="Enter Licence number of upcomingeOwner "
        ></b-form-input>
      </b-form-group>

      
      <b-button type="submit" variant="primary" v-if="!spin">Submit</b-button>
      <b-button type="reset" variant="danger" v-if="!spin">Reset</b-button>
    </b-form>

    <div v-if="spin">
  <b-spinner label="Loading..."></b-spinner>
</div>

    </div>
    <b-card class="mt-3" header="Search Result" v-if="show" >
      <pre class="m-0">{{ x }}</pre>
    </b-card>
<div>
    <div>
        <b-card class="mt-3" header="Form Data Query">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    </div>
</div>

  </div>
        
</template>

<script>
  export default {
    data() {
      return {
        form: {
          batchId : '',
          upcomingOwner : ''
        },
        x: {},
        show: true,
        spin: false
      }
    },
    methods: {
      
      async onSubmit(evt) {
        evt.preventDefault()
        this.spin = true
        if (confirm(JSON.stringify(this.form))){
           
           // this x contains the query result but to show it on browser use something good such as a 
            // component where ypu can 
            // pass this object and that component can show it on 
            // browser and the component can be used later for other purposes as well.

          this.x = await this.$axios.$post('/api/ownershipTransfer', this.form);
          alert(this.x);
          this.spin = false;
          
        //   this.$router.push('/')
        }  
      },

      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
          this.form.batchId = '',
          // this.form.checked = []
        // Trick to reset/clear native browser form validation state
          this.x = {}
        //   this.$nextTick(() => {
        //   this.show = true
        // })
      }
    }
  }
</script>

<style>

</style>