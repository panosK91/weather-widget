<template>
  <div class="info-card">
    <!-- <span class="value">{{ value }}</span> -->
    <span class="value"  v-html="value"></span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    label: {
      type: String,
      required: true, // Ensure the label is always provided
    },
    value: {
      type: [String, Number], // Allow flexibility for numeric or string values
      required: true, // Ensure the value is always provided
    },
  },
};
</script>

<style>
.info-card {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
  width: 100%;
  max-width: 100px;
  height: 100%;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

}

.info-card .value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.info-card .label {
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.25rem;
}
</style>
