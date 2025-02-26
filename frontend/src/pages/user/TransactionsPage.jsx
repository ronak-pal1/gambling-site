import { formatDate } from "../../utils/formatDate";
import coinSVG from "../../assets/coin.svg";
import { useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { Pagination, useStepContext } from "@mui/material";

const TransactionsPage = () => {
  const [transactionsCoinBuy, setTransactionsCoinBuy] = useState([]);
  const [transactionsBet, setTransactionsBet] = useState([]);

  const [totalBets, setTotalBets] = useState(0);
  const [totalCoinBuy, setTotalCoinBuy] = useState(0);

  const [betsCurrentPage, setBetsCurrentPage] = useState(1);
  const [coinBuyCurrentPage, setCoinBuyCurrentPage] = useState(1);

  const fetchTransactions = async (type, pageNo) => {
    try {
      const res = await userApi.get(
        `/transactions?type=${type}&pageno=${pageNo}`
      );

      if (res.status == 200) {
        if (type == "bet") {
          setTransactionsBet(res.data.transactions);
          setTotalBets(res.data.totalTransactions);
        } else if (type == "coinbuy") {
          setTransactionsCoinBuy(res.data.transactions);
          setTotalCoinBuy(res.data.totalTransactions);
        }
      }
    } catch (e) {
      showSnackbar("Error in fetching the transactions", "error");
    }
  };

  useEffect(() => {
    fetchTransactions("bet", betsCurrentPage);
  }, [betsCurrentPage]);

  useEffect(() => {
    fetchTransactions("coinbuy", coinBuyCurrentPage);
  }, [coinBuyCurrentPage]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className=" w-full h-full rounded-md md:p-8 p-4 ">
        <h1 className="text-lg md:text-2xl text-white font-semibold">
          Transactions
        </h1>

        <div className="w-full h-full mt-5 pb-20 space-y-7 custom-scrollbar-light">
          <div>
            <h2 className="text-base md:text-lg text-white font-medium my-3">
              Bets
            </h2>
            <table className="w-full text-xs md:text-base">
              <thead className="[&>tr>th]:py-2 [&>tr>th]:border [&>tr>th]:border-slate-400 text-white">
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Team</th>
                  <th>Bid</th>
                  <th>
                    <div className="flex items-centerm w-full justify-center space-x-3">
                      <img
                        src={coinSVG}
                        alt="coins"
                        className="w-5 object-contain"
                      />
                      <p>Amount</p>
                    </div>
                  </th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="[&>tr>td]:py-2 [&>tr>td]:border [&>tr>td]:border-slate-400 [&>tr>td]:text-center text-white">
                {transactionsBet.length != 0 &&
                  transactionsBet.map((t) => (
                    <tr key={t._id}>
                      <td>{formatDate(t.createdAt)}</td>
                      <td>{t.eventName}</td>
                      <td>{t.team}</td>
                      <td className="text-blue-600">{t.odds}x</td>
                      <td>{parseFloat(t.amount).toFixed(2)}</td>
                      <td>{t.isSettled ? "Settled" : t.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {transactionsBet.length == 0 && (
              <div className="w-full text-center mt-4">
                <p className="text-slate-400">No bets done</p>
              </div>
            )}

            <div className="w-full flex justify-center my-6">
              <Pagination
                count={Math.ceil(totalBets / 10)}
                page={betsCurrentPage}
                onChange={(_e, value) => {
                  setBetsCurrentPage(value);
                }}
                variant="outlined"
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                  },
                }}
              />
            </div>
          </div>

          <div>
            <h2 className="text-base md:text-lg text-white font-medium my-3">
              Coin Purchase History
            </h2>
            <table className="w-full text-xs  md:text-base">
              <thead className="[&>tr>th]:py-2 [&>tr>th]:border [&>tr>th]:border-slate-400 text-white">
                <tr>
                  <th>Date</th>
                  <th>
                    <div className="flex items-centerm w-full justify-center space-x-3">
                      <img
                        src={coinSVG}
                        alt="coins"
                        className="w-5 object-contain"
                      />
                      <p>Amount</p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="[&>tr>td]:py-2 [&>tr>td]:border [&>tr>td]:border-slate-400 [&>tr>td]:text-center text-white">
                {transactionsCoinBuy.length != 0 &&
                  transactionsCoinBuy.map((t) => (
                    <tr key={t._id}>
                      <td>{formatDate(t.createdAt)}</td>
                      <td>{parseFloat(t.amount).toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {transactionsCoinBuy.length == 0 && (
              <div className="w-full mt-4 text-center">
                <p className="text-slate-400">No coin purchase history</p>
              </div>
            )}

            <div className="w-full flex justify-center py-6">
              <Pagination
                count={Math.ceil(totalCoinBuy / 10)}
                page={coinBuyCurrentPage}
                onChange={(_e, value) => {
                  setCoinBuyCurrentPage(value);
                }}
                variant="outlined"
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
