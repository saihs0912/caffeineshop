<template>
    <div class="bg">
        <div class="container">
            <form class="row justify-content-center" @submit.prevent="signIn">
                <div class="col-md-4 loginBox">
                    <div style="width: 60px; margin: 0 auto;"><img src="../../assets/logo/logo-1.png" width="80" alt=""></div>
                    <h3 style="text-align: center;">後台管理系統</h3>
                    <div class="form-group">
                        <div class="mb-2">
                            <label for="inputEmail" class="sr-only">請輸入Email</label>
                            <input type="email" id="inputEmail" name="userEmail" placeholder="請輸入Email" class="form-control" v-model="user.username">
                        </div>
                        <div class="mb-2">
                            <label for="inputPassword" class="sr-only">請輸入密碼</label>
                            <input type="password" id="inputPassword" name="userPass" placeholder="請輸入密碼" class="form-control" v-model="user.password" autocomplete="new-password">
                        </div>
                        <div class="text-end mt-4">
                            <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <toast-messages></toast-messages>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/back/ToastMessages.vue'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  methods: {
    signIn () {
      const url = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(url, this.user)
        .then(res => {
          if (res.data.success) {
            const { token, expired } = res.data
            this.$InformMessage(res, '登入')
            document.cookie = `makotoToken=${token}; expires=${expired}`
            setTimeout(() => {
              this.$router.push('/dashboard/productlist')
            }, 3000)
          }
        })
    }
  }
}
</script>

<style>
.bg{
    min-height: 100vh;
    background: url(../../assets/banners/wallpaper.png) no-repeat center/cover;
}
.loginBox{
    background: #fff;
    border-radius: 10px;
    margin-top: 40px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 20px #c0c0c0;
}
</style>
