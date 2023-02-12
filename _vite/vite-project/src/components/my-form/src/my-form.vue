<template>
  <div class="form">
    <el-form :label-width="props.labelWidth">
      <el-row>
        <template v-for="item of props.formItems" :key="item.label">
          <el-col v-bind="props.colLayout">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="props.modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  :model-value="props.modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option v-for="option of item.options" :key="option.label" :value="option.value">
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="props.modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, PropType, watch } from "vue";
import { IFormItem, colLayoutType } from "../src/types";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  labelWidth: {
    type: String,
    default: "100px"
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  colLayout: {
    type: Object as PropType<colLayoutType>,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
});

const emit = defineEmits(["update:modelValue"]);
const handleValueChange = (value: any, field: string) => {
  emit("update:modelValue", { ...props.modelValue, [field]: value });
};
</script>

<style lang="scss" scoped></style>
