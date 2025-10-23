<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4 mb-4">
                    <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>咖啡與茶</span>
                </div>
                <h1>咖啡與茶</h1>
                <div class="container">
                    <div class="row justify-content-center pt-5">
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12 text-center">
                            <button class="btn btn-outline-brown" type="button" style="width: 200px;" @click="coffee = true" :class="{ clicked : coffee }">咖啡</button>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12 text-center">
                            <button class="btn btn-outline-brown" type="button" style="width: 200px;" @click="coffee = false" :class="{ clicked : !coffee }">茶</button>
                        </div>
                        <div class="col-lg-8 col-md-12 col-sm-12 col-12 pt-5">
                            <div v-if="coffee">
                                <div class="float-lg-end float-md-end floatImg ps-2 pb-4">
                                    <img src="../../assets/img/coffetea01.jpg" alt="" class="img-fluid">
                                </div>
                                <p>咖啡的確切起源無從得知，但最廣為人知的故事是，西元九世紀，傳說中的衣索比亞牧羊人卡爾迪（Kaldi）發現羊群們吃了一種紅色果實後會異常地興奮。他將果實帶到修道院，將果實以火烘烤後，他與修道院長聞到咖啡豆烤後的芳香，將豆子磨碎沖入熱水後，有提神的效果，可助於僧侶們長時間夜間祈禱保持清醒。</p>
                                <p>在咖啡豆被發現後，被用於各種場合，並發揚於世界各地。</p>
                                <p>目前世界上最普遍的咖啡樹種類即是阿拉比卡（Arabica），同時也是前述衣索比亞咖啡的起源樹。其次還有羅布斯塔（Robusta）、利比里卡（Liberica）與卓別卡（Excelsa）等種類。</p>
                                <p>那麼我們在咖啡店或是便利超商看到的「藍山、「耶加雪菲（Yirgacheffe）」、「曼特寧（Mandheling）」、「耶加雪菲（Yirgacheffe）」等等，指的又是什麼呢？</p>
                            </div>
                            <div v-else>茶</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CoffeeAndTea',
  data () {
    return {
      coffee: true
    }
  }
}
</script>

<style>
.clicked{
    background-color: #4d3900;
    color: #ffffff;
}
.floatImg{
    max-width: 300px;
}
</style>
