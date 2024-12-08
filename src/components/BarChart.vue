<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { roundUpToTop2Digits } from "../utils/roundUpToTop2Digits";
import { timer } from "../utils/timer";
import { roundDecimals } from "../utils/roundDecimals";

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
const animationState = ref(false);

const yAxisBase = computed(() =>
  roundUpToTop2Digits(props.remainedDebtBalanceList[0]),
);

const startAnimation = async () => {
  if (animationState.value) {
    return;
  }
  animationState.value = true;
  await timer(10);
  animationState.value = false;
};

watch(
  () => props.isInfinity,
  async () => {
    await startAnimation();
  },
);

watch(
  () => props.remainedDebtBalanceList.length,
  async () => {
    await startAnimation();
  },
);

onMounted(async () => {
  await startAnimation();
});
</script>
<template>
  <div class="graphArea">
    <div class="barChartRules">
      <div class="yAxis yAxis0">0</div>
      <div class="yAxis yAxis1">
        {{ roundDecimals((yAxisBase / 5) * 1, 0) }}
      </div>
      <div class="yAxis yAxis2">
        {{ roundDecimals((yAxisBase / 5) * 2, 0) }}
      </div>
      <div class="yAxis yAxis3">
        {{ roundDecimals((yAxisBase / 5) * 3, 0) }}
      </div>
      <div class="yAxis yAxis4">
        {{ roundDecimals((yAxisBase / 5) * 4, 0) }}
      </div>
      <div class="yAxis yAxis5">
        {{ roundDecimals((yAxisBase / 5) * 5, 0) }}
      </div>
    </div>
    <div class="barChartWrapper">
      <div class="barChart">
        <TransitionGroup name="bar">
          <div
            v-for="(remained, index) in remainedDebtBalanceList"
            :key="index"
            class="barWrapper"
            :style="{
              width: `${100 / remainedDebtBalanceList.length}%`,
            }"
          >
            <div v-if="yAxisBase !== 0" class="bar">
              <div class="barBalloon">{{ remained }}</div>

              <div
                class="barInner"
                :class="{ reset: animationState }"
                :style="{ height: `${(remained / yAxisBase) * 100}%` }"
              ></div>
            </div>
            <div class="xAxis" :style="{}">
              {{ index + 1 }}
            </div>
          </div>
        </TransitionGroup>
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
    var(--color-border),
    var(--color-border)
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
  padding-left: 8px;
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
  min-width: 24px;
  height: calc(100% - 64px);
  margin-bottom: 32px;
}

.bar {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0;

  &:has(.barInner:hover) {
    .barBalloon {
      opacity: 1;
      transition: opacity 0.8s var(--ease-out-quart);
      translate: 0 0;
    }
  }
}

.barInner {
  width: 100%;
  height: 0;
  background-image: linear-gradient(0deg, #4063ad, rgb(125 176 234));
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: 70% 100%;
  transition: height 0.8s var(--ease-out-quart);

  &.reset {
    height: 0 !important;
    transition: none;
  }
}

.barBalloon {
  position: relative;
  top: -8px;
  width: min-content;
  padding: 4px;
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: center;
  background-color: var(--color-background-panel);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.1s var(--ease-out-quart);
}
</style>
