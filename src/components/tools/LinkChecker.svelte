<script>
    import ComponentContainer from "../utils/ComponentContainer.svelte";
    import { onMount } from "svelte";
    import axios from "axios";

    let url = "";
    let isLoading = false;
    let results = null;
    let useMockData = false;

    // Mock data for testing
    const mockUrls = [
        "https://www.example.com",
        "https://www.nonexistentwebsite.com",
        "https://www.google.com",
    ];

    function mockCheckLinks() {
        // Simulate checking links with mock data
        const workingLinks = [];
        const brokenLinks = [];

        mockUrls.forEach((link) => {
            if (link === "https://www.nonexistentwebsite.com") {
                brokenLinks.push(link);
            } else {
                workingLinks.push({ url: link, text: "Link is reachable" });
            }
        });

        return { workingLinks, brokenLinks };
    }

    function extractUrls(html, baseUrl) {
        console.log("Extracting URLs from HTML content...");

        const urlRegex = /href="(http[s]?:\/\/[^"]+|\/[^"]+)"/g;
        const urls = [];
        let match;

        while ((match = urlRegex.exec(html)) !== null) {
            let extractedUrl = match[1];
            // Convert relative URLs to absolute URLs
            if (extractedUrl.startsWith("/")) {
                extractedUrl = new URL(extractedUrl, baseUrl).href; // Create absolute URL
            }
            console.log(`Found URL: ${extractedUrl}`);
            urls.push(extractedUrl);
        }

        console.log(`Total URLs extracted: ${urls.length}`);
        return urls;
    }

    async function checkLinks() {
        if (!url) {
            alert("Please enter a valid URL");
            return;
        }

        // Clear previous results
        results = null;
        isLoading = true;

        try {
            let workingLinks, brokenLinks;

            if (useMockData) {
                // Use mock data instead
                ({ workingLinks, brokenLinks } = mockCheckLinks());
            } else {
                // Fetch the content of the provided URL
                const response = await axios.get(url);
                const htmlContent = response.data;

                // Extract URLs from the HTML content
                const urls = extractUrls(htmlContent, url);

                // Check reachability of each URL
                workingLinks = [];
                brokenLinks = [];

                for (const link of urls) {
                    try {
                        await axios.get(link);
                        workingLinks.push({
                            url: link,
                            text: "Link is reachable",
                        });
                    } catch (error) {
                        brokenLinks.push(link);
                    }
                }
            }

            const urls = useMockData ? mockUrls : []; // Use mock URLs for summary if mock data is checked

            // Create results object
            results = {
                summary: {
                    total: urls.length,
                    broken: brokenLinks.length,
                    working: workingLinks.length,
                },
                workingLinks,
                brokenLinks,
            };
        } catch (error) {
            results = { error: error.message };
        } finally {
            isLoading = false;
        }
    }
</script>

<ComponentContainer
    title="Broken Link Checker"
    description="Analyze websites to find broken links and verify link accessibility across your web pages."
>
    <div class="space-y-6">
        <!-- Input Parameters -->
        <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                Input Parameters
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- URL Input -->
                <div class="md:col-span-2">
                    <label
                        for="url-input"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Website URL
                    </label>
                    <input
                        id="url-input"
                        type="url"
                        bind:value={url}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter website URL (e.g., https://www.example.com)"
                        required
                    />
                </div>

                <!-- Mock Data Toggle -->
                <div>
                    <label class="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            bind:checked={useMockData}
                            class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span class="text-sm font-medium text-gray-700"
                            >Use Mock Data for Testing</span
                        >
                    </label>
                    <p class="text-xs text-gray-500 mt-1">
                        Enable this to test with sample data instead of real
                        URLs
                    </p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center">
            <button
                on:click={checkLinks}
                disabled={isLoading}
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Checking Links..." : "Check Links"}
            </button>
        </div>

        <!-- Loading State -->
        {#if isLoading}
            <div class="text-center py-8">
                <div
                    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-500 bg-blue-50 transition ease-in-out duration-150"
                >
                    <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Checking links...
                </div>
                <p class="text-sm text-gray-500 mt-2">
                    This may take a few minutes depending on the website size.
                </p>
            </div>
        {/if}

        <!-- Error Message -->
        {#if results && results.error}
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
                            Error occurred
                        </h3>
                        <p class="text-sm text-red-700 mt-1">{results.error}</p>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Results Section -->
        {#if results && !results.error}
            <div class="space-y-6">
                <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                    Results
                </h2>

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-sm font-medium text-gray-500 mb-1">
                            Total Links
                        </h3>
                        <p class="text-2xl font-bold text-blue-600">
                            {results.summary.total}
                        </p>
                        <p class="text-sm text-gray-500 mt-1">Links checked</p>
                    </div>

                    <div
                        class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-sm font-medium text-gray-500 mb-1">
                            Working Links
                        </h3>
                        <p class="text-2xl font-bold text-green-600">
                            {results.summary.working}
                        </p>
                        <p class="text-sm text-gray-500 mt-1">
                            Accessible links
                        </p>
                    </div>

                    <div
                        class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-sm font-medium text-gray-500 mb-1">
                            Broken Links
                        </h3>
                        <p class="text-2xl font-bold text-red-600">
                            {results.summary.broken}
                        </p>
                        <p class="text-sm text-gray-500 mt-1">Failed links</p>
                    </div>
                </div>

                <!-- Working Links -->
                {#if results.workingLinks.length > 0}
                    <div class="space-y-4">
                        <h3
                            class="text-lg font-semibold text-gray-700 border-b pb-2"
                        >
                            Working Links ({results.workingLinks.length})
                        </h3>
                        <div class="space-y-2 max-h-64 overflow-y-auto">
                            {#each results.workingLinks as link}
                                <div
                                    class="bg-green-50 border border-green-200 p-3 rounded-md"
                                >
                                    <div class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <svg
                                                class="h-5 w-5 text-green-400"
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
                                        <div class="ml-3 flex-1">
                                            <p
                                                class="text-sm font-medium text-green-800 break-all"
                                            >
                                                {link.url}
                                            </p>
                                            <p
                                                class="text-xs text-green-600 mt-1"
                                            >
                                                {link.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- Broken Links -->
                {#if results.brokenLinks.length > 0}
                    <div class="space-y-4">
                        <h3
                            class="text-lg font-semibold text-gray-700 border-b pb-2"
                        >
                            Broken Links ({results.brokenLinks.length})
                        </h3>
                        <div class="space-y-2 max-h-64 overflow-y-auto">
                            {#each results.brokenLinks as link}
                                <div
                                    class="bg-red-50 border border-red-200 p-3 rounded-md"
                                >
                                    <div class="flex items-start">
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
                                        <div class="ml-3 flex-1">
                                            <p
                                                class="text-sm font-medium text-red-800 break-all"
                                            >
                                                {link}
                                            </p>
                                            <p
                                                class="text-xs text-red-600 mt-1"
                                            >
                                                Link is broken or inaccessible
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        {/if}

        <!-- Additional Information Section -->
        <div class="space-y-6 mt-8">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                How it works
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-medium text-blue-900 mb-2">
                        Link Extraction
                    </h3>
                    <p class="text-sm text-blue-700">
                        Scans the webpage HTML to find all href attributes and
                        extract URLs
                    </p>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                    <h3 class="font-medium text-green-900 mb-2">
                        Accessibility Check
                    </h3>
                    <p class="text-sm text-green-700">
                        Tests each link by making HTTP requests to verify
                        accessibility
                    </p>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">
                    <strong>Note:</strong> This tool checks HTTP accessibility of
                    links. Some links may appear broken due to CORS restrictions,
                    authentication requirements, or server-side blocking of automated
                    requests.
                </p>
            </div>
        </div>
    </div>
</ComponentContainer>
