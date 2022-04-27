<script>
export default {
  name: 'TmPage',
  props: {
    value: {
      type: String,
      default: '',
    },
    isOpen: Number,
    pages: Array,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    value: {
      handler: 'initValue',
      immediate: true,
    },
  },
  created() {
    this.init()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    init() {
      // do something
    },
    initValue() {
      this.innerValue = this.value
    },
    updateValue(val) {
      this.$emit('input', val)
    },
    updateIsOpen(val) {
      this.$emit('update:isOpen', val)
    },
  },
}
</script>
<template>
  <transition name="fade" mode="out-in">
    <div v-if="isOpen >= 1" class="tm-main-pages">
      <div class="tm-main-pages__nav">
        <div
          v-for="nav in pages"
          :key="nav"
          class="tm-main-pages__nav-item"
          :class="{'is-active': innerValue === nav.name}"
          @click="updateValue(nav.name)"
        >
          {{ nav.zhName }}
        </div>
        <div class="tm-main-pages__nav-item" @click="updateIsOpen(0)">
          Close
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <slot></slot>
      </transition>
    </div>
  </transition>
</template>
