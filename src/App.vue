<template>
        <div class="wrapper">
            <div><button v-on:click="saveButtonHandler" class="save_button">{{this.btn}}</button></div>
            <div class="traffic-light-container">
                <div class="red"></div>
                <div class="yellow"></div>
                <div class="green"></div>
                <router-view v-bind:timerCounter="this.timerCounter"></router-view>
            </div>  
            <Timer v-bind:timerCounter="this.timerCounter"/>
        </div>   
</template>

<script>
import router from "@/router/router.js";
import Timer from "@/components/Timer.vue";

export default {
    name: 'App',

    data(){
        return{
            //Определяет очередность цветов
            lightStatus: 1,
            //Значение таймера, за которым следит приложение
            timerCounter:0,
            //Сам таймер
            timer: null,
            //Разрешение устанавливать состояние приложения из хранилища сессии
            useSessionData:false,
            //Значение кнопки
            btn:"сохранять"
        }
    },

    components:{
        Timer
    },

    methods:{
        //Кнопка включает\выключает хранилище сессии
        saveButtonHandler(){
            this.useSessionData=!this.useSessionData;
            this.useSessionData ? this.btn="Не сохранять" : this.btn="Cохранять"
        },
        //Сохраняет данные в хранилище сессии
        setSessionData(){
            let data={
                path: document.location.pathname,
                timerCounter: this.timerCounter,
                lightStatus: this.lightStatus,
                useSessionData: this.useSessionData
            }
            let sessionData=JSON.stringify(data);
            sessionStorage.setItem("trafficLightData", sessionData);
        },
        //Забирает данные из хранилища
        getSessionData(){
            return JSON.parse(sessionStorage.getItem("trafficLightData"));
                      
        },
        //установка дефолтных состояний без использования хранилища
        setDefaultStatus(path){
            if(path=="/"||path=="/red"){
                    this.lightStatus=1;
                }if(path=="/yellow"){
                    this.lightStatus=2;
                }if(path=="/green"){
                    this.lightStatus=3;
                }
                this.setTimerCounter(this.lightStatus);
        },
        //Устанавливвает состояния приложения от использования/наличия данных в хранилище сессии
        //Принимает document.location.pathname
        setAppStatus(path){
            let sessionData=this.getSessionData();
            if(sessionData==null){
                this.setDefaultStatus(path);
            }else{
                if(sessionData.useSessionData){
                    path=sessionData.path;
                    this.timerCounter=sessionData.timerCounter;
                    this.lightStatus=sessionData.lightStatus;
                    this.useSessionData=sessionData.useSessionData;
                    this.btn="Не сохранять";
                    router.push({ path: `${path}`});
                }if(!sessionData.useSessionData){
                    this.setDefaultStatus(path);
                }
            }
        },
        //устанавливает продолжительность каждого света
        //принимает this.lightStatus
        setTimerCounter(status){
            if(status==1){
                this.timerCounter=10;
            }if(status==3){
                this.timerCounter=15;
            }if(status==2||status==4){
                this.timerCounter=3;
            }
        },
        //определяет очередность цветов
        //принимает this.lightStatus
        changeLightStatus(status){
            if(status<4){
                this.lightStatus++;
            }if(status==4){
                this.lightStatus=1;
            }
        },
        startLightTimer(){
            this.timer = setInterval(() => {
                this.timerCounter--;
            }, 1000)
        },
        stopLightTimer(){
            clearTimeout(this.timer);
        },
        //переключает очередность цветов
        //принимает this.lightStatus
        redirectTrafficLight(status){
            if(status==1||status==3){
                router.push({ path: '/yellow'});
            }if(status==2){
                router.push({ path: '/green'});
            }if(status==4){
                router.push({ path: '/red'});
            }
        }
    },

    mounted(){
        //Установливаем состояние приложения при первом запуске
        this.setAppStatus(document.location.pathname);
        //Запускаем приложение
        this.startLightTimer();
    },

    unmounted(){
        this.stopLightTimer();
    },

    watch: {
        //Отслеживаем значение таймера
        timerCounter(time) {
            //На каждом тике обновляем данные в хранилище сессии
                this.setSessionData(document.location.pathname);
            if(time===0) {
                //сбрасываем таймер
                this.stopLightTimer();
                //меняем цвет
                this.redirectTrafficLight(this.lightStatus);
                this.changeLightStatus(this.lightStatus);
                //устанавливаем новое значение таймера
                this.setTimerCounter(this.lightStatus);
                //запускаем новый таймер
                this.startLightTimer();
            }
        }
  },
}
</script>
<style>
    .wrapper{
        width: 30%;
        margin: 50px auto;
        text-align: center;
    }
    .save_button{
        width: 130px;
        height: 40px;
        margin: 10px;
        cursor: pointer;
    }
    .traffic-light-container{
        width: 140px;
        height: 400px;
        margin: auto;
        background-color: #333;
        border: 1px solid black;
        border-radius: 10%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
    }
    .traffic-light-container div{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        border: solid black 1px;
    }
    .green{
        background-color:green;
        opacity: 10%;
    }
    .red{
        background-color:red;
        opacity: 10%;
    }
    .yellow{
        background-color: yellow;
        opacity: 10%;
    }
    .light{
        position: absolute;
        left: 20px;
    }
</style>

