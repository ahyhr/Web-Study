<template>
  <div class="login">
    {{ mainStore.appid }}

    <el-button @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useMainStore } from "@/store";
import { initRouter } from "@/router/permission";
import { useRouter } from "vue-router";
import { dynamicRouter } from "@/router";

const mainStore = useMainStore();
const router = useRouter();

const login = () => {
  mainStore.setRouter();
  router.push({ name: "layout" });
};
</script>

<style lang="scss" scoped></style>
