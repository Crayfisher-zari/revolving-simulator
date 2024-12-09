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

.debtRows {
  grid-area: debtRows;
}

.interestRate {
  grid-area: interestRate;
}

.payback {
  grid-area: payback;
}

.newDebt {
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
  .globalWrapper {
    padding: 24px;
  }

  .layout {
    grid-template: "header header header " 40px "debtRows interestRate payback" auto "newDebt newDebt newDebt" auto "graph graph graph" 1fr / auto auto auto;
  }
}

@media screen and (width < 1025px) {
  .globalWrapper {
    height: auto;
    min-height: 100vh;
  }

  .graphAndList {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    height: 100%;
  }

  .graph {
    width: 100%;
    height: 100%;
    height: 600px;
  }

  .list {
    width: 100%;
    height: 100%;
    height: 500px;
  }
}

@media screen and (width < 810px) {
  .layout {
    grid-template: "header header" 40px "debtRows interestRate " auto "payback payback" auto "newDebt newDebt" auto "graph graph" 1100px / auto auto;
  }
}

@media screen and (width < 510px) {
  .layout {
    grid-template: "header" 30px "debtRows" auto "interestRate" auto "payback" auto "newDebt" auto "graph" 1100px / auto;
  }
}
</style>
