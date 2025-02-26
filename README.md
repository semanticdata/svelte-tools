# Svelte Tools

A collection of simple utility tools built with Astro and Svelte.

## 🧰 Available Tools

### Simple Tools

- **Unit Converter** - Convert units of measurement
- **Pomodor Timer** - A simple pomodoro timer

### Calculators

- **Asphalt Calculator** - Calculate the amount of asphalt needed for a project
- **Area Calculator** - Calculate the area of a shape
- **Volume Calculator** - Calculate the volume of a shape

### Text Tools

- **Text Comparer** - Compare two texts and see the differences
- **Link Checker** - Check URLs for broken links

### Regex Tools

- **Address Extractor** - Extract and organize street addresses from any text
- **Link Checker** - Check URLs for broken links

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── UI components built with Svelte
│   ├── layouts/
│   │   └── Page layouts
│   ├── pages/
│   │   └── Astro pages for each tool
│   ├── styles/
│   │   └── Global styles
│   └── assets/
│       └── Static assets
└── package.json
```

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - Web framework for content-focused websites
- [Svelte](https://svelte.dev/) - Component framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run check`        | Run type checking with TypeScript                |

## 🚧 Development

To add a new tool:

1. Create a new page in `src/pages/`
2. Add the tool to the appropriate section in `src/pages/index.astro`
3. Implement the tool's functionality using Svelte components
