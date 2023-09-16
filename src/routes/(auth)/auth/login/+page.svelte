<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<div class="grid min-h-screen place-content-center">
	<div class="max-w-sm card bg-neutral text-neutral-content">
		<div class="card-body">
			<div class="justify-center card-title">Login</div>
			<Auth
				supabaseClient="{data.supabase}"
				view="sign_in"
				redirectTo="{`${data.url}/auth/callback?redirect=${data.redirectTo}`}"
				showLinks="{false}"
				appearance="{{
					extend: false,

					className: {
						container: 'space-y-4',
						button: 'btn btn-primary',
						input: 'input input-bordered w-full',
						label: 'label',
					},
				}}"
			/>
		</div>
	</div>
</div>
