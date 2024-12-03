<script lang="ts" setup>
import { computed } from "vue";
import { roundUpToTop2Digits } from "../utils/roundUpToTop2Digits";

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

const yAxisBase = computed(() =>
  roundUpToTop2Digits(props.remainedDebtBalanceList[0])
);
</script>
<template>
  <div class="graphArea">
    <div class="barChartRules">
      <div class="yAxis yAxis0">0</div>
      <div class="yAxis yAxis1">{{ (yAxisBase / 5) * 1 }}</div>
      <div class="yAxis yAxis2">{{ (yAxisBase / 5) * 2 }}</div>
      <div class="yAxis yAxis3">{{ (yAxisBase / 5) * 3 }}</div>
      <div class="yAxis yAxis4">{{ (yAxisBase / 5) * 4 }}</div>
      <div class="yAxis yAxis5">{{ (yAxisBase / 5) * 5 }}</div>
    </div>
    <div class="barChartWrapper">
      <div class="barChart">
        <div
          v-for="(remained, index) in remainedDebtBalanceList"
          :key="index"
          class="barWrapper"
        >
          <div
            class="bar"
            :style="{
              width: `${100 / remainedDebtBalanceList.length}%`,
            }"
          >
            <div
              class="barInner"
              :style="{ height: `${(remained / yAxisBase) * 100}%` }"
            ></div>
          </div>
          <div class="xAxis" :style="{}">
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.graphArea {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  padding-left: 48px;
  overflow: hidden;
}

.barChartRules {
  position: absolute;
  bottom: 32px;
  left: 0;
  z-index: -1;
  width: 100%;
  height: calc(100% - 32px);
}

.yAxis {
  position: absolute;
  width: 100%;
  font-size: 12px;
  color: var(--color-text-secondary);
  background-image: linear-gradient(
    0deg,
    rgb(255 255 255 / 35%),
    rgb(255 255 255 / 35%)
  );
  background-repeat: no-repeat;
  background-position: right 0% top 50%;
  background-size: calc(100% - 48px) 1px;
}

.yAxis0 {
  bottom: -14px;
  background-position: right 0% bottom 0%;
}

.yAxis1 {
  bottom: calc(20% - 14px);
}

.yAxis2 {
  bottom: calc(40% - 14px);
}

.yAxis3 {
  bottom: calc(60% - 14px);
}

.yAxis4 {
  bottom: calc(80% - 14px);
}

.yAxis5 {
  bottom: calc(100% - 14px);
}

.xAxis {
  position: absolute;
  bottom: -4px;
  left: 50%;
  display: inline-flex;
  justify-content: center;
  width: 0;
  height: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: center;
}

.barChartWrapper {
  position: relative;
  bottom: 19px;
  height: calc(100% + 32px);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.barChart {
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.barWrapper {
  position: relative;
  height: calc(100% - 64px);
  margin-bottom: 32px;
}

.bar {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 24px;
  height: 100%;
  padding: 0;
}

.barInner {
  width: 100%;
  height: calc(100%);
  background-image: linear-gradient(0deg, #607dbc, rgb(125 159 234));
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: 70% 100%;
}
</style>
