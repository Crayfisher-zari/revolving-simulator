<script lang="ts" setup>
type Props = {
  unit?: string;
};
defineProps<Props>();
const model = defineModel<number>();
</script>
<template>
  <div class="wrapper">
    <label>
      <input v-model.number="model" type="text" maxlength="9" />
      <span v-if="unit">{{ unit }}</span>
    </label>
  </div>
</template>
<style scoped>
.wrapper {
  position: relative;
  display: flex;
  column-gap: 8px;
  align-items: baseline;
  justify-content: space-between;
  width: max-content;
  padding: 0 8px;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    content: "";
    border-bottom: 1px solid rgb(255 255 255 / 30%);
    transition: border-bottom 0.3s;
  }

  &:has(input:focus) {
    &::after {
      border-bottom: 1px solid rgb(255 255 255 / 80%);
    }
  }
}

input {
  width: 200px;
  padding: 0 0 4px;
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
</style>
