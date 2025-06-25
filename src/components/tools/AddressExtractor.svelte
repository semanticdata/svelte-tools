<script lang="ts">
  import ComponentContainer from "../utils/ComponentContainer.svelte";

  let inputText = "";
  let addresses: string[] = [];
  let feedback = "";
  let feedbackType = "";

  function extractAddresses() {
    if (!inputText.trim()) {
      feedback = "Please enter some text to extract addresses from.";
      feedbackType = "error";
      return;
    }

    // First, replace common separators with newlines to treat addresses separately
    const normalizedText = inputText
      .replace(/\s+and\s+/gi, "\n")
      .replace(/,\s*/g, "\n")
      .replace(/;\s*/g, "\n");

    const addressRegex =
      /\d+(?:-\d+)?\s+(?:[A-Za-z0-9\.']+\s?)+(?:Avenue|Ave|Street|St|Drive|Dr|Road|Rd|Boulevard|Blvd|Lane|Ln|Place|Pl|Court|Ct|Circle|Cir|Way|Parkway|Pkwy|Highway|Hwy)(?:\s+[A-Za-z]+)?(?:\s+(?:North|South|East|West|N|S|E|W))?/gi;

    const lines = normalizedText.split("\n");
    const foundAddresses: string[] = [];

    lines.forEach((line) => {
      const matchedAddresses = line.match(addressRegex);
      if (matchedAddresses) {
        foundAddresses.push(...matchedAddresses);
      }
    });

    if (foundAddresses.length === 0) {
      feedback = "No addresses found in the input text.";
      feedbackType = "error";
      addresses = [];
    } else {
      addresses = foundAddresses.sort();
      feedback = `Found ${addresses.length} address${addresses.length === 1 ? "" : "es"}.`;
      feedbackType = "success";
    }
  }

  function clearAll() {
    inputText = "";
    addresses = [];
    feedback = "";
    feedbackType = "";
  }

  async function copyAddresses() {
    if (!addresses.length) {
      feedback = "No addresses to copy.";
      feedbackType = "error";
      return;
    }

    try {
      await navigator.clipboard.writeText(addresses.join("\n"));
      feedback = "Addresses copied to clipboard!";
      feedbackType = "success";
    } catch (err) {
      feedback = "Failed to copy addresses. Please try again.";
      feedbackType = "error";
      console.error("Copy failed:", err);
    }
  }
</script>

<ComponentContainer
  title="Address Extractor"
  description="Extract and organize street addresses from any text using pattern recognition"
>
  <div class="space-y-6">
    <!-- Input Parameters -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        Input Parameters
      </h2>

      <div>
        <label
          for="inputText"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Text to Analyze
        </label>
        <textarea
          id="inputText"
          bind:value={inputText}
          placeholder="Paste your text containing addresses here..."
          spellcheck="false"
          rows="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3">
      <button
        on:click={extractAddresses}
        class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Extract Addresses
      </button>

      <button
        on:click={clearAll}
        class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Clear All
      </button>

      {#if addresses.length > 0}
        <button
          on:click={copyAddresses}
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          Copy All
        </button>
      {/if}
    </div>

    <!-- Error/Success Message -->
    {#if feedback && feedbackType === "error"}
      <div
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
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
            <p class="text-sm text-red-700">{feedback}</p>
          </div>
        </div>
      </div>
    {:else if feedback && feedbackType === "success"}
      <div
        class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">{feedback}</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Results Section -->
    <div class="space-y-6">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">Results</h2>

      <!-- Summary Card -->
      <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 class="text-sm font-medium text-gray-500 mb-1">Addresses Found</h3>
        <p class="text-2xl font-bold text-blue-600">{addresses.length}</p>
        <p class="text-sm text-gray-500 mt-1">
          {addresses.length === 0
            ? "No addresses extracted yet"
            : addresses.length === 1
              ? "Address extracted"
              : "Addresses extracted"}
        </p>
      </div>

      <!-- Extracted Addresses -->
      {#if addresses.length > 0}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700 border-b pb-2">
            Extracted Addresses ({addresses.length})
          </h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            {#each addresses as address, index}
              <div class="bg-blue-50 border border-blue-200 p-3 rounded-md">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <span
                      class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium"
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-blue-800">{address}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="text-center py-8 text-gray-500">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p class="mt-2 text-sm">No addresses extracted yet</p>
          <p class="text-xs text-gray-400">
            Enter text and click "Extract Addresses" to begin
          </p>
        </div>
      {/if}
    </div>

    <!-- Additional Information Section -->
    <div class="space-y-6 mt-8">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        How it works
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-medium text-blue-900 mb-2">Pattern Recognition</h3>
          <p class="text-sm text-blue-700">
            Uses advanced regex patterns to identify street addresses with
            numbers, street names, and common suffixes
          </p>
        </div>

        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="font-medium text-green-900 mb-2">Text Normalization</h3>
          <p class="text-sm text-green-700">
            Automatically handles common separators and formats to improve
            extraction accuracy
          </p>
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2">
          Supported Address Formats:
        </h4>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>• Standard street addresses (e.g., "123 Main Street")</li>
          <li>• Common abbreviations (St, Ave, Dr, Rd, Blvd, etc.)</li>
          <li>• Directional indicators (North, South, East, West)</li>
          <li>• Address ranges (e.g., "123-125 Oak Avenue")</li>
        </ul>
      </div>
    </div>
  </div>
</ComponentContainer>
