<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { selectComponent } from "./utils/useComponentSelector";
  import ComponentContainer from "./utils/ComponentContainer.svelte";
  import type { SvelteComponent } from "svelte";

  export let selectedComponent: string | null = null;

  let Component: typeof SvelteComponent | null = null;

  // Listen for component selection changes from the sidebar
  function handleComponentSelected(event: CustomEvent) {
    const newId = event.detail;
    // Only update if the component has actually changed
    if (newId !== selectedComponent) {
      selectedComponent = newId;
    }
  }

  // Update component when selectedComponent changes
  $: if (selectedComponent) {
    Component = selectComponent(selectedComponent);
  } else {
    Component = null;
  }

  // Set up event listeners
  onMount(() => {
    if (selectedComponent) {
      Component = selectComponent(selectedComponent);
    }

    // Listen for component selection events from the Astro component
    const handler = handleComponentSelected as EventListener;
    document.addEventListener("component-selected", handler);

    // Clean up event listener when component is destroyed
    return () => {
      document.removeEventListener("component-selected", handler);
    };
  });

  // Update the URL when selectedComponent changes
  $: if (typeof window !== "undefined" && selectedComponent) {
    const url = new URL(window.location.href);
    if (url.searchParams.get("component") !== selectedComponent) {
      url.searchParams.set("component", selectedComponent);
      window.history.pushState({}, "", url);
    }
  }
</script>

<!-- Main content area only, layout handled by parent -->
{#if Component}
  <div class="h-full">
    <svelte:component this={Component} />
  </div>
{:else}
  <ComponentContainer
    title="No Tool Selected"
    description="Please select a tool from the sidebar to get started."
  >
    <div class="flex items-center justify-center py-12">
      <div class="text-center">
        <svg
          class="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <p class="mt-4 text-sm text-gray-500">
          You can choose a component from the navigation panel.
        </p>
      </div>
    </div>
  </ComponentContainer>
{/if}

<!-- Rest of the code remains the same -->
