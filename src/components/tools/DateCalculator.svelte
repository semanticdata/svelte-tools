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
    days: number
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

<div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4">
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Date Calculator</h2>

  <div class="mb-4">
    <div class="flex items-center space-x-4">
      <label class="inline-flex items-center">
        <input
          type="radio"
          bind:group={calculationMode}
          value="add"
          class="form-radio h-4 w-4 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">Add/Subtract Time</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="radio"
          bind:group={calculationMode}
          value="difference"
          class="form-radio h-4 w-4 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">Calculate Difference</span>
      </label>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div class="space-y-2">
      <label for="startDate" class="block text-sm font-medium text-gray-700">
        {calculationMode === "add" ? "Start Date" : "First Date"}
      </label>
      <input
        id="startDate"
        type="date"
        bind:value={startDate}
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    {#if calculationMode === "difference"}
      <div class="space-y-2">
        <label for="endDate" class="block text-sm font-medium text-gray-700">
          Second Date
        </label>
        <input
          id="endDate"
          type="date"
          bind:value={endDate}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    {:else}
      <div class="grid grid-cols-3 gap-2">
        <div class="space-y-2">
          <label for="years" class="block text-sm font-medium text-gray-700"
            >Years</label
          >
          <input
            id="years"
            type="number"
            bind:value={years}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="space-y-2">
          <label for="months" class="block text-sm font-medium text-gray-700"
            >Months</label
          >
          <input
            id="months"
            type="number"
            bind:value={months}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="space-y-2">
          <label for="days" class="block text-sm font-medium text-gray-700"
            >Days</label
          >
          <input
            id="days"
            type="number"
            bind:value={days}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    {/if}
  </div>

  <div class="bg-gray-50 p-4 rounded-md mb-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-3">Result</h3>
    {#if calculationMode === "add"}
      <p class="text-lg font-medium text-indigo-600">
        {formatDate(calculatedDate)}
      </p>
    {:else}
      <p class="text-lg font-medium text-indigo-600">
        {dateDifference} days difference
      </p>
    {/if}
  </div>

  <div class="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
    <h4 class="font-semibold mb-2">Instructions:</h4>
    {#if calculationMode === "add"}
      <p>Enter a start date and the amount of time to add or subtract.</p>
      <p>Use negative numbers to subtract time.</p>
    {:else}
      <p>Enter two dates to calculate the number of days between them.</p>
    {/if}
  </div>
</div>
