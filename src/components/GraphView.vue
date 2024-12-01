<script lang="ts" setup>
type Props = {
  isInfinity: boolean;
  count: number;
  totalAmount: number;
  remainedDebtBalanceList: number[];
  paybackPrincipalList: number[];
  paybackInterestList: number[];
  interestList: number[];
};
defineProps<Props>();
</script>
<template>
  <div class="wrapper">
    <h2>
      <span>
        <span class="total">返済総行数</span
        ><span class="number">{{ Math.round(totalAmount) }}</span
        ><span class="unit">行</span>
      </span>
      <span>
        <span class="total">返済期間</span
        ><span class="number">{{ count }}</span
        ><span class="unit">ヶ月</span>
      </span>
    </h2>
    <div class="graphArea">
      <div class="barChart">
        <div
          v-for="(remained, index) in remainedDebtBalanceList"
          :key="index"
          class="bar"
          :style="{
            height: `${(remained / remainedDebtBalanceList[0]) * 100}%`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
}

.graphArea {
  height: 100%;
}

.barChart {
  display: flex;
  column-gap: 8px;
  align-items: flex-end;
  height: 100%;
}

.bar {
  width: 4px;
  background-color: pink;
}
</style>
