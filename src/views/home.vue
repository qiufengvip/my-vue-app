<template>
  <div>{{ message }}</div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
console.log('home.vue')

export default defineComponent({
  setup(props,Context){
    const message = 'zhaaaa'
    return {
      message
    }
  }
})
</script>
<style lang="less" scoped>

</style>
