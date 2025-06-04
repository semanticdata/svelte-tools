<script lang="ts">
  // Input mode toggle
  let calculationMode: "add" | "difference" = "add";

  // Input values
  let startDate = new Date().toISOString().split("T")[0];
  let endDate = new Date().toISOString().split("T")[0];
  let years = 0;
  let months = 0;
  let days = 0;

  // Calculate result for add/subtract mode
  $: calculatedDate = calculateNewDate(startDate, years, months, days);

  // Calculate difference for difference mode
  $: dateDifference = calculateDateDifference(startDate, endDate);

  function calculateNewDate(
    baseDate: string,
    years: number,
    months: number,
    days: number,
  ): Date {
    const date = new Date(baseDate);
    date.setFullYear(date.getFullYear() + years);
    date.setMonth(date.getMonth() + months);
    date.setDate(date.getDate() + days);
    return date;
  }

  function calculateDateDifference(start: string, end: string) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<div class="tool-container">
  <!-- Header Section -->
  <header class="tool-header">
    <h1 class="text-3xl font-bold text-gray-900">Date Calculator</h1>
    <p class="mt-2 text-gray-600">Add, subtract, or compare dates easily.</p>
  </header>
  <!-- Tool Content -->
  <div class="tool-content">
    <div class="mb-4">
      <fieldset class="flex flex-wrap gap-4 mb-4">
        <legend class="sr-only">Calculation Mode</legend>
        <label class="form-radio">
          <input type="radio" bind:group={calculationMode} value="add" />
          <span>Add/Subtract Time</span>
        </label>
        <label class="form-radio">
          <input type="radio" bind:group={calculationMode} value="difference" />
          <span>Calculate Difference</span>
        </label>
      </fieldset>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label for="startDate" class="form-label">
          {calculationMode === "add" ? "Start Date" : "First Date"}
        </label>
        <input
          id="startDate"
          type="date"
          bind:value={startDate}
          class="form-input"
        />
      </div>

      {#if calculationMode === "difference"}
        <div>
          <label for="endDate" class="form-label"> Second Date </label>
          <input
            id="endDate"
            type="date"
            bind:value={endDate}
            class="form-input"
          />
        </div>
      {:else}
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="years" class="form-label">Years</label>
            <input
              id="years"
              type="number"
              bind:value={years}
              class="form-input"
            />
          </div>
          <div>
            <label for="months" class="form-label">Months</label>
            <input
              id="months"
              type="number"
              bind:value={months}
              class="form-input"
            />
          </div>
          <div>
            <label for="days" class="form-label">Days</label>
            <input
              id="days"
              type="number"
              bind:value={days}
              class="form-input"
            />
          </div>
        </div>
      {/if}
    </div>

    <div class="results-section">
      <h3 class="text-lg font-semibold text-gray-700 mb-3">Result</h3>
      {#if calculationMode === "add"}
        <p class="feedback feedback-success">
          {formatDate(calculatedDate)}
        </p>
      {:else}
        <p class="feedback feedback-success">
          {dateDifference} days difference
        </p>
      {/if}
    </div>

    <div class="feedback feedback-info">
      <h4 class="font-semibold mb-2">Instructions:</h4>
      {#if calculationMode === "add"}
        <p>Enter a start date and the amount of time to add or subtract.</p>
        <p>Use negative numbers to subtract time.</p>
      {:else}
        <p>Enter two dates to calculate the number of days between them.</p>
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  :global(html) {
    scroll-behavior: smooth;
  }

  .tool-container {
    @apply bg-white h-full;
  }

  .tool-header {
    @apply mb-8 pb-6 border-b border-gray-200;
  }

  .tool-content {
    @apply space-y-6;
  }

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }

  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }

  .form-radio {
    @apply flex items-center cursor-pointer;
  }

  .form-radio input[type="radio"] {
    @apply h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300;
  }

  .form-radio span {
    @apply ml-2 text-gray-700;
  }

  .results-section {
    @apply bg-gray-50 p-4 rounded-md mb-6;
  }

  .feedback {
    @apply p-3 rounded-md text-sm mb-4;
  }

  .feedback-info {
    @apply bg-blue-50 text-blue-800;
  }

  .feedback-success {
    @apply bg-green-50 text-green-800;
  }
</style>
