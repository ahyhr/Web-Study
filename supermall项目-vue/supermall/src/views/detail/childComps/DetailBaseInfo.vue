<template>
<!-- Object.keys() 判断对象是否为空,为空先不显示 -->
  <div class="Base-info" v-if="Object.keys(goodsInfo).length!==0">
    <p>{{goodsInfo.title}}</p>
    <div class="info-price">
      <span class="price">{{goodsInfo.price}}</span>
      <span v-if="goodsInfo.oldPrice" class="old_price">{{goodsInfo.oldPrice}}</span>
      <span v-if="goodsInfo.discount" class="discount">{{goodsInfo.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goodsInfo.columns[0]}}</span>
      <span>{{goodsInfo.columns[1]}}</span>
      <span>{{goodsInfo.service[0].name}}</span>
    </div>
    <div class="info-service">
      <div>
        <img :src="goodsInfo.service[goodsInfo.service.length-2].icon" alt="">
        <span>{{goodsInfo.service[goodsInfo.service.length-2].name}}</span>
      </div>
       <div>
        <img :src="goodsInfo.service[goodsInfo.service.length-1].icon" alt="">
        <span>{{goodsInfo.service[goodsInfo.service.length-1].name}}</span>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goodsInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .Base-info{
    padding: 5px;
    text-align: justify;
    color: var(--color-text);
  }
  .Base-info p{
    font-weight: 600;
  }
  .info-price{
    line-height: 20px;
    margin: 15px 0;
  }
  .info-price .price{
    font-size: 23px;
    color: var(--color-tint);
  }
  .info-price .old_price{
    margin: 0 8px;
    font-size: 14px;
    text-decoration: line-through;
    color: gray;
  }
  .info-price .discount{
    border-radius: 6px;
    padding: 0 6px;
    font-size: 13px;
    transform: translateY(-30%);
    display: inline-block;
    background: var(--color-tint);
    color: white;
  }

  .info-other{
    display: flex;
    justify-content: space-between;
    text-align: center;
    color: gray;
    font-size: 13px;
  }
  .info-other span{
    flex: 1;
  }
  .info-other span:first-child{
    text-align: left;
  }
  .info-other span:last-child{
    text-align: right;
  }

  .info-service{
    display: flex;
    margin: 10px 0;
    padding: 20px 0;
    border-top: 3px solid #eee;
    border-bottom: 4px solid #eee;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
  }
  .info-service img{
    width: 15px;
    height: 15px;
    position: relative;
    top: 2px;
  }
</style>