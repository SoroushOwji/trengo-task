<template>
  <button
    :class="{
    'py-2 px-8 font-semibold focus:outline-none rounded-full': true,
    'hover:bg-gray-100 text-gray-500 focus:text-black' : isDefault,
    'bg-black text-white hover:bg-gray-800 focus:bg-gray-900' : isPrimary,
    }"
    @click="$emit('click')"
  >
    <slot/>
  </button>
</template>

<script>

export default {
  props: {
    color: {
      required: false,
      default: 'default',
      type: String
    }
  },
  name: 'Button',
  computed: {
    isDefault () {
      return this.color === 'default'
    },
    isPrimary () {
      return this.color === 'primary'
    }
  }
}
</script>
