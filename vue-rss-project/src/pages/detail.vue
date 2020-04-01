<template>
    <div class="detail">
        <!--<iframe :src="$route.query.rss" frameborder="0"></iframe>-->
    </div>
</template>

<script>
    export default {
        name: "detail",
        created() {
            window.location.href = this.$route.query.rss
            console.log(this.$route.query)
        }
    }
</script>

<style scoped>

</style>
