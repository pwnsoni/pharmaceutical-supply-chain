<template>
  <div style="padding : 20px">
    <div> 
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" >
      
      <b-form-group id="input-group-3" label="Participant Type:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.participantType"
          :options="participantType"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Organization Name :"
        label-for="input-1"
        description="Name present on the licenseNo"
      >
        <b-form-input
          id="input-1"
          v-model="form.organization"
          type="text"
          required
          placeholder="Enter Organization Name "
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="License Number :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.licenseNo"
          required
          placeholder="Enter licenseNo number"
        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-3" label="Address :" label-for="input-3">
        <b-form-input
          id="input-4"
          v-model="form.address"
          required
          placeholder="Enter Address"
        ></b-form-input>
      </b-form-group>

      

      <!-- <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value= true>Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </div>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          participantType: null,
          organization: '',
          licenseNo: '',
          address: ''
          // checked: []
        },
        participantType: [{ text: 'Select One', value: null }, 'Manufacturer', 'Distributor', 'Wholeseller', 'Retailer'],
        show: true
      }
    },
    methods: {
      
      async onSubmit(evt) {
        evt.preventDefault()
        if (confirm(JSON.stringify(this.form))){
          await this.$axios.$post('/api/addParticipant', this.form)
          this.$router.push('/')
        }  
      },

      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
          this.form.participantType = null,
          this.form.organization = '',
          this.form.licenseNo = '',
          this.form.address = ''
          // this.form.checked = []
        // Trick to reset/clear native browser form validation state
          this.show = false
        //   this.$nextTick(() => {
        //   this.show = true
        // })
      }
    }
  }
</script>

<style>

</style>