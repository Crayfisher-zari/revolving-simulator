<script lang="ts" setup></script>
<template>
  <div class="layout">
    <div class="debtRows">
      <slot name="debt"></slot>
    </div>
    <div class="interestRate">
      <slot name="interestRate"></slot>
    </div>
    <div class="payback">
      <slot name="payback"></slot>
    </div>
    <div class="newDebt">
      <slot name="newDebt"></slot>
    </div>
    <div class="graph">
      <slot name="graph"></slot>
    </div>
  </div>
</template>
<style scoped>
.layout {
  display: grid;
  grid-template: "debtRows interestRate payback newDebt" auto "graph graph graph  graph" auto / auto auto auto auto;
  gap: 24px;
}
</style>
