import { createContext, useEffect, useState } from "react";

export const coinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoins = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "x-cg-demo-api-key": "CG-dELbVDe3mvUzEYRJeNzN3FMT",
        },
      };

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&category=layer-1&price_change_percentage=1h`,
        options
      );

      const data = await res.json();
      setAllCoin(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  return (
    <coinContext.Provider value={{ allCoin, currency, setCurrency }}>
      {children}
    </coinContext.Provider>
  );
};

export default CoinContextProvider;
