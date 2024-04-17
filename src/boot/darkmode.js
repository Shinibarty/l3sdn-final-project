import { boot } from 'quasar/wrappers'
import { Dark } from 'quasar'

export default boot(({ app }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  Dark.set(prefersDark)

  app.config.globalProperties.$toggleDarkMode = Dark.toggle
})
