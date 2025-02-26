<script lang="ts">
  export let title: string;
  export let description: string;
  export let link: string;
</script>

<a
  href={link}
  class="block no-underline bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 m-2 w-1/4 hover:cursor-pointer"
>
  <div>
    <h2 class="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <p class="text-gray-600">{description}</p>
  </div>
</a>
