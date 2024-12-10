<template>
  <header class="header">
    <div class="buttons">
      <button
        :class="{ active: currentActiveButton === 'now' }"
        aria-pressed="currentActiveButton === 'now'"
        @click="handleNowClick"
      >
        Now
      </button>
      <button
        :class="{ active: currentActiveButton === 'today' }"
        aria-pressed="currentActiveButton === 'today'"
        @click="handleTodayClick"
      >
        Today
      </button>
      <div class="dropdown">
        <button
          class="dropbtn"
          :class="{ active: currentActiveButton === 'selectDate' }"
          aria-pressed="currentActiveButton === 'selectDate'"
          @click="toggleDropdown"
        >
          Select Date
        </button>
        <div
          v-if="showDropdown"
          ref="dropdown"
          class="dropdown-content"
        >
          <ul>
            <li
              v-for="(date, index) in availableDates"
              :key="index"
              :class="{ 'active-date': getSelectedItem.date === date }"
              @click="selectDate(date)"
            >
              {{ date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="currentActiveButton === 'selectDate'" class="selected-date">
      <p class="selected-date-label">Selected Date:</p>
      <p class="selected-date-value">
        {{ getSelectedItem?.date || "None selected" }}
      </p>
    </div>
    <div class="temperature-info">
      <div class="temperature">
        <h1>{{ getTemperature }}</h1>
        <p>{{ getSelectedItem?.conditions?.description || "Unknown" }}</p>
      </div>
      <img
        :src="getSelectedItem?.conditions?.image"
        :alt="`Weather condition: ${
          getSelectedItem?.conditions?.description || 'Unknown'
        }`"
      />
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "WeatherHeader",
  data() {
    return {
      showDropdown: false,
      availableDates: [],
      currentActiveButton: "now",
    };
  },
  computed: {
    ...mapGetters("weather", ["getSelectedItem"]),
    ...mapState("weather", ["dailyWeatherData"]),
    getTemperature() {
      return `${this.getSelectedItem?.temperature?.value ?? "--"}${
        this.getSelectedItem?.temperature?.units ?? "°C"
      }`;
    },
  },
  mounted() {
    this.populateDates();
    this.handleNowClick();
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    ...mapActions("weather", ["setSelectedItem"]),
    handleNowClick() {
      const currentHour = this.getFormattedDate("hour");
      this.setSelectedItem({ time: currentHour, type: "hour" });
      this.currentActiveButton = "now";
    },
    handleTodayClick() {
      const currentDate = this.getFormattedDate("date");
      this.setSelectedItem({ time: currentDate, type: "date" });
      this.currentActiveButton = "today";
    },
    toggleDropdown(event) {
      this.showDropdown = !this.showDropdown;
      event.stopPropagation();
    },
    selectDate(date) {
      this.setSelectedItem({ time: date, type: "date" });
      this.currentActiveButton = "selectDate";
      this.showDropdown = false;
    },
    populateDates() {
      this.availableDates = this.dailyWeatherData.map((day) => day.date);
    },
    getFormattedDate(type) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hour = String(now.getHours()).padStart(2, "0");

      return type === "hour"
        ? `${year}-${month}-${day}T${hour}:00`
        : `${year}-${month}-${day}`;
    },
    handleOutsideClick(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.showDropdown = false;
      }
    },
  },
};
</script>

<style>
.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.buttons button {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.buttons button.active {
  background: #e8f5e9;
  border: 1px solid #4caf50;
  color: #4caf50;
}

.buttons button:hover {
  background: #e0e0e0;
  color: #333;
}

.buttons button.active:hover {
  background: #d7f0d8;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.dropbtn.active {
  background-color: #3e8e41;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-content ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-content li {
  padding: 12px 16px;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-content li:hover {
  background-color: #f1f1f1;
}

.dropdown-content .active-date {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.dropdown-content[style*="block"] {
  display: block;
}

.temperature-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem;
  background: #f8f9fa;
  gap: 1rem;
}

.temperature h1 {
  font-size: 2.5rem;
  margin: 0;
  color: #333;
}

.temperature p {
  margin: 0;
  font-size: 1rem;
  color: #888;
}

img {
  width: 80px;
  height: 80px;
}

.selected-date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #f0f8ff;
  border: 1px solid #d1e7f7;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-family: 'Arial', sans-serif;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.selected-date-label {
  font-weight: bold;
  font-size: 1rem;
  color: #007acc;
  margin-right: 0.5rem;
}

.selected-date-value {
  font-size: 1rem;
  color: #333;
}

</style>
