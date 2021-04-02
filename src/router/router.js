import {createWebHistory, createRouter } from 'vue-router'
import Light from "@/components/Light.vue"

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            component: Light,
            props:true
        },
        {
            path:"/:color",
            component: Light,
            props:true
        }
    ]
});
export default router;