<template>
    <div class="areaBottom mb-4">
        <h2 class="text-center"><span>追隨我們</span></h2>
        <div class="container">
            <div class="row my-5">
                <div class="col-12 p-0">
                    <div class="followUs p-5-0">
                        <div class="followBox px-3 py-5 mx-auto">
                            <label for="follow" id="followLabel" class="mb-4 d-block w-100">留下您的Email，以獲得最新資訊及最新優惠！</label>
                            <div class="d-flex">
                                <input type="email" id="follow" placeholder="輸入Email"><button type="button" class="btn btn-brown"><i class="bi bi-send"></i></button>
                            </div>
                            <div class="text_underline"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FollowUs'
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
.text_underline{
    width: 75%;
    position: relative;
    border-top: 1px solid #c2c2c2;
}

@media (min-width: 576px){
    .p-5-0 {
        padding: 3rem!important;
    }
}
</style>
