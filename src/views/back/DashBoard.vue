<template>
  <div class="bg">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="optionArea">
            <user-nav></user-nav>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
  <toast-messages></toast-messages>
</template>

<script>
import UserNav from '@/components/back/UserNav.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/back/ToastMessages.vue'

export default {
  components: {
    UserNav,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)makotoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user)
      .then(res => {
        if (!res.data.success) this.$router.push('login')
      })
  }
}
</script>
