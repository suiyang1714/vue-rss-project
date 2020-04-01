<template>
    <div>
        <main v-html="$route.query.content"></main>
    </div>
</template>

<script>
    export default {
        name: "detail"
    }
</script>

<style scoped>

</style>
