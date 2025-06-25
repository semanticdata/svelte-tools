<script>
  export let title = "Component Title";
  export let description = "Component description.";
</script>

<div class="max-w-4xl mx-auto p-4">
  <!-- Header Section -->
  <div class="mb-8 text-center">
    <h1 class="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
    <p class="text-gray-600">{description}</p>
  </div>

  <!-- Main Content Slot -->
  <!-- <div class="bg-white rounded-lg shadow-md p-6 mb-6"> -->
  <slot></slot>
  <!-- </div> -->

  <!-- Optional: Additional Information Section -->
  <!-- You can add a slot here if needed, or specific content -->
  <!-- 
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-3">How it Works</h2>
    <div class="prose max-w-none text-gray-600">
      <slot name="how-it-works"></slot>
    </div>
  </div>
  -->
</div>
