<template>
  <div>
    <button class="btn mt-4" @click="showChannelManagement = !showChannelManagement">open channels management</button>
    <transition name="fade">
      <div class="rounded-lg border border-gray-200 p-2 mt-4" v-if="showChannelManagement">
        <div class="border-solid rounded-full border border-gray-200 p-2 m-2 flex items-center" >
          <font-awesome-icon :icon="search" class="mx-2 text-gray-500"/>
          <input
            class="outline-none flex-grow"
            placeholder="Add Channel"
            @keydown.enter="addChannel"
            v-model="newChannel"
          />
        </div>
        <div v-if="showChannelManagement">
          <transition-group>
            <channel-item
              v-for="(item, index) in list"
              :key="item.id"
              :name="item.name"
              :icon="item.icon"
              :id="item.id"
              :index="index"
              @remove="removeChannel"
            />
          </transition-group>
        </div>
        <div v-if="changed" class="flex items-center justify-end p-2">
          <button class="btn mr-2" @click="showChannelManagement = false">Cancel</button>
<!--          fixme this is not right man!-->
          <button class="btn btn-primary mr-2" @click="applyChannels">Apply</button>
        </div>
      </div>
    </transition>

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
      originalList: [
        { id: 1, name: 'team', icon: icons.faPhone },
        { id: 2, name: 'call center', icon: icons.faPhone },
        { id: 3, name: 'something', icon: icons.faQuestion }
      ],
      list: [],
      newChannel: '',
      showChannelManagement: false
    }
  },
  computed: {
    search () {
      return icons.faSearch
    },
    iconsList () {
      return Object.keys(icons)
    },
    iconListLength () {
      return this.iconsList.length
    },
    lastId () {
      return this.list[this.list.length - 1].id
    },
    changed () {
      return !(JSON.stringify(this.originalList) === JSON.stringify(this.list))
    }
  },
  methods: {
    addChannel () {
      if (this.newChannel) {
        let randomNumber = Math.floor(Math.random() * this.iconListLength)
        if (this.iconListLength === randomNumber) {
          randomNumber--
        }
        const randomIcon = icons[this.iconsList[randomNumber]]
        this.list.push({
          id: this.lastId + 1,
          icon: randomIcon,
          name: this.newChannel
        })
        this.newChannel = ''
      }
    },
    removeChannel (index) {
      this.list.splice(index, 1)
    },
    applyChannels () {
      this.originalList = [...this.list]
      this.showChannelManagement = false
    }
  },
  watch: {
    showChannelManagement (to) {
      if (to) {
        this.list = [...this.originalList]
      }
    }
  }
}
</script>

<style lang="scss">
.fade {
  &-enter-active, &-leave-active {
    transition: opacity .5s;
  }
  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
