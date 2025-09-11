<template>
    <div>
        <div class="text-end mt-4">
            <button class="btn btn-brown" @click="openCouponModal(true)">建立新的優惠券</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    <del-modal></del-modal>
</template>

<script>
import DelModal from '@/components/DelModal.vue'

export default {
  components: {
    DelModal
  }
}
</script>
