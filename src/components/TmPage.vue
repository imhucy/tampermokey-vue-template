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
    return {
      isOpenWhenMobile: false,
    }
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
      this.isOpenWhenMobile = false
    },
    updateIsOpen(val) {
      this.$emit('update:isOpen', val)
      this.isOpenWhenMobile = false
    },
    handleOpen() {
      this.isOpenWhenMobile = true
    },
    handleClose() {
      this.isOpenWhenMobile = false
    },
  },
}
</script>
<template>
  <transition name="fade" mode="out-in">
    <div v-if="isOpen >= 1" class="tm-main-pages">
      <!-- 移动端菜单呼出 -->
      <transition name="fade">
        <div
          v-if="isOpenWhenMobile"
          class="hidden-sm-and-up when-xs-mask"
          @click="handleClose"
        ></div>
      </transition>
      <div class="hidden-sm-and-up when-xs-btn" @click="handleOpen">
        <div class="icon-menu">
          <div class="icon-menu__line"></div>
          <div class="icon-menu__line"></div>
          <div class="icon-menu__line"></div>
        </div>
      </div>
      <div
        class="tm-main-pages__nav"
        :class="{'is-open-when-mobile': isOpenWhenMobile}"
      >
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
          关闭（Esc）
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <slot></slot>
      </transition>
    </div>
  </transition>
</template>
