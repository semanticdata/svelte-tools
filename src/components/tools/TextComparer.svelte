<script>
    import { onMount } from "svelte";

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

<div class="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md my-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Text Comparer</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
            <label
                for="text1"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Original Text</label
            >
            <textarea
                id="text1"
                bind:value={text1}
                class="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the original text here..."
            ></textarea>
        </div>

        <div>
            <label
                for="text2"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Modified Text</label
            >
            <textarea
                id="text2"
                bind:value={text2}
                class="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the modified text here..."
            ></textarea>
        </div>
    </div>

    <div class="flex justify-center space-x-4 mb-6">
        <button
            on:click={computeDiff}
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            disabled={isProcessing || !text1.trim() || !text2.trim()}
        >
            {isProcessing ? "Processing..." : "Compare Texts"}
        </button>

        <button
            on:click={clearAll}
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
            Clear All
        </button>

        <button
            on:click={copyDiffResult}
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            disabled={diffResult.length === 0}
        >
            Copy Result
        </button>
    </div>

    {#if diffResult.length > 0}
        {#if textsAreIdentical}
            <div
                class="mb-4 p-4 bg-blue-100 text-blue-800 rounded-md flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span class="font-medium"
                    >The texts are identical! No differences found.</span
                >
            </div>
        {:else}
            <div
                class="border border-gray-300 rounded-md bg-gray-50 overflow-x-auto"
            >
                <div class="grid grid-cols-2 divide-x divide-gray-300">
                    <!-- Headers -->
                    <div class="p-2 font-medium text-gray-700 bg-gray-200">
                        Original Text
                    </div>
                    <div class="p-2 font-medium text-gray-700 bg-gray-200">
                        Modified Text
                    </div>

                    <!-- Content -->
                    <div class="text-sm font-mono whitespace-pre-wrap">
                        {#each leftLines as line}
                            <div class="flex border-b border-gray-200">
                                <div
                                    class="w-8 flex-shrink-0 text-right pr-2 text-gray-500 border-r border-gray-300"
                                >
                                    {line.lineNum || " "}
                                </div>
                                <div
                                    class="p-1 w-full {line.type === 'unchanged'
                                        ? 'bg-white'
                                        : line.type === 'removed'
                                          ? 'bg-red-100'
                                          : 'bg-gray-100'}"
                                >
                                    {line.text}
                                </div>
                            </div>
                        {/each}
                    </div>

                    <div class="text-sm font-mono whitespace-pre-wrap">
                        {#each rightLines as line}
                            <div class="flex border-b border-gray-200">
                                <div
                                    class="w-8 flex-shrink-0 text-right pr-2 text-gray-500 border-r border-gray-300"
                                >
                                    {line.lineNum || " "}
                                </div>
                                <div
                                    class="p-1 w-full {line.type === 'unchanged'
                                        ? 'bg-white'
                                        : line.type === 'added'
                                          ? 'bg-green-100'
                                          : 'bg-gray-100'}"
                                >
                                    {line.text}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    {/if}

    {#if diffResult.length === 0 && text1.trim() && text2.trim()}
        <div class="p-4 bg-gray-100 text-gray-600 rounded-md text-center">
            Click "Compare Texts" to see the differences.
        </div>
    {/if}
</div>
