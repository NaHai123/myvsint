import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const connectData = {
	operate: '',
	host: '',
	port: '',
	username: '',
	password: ''
}

export default new Vuex.Store({
	connectData
})
