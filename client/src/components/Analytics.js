import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
    "other",
  ];

  // calculation for total transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // calculation for total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  // calculation for net turnover
  const netTurnover = totalIncomeTurnover - totalExpenseTurnover;
  const netIncomePercent = (netTurnover / totalIncomeTurnover) * 100;
  const netExpensePercent = (totalExpenseTurnover / totalIncomeTurnover) * 100;

  return (
    <>
      <div className="grid grid-cols-3 my-6">
        <div className="row m-3 flex flex-col gap-10 w-[420px]">
          <div className="col-md-3 w-[410px]">
            <div className="card">
              <div className="card-header">
                Total Transactions : {totalTransaction}
              </div>
              <div className="card-body flex flex-col align-items-center">
                <div className="flex gap-[6rem] mx-auto mb-2">
                  <h5 className="text-success">
                    Income : {totalIncomeTransaction.length}
                  </h5>
                  <h5 className="text-danger">
                    Expense : {totalExpenseTransaction.length}
                  </h5>
                </div>
                <div className="flex gap-[2rem]">
                  <Progress
                    type="circle"
                    strokeColor={"green"}
                    className="mx-2"
                    percent={totalIncomePercent.toFixed(0)}
                  />
                  <Progress
                    type="circle"
                    strokeColor={"red"}
                    className="mx-2"
                    percent={totalExpensePercent.toFixed(0)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 w-[410px]">
            <div className="card">
              <div className="card-header">
                Total Income : {totalIncomeTurnover}
              </div>
              <div className="card-body flex flex-col align-items-center">
                <div className="flex gap-[6rem] mx-auto mb-2">
                  <h5 className="text-success ml-5">
                    Net Income : {netTurnover}
                  </h5>
                  <h5 className="text-danger">
                    Net Expense : {totalExpenseTurnover}
                  </h5>
                </div>
                <div className="flex gap-[2rem]">
                  <Progress
                    type="circle"
                    strokeColor={"green"}
                    className="mx-2"
                    percent={netIncomePercent.toFixed(0)}
                  />
                  <Progress
                    type="circle"
                    strokeColor={"red"}
                    className="mx-2"
                    percent={netExpensePercent.toFixed(0)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 w-[410px]">
            <div className="card">
              <div className="card-header">
                Total Turnover : {totalTurnover}
              </div>
              <div className="card-body flex flex-col align-items-center">
                <div className="flex gap-[6rem] mx-auto mb-2">
                  <h5 className="text-success">
                    Income : {totalIncomeTurnover}
                  </h5>
                  <h5 className="text-danger">
                    Expense : {totalExpenseTurnover}
                  </h5>
                </div>
                <div className="flex gap-[2rem]">
                  <Progress
                    type="circle"
                    strokeColor={"green"}
                    className="mx-2"
                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                  />
                  <Progress
                    type="circle"
                    strokeColor={"red"}
                    className="mx-2"
                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 w-[315px] justify-items-center ml-14">
          <div className="col-md-4 w-[310px]">
            <h4 className="mb-3 font-semibold uppercase text-lg">
              Categorywise Income
            </h4>
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress
                        percent={((amount / totalIncomeTurnover) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="row mt-3 w-[315px] justify-items-center ml-10">
          <div className="col-md-4 w-[310px]">
            <h4 className="mb-3 font-semibold uppercase text-lg">
              Categorywise Expense
            </h4>
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress
                        percent={(
                          (amount / totalExpenseTurnover) *
                          100
                        ).toFixed(0)}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
