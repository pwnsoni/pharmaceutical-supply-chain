<template>
  <div style="padding : 20px">
    <div> 
      <h2 class="subtitle">
        Search Medicines based on below keys
      </h2>

 <b-form @submit="onSubmit" @reset="onReset" v-if="show" >
      
      <!-- <b-form-group id="input-group-3" label="Participant Type:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.participantType"
          :options="participantType"
        
        
        ></b-form-select>
      </b-form-group> -->

      <b-form-group id="input-group-8" label="Batch number or Id :" label-for="input-8">
            <b-form-input
              id="input-7"
              v-model="form.batchId"
            
            
              placeholder="BatchId"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-8" label="Medicine Name :" label-for="input-8">
            <b-form-input
              id="input-7"
              v-model="form.medicineName"
            
            
              placeholder="Batch  num"
            ></b-form-input>
          </b-form-group> 

      <b-form-group id="input-group-3" label="Medicine Formula :" label-for="input-3">
        <b-form-input
          id="input-4"
          v-model="form.medicineFormula"
        
        
          placeholder="Enter formula"
        ></b-form-input>
      </b-form-group>


      <b-form-group
        id="input-group-1"
        label="Organization Name :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.organization"
          type="text"
        
        
          placeholder="Enter Organization Name :"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="License Number of Manufacturer:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.manLicenseNo"
        
        
          placeholder="Enter licenseNo number of manufacturer"
        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-3" label="Place of mfg :" label-for="input-3">
        <b-form-input
          id="input-4"
          v-model="form.mfgPlace"
        
        
          placeholder="Enter Place of Mfg"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Mfgdate :" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.mfgDate"
            
            
              placeholder="Enter date of mfg"
            ></b-form-input>
          </b-form-group>
        <b-form-group id="input-group-6" label="Expdate :" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="form.expDate"
            
            
              placeholder="Enter Expiry date"
            ></b-form-input>
          </b-form-group>
       

<!--           
    <b-form-group id="input-group-7" label="Universal serial num :" label-for="input-7">
            <b-form-input
              id="input-7"
              v-model="form.serialnum"
            
            
              placeholder="Universal serial num"
            ></b-form-input>
          </b-form-group> -->

          

      <!-- <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value= true>Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->
      
      <b-form-group id="input-group-3" label="current owner :" label-for="input-3">
        <b-form-input
          id="input-4"
          v-model="form.owner"
        
        
          placeholder="Enter current owner's license number"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Current Location :" label-for="input-3">
        <b-form-input
          id="input-4"
          v-model="form.currentLocation"
        
        
          placeholder="Enter current location"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <div v-if="spin">
  <b-spinner label="Loading..."></b-spinner>
</div>

    </div>
    <b-card class="mt-3" header="Search Result"  >
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
          medicineName : '',
          medicineFormula : '',
          organization : '',
          manLicenseNo : '',
          mfgPlace : '',
          mfgDate  : '',
          expDate : '',
          owner : '',
          currentLocation : ''
          },
        participantType: [{ text: 'Select One', value: null }, 'Manufacturer', 'Distributor', 'Wholeseller', 'Retailer'],
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

          this.x = await this.$axios.$post('/api/search', this.form)
          this.spin = false
          
        //   this.$router.push('/')
        }  
      },

      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
          this.form.participantType = null,
          this.form.organization = '',
          this.form.licenseNo = '',
          this.form.address = '',
          this.x = {}
          // this.form.checked = []
        // Trick to reset/clear native browser form validation state
          
        //   this.$nextTick(() => {
        //   this.show = true
        // })
      }
    }
  }
</script>

<style>

</style>