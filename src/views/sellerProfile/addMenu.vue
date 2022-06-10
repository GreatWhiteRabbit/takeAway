<template>
  <div>
    <div class="add" v-if="$store.state.memuInfo.length!==0">
      <div style="margin: auto">
        <input type="file" @change="updateImg">
        <img alt="上传的图片" :src="imgurl ? imgurl : baseurl" height="200px" width="200px">
      </div>

      <div class="shuru">
        <span> 请输入菜品的名称：</span>
        <input type="text" v-model="goodsname">
      </div>
      <div class="shuru">
        <span>请输入菜品的价格：</span>
        <input type="number" v-model="price">
      </div>

      <div style="margin: auto">
        <button style="color: white;background-color: #f5456e;border: none;height: 40px;width: 100px;font-size: 20px"
                @click="addMenu">添加
        </button>
      </div>
    </div>
    <div class="add" v-else>
      <div style="margin: auto">
        <input type="file" @change="updateImg">
        <img alt="上传的图片" :src="imgurl ? imgurl : baseurl" height="200px" width="200px">
      </div>

      <div class="shuru">
        <span> 请输入菜品的名称：</span>
        <input type="text" v-model="goodsname">
      </div>

      <div class="shuru">
        <span> 请输入价格：</span>
        <input type="text" v-model="price">
      </div>

      <div class="shuru">
        <span> 请输入店铺地址：</span>
        <input type="text" v-model="address">
      </div>

      <div class="shuru">
        <span> 请输入店铺名称：</span>
        <input type="text" v-model="shopname">
      </div>

      <div style="margin: auto">
        <button style="color: white;background-color: #f5456e;border: none;height: 40px;width: 100px;font-size: 20px"
                @click="addMenu2">添加
        </button>
      </div>
    </div>
    <div class="Noshow"></div>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "addMenu",
  data() {
    return {
      imgurl: '',
      baseurl: '',
      price: '',
      goodsname: '',
      address:'',
      shopname: ''
    }
  },
  created() {
    this.baseurl = require('../../assets/img/food/update.jpg');
  },
  methods: {
    updateImg(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = e => {
        that.imgurl = e.target.result;
      }
      this.$store.state.filename = file.name;
      var formdata = new FormData();
      formdata.append('file', file);
      axios.post(this.HOST + 'information/updateImg', formdata,
          {headers: {'Content-Type': 'multipart/form-data'}}
      )
    },
    addMenu() {
      console.log(this.price);
      console.log(this.$store.state.memuInfo[0].address);
      console.log(this.goodsname);
      console.log(this.$store.state.sellerid);
      console.log(this.$store.state.filename.substring(0, 3));

      axios({
        method: 'post',
        url: this.HOST + 'information/addInformation',
        data: {
          price: this.price,
          address: this.$store.state.memuInfo[0].address,
          goodsname: this.goodsname,
          shopname: this.$store.state.memuInfo[0].shopname,
          shopid: this.$store.state.sellerid,
          imgid: this.$store.state.filename.substring(0, 3),
          goodsid: this.$store.state.filename.substring(0, 3)
        }
      }).then(res =>{
        if(res.data===true)
          alert('添加成功')
        else {
          alert('添加失败')
        }
      }).catch(err =>{
        alert('与服务器断开连接，请重试')
      })
    },
    addMenu2() {
      console.log(this.price);
      console.log(this.address);
      console.log(this.goodsname);
      console.log(this.$store.state.sellerid);
      console.log(this.$store.state.filename.substring(0, 3));
      console.log(this.shopname);
      axios({
        method: 'post',
        url: this.HOST + 'information/addInformation',
        data: {
          price: this.price,
          address: this.address,
          goodsname: this.goodsname,
          shopname: this.shopname,
          shopid: this.$store.state.sellerid,
          imgid: this.$store.state.filename.substring(0, 3),
          goodsid: this.$store.state.filename.substring(0, 3)
        }
      }).then(res =>{
        if(res.data===true)
          alert('添加成功')
        else {
          alert('添加失败')
        }
      }).catch(err =>{
        alert('与服务器断开连接，请重试')
      })
    }
  }
}
</script>

<style scoped>
.add {
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 500px;
  background-color: #c9f3b9;
}

.shuru {
  display: flex;
  margin: auto;
}

.shuru span {
  color: #0f0f0f;
  font-size: 20px;
}

.shuru input {
  height: 40px;
  width: 300px;
  border-radius: 5px 5px;
  border: 1px;
  font-size: 20px;
}

.Noshow {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 48px;
  width: 880px;
  background-color: rgba(250, 250, 250, 0.99);
}
</style>