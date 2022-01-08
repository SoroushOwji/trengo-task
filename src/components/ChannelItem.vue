<template>
  <div
    class="item flex items-center hover:shadow focus:shadow-lg m-2 px-4 rounded"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="dragging=false"
  >
    <font-awesome-icon :icon="gripVertical" class="text-gray-500 font-light"/>
    <div class="item__icon bg-gray-100 p-2 border-solid rounded-lg m-2">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="flex-grow">{{ name }}</div>
    <button @click="$emit('remove', index)" class="btn" v-if="isRemovable">Remove</button>
  </div>
</template>

<script>
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'ChannelItem',
  emits: ['remove', 'on-drag-start'],
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
    },
    id: { // todo remove id if need be
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
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
    onDragStart (event) {
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
