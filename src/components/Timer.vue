<template>
    <div class="timer-container">{{this.$props.timerCounter}}</div>
</template>

<script>

export default {
    name: 'Timer',
    data(){
        return{
            timeCounter: this.$props.timerCounter,
        }
    },
    props: ["timerCounter"],
}
</script>

<style>
    .timer-container{
        width: 140px;
        font-size: 2rem;
        border: solid black 1px;
        padding: 10px;
        margin: 10px auto;
    }
</style>