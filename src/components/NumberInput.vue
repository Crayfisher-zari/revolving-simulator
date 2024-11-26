<script lang="ts" setup>
type Props = {
  label: string;
  unit?:string;
};
const props = defineProps<Props>();
const model = defineModel();
</script>
<template>
  <label>
    <span class="label">{{ label }}</span>
    <input type="number" v-model.number="model" />
    <span v-if="unit">{{ unit }}</span>
  </label>
</template>
