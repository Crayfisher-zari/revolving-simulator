<script setup lang="ts">
import { ref, computed } from "vue";
import NumberInput from "./components/NumberInput.vue";
import ItemPanel from "./components/ItemPanel.vue";

const debtRows = ref<number>(100000);
const interestRate = ref<number>(15);
const payback = ref<number>(5000);

const calculated = computed(() => {
  let count = 0;
  let debtBalance = debtRows.value;
  const remainedDebtBalanceList = [];
  const paybackPrincipalList = [];
  const paybackInterestList = [];
  const interestList = [];
  let isInfinity = false;
  let totalAmount = 0;

  while (debtBalance > 0) {
    console.log(debtBalance, debtBalance > debtRows.value, payback.value);
    if (debtBalance > debtRows.value) {
      isInfinity = true;
      break;
    }
    if (debtBalance >= debtRows.value && count > 2) {
      isInfinity = true;
      break;
    }
    // 当月の利子（残高×利率% / 12ヶ月）
    const interestOfTheMonth = (debtBalance * interestRate.value) / 100 / 12;
    // 当月の負債残高
    const debtBalanceOfTheMonth = debtBalance + interestOfTheMonth;

    // 当月の返済後の負債残高
    const remainedDebtBalance = debtBalanceOfTheMonth - payback.value;
    // 0以下になったら0にする
    const remainedDebtBalanceOverZero =
      remainedDebtBalance < 0 ? 0 : remainedDebtBalance;

    // 今月の元金の支払額
    const paybackPrincipal = payback.value - interestOfTheMonth;

    // 今月の利子の支払額
    const paybackInterest = payback.value - paybackPrincipal;

    // リストを更新
    remainedDebtBalanceList.push(Math.round(remainedDebtBalanceOverZero));
    paybackPrincipalList.push(Math.round(paybackPrincipal));
    paybackInterestList.push(Math.round(paybackInterest));
    interestList.push(Math.round(interestOfTheMonth));
    totalAmount +=
      remainedDebtBalanceOverZero === 0 ? debtBalance : payback.value;

    // 残高を更新
    debtBalance = remainedDebtBalance;
    count++;
  }

  return {
    isInfinity,
    count,
    totalAmount,
    remainedDebtBalanceList,
    paybackPrincipalList,
    paybackInterestList,
    interestList,
  };
});
</script>

<template>
  <ItemPanel panel-title="負債行数">
    <div>
      <NumberInput v-model.number="debtRows" unit="行" />
    </div>
  </ItemPanel>

  <div>
    <NumberInput v-model.number="interestRate" label="利率（年利）" unit="%" />
  </div>
  <div>
    <NumberInput v-model.number="payback" label="毎月の返済行数" unit="行" />
  </div>
  <p>支払回数：{{ calculated.count }}</p>
  <p>支払総額：{{ calculated.totalAmount }}</p>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  transition: filter 300ms;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
