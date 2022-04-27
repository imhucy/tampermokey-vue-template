<script>
import { loadPages } from '@utils'
const { PageComponents, pageList } = loadPages()
export default {
  name: 'App',
  components: {
    ...PageComponents,
  },
  data() {
    return {
      isOpen: 2,
      currentPage: pageList[0].name,
      pageList,
    }
  },
  watch: {
    isOpen() {
      if (this.isOpen > 1)
        window.addEventListener('keyup', this.handleEscHotkey)
      else
        window.removeEventListener('keyup', this.handleEscHotkey)
    },
  },
  mounted() {},
  methods: {
    open() {
      this.isOpen = 1
    },
    close() {
      this.isOpen = 0
    },
    handleEscHotkey(event) {
      if (event.keyCode === 27)
        this.close()
    },
    end(evt) {
      if (this.isOpen === 1) {
        setTimeout(() => {
          this.isOpen = 2
        }, 100)
      }
    },
  },
}
</script>

<template>
  <div class="tm-main-container">
    <tm-page v-model="currentPage" :is-open.sync="isOpen" :pages="pageList">
      <component :is="currentPage"></component>
    </tm-page>
    <div
      class="tm-main-start-ball"
      :class="['is-open-' + isOpen]"
      @click="open"
      @transitionend="end"
    >
      <div class="icon-menu">
        <div class="icon-menu__line"></div>
        <div class="icon-menu__line"></div>
        <div class="icon-menu__line"></div>
      </div>
    </div>
  </div>
</template>
