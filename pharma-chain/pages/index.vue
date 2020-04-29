<template>
  <div class="container">
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        Pharma-Chain
      </h1>
      <h2 class="subtitle">
        Web-App to interact with supply chain for pharmaceuticals using blockchain (under development)
      </h2>
      <div class="links">
        <a
          href="/trace"
          target="_blank"
          class="button--green"
        >
          Trace Using BatchId 
        </a>
        <a
          href="/ownershipTransfer"
          target="_blank"
          class="button--green"
        >
          Ownership Transfer
        </a>
        
        <br>
        <br>
        
        <a
          href="/api/query"
          target="_blank"
          class="button--grey"
        >
          Retrieve All Records
        </a>

        <a
          href="/searchParticipants"
          target="_blank"
          class="button--grey"
        >
          Search Participants
        </a>

        <a
          href="/searchMedicines"
          target="_blank"
          class="button--grey"
        >
          Search Medicines
        </a>

        <a
          href="/queryByKey"
          target="_blank"
          class="button--grey"
        >
          Retrieve by key
        </a>

       <br>

        <br>
        <a
          href="/addParticipant"
          target="_blank"
          class="button--green"
        >
          Add Participant
        </a>
         <a
          href="/addmedicine"
          target="_blank"
          class="button--green"
        >
          Add Medicine
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
