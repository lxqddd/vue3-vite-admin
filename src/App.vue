<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme'

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
</script>

<template>
  <div style="height: 100%">
    <router-view />
  </div>
</template>
