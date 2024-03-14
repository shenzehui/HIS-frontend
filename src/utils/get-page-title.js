import defaultSettings from '@/settings'

const title = defaultSettings.title || '门诊挂号系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
