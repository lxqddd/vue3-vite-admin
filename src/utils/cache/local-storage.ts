/** 统一处理 localStorage */

import CacheKey from '@/constants/cache-key'
import { type SidebarClosed, type SidebarOpened } from '@/constants/app-key'
import { type ThemeName } from '@/hooks/useTheme'
import { type LayoutSettings } from '@/config/layouts'

// #region 系统布局配置
export function getConfigLayout() {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT)
  return json ? (JSON.parse(json) as LayoutSettings) : null
}
export function setConfigLayout(settings: LayoutSettings) {
  localStorage.setItem(CacheKey.CONFIG_LAYOUT, JSON.stringify(settings))
}
export function removeConfigLayout() {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT)
}
// #endregion

// #region 侧边栏状态
export function getSidebarStatus() {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export function setSidebarStatus(sidebarStatus: SidebarOpened | SidebarClosed) {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}
// #endregion

// #region 正在应用的主题名称
export function getActiveThemeName() {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null
}
export function setActiveThemeName(themeName: ThemeName) {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}
// #endregion

export function getCachedViews() {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return JSON.parse(json ?? '[]') as string[]
}
export function setCachedViews(views: string[]) {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}
// #endregion
