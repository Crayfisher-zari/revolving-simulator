<script lang="ts" setup>
import BarChart from "./BarChart.vue";
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
    <BarChart
      :is-infinity
      :count
      :total-amount
      :remained-debt-balance-list
      :payback-principal-list
      :payback-interest-list
      :interest-list
    />
  </div>
</template>
<style scoped>
.wrapper {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  overflow: hidden;
}
</style>
