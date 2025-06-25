<script>
    import ComponentContainer from "../utils/ComponentContainer.svelte";
    import { onDestroy } from "svelte";

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
    onDestroy(() => {
        if (timer) {
            clearInterval(timer);
        }
    });
</script>

<ComponentContainer
    title="Pomodoro Timer"
    description="A productivity timer using the Pomodoro Technique - work in focused 25-minute intervals with short breaks."
>
    <div class="space-y-6">
        <!-- Timer Mode Selection -->
        <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                Timer Mode
            </h2>
            <div class="flex justify-center gap-2">
                <button
                    class="px-4 py-2 rounded-md border transition-colors duration-200 {currentMode ===
                    'pomodoro'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
                    on:click={() => setMode("pomodoro")}
                    disabled={isRunning || isPaused}
                >
                    {modes.pomodoro.name}
                </button>
                <button
                    class="px-4 py-2 rounded-md border transition-colors duration-200 {currentMode ===
                    'longBreak'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
                    on:click={() => setMode("longBreak")}
                    disabled={isRunning || isPaused}
                >
                    {modes.longBreak.name}
                </button>
                <button
                    class="px-4 py-2 rounded-md border transition-colors duration-200 {currentMode ===
                    'shortBreak'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
                    on:click={() => setMode("shortBreak")}
                    disabled={isRunning || isPaused}
                >
                    {modes.shortBreak.name}
                </button>
            </div>
        </div>

        <!-- Timer Display -->
        <div class="text-center py-8">
            <div class="text-6xl font-bold mb-6 text-gray-800 font-mono">
                <span class="minutes">{formatNumber(minutes)}</span>
                <span class="animate-pulse">:</span>
                <span class="seconds">{formatNumber(seconds)}</span>
            </div>
            <p class="text-lg text-gray-600 mb-2">
                {modes[currentMode].name}
            </p>
            <p class="text-sm text-gray-500">
                {isRunning
                    ? "Timer is running..."
                    : isPaused
                      ? "Timer is paused"
                      : "Ready to start"}
            </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center gap-3">
            {#if !isRunning && !isPaused}
                <button
                    class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                    on:click={startTimer}
                >
                    Start
                </button>
            {:else if isRunning}
                <button
                    class="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                    on:click={pauseTimer}
                >
                    Pause
                </button>
            {:else if isPaused}
                <button
                    class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                    on:click={resumeTimer}
                >
                    Resume
                </button>
            {/if}
            <button
                class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                on:click={resetTimer}
            >
                Reset
            </button>
        </div>

        <!-- Additional Information Section -->
        <div class="space-y-6 mt-8">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
                About the Pomodoro Technique
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-red-50 p-4 rounded-lg">
                    <h3 class="font-medium text-red-900 mb-2">
                        Pomodoro (25 min)
                    </h3>
                    <p class="text-sm text-red-700">
                        Focus on a single task without interruptions
                    </p>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                    <h3 class="font-medium text-green-900 mb-2">
                        Short Break (5 min)
                    </h3>
                    <p class="text-sm text-green-700">
                        Take a quick break between pomodoros
                    </p>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-medium text-blue-900 mb-2">
                        Long Break (15 min)
                    </h3>
                    <p class="text-sm text-blue-700">
                        Take a longer break after 4 pomodoros
                    </p>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">
                    <strong>Tip:</strong> The Pomodoro Technique helps improve focus
                    and productivity by breaking work into manageable intervals with
                    regular breaks.
                </p>
            </div>
        </div>
    </div>
</ComponentContainer>
