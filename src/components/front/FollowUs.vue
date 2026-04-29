<template>
  <div class="areaBottom mb-4">
    <h2 class="text-center"><span>追隨我們</span></h2>
    <div class="container">
      <div class="row my-5">
        <div class="col-12 p-0">
          <div class="followUs p-5-0">
            <div class="followBox px-3 py-5 mx-auto">
              <v-form v-slot="{ errors }" @submit="emailSend">
                <label for="email" id="followLabel" class="mb-4 d-block w-100 form-label"
                  >留下您的Email，以獲得最新資訊及最新優惠！</label
                >
                <div>
                  <div class="input-group mb-3">
                    <v-field
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors['email'] }"
                      id="email"
                      placeholder="請輸入您的Email"
                      name="email"
                      rules="email|required"
                      v-model="user.email"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <button
                      type="submit"
                      class="input-group-text btn btn-tea-green text-ota-white"
                      id="basic-addon2"
                    >
                      <i class="bi bi-send"></i>
                    </button>
                    <error-message name="email" class="invalid-feedback w-100"></error-message>
                  </div>
                </div>
              </v-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowUs',
  data() {
    return {
      user: {
        email: ''
      }
    }
  },
  methods: {
    emailSend() {
      alert(`感謝您的訂閱！\n您的Email ${this.user.email} 將會收到我們的最新訊息！`)
      this.user.email = ''
    }
  }
}
</script>

<style>
.followUs {
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.9);
  background: url(../../assets/img/followus.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.followUs::before {
  z-index: 1;
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
.followBox {
  position: relative;
  z-index: 999;
  background-color: #ffffff;
  max-width: 600px;
  box-sizing: border-box;
}
#follow {
  width: 80%;
  border: none;
  outline: none;
  padding-bottom: 8px;
  box-sizing: border-box;
}
.text_underline {
  width: 75%;
  position: relative;
  border-top: 1px solid #c2c2c2;
}

@media (min-width: 576px) {
  .p-5-0 {
    padding: 3rem !important;
  }
}
</style>
