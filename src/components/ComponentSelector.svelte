<script lang="ts">
  import LinkCheckerComponent from "./LinkChecker.svelte";
  import UnitConverterComponent from "./UnitConverter.svelte";

  export let initialComponent: string | null = null;

  const components: {
    [key: string]: typeof LinkCheckerComponent | typeof UnitConverterComponent;
  } = {
    LinkCheckerComponent: LinkCheckerComponent,
    UnitConverterComponent: UnitConverterComponent,
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
    <option value="LinkCheckerComponent">Link Checker</option>
    <option value="UnitConverterComponent">Unit Converter</option>
  </select>
</div>

{#if Component}
  <svelte:component this={Component} />
{/if}
