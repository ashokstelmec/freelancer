import React, { useState, useEffect } from "react";
import "./rate.css";

const SetRate = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({
    id: "1",
    symbol: "$",
  });
  const [hourlyRate, setHourlyRate] = useState("0.00");
  const [serviceFee, setServiceFee] = useState("0.00");
  const [youGet, setYouGet] = useState("0.00");

  useEffect(() => {
    // Fetch currencies from API when component mounts
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://freelancerapp.somee.com/api/Projects_/GetActiveCurrency"
        );
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (e) => {
    const selectedCurrencyId = e.target.value;
    const currency = currencies.find((cur) => cur.currency_Id === selectedCurrencyId);
    
    if (currency) {
      const symbol = currency.currency_Id === "1" ? "₹" : currency.currency_Id === "2" ? "$" : "₹";
      setSelectedCurrency({ id: selectedCurrencyId, symbol });
      resetFields();
    }
  };

  const resetFields = () => {
    setHourlyRate("0.00");
    setServiceFee("0.00");
    setYouGet("0.00");
  };

  const handleHourlyRateChange = (e) => {
    const rate = parseFloat(e.target.value) || 0;
    const fee = rate * 0.2; 
    const get = rate - fee;

    setHourlyRate(rate.toFixed(2));
    setServiceFee(fee.toFixed(2));
    setYouGet(get.toFixed(2));
  };

  const handleSubmit = async () => {
    const userID = sessionStorage.getItem("NUserID");

    if (isNaN(parseFloat(hourlyRate)) || parseFloat(hourlyRate) <= 0) {
      alert("Please enter a valid hourly rate.");
      return;
    }

    const formData = new FormData();
    formData.append("NUserID", userID);
    formData.append("Rate", hourlyRate);
    formData.append("ServiceFee", serviceFee);
    formData.append("YouGet", youGet);

    try {
      const response = await fetch("https://freelancerapp.somee.com/Update_About", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save hourly rate");

      alert("Hourly rate saved successfully!");
      window.location.href = "registration-details.html";
    } catch (error) {
      console.error("Error saving hourly rate:", error);
      alert("Failed to save hourly rate. Please try again.");
    }
  };

  return (

    <div className="set-rate-container">
        <div className="rate-container">
          <div className="text-left">
            <img src="/paid2work-logo.jpeg" alt="Paid2Work Logo" className="" style={{ width: "40%" }} />
          </div>
          <div className="title mt-2">Now, let's set your hourly rate.</div>
          <div className="subtitle">
              Clients will see this rate on your profile and in search results once you publish your profile. You can adjust
              your rate every time you submit a proposal.
          </div>

        <div className="rate-section mt-2">
            <div>
            <h5>Select Currency</h5>
            <p>Choose the currency for your hourly rate.</p>
            </div>
            <div className="currency-select">
            <div id="currency-symbol" className="currency-symbol">
                {selectedCurrency.symbol}
            </div>
            <select id="currency-select" value={selectedCurrency.id} onChange={handleCurrencyChange}>
                {currencies.map((currency) => (
                <option key={currency.currency_Id} value={currency.currency_Id}>
                    {currency.currency_Name}
                </option>
                ))}
            </select>
            </div>
        </div>

        <div className="border-bottom"></div>

        <div className="rate-section mt-2">
            <div>
            <h5>Hourly rate</h5>
            <p>Total amount the client will see.</p>
            </div>
            <div className="input-container">
            <div className="input-prefix" id="currency-prefix">
                {selectedCurrency.symbol}
            </div>
            <input
                type="number"
                id="hourly-rate"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
            />
            <div className="rate">/hr</div>
            </div>
        </div>

        <div className="border-bottom"></div>

        <div className="rate-section mt-2">
            <div>
            <h5>Service Fee</h5>
            <p>This helps us run the platform and provide services like payment protection and customer support.</p>
            </div>
            <div className="input-container">
            <div className="input-prefix" id="fee-currency-prefix">
                {selectedCurrency.symbol}
            </div>
            <input type="text" id="service-fee" value={serviceFee} readOnly />
            <div className="rate">/hr</div>
            </div>
        </div>

        <div className="border-bottom"></div>

        <div className="rate-section mt-2">
            <div>
            <h5>You'll get</h5>
            <p>The estimated amount you'll receive after service fees.</p>
            </div>
            <div className="input-container">
            <div className="input-prefix" id="get-currency-prefix">
                {selectedCurrency.symbol}
            </div>
            <input type="text" id="you-get" value={youGet} readOnly />
            <div className="rate">/hr</div>
            </div>
        </div>

        <br />
        <div className="button-container">
            <button className="button back">Back</button>
            <button className="button next" id="submit-rate" onClick={handleSubmit}>
            Next, add your photo and location
            </button>
        </div>
        </div>
    </div>

  );
};

export default SetRate;
