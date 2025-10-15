<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4 mb-4">
                    <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>追蹤清單</span>
                </div>
                <h1>追蹤清單</h1>
                <div class="container">
                    <div class="row">
                        <div class="col-12"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FollowList',
  data () {
    return {
      favorite: JSON.parse(localStorage.getItem('favoriteList')) || []
    }
  },
  created () {
    console.log(this.favorite)
  }
}
</script>
