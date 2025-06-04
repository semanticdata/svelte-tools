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

<style lang="postcss">
  :global(html) {
    scroll-behavior: smooth;
  }

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }

  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }

  .form-select {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white;
  }

  .form-radio {
    @apply flex items-center cursor-pointer;
  }

  .form-radio input[type="radio"] {
    @apply h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300;
  }

  .form-radio span {
    @apply ml-2 text-gray-700;
  }

  .form-checkbox {
    @apply flex items-center cursor-pointer;
  }

  .form-checkbox input[type="checkbox"] {
    @apply h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded;
  }

  .form-checkbox span {
    @apply ml-2 text-gray-700;
  }

  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors;
  }

  .btn-secondary.btn-active {
    @apply bg-blue-500 text-white;
  }

  .btn-warning {
    @apply px-4 py-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition-colors;
  }

  .btn-error {
    @apply px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors;
  }

  .results-section {
    @apply bg-gray-50 p-4 rounded-md mb-6;
  }

  .results-content {
    @apply text-lg font-medium text-gray-900;
  }

  .feedback {
    @apply p-3 rounded-md text-sm mb-4;
  }

  .feedback-info {
    @apply bg-blue-50 text-blue-800;
  }

  .feedback-success {
    @apply bg-green-50 text-green-800;
  }

  .feedback-warning {
    @apply bg-yellow-50 text-yellow-800;
  }

  .feedback-error {
    @apply bg-red-50 text-red-800;
  }
</style>
