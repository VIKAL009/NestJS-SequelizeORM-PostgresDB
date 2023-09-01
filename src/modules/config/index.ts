'use strict'

/**
/* Copyright (C) 2018 Actionable Science - All Rights Reserved
 * You may use, distribute and modify this code under the Terms of the license
 * 
 * author  Actionable Science
 * version 1.0, 16/05/2018
 * since   NodeJS 8.11.1
 */
const path = require('path')

let customLogger
let logger
let credential
let client
let config: any = {}
// const { DefaultAzureCredential } = require('@azure/identity')
// const { SecretClient } = require('@azure/keyvault-secrets')

require('env-yaml').config({ path: path.join(__dirname, '../../../.env.yml') })

function setConfig(obj) {
	if (!obj) return
	try {
		config.pubsub = {
			channels: (config.pubsub && config.pubsub.channels) || [],
		}
		
		
		
		
		config.env = obj.NODE_ENV || config.env || 'dev'
		config.logger = {
			level: obj.LOG_LEVEL || (config.logger && config.logger.level) || 'info',
		}
		config.server = {
			devport: obj.PORT || (config.server && config.server.devport) || 3000,
			testport: obj.TESTPORT || (config.server && config.server.testport) || 3001,
			port:
				config.env === 'test' ? obj.TESTPORT || (config.server && config.server.testport) || 3001 : obj.PORT || (config.server && config.server.port) || 3000,
		}
		config.learningAppDefaultTenantId = obj.learningAppDefaultTenantId || config.learningAppDefaultTenantId

		config.jamesDefaultTenantId = obj.jamesDefaultTenantId || config.jamesDefaultTenantId
		config.morselDefaultTenantId = obj.morselDefaultTenantId || config.morselDefaultTenantId

		config.defaultTenantId = obj.defaultTenantId || config.defaultTenantId || '2ba50fef-d76c-4fb2-b85c-e94f5048d1a9'
		config.targetTenantDomain = obj.targetTenantDomain || config.targetTenantDomain
		config.teamsDefaultTenantId = obj.teamsDefaultTenantId || config.teamsDefaultTenantId
		config.homeUrl = obj.homeUrl || config.homeUrl
		config.cdnUri = obj.cdnUri || config.cdnUri
		
		config.socketio = {
			useRedis: obj.SOCKETIO_REDIS || (config.socketio && config.socketio.useRedis),
		}
		config.application = {
			appModels: [],
			
			// paramPaths: ['/getUsersByRole/', '/BotConfig/', '/BotMessage/', '/TenantConfig/', '/Locale/', 'getUserTranscriptWithBot/', 'handOverFromBot/', 'handOverFromAgentToBot/', 'removeIncommingUser/', 'getPerformances/', 'getFaqQna/', 'getQnaList/', 'sampleAPIForSYNC/', 'syncQna/', 'updateQueueAssignment/', 'chatsessions/', 'count/', 'filterTrain/', 'getChatMessages/',],
			targetEnv: obj.targetEnv || (config.application && config.application.targetEnv) || '',
			
			
			
			sessionSecret: obj.EXPRESS_SESSION_SECRET || (config.application && config.application.sessionSecret),
			syncDB: obj.SYNC_DB === 'true' ? true : config.application && config.application.syncDB,
			defaultTenantId: obj.defaultTenantId || (config.application && config.application.defaultTenantId) || '2ba50fef-d76c-4fb2-b85c-e94f5048d1a9',
			learningAppDefaultTenantId: obj.learningAppDefaultTenantId || (config.application && config.application.learningAppDefaultTenantId),
			
			endPoint: obj.ENDPOINT_PREFIX != undefined ? obj.ENDPOINT_PREFIX : (config.application && config.application.endPoint) || '/api/v1',
			
			testTenantId: obj.testTenantId || (config.application && config.application.testTenantId),
			testServiceFileWithPath: obj.testServiceFileWithPath || (config.application && config.application.testServiceFileWithPath),
			appName: 'ConfigApi' || (config.application && config.application.appName),
			appControllers: (config.application && config.application.appControllers) || [
				'UserController',
			], //these are loaded by common-lib controllers
			
			
			cryptoSecret: obj.CRYPTO_SECRET || (config.application && config.application.cryptoSecret) || 'encryption secr',
			jwtSecret: obj.JWT_SECRET || (config.application && config.application.jwtSecret) || 'secret',
			jwtAlgorithm: obj.ALGORTHIM || (config.application && config.application.jwtAlgorithm) || 'HS256',
			routesToSkipAuthentication: [
				{ route: '/socket.io' },
				{ route: 'intentbot', methods: ['get'] },
				{ route: '/users', methods: ['get'] },
				{ route: 'whitelabel/findwithdefaulttenant', methods: ['get'] },
				{ route: 'locale', methods: ['get', 'post'] },
				{ route: 'api-docs', methods: ['get'] },

			],
			storageAccount: obj.storageAccount || (config.application && config.application.storageAccount),
			storageKey: obj.storageKey || (config.application && config.application.storageKey),
			imageContainer: obj.imageContainer || (config.application && config.application.imageContainer),
			overriddenModelInController: [
				
			],
			swaggerSkipRoutes: ['migration', 'reports'],
			localTest: obj.LOCAL_TEST === 'true' ? true : false || (config.application && config.application.localTest) || false,
			TenantService_URL: obj.TenantService_URL || (config.application && config.application.TenantService_URL) || 'http://tenant-service:8080/',
			
			tenantApiPrefix: obj.TENANT_API_PREFIX || (config.application && config.application.TENANT_API_PREFIX) || 'api/v1/',
			adminRestEp: obj.PULL_SERVICE_URL || (config.application && config.application.adminRestEp) || 'http://adminapi-service:8080/api/v1/',
			
		}
		config.globalTenantService_URL = obj.globalTenantService_URL || config.globalTenantService_URL
		
		config.queryMaxRecords = config.queryMaxRecords || 50000
		config.database = {
			poolSize: obj.POOL_SIZE || (config.database && config.database.poolSize),
			databaseURL: obj.DATABASE_URL || (config.database && config.database.databaseURL),
			username: obj.DATABASE_USERNAME || (config.database && config.database.username) || 'postgres',
			password: obj.DATABASE_PASSWORD || (config.database && config.database.password) || 'postgres',
			name: obj.DATABASE_NAME || (config.database && config.database.name) || 'postgres',
			host: obj.DATABASE_HOST || (config.database && config.database.host) || '127.0.0.1',
			port: obj.DATABASE_PORT || (config.database && config.database.port) || '5432',
			dialect: obj.DATABASE_DIALECT || (config.database && config.database.dialect) || 'postgres',
			schemaName: obj.DATABASE_SCHEMA || (config.database && config.database.schemaName) || 'public',
			ssl: obj.DATABASE_SSL || (config.database && config.database.ssl) || true,
			loggingEnabled: obj.DB_LOGGING_ENABLED != undefined ? JSON.parse(obj.DB_LOGGING_ENABLED) : config.database && config.database.loggingEnabled,
			forceSync: obj.DATABASE_FORCE_SYNC != undefined ? obj.DATABASE_FORCE_SYNC : config.database && config.database.forceSync,
			migrationMode: obj.DATABASE_MIGRATION_MODE != undefined ? obj.DATABASE_MIGRATION_MODE : 'Incremental',
			externalSchemas: obj.EXTERNAL_SCHEMAS != undefined ? JSON.parse(obj.EXTERNAL_SCHEMAS) : undefined || (config.database && config.database.externalSchemas),
		}
		config.health = {
			testSuccessTime: obj.HEALTH_SUCCESS_TIME ? parseInt(obj.HEALTH_SUCCESS_TIME) : 0,
			secret: obj.HEALTH_SECRET,
		}
		config.redis = {
			maxClients: obj.REDIS_MAX_CLIENTS || 20,
			url: obj.REDISURL || (config.redis && config.redis.url),
			password: obj.REDISPASS || (config.redis && config.redis.password),
			port: obj.REDIS_PORT || (config.redis && config.redis.port) || '6379',
			agentsKey: obj.serviceName || (config.redis && config.redis.agentsKey),
			outboundActionQueue: (config.redis && config.redis.outboundActionQueue) ||
				(obj.AdminOutboundActionQueues && obj.AdminOutboundActionQueues.split(',')) || [
		
				],
			inboundActionQueue: obj.inboundActionQueue || (config.redis && config.redis.inboundActionQueue) || 'AdminActionQueue',
			actionNamespace: obj.ActionNamespace || (config.redis && config.redis.actionNamespace) || 'action',
			serviceName: obj.serviceName || (config.redis && config.redis.serviceName),
		}
		/* Graph API ENV Config only for testing any aad app credentils only */
		config.tenantService =
			obj.tenantService != undefined ? Boolean(obj.tenantService == true || obj.tenantService.toLowerCase() == 'true') : config.tenantService || false
		/** QnAmaker URL version 4 - train QnA pairs to KnowledgeBase */
		
		config.multiTenant =
			obj.multiTenant != undefined ? Boolean(obj.multiTenant == true || obj.multiTenant.toLowerCase() == 'true') : config.multiTenant || false
		config.QNA_KBID_DEFAULT = obj.QNA_KBID || config.QNA_KBID_DEFAULT
		config.commonLibModels = config.commonLibModels || [
			
		]
		config.configEntityModels = config.configEntityModels || [
			
		]
		config.commonLibProps = config.commonLibProps || {
			Locale: { roles: ['asc_admin', 'tenant_admin'], permissions: [] },
			WhiteLabel: { roles: ['tenant_admin'], permissions: [] },
			
			// AppUpdateConfig: { roles: [], permissions: [] },
			Tenant: { roles: ['asc_admin'], permissions: [] },
			AppRoute: { roles: ['asc_admin'], permissions: [] },
			
			UserAttribute: { roles: ['user_admin'], permissions: [] },
			metrics: { roles: ['bot_analyst'], permissions: [] },
			analytics: {
				roles: ['bot_analyst', 'chat_agent', 'chat_agent_supervisor'],
				permissions: [],
			},
			// ADTenantBotConfig: { roles: [], permissions: [] },
			User: { roles: ['user_admin'], permissions: [] },
			TenantConfig: { roles: ['asc_admin'], permissions: [] },
			Permission: { roles: ['asc_admin'], permissions: [] },
			Setting: {
				roles: ['asc_admin', 'chat_agent_supervisor'],
				permissions: [],
			},
		} // all common models that need to be instantiated should have properties set in respective application.

		//** Property used to specify that model fallback to default Tenant */
		config.fallbackToDefaultTenantModel = [
			
			'Locale',
			
		]
		config.apiRateLimit = obj.API_RATE_LIMIT || config.apiRateLimit || 1000
		config.apiRateLimitMS = obj.API_RATE_LIMIT_MS || config.apiRateLimitMS
		config.testTenantId = obj.testTenantId || config.testTenantId
		config.paginationPageSize = 1000

		// For local testing
		
		
		
		config.webPush = {
			publicKey: obj.WEB_PUSH_PUBLIC_KEY || config.publicKey || 'BNDrByJXmY7ISZTcjo-SG5XKxORKhP_0Y4MhCj3gNuLowNBBJLyZdupIvdD8p5j6cP6BaMp_02LknzTd6YrUSdw',
			privateKey: obj.WEB_PUSH_PRIVATE_KEY || config.privateKey || 's1sSrPmv4LaAD7EbQZDGXfJQowNQ4eboBqNDY0P-vpI',
			vapIdEmail: obj.WEB_PUSH_EMAIL || config.vapIdEmail || 'mailto:test@test.com',
		}

	} catch (e) {
		console.log(`Error in initializing config : ${e}`)
	}
}
setConfig(process.env)
config.init = async () => {
	// initialize all the keyvault params here...
	if (logger) return // the init function was already called
	if (!customLogger) customLogger = require('../common-lib/middleware/logger').default
	if (!logger) logger = customLogger(path.basename(__filename))
	if (process.env.KEY_VAULT_NAME && process.env.NODE_ENV !== 'local') {
		try {
			const keyVaultName = process.env['KEY_VAULT_NAME']
			const KVUri = 'https://' + keyVaultName + '.vault.azure.net'

			if (keyVaultName) {
				// if (!credential) credential = new DefaultAzureCredential()
				// if (!client) client = new SecretClient(KVUri, credential)
				if(client){
				let vaultParams = {}
				for (let key of Object.keys(process.env)) {
					let vaultKey, retrievedSecret, prop
					if (key.includes('VAULT_') && key !== 'KEY_VAULT_NAME') {
						prop = key.split('VAULT_')[1]
						vaultKey = process.env[key]
						retrievedSecret = await client.getSecret(vaultKey)
						// console.log(`dbpass ${retrievedSecret.value}`)
						vaultParams[prop] = retrievedSecret.value
					}
				}
				setConfig(vaultParams)
			}
			}
		} catch (e) {
			logger.error(`Error in initializing config ${e}`)
		}
	}
}
export default config
// module.exports = config
