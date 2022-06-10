import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
state:{
    information:[
        {price:'',address:'',goodsname:'', shopname:'',shopid:'',imgid:'',goodsid:''},
    ],
    //count用于记录选取外卖的总数量
    count:0,
    // totalPrice用于记录需要付费的总价格
    totalPrice:0,
    userid:'',
    sellerid:'',
    memuInfo:[],
    //allInfo存储数据库中information表中的所有数据
    allInfo:[{price:'',address:'',goodsname:'', shopname:'',shopid:'',imgid:'',goodsid:''}],
    // allPurchase存储数据库中purchase表中的所有数据
    allPurchase:[{goodsid:'',userid:'',shopid:'',counter:'',send:'',pay:''}],
    filename:'',
    goPay:[]
},
    mutations:{
    getprice(state,payload){
        state.totalPrice=state.totalPrice+payload.price;
        // state.totalPrice=state.totalPrice.toFixed(1);
    },

    },
    actions:{


    }
});

export default store;