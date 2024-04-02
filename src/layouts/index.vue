<script lang="ts" setup>
import useResize from './hooks/useResize'
import LeftMode from './LeftMode.vue'

/** Layout 布局响应式 */
useResize()
</script>

<template>
  <div>
    <LeftMode />
  </div>
</template>

<style lang="scss" scoped>
.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}
</style>
