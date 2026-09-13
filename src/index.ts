export default {
	async fetch(request, _env, _ctx): Promise<Response> {
		return _env.ASSETS.fetch(request)
	},
} satisfies ExportedHandler<Env>
