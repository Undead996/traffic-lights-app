<template>
    <div class="light"
    v-bind:class="colors"></div>
</template>

<script>

export default {
    name: 'Light',
    data(){
        return{
            color: NaN,
            timeCounter: this.$props.timerCounter,
            actualPaths:["green", "red", "yellow"]
        }
    },
    props: ["timerCounter"],
    computed: {
        colors(){
            return {
                act_green: this.color=="green",
                act_red: this.color=="red",
                act_yellow:this.color=="yellow",
            }
        }
    },
    methods:{
        setColor(param){
            if(this.actualPaths.indexOf(param)!=-1){
                this.color=param;
            }else{
                this.color="red";
            }
        },
        blinkAnimation(){
            let count = 0;
            let target=document.querySelector(".light");
            let timer = setInterval(()=>{
            count++
            if (count == 4){
                clearInterval(timer); 
                return;
            }
            target.style.opacity = 10 + '%';
                    setTimeout(()=>{
                        target.style.opacity = 100 + '%';
                    }, 250)
            }, 500);           
        }
    },
    mounted(){
        this.setColor(this.$route.params.color);
    },
    beforeUpdate(){
        this.setColor(this.$route.params.color);
        this.timeCounter=this.$props.timerCounter;
    },
    watch: {
        timeCounter(time){
            if(time==2){
                this.blinkAnimation();
            }
        }
    }
    

}

</script>

<style>
    .act_red{
        background-color:red;
        top: 17px;
    }
    .act_green{
        background-color: green;
        top: 281px;
    }
    .act_yellow{
        background-color: yellow;
        top: 148px;
    }
</style>