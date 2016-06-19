<template>
  <h1>{{msg}}</h1>
  <div v-for="branch in branches">
    <input type="radio"
      name="branch"
      :id="branch"
      :value="branch"
      v-model="currentBranch">
    <label :for="branch">{{branch}}</label>
  </div>
  <p>vuejs/vue@{{currentBranch}}</p>
  <ul>
    <li v-for="record in commits">
      <a :href="record.html_url" target="_blank" class="commit">{{record.sha.slice(0, 7)}}</a>
      - <span class="message">{{record.commit.message | truncate}}</span><br>
      by <span class="author">{{record.commit.author.name}}</span>
      at <span class="date">{{record.commit.author.date | formatDate}}</span>
    </li>
  </ul>
</template>

<script>
const apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

export default {
  data () {
    return {
      msg: 'Title',
      branches: ['master', 'dev'],
      currentBranch: 'master',
      commits: null
    }
  },

  created () {
    this.fetchData()
  },

  watch: {
    currentBranch: 'fetchData'
  },

  filters: {
    truncate (v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    fetchData () {
      console.log('fetching data')
      this.$http.get(apiURL + this.currentBranch).then((response) => {
        this.commits = response.data
      }, (response) => {
      })
    }
  }

}
</script>

<style>
a {
  text-decoration: none;
  color: #f66;
}
li {
  line-height: 1.5em;
  margin-bottom: 20px;
}
.author, .date {
  font-weight: bold;
}
</style>
