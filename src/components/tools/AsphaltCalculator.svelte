<script lang="ts">
  import ComponentContainer from "../utils/ComponentContainer.svelte";
  let useDirectArea = false;
  let areaUnit = "ft²";
  let width = "";
  let height = "";
  let directArea = "";
  let thickness = "";
  let unitWeight = "113";
  $: numWidth = parseFloat(width) || 0;
  $: numHeight = parseFloat(height) || 0;
  $: numDirectArea = parseFloat(directArea) || 0;
  $: numThickness = parseFloat(thickness) || 0;
  $: numUnitWeight = parseFloat(unitWeight) || 113;
  $: hasAllRequiredValues = useDirectArea
    ? numDirectArea > 0 && numThickness > 0
    : numWidth > 0 && numHeight > 0 && numThickness > 0;
  $: areaInSquareFeet = useDirectArea
    ? areaUnit === "ft²"
      ? numDirectArea
      : numDirectArea * 9
    : numWidth * numHeight;
  $: areaInSquareYards = areaInSquareFeet / 9;
  $: weightInPounds = numThickness * areaInSquareYards * numUnitWeight;
  $: weightInTons = weightInPounds * 0.0005;
  const formatNumber = (num: number): string => {
    return isNaN(num) || !isFinite(num) ? "0.00" : num.toFixed(2);
  };
</script>

<ComponentContainer
  title="Asphalt Calculator"
  description="Calculate the amount of asphalt needed for a given area."
>
  <!-- Main Content -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <!-- Input Section -->
    <div class="space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        Input Parameters
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Input Mode Selector -->
        <div>
          <label
            for="input-mode"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Input Mode</label
          >
          <select
            id="input-mode"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            bind:value={useDirectArea}
          >
            <option value={false}>Use Width & Length</option>
            <option value={true}>Use Area</option>
          </select>
        </div>
        <!-- Area/Width/Length Inputs -->
        {#if !useDirectArea}
          <div>
            <label
              for="width-input"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Width (feet)</label
            >
            <input
              id="width-input"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              bind:value={width}
              min="0"
              step="0.1"
              placeholder="Enter width"
            />
          </div>
          <div>
            <label
              for="length-input"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Length (feet)</label
            >
            <input
              id="length-input"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              bind:value={height}
              min="0"
              step="0.1"
              placeholder="Enter length"
            />
          </div>
        {:else}
          <div class="col-span-2">
            <label
              for="area-input"
              class="block text-sm font-medium text-gray-700 mb-1">Area</label
            >
            <div class="flex space-x-2">
              <input
                id="area-input"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1"
                bind:value={directArea}
                min="0"
                step="0.1"
                placeholder="Enter area"
              />
              <select
                id="area-unit-select"
                bind:value={areaUnit}
                class="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ft²">Square Feet (ft²)</option>
                <option value="yd²">Square Yards (yd²)</option>
              </select>
            </div>
          </div>
        {/if}
        <div>
          <label
            for="thickness-input"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Thickness (inches)</label
          >
          <input
            id="thickness-input"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            bind:value={thickness}
            min="0"
            step="0.1"
            placeholder="Enter thickness"
          />
        </div>
        <div>
          <label
            for="unit-weight-input"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Unit Weight (lbs/yd²/in)</label
          >
          <input
            id="unit-weight-input"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            bind:value={unitWeight}
            min="0"
            step="0.1"
            placeholder="Default: 113"
          />
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3 pt-2">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
          disabled={false}
        >
          Calculate
        </button>
        <button
          class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
          on:click={() => {
            width = "";
            height = "";
            directArea = "";
            thickness = "";
            unitWeight = "113";
            areaUnit = "ft²";
            useDirectArea = false;
          }}
        >
          Reset
        </button>
      </div>
    </div>
    <!-- Results Section -->
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Results</h2>
      {#if hasAllRequiredValues}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-md border border-gray-200">
            <div class="text-sm font-medium text-gray-500">
              Area in Square Feet
            </div>
            <div class="text-2xl font-bold text-gray-800">
              {formatNumber(areaInSquareFeet)} ft²
            </div>
            <div class="text-xs text-gray-500 mt-1">ft²</div>
          </div>
          <div class="bg-white p-4 rounded-md border border-gray-200">
            <div class="text-sm font-medium text-gray-500">
              Area in Square Yards
            </div>
            <div class="text-2xl font-bold text-gray-800">
              {formatNumber(areaInSquareYards)} yd²
            </div>
            <div class="text-xs text-gray-500 mt-1">yd²</div>
          </div>
          <div class="bg-white p-4 rounded-md border border-gray-200">
            <div class="text-sm font-medium text-gray-500">
              Weight in Pounds
            </div>
            <div class="text-2xl font-bold text-gray-800">
              {formatNumber(weightInPounds)} lbs
            </div>
            <div class="text-xs text-gray-500 mt-1">lbs</div>
          </div>
          <div
            class="bg-white p-4 rounded-md border border-gray-200 col-span-1 md:col-span-3"
          >
            <div class="text-sm font-medium text-gray-500">
              Asphalt Required
            </div>
            <div class="text-2xl font-bold text-indigo-600">
              {formatNumber(weightInTons)} tons
            </div>
            <div class="text-xs text-gray-500 mt-1">tons</div>
          </div>
        </div>
      {:else}
        <div
          class="text-red-700 bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
        >
          {#if useDirectArea}
            Please enter valid area and thickness values to see calculation
            results.
          {:else}
            Please enter valid width, length, and thickness values to see
            calculation results.
          {/if}
        </div>
      {/if}
    </div>
  </div>
  <!-- Additional Information Section -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-3">Formula Used</h2>
    <div class="prose max-w-none text-gray-600">
      {#if !useDirectArea}
        <p>Area (ft²) = Width (ft) × Length (ft)</p>
      {/if}
      <p>Area (yd²) = Area (ft²) ÷ 9</p>
      <p>
        Weight (lbs) = Thickness (in) × Area (yd²) × Unit Weight (lbs/yd²/in)
      </p>
      <p>Weight (tons) = Weight (lbs) × 0.0005</p>
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
              Enter all required values to see the calculation results. Reset to
              clear all fields.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</ComponentContainer>
