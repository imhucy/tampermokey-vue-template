<script>
const pages = require.context('../pages', false, /\.vue$/)
const pagesKeys = pages.keys()
const PageComponents = {}
const pageList = []
pagesKeys.map(pages).forEach((pageComponent, i) => {
  const PageComponent = pageComponent.default
  const pagePath = pagesKeys[i]
  const temp_1 = pagePath.split('/')
  const filename = temp_1.pop()
  const temp_2 = filename.split('.')
  const componentName = temp_2[0]
  PageComponents[componentName] = PageComponent
  pageList.push({ zhName: PageComponent.zhName, name: componentName })
})
console.log(PageComponents)
export default {
  name: 'App',
  components: {
    ...PageComponents,
  },
  data() {
    return {
      isOpen: 0,
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
    <tm-page v-model="currentPage" :is-open.sync="isOpen" :pages="pageList">
      <component :is="currentPage"></component>
    </tm-page>
  </div>
</template>
