<script>
    // Timer state
    let timer;
    let minutes = 25;
    let seconds = 0;
    let isRunning = false;
    let isPaused = false;

    // Timer modes
    const modes = {
        pomodoro: { name: "Pomodoro", minutes: 25 },
        longBreak: { name: "Long Break", minutes: 15 },
        shortBreak: { name: "Short Break", minutes: 5 },
    };

    let currentMode = "pomodoro";

    // Format numbers to always have two digits
    const formatNumber = (num) => String(num).padStart(2, "0");

    // Start the timer
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            isPaused = false;
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        isRunning = false;
                        alert("Time is up!");
                    } else {
                        minutes--;
                        seconds = 59;
                    }
                } else {
                    seconds--;
                }
            }, 1000);
        }
    }

    // Pause the timer
    function pauseTimer() {
        if (isRunning && !isPaused) {
            clearInterval(timer);
            isPaused = true;
            isRunning = false;
        }
    }

    // Resume the timer
    function resumeTimer() {
        if (isPaused) {
            startTimer();
        }
    }

    // Reset the timer
    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isPaused = false;
        setMode(currentMode);
    }

    // Set timer mode
    function setMode(mode) {
        currentMode = mode;
        minutes = modes[mode].minutes;
        seconds = 0;
        clearInterval(timer);
        isRunning = false;
        isPaused = false;
    }

    // Clean up the interval when the component is destroyed
    import { onDestroy } from "svelte";

    onDestroy(() => {
        if (timer) {
            clearInterval(timer);
        }
    });
</script>

<div
    class="max-w-[300px] mx-auto my-4 text-center p-5 rounded-lg shadow-md bg-gray-50 font-sans"
>
    <div class="flex justify-center gap-1 mb-4">
        <button
            class="px-2 py-2 text-sm bg-gray-200 text-gray-700 rounded cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed {currentMode ===
            'pomodoro'
                ? 'bg-blue-500 text-white'
                : ''}"
            on:click={() => setMode("pomodoro")}
            disabled={isRunning || isPaused}
        >
            {modes.pomodoro.name}
        </button>
        <button
            class="px-2 py-2 text-sm bg-gray-200 text-gray-700 rounded cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed {currentMode ===
            'longBreak'
                ? 'bg-blue-500 text-white'
                : ''}"
            on:click={() => setMode("longBreak")}
            disabled={isRunning || isPaused}
        >
            {modes.longBreak.name}
        </button>
        <button
            class="px-2 py-2 text-sm bg-gray-200 text-gray-700 rounded cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed {currentMode ===
            'shortBreak'
                ? 'bg-blue-500 text-white'
                : ''}"
            on:click={() => setMode("shortBreak")}
            disabled={isRunning || isPaused}
        >
            {modes.shortBreak.name}
        </button>
    </div>

    <div class="text-5xl font-bold mb-5 text-gray-800">
        <span class="minutes">{formatNumber(minutes)}</span>
        <span class="animate-pulse">:</span>
        <span class="seconds">{formatNumber(seconds)}</span>
    </div>

    <div class="flex justify-center gap-2">
        {#if !isRunning && !isPaused}
            <button
                class="px-5 py-2 rounded text-base bg-green-500 text-white hover:opacity-90 transition-colors duration-300"
                on:click={startTimer}
            >
                Start
            </button>
        {:else if isRunning}
            <button
                class="px-5 py-2 rounded text-base bg-yellow-400 text-gray-800 hover:opacity-90 transition-colors duration-300"
                on:click={pauseTimer}
            >
                Pause
            </button>
        {:else if isPaused}
            <button
                class="px-5 py-2 rounded text-base bg-green-500 text-white hover:opacity-90 transition-colors duration-300"
                on:click={resumeTimer}
            >
                Resume
            </button>
        {/if}
        <button
            class="px-5 py-2 rounded text-base bg-red-500 text-white hover:opacity-90 transition-colors duration-300"
            on:click={resetTimer}
        >
            Reset
        </button>
    </div>
</div>
