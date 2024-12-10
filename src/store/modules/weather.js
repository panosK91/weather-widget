import axios from "axios";
import {
  getDailyWeatherResults,
  getHourlyWeatherResults,
} from "../utils/weatherUtils";

const BASE_URL = "https://api.open-meteo.com/v1/";


const conditions = {
	"0":{
		"day":{
			"description":"Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"1":{
		"day":{
			"description":"Mainly Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Mainly Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"2":{
		"day":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02d@2x.png"
		},
		"night":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02n@2x.png"
		}
	},
	"3":{
		"day":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03d@2x.png"
		},
		"night":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03n@2x.png"
		}
	},
	"45":{
		"day":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"48":{
		"day":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"51":{
		"day":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"53":{
		"day":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"55":{
		"day":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"56":{
		"day":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"57":{
		"day":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"61":{
		"day":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"63":{
		"day":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"65":{
		"day":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"66":{
		"day":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"67":{
		"day":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"71":{
		"day":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"73":{
		"day":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"75":{
		"day":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"77":{
		"day":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"80":{
		"day":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"81":{
		"day":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"82":{
		"day":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"85":{
		"day":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"86":{
		"day":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"95":{
		"day":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"96":{
		"day":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"99":{
		"day":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	}
}

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
