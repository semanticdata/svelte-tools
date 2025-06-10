<script lang="ts">
  import ComponentContainer from "../utils/ComponentContainer.svelte";
  // No logic needed for placeholder
</script>

<ComponentContainer
  title="Placeholder Tool"
  description="Use this tool to test layouts and styles"
>
  <!-- Main Content -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <!-- Input Section -->
    <div class="space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        Input Parameters
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Text Input -->
        <div>
          <label
            for="text-input"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Text Input</label
          >
          <input
            id="text-input"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter text here"
          />
        </div>

        <!-- Select Dropdown -->
        <div>
          <label
            for="select-option"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Select Option</label
          >
          <select
            id="select-option"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <!-- Number Input -->
        <div>
          <label
            for="number-input"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Number Input</label
          >
          <input
            id="number-input"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        <!-- Toggle Switch -->
        <div class="flex items-center">
          <div class="mt-6">
            <label class="inline-flex items-center cursor-pointer">
              <input id="toggle-option" type="checkbox" class="sr-only peer" />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
              ></div>
              <label
                for="toggle-option"
                class="ml-3 text-sm font-medium text-gray-700"
                >Toggle Option</label
              >
            </label>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3 pt-2">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Primary Action
        </button>
        <button
          class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Secondary Action
        </button>
        <button
          class="px-4 py-2 text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Results Section -->
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Results</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Result Card 1 -->
        <div class="bg-white p-4 rounded-md border border-gray-200">
          <div class="text-sm font-medium text-gray-500">Result 1</div>
          <div class="text-2xl font-bold text-gray-800">123.45</div>
          <div class="text-xs text-gray-500 mt-1">units</div>
        </div>

        <!-- Result Card 2 -->
        <div class="bg-white p-4 rounded-md border border-gray-200">
          <div class="text-sm font-medium text-gray-500">Result 2</div>
          <div class="text-2xl font-bold text-gray-800">67.89</div>
          <div class="text-xs text-gray-500 mt-1">units</div>
        </div>

        <!-- Result Card 3 -->
        <div class="bg-white p-4 rounded-md border border-gray-200">
          <div class="text-sm font-medium text-gray-500">Result 3</div>
          <div class="text-2xl font-bold text-gray-800">42.01</div>
          <div class="text-xs text-gray-500 mt-1">units</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Additional Information Section -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-3">
      Additional Information
    </h2>
    <div class="prose max-w-none text-gray-600">
      <p class="mb-4">
        This is a placeholder component for layout and styling purposes. You can
        use it to test different UI elements and their arrangements.
      </p>

      <h3 class="text-md font-semibold text-gray-800 mt-4 mb-2">Sample List</h3>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li>List item 1</li>
        <li>List item 2 with a bit longer text to test wrapping</li>
        <li>List item 3</li>
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
              This is an informational message. It can be used to provide
              additional context or helpful tips.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</ComponentContainer>
