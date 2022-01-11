<template>
  <div
    :class="{
      'item flex items-center hover:shadow px-4 m-2 bg-white': true,
      'cursor-move': draggable,
      'z-10': dragging,
      'bg-green-200': hovering
    }"
    :draggable="draggable"
    @dragover="hovering = true"
    @dragleave="onDragLeave"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @drop="onDrop"
  >
    <font-awesome-icon v-if="draggable" :icon="gripVertical" class="text-gray-500 font-light mr-2"/>
    <div class="item__icon bg-gray-100 p-2 border-solid rounded-lg m-2">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="flex-grow font-semibold">{{ name }}</div>
    <Button @click="$emit('remove', index)" v-if="isRemovable">Remove</Button>
  </div>
</template>

<script>
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/Button'
export default {
  name: 'ChannelItem',
  components: { Button },
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
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    gripVertical () {
      return faGripVertical
    }
  },
  methods: {
    onDragStart (event) {
      this.dragging = true
      this.$emit('dragstart', event, this.index)
    },
    onDragEnd () {
      this.dragging = false
    },
    onDrop (event) {
      this.dragging = false
      this.hovering = false
      this.$emit('drop', event, this.index)
    },
    onDragLeave () {
      let ref

      const stopThrottle = () => {
        ref = setTimeout(() => {
          this.hovering = false
        }, 300)
      }

      clearTimeout(ref)
      stopThrottle()
    }
  },
  data () {
    return {
      dragging: false,
      hovering: false
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
