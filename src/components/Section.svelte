<script lang="ts">
    export let title: string;
</script>

<div class="max-w-7xl mx-auto py-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    <div class="flex flex-wrap gap-4">
        <slot />
    </div>
</div>
