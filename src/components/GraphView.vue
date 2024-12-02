<script lang="ts" setup>
import { computed } from "vue";
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

const yAxisBase = computed(() => Math.round(Math.max(...props.remainedDebtBalanceList) / 500) * 100);
</script>
<template>
  <div class="wrapper">
    <h2>
      <span>
        <span class="total">返済総行数</span><span class="number">{{ Math.round(totalAmount) }}</span><span
          class="unit">行</span>
      </span>
      <span>
        <span class="total">返済期間</span><span class="number">{{ count }}</span><span class="unit">ヶ月</span>
      </span>
    </h2>
    <div class="graphArea">
      <div class="barChartRules">
        <div class="yAxis yAxis0">0</div>
        <div class="yAxis yAxis1">{{ yAxisBase / 5 * 1 }}</div>
        <div class="yAxis yAxis2">{{ yAxisBase / 5 * 2 }}</div>
        <div class="yAxis yAxis3">{{ yAxisBase / 5 * 3 }}</div>
        <div class="yAxis yAxis4">{{ yAxisBase / 5 * 4 }}</div>
        <div class="yAxis yAxis5">{{ yAxisBase / 5 * 5 }}</div>

        <div class="xAxis" v-for="(xAsix,index) in remainedDebtBalanceList" :key="index" :style="{
          left: `calc(62px + ${100 / (remainedDebtBalanceList.length +1) * index }%)`,
        }">
          {{ index + 1 }}
        </div>
      </div>
      <div class="barChart">
        <div v-for="(remained, index) in remainedDebtBalanceList" :key="index" class="bar" :style="{
          height: `${(remained / remainedDebtBalanceList[0]) * 100}%`,
          width: `${100 / remainedDebtBalanceList.length}%`,
        }">
          <div class="barInner"></div>
        </div>
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
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  z-index: 0;
  padding-top: 10%;
}

.barChartRules {
  position: absolute;
  bottom: 32px;
  width: 100%;
  height: calc(90% - 32px);
  z-index: -1;
}

.yAxis {
  position: absolute;
  width: 100%;
  font-size: 12px;
  color: var(--color-text-secondary);
  background-image: linear-gradient(0deg, rgb(255 255 255 / 35%), rgb(255 255 255 / 35%));
  background-size: calc(100% - 48px) 1px;
  background-repeat: no-repeat;
  background-position: right 0% top 50%;
}

.yAxis0 {
  bottom: 0;
  background-position: right 0% bottom 0%;
}

.yAxis1 {
  bottom: 20%;
}

.yAxis2 {
  bottom: 40%;
}

.yAxis3 {
  bottom: 60%;
}

.yAxis4 {
  bottom: 80%;
}

.yAxis5 {
  bottom: 100%;
}

.xAxis {
  position: absolute;
  display: inline-flex;
  justify-content: center;
  text-align: center;
  width: 0;

  bottom: -24px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.barChart {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 90%;
  padding-left: 42px;
  padding-bottom: 32px;
}

.bar {
  flex-shrink: 0;
  min-width: 20px;
  padding: 0;
}

.barInner {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, #607dbc, rgb(125, 159, 234));
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: 70% 100%;
}
</style>
