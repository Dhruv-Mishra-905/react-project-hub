import React, { useContext, useEffect, useState } from 'react'
import './coin.css'
import { useParams } from 'react-router-dom'
import { coinContext } from '../../context/coinContext';
import LineChart from '../../components/lineChart/lineChart';

const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-dELbVDe3mvUzEYRJeNzN3FMT'}};

const Coin = () => {
  const { coinID } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(coinContext);

  const fetchCoinData = async () => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fetchHistoricalCoinData = async () => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalCoinData();
  }, [currency, coinID]);

  const formatCurrency = (val) => {
    if (val === undefined || val === null) return "-";
    try {
      return val.toLocaleString(undefined, { style: 'currency', currency: currency.name.toUpperCase() });
    } catch (err) {
      return `${currency.symbol}${val.toLocaleString()}`;
    }
  }

  const formatNumber = (val) => {
    if (val === undefined || val === null) return "-";
    return Number(val).toLocaleString();
  }

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className='coin-name'>
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
          <div className="coin-">
              <LineChart historicalData={historicalData} />
          </div>
          <div className="coin-info">
            <div className="coin-stats">
              <div className="stat-row">
                <span className="stat-label">Current Price</span>
                <span className="stat-value">{formatCurrency(coinData?.market_data?.current_price?.[currency.name])}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">24h Change</span>
                {(() => {
                  const pct = coinData?.market_data?.price_change_percentage_24h;
                  const cls = pct >= 0 ? 'positive' : 'negative';
                  return (
                    <span className={`stat-value ${pct !== undefined ? cls : ''}`}>
                      {pct !== undefined ? `${pct?.toFixed(2)}%` : '-'}
                    </span>
                  )
                })()}
              </div>
              <div className="stat-row">
                <span className="stat-label">Market Cap Rank</span>
                <span className="stat-value">{coinData?.market_cap_rank ?? '-'}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Market Cap</span>
                <span className="stat-value">{formatCurrency(coinData?.market_data?.market_cap?.[currency.name])}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">24h High</span>
                <span className="stat-value">{formatCurrency(coinData?.market_data?.high_24h?.[currency.name])}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">24h Low</span>
                <span className="stat-value">{formatCurrency(coinData?.market_data?.low_24h?.[currency.name])}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Circulating Supply</span>
                <span className="stat-value">{formatNumber(coinData?.market_data?.circulating_supply)}</span>
              </div>
            </div>
            <div className="coin-desc">
              <h3>About</h3>
              <div className="desc-text" dangerouslySetInnerHTML={{ __html: coinData?.description?.en ? coinData.description.en.split('\n').slice(0, 2).join('<br/>') : '-' }} />
              <div className="coin-links">
                {coinData?.links?.homepage?.[0] && (
                  <a href={coinData.links.homepage[0]} target="_blank" rel="noreferrer">Official Website</a>
                )}
                {coinData?.links?.blockchain_site?.[0] && (
                  <a href={coinData.links.blockchain_site[0]} target="_blank" rel="noreferrer">Blockchain Explorer</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    )
  }
}

export default Coin;
