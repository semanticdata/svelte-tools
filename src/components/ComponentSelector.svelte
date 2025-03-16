<script lang="ts">
  import AddressExtractor from "./tools/AddressExtractor.svelte";
  import AreaCalculator from "./tools/AreaCalculator.svelte";
  import AsphaltCalculator from "./tools/AsphaltCalculator.svelte";
  import LinkChecker from "./tools/LinkChecker.svelte";
  import LoremGenerator from "./tools/LoremGenerator.svelte";
  import PomodoroTimer from "./tools/PomodoroTimer.svelte";
  import TextComparer from "./tools/TextComparer.svelte";
  import UnitConverter from "./tools/UnitConverter.svelte";
  import VolumeCalculator from "./tools/VolumeCalculator.svelte";

  export let initialComponent: string | null = null;

  type ComponentType =
    | typeof AddressExtractor
    | typeof AreaCalculator
    | typeof AsphaltCalculator
    | typeof LinkChecker
    | typeof LoremGenerator
    | typeof PomodoroTimer
    | typeof TextComparer
    | typeof UnitConverter
    | typeof VolumeCalculator;

  const components: { [key: string]: ComponentType } = {
    AddressExtractor,
    AreaCalculator,
    AsphaltCalculator,
    LinkChecker,
    LoremGenerator,
    PomodoroTimer,
    TextComparer,
    UnitConverter,
    VolumeCalculator,
  };

  let selectedComponent: keyof typeof components | null = initialComponent;
  let Component = selectedComponent ? components[selectedComponent] : null;

  const componentCategories = {
    Calculators: [
      {
        id: "AreaCalculator",
        name: "Area Calculator",
        component: AreaCalculator,
      },
      {
        id: "AsphaltCalculator",
        name: "Asphalt Calculator",
        component: AsphaltCalculator,
      },
      {
        id: "VolumeCalculator",
        name: "Volume Calculator",
        component: VolumeCalculator,
      },
      { id: "UnitConverter", name: "Unit Converter", component: UnitConverter },
    ],
    "Text Tools": [
      { id: "TextComparer", name: "Text Comparer", component: TextComparer },
      {
        id: "LoremGenerator",
        name: "Lorem Generator",
        component: LoremGenerator,
      },
      {
        id: "AddressExtractor",
        name: "Address Extractor",
        component: AddressExtractor,
      },
    ],
    Utilities: [
      { id: "LinkChecker", name: "Link Checker", component: LinkChecker },
      { id: "PomodoroTimer", name: "Pomodoro Timer", component: PomodoroTimer },
    ],
  };

  function selectComponent(componentId: string) {
    selectedComponent = componentId;
    Component = components[componentId];
    const url = new URL(window.location.href);
    url.searchParams.set("component", componentId);
    history.pushState({}, "", url);
  }
</script>

<div class="mx-4">
  {#if !Component}
    <div class="grid gap-6">
      {#each Object.entries(componentCategories) as [category, items]}
        <div class="category-section">
          <h2 class="text-xl font-bold mb-3">{category}</h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {#each items as { id, name }}
              <button
                class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
                on:click={() => selectComponent(id)}
              >
                <span class="text-gray-800">{name}</span>
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <button
      class="mb-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      on:click={() => selectComponent("")}
    >
      ← Back to Tools
    </button>
    <svelte:component this={Component} />
  {/if}
</div>
