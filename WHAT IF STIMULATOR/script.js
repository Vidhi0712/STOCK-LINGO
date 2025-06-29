// Investment Simulator JavaScript

// Company data
const companies = {
  "tech-titans": { name: "Tech Titans Inc.", symbol: "TTI", type: "stock" },
  reliance: { name: "Reliance Industries", symbol: "RIL", type: "stock" },
  tcs: { name: "Tata Consultancy Services", symbol: "TCS", type: "stock" },
  "hdfc-bank": { name: "HDFC Bank", symbol: "HDFCBANK", type: "stock" },
  infosys: { name: "Infosys Limited", symbol: "INFY", type: "stock" },
  sensex: { name: "BSE Sensex", symbol: "SENSEX", type: "index" },
  nifty50: { name: "Nifty 50", symbol: "NIFTY", type: "index" },
  banknifty: { name: "Bank Nifty", symbol: "BANKNIFTY", type: "index" },
};

// Timeframe data
const timeframes = {
  "1year": { label: "1 Year", years: 1 },
  "3years": { label: "3 Years", years: 3 },
  "5years": { label: "5 Years", years: 5 },
  "10years": { label: "10 Years", years: 10 },
  "15years": { label: "15 Years", years: 15 },
  "20years": { label: "20 Years", years: 20 },
};

// Mock returns data
const mockReturns = {
  "tech-titans": 0.15,
  reliance: 0.12,
  tcs: 0.18,
  "hdfc-bank": 0.14,
  infosys: 0.16,
  sensex: 0.11,
  nifty50: 0.12,
  banknifty: 0.13,
};

// Form state
let formData = {
  amount: "",
  company: "",
  timeframe: "",
};

// DOM elements
const elements = {
  investmentAmount: document.getElementById("investmentAmount"),
  companySelector: document.getElementById("companySelector"),
  companyText: document.getElementById("companyText"),
  companyDropdown: document.getElementById("companyDropdown"),
  companySearch: document.getElementById("companySearch"),
  timeframeSelector: document.getElementById("timeframeSelector"),
  timeframeText: document.getElementById("timeframeText"),
  timeframeDropdown: document.getElementById("timeframeDropdown"),
  submitButton: document.getElementById("submitButton"),
  dropdownOverlay: document.getElementById("dropdownOverlay"),
  amountDot: document.getElementById("amountDot"),
  companyDot: document.getElementById("companyDot"),
  timeframeDot: document.getElementById("timeframeDot"),
  progressText: document.getElementById("progressText"),
  sampleSimulation: document.getElementById("sampleSimulation"),
  simulationResults: document.getElementById("simulationResults"),
  runSampleButton: document.getElementById("runSampleButton"),
  amountError: document.getElementById("amountError"),
  companyError: document.getElementById("companyError"),
  timeframeError: document.getElementById("timeframeError"),
};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  updateProgressIndicator();
  updateSubmitButton();
});

// Event listeners
function initializeEventListeners() {
  // Investment amount input
  elements.investmentAmount.addEventListener("input", handleAmountInput);
  elements.investmentAmount.addEventListener("focus", handleAmountFocus);
  elements.investmentAmount.addEventListener("blur", handleAmountBlur);

  // Company selector
  elements.companySelector.addEventListener("click", toggleCompanyDropdown);
  elements.companySearch.addEventListener("input", handleCompanySearch);

  // Timeframe selector
  elements.timeframeSelector.addEventListener("click", toggleTimeframeDropdown);

  // Submit form
  document
    .getElementById("investmentForm")
    .addEventListener("submit", handleFormSubmit);

  // Sample simulation button
  elements.runSampleButton.addEventListener("click", runSampleSimulation);

  // Dropdown overlay
  elements.dropdownOverlay.addEventListener("click", closeAllDropdowns);

  // Company dropdown options
  document
    .querySelectorAll("#companyDropdown .dropdown-option")
    .forEach((option) => {
      option.addEventListener("click", () =>
        selectCompany(option.dataset.value),
      );
    });

  // Timeframe dropdown options
  document
    .querySelectorAll("#timeframeDropdown .dropdown-option")
    .forEach((option) => {
      option.addEventListener("click", () =>
        selectTimeframe(option.dataset.value),
      );
    });

  // Quick select buttons
  document.querySelectorAll(".quick-button").forEach((button) => {
    button.addEventListener("click", () =>
      selectTimeframe(button.dataset.value),
    );
  });

  // Click outside to close dropdowns
  document.addEventListener("click", function (e) {
    if (
      !elements.companySelector.contains(e.target) &&
      !elements.companyDropdown.contains(e.target)
    ) {
      closeCompanyDropdown();
    }

    if (
      !elements.timeframeSelector.contains(e.target) &&
      !elements.timeframeDropdown.contains(e.target)
    ) {
      closeTimeframeDropdown();
    }
  });
}

// Investment amount handling
function handleAmountInput(e) {
  const input = e.target.value.replace(/[^\d]/g, "");
  formData.amount = input;

  if (input) {
    e.target.value = formatCurrency(input);
  } else {
    e.target.value = "";
  }

  validateAmount();
  updateProgressIndicator();
  updateSubmitButton();
}

function handleAmountFocus() {
  // Show help text or additional styling
}

function handleAmountBlur() {
  // Hide help text or reset styling
}

function formatCurrency(amount) {
  if (!amount) return "";
  return `₹${parseInt(amount).toLocaleString("en-IN")}`;
}

function validateAmount() {
  const amount = parseInt(formData.amount || "0");
  const errorElement = elements.amountError;

  if (!formData.amount) {
    errorElement.textContent = "";
    return false;
  }

  if (amount < 1000) {
    errorElement.textContent = "Minimum investment amount is ₹1,000";
    return false;
  }

  errorElement.textContent = "";
  return true;
}

// Company selector handling
function toggleCompanyDropdown() {
  const isOpen = elements.companyDropdown.classList.contains("open");

  closeAllDropdowns();

  if (!isOpen) {
    elements.companyDropdown.classList.add("open");
    elements.companySelector.classList.add("open");
    elements.dropdownOverlay.classList.add("active");
    elements.companySearch.focus();
  }
}

function closeCompanyDropdown() {
  elements.companyDropdown.classList.remove("open");
  elements.companySelector.classList.remove("open");
  elements.dropdownOverlay.classList.remove("active");
}

function selectCompany(companyId) {
  formData.company = companyId;
  const company = companies[companyId];

  elements.companyText.textContent = `${company.name} (${company.symbol})`;
  closeCompanyDropdown();

  validateCompany();
  updateProgressIndicator();
  updateSubmitButton();
}

function validateCompany() {
  const errorElement = elements.companyError;

  if (!formData.company) {
    errorElement.textContent = "";
    return false;
  }

  errorElement.textContent = "";
  return true;
}

function handleCompanySearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const options = document.querySelectorAll(
    "#companyDropdown .dropdown-option",
  );

  options.forEach((option) => {
    const name = option.querySelector(".option-name").textContent.toLowerCase();
    const symbol = option
      .querySelector(".option-symbol")
      .textContent.toLowerCase();

    if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
      option.style.display = "flex";
    } else {
      option.style.display = "none";
    }
  });
}

// Timeframe selector handling
function toggleTimeframeDropdown() {
  const isOpen = elements.timeframeDropdown.classList.contains("open");

  closeAllDropdowns();

  if (!isOpen) {
    elements.timeframeDropdown.classList.add("open");
    elements.timeframeDropdown.classList.add("timeframe-dropdown");
    elements.timeframeSelector.classList.add("open");
    elements.dropdownOverlay.classList.add("active");
  }
}

function closeTimeframeDropdown() {
  elements.timeframeDropdown.classList.remove("open");
  elements.timeframeSelector.classList.remove("open");
  elements.dropdownOverlay.classList.remove("active");
}

function selectTimeframe(timeframeId) {
  formData.timeframe = timeframeId;
  const timeframe = timeframes[timeframeId];

  elements.timeframeText.textContent = timeframe.label;
  closeTimeframeDropdown();

  // Update quick select buttons
  document.querySelectorAll(".quick-button").forEach((button) => {
    if (button.dataset.value === timeframeId) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });

  validateTimeframe();
  updateProgressIndicator();
  updateSubmitButton();
}

function validateTimeframe() {
  const errorElement = elements.timeframeError;

  if (!formData.timeframe) {
    errorElement.textContent = "";
    return false;
  }

  errorElement.textContent = "";
  return true;
}

// Close all dropdowns
function closeAllDropdowns() {
  closeCompanyDropdown();
  closeTimeframeDropdown();
}

// Progress indicator
function updateProgressIndicator() {
  const completedFields = Object.values(formData).filter(Boolean).length;

  // Update dots
  elements.amountDot.classList.toggle("completed", !!formData.amount);
  elements.companyDot.classList.toggle("completed", !!formData.company);
  elements.timeframeDot.classList.toggle("completed", !!formData.timeframe);

  // Update text
  elements.progressText.textContent = `${completedFields}/3 fields completed`;
}

// Submit button
function updateSubmitButton() {
  const isValid =
    formData.amount &&
    formData.company &&
    formData.timeframe &&
    parseInt(formData.amount) >= 1000;

  elements.submitButton.disabled = !isValid;
  elements.submitButton.textContent = isValid
    ? "Run Simulation"
    : "Fill all fields to simulate";
}

// Form submission
function handleFormSubmit(e) {
  e.preventDefault();

  if (validateForm()) {
    runSimulation();
  }
}

function validateForm() {
  const amountValid = validateAmount();
  const companyValid = validateCompany();
  const timeframeValid = validateTimeframe();

  if (!amountValid && !formData.amount) {
    elements.amountError.textContent = "Please enter an investment amount";
  }

  if (!companyValid && !formData.company) {
    elements.companyError.textContent = "Please select a company or index";
  }

  if (!timeframeValid && !formData.timeframe) {
    elements.timeframeError.textContent = "Please select a timeframe";
  }

  return amountValid && companyValid && timeframeValid;
}

// Sample simulation
function runSampleSimulation() {
  formData = {
    amount: "10000",
    company: "tech-titans",
    timeframe: "5years",
  };

  // Update UI
  elements.investmentAmount.value = formatCurrency("10000");
  elements.companyText.textContent = "Tech Titans Inc. (TTI)";
  elements.timeframeText.textContent = "5 Years";

  updateProgressIndicator();
  updateSubmitButton();
  runSimulation();
}

// Investment calculation
function calculateInvestmentReturns(amount, companyId, timeframeId) {
  const company = companies[companyId];
  const timeframe = timeframes[timeframeId];
  const annualReturn = mockReturns[companyId] || 0.1;

  const finalValue = amount * Math.pow(1 + annualReturn, timeframe.years);
  const growth = finalValue - amount;
  const growthPercentage = (growth / amount) * 100;
  const annualReturnPercentage = annualReturn * 100;

  return {
    initialInvestment: amount,
    finalValue: Math.round(finalValue),
    growth: Math.round(growth),
    growthPercentage: Math.round(growthPercentage * 10) / 10,
    annualReturn: Math.round(annualReturnPercentage * 10) / 10,
    years: timeframe.years,
    companyName: company.name,
  };
}

// Run simulation
function runSimulation() {
  const amount = parseInt(formData.amount);
  const results = calculateInvestmentReturns(
    amount,
    formData.company,
    formData.timeframe,
  );

  displayResults(results);
  hideampleSimulation();
}

// Display results
function displayResults(results) {
  const resultsHTML = `
    <h2 class="results-header">Simulation Results</h2>
    
    <div class="results-container">
      <div class="investment-growth-card">
        <p class="growth-label">Investment Growth</p>
        <p class="growth-value">${formatCurrency(results.finalValue.toString())}</p>
        <div class="growth-details">
          <span class="growth-period">${results.years} Years</span>
          <span class="growth-percentage ${results.growthPercentage >= 0 ? "positive" : "negative"}">
            ${results.growthPercentage >= 0 ? "+" : ""}${results.growthPercentage}%
          </span>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-placeholder performance-chart">
          <div class="chart-content">
            <div class="chart-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <p class="chart-title">Performance Chart for ${results.companyName}</p>
            <p class="chart-subtitle">Interactive chart coming soon</p>
          </div>
        </div>

        <div class="chart-placeholder analysis-chart">
          <div class="chart-content">
            <div class="chart-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <p class="chart-title">Detailed Analysis</p>
          </div>
        </div>
      </div>
    </div>

    <div class="summary-stats">
      <div class="stat-item">
        <p class="stat-label">Initial Investment</p>
        <p class="stat-value neutral">${formatCurrency(results.initialInvestment.toString())}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Final Value</p>
        <p class="stat-value neutral">${formatCurrency(results.finalValue.toString())}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Total Growth</p>
        <p class="stat-value ${results.growth >= 0 ? "positive" : "negative"}">
          ${formatCurrency(Math.abs(results.growth).toString())}
        </p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Annual Return</p>
        <p class="stat-value ${results.annualReturn >= 0 ? "positive" : "negative"}">
          ${results.annualReturn >= 0 ? "+" : ""}${results.annualReturn}%
        </p>
      </div>
    </div>

    <div class="action-buttons">
      <button class="action-button primary">Save Simulation</button>
      <button class="action-button secondary">Share Results</button>
      <button class="action-button secondary">Compare with Others</button>
    </div>
  `;

  elements.simulationResults.innerHTML = resultsHTML;
  elements.simulationResults.style.display = "block";

  // Scroll to results
  elements.simulationResults.scrollIntoView({ behavior: "smooth" });
}

// Hide sample simulation
function hideampleSimulation() {
  elements.sampleSimulation.style.display = "none";
}

// Utility functions
function formatNumber(num) {
  return num.toLocaleString("en-IN");
}
