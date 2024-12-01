<script lang="ts" setup></script>
<template>
  <div class="globalWrapper">
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
  </div>

</template>
<style scoped>
.globalWrapper{
  width: 100%;
  height: 100vh;
  padding: 32px;
}
.layout {
  display: grid;
  height: 100%;
  grid-template: "debtRows interestRate payback newDebt" auto "graph graph graph  graph" 1fr / auto auto auto auto;
  gap: 24px;
}

.graph{
  grid-area: graph;
}

</style>
