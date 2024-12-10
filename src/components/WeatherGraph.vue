<template>
  <div class="weather-graph">
    <canvas id="temperatureChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { mapState } from "vuex";

export default {
  name: "WeatherGraph",
  computed: {
    ...mapState("weather", ["dailyWeatherData"]),
    currentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    if (this.dailyWeatherData?.length) {
      this.renderChart();
    } else {
      console.warn("No daily weather data available.");
    }
  },
  methods: {
    renderChart() {
      const labels = this.dailyWeatherData.map((item) => {
        const date = new Date(item.date);
        const day = String(date.getDate()).padStart(2, "0"); // Two-digit day
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Two-digit month
        return `${day}/${month}`;
      });

      const data = this.dailyWeatherData.map((item) => item.temperature.value);
      const units = this.dailyWeatherData[0]?.temperature?.units || "°C"; // Default units if undefined

      const ctx = document
        .getElementById("temperatureChart")
        .getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Temperature",
              data,
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 12,
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
                font: {
                  size: 14,
                },
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7, // Limit x-axis labels to improve readability
              },
            },
            y: {
              title: {
                display: true,
                text: `Temperature (${units})`,
                font: {
                  size: 14,
                },
              },
              beginAtZero: true, // Ensure the y-axis starts at zero
            },
          },
          animation: false, // Disable animation for faster rendering
        },
        plugins: [
          {
            id: "valueLabels",
            afterDatasetsDraw(chart) {
              const { ctx, data } = chart;
              data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((point, index) => {
                  const value = `${dataset.data[index]}${units}`;
                  const { x, y } = point.tooltipPosition();
                  ctx.fillStyle = "#000"; // Ensure text is visible
                  ctx.font = "12px Arial";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillText(value, x, y - 10); // Position text above points
                });
              });
            },
          },
        ],
      });
    },
  },
};
</script>

<style>
.weather-graph {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
}

#temperatureChart {
  width: 100%;
  max-width: 100%;
}
</style>
