<template>
        <div class="wrapper">
            <ul>
                <li>
                    <router-link  to="/yellow">yellow</router-link>
                </li>
                <li>
                    <router-link  to="/red">red</router-link>
                </li>
                <li>
                    <router-link to="/green">green</router-link>
                </li>
            </ul>
            <div class="traffic-light-container">
                <div class="red"></div>
                <div class="yellow"></div>
                <div class="green"></div>
            </div>  
            <router-view></router-view>
        </div>   
</template>

<script>
import router from "@/router/router.js";

export default {
    name: 'App',

    data(){
        return{
            lightStatus: 1,
            timerCounter: 0,
            timer: null,
        }
    },

    methods:{
        setLightStatus(path){
            if(path=="/"||path=="/green"){
                this.lightStatus=1;
            }if(path=="/yellow"){
                this.lightStatus=2;
            }if(path=="/red"){
                this.lightStatus=3;
            }
        },
        setTimerCounter(status){
            if(status==1){
                this.timerCounter=15;
            }if(status==3){
                this.timerCounter=10;
            }if(status==2||status==4){
                this.timerCounter=3;
            }
        },
        changeLightStatus(status){
            if(status<4){
                this.lightStatus++;
            }if(status==4){
                this.lightStatus=1;
            }
        },
        startLightTimer(){
            this.timer = setInterval(() => {
                this.timerCounter--
                console.log(this.timerCounter);
            }, 1000)
        },
        stopLightTimer(){
            clearTimeout(this.timer);
        },
        redirectTrafficLight(status){
            if(status==1||status==3){
                router.push({ path: '/yellow'});
            }if(status==2){
                router.push({ path: '/red'});
            }if(status==4){
                router.push({ path: '/green'});
            }
        }
    },

    mounted(){
        this.setLightStatus(document.location.pathname);
        this.setTimerCounter(this.lightStatus);
        console.log(this.lightStatus);
        this.startLightTimer();
    },

    watch: {
        timerCounter(time) {
            if(time===0) {
                this.stopLightTimer();
                this.redirectTrafficLight(this.lightStatus);
                this.changeLightStatus(this.lightStatus);
                this.setTimerCounter(this.lightStatus);
                this.startLightTimer();
            }
        }
  },
}
</script>
<style scoped>
    .wrapper{
        width: 30%;
        margin: 50px auto;
        text-align: center;
    }
    .traffic-light-container{
        min-width: 140px;
        width: 20%;
        height: 400px;
        margin: auto;
        background-color: #333;
        border: 1px solid black;
        border-radius: 10%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .traffic-light-container div{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        border: solid black 1px;
        opacity: 20%;
    }
    .green{
        background-color:green;
    }
    .red{
        background-color:red;
    }
    .yellow{
        background-color: yellow;
    }
</style>