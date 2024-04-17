import React, { useState } from 'react';
import axios from 'axios';
import currenciesData from './currencies.json';

function App() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [currency, setCurrency] = useState('');
  const [currency2, setCurrency2] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://open.er-api.com/v6/latest/${currency}`)
      .then(response => {
        setExchangeRates(response.data);
        setSubmitClicked(true);
        setError(null); // Reset error if previous request succeeded
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
        setError('Error fetching exchange rates. Please try again.');
      });
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCurrencyChange2 = (event) => {
    setCurrency2(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{background: 'linear-gradient(to bottom right, #FFD700, #32CD32)'}}>
      <div className="col-md-6 bg-light p-4 border">
        <h1>Currency Converter</h1>

        {submitClicked && exchangeRates && (
          <div>
            <h2>Exchange Rates as of {new Date().toLocaleDateString()}</h2>
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <label>
                Currency:
                <select value={currency} onChange={handleCurrencyChange}>
                  {currenciesData.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.code}</option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  style={{ width: '50px', marginRight: '5px' }}
                />
              </label>
              <input
                type="text"
                value={currenciesData.find(curr => curr.code === currency)?.name || ''}
                readOnly
              />
            </div>
            <div>
              <p>to</p>
            </div>
            <div>
              <label>
                Currency:
                <select value={currency2} onChange={handleCurrencyChange2}>
                  {currenciesData.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.code}</option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                <input
                  type="text"
                  value={amount && exchangeRates ? (amount * exchangeRates.rates[currency2]).toFixed(2) : ''}
                  readOnly
                  disabled
                  style={{ width: '50px', marginRight: '5px' }}
                />
                <input
                  type="text"
                  value={currenciesData.find(curr => curr.code === currency2)?.name || ''}
                  readOnly
                />
              </label>
            </div>
          </div>
          <div className="text-center mt-3">
            <button type="submit">Convert</button>
          </div>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      
      <div className="fixed-bottom bg-light p-2 text-center">
        All information sourced from <a href="https://www.exchangerate-api.com" target="_blank">https://www.exchangerate-api.com</a>
      </div>

    </div>
  );
}

export default App;
