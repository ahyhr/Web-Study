<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <template v-for="item of mainStore.routers" :key="item.name">
            <el-sub-menu v-if="item.children?.length">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.meta?.name }}</span>
              </template>
              <template v-for="item2 of item.children" :key="item2.name">
                <el-menu-item :index="item2.name" @click="navTo(item2.name)">{{ item2.meta?.name }}</el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item v-else :index="item.name" @click="navTo(item.name)">{{ item.meta?.name }}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <Main></Main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { RouteRecordName, useRouter } from "vue-router";
import Main from "./components/main.vue";
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import { useMainStore } from "@/store";

const mainStore = useMainStore();

const router = useRouter();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const navTo = (name: RouteRecordName | undefined) => {
  console.log(router.getRoutes());

  router.push({ name });
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  min-height: 100vh;
  :deep(.el-container) {
    min-height: 100vh;
    .el-aside {
      background: white;
    }
    .el-header {
      background: black;
      color: white;
    }
    .el-main {
      height: calc(100vh - 60px);
    }
  }
}
</style>
