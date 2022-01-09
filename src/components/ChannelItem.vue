<template>
  <div
    class="item flex items-center hover:shadow px-4 rounded cursor-move"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="dragging=false"
    @drop="$emit('drop', $event, index)"
  >
    <font-awesome-icon :icon="gripVertical" class="text-gray-500 font-light mr-2"/>
    <div class="item__icon bg-gray-100 p-2 border-solid rounded-lg m-2">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="flex-grow font-semibold">{{ name }}</div>
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
      this.$emit('dragstart', event, this.index)
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  position: relative;
  &__icon {
    width: 40px;
    height: 40px;
    text-align: center;
  }
}
</style>
