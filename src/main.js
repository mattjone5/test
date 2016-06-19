import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import TimeEntries from './components/TimeEntries'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Home
  },
  '/time-entries': {
    component: TimeEntries
  }
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
