<script lang="ts">
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
      error = e.message;
      matches = null;
    }
  }
</script>

<div class="bg-white rounded-lg shadow-sm p-6 h-full">
  <h2 class="text-xl font-semibold text-gray-800 mb-4">
    Regular Expression Tester
  </h2>

  <div class="space-y-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="md:col-span-3">
        <label for="pattern" class="form-label">Pattern</label>
        <input
          id="pattern"
          type="text"
          bind:value={pattern}
          placeholder="Enter regex pattern"
          class="form-input"
        />
      </div>
      <div>
        <label for="flags" class="form-label">Flags</label>
        <input
          id="flags"
          type="text"
          bind:value={flags}
          placeholder="g"
          class="form-input"
        />
      </div>
    </div>

    <div>
      <label for="testString" class="form-label">Test String</label>
      <textarea
        id="testString"
        bind:value={testString}
        placeholder="Enter text to test against the pattern"
        rows="4"
        class="form-input"
      ></textarea>
    </div>
  </div>

  <div class="results-section">
    <h3 class="text-lg font-semibold text-gray-700 mb-3">Results</h3>
    {#if error}
      <p class="feedback feedback-error">{error}</p>
    {:else if matches}
      <p class="feedback feedback-success">
        Found {matches.length} match{matches.length === 1 ? "" : "es"}
      </p>
      <div class="mt-2 space-y-1">
        {#each matches as match}
          <div class="results-content">{match}</div>
        {/each}
      </div>
    {:else if pattern}
      <p class="feedback feedback-info">No matches found</p>
    {:else}
      <p class="feedback feedback-info">Enter a pattern to see results</p>
    {/if}
  </div>

  <div class="feedback feedback-info">
    <h4 class="font-semibold mb-2">Instructions:</h4>
    <p>Enter a regular expression pattern and test string to find matches.</p>
    <p>Common flags: g (global), i (case-insensitive), m (multiline)</p>
  </div>
</div>

<style lang="postcss">
  :global(html) {
    scroll-behavior: smooth;
  }

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }

  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }

  .form-select {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white;
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

  .form-checkbox {
    @apply flex items-center cursor-pointer;
  }

  .form-checkbox input[type="checkbox"] {
    @apply h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded;
  }

  .form-checkbox span {
    @apply ml-2 text-gray-700;
  }

  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors;
  }

  .results-section {
    @apply bg-gray-50 p-4 rounded-md mb-6;
  }

  .results-content {
    @apply bg-white p-2 rounded border border-gray-200;
  }

  .feedback {
    @apply p-3 rounded-md text-sm mb-4;
  }

  .feedback-info {
    @apply bg-blue-50 text-blue-800;
  }

  .feedback-success {
    @apply bg-green-50 text-green-800;
  }

  .feedback-warning {
    @apply bg-yellow-50 text-yellow-800;
  }

  .feedback-error {
    @apply bg-red-50 text-red-800;
  }
</style>
