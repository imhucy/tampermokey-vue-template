<script>
export default {
  name: 'App',
  data() {
    return {
      isOpen: false,
      page: 'home',
      pages: [
        'home',
        'page-1',
        'page-2',
        'page-3',
      ],
    }
  },
  mounted() {
    let i = 1
    setInterval(() => {
      this.page = this.pages[i++ % this.pages.length]
    }, 3000)
  },
  methods: {
    open() {
      this.isOpen = 1
    },
    close() {
      this.isOpen = 0
    },
    end(evt) {
      console.log(evt)
      if (this.isOpen === 1)
        this.isOpen = 2
    },
  },
}
</script>

<template>
  <div class="tm-main-container">
    <div class="tm-main-start-ball" :class="['is-open-' + isOpen]" @click="open" @transitionend="end">
    </div>
    <div v-if="isOpen > 1" class="tm-main-pages">
      <button class="close-button" @click="close">
        <div class="close-button__line close-button__line--first"></div>
        <div class="close-button__line close-button__line--second"></div>
      </button>
      {{ page }}
      <transition name="fade">
        <div v-if="isOpen > 1 && page === 'home'" class="tm-main-page">
          <p>{{ p }}</p>
          <p>
            我们的目标是提供这样一个仓库，让它尽可能全面收录优秀的开源库，并免费为之提供 CDN 加速服务，使之有更好的访问速度和稳定的环境。同时，我们也提供开源库源接入的入口，让所有人都可以提交开源库，包括 JavaScript、CSS、图片和 swf 等静态文件。
          </p>
          <p>
            我们的目标是提供这样一个仓库，让它尽可能全面收录优秀的开源库，并免费为之提供 CDN 加速服务，使之有更好的访问速度和稳定的环境。同时，我们也提供开源库源接入的入口，让所有人都可以提交开源库，包括 JavaScript、CSS、图片和 swf 等静态文件。
          </p>
          <p>
            我们的目标是提供这样一个仓库，让它尽可能全面收录优秀的开源库，并免费为之提供 CDN 加速服务，使之有更好的访问速度和稳定的环境。同时，我们也提供开源库源接入的入口，让所有人都可以提交开源库，包括 JavaScript、CSS、图片和 swf 等静态文件。
          </p>
          <p>
            我们的目标是提供这样一个仓库，让它尽可能全面收录优秀的开源库，并免费为之提供 CDN 加速服务，使之有更好的访问速度和稳定的环境。同时，我们也提供开源库源接入的入口，让所有人都可以提交开源库，包括 JavaScript、CSS、图片和 swf 等静态文件。
          </p>
        </div>
        <div v-else-if="isOpen > 1 && page === 'page-1'" class="tm-main-page">
          <p>{{ page }}</p>
        </div>
        <div v-else-if="isOpen > 1 && page === 'page-2'" class="tm-main-page">
          <p>{{ page }}</p>
        </div>
        <div v-else-if="isOpen > 1 && page === 'page-3'" class="tm-main-page">
          <p>{{ page }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>
