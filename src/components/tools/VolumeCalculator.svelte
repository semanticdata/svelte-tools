<script>
    import { onMount } from "svelte";

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

<div class="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto my-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Volume Calculator
    </h2>

    <div class="mb-6">
        <fieldset>
            <legend class="block text-gray-700 font-medium mb-2"
                >Select Shape</legend
            >
            <div class="flex gap-4 flex-wrap">
                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="rectangular_prism"
                        on:change={handleShapeChange}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 text-gray-700">Rectangle</span>
                </label>

                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="cylinder"
                        on:change={handleShapeChange}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 text-gray-700">Cylinder</span>
                </label>

                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="sphere"
                        on:change={handleShapeChange}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 text-gray-700">Sphere</span>
                </label>
            </div>
        </fieldset>
    </div>

    {#if selectedShape === "rectangular_prism"}
        <div class="grid grid-cols-1 gap-4 mb-6">
            <div class="space-y-2">
                <label
                    for="length"
                    class="block text-gray-700 font-medium mb-2"
                >
                    Length
                </label>
                <div class="flex gap-2">
                    <input
                        type="number"
                        id="length"
                        bind:value={length}
                        min="0"
                        step="0.01"
                        placeholder="Enter length"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        bind:value={lengthUnit}
                        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="space-y-2">
                <label for="width" class="block text-gray-700 font-medium mb-2">
                    Width
                </label>
                <div class="flex gap-2">
                    <input
                        type="number"
                        id="width"
                        bind:value={width}
                        min="0"
                        step="0.01"
                        placeholder="Enter width"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        bind:value={widthUnit}
                        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="space-y-2">
                <label
                    for="height"
                    class="block text-gray-700 font-medium mb-2"
                >
                    Height
                </label>
                <div class="flex gap-2">
                    <input
                        type="number"
                        id="height"
                        bind:value={height}
                        min="0"
                        step="0.01"
                        placeholder="Enter height"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        bind:value={heightUnit}
                        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>

            {#if isCube}
                <div
                    class="mt-2 p-2 bg-blue-50 text-blue-700 rounded border border-blue-200"
                >
                    <p>Note: This is a cube (all sides equal).</p>
                </div>
            {/if}
        </div>
    {:else if selectedShape === "cylinder"}
        <div class="grid grid-cols-1 gap-4 mb-6">
            <div class="space-y-2">
                <label
                    for="radius"
                    class="block text-gray-700 font-medium mb-2"
                >
                    Radius
                </label>
                <div class="flex gap-2">
                    <input
                        type="number"
                        id="radius"
                        bind:value={radius}
                        min="0"
                        step="0.01"
                        placeholder="Enter radius"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        bind:value={radiusUnit}
                        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="space-y-2">
                <label
                    for="height"
                    class="block text-gray-700 font-medium mb-2"
                >
                    Height
                </label>
                <div class="flex gap-2">
                    <input
                        type="number"
                        id="height"
                        bind:value={height}
                        min="0"
                        step="0.01"
                        placeholder="Enter height"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        bind:value={heightUnit}
                        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {:else if selectedShape === "sphere"}
        <div class="grid grid-cols-1 gap-4 mb-6">
            <div class="space-y-2">
                <label
                    for="radius"
                    class="block text-gray-700 font-medium mb-2"
                >
                    Radius
                </label>
                <div class="flex gap-2">
                    <input
                        type="number"
                        id="radius"
                        bind:value={radius}
                        min="0"
                        step="0.01"
                        placeholder="Enter radius"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        bind:value={radiusUnit}
                        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}

    <div class="mb-6">
        <label for="outputUnit" class="block text-gray-700 font-medium mb-2">
            Output Unit
        </label>
        <select
            id="outputUnit"
            bind:value={outputUnit}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
            {#each unitOptions as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
    </div>

    <div class="bg-gray-50 p-4 rounded-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Result</h3>

        {#if hasAllRequiredValues}
            <div class="grid grid-cols-1 gap-2">
                <div>
                    <p class="text-gray-700">
                        The volume of the {isCube
                            ? "cube"
                            : selectedShape.replace("_", " ")} is:
                    </p>
                    <p class="text-xl font-bold text-blue-600">
                        {formatNumber(volume)} cubic {outputUnit}
                    </p>
                </div>

                {#if selectedShape === "rectangular_prism"}
                    <div class="mt-2 text-sm text-gray-600">
                        <p>
                            Dimensions: {numLength}
                            {lengthUnit} × {numWidth}
                            {widthUnit} × {numHeight}
                            {heightUnit}
                        </p>
                    </div>
                {:else if selectedShape === "cylinder"}
                    <div class="mt-2 text-sm text-gray-600">
                        <p>
                            Dimensions: radius {numRadius}
                            {radiusUnit}, height {numHeight}
                            {heightUnit}
                        </p>
                    </div>
                {/if}
            </div>
        {:else}
            <div
                class="p-3 bg-yellow-50 text-yellow-700 rounded border border-yellow-200"
            >
                <p>
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
    </div>
</div>
