<script>
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

<div class="container mx-auto p-6 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">Broken Link Checker</h1>

    <div class="flex flex-col md:flex-row gap-4 mb-4">
        <input
            type="url"
            bind:value={url}
            class="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter website URL (e.g., https://www.example.com)"
            required
        />
        <button
            on:click={checkLinks}
            disabled={isLoading}
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
            Check Links
        </button>
    </div>

    <div class="mb-6">
        <label class="flex items-center cursor-pointer">
            <input
                type="checkbox"
                bind:checked={useMockData}
                class="form-checkbox h-5 w-5 text-blue-600"
            />
            <span class="ml-2 text-gray-700">Use Mock Data</span>
        </label>
    </div>

    {#if isLoading}
        <div class="bg-gray-100 p-4 rounded text-center mb-6">
            Checking links... This may take a few minutes depending on the
            website size.
        </div>
    {/if}

    {#if results}
        <div class="results">
            {#if results.error}
                <div class="text-red-600 p-4 bg-red-100 rounded mb-6">
                    Error: {results.error}
                </div>
            {:else}
                <div class="bg-gray-100 p-4 rounded mb-6">
                    <strong>Summary:</strong><br />
                    Total links checked: {results.summary.total}<br />
                    Broken links found: {results.summary.broken}<br />
                    Working links: {results.summary.working}
                </div>

                {#if results.workingLinks.length > 0}
                    <h2 class="text-xl font-semibold mb-3">Working Links</h2>
                    <div class="space-y-2 mb-6">
                        {#each results.workingLinks as link}
                            <div
                                class="border-l-4 border-green-500 bg-green-50 p-3 rounded"
                            >
                                <div class="font-medium break-all">
                                    {link.url}
                                </div>
                                <div class="text-sm text-green-700">
                                    {link.text}
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if results.brokenLinks.length > 0}
                    <h2 class="text-xl font-semibold mb-3">Broken Links</h2>
                    <div class="space-y-2">
                        {#each results.brokenLinks as link}
                            <div
                                class="border-l-4 border-red-500 bg-red-50 p-3 rounded"
                            >
                                <div class="font-medium break-all">{link}</div>
                                <div class="text-sm text-red-700">
                                    Link is broken
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
</div>
