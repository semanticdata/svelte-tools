<script lang="ts">
  import ComponentContainer from "../utils/ComponentContainer.svelte";

  let pattern = "[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
  let flags = "g";
  let testString = `Valid emails:
john.doe@example.com
mary_smith123@company.co.uk

Invalid emails:
invalid@email
@incomplete.com
missing.domain@
just.text`;
  let error = "";
  let matches: RegExpMatchArray | null = null;

  $: {
    try {
      error = "";
      if (pattern) {
        const regex = new RegExp(pattern, flags);
        matches = testString.match(regex);
      } else {
        matches = null;
      }
    } catch (e) {
      error = (e as Error).message;
      matches = null;
    }
  }
</script>

<ComponentContainer
  title="Regular Expression Tester"
  description="Test and validate regular expressions with real-time matching results"
>
  <div class="space-y-6">
    <!-- Input Parameters -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        Input Parameters
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-1">
          <label
            for="pattern"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Pattern
          </label>
          <input
            id="pattern"
            type="text"
            bind:value={pattern}
            placeholder="Enter regex pattern"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            for="flags"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Flags
          </label>
          <input
            id="flags"
            type="text"
            bind:value={flags}
            placeholder="g, i, m"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          for="testString"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Test String
        </label>
        <textarea
          id="testString"
          bind:value={testString}
          placeholder="Enter text to test against the pattern"
          rows="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
    </div>

    <!-- Error Message -->
    {#if error}
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
            <h3 class="text-sm font-medium text-red-800">
              Invalid Regular Expression
            </h3>
            <p class="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Results Section -->
    <div class="space-y-6">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">Results</h2>

      {#if !error}
        <!-- Summary Card -->
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Match Summary</h3>
          {#if matches && matches.length > 0}
            <p class="text-2xl font-bold text-green-600">{matches.length}</p>
            <p class="text-sm text-gray-500 mt-1">
              Match{matches.length === 1 ? "" : "es"} found
            </p>
          {:else if pattern}
            <p class="text-2xl font-bold text-gray-400">0</p>
            <p class="text-sm text-gray-500 mt-1">No matches found</p>
          {:else}
            <p class="text-2xl font-bold text-gray-400">-</p>
            <p class="text-sm text-gray-500 mt-1">Enter a pattern to test</p>
          {/if}
        </div>

        <!-- Matches Display -->
        {#if matches && matches.length > 0}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700 border-b pb-2">
              Matches ({matches.length})
            </h3>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              {#each matches as match, index}
                <div class="bg-green-50 border border-green-200 p-3 rounded-md">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <span
                        class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 text-xs font-medium"
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div class="ml-3 flex-1">
                      <p
                        class="text-sm font-medium text-green-800 font-mono break-all"
                      >
                        {match}
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {/if}
    </div>

    <!-- Additional Information Section -->
    <div class="space-y-6 mt-8">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        How it works
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-medium text-blue-900 mb-2">Pattern Matching</h3>
          <p class="text-sm text-blue-700">
            Enter a regular expression pattern to search for specific text
            patterns in your test string
          </p>
        </div>

        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="font-medium text-green-900 mb-2">Real-time Testing</h3>
          <p class="text-sm text-green-700">
            Results update automatically as you modify the pattern or test
            string
          </p>
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2">Common Flags:</h4>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>
            <strong>g</strong> - Global: Find all matches, not just the first one
          </li>
          <li>
            <strong>i</strong> - Case-insensitive: Ignore case when matching
          </li>
          <li>
            <strong>m</strong> - Multiline: ^ and $ match start/end of each line
          </li>
          <li><strong>s</strong> - Dotall: . matches newline characters</li>
        </ul>
      </div>
    </div>
  </div>
</ComponentContainer>
