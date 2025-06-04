<script lang="ts">
  let calculationMode: "add" | "difference" = "add";
  let startDate = new Date().toISOString().split("T")[0];
  let endDate = new Date().toISOString().split("T")[0];
  let years = 0;
  let months = 0;
  let days = 0;
  $: calculatedDate = calculateNewDate(startDate, years, months, days);
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

<div class="max-w-4xl mx-auto p-4">
  <!-- Header Section -->
  <div class="mb-8 text-center">
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Date Calculator</h1>
    <p class="text-gray-600">Add, subtract, or compare dates easily.</p>
  </div>

  <!-- Main Content -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <!-- Input Section -->
    <div class="space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        Input Parameters
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Calculation Mode Selector -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Calculation Mode</label
          >
          <select
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            bind:value={calculationMode}
          >
            <option value="add">Add/Subtract Time</option>
            <option value="difference">Calculate Difference</option>
          </select>
        </div>
        <!-- Start/First Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >{calculationMode === "add" ? "Start Date" : "First Date"}</label
          >
          <input
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            bind:value={startDate}
          />
        </div>
        <!-- Second Date or Years/Months/Days -->
        {#if calculationMode === "difference"}
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Second Date</label
            >
            <input
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              bind:value={endDate}
            />
          </div>
        {:else}
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Years</label
              >
              <input
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                bind:value={years}
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Months</label
              >
              <input
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                bind:value={months}
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Days</label
              >
              <input
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                bind:value={days}
              />
            </div>
          </div>
        {/if}
      </div>
      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3 pt-2">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={calculationMode === "add" ? false : false}
        >
          Calculate
        </button>
        <button
          class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
          on:click={() => {
            startDate = new Date().toISOString().split("T")[0];
            endDate = new Date().toISOString().split("T")[0];
            years = 0;
            months = 0;
            days = 0;
          }}
        >
          Reset
        </button>
      </div>
    </div>
    <!-- Results Section -->
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Results</h2>
      {#if calculationMode === "add"}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-md border border-gray-200">
            <div class="text-sm font-medium text-gray-500">Calculated Date</div>
            <div class="text-2xl font-bold text-gray-800">
              {formatDate(calculatedDate)}
            </div>
            <div class="text-xs text-gray-500 mt-1">Result</div>
          </div>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-md border border-gray-200">
            <div class="text-sm font-medium text-gray-500">Date Difference</div>
            <div class="text-2xl font-bold text-gray-800">{dateDifference}</div>
            <div class="text-xs text-gray-500 mt-1">days</div>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <!-- Additional Information Section -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-3">Instructions</h2>
    <div class="prose max-w-none text-gray-600">
      <p class="mb-4">
        Use the calculator to add/subtract time from a date or calculate the
        difference between two dates.
      </p>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li>
          Add/Subtract: Enter a start date and the amount of time to add or
          subtract. Use negative numbers to subtract.
        </li>
        <li>
          Difference: Enter two dates to calculate the number of days between
          them.
        </li>
      </ul>
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              The calculator updates automatically as you change values. Reset
              to clear all fields.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
