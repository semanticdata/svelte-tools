<script lang="ts">
  // Reactive variables for input values
  let width = "";
  let height = "";
  let thickness = "";
  let unitWeight = "113"; // Default value as specified

  // Parsed numeric values
  $: numWidth = parseFloat(width) || 0;
  $: numHeight = parseFloat(height) || 0;
  $: numThickness = parseFloat(thickness) || 0;
  $: numUnitWeight = parseFloat(unitWeight) || 113;

  // Check if all required values are provided
  $: hasAllRequiredValues = numWidth > 0 && numHeight > 0 && numThickness > 0;

  // Calculated values - following the exact formula provided
  $: areaInSquareFeet = numWidth * numHeight;
  $: areaInSquareYards = areaInSquareFeet / 9;
  $: weightInPounds = numThickness * areaInSquareYards * numUnitWeight;
  $: weightInTons = weightInPounds * 0.0005;

  // Format number to 2 decimal places
  const formatNumber = (num: number): string => {
    return isNaN(num) || !isFinite(num) ? "0.00" : num.toFixed(2);
  };
</script>

<div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-8">
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Asphalt Calculator</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div class="space-y-2">
      <label for="width" class="block text-sm font-medium text-gray-700"
        >Width (feet)</label
      >
      <input
        id="width"
        type="number"
        bind:value={width}
        min="0"
        step="0.1"
        placeholder="Enter width"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div class="space-y-2">
      <label for="height" class="block text-sm font-medium text-gray-700"
        >Length (feet)</label
      >
      <input
        id="height"
        type="number"
        bind:value={height}
        min="0"
        step="0.1"
        placeholder="Enter length"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div class="space-y-2">
      <label for="thickness" class="block text-sm font-medium text-gray-700"
        >Thickness (inches)</label
      >
      <input
        id="thickness"
        type="number"
        bind:value={thickness}
        min="0"
        step="0.1"
        placeholder="Enter thickness"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div class="space-y-2">
      <label for="unitWeight" class="block text-sm font-medium text-gray-700"
        >Unit Weight (lbs/yd²/in)</label
      >
      <input
        id="unitWeight"
        type="number"
        bind:value={unitWeight}
        min="0"
        step="0.1"
        placeholder="Default: 113"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  </div>

  <div class="bg-gray-50 p-4 rounded-md mb-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-3">
      Calculation Results
    </h3>

    {#if hasAllRequiredValues}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-600">Area in Square Feet:</p>
          <p class="text-lg font-medium">
            {formatNumber(areaInSquareFeet)} ft²
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-600">Area in Square Yards:</p>
          <p class="text-lg font-medium">
            {formatNumber(areaInSquareYards)} yd²
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-600">Weight in Pounds:</p>
          <p class="text-lg font-medium">{formatNumber(weightInPounds)} lbs</p>
        </div>

        <div>
          <p class="text-sm text-gray-600 font-medium">Asphalt Required:</p>
          <p class="text-xl font-bold text-indigo-600">
            {formatNumber(weightInTons)} tons
          </p>
        </div>
      </div>
    {:else}
      <div
        class="p-3 bg-yellow-50 text-yellow-700 rounded border border-yellow-200"
      >
        <p>
          Please enter valid width, length, and thickness values to see
          calculation results.
        </p>
      </div>
    {/if}
  </div>

  <div class="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
    <h4 class="font-semibold mb-2">Formula Used:</h4>
    <p>Area (ft²) = Width (ft) × Length (ft)</p>
    <p>Area (yd²) = Area (ft²) ÷ 9</p>
    <p>Weight (lbs) = Thickness (in) × Area (yd²) × Unit Weight (lbs/yd²/in)</p>
    <p>Weight (tons) = Weight (lbs) × 0.0005</p>
  </div>
</div>
