<template>
  <div id="app" class="container mx-auto px-4">
    <channel-manager />
  </div>
</template>

<script>
import ChannelManager from './components/ChannelManager'

export default {
  name: 'App',
  components: {
    ChannelManager
  }
}
</script>
