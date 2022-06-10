import Vue from "vue";
import VueRouter from "vue-router";

const Home =()=>import ('@/views/Home/Home');
const Order =()=> import('@/views/Order/Order');
const Profile =()=> import('@/views/Profile/Profile');
const Detail =()=> import('@/views/Detail/Detail');
import mainShopBar from "@/components/content/MainShopBar/MainShopBar";
const Login =()=>import('@/views/Login/Login');
const sellerLogin =()=> import('@/views/Login/sellerLogin');
const sellerProfile =()=>import('@/views/sellerProfile/sellerProfile');
const Menu =()=>import('@/views/sellerProfile/Menu');
const Send =()=>import('@/views/sellerProfile/Send');
const addMenu =()=>import('@/views/sellerProfile/addMenu');
const Pay =() =>import('@/views/Pay/Pay');

Vue.use(VueRouter);

const routes=[
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component: Home
    },
    {
        path: '/order',
        component: Order
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path:'/detail',
        component:Detail
    },
    {
        path: '/main',
        component:mainShopBar
    },
    {
        path: '/login',
        component:Login
    },
    {
        path: '/sellerLogin',
        component:sellerLogin
    },
    {
        path: '/sellerProfile',
        component:sellerProfile
    },
    {
        path:'/menu',
        component:Menu
    },
    {
        path:'/send',
        component:Send
    },
    {
        path:'/addMenu',
        component:addMenu
    },
    {
        path:'/pay',
        component:Pay
    }
];

const router=new VueRouter({
    routes,
    mode:'history'
})
export  default router;