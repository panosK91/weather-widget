import axios from "axios";
import {
  getDailyWeatherResults,
  getHourlyWeatherResults,
} from "../utils/weatherUtils";

import conditions from "../../assets/conditions.json"

const BASE_URL = "https://api.open-meteo.com/v1/";


// Default parameters
const defaultParams = {
  latitude: 40.5872,
  longitude: 22.9482,
  wind_speed_unit: "ms",
  timezone: "auto",
  forecast_days: 7,
  hourly: [
    "temperature_2m",
    "apparent_temperature",
    "windspeed_10m",
    "windgusts_10m",
    "winddirection_10m",
    "relative_humidity_2m",
    "surface_pressure",
    "weather_code",
  ],
  daily: [
    "wind_direction_10m_dominant",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
    "weather_code",
    "sunset"
  ],
};

function isAfterSunset(sunsetTimes) {
  const now = new Date(); // Get the current date and time
  const today = now.toISOString().split("T")[0]; // Extract today's date in YYYY-MM-DD format

  // Find today's sunset time
  const todaySunset = sunsetTimes.find((sunset) => sunset.startsWith(today));

  if (!todaySunset) {
    console.error("No sunset time found for today.");
    return false;
  }

  const sunsetTime = new Date(todaySunset); // Convert today's sunset time to a Date object

  // Check if the current time is after today's sunset
  return now > sunsetTime;
}

export default {
  namespaced: true,
  state: {
    dailyWeatherData: [],
    hourlyWeatherData: [],
    loading: true,
    selectedItem: {},
    keysToKeep: [
      "apparentTemperature",
      "wind",
      "windGust",
      "windDirection",
      "humidity",
      "surfacePressure",
    ],
  },
  getters: {
    getHourlyWeatherData: (state) => (dateHour) =>
      state.hourlyWeatherData.find((item) => item.time === dateHour) || null,

    getDailyWeatherData(state) {
      return state.dailyWeatherData;
    },

    getSelectedItem(state) {
      const sunset  = state.selectedItem?.daily?.sunset
      let afterSunset = false

      if (sunset)
        afterSunset = isAfterSunset(state.selectedItem?.daily?.sunset);

      const weatherCondition = conditions[state.selectedItem?.weatherCode?.value]

      if (weatherCondition) {
        if (afterSunset) {
          state.selectedItem.conditions = weatherCondition.night
        } else {
          state.selectedItem.conditions = weatherCondition.day
        }
      }
      return state.selectedItem;
    },

    getValuesToKeep(state) {
      return state.keysToKeep;
    },
  },
  mutations: {
    SET_DAILY_WEATHER_DATA(state, data) {
      state.dailyWeatherData = data;
    },

    SET_HOURLY_WEATHER_DATA(state, data) {
      state.hourlyWeatherData = data;
    },

    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },

    SET_SELECTED_ITEM(state, selectedItem) {
      state.selectedItem = selectedItem;
    },
  },
  actions: {
    setSelectedItem({ commit, state }, obj) {
      let selectedItem = null;

      if (obj.type === "hour") {
        selectedItem = state.hourlyWeatherData.find(
          (item) => item.time === obj.time
        );
      } else {
        selectedItem = state.dailyWeatherData.find(
          (item) => item.date === obj.time
        );
      }

      if (selectedItem) {
        commit("SET_SELECTED_ITEM", selectedItem);
      }
    },

    async fetchWeatherData({ commit }, params = {}) {
      commit("SET_LOADING", true);

      // Merge default parameters with the ones passed to the action
      const mergedParams = {
        ...defaultParams,
        ...params,
        hourly: params.hourly || defaultParams.hourly,
        daily: params.daily || defaultParams.daily,
      };

      // Construct the query string manually
      const queryString = `
        latitude=${mergedParams.latitude}
        &longitude=${mergedParams.longitude}
        &wind_speed_unit=${mergedParams.wind_speed_unit}
        &timezone=${mergedParams.timezone}
        &forecast_days=${mergedParams.forecast_days}
        &hourly=${mergedParams.hourly.join(",")}
        &daily=${mergedParams.daily.join(",")}
      `.replace(/\s+/g, ""); // Remove any unnecessary whitespace

      const WEATHER_URL = `${BASE_URL}forecast?${queryString}`;

      try {
        const response = await axios.get(WEATHER_URL);
        const { data } = response;
        try {
          const dailyResults = await getDailyWeatherResults(data);
          commit("SET_DAILY_WEATHER_DATA", dailyResults);

          const hourlyResults = await getHourlyWeatherResults(data);
          commit("SET_HOURLY_WEATHER_DATA", hourlyResults);

          console.log("All weather data processed successfully");
        } catch (processingError) {
          console.error("Error processing weather data:", processingError);
          throw processingError;
        }
      } catch (networkError) {
        console.error("Error fetching weather data:", networkError);
        throw networkError;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};
