// --- NEWS TICKER ---
const newsHeadlines = [
  {
    title: "Sensex surges 500 points amid global cues.",
    link: "https://www.moneycontrol.com/news/business/markets/"
  },
  {
    title: "TCS announces major AI investment in India.",
    link: "https://www.moneycontrol.com/news/business/"
  },
  {
    title: "Gold dips as USD gains strength.",
    link: "https://www.moneycontrol.com/news/business/commodities/"
  },
  {
    title: "Nifty50 eyes 24,000 on bullish momentum.",
    link: "https://www.moneycontrol.com/news/business/markets/"
  },
  {
    title: "Crude oil prices edge up on supply concerns.",
    link: "https://www.moneycontrol.com/news/business/commodities/"
  }
];

let currentHeadline = 0;
const newsText = document.getElementById("news-text");
const newsLink = document.getElementById("news-link");

function updateNewsTicker() {
  const { title, link } = newsHeadlines[currentHeadline];
  newsText.innerHTML = `<span class="bold">BREAKING NEWS</span>: ${title}`;
  newsLink.href = link;
  currentHeadline = (currentHeadline + 1) % newsHeadlines.length;
}

setInterval(updateNewsTicker, 4000);
updateNewsTicker();

// --- MANUAL STOCKS ---
const stocks = [
  {
    symbol: "RELIANCE",
    company: "Reliance Industries",
    price: 2478.50,
    change: 1.12,
    chartData: [2400, 2420, 2430, 2460, 2475, 2478]
  },
  {
    symbol: "TCS",
    company: "Tata Consultancy Services",
    price: 3624.10,
    change: -0.84,
    chartData: [3700, 3680, 3650, 3620, 3615, 3624]
  },
  {
    symbol: "INFY",
    company: "Infosys",
    price: 1450.60,
    change: 0.92,
    chartData: [1400, 1420, 1430, 1440, 1450, 1450]
  },
  {
    symbol: "HDFCBANK",
    company: "HDFC Bank",
    price: 1676.30,
    change: -0.34,
    chartData: [1680, 1675, 1670, 1668, 1671, 1676]
  },
  {
    symbol: "SBIN",
    company: "State Bank of India",
    price: 552.40,
    change: 0.52,
    chartData: [530, 535, 540, 545, 550, 552]
  },
  {
    symbol: "ITC",
    company: "ITC Ltd.",
    price: 456.20,
    change: -0.24,
    chartData: [460, 458, 457, 456, 455, 456]
  },
  {
    symbol: "BAJFINANCE",
    company: "Bajaj Finance",
    price: 7224.00,
    change: 0.65,
    chartData: [7100, 7120, 7150, 7200, 7220, 7224]
  },
  {
    symbol: "WIPRO",
    company: "Wipro Ltd.",
    price: 408.80,
    change: -1.10,
    chartData: [420, 415, 410, 408, 407, 408]
  },
   {
    symbol: "HINDUNILVR",
    company: "Hindustan Unilever",
    price: 2655.50,
    change: 0.45,
    chartData: [2600, 2620, 2640, 2650, 2655, 2655]
  },
  {
    symbol: "ADANIENT",
    company: "Adani Enterprises",
    price: 3215.75,
    change: 1.35,
    chartData: [3100, 3120, 3150, 3180, 3200, 3215]
  },
  {
    symbol: "LT",
    company: "Larsen & Toubro",
    price: 3620.10,
    change: -0.68,
    chartData: [3680, 3660, 3640, 3620, 3615, 3620]
  },
  {
    symbol: "MARUTI",
    company: "Maruti Suzuki",
    price: 11155.25,
    change: 0.72,
    chartData: [10900, 11000, 11050, 11100, 11130, 11155]
  }

];

const grid = document.getElementById("stocks-grid");

stocks.forEach((stock, index) => {
  const card = document.createElement("div");
  card.className = "stock-card";
  card.innerHTML = `
    <div class="stock-info">
      <div class="stock-symbol">${stock.symbol}</div>
      <div class="stock-company">${stock.company}</div>
    </div>
    <div class="stock-price-section">
      <div class="stock-price">₹${stock.price.toFixed(2)}</div>
      <div class="stock-change ${stock.change >= 0 ? "positive" : "negative"}">
        ${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}%
      </div>
    </div>
    <canvas id="chart-${index}" class="stock-chart"></canvas>
  `;

  // Click to redirect to Google Finance
  card.style.cursor = "pointer";
  card.onclick = () => {
    window.open(`https://www.google.com/finance/quote/${stock.symbol}:NSE`, "_blank");
  };

  grid.appendChild(card);

  // Area chart
  const ctx = document.getElementById(`chart-${index}`).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: stock.chartData.map((_, i) => i + 1),
      datasets: [{
        data: stock.chartData,
        backgroundColor: stock.change >= 0 ? "rgba(5,199,2,0.1)" : "rgba(252,26,26,0.1)",
        borderColor: stock.change >= 0 ? "#05C702" : "#FC1A1A",
        pointRadius: 0,
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } },
      elements: { line: { borderJoinStyle: 'round' } },
      responsive: true,
      maintainAspectRatio: false
    }
  });
});
