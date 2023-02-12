<template>
  <div class="main">
    <my-form v-bind="formConfig" v-model="state.form" />

    <h2 v-if="$show(true)">{{ $formatDate(new Date(), "YYYY-mm-dd HH:MM:SS QQQQ") }}</h2>

    <el-button @click="reset">重置</el-button>
    <el-button type="primary" v-debounce="submit">完成</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, ComponentInternalInstance } from "vue";
import { useMainStore } from "@/store";
import myForm from "@/components/my-form";
import { formConfig } from "./form.config";

// 表单初始化数据
const formOriginData: any = {};
formConfig.formItems.map((item) => {
  formOriginData[item.field] = "";
});

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const state = reactive({
  form: formOriginData
});

const submit = () => {
  console.log(proxy?.$formatDate(new Date(), "YYYY-mm-dd HH:MM:SS QQQQ"));
  console.log("🚀 ~ file: main.vue:27 ~ form", state.form);
};

const reset = () => {
  state.form = formOriginData;
  console.log("🚀 ~ file: main.vue:27 ~ form", state.form);
};
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
}
</style>
