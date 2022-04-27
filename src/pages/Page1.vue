<script>
import { fmtDate } from '../utils'
export default {
  name: 'TmPage1',
  zhName: '页面1',
  data() {
    return {
      time: fmtDate(new Date()),
    }
  },
  mounted() {
    const timer = setInterval(() => {
      this.time = fmtDate(new Date())
    }, 1000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  },
}
</script>

<template>
  <div class="tm-main-page">
    <div style="display: flex;height: 100vh;align-items: center;justify-content: center;flex-direction: column;font-size: 100px;line-height: 100px;">
      <div>Page 1</div>
      <div>{{ time }}</div>
    </div>
  </div>
</template>
