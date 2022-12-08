<template>
  <svg aria-hidden="true" class="svg-icon" :style="'fill: ' + color + ';color:' + color + ';'">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const symbolId = ref('');
const props = defineProps({
  // 使用的svg图标名称，也就是svg文件名
  name: {
    type: String,
    required: true,
    default: 'icon',
  },
  prefix: {
    type: String,
    default: 'icon',
  },
  color: {
    type: String,
    default: '#333',
  },
});
onMounted(() => {
  symbolId.value = `#${props.prefix}-${props.name}`;
});
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 16px;
  height: 16px;
  color: currentColor;
  fill: currentColor;
}
</style>
