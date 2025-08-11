<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-gray-900">Page Builder</h1>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/pagebuilder" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Open Page Builder
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Page Builder
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Click the button above to start building amazing pages with our drag-and-drop editor.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="text-3xl mb-3">📝</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Text Blocks</h3>
            <p class="text-gray-600">Create beautiful text content with customizable fonts, colors, and alignment.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="text-3xl mb-3">🖼️</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Image Blocks</h3>
            <p class="text-gray-600">Add stunning images with various display options and responsive behavior.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="text-3xl mb-3">⚡</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Fast & Responsive</h3>
            <p class="text-gray-600">Built with Vue 3 and Nuxt 4 for optimal performance and user experience.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Welcome page - no page builder toggle needed
</script>
