<script>
  export let title = "Svelte Tools";
</script>

<header>
  <nav class="max-w-7xl">
    <a href="/" class="title">{title}</a>
  </nav>
</header>

<style>
  header {
    width: 100%;
    background-color: #ff3e00;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  nav {
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 0 1rem;
  }

  .title {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  .title:hover {
    opacity: 0.8;
  }
</style>
