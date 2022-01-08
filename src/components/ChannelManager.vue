<template>
  <div>
    <div class="border-solid rounded-full border border-gray-500 p-2 m-2 flex items-center" >
      <font-awesome-icon :icon="search" class="mx-2 text-gray-500"/>
      <input class="outline-none flex-grow" placeholder="Add Channel"/>
    </div>
    <channel-item
      v-for="item in list"
      :key="item.id"
      :name="item.name"
      :icon="item.icon"
    />

  </div>
</template>

<script>
import * as icons from '@fortawesome/free-solid-svg-icons'
import ChannelItem from '@/components/ChannelItem'

export default {
  components: {
    ChannelItem
  },
  name: 'ChannelManager',
  data () {
    return {
      list: [
        { id: '1', name: 'team', icon: icons.faPhone },
        { id: '2', name: 'call center', icon: icons.faPhone },
        { id: '3', name: 'something', icon: icons.faQuestion }
      ]
    }
  },
  computed: {
    search () {
      return icons.faSearch
    }
  }
}
</script>

<style scoped>

</style>
