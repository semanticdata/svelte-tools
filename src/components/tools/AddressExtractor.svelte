<script lang="ts">
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

<div class="max-w-3xl mx-auto p-8">
  <header class="text-center mb-8">
    <h1 class="text-4xl text-gray-800 mb-2">Address Extractor</h1>
    <p class="text-lg text-gray-600">
      Extract and organize street addresses from any text
    </p>
  </header>

  <main>
    <div class="bg-white rounded-lg shadow-md p-8">
      <div class="mb-6">
        <label for="inputText" class="block font-semibold mb-2 text-gray-800"
          >Input Text</label
        >
        <textarea
          id="inputText"
          bind:value={inputText}
          placeholder="Paste your text containing addresses here..."
          spellcheck="false"
          class="w-full min-h-[150px] p-3 border border-gray-200 rounded-lg text-base leading-normal resize-y"
        ></textarea>
      </div>

      <div class="flex gap-4 mb-6">
        <button
          on:click={extractAddresses}
          class="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          <svg
            class="w-5 h-5"
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
          class="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-lg transition-colors"
        >
          <svg
            class="w-5 h-5"
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
          Clear
        </button>
      </div>

      {#if feedback}
        <div
          class="p-4 rounded-lg mb-6 {feedbackType === 'success'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'}"
        >
          {feedback}
        </div>
      {/if}

      <div class="mt-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl text-gray-800 m-0">Extracted Addresses</h2>
          <button
            on:click={copyAddresses}
            class="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5"
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
        </div>
        <ul class="list-none p-0 m-0">
          {#each addresses as address, index}
            <li
              class="flex gap-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              <span class="text-gray-500 min-w-[2rem]">{index + 1}.</span>
              <span>{address}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </main>
</div>
