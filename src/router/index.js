import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const trainingEnvironmentConfiguration = r => require.ensure([], () => r(require('@/page/trainingEnvironmentConfiguration')), 'trainingEnvironmentConfiguration');
const systemLogConfiguration = r => require.ensure([], () => r(require('@/page/systemLogConfiguration')), 'systemLogConfiguration');
const ssh = r => require.ensure([], () => r(require('@/page/ssh')), 'ssh');
const sshlogin = r => require.ensure([], () => r(require('@/page/sshlogin')), 'sshlogin');
const map = r => require.ensure([], () => r(require('@/page/map')), 'map');
const mapB = r => require.ensure([], () => r(require('@/page/mapB')), 'mapB');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const modelEffectVerification = r => require.ensure([], () => r(require('@/page/modelEffectVerification')), 'modelEffectVerification');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

// wjh kaifa
//模型部署
const modelDeployment = r => require.ensure([], () => r(require('@/page/modelDeployment')), 'modelApply');

const routes = [

	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/trainingEnvironmentConfiguration',
			component: trainingEnvironmentConfiguration,
			meta: ['模型部署', '配置数据源'],
		},{
			path: '/map',
			component: map,
			meta: ['数据管理', '地图1'],
		},{
			path: '/mapB',
			component: mapB,
			meta: ['数据管理', '地图2'],
		},{
			path: '/systemLogConfiguration',
			component: systemLogConfiguration,
			meta: ['系统运维', '故障上报配置'],
		},{
			path: '/sshlogin',
			component: sshlogin,
			meta: ['系统运维', '终端登录'],
		},{
			path: '/ssh',
			component: ssh,
			meta: ['系统运维', '终端窗口'],
		},
		{
			path : '/modelDeployment',
			component:modelDeployment
		},
		{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/modelDeployment',
			component: modelDeployment,
			meta: ['图表', '用户数据'],
		},{
			path: '/modelEffectVerification',
			component: modelEffectVerification,
			meta: ['模型定性', '一键验证'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
