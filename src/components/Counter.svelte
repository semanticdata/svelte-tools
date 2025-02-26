<script lang="ts">
    let count = 0;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }
</script>

<div
    class="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md"
>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Interactive Counter</h2>
    <div class="flex items-center space-x-4">
        <button
            on:click={decrement}
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
            -
        </button>

        <span class="text-4xl font-bold text-gray-900">{count}</span>

        <button
            on:click={increment}
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
            +
        </button>
    </div>

    <p class="mt-4 text-gray-600">Current count: {count}</p>
</div>
