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

<div class="bg-white rounded-lg shadow-sm p-6 h-full text-center">
  <h2 class="text-xl font-semibold text-gray-800 mb-4">Pomodoro Timer</h2>
  <div class="flex justify-center gap-1 mb-4">
    <div class="flex justify-center gap-2 mb-4">
      <button
        class="btn-secondary {currentMode === 'pomodoro' ? 'btn-active' : ''}"
        on:click={() => setMode("pomodoro")}
        disabled={isRunning || isPaused}
      >
        {modes.pomodoro.name}
      </button>
      <button
        class="btn-secondary {currentMode === 'longBreak' ? 'btn-active' : ''}"
        on:click={() => setMode("longBreak")}
        disabled={isRunning || isPaused}
      >
        {modes.longBreak.name}
      </button>
      <button
        class="btn-secondary {currentMode === 'shortBreak' ? 'btn-active' : ''}"
        on:click={() => setMode("shortBreak")}
        disabled={isRunning || isPaused}
      >
        {modes.shortBreak.name}
      </button>
    </div>
  </div>

  <div class="text-6xl font-bold mb-6 text-gray-800">
    <span class="minutes">{formatNumber(minutes)}</span>
    <span class="animate-pulse">:</span>
    <span class="seconds">{formatNumber(seconds)}</span>
  </div>

  <div class="flex justify-center gap-2">
    {#if !isRunning && !isPaused}
      <button class="btn-primary" on:click={startTimer}> Start </button>
    {:else if isRunning}
      <button class="btn-warning" on:click={pauseTimer}> Pause </button>
    {:else if isPaused}
      <button class="btn-primary" on:click={resumeTimer}> Resume </button>
    {/if}
    <button class="btn-error" on:click={resetTimer}> Reset </button>
  </div>
</div>
