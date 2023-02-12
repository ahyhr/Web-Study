<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length!==0">
    <table class="info-size" v-for="(table,index) in paramInfo.sizes" :key="index">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,index) in tr" :key="index" :class="{'font-wight':index==0}">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(tr,index) in paramInfo.infos" :key="index">
        <td class="key">{{tr.key}}</td>
        <td class="value">{{tr.value}}</td>
      </tr>
    </table>
  </div>  
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    paramInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info{
  margin: 10px 0;
  padding: 0 10px;
}
.info-size, .info-param{
  width: 100%;
  font-size: 14px;
}
.info-size tr ,.info-param tr{
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: left;
}
.info-size tr td,.info-param tr td{
  flex: 1;
  text-align: center;
  padding: 10px 0;
}
.info-size tr:last-child{
  border-width: 3px;
}
.info-param tr:last-child{
  border-bottom: none;
}
.info-param tr td{
  text-align: left;
}
.font-wight,.key{
  font-weight: 600;
  text-align: left  !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100px;
}
.key{
  flex: 0 1 26% !important;
}
.value{
  font-size: 13.5px;
  color: rgb(212, 13, 13);
}
</style>