function toggleModal() {
  const modal = document.getElementById("profileModal");
  modal.classList.toggle("active");
}

let barChart;
let currentView = 'main';
let currentCategory = 'all';

const fullData = {
  all: {
    labels: ['🍽️ Food', '🛍️ Shopping', '🧺 Grocery', '✈️ Travel', '🎮 Entertainment', '💡 Utilities'],
    actual: [40, 90, 55, 80, 70, 20],
    budget: [35, 70, 60, 60, 50, 30],
    lastMonth: [45, 100, 50, 75, 60, 25]
  },
  essential: {
    labels: ['🍽️ Food', '🧺 Grocery', '💡 Utilities'],
    actual: [40, 55, 20],
    budget: [35, 60, 30],
    lastMonth: [45, 50, 25]
  },
  lifestyle: {
    labels: ['🛍️ Shopping', '✈️ Travel', '🎮 Entertainment'],
    actual: [90, 80, 70],
    budget: [70, 60, 50],
    lastMonth: [100, 75, 60]
  }
};

const drillDownData = {
  '🛍️ Shopping': {
    labels: ['👗 Clothes', '📱 Electronics', '🎁 Gifts'],
    actual: [40, 30, 20],
    budget: [30, 25, 15],
    lastMonth: [50, 35, 15]
  },
  '🍽️ Food': {
    labels: ['🍕 Dining Out', '🍎 Groceries', '🍫 Snacks'],
    actual: [20, 15, 5],
    budget: [15, 20, 5],
    lastMonth: [25, 10, 5]
  }
};

function updateChart() {
  const category = document.getElementById("categorySelect").value;
  const compare = document.getElementById("compareSelect").value;

  currentCategory = category;
  currentView = 'main';
  document.getElementById("backButton").style.display = "none";

  const compareList = compare === 'none' ? [] : [compare];
  renderChart(fullData[category], compareList);
}

function goBack() {
  updateChart();
}

function renderChart(dataSet, compareList = []) {
  const ctx = document.getElementById('donutChart').getContext('2d');
  if (barChart) barChart.destroy();

  const datasets = [
    {
      label: 'Actual Spending (₹)',
      data: dataSet.actual,
      backgroundColor: '#a259ff',
      borderRadius: 6,
      barThickness: 40
    }
  ];

  if (compareList.includes('budget')) {
    datasets.push({
      label: 'Budget (₹)',
      data: dataSet.budget,
      backgroundColor: '#00d4ff',
      borderRadius: 6,
      barThickness: 30
    });
  }

  if (compareList.includes('lastMonth')) {
    datasets.push({
      label: 'Last Month (₹)',
      data: dataSet.lastMonth,
      backgroundColor: '#ffc107',
      borderRadius: 6,
      barThickness: 30
    });
  }

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataSet.labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: 'easeOutCubic'
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#ccc',
            padding: 10
          }
        },
        tooltip: {
          backgroundColor: '#1f1c2d',
          titleColor: '#a259ff',
          bodyColor: '#fff',
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ₹${ctx.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#ccc' },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#ccc' },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        }
      },
      onClick: (e, elements) => {
        if (elements.length > 0 && currentView === 'main') {
          const clickedLabel = barChart.data.labels[elements[0].index];
          if (drillDownData[clickedLabel]) {
            renderChart(drillDownData[clickedLabel], compareList);
            document.getElementById("backButton").style.display = "inline-block";
            currentView = 'drill';
          }
        }
      }
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("categorySelect").value = "all";
  document.getElementById("compareSelect").value = "budget"; // default compare
  updateChart();
});
