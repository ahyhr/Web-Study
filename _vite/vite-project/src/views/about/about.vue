<template>
  <div class="about">
    <input id="inp" type="text" />
    <p id="pp"></p>

    <about-chilen />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide } from "vue";
import aboutChilen from "./aboutChilen.vue";

provide("fName", "父组件数据");

onMounted(() => {
  const inp = document.getElementById("inp") as HTMLInputElement;
  const pp = document.getElementById("pp");

  const data = {
    name: "ksjdfghjks"
  };

  inp?.addEventListener("input", (e) => {
    data.name = (e.target as HTMLInputElement).value;

    proxyObj.name = (e.target as HTMLInputElement).value;
  });

  // Object.defineProperty(data, "name", {
  //   set(value) {
  //     pp!.innerHTML = value;
  //   }
  // });

  const proxyObj = new Proxy(data, {
    get(target, propName) {
      return Reflect.get(target, propName);
    },
    set(target, propName, value) {
      pp!.innerHTML = value;
      return Reflect.set(target, propName, value);
    }
  });
});

// 泛型约束
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const o = { a: 1, b: 2, c: 3 };
prop(o, "c");
</script>

<style lang="scss" scoped></style>
