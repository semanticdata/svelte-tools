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
      error = (e as Error).message;
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
