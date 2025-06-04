<script lang="ts">
    // ================================
    // 1. Type Definitions
    // ================================
    interface ToolState {
        isLoading: boolean;
        error: string | null;
        success: string | null;
    }

    // ================================
    // 2. Component Props (if any)
    // ================================
    // export let someProp: string;


    // ================================
    // 3. Reactive State
    // ================================
    let state: ToolState = {
        isLoading: false,
        error: null,
        success: null
    };

    // Example form data
    let formData = {
        exampleInput: ''
    };

    // ================================
    // 4. Computed Properties
    // ================================
    $: isFormValid = validateForm();

    // ================================
    // 5. Functions
    // ================================
    function validateForm(): boolean {
        // Add your validation logic here
        return formData.exampleInput.trim().length > 0;
    }


    function handleSubmit() {
        if (!isFormValid) {
            setError('Please fill in all required fields');
            return;
        }

        state.isLoading = true;
        
        try {
            // Process the form data here
            console.log('Form submitted:', formData);
            
            // Simulate API call
            setTimeout(() => {
                setSuccess('Operation completed successfully!');
                resetForm();
                state.isLoading = false;
            }, 1000);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            state.isLoading = false;
        }
    }


    function resetForm() {
        formData = {
            exampleInput: ''
        };
        state.error = null;
        state.success = null;
    }

    function setError(message: string) {
        state.error = message;
        state.success = null;
    }

    function setSuccess(message: string) {
        state.success = message;
        state.error = null;
    }
</script>

<!-- 
    ================================
    Main Component Template
    ================================ 
-->
<div class="tool-container">
    <!-- Header Section -->
    <header class="tool-header">
        <h1 class="text-3xl font-bold text-gray-900">Tool Name</h1>
        <p class="mt-2 text-gray-600">
            A brief description of what this tool does and its purpose.
        </p>
    </header>


    <!-- Main Content -->
    <div class="tool-content">
        <!-- Feedback Messages -->
        {#if state.error}
            <div class="feedback error">
                <span class="font-medium">Error:</span> {state.error}
            </div>
        {/if}
        
        {#if state.success}
            <div class="feedback success">
                <span class="font-medium">Success:</span> {state.success}
            </div>
        {/if}

        <!-- Input Section -->
        <div class="input-section">
            <div class="form-group">
                <label for="exampleInput" class="form-label">
                    Example Input <span class="required">*</span>
                </label>
                <input
                    type="text"
                    id="exampleInput"
                    class="form-input"
                    bind:value={formData.exampleInput}
                    placeholder="Enter some text"
                    disabled={state.isLoading}
                />
                <p class="form-hint">This is a helpful hint for the input field.</p>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
            <button
                type="button"
                class="btn btn-primary"
                on:click={handleSubmit}
                disabled={!isFormValid || state.isLoading}
            >
                {#if state.isLoading}
                    Processing...
                {:else}
                    Submit
                {/if}
            </button>
            
            <button
                type="button"
                class="btn btn-secondary"
                on:click={resetForm}
                disabled={state.isLoading}
            >
                Reset
            </button>
        </div>

        <!-- Results Section (if applicable) -->
        {#if false} <!-- Replace with actual condition -->
            <div class="results-section">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Results</h2>
                <div class="results-content">
                    <!-- Results will be displayed here -->
                </div>
            </div>
        {/if}
    </div>
</div>

<!-- 
    ================================
    Styles
    ================================ 
-->
<style>
    .tool-container {
        @apply p-6 bg-white rounded-lg shadow-sm h-full;
    }

    .tool-header {
        @apply mb-8 pb-6 border-b border-gray-200;
    }

    .tool-content {
        @apply space-y-6;
    }
    
    /* Form Elements */
    .form-group {
        @apply mb-6;
    }

    .form-label {
        @apply block text-sm font-medium text-gray-700 mb-1;
    }

    .form-input {
        @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
               disabled:bg-gray-50 disabled:text-gray-500;
    }

    .form-hint {
        @apply mt-1 text-sm text-gray-500;
    }


    /* Buttons */
    .action-buttons {
        @apply flex space-x-3 mt-8 pt-6 border-t border-gray-200;
    }


    .btn {
        @apply px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
    }

    .btn-primary {
        @apply bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500;
    }

    .btn-primary:disabled {
        @apply bg-indigo-300 cursor-not-allowed;
    }


    .btn-secondary {
        @apply bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500;
    }

    .btn-secondary:disabled {
        @apply text-gray-300 border-gray-200 cursor-not-allowed;
    }

    /* Feedback Messages */
    .feedback {
        @apply p-4 rounded-md text-sm;
    }

    .error {
        @apply bg-red-50 text-red-700 border-l-4 border-red-500;
    }

    .success {
        @apply bg-green-50 text-green-700 border-l-4 border-green-500;
    }
    /* Required field indicator */
    .required {
        @apply text-red-500;
    }
    /* Results Section */
    .results-section {
        @apply mt-8 pt-6 border-t border-gray-200;
    }
</style>
