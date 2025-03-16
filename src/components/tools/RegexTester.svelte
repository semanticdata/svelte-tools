<script lang="ts">
  let pattern = "";
  let flags = "g";
  let testString = "";
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

<div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4">
  <h2 class="text-2xl font-bold text-gray-800 mb-6">Regular Expression Tester</h2>

  <div class="space-y-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="md:col-span-3">
        <label for="pattern" class="block text-sm font-medium text-gray-700">Pattern</label>
        <input
          id="pattern"
          type="text"
          bind:value={pattern}
          placeholder="Enter regex pattern"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label for="flags" class="block text-sm font-medium text-gray-700">Flags</label>
        <input
          id="flags"
          type="text"
          bind:value={flags}
          placeholder="g"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>

    <div>
      <label for="testString" class="block text-sm font-medium text-gray-700">Test String</label>
      <textarea
        id="testString"
        bind:value={testString}
        placeholder="Enter text to test against the pattern"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      ></textarea>
    </div>
  </div>

  <div class="bg-gray-50 p-4 rounded-md mb-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-3">Results</h3>
    {#if error}
      <p class="text-red-600">{error}</p>
    {:else if matches}
      <p class="text-green-600">Found {matches.length} match{matches.length === 1 ? '' : 'es'}</p>
      <div class="mt-2 space-y-1">
        {#each matches as match}
          <div class="bg-white p-2 rounded border border-gray-200">{match}</div>
        {/each}
      </div>
    {:else if pattern}
      <p class="text-gray-600">No matches found</p>
    {:else}
      <p class="text-gray-600">Enter a pattern to see results</p>
    {/if}
  </div>

  <div class="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
    <h4 class="font-semibold mb-2">Instructions:</h4>
    <p>Enter a regular expression pattern and test string to find matches.</p>
    <p>Common flags: g (global), i (case-insensitive), m (multiline)</p>
  </div>
</div>
