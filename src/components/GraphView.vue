<script lang="ts" setup>
import BarChart from "./BarChart.vue";
import EmptyView from "./EmptyView.vue";
type Props = {
  isInfinity: boolean;
  count: number;
  totalAmount: number;
  remainedDebtBalanceList: number[];
  paybackPrincipalList: number[];
  paybackInterestList: number[];
  interestList: number[];
};
const props = defineProps<Props>();
</script>
<template>
  <div v-show="!props.isInfinity" class="wrapper">
    <h2 class="title">
      <span class="titleRow">
        <span class="total">返済総行数</span
        ><span class="number">{{
          Math.round(totalAmount).toLocaleString("ja-JP")
        }}</span
        ><span class="unit">行</span>
      </span>
      <span class="titleRow">
        <span class="total">返済期間</span
        ><span class="number">{{ count.toLocaleString("ja-JP") }}</span
        ><span class="unit month">ヶ月</span>
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
  <EmptyView v-show="props.isInfinity" />
</template>
<style scoped>
.wrapper {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  overflow: hidden;
}

.title {
  margin-bottom: 32px;
}

.titleRow {
  display: flex;
  column-gap: 4px;
  align-items: baseline;
}

.total {
  font-size: 16px;
}

.number {
  font-size: 36px;
  translate: 0 1px;
}

.unit {
  margin-left: -0.1em;
  font-size: 16px;

  &.month {
    margin-left: -0.2em;
  }
}
</style>
