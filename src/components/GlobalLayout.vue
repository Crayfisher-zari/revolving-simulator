<script lang="ts" setup>
import ItemPanel from "./ItemPanel.vue";
</script>
<template>
  <div class="globalWrapper">
    <div class="layout">
      <header class="header">
        <slot name="header" />
      </header>
      <div class="debtRows">
        <ItemPanel>
          <slot name="debt"></slot>
        </ItemPanel>
      </div>
      <div class="interestRate">
        <ItemPanel>
          <slot name="interestRate"></slot>
        </ItemPanel>
      </div>
      <div class="payback">
        <ItemPanel>
          <slot name="payback"></slot>
        </ItemPanel>
      </div>
      <div class="newDebt">
        <ItemPanel>
          <slot name="newDebt"></slot>
        </ItemPanel>
      </div>
      <div class="graphAndList">
        <div class="graph">
          <ItemPanel>
            <slot name="graph"></slot>
          </ItemPanel>
        </div>
        <div class="list">
          <ItemPanel>
            <slot name="list"></slot>
          </ItemPanel>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.globalWrapper {
  width: 100%;
  height: 100vh;
  padding: 32px;
}

.layout {
  display: grid;
  grid-template: "header header header header" 40px "debtRows interestRate payback newDebt" auto "graph graph graph graph" 1fr / auto auto auto auto;
  gap: 24px;
  height: 100%;
}

.header {
  grid-area: header;
}

.newDebt{
  grid-area: newDebt;
}

.graphAndList {
  display: flex;
  grid-area: graph;
  column-gap: 24px;
}

.graph {
  width: 68%;
}

.list {
  width: 32%;
}

@media screen and (width < 1080px) {
  .layout {
  display: grid;
  grid-template: "header header header " 40px "debtRows interestRate payback" auto "newDebt newDebt newDebt" auto "graph graph graph" 1fr / auto auto auto;
  gap: 24px;
  height: 100%;
}

}
</style>
