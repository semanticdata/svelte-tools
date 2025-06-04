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

<div class="tool-container">
    <!-- Header Section -->
    <header class="tool-header">
        <h1 class="text-3xl font-bold text-gray-900">Volume Calculator</h1>
        <p class="mt-2 text-gray-600">
            Calculate the volume of different shapes.
        </p>
    </header>
    <!-- Tool Content -->
    <div class="tool-content">
        <div class="input-group">
            <label for="shape-select" class="input-label">Select Shape</label>
            <div class="radio-group">
                <label class="form-radio">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="rectangular_prism"
                        on:change={handleShapeChange}
                        class="radio-input"
                    />
                    Rectangle
                </label>
                <label class="form-radio">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="cylinder"
                        on:change={handleShapeChange}
                        class="radio-input"
                    />
                    Cylinder
                </label>
                <label class="form-radio">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="sphere"
                        on:change={handleShapeChange}
                        class="radio-input"
                    />
                    Sphere
                </label>
            </div>
        </div>

        {#if selectedShape === "rectangular_prism"}
            <div class="input-grid">
                <div class="input-group">
                    <label for="length" class="input-label">Length</label>
                    <input
                        type="number"
                        id="length"
                        bind:value={length}
                        min="0"
                        step="0.01"
                        placeholder="Enter length"
                        class="input-field"
                    />
                    <select bind:value={lengthUnit} class="select-field">
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>

                <div class="input-group">
                    <label for="width" class="input-label">Width</label>
                    <input
                        type="number"
                        id="width"
                        bind:value={width}
                        min="0"
                        step="0.01"
                        placeholder="Enter width"
                        class="input-field"
                    />
                    <select bind:value={widthUnit} class="select-field">
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>

                <div class="input-group">
                    <label for="height" class="input-label">Height</label>
                    <input
                        type="number"
                        id="height"
                        bind:value={height}
                        min="0"
                        step="0.01"
                        placeholder="Enter height"
                        class="input-field"
                    />
                    <select bind:value={heightUnit} class="select-field">
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>

                {#if isCube}
                    <div class="info-message">
                        <p>Note: This is a cube (all sides equal).</p>
                    </div>
                {/if}
            </div>
        {:else if selectedShape === "cylinder"}
            <div class="input-grid">
                <div class="input-group">
                    <label for="radius" class="input-label">Radius</label>
                    <input
                        type="number"
                        id="radius"
                        bind:value={radius}
                        min="0"
                        step="0.01"
                        placeholder="Enter radius"
                        class="input-field"
                    />
                    <select bind:value={radiusUnit} class="select-field">
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>

                <div class="input-group">
                    <label for="height" class="input-label">Height</label>
                    <input
                        type="number"
                        id="height"
                        bind:value={height}
                        min="0"
                        step="0.01"
                        placeholder="Enter height"
                        class="input-field"
                    />
                    <select bind:value={heightUnit} class="select-field">
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>
        {:else if selectedShape === "sphere"}
            <div class="input-grid">
                <div class="input-group">
                    <label for="radius" class="input-label">Radius</label>
                    <input
                        type="number"
                        id="radius"
                        bind:value={radius}
                        min="0"
                        step="0.01"
                        placeholder="Enter radius"
                        class="input-field"
                    />
                    <select bind:value={radiusUnit} class="select-field">
                        {#each unitOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            </div>
        {/if}

        <div class="input-group">
            <label for="outputUnit" class="input-label">Output Unit</label>
            <select
                id="outputUnit"
                bind:value={outputUnit}
                class="select-field"
            >
                {#each unitOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <div class="results-section">
            <h3 class="results-header">Result</h3>

            {#if hasAllRequiredValues}
                <div class="results-grid">
                    <div>
                        <p class="results-label">
                            The volume of the {isCube
                                ? "cube"
                                : selectedShape.replace("_", " ")} is:
                        </p>
                        <p class="results-value">
                            {formatNumber(volume)} cubic {outputUnit}
                        </p>
                    </div>

                    {#if selectedShape === "rectangular_prism"}
                        <div class="results-details">
                            <p>
                                Dimensions: {numLength}
                                {lengthUnit} × {numWidth}
                                {widthUnit} × {numHeight}
                                {heightUnit}
                            </p>
                        </div>
                    {:else if selectedShape === "cylinder"}
                        <div class="results-details">
                            <p>
                                Dimensions: radius {numRadius}
                                {radiusUnit}, height {numHeight}
                                {heightUnit}
                            </p>
                        </div>
                    {/if}
                </div>
            {:else}
                <div class="info-message">
                    <p>
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
                    </p>
                </div>
            {/if}
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

    .input-group {
        @apply mb-6;
    }

    .input-label {
        @apply block text-sm font-medium text-gray-700 mb-2;
    }

    .input-field {
        @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900;
    }

    .select-field {
        @apply w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900;
    }

    .radio-group {
        @apply flex flex-wrap gap-4;
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

    .results-section {
        @apply bg-gray-50 p-6 rounded-lg shadow-inner mt-8;
    }

    .results-header {
        @apply text-2xl font-semibold text-gray-800 mb-4;
    }

    .results-grid {
        @apply grid grid-cols-1 md:grid-cols-2 gap-4;
    }

    .results-label {
        @apply text-gray-600 text-sm;
    }

    .results-value {
        @apply text-blue-700 text-3xl font-bold;
    }

    .info-message {
        @apply p-4 bg-blue-100 text-blue-800 rounded-md border border-blue-200;
    }

    .input-grid {
        @apply grid grid-cols-1 md:grid-cols-2 gap-6 mb-6;
    }
</style>
