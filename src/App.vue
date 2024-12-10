<template>
  <div class="app">
    <p v-if="loading">Loading...</p>
    <template v-else>
      <WeatherHeader :info="getHourlyWeatherData(getCurrentHour)" />
      <div class="weather-info">
        <InfoCard
          v-for="(item, key) in filteredWeatherData"
          :key="key"
          :label="item.label"
          :value="item.value"
        />
      </div>
      <WeatherGraph />
    </template>
  </div>
</template>

<script>
import WeatherHeader from "./components/WeatherHeader.vue";
import InfoCard from "./components/InfoCard.vue";
import WeatherGraph from "./components/WeatherGraph.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    WeatherHeader,
    InfoCard,
    WeatherGraph,
  },

  data() {
    return {
      loading: true,
      error: false,
    };
  },

  created() {
    this.fetchWeatherData()
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        this.error = true;
      });
  },

  computed: {
    ...mapGetters("weather", ["getHourlyWeatherData", "getValuesToKeep", "getSelectedItem"]),

    filteredWeatherData() {
      const result = Object.entries(this.getSelectedItem)
      .filter(([key]) => this.getValuesToKeep.includes(key))
      .reduce((obj, [key, value]) => {
        if (typeof value === 'object' && value.value !== undefined && value.units !== undefined) {
          // Combine the label and value + units
          const itemValue = value.label !=='Feels Like' && value.label !=='Wind Deg'? `${value.value} <span class='subscript'">${value.units}</span>` : `${value.value} ${value.units}`
          obj[key] = {
            label: value.label,
            value: itemValue,
          };
        } else {
          // Fallback if value doesn't have the expected structure
          obj[key] = value;
        }
        return obj;
      }, {});
      return result
    },

    getCurrentHour() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hour = String(now.getHours()).padStart(2, "0");
      return `${year}-${month}-${day}T${hour}:00`;
    },
  },

  methods: {
    ...mapActions("weather", ["fetchWeatherData"]),
  },
};
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  background-color: #f3f3f3;
  max-width: 900px;
  margin: auto;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}
.header {
  background-color:#f8f9fa;;
}

.weather-info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 10px;
  padding:30px;
  background-color: #f8f9fa;
}

.weather-info > * {
  flex: 1 1 calc(33.333% - 2rem);
  max-width: calc(33.333% - 2rem);
  box-sizing: border-box;
  aspect-ratio: 2;
}

.subscript {
  font-size: 0.7em;
  vertical-align: baseline;
}

@media (max-width: 768px) {
  .weather-info > * {
    flex: 1 1 calc(50% - 2rem);
    max-width: calc(50% - 2rem);
    aspect-ratio: 1;
  }
}

@media (max-width: 480px) {
  .weather-info > * {
    flex: 1 1 100%;
    max-width: 100%;
    aspect-ratio: 1;
  }
}
</style>