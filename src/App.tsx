import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { useBitcoinCalculator, CalculatePayload } from "./hooks";
import {
  Toggle,
  Heading,
  NumberPicker,
  Button,
  Card,
  LabeledValue,
} from "./components";
import { FormatNumber } from "utils";

export type AppProps = {
  options?: string[];
  maxInputValues?: { [key in keyof CalculatePayload]: number };
};

const App: React.FC<AppProps> = ({
  options = ["USD", "BTC"],
  maxInputValues = {
    electricity_cost: 200000,
    hash_rate: 100,
    initial_investment: 100000,
    power_consumption: 100000,
  },
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { Calculate, data, error, loading } = useBitcoinCalculator();

  const [formValues, setFormValues] = useState<Partial<CalculatePayload>>({});
  const [errorMessages, setErrorMessages] =
    useState<{ [key in keyof CalculatePayload]?: string | undefined }>();

  const submitForm = useCallback(() => {
    if (
      !formValues ||
      !formValues?.electricity_cost ||
      !formValues?.hash_rate ||
      !formValues?.initial_investment ||
      !formValues?.power_consumption
    ) {
      setErrorMessages({
        electricity_cost: !formValues?.electricity_cost
          ? "Please enter an electricity cost"
          : undefined,
        hash_rate: !formValues?.hash_rate
          ? "Please enter a hash rate"
          : undefined,
        initial_investment: !formValues?.initial_investment
          ? "Please enter an initial investment"
          : undefined,
        power_consumption: !formValues?.power_consumption
          ? "Please enter a power consumption"
          : undefined,
      });
    } else {
      Calculate({
        electricity_cost: formValues.electricity_cost,
        hash_rate: formValues.hash_rate,
        initial_investment: formValues.initial_investment,
        power_consumption: formValues?.power_consumption,
      });
    }
  }, [Calculate, formValues]);

  const updateFormValue = useCallback((form: Partial<CalculatePayload>) => {
    setFormValues((v) => ({ ...v, ...form }));
    setErrorMessages((e) => ({
      ...e,
      ...Object.fromEntries(
        Object.entries(form).map(([key]) => [key, undefined])
      ),
    }));
  }, []);

  return (
    <main
      className={classnames(
        "bg-neutral-100",
        "flex",
        "flex-col",
        "w-full",
        "h-full",
        "min-w-0",
        "overflow-y-auto",
        "space-y-4",
        "p-24"
      )}
    >
      <header>
        <Heading variant="h1">Bit Coin Calculator</Heading>
      </header>
      <div
        className={classnames(
          "w-full",
          "flex",
          "lg:flex-row",
          "flex-col",
          "lg:space-x-4",
          "lg:space-y-0",
          "space-y-4",
          "space-x-0"
        )}
      >
        <Card>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className={classnames("flex", "flex-col", "min-w-0", "space-y-2")}
          >
            <NumberPicker
              label="Hash rate"
              value={formValues.hash_rate}
              onChange={(h) => updateFormValue({ hash_rate: h })}
              errorMessage={errorMessages?.hash_rate}
              min={0}
              max={maxInputValues.hash_rate}
              step={1}
            />
            <NumberPicker
              label="Power consumption"
              value={formValues.power_consumption}
              onChange={(p) => updateFormValue({ power_consumption: p })}
              errorMessage={errorMessages?.power_consumption}
              min={0}
              max={maxInputValues.power_consumption}
              step={1}
            />
            <NumberPicker
              label="Electricity cost"
              value={formValues.electricity_cost}
              onChange={(e) => updateFormValue({ electricity_cost: e })}
              errorMessage={errorMessages?.electricity_cost}
              min={0}
              max={maxInputValues.electricity_cost}
              step={0.01}
              type="currency"
            />
            <NumberPicker
              label="Initial investment"
              value={formValues.initial_investment}
              onChange={(i) => updateFormValue({ initial_investment: i })}
              errorMessage={errorMessages?.initial_investment}
              min={0}
              max={maxInputValues.initial_investment}
              step={1}
              type="currency"
            />
            <Button label="Calculate" type="submit" />
          </form>
        </Card>
        <Card>
          {loading ? (
            <div>loading...</div>
          ) : error ? (
            <div>unable to calculate</div>
          ) : data === undefined ? (
            <div>enter data above</div>
          ) : (
            <div
              className={classnames("flex", "flex-col", "min-w-0", "space-y-2")}
            >
              <LabeledValue label="Daily cost" value={data?.dailyCost} />
              <LabeledValue label="Monthly cost" value={data?.monthlyCost} />
              <LabeledValue label="Yearly cost" value={data?.yearlyCost} />
              <LabeledValue
                label="Daily revenue (USD)"
                value={data?.dailyProfitUSD}
              />
              <LabeledValue
                label="Monthly revenue (USD)"
                value={data?.monthlyRevenueUSD}
              />
              <LabeledValue
                label="Yearly revenue (USD)"
                value={data?.yearlyProfitUSD}
              />
              <LabeledValue
                label="Daily revenue (BTC)"
                value={data?.dailyRevenueBTC}
              />
              <LabeledValue
                label="Monthly revenue (BTC)"
                value={data?.monthlyRevenueBTC}
              />
              <LabeledValue
                label="Yearly revenue (BTC)"
                value={data?.yearlyRevenueBTC}
              />
              <LabeledValue
                label="Daily profit (USD)"
                value={data?.dailyProfitUSD}
              />
              <LabeledValue
                label="Monthly profit (USD)"
                value={data?.monthlyProfitUSD}
              />
              <LabeledValue
                label="Yearly profit (USD)"
                value={data?.yearlyProfitUSD}
              />
              <LabeledValue
                label="Breakeven Timeline"
                value={data?.breakevenTimeline}
              />
              <LabeledValue label="Cost to mine" value={data?.costToMine} />
            </div>
          )}
        </Card>
      </div>
    </main>
  );
};

export default App;
