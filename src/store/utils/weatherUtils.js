export function getDailyWeatherResults(data) {
  return new Promise((resolve) => {
    const {
      daily: {
        time,
        wind_direction_10m_dominant,
        wind_gusts_10m_max,
        weather_code,
        wind_speed_10m_max,
      },
      hourly: {
        temperature_2m,
        apparent_temperature,
        relative_humidity_2m,
        surface_pressure,
      },
      daily_units: {
        wind_direction_10m_dominant: windDirectionUnits,
        wind_gusts_10m_max: windGustsUnits,
        wind_speed_10m_max: windSpeedUnits,
        weather_code: weatherCodeUnits,
      },
      hourly_units: {
        temperature_2m: temperatureUnits,
        apparent_temperature: apparentTemperatureUnits,
        relative_humidity_2m: humidityUnits,
        surface_pressure: pressureUnits,
      },
    } = data;

    const groupSize = temperature_2m.length / time.length;
    const dailyInfo = time.map((date, i) => {
      // Helper to calculate averages
      const calculateAverage = (values) =>
        values.reduce((sum, value) => sum + value, 0) / values.length;

      // Calculate daily temperature and apparent temperature
      const temperatureGroup = temperature_2m.slice(i * groupSize, (i + 1) * groupSize);
      const apparentTemperatureGroup = apparent_temperature.slice(i * groupSize, (i + 1) * groupSize);
      const meanTemperature = calculateAverage(temperatureGroup).toFixed(0);
      const meanApparentTemperature = calculateAverage(apparentTemperatureGroup).toFixed(0);

      // Calculate max values for humidity and pressure
      const humidityGroup = relative_humidity_2m.slice(i * groupSize, (i + 1) * groupSize);
      const surfacePressureGroup = surface_pressure.slice(i * groupSize, (i + 1) * groupSize);

      return {
        date,
        temperature: {
          value: `${meanTemperature}`,
          units: temperatureUnits,
        },
        apparentTemperature: {
          value: `${meanApparentTemperature}`,
          units: apparentTemperatureUnits,
          label: "Feels Like",
        },
        wind: {
          value: `${wind_speed_10m_max[i].toFixed(0)}`,
          units: windSpeedUnits,
          label: "Wind",
        },
        windGust: {
          value: `${wind_gusts_10m_max[i].toFixed(0)}`,
          units: windGustsUnits,
          label: "Wind Gust",
        },
        windDirection: {
          value: `${wind_direction_10m_dominant[i]}`,
          units: windDirectionUnits,
          label: "Wind Deg",
        },
        humidity: {
          value: `${Math.max(...humidityGroup)}`,
          units: humidityUnits,
          label: "Humidity",
        },
        surfacePressure: {
          value: `${Math.max(...surfacePressureGroup).toFixed(0)}`,
          units: pressureUnits,
          label: "Pressure",
        },
        weatherCode: {
          value: weather_code[i],
          units: weatherCodeUnits,
        },
      };
    });

    resolve(dailyInfo); // Resolve the processed data
  });
}

export function getHourlyWeatherResults(data) {
  return new Promise((resolve) => {
    const {
      hourly: {
        time,
        temperature_2m,
        apparent_temperature,
        windspeed_10m,
        windgusts_10m,
        winddirection_10m,
        relative_humidity_2m,
        surface_pressure,
        weather_code,
      },
      hourly_units: {
        temperature_2m: temperatureUnits,
        apparent_temperature: apparentTemperatureUnits,
        windspeed_10m: windSpeedUnits,
        windgusts_10m: windGustsUnits,
        winddirection_10m: windDirectionUnits,
        relative_humidity_2m: humidityUnits,
        surface_pressure: pressureUnits,
        weather_code: weatherCodeUnits,
      },
    } = data;

    const hourlyInfo = time.map((timestamp, i) => ({
      time: timestamp,
      temperature: {
        value: temperature_2m[i],
        units: temperatureUnits,
      },
      apparentTemperature: {
        value: apparent_temperature[i],
        units: apparentTemperatureUnits,
        label: "Feels Like",
      },
      wind: {
        value: windspeed_10m[i],
        units: windSpeedUnits,
        label: "Wind",
      },
      windGust: {
        value: windgusts_10m[i],
        units: windGustsUnits,
        label: "Wind Gust",
      },
      windDirection: {
        value: winddirection_10m[i],
        units: windDirectionUnits,
        label: "Wind Deg",
      },
      humidity: {
        value: relative_humidity_2m[i],
        units: humidityUnits,
        label: "Humidity",
      },
      surfacePressure: {
        value: surface_pressure[i],
        units: pressureUnits,
        label: "Pressure",
      },
      weatherCode: {
        value: weather_code[i],
        units: weatherCodeUnits,
      },
    }));

    resolve(hourlyInfo);
  });
}
