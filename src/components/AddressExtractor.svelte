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

{#if true}
    <div class="container">
        <header class="app-header">
            <h1 class="app-title">Address Extractor</h1>
            <p class="app-description">
                Extract and organize street addresses from any text
            </p>
        </header>

        <main>
            <div class="card">
                <div class="input-group">
                    <label for="inputText" class="input-label">Input Text</label
                    >
                    <textarea
                        id="inputText"
                        bind:value={inputText}
                        placeholder="Paste your text containing addresses here..."
                        spellcheck="false"
                    />
                </div>

                <div class="button-group">
                    <button on:click={extractAddresses} class="primary-button">
                        <svg
                            width="20"
                            height="20"
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
                    <button on:click={clearAll} class="secondary-button">
                        <svg
                            width="20"
                            height="20"
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
                    <div class="feedback {feedbackType}">{feedback}</div>
                {/if}

                <div class="results-container">
                    <div class="results-header">
                        <h2 class="results-title">Extracted Addresses</h2>
                        <button
                            on:click={copyAddresses}
                            class="secondary-button"
                        >
                            <svg
                                width="20"
                                height="20"
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
                    <ul class="address-list">
                        {#each addresses as address, index}
                            <li class="address-item">
                                <span class="address-number">{index + 1}.</span>
                                <span>{address}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </main>
    </div>
{/if}

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .app-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .app-title {
        font-size: 2.5rem;
        color: #2d3748;
        margin-bottom: 0.5rem;
    }

    .app-description {
        color: #4a5568;
        font-size: 1.1rem;
    }

    .card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 2rem;
    }

    .input-group {
        margin-bottom: 1.5rem;
    }

    .input-label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #2d3748;
    }

    textarea {
        width: 100%;
        min-height: 150px;
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 1rem;
        line-height: 1.5;
        resize: vertical;
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .primary-button {
        background-color: #4299e1;
        color: white;
    }

    .primary-button:hover {
        background-color: #3182ce;
    }

    .secondary-button {
        background-color: #edf2f7;
        color: #4a5568;
    }

    .secondary-button:hover {
        background-color: #e2e8f0;
    }

    .feedback {
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1.5rem;
    }

    .feedback.success {
        background-color: #c6f6d5;
        color: #2f855a;
    }

    .feedback.error {
        background-color: #fed7d7;
        color: #c53030;
    }

    .results-container {
        margin-top: 2rem;
    }

    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .results-title {
        font-size: 1.5rem;
        color: #2d3748;
        margin: 0;
    }

    .address-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .address-item {
        display: flex;
        gap: 1rem;
        padding: 0.75rem;
        border-bottom: 1px solid #e2e8f0;
    }

    .address-item:last-child {
        border-bottom: none;
    }

    .address-number {
        color: #718096;
        min-width: 2rem;
    }
</style>
