<script setup lang="ts">
import { ref, computed } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import NumberInput from "./components/NumberInput.vue";

const debtRows = ref<number>(100);
const interestRate = ref<number>(15);
const payback = ref<number>(15);

const calculated = computed(() => {
  let count = 0;
  let debtBalance = debtRows.value;
  console.log(debtBalance)
  const remainedDebtBalanceList = [];
  const paybackPrincipalList = [];
  const paybackInterestList = [];
  const interestList = [];
  let isInfinity = false;

  while (debtBalance >= 0) {
    console.log(debtBalance)
    if(debtBalance > debtRows.value){
      isInfinity = true
      break;
    }
    // 当月の利子（残高×利率% / 12ヶ月）
    const interestOfTheMonth = (debtBalance * interestRate.value/100) / 12;

    // 当月の負債残高
    const debtBalanceOfTheMonth = debtBalance + interestOfTheMonth;

    // 当月の返済後の負債残高
    const remainedDebtBalance = debtBalanceOfTheMonth - payback.value;

    // 今月の元金の支払額
    const paybackPrincipal = interestOfTheMonth - payback.value;

    // 今月の利子の支払額
    const paybackInterest = payback.value - paybackPrincipal;

    // リストを更新
    remainedDebtBalanceList.push(remainedDebtBalance);
    paybackPrincipalList.push(paybackPrincipal);
    paybackInterestList.push(paybackInterest);
    interestList.push(interestOfTheMonth);

    // 残高を更新
    debtBalance = remainedDebtBalance
    count++;
  }

  // while (count < 3) {
  //   count++;
  // }

  return {
    isInfinity,
    count,
    remainedDebtBalanceList,
    paybackPrincipalList,
    paybackInterestList,
    interestList,
  };
});
</script>

<template>
  <div>
    <NumberInput label="負債行数" unit="行" v-model.number="debtRows" />
  </div>
  <div>
    <NumberInput label="利率（年利）" unit="%" v-model.number="interestRate" />
  </div>
  <div>
    <NumberInput label="毎月の返済行数" unit="行" v-model.number="payback" />
  </div>
  {{ calculated.count }}
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
