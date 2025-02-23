import { formatDate } from "../../utils/formatDate";
import coinSVG from "../../assets/coin.svg";
import { useEffect, useState } from "react";
import userApi from "../../apis/userApi";

const TransactionsPage = () => {
  const [transactionsCoinBuy, setTransactionsCoinBuy] = useState([]);
  const [transactionsBet, setTransactionsBet] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await userApi.get(`/transactions`);

      if (res.status == 200) {
        const transac = res.data.transactions;

        setTransactionsCoinBuy(transac.filter((t) => t.type == "coinbuy"));
        setTransactionsBet(transac.filter((t) => t.type == "bet"));
      }
    } catch (e) {
      showSnackbar("Error in fetching the transactions", "error");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="[&>tr>td]:py-2 [&>tr>td]:border [&>tr>td]:border-slate-400 [&>tr>td]:text-center text-white">
                {transactionsBet.length != 0 &&
                  transactionsBet.map((t) => (
                    <tr key={t._id}>
                      <td>{formatDate(t.createdAt)}</td>
                      <td>{t.team}</td>
                      <td>{t.eventName}</td>
                      <td className="text-blue-600">{t.odds}x</td>
                      <td>
                        <div className="flex items-centerm w-full justify-center space-x-3">
                          <img
                            src={coinSVG}
                            alt="coins"
                            className="w-5 object-contain"
                          />
                          <p>{t.amount}</p>
                        </div>
                      </td>
                      <td>{t.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {transactionsBet.length == 0 && (
              <div className="w-full text-center mt-4">
                <p className="text-slate-400">No bets done</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-base md:text-lg text-white font-medium my-3">
              Coin Purchase History
            </h2>
            <table className="w-full text-xs  md:text-base">
              <thead className="[&>tr>th]:py-2 [&>tr>th]:border [&>tr>th]:border-slate-400 text-white">
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody className="[&>tr>td]:py-2 [&>tr>td]:border [&>tr>td]:border-slate-400 [&>tr>td]:text-center text-white">
                {transactionsCoinBuy.length != 0 &&
                  transactionsCoinBuy.map((t) => (
                    <tr key={t._id}>
                      <td>{formatDate(t.createdAt)}</td>
                      <td>
                        <div className="flex items-centerm w-full justify-center space-x-3">
                          <img
                            src={coinSVG}
                            alt="coins"
                            className="w-5 object-contain"
                          />
                          <p>{t.amount}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {transactionsCoinBuy.length == 0 && (
              <div className="w-full mt-4 text-center">
                <p className="text-slate-400">No coin purchase history</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
