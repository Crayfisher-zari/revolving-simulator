<script setup lang="ts">
import { ref, computed } from "vue";
import GlobalLayout from "./components/GlobalLayout.vue";
import NumberInput from "./components/NumberInput.vue";
import GraphView from "./components/GraphView.vue";
import TableView from "./components/TableView.vue";

const debtRows = ref<number>(5000);
const interestRate = ref<number>(15);
const payback = ref<number>(120);
const newPayback = ref<number | undefined>(undefined);
const perMonth = ref<number | undefined>(undefined);

const calculated = computed(() => {
  let count = 0;
  let debtBalance = debtRows.value;
  let remainedDebtBalanceList: number[] = [];
  let paybackPrincipalList: number[] = [];
  let paybackInterestList: number[] = [];
  let interestList: number[] = [];
  let isInfinity = false;
  let totalAmount = 0;

  while (debtBalance > 0) {
    // console.log(
    //   debtBalance,
    //   debtBalance > debtRows.value,
    //   payback.value,
    //   perMonth.value,
    //   count,
    //   perMonth.value && count % perMonth.value === 0
    // );

    if (
      newPayback.value &&
      perMonth.value &&
      debtBalance >= debtRows.value &&
      count % perMonth.value === 0 &&
      count > 0
    ) {
      isInfinity = true;
      remainedDebtBalanceList = [];
      paybackPrincipalList = [];
      paybackInterestList = [];
      interestList = [];
      break;
    } else if (debtBalance >= debtRows.value && count > 2) {
      isInfinity = true;
      remainedDebtBalanceList = [];
      paybackPrincipalList = [];
      paybackInterestList = [];
      interestList = [];
      break;
    }
    if (
      newPayback.value &&
      perMonth.value &&
      count % perMonth.value === 0 &&
      count > 0
    ) {
      debtBalance += newPayback.value;
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

    // 一括返済の場合
    if (count === 0 && remainedDebtBalanceOverZero === 0) {
      remainedDebtBalanceList.push(0);
      paybackPrincipalList.push(Math.round(debtBalance + interestOfTheMonth));
      paybackInterestList.push(Math.round(paybackInterest));
      interestList.push(Math.round(interestOfTheMonth));
      totalAmount = Math.round(debtBalance + interestOfTheMonth);
      count++;
      break;
    }

    if (remainedDebtBalanceOverZero === 0) {
      break;
    }

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
    <template #header>
      <h1 class="mainTitle">技術的負債リボ払いシミュレーター</h1>
    </template>
    <template #debt>
      <NumberInput v-model.number="debtRows" label="負債行数" unit="行" />
    </template>
    <template #interestRate>
      <NumberInput
        v-model.number="interestRate"
        label="利率（年利）"
        unit="%"
        :digits="4"
      />
    </template>
    <template #payback>
      <NumberInput
        v-model.number="payback"
        label="毎月の返済行数"
        unit="行"
        :digits="9"
      />
    </template>
    <template #newDebt>
      <div class="newPayback">
        <NumberInput
          v-model.number="newPayback"
          label="新規の負債行数"
          unit="行"
          :digits="5"
        />
        <NumberInput
          v-model.number="perMonth"
          label="発生頻度"
          unit="月に1回"
          :digits="3"
        />
      </div>
    </template>
    <template #graph>
      <GraphView
        :is-infinity="calculated.isInfinity"
        :count="calculated.count"
        :total-amount="calculated.totalAmount"
        :remained-debt-balance-list="calculated.remainedDebtBalanceList"
        :payback-interest-list="calculated.paybackInterestList"
        :payback-principal-list="calculated.paybackPrincipalList"
        :interest-list="calculated.interestList"
      />
    </template>
    <template #list>
      <TableView
        v-if="!calculated.isInfinity"
        :is-infinity="calculated.isInfinity"
        :payback
        :count="calculated.count"
        :total-amount="calculated.totalAmount"
        :remained-debt-balance-list="calculated.remainedDebtBalanceList"
        :payback-interest-list="calculated.paybackInterestList"
        :payback-principal-list="calculated.paybackPrincipalList"
        :interest-list="calculated.interestList"
      />
    </template>
  </GlobalLayout>
  <small class="creator"
    >Created by
    <a href="https://x.com/crayfisher_zari" target="_blank"
      >@crayfisher_zari</a
    ></small
  >
</template>

<style scoped>
.mainTitle {
  font-size: 24px;
  font-weight: bold;
}

.newPayback {
  display: flex;
  column-gap: 16px;
}

.creator {
  position: fixed;
  bottom: 12px;
  left: 36px;
  font-size: 12px;

  a {
    color: inherit;
    text-decoration: none;
  }
}

@media screen and (width < 510px) {
  .mainTitle {
    font-size: 18px;
  }
}
</style>
