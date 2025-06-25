<script>
    import { onMount } from "svelte";
    import ComponentContainer from "../utils/ComponentContainer.svelte";

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

<ComponentContainer
    title="Unit Converter"
    description="Convert different units of measurement."
>
    <!-- Main Content -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <!-- Input Section -->
        <div class="space-y-4 mb-6">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                Input Parameters
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Conversion Type -->
                <div>
                    <label
                        for="conversionType"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Conversion Type</label
                    >
                    <select
                        id="conversionType"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        bind:value={selectedType}
                        on:change={handleTypeChange}
                    >
                        {#each conversionTypes as type}
                            <option value={type.id}>{type.name}</option>
                        {/each}
                    </select>
                </div>

                <!-- Value to Convert -->
                <div>
                    <label
                        for="inputValue"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Value to Convert</label
                    >
                    <input
                        id="inputValue"
                        type="number"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        bind:value={inputValue}
                        on:input={handleUserInput}
                        placeholder="Enter value"
                    />
                </div>

                <!-- From Unit -->
                <div>
                    <label
                        for="fromUnit"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >From Unit</label
                    >
                    <select
                        id="fromUnit"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        bind:value={fromUnit}
                        on:change={handleUnitChange}
                    >
                        {#each availableUnits as unit}
                            <option value={unit.id}>{unit.name}</option>
                        {/each}
                    </select>
                </div>

                <!-- To Unit -->
                <div>
                    <label
                        for="toUnit"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >To Unit</label
                    >
                    <select
                        id="toUnit"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        bind:value={toUnit}
                        on:change={handleUnitChange}
                    >
                        {#each availableUnits as unit}
                            <option value={unit.id}>{unit.name}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 pt-2">
                <button
                    type="button"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    on:click={swapUnits}
                >
                    Swap Units
                </button>
                <button
                    type="button"
                    class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    on:click={() => {
                        inputValue = 1;
                        userHasModifiedInput = false;
                        calculateConversion(false);
                    }}
                >
                    Reset
                </button>
            </div>
        </div>

        {#if errorMessage}
            <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg
                            class="h-5 w-5 text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700">{errorMessage}</p>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Results Section -->
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-700 mb-3">Results</h2>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                <!-- Main Result Card -->
                <div class="bg-white p-4 rounded-md border border-gray-200">
                    <div class="text-sm font-medium text-gray-500">
                        Converted Value
                    </div>
                    <div class="text-2xl font-bold text-gray-800">
                        {formatNumber(result)}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                        {availableUnits.find((u) => u.id === toUnit)?.name ||
                            ""}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional Information Section -->
    {#if recentConversions.length > 0}
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-3">
                Recent Conversions
            </h2>
            <div class="prose max-w-none text-gray-600">
                <ul class="list-disc pl-5 space-y-1 mb-4">
                    {#each recentConversions as conv}
                        <li>
                            {conv.inputValue}
                            {conv.from} = {formatNumber(conv.result)}
                            {conv.to}
                            <span class="text-xs text-gray-400 ml-2">
                                ({new Date(
                                    conv.timestamp,
                                ).toLocaleTimeString()})
                            </span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</ComponentContainer>
