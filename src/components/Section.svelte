<script lang="ts">
    export let title: string;
</script>

<div class="max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 m-4">{title}</h2>
    <div class="flex flex-wrap max-w-7xl mx-auto">
        <slot />
    </div>
</div>
