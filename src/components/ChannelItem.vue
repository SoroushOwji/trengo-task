<template>
  <div
    :class="{
      'item flex items-center hover:shadow focus:shadow-lg m-2 px-4 rounded': true,
      'hover:shadow-lg': dragging
    }"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="dragging=false"
  >
    <font-awesome-icon :icon="gripVertical" class="text-gray-500 font-light"/>
    <div class="item__icon bg-gray-100 p-2 border-solid rounded-lg m-2">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="flex-grow">{{ name }}</div>
    <button class="btn-primary" v-if="isRemovable">Remove</button>
  </div>
</template>

<script>
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'ChannelItem',
  props: {
    icon: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isRemovable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    gripVertical () {
      return faGripVertical
    }
  },
  data () {
    return {
      dragging: false
    }
  },
  methods: {
    onDragStart (event, id) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', this.id)
      this.dragging = true
      this.$emit('on-drag-start')
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  &__icon {
    width: 40px;
    height: 40px;
    text-align: center;
  }
}
</style>
