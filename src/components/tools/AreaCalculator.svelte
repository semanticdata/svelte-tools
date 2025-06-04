<script>
    import { onMount } from "svelte";

    // Shape type and dimensions
    let selectedShape = "rectangle";
    let length = "";
    let width = "";
    let base = "";
    let height = "";
    let radius = "";
    let angle = "";
    let area = 0;
    let selectedUnit = "inches";

    // Parsed numeric values
    $: numLength = parseFloat(length) || 0;
    $: numWidth = parseFloat(width) || 0;
    $: numBase = parseFloat(base) || 0;
    $: numHeight = parseFloat(height) || 0;
    $: numRadius = parseFloat(radius) || 0;
    $: numAngle = parseFloat(angle) || 0;

    // Calculate area based on selected shape
    $: {
        if (selectedShape === "rectangle") {
            area = numLength * numWidth;
        } else if (selectedShape === "triangle") {
            area = (numBase * numHeight) / 2;
        } else if (selectedShape === "arc") {
            // Area of an arc = (θ/360) * π * r²
            // where θ is the angle in degrees
            area = (numAngle / 360) * Math.PI * numRadius * numRadius;
        }

        // Round to 2 decimal places
        area = Math.round(area * 100) / 100;
    }

    // Check if all required values are provided
    $: hasAllRequiredValues =
        selectedShape === "rectangle"
            ? numLength > 0 && numWidth > 0
            : selectedShape === "triangle"
              ? numBase > 0 && numHeight > 0
              : numRadius > 0 && numAngle > 0 && numAngle <= 360;

    // Format number to 2 decimal places
    const formatNumber = (num) => {
        return isNaN(num) || !isFinite(num) ? "0.00" : num.toFixed(2);
    };

    // Reset dimensions when shape changes
    function handleShapeChange() {
        length = "";
        width = "";
        base = "";
        height = "";
        radius = "";
        angle = "";
    }
</script>

<div class="tool-container">
    <!-- Header Section -->
    <header class="tool-header">
        <h1 class="text-3xl font-bold text-gray-900">Tool Name</h1>
        <p class="mt-2 text-gray-600">
            A brief description of what this tool does and its purpose.
        </p>
    </header>

    <!-- Tool Content -->
    <div class="tool-content">
        <fieldset>
            <legend class="block text-gray-700 font-medium mb-2"
                >Select Shape</legend
            >
            <div class="flex gap-4 flex-wrap">
                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="rectangle"
                        on:change={handleShapeChange}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 text-gray-700">Rectangle</span>
                </label>

                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="triangle"
                        on:change={handleShapeChange}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 text-gray-700">Triangle</span>
                </label>

                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        bind:group={selectedShape}
                        value="arc"
                        on:change={handleShapeChange}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2 text-gray-700">Arc</span>
                </label>
            </div>
        </fieldset>
        <!-- </div> -->

        {#if selectedShape === "rectangle"}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="space-y-2">
                    <label
                        for="length"
                        class="block text-gray-700 font-medium mb-2"
                    >
                        Length
                    </label>
                    <input
                        type="number"
                        id="length"
                        bind:value={length}
                        min="0"
                        step="0.01"
                        placeholder="Enter length"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="space-y-2">
                    <label
                        for="width"
                        class="block text-gray-700 font-medium mb-2"
                    >
                        Width
                    </label>
                    <input
                        type="number"
                        id="width"
                        bind:value={width}
                        min="0"
                        step="0.01"
                        placeholder="Enter width"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        {:else if selectedShape === "triangle"}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="space-y-2">
                    <label
                        for="base"
                        class="block text-gray-700 font-medium mb-2"
                    >
                        Base
                    </label>
                    <input
                        type="number"
                        id="base"
                        bind:value={base}
                        min="0"
                        step="0.01"
                        placeholder="Enter base"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="space-y-2">
                    <label
                        for="height"
                        class="block text-gray-700 font-medium mb-2"
                    >
                        Height
                    </label>
                    <input
                        type="number"
                        id="height"
                        bind:value={height}
                        min="0"
                        step="0.01"
                        placeholder="Enter height"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        {:else if selectedShape === "arc"}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="space-y-2">
                    <label
                        for="radius"
                        class="block text-gray-700 font-medium mb-2"
                    >
                        Radius
                    </label>
                    <input
                        type="number"
                        id="radius"
                        bind:value={radius}
                        min="0"
                        step="0.01"
                        placeholder="Enter radius"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="space-y-2">
                    <label
                        for="angle"
                        class="block text-gray-700 font-medium mb-2"
                    >
                        Angle (degrees)
                    </label>
                    <input
                        type="number"
                        id="angle"
                        bind:value={angle}
                        min="0"
                        max="360"
                        step="0.1"
                        placeholder="Enter angle (0-360)"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        {/if}

        <div class="mb-6">
            <label for="unit" class="block text-gray-700 font-medium mb-2">
                Unit of Measurement
            </label>
            <select
                id="unit"
                bind:value={selectedUnit}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
                <option value="inches">Inches</option>
                <option value="feet">Feet</option>
                <option value="yards">Yards</option>
            </select>
        </div>

        <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Result</h3>

            {#if hasAllRequiredValues}
                <div class="grid grid-cols-1 gap-2">
                    <div>
                        <p class="text-gray-700">
                            The area of the {selectedShape} is:
                        </p>
                        <p class="text-xl font-bold text-blue-600">
                            {formatNumber(area)} square {selectedUnit}
                        </p>
                    </div>
                </div>
            {:else}
                <div
                    class="p-3 bg-yellow-50 text-yellow-700 rounded border border-yellow-200"
                >
                    <p>
                        {#if selectedShape === "rectangle"}
                            Please enter valid length and width values to see
                            calculation results.
                        {:else if selectedShape === "triangle"}
                            Please enter valid base and height values to see
                            calculation results.
                        {:else}
                            Please enter valid radius and angle values (0-360)
                            to see calculation results.
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

    .form-hint {
        @apply mt-1 text-sm text-gray-500;
    }

    /* Buttons */
    .action-buttons {
        @apply flex space-x-3 mt-8 pt-6 border-t border-gray-200;
    }

    .btn {
        @apply px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
    }

    .btn-primary {
        @apply bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500;
    }

    .btn-primary:disabled {
        @apply bg-indigo-300 cursor-not-allowed;
    }

    .btn-secondary {
        @apply bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500;
    }

    .btn-secondary:disabled {
        @apply text-gray-300 border-gray-200 cursor-not-allowed;
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
    /* Required field indicator */
    .required {
        @apply text-red-500;
    }
    /* Results Section */
    .results-section {
        @apply mt-8 pt-6 border-t border-gray-200;
    }
</style>
