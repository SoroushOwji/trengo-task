import { shallowMount } from '@vue/test-utils'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'

import ChannelItem from '@/components/ChannelItem.vue'
import Button from '@/components/Button'

describe('ChannelItem.vue', () => {
  it('renders channel name', () => {
    const name = 'channel name'
    const icon = faGripVertical
    const isRemovable = false
    const index = 0
    const draggable = false
    const wrapper = shallowMount(ChannelItem, {
      propsData: { icon, name, isRemovable, index, draggable }
    })
    expect(wrapper.text()).toMatch(name)
  })

  it('renders remove button', () => {
    const name = 'channel name'
    const icon = faGripVertical
    const isRemovable = true
    const index = 0
    const draggable = false
    const wrapper = shallowMount(ChannelItem, {
      propsData: { icon, name, isRemovable, index, draggable }
    })
    expect(wrapper.findComponent(Button)).toBeTruthy()
  })

  it('emits removal and dragstart', () => {
    const name = 'channel name'
    const icon = faGripVertical
    const isRemovable = true
    const index = 0
    const draggable = false
    const wrapper = shallowMount(ChannelItem, {
      propsData: { icon, name, isRemovable, index, draggable }
    })
    wrapper.vm.$emit('remove', 2)
    wrapper.vm.$emit('dragstart', {}, 2)
    expect(wrapper.emitted().remove).toBeTruthy()
    expect(wrapper.emitted().dragstart).toBeTruthy()
  })
})
