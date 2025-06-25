<script>
  import { onMount } from "svelte";
  import ComponentContainer from "../utils/ComponentContainer.svelte";

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

<ComponentContainer
  title="Lorem Ipsum Generator"
  description="Generate placeholder text for your designs and layouts"
>
  <!-- Main Content -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <!-- Input Section -->
    <div class="space-y-4 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
        Input Parameters
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Paragraph Count Slider -->
        <div class="md:col-span-2">
          <label
            for="paragraphCount"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Paragraphs
          </label>
          <div class="flex items-center space-x-4">
            <input
              type="range"
              id="paragraphCount"
              bind:value={paragraphCount}
              min="1"
              max="10"
              class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-700 font-medium min-w-[2rem] text-center"
              >{paragraphCount}</span
            >
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3 pt-2">
        <button
          on:click={generateLorem}
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Lorem Ipsum
        </button>
        <button
          on:click={copyToClipboard}
          class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          disabled={!generatedText}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
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
    </div>

    <!-- Feedback Messages -->
    {#if copySuccess}
      <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
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
            <p class="text-sm text-green-700">
              Text copied to clipboard successfully!
            </p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Results Section -->
    {#if generatedText}
      <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-700 mb-3">Generated Text</h2>
        <div
          class="bg-white rounded-md border border-gray-200 p-4 max-h-96 overflow-y-auto"
        >
          {#each generatedText.split("\n\n") as paragraph, index}
            <p
              class="mb-4 text-gray-700 leading-relaxed {index ===
              generatedText.split('\n\n').length - 1
                ? 'mb-0'
                : ''}"
            >
              {paragraph}
            </p>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Additional Information Section -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-3">About Lorem Ipsum</h2>
    <div class="prose max-w-none text-gray-600">
      <p class="mb-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. It has been the industry's standard dummy text ever since the
        1500s.
      </p>

      <h3 class="text-md font-semibold text-gray-800 mt-4 mb-2">Common Uses</h3>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li>Website and app mockups</li>
        <li>Print design layouts</li>
        <li>Content management system testing</li>
        <li>Typography and font testing</li>
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
              Lorem Ipsum is not simply random text. It has roots in a piece of
              classical Latin literature from 45 BC, making it over 2000 years
              old.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</ComponentContainer>
