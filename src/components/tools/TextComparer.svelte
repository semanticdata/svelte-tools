<script>
    import { onMount } from "svelte";
    import ComponentContainer from "../utils/ComponentContainer.svelte";

    let text1 = "";
    let text2 = "";
    let diffResult = [];
    let isProcessing = false;
    let textsAreIdentical = false;

    // Processed arrays for side-by-side display
    let leftLines = [];
    let rightLines = [];

    // Function to compute the differences between two texts
    function computeDiff() {
        isProcessing = true;
        textsAreIdentical = false;

        // Split the texts into lines
        const lines1 = text1.split("\n");
        const lines2 = text2.split("\n");

        // Check if texts are identical before processing
        if (text1 === text2) {
            textsAreIdentical = true;
            diffResult = lines1.map((line, index) => ({
                text: line,
                type: "unchanged",
                line1: index + 1,
                line2: index + 1,
            }));

            // Set up side-by-side display
            leftLines = lines1.map((line, index) => ({
                text: line,
                type: "unchanged",
                lineNum: index + 1,
            }));

            rightLines = lines2.map((line, index) => ({
                text: line,
                type: "unchanged",
                lineNum: index + 1,
            }));

            isProcessing = false;
            return;
        }

        // Simple diff algorithm
        diffResult = [];

        // Create a map of lines from text1 for quick lookup
        const text1Map = new Map();
        lines1.forEach((line, index) => {
            text1Map.set(line, index);
        });

        // Track which lines from text1 have been matched
        const matchedLines1 = new Set();

        // First pass: find exact matches and additions
        lines2.forEach((line, index) => {
            if (text1Map.has(line)) {
                // Line exists in both texts
                const originalIndex = text1Map.get(line);
                diffResult.push({
                    text: line,
                    type: "unchanged",
                    line1: originalIndex + 1,
                    line2: index + 1,
                });
                matchedLines1.add(originalIndex);
            } else {
                // Line only exists in text2
                diffResult.push({
                    text: line,
                    type: "added",
                    line1: null,
                    line2: index + 1,
                });
            }
        });

        // Second pass: find deletions (lines in text1 that weren't matched)
        lines1.forEach((line, index) => {
            if (!matchedLines1.has(index)) {
                // Find the right position to insert the deletion
                let insertPos = 0;
                while (
                    insertPos < diffResult.length &&
                    (diffResult[insertPos].line1 === null ||
                        diffResult[insertPos].line1 < index + 1)
                ) {
                    insertPos++;
                }

                diffResult.splice(insertPos, 0, {
                    text: line,
                    type: "removed",
                    line1: index + 1,
                    line2: null,
                });
            }
        });

        // Check if all lines are unchanged (texts might be identical but with different line breaks)
        textsAreIdentical = diffResult.every(
            (item) => item.type === "unchanged",
        );

        // Process diffResult for side-by-side display
        processForSideBySide();

        isProcessing = false;
    }

    // Process the diff result for side-by-side display
    function processForSideBySide() {
        leftLines = [];
        rightLines = [];

        // Simply process the diffResult directly
        diffResult.forEach((item) => {
            if (item.type === "unchanged") {
                // Line exists in both texts
                leftLines.push({
                    text: item.text,
                    type: "unchanged",
                    lineNum: item.line1,
                });

                rightLines.push({
                    text: item.text,
                    type: "unchanged",
                    lineNum: item.line2,
                });
            } else if (item.type === "added") {
                // Line only exists in text2
                leftLines.push({
                    text: "",
                    type: "empty",
                    lineNum: null,
                });

                rightLines.push({
                    text: item.text,
                    type: "added",
                    lineNum: item.line2,
                });
            } else if (item.type === "removed") {
                // Line only exists in text1
                leftLines.push({
                    text: item.text,
                    type: "removed",
                    lineNum: item.line1,
                });

                rightLines.push({
                    text: "",
                    type: "empty",
                    lineNum: null,
                });
            }
        });
    }

    // Clear both text areas and the diff result
    function clearAll() {
        text1 = "";
        text2 = "";
        diffResult = [];
        leftLines = [];
        rightLines = [];
        textsAreIdentical = false;
    }

    // Copy the diff result as text
    function copyDiffResult() {
        const diffText = diffResult
            .map((item) => {
                const prefix =
                    item.type === "unchanged"
                        ? "  "
                        : item.type === "added"
                          ? "+ "
                          : "- ";
                return prefix + item.text;
            })
            .join("\n");

        navigator.clipboard
            .writeText(diffText)
            .then(() => {
                alert("Diff result copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    }
</script>

<ComponentContainer
    title="Text Comparer"
    description="Compare two texts and see the differences side by side"
>
    <!-- Main Content -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <!-- Input Section -->
        <div class="space-y-4 mb-6">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                Input Parameters
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Original Text -->
                <div>
                    <label
                        for="text1"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Original Text
                    </label>
                    <textarea
                        id="text1"
                        bind:value={text1}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-64 resize-none"
                        placeholder="Enter the original text here..."
                    ></textarea>
                </div>

                <!-- Modified Text -->
                <div>
                    <label
                        for="text2"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Modified Text
                    </label>
                    <textarea
                        id="text2"
                        bind:value={text2}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-64 resize-none"
                        placeholder="Enter the modified text here..."
                    ></textarea>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 pt-2">
                <button
                    on:click={computeDiff}
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isProcessing || !text1.trim() || !text2.trim()}
                >
                    {isProcessing ? "Processing..." : "Compare Texts"}
                </button>

                <button
                    on:click={clearAll}
                    class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Clear All
                </button>

                <button
                    on:click={copyDiffResult}
                    class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={diffResult.length === 0}
                >
                    Copy Result
                </button>
            </div>
        </div>

        <!-- Results Section -->
        {#if diffResult.length > 0}
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h2 class="text-lg font-semibold text-gray-700 mb-3">
                    Comparison Results
                </h2>

                {#if textsAreIdentical}
                    <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
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
                                <p class="text-sm text-blue-700 font-medium">
                                    The texts are identical! No differences
                                    found.
                                </p>
                            </div>
                        </div>
                    </div>
                {:else}
                    <div
                        class="bg-white rounded-md border border-gray-200 overflow-hidden"
                    >
                        <div class="grid grid-cols-2 divide-x divide-gray-300">
                            <!-- Headers -->
                            <div
                                class="p-3 font-medium text-gray-700 bg-gray-100 border-b border-gray-200"
                            >
                                Original Text
                            </div>
                            <div
                                class="p-3 font-medium text-gray-700 bg-gray-100 border-b border-gray-200"
                            >
                                Modified Text
                            </div>

                            <!-- Content -->
                            <div
                                class="text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto"
                            >
                                {#each leftLines as line}
                                    <div
                                        class="flex border-b border-gray-100 last:border-b-0"
                                    >
                                        <div
                                            class="w-10 flex-shrink-0 text-right pr-2 py-1 text-gray-500 border-r border-gray-200 bg-gray-50"
                                        >
                                            {line.lineNum || " "}
                                        </div>
                                        <div
                                            class="p-2 w-full {line.type ===
                                            'unchanged'
                                                ? 'bg-white'
                                                : line.type === 'removed'
                                                  ? 'bg-red-50'
                                                  : 'bg-gray-50'}"
                                        >
                                            {line.text || " "}
                                        </div>
                                    </div>
                                {/each}
                            </div>

                            <div
                                class="text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto"
                            >
                                {#each rightLines as line}
                                    <div
                                        class="flex border-b border-gray-100 last:border-b-0"
                                    >
                                        <div
                                            class="w-10 flex-shrink-0 text-right pr-2 py-1 text-gray-500 border-r border-gray-200 bg-gray-50"
                                        >
                                            {line.lineNum || " "}
                                        </div>
                                        <div
                                            class="p-2 w-full {line.type ===
                                            'unchanged'
                                                ? 'bg-white'
                                                : line.type === 'added'
                                                  ? 'bg-green-50'
                                                  : 'bg-gray-50'}"
                                        >
                                            {line.text || " "}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    <!-- Additional Information Section -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-3">
            How Text Comparison Works
        </h2>
        <div class="prose max-w-none text-gray-600">
            <p class="mb-4">
                This tool compares two texts line by line and highlights the
                differences between them. It uses a simple diff algorithm to
                identify added, removed, and unchanged lines.
            </p>

            <h3 class="text-md font-semibold text-gray-800 mt-4 mb-2">
                Color Legend
            </h3>
            <ul class="list-disc pl-5 space-y-1 mb-4">
                <li>
                    <span
                        class="inline-block w-4 h-4 bg-green-50 border border-green-200 rounded mr-2"
                    ></span>Green background: Added lines
                </li>
                <li>
                    <span
                        class="inline-block w-4 h-4 bg-red-50 border border-red-200 rounded mr-2"
                    ></span>Red background: Removed lines
                </li>
                <li>
                    <span
                        class="inline-block w-4 h-4 bg-white border border-gray-200 rounded mr-2"
                    ></span>White background: Unchanged lines
                </li>
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
                            The comparison is performed line by line. For more
                            complex diff operations, consider using specialized
                            tools that can handle word-level or character-level
                            differences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</ComponentContainer>
