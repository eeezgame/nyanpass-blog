import DefaultTheme from 'vitepress/theme'
import Docs from './components/Docs.vue'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Docs', Docs)
  }
}