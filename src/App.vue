<script setup lang="ts">
import GlobalLayout from "./components/GlobalLayout.vue";
import NumberInput from "./components/NumberInput.vue";
import GraphView from "./components/GraphView.vue";
import TableView from "./components/TableView.vue";
import { useCalculater } from "./composables/useCalculater";

// 残高や利息を計算
const { debtRows, interestRate, payback, newPayback, perMonth, calculated } =
  useCalculater();
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
