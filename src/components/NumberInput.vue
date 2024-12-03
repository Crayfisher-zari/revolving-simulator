<script lang="ts" setup>
import { computed } from "vue";
type Props = {
  label: string;
  unit?: string;
  digits?: number;
};
withDefaults(defineProps<Props>(), {
  unit: "",
  digits: 9,
});
const model = defineModel<number>();
const livedigits = computed(() => {
  return model.value?.toString().length ?? 1;
});
</script>
<template>
  <div class="wrapper">
    <label class="labelAndInput">
      <span class="labelName">{{ label }}</span>
      <div class="inputWrapper">
        <input v-model.number="model" type="text" :maxlength="digits" />
        <span v-if="unit" class="unit">{{ unit }}</span>
      </div>
    </label>
  </div>
</template>
<style scoped>
.labelAndInput {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: baseline;
}

.inputWrapper {
  position: relative;
  display: flex;
  column-gap: 8px;
  align-items: baseline;
  justify-content: space-between;
  line-height: 1;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    content: "";
    background-color: rgb(255 255 255 / 30%);
    transition: background-color 0.3s var(--ease-out-quart),
      height 0.3s var(--ease-out-quart);
  }

  &:has(input:focus) {
    &::after {
      height: 3px;
      background-color: rgb(255 255 255 / 80%);
    }
  }
}

.labelName {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
}

input {
  width: calc(22px * v-bind(livedigits));
  font-size: 36px;
  font-weight: bold;
  color: var(--color-text-primary);
  text-align: right;
  appearance: none;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
}

.unit {
  font-size: 14px;
  font-weight: bold;
}
</style>
