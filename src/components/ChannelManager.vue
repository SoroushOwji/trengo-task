<template>
  <div>
    <Button class="mt-4" @click="showChannelManagement = !showChannelManagement">open channels management</Button>
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
        <div
          v-if="showChannelManagement"
          @dragover.prevent
          @dragenter.prevent
          class="channel-manager"
        >
          <transition-group name="list">
            <channel-item
              v-for="(item, index) in list"
              :key="item.id"
              :name="item.name"
              :icon="item.icon"
              :index="index"
              @remove="removeChannel"
              @drop="dragOver"
              @dragstart="dragStart"
              :draggable="true"
            />
          </transition-group>
        </div>
        <div v-if="changed" class="flex items-center justify-end p-2">
          <Button class="mr-2" @click="list = [...originalList]">Cancel</Button>
          <Button class="mr-2" color="primary" @click="applyChannels">Apply</Button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import * as icons from '@fortawesome/free-solid-svg-icons'
import ChannelItem from '@/components/ChannelItem'
import Button from '@/components/Button'

export default {
  components: {
    Button,
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
      return this.list.reduce((acc, curr) => {
        if (curr.id > acc) {
          return curr.id
        }
        return acc
      }, 0)
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
    },
    dragOver (event, index) {
      const itemIndex = +event.dataTransfer.getData('index')
      const item = this.list[itemIndex]
      this.list.splice(itemIndex, 1)
      this.list.splice(index, 0, item)
    },
    dragStart (event, index) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('index', index)
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
.channel-manager {
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
}
.list {
  transition: 1s;
  &-move {
    transition: 1s;
  }
  &-enter-active {
    transition: ease-out .5s;
  }
  &-leave-active {
    transition: ease-in .5s;
  }
  &-enter, &-leave-to{
    opacity: 0;
    transform: translateX(10px);
  }
}

</style>
