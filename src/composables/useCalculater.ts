import { computed, ref } from "vue";

/**
 * 負債残高、利子などの計算を行う
 * @returns
 */
export const useCalculater = () => {
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

  return {
    debtRows,
    interestRate,
    payback,
    newPayback,
    perMonth,
    calculated: calculated,
  };
};
