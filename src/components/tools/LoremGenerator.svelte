<script>
  import { onMount } from "svelte";

  // State variables
  let paragraphCount = 3;
  let generatedText = "";
  let copySuccess = false;
  let copyTimeout;

  // Lorem ipsum paragraphs
  const loremParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    "Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Maecenas condimentum, sem quis lacinia porttitor, orci magna rhoncus sapien, at semper ipsum metus nec urna. Cras ornare elementum sapien, a dignissim nisi posuere eu.",
    "Fusce sagittis, libero non molestie mollis, magna orci ultrices dolor, at vulputate neque nulla lacinia eros. Sed id ligula quis est convallis tempor. Curabitur lacinia pulvinar nibh. Nam a sapien. Aliquam erat volutpat. Vestibulum dui ante, semper quis, commodo eu, tempor non, felis. Fusce aliquam vestibulum ipsum. Nulla quis diam. Nulla pulvinar eleifend sem.",
    "Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Nam sed tellus id magna elementum tincidunt. Suspendisse nisl. Vivamus luctus egestas leo. Nulla non arcu lacinia neque faucibus fringilla. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Etiam dictum tincidunt diam. Etiam commodo dui eget wisi.",
    "Nullam rhoncus aliquam metus. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Fusce aliquam vestibulum ipsum. Aliquam erat volutpat. Pellentesque sapien. Cras elementum. Nulla pulvinar eleifend sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat.",
    "Duis condimentum augue id magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Duis pulvinar. Etiam commodo dui eget wisi. Maecenas libero. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  ];

  // Generate lorem ipsum text based on paragraph count
  function generateLorem() {
    let result = [];

    // Get random paragraphs from the array
    for (let i = 0; i < paragraphCount; i++) {
      const randomIndex = Math.floor(Math.random() * loremParagraphs.length);
      result.push(loremParagraphs[randomIndex]);
    }

    generatedText = result.join("\n\n");
  }

  // Copy text to clipboard
  function copyToClipboard() {
    navigator.clipboard
      .writeText(generatedText)
      .then(() => {
        copySuccess = true;

        // Clear previous timeout if exists
        if (copyTimeout) clearTimeout(copyTimeout);

        // Reset success message after 2 seconds
        copyTimeout = setTimeout(() => {
          copySuccess = false;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  // Generate initial text on component mount
  onMount(() => {
    generateLorem();
  });
</script>

<div class="bg-white rounded-lg shadow-sm p-6 h-full">
  <h2 class="text-xl font-semibold text-gray-800 mb-4">
    Lorem Ipsum Generator
  </h2>

  <div class="mb-6">
    <label for="paragraphCount" class="form-label">
      Number of Paragraphs
    </label>
    <div class="flex items-center">
      <input
        type="range"
        id="paragraphCount"
        bind:value={paragraphCount}
        min="1"
        max="10"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span class="ml-3 text-gray-700 font-medium">{paragraphCount}</span>
    </div>
  </div>

  <div class="flex space-x-4 mb-6">
    <button on:click={generateLorem} class="btn-primary"> Generate </button>

    <button on:click={copyToClipboard} class="btn-secondary flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      {copySuccess ? "Copied!" : "Copy Text"}
    </button>
  </div>

  {#if copySuccess}
    <div class="feedback feedback-success">Text copied to clipboard!</div>
  {/if}

  <div class="results-section">
    <div class="max-h-96 overflow-y-auto">
      {#each generatedText.split("\n\n") as paragraph}
        <p class="mb-4 text-gray-700 last:mb-0">{paragraph}</p>
      {/each}
    </div>
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
    @apply text-lg font-medium text-gray-900;
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
