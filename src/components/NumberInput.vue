<script lang="ts" setup>
type Props = {
  label: string;
  unit?: string;
};
defineProps<Props>();
const model = defineModel<number>();
</script>
<template>
  <label>
    <span class="label">{{ label }}</span>
    <input v-model.number="model" type="number" />
    <span v-if="unit">{{ unit }}</span>
  </label>
</template>
