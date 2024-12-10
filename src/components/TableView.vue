<script lang="ts" setup>
type Props = {
  isInfinity: boolean;
  payback: number;
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
    <table class="table">
      <thead>
        <tr>
          <th class="month">月</th>
          <th class="debt">残高</th>
          <th class="payback">返済額</th>
          <th class="pricipal">元本充当額</th>
          <th class="interest">利息充当額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(remained, index) in remainedDebtBalanceList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ remained.toLocaleString("ja-JP") }}</td>
          <!-- 一括返済の場合はtotalAmountとする -->
          <td v-if="index === 0 && remained < payback">
            {{ totalAmount.toLocaleString("ja-JP") }}
          </td>
          <td v-else>
            {{
              (
                paybackPrincipalList[index] + paybackInterestList[index]
              ).toLocaleString("ja-JP")
            }}
          </td>
          <td>
            {{ paybackPrincipalList[index]?.toLocaleString("ja-JP") ?? "-" }}
          </td>
          <td>
            {{ paybackInterestList[index]?.toLocaleString("ja-JP") ?? "-" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    background-color: rgb(0 0 0 / 10%);
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(23 35 73 / 100%);
    background-clip: content-box;
    border: 3px solid transparent;
    border-radius: 10px;
  }
}

.table {
  position: absolute;
  width: 100%;
  min-width: 360px;
  border-collapse: collapse;

  th {
    padding: 8px 8px 12px;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  td {
    padding: 8px;
    font-size: 14px;
    color: var(--color-text-secondary);
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }
}

.month {
  width: 40px;
}
</style>
