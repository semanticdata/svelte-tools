<script lang="ts">
  // Input mode toggle
  let useDirectArea = false;

  // Area unit selection (for direct area input)
  let areaUnit = "ft²"; // Default to square feet

  // Reactive variables for input values
  let width = "";
  let height = "";
  let directArea = "";
  let thickness = "";
  let unitWeight = "113"; // Default value as specified

  // Parsed numeric values
  $: numWidth = parseFloat(width) || 0;
  $: numHeight = parseFloat(height) || 0;
  $: numDirectArea = parseFloat(directArea) || 0;
  $: numThickness = parseFloat(thickness) || 0;
  $: numUnitWeight = parseFloat(unitWeight) || 113;

  // Check if all required values are provided
  $: hasAllRequiredValues = useDirectArea
    ? numDirectArea > 0 && numThickness > 0
    : numWidth > 0 && numHeight > 0 && numThickness > 0;

  // Calculated values - following the exact formula provided
  $: areaInSquareFeet = useDirectArea
    ? areaUnit === "ft²"
      ? numDirectArea
      : numDirectArea * 9
    : numWidth * numHeight;
  $: areaInSquareYards = areaInSquareFeet / 9;
  $: weightInPounds = numThickness * areaInSquareYards * numUnitWeight;
  $: weightInTons = weightInPounds * 0.0005;

  // Format number to 2 decimal places
  const formatNumber = (num: number): string => {
    return isNaN(num) || !isFinite(num) ? "0.00" : num.toFixed(2);
  };
</script>

<div class="tool-container">
  <!-- Header Section -->
  <header class="tool-header">
    <h1 class="text-3xl font-bold text-gray-900">Asphalt Calculator</h1>
    <p class="mt-2 text-gray-600">
      Calculate the amount of asphalt needed for a given area.
    </p>
  </header>

  <!-- Tool Content -->
  <div class="tool-content">
    <fieldset class="form-group">
      <legend class="form-label">Input Mode</legend>
      <div class="flex gap-4 flex-wrap mt-1">
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            bind:group={useDirectArea}
            value={false}
            class="form-radio"
          />
          <span class="ml-2 text-gray-700">Use Width & Length</span>
        </label>
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            bind:group={useDirectArea}
            value={true}
            class="form-radio"
          />
          <span class="ml-2 text-gray-700">Use Area</span>
        </label>
      </div>
    </fieldset>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#if !useDirectArea}
        <div class="form-group">
          <label for="width" class="form-label">Width (feet)</label>
          <input
            id="width"
            type="number"
            bind:value={width}
            min="0"
            step="0.1"
            placeholder="Enter width"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="height" class="form-label">Length (feet)</label>
          <input
            id="height"
            type="number"
            bind:value={height}
            min="0"
            step="0.1"
            placeholder="Enter length"
            class="form-input"
          />
        </div>
      {:else}
        <div class="form-group md:col-span-2">
          <label for="directArea" class="form-label">Area</label>
          <div class="flex space-x-2">
            <input
              id="directArea"
              type="number"
              bind:value={directArea}
              min="0"
              step="0.1"
              placeholder="Enter area"
              class="form-input flex-1"
            />
            <select bind:value={areaUnit} class="form-input">
              <option value="ft²">Square Feet (ft²)</option>
              <option value="yd²">Square Yards (yd²)</option>
            </select>
          </div>
        </div>
      {/if}

      <div class="form-group">
        <label for="thickness" class="form-label">Thickness (inches)</label>
        <input
          id="thickness"
          type="number"
          bind:value={thickness}
          min="0"
          step="0.1"
          placeholder="Enter thickness"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="unitWeight" class="form-label"
          >Unit Weight (lbs/yd²/in)</label
        >
        <input
          id="unitWeight"
          type="number"
          bind:value={unitWeight}
          min="0"
          step="0.1"
          placeholder="Default: 113"
          class="form-input"
        />
      </div>
    </div>

    <!-- Results Section -->
    <div class="results-section">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Results</h2>
      <div class="results-content">
        {#if hasAllRequiredValues}
          <div class="feedback success">
            <p>
              Area in Square Feet: <span class="font-bold"
                >{formatNumber(areaInSquareFeet)} ft²</span
              >
            </p>
            <p>
              Area in Square Yards: <span class="font-bold"
                >{formatNumber(areaInSquareYards)} yd²</span
              >
            </p>
            <p>
              Weight in Pounds: <span class="font-bold"
                >{formatNumber(weightInPounds)} lbs</span
              >
            </p>
            <p>
              Asphalt Required: <span class="font-bold text-lg text-indigo-600"
                >{formatNumber(weightInTons)} tons</span
              >
            </p>
          </div>
        {:else}
          <div class="feedback error">
            <p>
              {#if useDirectArea}
                Please enter valid area and thickness values to see calculation
                results.
              {:else}
                Please enter valid width, length, and thickness values to see
                calculation results.
              {/if}
            </p>
          </div>
        {/if}
      </div>
    </div>

    <div class="bg-blue-50 p-4 rounded-md text-sm text-blue-800 mt-6">
      <h4 class="font-semibold mb-2">Formula Used:</h4>
      {#if !useDirectArea}
        <p>Area (ft²) = Width (ft) × Length (ft)</p>
      {/if}
      <p>Area (yd²) = Area (ft²) ÷ 9</p>
      <p>
        Weight (lbs) = Thickness (in) × Area (yd²) × Unit Weight (lbs/yd²/in)
      </p>
      <p>Weight (tons) = Weight (lbs) × 0.0005</p>
    </div>
  </div>
</div>

<style>
  .tool-container {
    @apply bg-white h-full;
  }

  .tool-header {
    @apply mb-8 pb-6 border-b border-gray-200;
  }

  .tool-content {
    @apply space-y-6;
  }

  /* Form Elements */
  .form-group {
    @apply mb-6;
  }

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }

  .form-input {
    @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
               disabled:bg-gray-50 disabled:text-gray-500;
  }

  .form-radio {
    @apply h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500;
  }

  /* Feedback Messages */
  .feedback {
    @apply p-4 rounded-md text-sm;
  }

  .error {
    @apply bg-red-50 text-red-700 border-l-4 border-red-500;
  }

  .success {
    @apply bg-green-50 text-green-700 border-l-4 border-green-500;
  }

  /* Results Section */
  .results-section {
    @apply mt-8 pt-6 border-t border-gray-200;
  }

  .results-content {
    /* Add any specific styling for the results content area if needed */
  }
</style>
