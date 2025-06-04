<script>
    import { onMount } from "svelte";

    // Conversion types
    const conversionTypes = [
        { id: "linear", name: "Linear (Length)" },
        { id: "area", name: "Area" },
        { id: "volume", name: "Volume" },
        { id: "weight", name: "Weight/Mass" },
    ];

    // Units by conversion type
    const unitsByType = {
        linear: [
            { id: "mm", name: "Millimeters (mm)", factor: 0.001 },
            { id: "cm", name: "Centimeters (cm)", factor: 0.01 },
            { id: "dm", name: "Decimeters (dm)", factor: 0.1 },
            { id: "m", name: "Meters (m)", factor: 1 },
            { id: "km", name: "Kilometers (km)", factor: 1000 },
            { id: "in", name: "Inches (in)", factor: 0.0254 },
            { id: "ft", name: "Feet (ft)", factor: 0.3048 },
            { id: "yd", name: "Yards (yd)", factor: 0.9144 },
            { id: "mi", name: "Miles (mi)", factor: 1609.344 },
        ],
        area: [
            { id: "mm2", name: "Square Millimeters (mm²)", factor: 0.000001 },
            { id: "cm2", name: "Square Centimeters (cm²)", factor: 0.0001 },
            { id: "m2", name: "Square Meters (m²)", factor: 1 },
            { id: "ha", name: "Hectares (ha)", factor: 10000 },
            { id: "km2", name: "Square Kilometers (km²)", factor: 1000000 },
            { id: "in2", name: "Square Inches (in²)", factor: 0.00064516 },
            { id: "ft2", name: "Square Feet (ft²)", factor: 0.09290304 },
            { id: "yd2", name: "Square Yards (yd²)", factor: 0.83612736 },
            { id: "ac", name: "Acres", factor: 4046.8564224 },
            { id: "mi2", name: "Square Miles (mi²)", factor: 2589988.110336 },
        ],
        volume: [
            { id: "ml", name: "Milliliters (ml)", factor: 0.001 },
            { id: "l", name: "Liters (l)", factor: 1 },
            { id: "m3", name: "Cubic Meters (m³)", factor: 1000 },
            { id: "gal", name: "Gallons (US)", factor: 3.78541 },
            { id: "qt", name: "Quarts (US)", factor: 0.946353 },
            { id: "pt", name: "Pints (US)", factor: 0.473176 },
            { id: "cup", name: "Cups (US)", factor: 0.236588 },
            { id: "floz", name: "Fluid Ounces (US)", factor: 0.0295735 },
            { id: "tbsp", name: "Tablespoons (US)", factor: 0.0147868 },
            { id: "tsp", name: "Teaspoons (US)", factor: 0.00492892 },
        ],
        weight: [
            { id: "mg", name: "Milligrams (mg)", factor: 0.001 },
            { id: "g", name: "Grams (g)", factor: 1 },
            { id: "kg", name: "Kilograms (kg)", factor: 1000 },
            { id: "t", name: "Metric Tons (t)", factor: 1000000 },
            { id: "oz", name: "Ounces (oz)", factor: 28.3495 },
            { id: "lb", name: "Pounds (lb)", factor: 453.592 },
            { id: "st", name: "Stone (st)", factor: 6350.29 },
            { id: "ton", name: "US Tons", factor: 907184.74 },
        ],
    };

    // State variables
    let selectedType = conversionTypes[0].id;
    let fromUnit = "";
    let toUnit = "";
    let inputValue = 1;
    let result = 0;
    let availableUnits = [];
    let errorMessage = "";
    let recentConversions = [];
    let userHasModifiedInput = false;

    // Initialize default units when component mounts
    onMount(() => {
        updateAvailableUnits();
        if (availableUnits.length > 0) {
            fromUnit = availableUnits[0].id;
            toUnit =
                availableUnits.length > 1
                    ? availableUnits[1].id
                    : availableUnits[0].id;
            calculateConversion(false);
        }
    });

    // Update available units when conversion type changes
    function updateAvailableUnits() {
        availableUnits = unitsByType[selectedType] || [];
        if (availableUnits.length > 0) {
            fromUnit = availableUnits[0].id;
            toUnit =
                availableUnits.length > 1
                    ? availableUnits[1].id
                    : availableUnits[0].id;
        }
        calculateConversion(false);
        userHasModifiedInput = false;
    }

    // Calculate the conversion
    function calculateConversion(shouldAddToRecent = true) {
        errorMessage = "";

        if (!inputValue) {
            errorMessage = "Please enter a valid number";
            return;
        }

        const fromUnitObj = availableUnits.find((unit) => unit.id === fromUnit);
        const toUnitObj = availableUnits.find((unit) => unit.id === toUnit);

        if (!fromUnitObj || !toUnitObj) {
            errorMessage = "Please select valid units";
            return;
        }

        // Convert to base unit then to target unit
        const valueInBaseUnit = inputValue * fromUnitObj.factor;
        result = valueInBaseUnit / toUnitObj.factor;

        // Add to recent conversions only if user has modified input and we should add to recent
        if (shouldAddToRecent && userHasModifiedInput) {
            addToRecentConversions();
        }
    }

    // Add current conversion to recent conversions list
    function addToRecentConversions() {
        const fromUnitObj = availableUnits.find((unit) => unit.id === fromUnit);
        const toUnitObj = availableUnits.find((unit) => unit.id === toUnit);

        if (!fromUnitObj || !toUnitObj) return;

        const conversionRecord = {
            type: selectedType,
            from: fromUnitObj.name,
            to: toUnitObj.name,
            inputValue,
            result,
            timestamp: new Date(),
        };

        recentConversions = [
            conversionRecord,
            ...recentConversions.slice(0, 4),
        ];
    }

    // Swap from and to units
    function swapUnits() {
        [fromUnit, toUnit] = [toUnit, fromUnit];
        calculateConversion(userHasModifiedInput);
    }

    // Handle user input
    function handleUserInput() {
        userHasModifiedInput = true;
        calculateConversion(true);
    }

    // Handle unit change
    function handleUnitChange() {
        calculateConversion(userHasModifiedInput);
    }

    // Format number with appropriate decimal places
    function formatNumber(num) {
        if (Math.abs(num) < 0.000001) return num.toExponential(6);
        if (Math.abs(num) >= 1000000) return num.toExponential(6);

        // Determine decimal places based on the magnitude
        let decimalPlaces = 2;
        if (Math.abs(num) < 0.01) decimalPlaces = 6;
        else if (Math.abs(num) < 0.1) decimalPlaces = 4;

        return num.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimalPlaces,
        });
    }

    // Handle type change
    function handleTypeChange() {
        updateAvailableUnits();
    }
</script>

<div class="bg-white rounded-lg shadow-sm p-6 h-full">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Unit Converter</h2>

    <!-- Conversion Type Selection -->
    <div class="mb-6">
        <label for="conversionType" class="form-label">Conversion Type</label>
        <select
            id="conversionType"
            bind:value={selectedType}
            on:change={handleTypeChange}
            class="form-select"
        >
            {#each conversionTypes as type}
                <option value={type.id}>{type.name}</option>
            {/each}
        </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- From Unit -->
        <div>
            <label for="fromUnit" class="form-label">From</label>
            <select
                id="fromUnit"
                bind:value={fromUnit}
                on:change={handleUnitChange}
                class="form-select"
            >
                {#each availableUnits as unit}
                    <option value={unit.id}>{unit.name}</option>
                {/each}
            </select>
        </div>

        <!-- To Unit -->
        <div>
            <label for="toUnit" class="form-label">To</label>
            <select
                id="toUnit"
                bind:value={toUnit}
                on:change={handleUnitChange}
                class="form-select"
            >
                {#each availableUnits as unit}
                    <option value={unit.id}>{unit.name}</option>
                {/each}
            </select>
        </div>
    </div>

    <!-- Input and Result -->
    <div class="grid grid-cols-1 md:grid-cols-7 gap-4 items-center mb-6">
        <div class="md:col-span-3">
            <label for="inputValue" class="form-label">Value</label>
            <input
                type="number"
                id="inputValue"
                bind:value={inputValue}
                on:input={handleUserInput}
                class="form-input"
                placeholder="Enter value"
            />
        </div>

        <div class="flex justify-center md:col-span-1">
            <button on:click={swapUnits} class="btn-secondary p-2 rounded-full" title="Swap units" aria-label="Swap units">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                </svg>
            </button>
        </div>

        <div class="md:col-span-3">
            <label for="resultValue" class="form-label">Result</label>
            <div
                id="resultValue"
                class="form-input bg-gray-50"
                aria-live="polite"
            >
                {#if errorMessage}
                    <span class="feedback feedback-error">{errorMessage}</span>
                {:else}
                    {formatNumber(result)}
                {/if}
            </div>
        </div>
    </div>

    <!-- Conversion Formula -->
    <div class="feedback feedback-info">
        <h3 class="text-sm font-medium text-blue-800 mb-1">
            Conversion Formula
        </h3>
        <p class="text-blue-700">
            1 {availableUnits.find((unit) => unit.id === fromUnit)?.name || ""} =
            {availableUnits.find((unit) => unit.id === fromUnit)?.factor &&
            availableUnits.find((unit) => unit.id === toUnit)?.factor
                ? formatNumber(
                      availableUnits.find((unit) => unit.id === fromUnit)
                          .factor /
                          availableUnits.find((unit) => unit.id === toUnit)
                              .factor,
                  )
                : ""}
            {availableUnits.find((unit) => unit.id === toUnit)?.name || ""}
        </p>
    </div>

    <!-- Recent Conversions -->
    {#if recentConversions.length > 0}
        <div class="results-section mt-8">
            <h3 class="text-lg font-medium text-gray-800 mb-3">
                Recent Conversions
            </h3>
            <div class="bg-gray-50 rounded-md overflow-hidden">
                {#each recentConversions as conversion, i}
                    <div
                        class="results-content {i % 2 === 0
                            ? 'bg-gray-50'
                            : 'bg-white'} border-b border-gray-200 last:border-b-0"
                    >
                        <p class="text-sm text-gray-600">
                            {formatNumber(conversion.inputValue)}
                            {conversion.from} =
                            {formatNumber(conversion.result)}
                            {conversion.to}
                        </p>
                        <p class="text-xs text-gray-500 mt-1">
                            {conversion.timestamp.toLocaleTimeString()} - {conversionTypes.find(
                                (t) => t.id === conversion.type,
                            )?.name}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style lang="postcss">
  :global(html) {
    scroll-behavior: smooth;
  }

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }

  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }

  .form-select {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white;
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

  .form-checkbox {
    @apply flex items-center cursor-pointer;
  }

  .form-checkbox input[type="checkbox"] {
    @apply h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded;
  }

  .form-checkbox span {
    @apply ml-2 text-gray-700;
  }

  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors;
  }

  .results-section {
    @apply bg-gray-50 p-4 rounded-md mb-6;
  }

  .results-content {
    @apply bg-white p-2 rounded border border-gray-200;
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

  .feedback-warning {
    @apply bg-yellow-50 text-yellow-800;
  }

  .feedback-error {
    @apply bg-red-50 text-red-800;
  }
</style>
