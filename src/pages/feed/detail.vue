<template>
    <div>
        <div class="main" v-html="$route.query.content"></div>
    </div>
</template>

<script>
    export default {
        name: "detail"
    }
</script>

<style scoped lang="scss">
    .main {
        font-size: 28px;
        line-height: 48px;
    }
</style>
