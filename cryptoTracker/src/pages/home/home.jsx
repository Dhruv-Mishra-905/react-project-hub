import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { coinContext } from "../../context/coinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(coinContext);

  const [displayCoin, setDisplayCoin] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    setDisplayCoin(allCoin);
    setCurrentPage(1);
  }, [allCoin]);

  useEffect(() => {

    const filtered = allCoin.filter((coin) =>
      (coin.name.toLowerCase()+coin.symbol.toLowerCase()).includes(search.toLowerCase())
    );
    setDisplayCoin(filtered);
    setCurrentPage(1);
  }, [search, allCoin]);

  const totalPages = Math.ceil(displayCoin.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = displayCoin.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const renderPagination = () => {
    let pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((p, idx) =>
      p === "..." ? (
        <span key={idx} style={{ margin: "0 5px" }}>...</span>
      ) : (
        <button
          key={idx}
          className={currentPage === p ? "active" : ""}
          onClick={() => handlePageChange(p)}
          style={{
            margin: "0 5px",
            fontWeight: currentPage === p ? "bold" : "normal"
          }}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Track your crypto in <span>real-time</span> and stay{" "}
          <span>ahead</span> of the market.
        </h1>
        <p>
          Keep track of your coins, prices, and alerts in one place.
          Fast, simple, and designed to help you stay ahead in the crypto market.
        </p>

        <input
          type="text"
          placeholder="Search Crypto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={item.id}>
              <p>{(currentPage - 1) * itemsPerPage + index + 1}</p>

              <div>
                <img src={item.image} alt={item.name} />
                <p>
                  {item.name} - {item.symbol.toUpperCase()}
                </p>
              </div>

              <p>
                {currency.symbol}
                {item.current_price?.toLocaleString()}
              </p>

              <p
                className={
                  item.price_change_percentage_24h > 0 ? "pos" : "neg"
                }
                style={{ textAlign: "center" }}
              >
                {item.price_change_percentage_24h?.toFixed(2)}%
              </p>

              <p className="market-cap">
                {currency.symbol}
                {item.market_cap?.toLocaleString()}
              </p>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>No results found</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
        {renderPagination()}
        <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
      </div>
    </div>
  );
};

export default Home;
