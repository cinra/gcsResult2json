<template>
  <div id="app">
    <div class="l-container">
      <main class="l-main">
        <div class="l-content">
          <router-view :key="$route.path"></router-view>
        </div>
      </main>
    </div>
  </div>

</template>

<script>
  // Vuex
  import { store } from './store'

  export default {
    name: 'app',
    data: () => {
      return {
      }
    },
    components: {
    },
    watch: {
    },
    created: function() {
    },
    beforeUpdate: function(){
    },
    methods: {
    }
  }
</script>
