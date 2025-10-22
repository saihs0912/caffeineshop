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
                            <div v-if="coffee">咖啡</div>
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
</style>
