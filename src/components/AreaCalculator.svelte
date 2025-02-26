<script>
    import { onMount } from "svelte";

    // Shape type and dimensions
    let selectedShape = "rectangle";
    let length = "";
    let width = "";
    let base = "";
    let height = "";
    let area = 0;
    let selectedUnit = "inches";

    // Parsed numeric values
    $: numLength = parseFloat(length) || 0;
    $: numWidth = parseFloat(width) || 0;
    $: numBase = parseFloat(base) || 0;
    $: numHeight = parseFloat(height) || 0;

    // Calculate area based on selected shape
    $: {
        if (selectedShape === "rectangle") {
            area = numLength * numWidth;
        } else if (selectedShape === "triangle") {
            area = (numBase * numHeight) / 2;
        }

        // Round to 2 decimal places
        area = Math.round(area * 100) / 100;
    }

    // Check if all required values are provided
    $: hasAllRequiredValues =
        selectedShape === "rectangle"
            ? numLength > 0 && numWidth > 0
            : numBase > 0 && numHeight > 0;

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
    }
</script>

<div class="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto my-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Area Calculator
    </h2>

    <div class="mb-6">
        <fieldset>
            <legend class="block text-gray-700 font-medium mb-2"
                >Select Shape</legend
            >
            <div class="flex gap-4">
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
            </div>
        </fieldset>
    </div>

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
                <label for="width" class="block text-gray-700 font-medium mb-2">
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
                <label for="base" class="block text-gray-700 font-medium mb-2">
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
                    {:else}
                        Please enter valid base and height values to see
                        calculation results.
                    {/if}
                </p>
            </div>
        {/if}
    </div>
</div>
