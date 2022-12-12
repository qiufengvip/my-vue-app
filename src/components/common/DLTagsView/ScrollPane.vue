<template>
  <div class="scroll-pane">
    <div class="move-btn" @click="handleScrollBtn(100)">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
      <slot />
    </el-scrollbar>

    <div class="move-btn move-btn-right" @click="handleScrollBtn(-100)">
      <el-icon><ArrowRight /></el-icon>
    </div>

    <div class="close-con">
      <el-dropdown size="small" trigger="click" @command="handleCommand">
        <el-icon :size="16"><CircleClose /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="others">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, ref } from 'vue';
import { ArrowLeft, ArrowRight, CircleClose } from '@element-plus/icons';

const tagAndTagSpacing = 4;

const scrollContainer = ref();

const scrollWrapper = computed(() => {
  return scrollContainer.value.$el.firstElementChild;
});

const handleScroll = (e: any) => {
  // console.log(e);
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  const $scrollWrapper = scrollWrapper.value;
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
};

function handleScrollBtn(offset: any) {
  const outerWidth = scrollContainer.value.$el.offsetWidth;
  const bodyWidth = scrollWrapper.value.scrollWidth;
  const scrollLeft = scrollWrapper.value.scrollLeft;
  if (offset > 0) {
    scrollWrapper.value.scrollLeft = scrollLeft - offset > 0 ? scrollLeft - offset : 0;
  } else {
    scrollWrapper.value.scrollLeft = scrollLeft + outerWidth - offset > bodyWidth ? bodyWidth - outerWidth : scrollLeft - offset;
  }
}

const $parent: any = getCurrentInstance()?.parent;

function moveToTarget(currentTag: any) {
  const $container = scrollContainer.value.$el;
  const $containerWidth = $container.offsetWidth;
  const $scrollWrapper = scrollWrapper.value;
  const tagList: any = $parent.refs.tag;

  let firstTag = null;
  let lastTag = null;

  // 找到第一个 tag 和最后一个 tag
  if (tagList.length > 0) {
    firstTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
  } else {
    // 找到前一个 和后一个 tag
    const currentIndex = tagList.findIndex((item: any) => item === currentTag);
    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];

    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
}

function handleCommand(val: any) {
  if (val === 'others') {
    $parent.exposed.closeOthersTags();
  } else {
    $parent.exposed.closeAllTags();
  }
}

defineExpose({
  moveToTarget,
});
</script>

<style lang="scss" scoped>
.scroll-pane {
  display: flex;
  height: 100%;

  .move-btn {
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &-right {
      padding: 0 0 0 10px;
    }
  }
  .close-con {
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 38px;
  }
}
</style>
