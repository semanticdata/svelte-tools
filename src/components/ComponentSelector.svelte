<script lang="ts">
  import { onMount } from "svelte";
  import {
    componentCategories,
    selectComponent,
    updateUrl,
    type ToolComponent,
  } from "./useComponentSelector";
  import type { SvelteComponent } from "svelte";

  export let initialComponent: string | null = null;

  let selectedComponent: string | null = initialComponent;
  let Component: typeof SvelteComponent | null = null;
  let isSidebarOpen = true;

  function handleSelectComponent(componentId: string) {
    selectedComponent = componentId === selectedComponent ? null : componentId;
    Component = selectedComponent ? selectComponent(selectedComponent) : null;
    updateUrl(selectedComponent);

    // Close sidebar on mobile when a component is selected
    if (window.innerWidth < 768) {
      isSidebarOpen = false;
    }
  }

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  // Initialize component if initialComponent is provided
  onMount(() => {
    if (initialComponent) {
      Component = selectComponent(initialComponent);
    }

    // Close sidebar on mobile by default
    if (window.innerWidth < 768) {
      isSidebarOpen = false;
    }
  });
</script>

<div class="flex h-screen bg-gray-50">
  <!-- Sidebar -->
  <aside
    class="fixed z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out {isSidebarOpen
      ? 'translate-x-0'
      : '-translate-x-full md:translate-x-0'} md:relative h-full overflow-y-auto"
  >
    <div class="p-4 border-b border-gray-200">
      <h1 class="text-xl font-bold text-gray-800">Tools</h1>
    </div>
    <nav class="p-2">
      {#each Object.entries(componentCategories) as [category, items]}
        <div class="mb-4">
          <h2
            class="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider"
          >
            {category}
          </h2>
          <ul class="space-y-1">
            {#each items as { id, name }}
              <li>
                <button
                  class="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors {selectedComponent ===
                  id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}"
                  on:click={() => handleSelectComponent(id)}
                >
                  {name}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </nav>
  </aside>

  <!-- Main Content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Mobile header -->
    <header class="md:hidden bg-white shadow-sm">
      <div class="flex items-center justify-between p-4">
        <button
          on:click={toggleSidebar}
          class="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-gray-800">
          {#if selectedComponent}
            {Object.values(componentCategories)
              .flat()
              .find((tool) => tool.id === selectedComponent)?.name || "Tool"}
          {:else}
            Tools
          {/if}
        </h1>
        <div class="w-10"></div>
        <!-- Spacer for centering the title -->
      </div>
    </header>

    <!-- Main content area -->
    <main class="flex-1 overflow-y-auto p-4 md:p-6">
      {#if Component}
        <div class="bg-white rounded-lg shadow-sm p-6 h-full">
          <svelte:component this={Component} />
        </div>
      {:else}
        <div class="flex items-center justify-center h-full">
          <div class="text-center max-w-md">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h2 class="mt-2 text-lg font-medium text-gray-900">
              No tool selected
            </h2>
            <p class="mt-1 text-sm text-gray-500">
              Select a tool from the sidebar to get started.
            </p>
          </div>
        </div>
      {/if}
    </main>
  </div>

  <!-- Overlay for mobile when sidebar is open -->
  {#if isSidebarOpen}
    <button
      type="button"
      class="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden cursor-default focus:outline-none"
      on:click={toggleSidebar}
      on:keydown={(e) =>
        e.key === "Enter" || e.key === " " ? toggleSidebar() : null}
      aria-label="Close sidebar"
    ></button>
  {/if}
</div>

<style>
  /* Custom scrollbar for the sidebar */
  aside::-webkit-scrollbar {
    width: 6px;
  }
  aside::-webkit-scrollbar-track {
    background: transparent;
  }
  aside::-webkit-scrollbar-thumb {
    background-color: #9ca3af;
    border-radius: 3px;
  }
  aside::-webkit-scrollbar-thumb:hover {
    background-color: #6b7280;
  }

  /* Smooth scrolling for the main content */
  main {
    scroll-behavior: smooth;
  }
</style>
