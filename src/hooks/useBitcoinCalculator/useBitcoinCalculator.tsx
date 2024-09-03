import { useCallback, useMemo, useState } from "react";

export type CalculatePayload = {
  hash_rate: number;
  power_consumption: number;
  electricity_cost: number;
  initial_investment: number;
};

export type CalculateResponse = {
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  dailyRevenueUSD: number;
  monthlyRevenueUSD: number;
  yearlyRevenueUSD: number;
  dailyRevenueBTC: number;
  monthlyRevenueBTC: number;
  yearlyRevenueBTC: number;
  dailyProfitUSD: number;
  monthlyProfitUSD: number;
  yearlyProfitUSD: number;
  breakevenTimeline: number;
  costToMine: number;
};

export const useBitcoinCalculator = (url = "127.0.0.1:8000") => {
  const [requestData, setRequestData] = useState<{
    loading: boolean;
    data: Partial<CalculateResponse> | undefined;
    error: boolean;
  }>({
    loading: false,
    data: undefined,
    error: false,
  });

  const Calculate = useCallback(
    (
      payload: CalculatePayload,
      {
        failure,
        success,
      }: {
        success?: (response: Partial<CalculateResponse>) => void;
        failure?: () => void;
      } = {}
    ) => {
      setRequestData((d) => ({ ...d, loading: true, error: false }));
      fetch(`${url}/calculate`, {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data: Partial<CalculateResponse>) => {
          setRequestData(() => ({ data, loading: false, error: false }));

          if (success) {
            success(data);
          }
        })
        .catch((error) => {
          setRequestData((d) => ({ ...d, loading: false, error: true }));
          if (failure) {
            failure();
          }
        });
    },
    [url]
  );

  return useMemo(
    () => ({
      Calculate,
      loading: requestData.loading,
      error: requestData.error,
      data: requestData.data,
    }),
    [Calculate, requestData]
  );
};
