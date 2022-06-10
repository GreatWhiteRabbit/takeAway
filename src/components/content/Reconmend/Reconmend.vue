<template xmlns="http://www.w3.org/1999/html">

  <div class="tab-panel">
    <div class="tuijian">
      <span>今日推荐</span>
    </div>
    <div class="tab-list">
     <img :src="list1[index].url">
      <div class="title">
        {{list1[index].title}}
      </div>
      <div class="price">
        {{list1[index].price}}
      </div>
    </div>
    <div class="tab-list">
      <img :src="list2[index].url">
      <div class="title">
        {{list2[index].title}}
      </div>
      <div class="price">
        {{list2[index].price}}
      </div>
    </div>
    <div class="tab-list">
      <img :src="list3[index].url">
      <div class="title">
        {{list3[index].title}}
      </div>
      <div class="price">
        {{list3[index].price}}
      </div>
    </div>
    <div class="tab-list">
      <img :src="list4[index].url">
      <div class="title">
        {{list4[index].title}}
      </div>
      <div class="price">
        {{list4[index].price}}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Reconmend",
  data() {
    return {
      list1:[
        {url:require('@/assets/img/food/003.jpg'),title:'麻辣小龙虾',price:'￥15.5'},
        {url:require('@/assets/img/food/009.jpg'),title:'热干面',price:'￥15.6'}
      ],
      list2:[
        {url:require('@/assets/img/food/014.jpg'),title:'草莓裸蛋糕',price:'￥22.7'},
        {url:require('@/assets/img/food/018.jpg'),title:'焦糖奶茶',price:'￥15.8'}
      ],
      list3:[
        {url:require('@/assets/img/food/022.jpg'),title:'咖啡拉花',price:'￥19.9'},
        {url:require('@/assets/img/food/026.jpg'),title:'樱桃',price:'￥15.2'}
      ],
      list4:[
        {url:require('@/assets/img/food/043.jpg'),title:'白玫瑰',price:'￥200'},
        {url:require('@/assets/img/food/020.jpg'),title:'玫瑰奶茶',price:'￥15.8'}
      ],
      index: 0
    }
  },
  mounted() {
this.auto();
  },
  methods: {
    getNext() {
    this.index++;
      if(this.index==2)
        this.index=0;
    },
    auto(){
    setInterval(this.getNext,3000);
    }
  }
}
</script>

<style scoped>
.tab-panel {
  height: 180px;
  margin-left: 40px;
  margin-right: 40px;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  grid-column-gap: 20px;
  overflow: hidden;
  text-align: center;
  justify-content: center;
  background-color: #fce3e3;
  border-radius: 10px 10px;
}

.tab-list {
  height: 150px;
  width: 150px;

  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
}
.tab-list img{
  margin-top: 10px;
  height: 75%;
  width: 75%;
}
.tab-list .title{
  font-family: 宋体;
  color: #0f0f0f;
  font-size: 20px ;
}
.tab-list .price{
  color: #f5456e;
}
.tuijian{
  line-height: 150px;
  font-size: 25px;
}
.tuijian span{
  background: linear-gradient(to right, red, blue,green);
  -webkit-background-clip: text;
  color: transparent;
}
</style>