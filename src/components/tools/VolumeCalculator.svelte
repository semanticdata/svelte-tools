<script>
    import { onMount } from "svelte";
    import ComponentContainer from "../utils/ComponentContainer.svelte";

    // Shape type and dimensions
    let selectedShape = "rectangular_prism";
    let length = "";
    let width = "";
    let height = "";
    let radius = "";
    let volume = 0;

    // Individual units for each dimension
    let lengthUnit = "inches";
    let widthUnit = "inches";
    let heightUnit = "inches";
    let radiusUnit = "inches";
    let outputUnit = "inches";

    // Unit conversion factors (to inches)
    const conversionFactors = {
        inches: 1,
        feet: 12,
        yards: 36,
    };

    // Parsed numeric values
    $: numLength = parseFloat(length) || 0;
    $: numWidth = parseFloat(width) || 0;
    $: numHeight = parseFloat(height) || 0;
    $: numRadius = parseFloat(radius) || 0;

    // Convert dimensions to a common unit (inches) for calculation
    $: lengthInInches = numLength * conversionFactors[lengthUnit];
    $: widthInInches = numWidth * conversionFactors[widthUnit];
    $: heightInInches = numHeight * conversionFactors[heightUnit];
    $: radiusInInches = numRadius * conversionFactors[radiusUnit];

    // Calculate volume based on selected shape (in cubic inches)
    $: {
        let volumeInCubicInches = 0;

        if (selectedShape === "rectangular_prism") {
            volumeInCubicInches =
                lengthInInches * widthInInches * heightInInches;
        } else if (selectedShape === "cylinder") {
            volumeInCubicInches =
                Math.PI * Math.pow(radiusInInches, 2) * heightInInches;
        } else if (selectedShape === "sphere") {
            volumeInCubicInches =
                (4 / 3) * Math.PI * Math.pow(radiusInInches, 3);
        }

        // Convert to output unit
        const cubicConversionFactor = Math.pow(
            conversionFactors[outputUnit],
            3,
        );
        volume = volumeInCubicInches / cubicConversionFactor;

        // Round to 2 decimal places
        volume = Math.round(volume * 100) / 100;
    }

    // Check if all required values are provided
    $: hasAllRequiredValues =
        selectedShape === "rectangular_prism"
            ? numLength > 0 && numWidth > 0 && numHeight > 0
            : selectedShape === "cylinder"
              ? numRadius > 0 && numHeight > 0
              : numRadius > 0;

    // Format number to 2 decimal places
    const formatNumber = (num) => {
        return isNaN(num) || !isFinite(num) ? "0.00" : num.toFixed(2);
    };

    // Reset dimensions when shape changes
    function handleShapeChange() {
        length = "";
        width = "";
        height = "";
        radius = "";
    }

    // Common units dropdown component
    const unitOptions = [
        { value: "inches", label: "Inches" },
        { value: "feet", label: "Feet" },
        { value: "yards", label: "Yards" },
    ];

    // Helper function to check if all sides are equal (cube)
    $: isCube =
        selectedShape === "rectangular_prism" &&
        numLength > 0 &&
        numWidth > 0 &&
        numHeight > 0 &&
        lengthInInches === widthInInches &&
        widthInInches === heightInInches &&
        lengthUnit === widthUnit &&
        widthUnit === heightUnit;
</script>

<ComponentContainer
    title="Volume Calculator"
    description="Calculate the volume of different shapes."
>
    <!-- Main Content -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <!-- Input Section -->
        <div class="space-y-4 mb-6">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                Input Parameters
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Shape Selection -->
                <div class="md:col-span-2">
                    <label
                        for="shape-select"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Select Shape</label
                    >
                    <div id="shape-select" class="flex flex-wrap gap-4">
                        <label class="flex items-center cursor-pointer">
                            <input
                                id="rectangular_prism_radio"
                                type="radio"
                                bind:group={selectedShape}
                                value="rectangular_prism"
                                on:change={handleShapeChange}
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span class="ml-2 text-gray-700">Rectangle</span>
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input
                                id="cylinder_radio"
                                type="radio"
                                bind:group={selectedShape}
                                value="cylinder"
                                on:change={handleShapeChange}
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span class="ml-2 text-gray-700">Cylinder</span>
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input
                                id="sphere_radio"
                                type="radio"
                                bind:group={selectedShape}
                                value="sphere"
                                on:change={handleShapeChange}
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span class="ml-2 text-gray-700">Sphere</span>
                        </label>
                    </div>
                </div>
                {#if selectedShape === "rectangular_prism"}
                    <!-- Length -->
                    <div>
                        <label
                            for="length-input"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Length</label
                        >
                        <input
                            id="length-input"
                            type="number"
                            bind:value={length}
                            min="0"
                            step="0.01"
                            placeholder="Enter length"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <select
                            id="length-unit"
                            bind:value={lengthUnit}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <!-- Width -->
                    <div>
                        <label
                            for="width-input"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Width</label
                        >
                        <input
                            id="width-input"
                            type="number"
                            bind:value={width}
                            min="0"
                            step="0.01"
                            placeholder="Enter width"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <select
                            id="width-unit"
                            bind:value={widthUnit}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <!-- Height -->
                    <div class="md:col-span-2">
                        <label
                            for="height-input-prism"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Height</label
                        >
                        <input
                            id="height-input-prism"
                            type="number"
                            bind:value={height}
                            min="0"
                            step="0.01"
                            placeholder="Enter height"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <select
                            id="height-unit-prism"
                            bind:value={heightUnit}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                    {#if isCube}
                        <div
                            class="p-3 bg-blue-100 text-blue-800 rounded-md border border-blue-200 mt-2"
                        >
                            Note: This is a cube (all sides equal).
                        </div>
                    {/if}
                {:else if selectedShape === "cylinder"}
                    <!-- Radius -->
                    <div>
                        <label
                            for="radius-input"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Radius</label
                        >
                        <input
                            id="radius-input"
                            type="number"
                            bind:value={radius}
                            min="0"
                            step="0.01"
                            placeholder="Enter radius"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <select
                            id="radius-unit"
                            bind:value={radiusUnit}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <!-- Height -->
                    <div>
                        <label
                            for="height-input-cylinder"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Height</label
                        >
                        <input
                            id="height-input-cylinder"
                            type="number"
                            bind:value={height}
                            min="0"
                            step="0.01"
                            placeholder="Enter height"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <select
                            id="height-unit-cylinder"
                            bind:value={heightUnit}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                {:else if selectedShape === "sphere"}
                    <!-- Radius -->
                    <div class="md:col-span-2">
                        <label
                            for="radius-input-sphere"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Radius</label
                        >
                        <input
                            id="radius-input-sphere"
                            type="number"
                            bind:value={radius}
                            min="0"
                            step="0.01"
                            placeholder="Enter radius"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <select
                            id="radius-unit-sphere"
                            bind:value={radiusUnit}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Output Unit Selection -->
        <div class="space-y-4 mb-6">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                Output Settings
            </h2>
            <div>
                <label
                    for="output-unit"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Output Unit</label
                >
                <select
                    id="output-unit"
                    bind:value={outputUnit}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {#each unitOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
                on:click={calculateVolume}
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
                Calculate Volume
            </button>
            <button
                on:click={resetForm}
                class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
                Reset
            </button>
        </div>

        <!-- Results Section -->
        {#if hasAllRequiredValues}
            <div class="space-y-6">
                <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                    Results
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Volume Result -->
                    <div
                        class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-sm font-medium text-gray-500 mb-1">
                            Volume
                        </h3>
                        <p class="text-2xl font-bold text-blue-600">
                            {formatNumber(volume)}
                        </p>
                        <p class="text-sm text-gray-500 mt-1">
                            cubic {outputUnit}
                        </p>
                    </div>

                    <!-- Dimensions Info -->
                    <div
                        class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-sm font-medium text-gray-500 mb-1">
                            Shape Info
                        </h3>
                        <p class="text-lg font-semibold text-gray-700">
                            {isCube
                                ? "Cube"
                                : selectedShape
                                      .replace("_", " ")
                                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </p>
                        {#if selectedShape === "rectangular_prism"}
                            <p class="text-sm text-gray-500 mt-1">
                                {numLength}{lengthUnit} × {numWidth}{widthUnit} ×
                                {numHeight}{heightUnit}
                            </p>
                        {:else if selectedShape === "cylinder"}
                            <p class="text-sm text-gray-500 mt-1">
                                r: {numRadius}{radiusUnit}, h: {numHeight}{heightUnit}
                            </p>
                        {:else if selectedShape === "sphere"}
                            <p class="text-sm text-gray-500 mt-1">
                                radius: {numRadius}{radiusUnit}
                            </p>
                        {/if}
                    </div>
                </div>
            </div>
        {:else}
            <div class="text-center py-12">
                <div class="mx-auto h-12 w-12 text-gray-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <h3 class="mt-2 text-sm font-medium text-gray-900">
                    No calculations yet
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                    {#if selectedShape === "rectangular_prism"}
                        Please enter valid length, width, and height values to
                        see calculation results.
                    {:else if selectedShape === "cylinder"}
                        Please enter valid radius and height values to see
                        calculation results.
                    {:else}
                        Please enter a valid radius value to see calculation
                        results.
                    {/if}
                </p>
            </div>
        {/if}
        <!-- Additional Information Section -->
        <div class="space-y-6 mt-8">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                How it works
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-medium text-blue-900 mb-2">
                        Rectangular Prism
                    </h3>
                    <p class="text-sm text-blue-700">
                        Volume = length × width × height
                    </p>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                    <h3 class="font-medium text-green-900 mb-2">Cylinder</h3>
                    <p class="text-sm text-green-700">
                        Volume = π × radius² × height
                    </p>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg">
                    <h3 class="font-medium text-purple-900 mb-2">Sphere</h3>
                    <p class="text-sm text-purple-700">
                        Volume = (4/3) × π × radius³
                    </p>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">
                    <strong>Note:</strong> All calculations are performed with high
                    precision. Results are displayed with 4 decimal places for accuracy.
                </p>
            </div>
        </div>
    </div>
</ComponentContainer>
