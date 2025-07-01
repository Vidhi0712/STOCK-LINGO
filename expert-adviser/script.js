function toggleModal() {
  const modal = document.getElementById("profileModal");
  modal.classList.toggle("active");
}

window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("lineChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Monthly Expenses (₹)",
        data: [10000, 10500, 10700, 11100, 11600, 12000], // ✅ Smooth data
        borderColor: "#a259ff",
        backgroundColor: "rgba(162, 89, 255, 0.15)",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#a259ff",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3, // ✅ Smooth but not floppy
        fill: true,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          labels: {
            color: "#ccc",
            font: {
              weight: "bold"
            }
          }
        },
        tooltip: {
          backgroundColor: "#1f1c2d",
          titleColor: "#a259ff",
          bodyColor: "#fff"
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#ccc"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)"
          }
        },
        y: {
          min: 9500,   // ✅ fixed bottom
          max: 12500,  // ✅ fixed top
          ticks: {
            color: "#ccc"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)"
          }
        }
      }
    }
  });
});
