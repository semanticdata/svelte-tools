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

<div class="pomodoro-timer mx-auto my-4">
    <div class="mode-selector">
        <button
            class="mode-button {currentMode === 'pomodoro' ? 'active' : ''}"
            on:click={() => setMode("pomodoro")}
            disabled={isRunning || isPaused}
        >
            {modes.pomodoro.name}
        </button>
        <button
            class="mode-button {currentMode === 'longBreak' ? 'active' : ''}"
            on:click={() => setMode("longBreak")}
            disabled={isRunning || isPaused}
        >
            {modes.longBreak.name}
        </button>
        <button
            class="mode-button {currentMode === 'shortBreak' ? 'active' : ''}"
            on:click={() => setMode("shortBreak")}
            disabled={isRunning || isPaused}
        >
            {modes.shortBreak.name}
        </button>
    </div>

    <div class="timer-display">
        <span class="minutes">{formatNumber(minutes)}</span>
        <span class="separator">:</span>
        <span class="seconds">{formatNumber(seconds)}</span>
    </div>

    <div class="controls">
        {#if !isRunning && !isPaused}
            <button class="start-button" on:click={startTimer}> Start </button>
        {:else if isRunning}
            <button class="pause-button" on:click={pauseTimer}> Pause </button>
        {:else if isPaused}
            <button class="resume-button" on:click={resumeTimer}>
                Resume
            </button>
        {/if}
        <button class="reset-button" on:click={resetTimer}> Reset </button>
    </div>
</div>

<style>
    .pomodoro-timer {
        font-family: "Arial", sans-serif;
        max-width: 300px;
        /* margin: 0 auto; */
        text-align: center;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: #f8f9fa;
    }

    .mode-selector {
        display: flex;
        justify-content: center;
        gap: 5px;
        margin-bottom: 15px;
    }

    .mode-button {
        padding: 8px 10px;
        font-size: 0.8rem;
        background-color: #e9ecef;
        color: #495057;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .mode-button.active {
        background-color: #007bff;
        color: white;
    }

    .mode-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .timer-display {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: #343a40;
    }

    .separator {
        animation: blink 1s infinite;
    }

    @keyframes blink {
        50% {
            opacity: 0.5;
        }
    }

    .controls {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .start-button,
    .resume-button {
        background-color: #28a745;
        color: white;
    }

    .pause-button {
        background-color: #ffc107;
        color: #212529;
    }

    button:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }

    .reset-button {
        background-color: #dc3545;
        color: white;
    }

    button:hover:not(:disabled) {
        opacity: 0.9;
    }
</style>
