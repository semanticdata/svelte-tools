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

<div class="bg-white rounded-lg shadow-sm p-6 h-full">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Broken Link Checker
    </h2>

    <div class="flex flex-col md:flex-row gap-4 mb-4">
        <input
            type="url"
            bind:value={url}
            class="form-input flex-grow"
            placeholder="Enter website URL (e.g., https://www.example.com)"
            required
        />
        <button on:click={checkLinks} disabled={isLoading} class="btn-primary">
            Check Links
        </button>
    </div>

    <div class="mb-6">
        <label class="form-checkbox">
            <input type="checkbox" bind:checked={useMockData} />
            <span>Use Mock Data</span>
        </label>
    </div>

    {#if isLoading}
        <div class="feedback feedback-info text-center">
            Checking links... This may take a few minutes depending on the
            website size.
        </div>
    {/if}

    {#if results}
        <div class="results-section">
            {#if results.error}
                <div class="feedback feedback-error">
                    Error: {results.error}
                </div>
            {:else}
                <div class="feedback feedback-info">
                    <strong>Summary:</strong><br />
                    Total links checked: {results.summary.total}<br />
                    Broken links found: {results.summary.broken}<br />
                    Working links: {results.summary.working}
                </div>

                {#if results.workingLinks.length > 0}
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">
                        Working Links
                    </h3>
                    <div class="space-y-2 mb-6">
                        {#each results.workingLinks as link}
                            <div class="feedback feedback-success">
                                <div class="font-medium break-all">
                                    {link.url}
                                </div>
                                <div class="text-sm">
                                    {link.text}
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if results.brokenLinks.length > 0}
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">
                        Broken Links
                    </h3>
                    <div class="space-y-2">
                        {#each results.brokenLinks as link}
                            <div class="feedback feedback-error">
                                <div class="font-medium break-all">{link}</div>
                                <div class="text-sm">Link is broken</div>
                            </div>
                        {/each}
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
</div>
