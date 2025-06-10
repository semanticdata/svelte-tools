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

<div class="tool-container">
    <!-- Header Section -->
    <header class="tool-header">
        <h1 class="text-3xl font-bold text-gray-900">Text Comparer</h1>
        <p class="mt-2 text-gray-600">
            Compare two texts and see the differences.
        </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
            <label for="text1" class="form-label">Original Text</label>
            <textarea
                id="text1"
                bind:value={text1}
                class="form-input h-64"
                placeholder="Enter the original text here..."
            ></textarea>
        </div>

        <div>
            <label for="text2" class="form-label">Modified Text</label>
            <textarea
                id="text2"
                bind:value={text2}
                class="form-input h-64"
                placeholder="Enter the modified text here..."
            ></textarea>
        </div>
    </div>

    <div class="flex justify-center space-x-4 mb-6">
        <button
            on:click={computeDiff}
            class="btn-primary"
            disabled={isProcessing || !text1.trim() || !text2.trim()}
        >
            {isProcessing ? "Processing..." : "Compare Texts"}
        </button>

        <button on:click={clearAll} class="btn-secondary"> Clear All </button>

        <button
            on:click={copyDiffResult}
            class="btn-primary"
            disabled={diffResult.length === 0}
        >
            Copy Result
        </button>
    </div>

    {#if diffResult.length > 0}
        <div class="results-section">
            {#if textsAreIdentical}
                <div class="feedback feedback-info flex items-center">
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
                                        class="p-1 w-full {line.type ===
                                        'unchanged'
                                            ? 'bg-white'
                                            : line.type === 'removed'
                                              ? 'bg-red-100' // Use Tailwind red-100 for removed lines
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
                                        class="p-1 w-full {line.type ===
                                        'unchanged'
                                            ? 'bg-white'
                                            : line.type === 'added'
                                              ? 'bg-green-100' // Use Tailwind green-100 for added lines
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
        </div>

        {#if diffResult.length === 0 && text1.trim() && text2.trim()}
            <div class="feedback feedback-info text-center">
                Click "Compare Texts" to see the differences.
            </div>
        {/if}
    {/if}
</div>
