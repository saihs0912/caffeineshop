<template>
    <div class="mb-5 mt-5">
      <p class="text-center fw-bolder fs-3">請輸入購買者資料</p>
      <div class="my-5 justify-content-center">
        <v-form class="col-md-6 mx-auto" v-slot="{ errors }">
          {{ errors }}
          <div class="md-3 mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" @change="sendData"></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
          <div class="md-3 mb-3">
            <label for="name" class="form-label">姓名</label>
            <v-field id="name" name="name" type="text" class="form-control" :class="{ 'is-invalid': errors['name'] }" placeholder="請輸入姓名" :rules="isName" v-model="form.user.name" @change="sendData"></v-field>
            <error-message name="name" class="invalid-feedback"></error-message>
          </div>
          <div class="md-3 mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field id="tel" name="tel" type="tel" class="form-control" :class="{ 'is-invalid': errors['tel']}" placeholder="請輸入電話" :rules="isPhone" v-model="form.user.tel"></v-field>
            <error-message name="tel" class="invalid-feedback"></error-message>
          </div>
          <div class="md-3 mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field id="address" name="address" type="text" class="form-control" :class="{ 'is-invalid': errors['address']}" placeholder="請輸入地址" :rules="isAddress" v-model="form.user.address"></v-field>
            <error-message name="address" class="invalid-feedback"></error-message>
          </div>
          <div class="md-3 mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="" id="message" class="form-control" v-model="form.message" cols="30" role="10"></textarea>
          </div>
          <button type="button" class="btn">送出</button>
        </v-form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CheckCustomer',
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  emits: ['sendData'],
  methods: {
    isName (value) {
      const nameEntry = /^[\u4e00-\u9fa5]+$|^[A-Z][a-zA-Z\s-]+$/
      return nameEntry.test(value) ? true : '請輸入正確的姓名'
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
    },
    isAddress (value) {
      return value ? true : '請輸入地址'
    },
    sendData () {
      console.log(this)
      this.$emit('sendData', this.form)
    }
  },
  watch: {
    error (newValue, oldValue) {
      console.log(newValue)
    }
  }
}
</script>
