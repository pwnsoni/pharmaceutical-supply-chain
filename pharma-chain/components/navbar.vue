<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">Pharma-Chain</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                        
                    <b-navbar-nav>
                        <b-nav-item href="/ownershipTransfer">Ownership Transfer</b-nav-item>
                        <b-nav-item href="/trace">Tracebility using batchId</b-nav-item>
                    </b-navbar-nav>

                    <b-nav-item-dropdown text="Search From Ledger" right>
                        <b-dropdown-item href="/searchParticipants">Search Participants</b-dropdown-item>
                        <b-dropdown-item href="/searchMedicines">Search Medicines</b-dropdown-item>
                        <b-dropdown-item href="/queryByKey">Retrieve record by key</b-dropdown-item>
                        <b-dropdown-item href="/api/query">Retrieve everything from Ledger</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Add to Ledger" right>
                        <b-dropdown-item href="/addParticipant">Add Participants</b-dropdown-item>
                        <b-dropdown-item href="/addMedicine">Add Medicines</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
}
</script>
