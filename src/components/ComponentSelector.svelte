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

  function handleChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    selectedComponent = value;
    Component = value ? components[value] : null;
    const url = new URL(window.location.href);
    url.searchParams.set("component", value);
    history.pushState({}, "", url);
  }
</script>

<div class="component-container mx-4">
  <select bind:value={selectedComponent} on:change={handleChange}>
    <option value="">Select a component...</option>
    <option value="AddressExtractor">Address Extractor</option>
    <option value="AreaCalculator">Area Calculator</option>
    <option value="AsphaltCalculator">Asphalt Calculator</option>
    <option value="LinkChecker">Link Checker</option>
    <option value="LoremGenerator">Lorem Generator</option>
    <option value="PomodoroTimer">Pomodoro Timer</option>
    <option value="TextComparer">Text Comparer</option>
    <option value="UnitConverter">Unit Converter</option>
    <option value="VolumeCalculator">Volume Calculator</option>
  </select>
</div>

{#if Component}
  <svelte:component this={Component} />
{/if}
