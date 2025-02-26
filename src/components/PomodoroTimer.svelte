<script>
  // Timer state
  let timer;
  let minutes = 25;
  let seconds = 0;
  let isRunning = false;

  // Format numbers to always have two digits
  const formatNumber = (num) => String(num).padStart(2, "0");

  // Start the timer
  function startTimer() {
    if (!isRunning) {
      isRunning = true;
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

  // Reset the timer
  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
  }

  // Clean up the interval when the component is destroyed
  import { onDestroy } from 'svelte';
  
  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
</script>

<div class="pomodoro-timer">
  <div class="timer-display">
    <span class="minutes">{formatNumber(minutes)}</span>
    <span class="separator">:</span>
    <span class="seconds">{formatNumber(seconds)}</span>
  </div>
  
  <div class="controls">
    <button class="start-button" on:click={startTimer} disabled={isRunning}>
      {isRunning ? 'Running' : 'Start'}
    </button>
    <button class="reset-button" on:click={resetTimer}>
      Reset
    </button>
  </div>
</div>

<style>
  .pomodoro-timer {
    font-family: 'Arial', sans-serif;
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
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

  .start-button {
    background-color: #28a745;
    color: white;
  }

  .start-button:disabled {
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
