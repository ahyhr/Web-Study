<template>
  <div class="comment-info">
    <div v-if="Object.keys(commentInfo).length !== 0">
      <div class="rate-title">
        <span>用户评价</span>
        <span>更多</span>
      </div>
      <div class="content">
        <div class="user-info">
          <div class="img"><img :src="commentInfo.user.avatar" alt="" /></div>
          <h4>{{ commentInfo.user.uname }}</h4>
        </div>
        <p class="rate">{{ commentInfo.content }}</p>
        <p v-if="commentInfo.explain" class="shop-rate">
          {{ commentInfo.explain }}
        </p>
        <div class="info">
          <span>{{ commentInfo.created | showTime }}</span>
          <span>{{ commentInfo.style }}</span>
        </div>
        <div v-if="commentInfo.images" class="rate-imgs">
          <div v-for="(img, index) in commentInfo.images" :key="index">
            <img :src="img" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="rate-title">
      <span>暂无用户评价</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      defalut() {
        return {};
      },
    },
  },
  filters: {
    //转换时间戳
    showTime(time) {
      let date = new Date(time * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      return Y + M + D;
    },
  },
};
</script>

<style scoped>
.comment-info {
  border: 4px solid #eee;
  border-left: none;
  border-right: none;
  padding-bottom: 20px;
  margin-bottom: 15px;
}
.rate-title {
  margin: 0 5px;
  padding: 15px 5px;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
}
.user-info {
  display: flex;
  align-items: center;
  padding: 8px 10px;
}
.user-info .img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.user-info .img img {
  width: 100%;
  height: 100%;
}
.rate,
.shop-rate {
  padding: 5px 10px;
  font-size: 13.5px;
  text-align: justify;
  line-height: 18px;
}
.shop-rate {
  color: rgb(219, 124, 124);
  font-size: 12px;
  line-height: 15px;
}
.rate-imgs{
  display: flex;
  justify-content: left;
  margin: 0 10px;
}
.rate-imgs div {
  width: 80px;
  height: 80px;
  margin-right: 3px;
}
.rate-imgs img {
  width: 100%;
  height: 100%;
}
.content .info {
  padding: 5px 10px;
}
.content .info span {
  color: rgb(158, 158, 158);
  font-size: 14px;
  margin-right: 8px;
}
</style>