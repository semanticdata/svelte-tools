import type { SvelteComponent } from 'svelte';
import AddressExtractor from "./tools/AddressExtractor.svelte";
import AreaCalculator from "./tools/AreaCalculator.svelte";
import AsphaltCalculator from "./tools/AsphaltCalculator.svelte";
import DateCalculator from "./tools/DateCalculator.svelte";
import LinkChecker from "./tools/LinkChecker.svelte";
import LoremGenerator from "./tools/LoremGenerator.svelte";
import PomodoroTimer from "./tools/PomodoroTimer.svelte";
import TextComparer from "./tools/TextComparer.svelte";
import UnitConverter from "./tools/UnitConverter.svelte";
import VolumeCalculator from "./tools/VolumeCalculator.svelte";
import RegexTester from "./tools/RegexTester.svelte";

type ComponentType = typeof SvelteComponent;

export interface ToolComponent {
  id: string;
  name: string;
  component: ComponentType;
}

export interface ComponentCategory {
  [key: string]: ToolComponent[];
}

export const components: Record<string, ComponentType> = {
  AddressExtractor,
  AreaCalculator,
  AsphaltCalculator,
  DateCalculator,
  LinkChecker,
  LoremGenerator,
  PomodoroTimer,
  TextComparer,
  UnitConverter,
  VolumeCalculator,
  RegexTester,
};

export const componentCategories: ComponentCategory = {
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
      id: "DateCalculator",
      name: "Date Calculator",
      component: DateCalculator,
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
    {
      id: "RegexTester",
      name: "Regex Tester",
      component: RegexTester,
    },
  ],
  Utilities: [
    { id: "LinkChecker", name: "Link Checker", component: LinkChecker },
    { id: "PomodoroTimer", name: "Pomodoro Timer", component: PomodoroTimer },
  ],
};

export function selectComponent(componentId: string | null): ComponentType | null {
  if (!componentId) return null;
  return components[componentId] || null;
}

export function updateUrl(componentId: string | null): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (componentId) {
    url.searchParams.set('component', componentId);
  } else {
    url.searchParams.delete('component');
  }
  window.history.pushState({}, '', url.toString());
}
