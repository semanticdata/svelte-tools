<script>
    // Logic unchanged, but script block moved to top for consistency
    let selectedShape = "rectangle";
    let length = "";
    let width = "";
    let base = "";
    let height = "";
    let radius = "";
    let angle = "";
    let area = 0;
    let selectedUnit = "inches";
    $: numLength = parseFloat(length) || 0;
    $: numWidth = parseFloat(width) || 0;
    $: numBase = parseFloat(base) || 0;
    $: numHeight = parseFloat(height) || 0;
    $: numRadius = parseFloat(radius) || 0;
    $: numAngle = parseFloat(angle) || 0;
    $: {
        if (selectedShape === "rectangle") {
            area = numLength * numWidth;
        } else if (selectedShape === "triangle") {
            area = (numBase * numHeight) / 2;
        } else if (selectedShape === "arc") {
            area = (numAngle / 360) * Math.PI * numRadius * numRadius;
        }
        area = Math.round(area * 100) / 100;
    }
    $: hasAllRequiredValues =
        selectedShape === "rectangle"
            ? numLength > 0 && numWidth > 0
            : selectedShape === "triangle"
              ? numBase > 0 && numHeight > 0
              : numRadius > 0 && numAngle > 0 && numAngle <= 360;
    const formatNumber = (num) => {
        return isNaN(num) || !isFinite(num) ? "0.00" : num.toFixed(2);
    };
    function handleShapeChange() {
        length = "";
        width = "";
        base = "";
        height = "";
        radius = "";
        angle = "";
    }
</script>

<div class="max-w-4xl mx-auto p-4">
    <!-- Header Section -->
    <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Area Calculator</h1>
        <p class="text-gray-600">Calculate the area of different shapes.</p>
    </div>

    <!-- Main Content -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <!-- Input Section -->
        <div class="space-y-4 mb-6">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                Input Parameters
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Shape Selector -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Select Shape</label
                    >
                    <select
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        bind:value={selectedShape}
                        on:change={handleShapeChange}
                    >
                        <option value="rectangle">Rectangle</option>
                        <option value="triangle">Triangle</option>
                        <option value="arc">Arc</option>
                    </select>
                </div>
                <!-- Unit Selector -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Unit of Measurement</label
                    >
                    <select
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        bind:value={selectedUnit}
                    >
                        <option value="inches">Inches</option>
                        <option value="feet">Feet</option>
                        <option value="yards">Yards</option>
                    </select>
                </div>
                <!-- Rectangle Inputs -->
                {#if selectedShape === "rectangle"}
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Length</label
                        >
                        <input
                            type="number"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter length"
                            min="0"
                            step="0.01"
                            bind:value={length}
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Width</label
                        >
                        <input
                            type="number"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter width"
                            min="0"
                            step="0.01"
                            bind:value={width}
                        />
                    </div>
                {/if}
                <!-- Triangle Inputs -->
                {#if selectedShape === "triangle"}
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Base</label
                        >
                        <input
                            type="number"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter base"
                            min="0"
                            step="0.01"
                            bind:value={base}
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Height</label
                        >
                        <input
                            type="number"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter height"
                            min="0"
                            step="0.01"
                            bind:value={height}
                        />
                    </div>
                {/if}
                <!-- Arc Inputs -->
                {#if selectedShape === "arc"}
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Radius</label
                        >
                        <input
                            type="number"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter radius"
                            min="0"
                            step="0.01"
                            bind:value={radius}
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Angle (degrees)</label
                        >
                        <input
                            type="number"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter angle (0-360)"
                            min="0"
                            max="360"
                            step="0.1"
                            bind:value={angle}
                        />
                    </div>
                {/if}
            </div>
            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 pt-2">
                <button
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={!hasAllRequiredValues}
                >
                    Calculate
                </button>
                <button
                    class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    type="button"
                    on:click={handleShapeChange}
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
                            Area
                        </div>
                        <div class="text-2xl font-bold text-gray-800">
                            {formatNumber(area)}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            square {selectedUnit}
                        </div>
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
    <!-- Additional Information Section -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-3">How it Works</h2>
        <div class="prose max-w-none text-gray-600">
            <p class="mb-4">
                Enter the required parameters for your chosen shape and unit.
                The calculator will compute the area instantly as you fill in
                the fields.
            </p>
            <ul class="list-disc pl-5 space-y-1 mb-4">
                <li>Rectangle: Area = Length × Width</li>
                <li>Triangle: Area = (Base × Height) / 2</li>
                <li>Arc: Area = (Angle / 360) × π × Radius²</li>
            </ul>
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
                            The calculator updates automatically as you change
                            values. Reset to clear all fields.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
