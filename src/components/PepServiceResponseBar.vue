<template>
    <div id="pepsserviceresponsebar">
        <md-snackbar
                :md-position="serviceResponseBar.position"
                :md-duration="serviceResponseBar.duration"
                :md-active.sync="serviceResponseBar.showSnackbar"
                md-persistent
        >
        <span>{{ serviceResponseBar.error.status }} {{ serviceResponseBar.error.description }}</span>
            <md-button
                    v-if="serviceResponseBar.isError"
                    class="md-primary"
                    @click="serviceResponseBar.showSnackbar = false">Retry
            </md-button>
        </md-snackbar>
    </div>
</template>

<script>

export default {
    name: "pepserviceresponsebar",
    data: function(){
        return{
            serviceResponseBar: this.$store.state.serviceResponseBar
        };
    }
}
</script>

<style scoped>

</style>