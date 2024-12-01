<script setup lang="ts">
import { ref, computed } from "vue";
import GlobalLayout from "./components/GlobalLayout.vue";
import NumberInput from "./components/NumberInput.vue";
import ItemPanel from "./components/ItemPanel.vue";
import GraphView from "./components/GraphView.vue";

const debtRows = ref<number>(100000);
const interestRate = ref<number>(15);
const payback = ref<number>(5000);
const newPayback = ref<number | undefined>(undefined);
const perMonth = ref<number | undefined>(undefined);

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
  <GlobalLayout>
    <template #debt>
      <ItemPanel>
        <NumberInput v-model.number="debtRows" label="負債行数" unit="行" />
      </ItemPanel>
    </template>
    <template #interestRate>
      <ItemPanel>
        <NumberInput
          v-model.number="interestRate"
          label="利率（年利）"
          unit="%"
          :digits="3"
        />
      </ItemPanel>
    </template>
    <template #payback>
      <ItemPanel>
        <NumberInput
          v-model.number="payback"
          label="毎月の返済行数"
          unit="行"
          :digits="9"
        />
      </ItemPanel>
    </template>
    <template #newDebt>
      <ItemPanel>
        <div class="newPayback">
          <NumberInput
            v-model.number="newPayback"
            label="新規の負債行数"
            unit="行"
            :digits="9"
          />
          <NumberInput
            v-model.number="perMonth"
            label="発生頻度"
            unit="月に1回"
            :digits="2"
          />
        </div>
      </ItemPanel>
    </template>
    <template #graph>
      <ItemPanel>
        <GraphView
          :is-infinity="calculated.isInfinity"
          :count="calculated.count"
          :total-amount="calculated.totalAmount"
          :remained-debt-balance-list="calculated.remainedDebtBalanceList"
          :payback-interest-list="calculated.paybackInterestList"
          :payback-principal-list="calculated.paybackPrincipalList"
          :interest-list="calculated.interestList"
        />
      </ItemPanel>
    </template>
  </GlobalLayout>

  <p>支払回数：{{ calculated.count }}</p>
  <p>支払総額：{{ calculated.totalAmount }}</p>
</template>

<style scoped>
.newPayback {
  display: flex;
  column-gap: 16px;
}
</style>
