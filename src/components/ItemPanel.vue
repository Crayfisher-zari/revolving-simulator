<script lang="ts" setup>
type Props = {
  panelTitle?: string;
};
defineProps<Props>();
</script>
<template>
  <div class="panel">
    <h2 v-if="panelTitle" class="title">{{ panelTitle }}</h2>
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.panel {
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: var(--color-background-panel);
  border-radius: 16px;
  box-shadow: 0 0 8px rgb(0 0 0 / 30%);
}

.title {
  font-size: 20px;
}

.inner {
  height: 100%;
}
</style>
