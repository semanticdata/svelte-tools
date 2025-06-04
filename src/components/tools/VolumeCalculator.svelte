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

<div class="max-w-4xl mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
        <header class="mb-6 border-b pb-4">
            <h1 class="text-3xl font-bold text-gray-900">Volume Calculator</h1>
            <p class="mt-2 text-gray-600">
                Calculate the volume of different shapes.
            </p>
        </header>
        <main class="space-y-6">
            <section>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Select Shape</label
                >
                <div class="flex flex-wrap gap-4">
                    <label class="flex items-center cursor-pointer">
                        <input
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
                            type="radio"
                            bind:group={selectedShape}
                            value="sphere"
                            on:change={handleShapeChange}
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span class="ml-2 text-gray-700">Sphere</span>
                    </label>
                </div>
            </section>
            {#if selectedShape === "rectangular_prism"}
                <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Length</label
                        >
                        <input
                            type="number"
                            bind:value={length}
                            min="0"
                            step="0.01"
                            placeholder="Enter length"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <select
                            bind:value={lengthUnit}
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Width</label
                        >
                        <input
                            type="number"
                            bind:value={width}
                            min="0"
                            step="0.01"
                            placeholder="Enter width"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <select
                            bind:value={widthUnit}
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Height</label
                        >
                        <input
                            type="number"
                            bind:value={height}
                            min="0"
                            step="0.01"
                            placeholder="Enter height"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <select
                            bind:value={heightUnit}
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                </section>
                {#if isCube}
                    <div
                        class="p-3 bg-blue-100 text-blue-800 rounded-md border border-blue-200 mt-2"
                    >
                        Note: This is a cube (all sides equal).
                    </div>
                {/if}
            {:else if selectedShape === "cylinder"}
                <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Radius</label
                        >
                        <input
                            type="number"
                            bind:value={radius}
                            min="0"
                            step="0.01"
                            placeholder="Enter radius"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <select
                            bind:value={radiusUnit}
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Height</label
                        >
                        <input
                            type="number"
                            bind:value={height}
                            min="0"
                            step="0.01"
                            placeholder="Enter height"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <select
                            bind:value={heightUnit}
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                </section>
            {:else if selectedShape === "sphere"}
                <section class="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Radius</label
                        >
                        <input
                            type="number"
                            bind:value={radius}
                            min="0"
                            step="0.01"
                            placeholder="Enter radius"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <select
                            bind:value={radiusUnit}
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mt-2"
                        >
                            {#each unitOptions as option}
                                <option value={option.value}
                                    >{option.label}</option
                                >
                            {/each}
                        </select>
                    </div>
                </section>
            {/if}
            <section>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Output Unit</label
                >
                <select
                    bind:value={outputUnit}
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                    {#each unitOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </section>
            <section class="bg-gray-50 p-6 rounded-lg shadow-inner mt-8">
                <h3 class="text-2xl font-semibold text-gray-800 mb-4">
                    Result
                </h3>
                {#if hasAllRequiredValues}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p class="text-gray-600 text-sm">
                                The volume of the {isCube
                                    ? "cube"
                                    : selectedShape.replace("_", " ")} is:
                            </p>
                            <p class="text-blue-700 text-3xl font-bold">
                                {formatNumber(volume)} cubic {outputUnit}
                            </p>
                        </div>
                        {#if selectedShape === "rectangular_prism"}
                            <div class="text-gray-700">
                                <p>
                                    Dimensions: {numLength}{lengthUnit} × {numWidth}{widthUnit}
                                    × {numHeight}{heightUnit}
                                </p>
                            </div>
                        {:else if selectedShape === "cylinder"}
                            <div class="text-gray-700">
                                <p>
                                    Dimensions: radius {numRadius}{radiusUnit},
                                    height {numHeight}{heightUnit}
                                </p>
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div
                        class="p-4 bg-blue-100 text-blue-800 rounded-md border border-blue-200"
                    >
                        {#if selectedShape === "rectangular_prism"}
                            Please enter valid length, width, and height values
                            to see calculation results.
                        {:else if selectedShape === "cylinder"}
                            Please enter valid radius and height values to see
                            calculation results.
                        {:else}
                            Please enter a valid radius value to see calculation
                            results.
                        {/if}
                    </div>
                {/if}
            </section>
            <section class="mt-8">
                <h4 class="text-lg font-semibold mb-2">How it works</h4>
                <ul class="list-disc list-inside text-gray-600 space-y-1">
                    <li>
                        Rectangular Prism: <span class="font-mono"
                            >length × width × height</span
                        >
                    </li>
                    <li>
                        Cylinder: <span class="font-mono"
                            >π × radius² × height</span
                        >
                    </li>
                    <li>
                        Sphere: <span class="font-mono"
                            >(4/3) × π × radius³</span
                        >
                    </li>
                    <li>
                        All units are converted to the selected output unit for
                        the final result.
                    </li>
                </ul>
            </section>
        </main>
    </div>
</div>
