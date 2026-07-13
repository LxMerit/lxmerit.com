<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>SMS Notifications | LxMerit</title>
	<meta
		name="description"
		content="How LxMerit LLC uses SMS: program details, message frequency, opt-in and opt-out, and the written consent form used for client service notifications."
	/>
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-12">
	<h1 class="text-4xl font-semibold mb-8 text-slate-900" style="font-family: 'Cinzel', serif;">
		SMS Notifications
	</h1>

	<p class="text-xl text-slate-700 mb-6 leading-relaxed">
		LxMerit LLC sends text messages for two purposes only. Neither is marketing.
	</p>

	<h2 class="text-2xl font-semibold mt-12 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">
		Our SMS programs
	</h2>

	<div class="mb-6">
		<h3 class="text-lg font-semibold text-slate-800 mb-2">Account &amp; security notifications</h3>
		<p class="text-slate-600 mb-4 leading-relaxed">
			For people with an LxMerit platform account: sign-in verification codes, security alerts, and
			account notices. You opt in from your account settings by entering your mobile number and
			confirming a verification code we text to it.
		</p>
	</div>

	<div class="mb-6">
		<h3 class="text-lg font-semibold text-slate-800 mb-2">Client service notifications</h3>
		<p class="text-slate-600 mb-4 leading-relaxed">
			LxMerit LLC operates lead-response automation software for client businesses. When the system
			acts on a sales lead for a client, it texts that client's owner the outcome so they are never
			blind to what the automation did on their behalf. Recipients are added only from a signed
			written consent form — there is no public sign-up, no subscriber list, and no marketing.
		</p>
	</div>

	<h2 class="text-2xl font-semibold mt-12 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">
		Frequency, cost, and control
	</h2>

	<ul class="list-disc list-inside mb-6 space-y-2 text-slate-600 ml-4">
		<li><strong class="text-slate-800">Message frequency may vary</strong> — typically fewer than 10 messages per day.</li>
		<li><strong class="text-slate-800">Standard message and data rates may apply.</strong> Carriers, not LxMerit, set those rates.</li>
		<li>Reply <strong class="text-slate-800">STOP</strong> to any message to opt out at any time. You will receive one confirmation and then no further messages.</li>
		<li>Reply <strong class="text-slate-800">HELP</strong> for help, or email <a href="mailto:patrick@lxmerit.com" class="text-teal-700 hover:text-teal-800 no-underline hover:underline">patrick@lxmerit.com</a>.</li>
		<li>Consent is not a condition of purchase.</li>
		<li>Carriers are not liable for delayed or undelivered messages.</li>
	</ul>

	<p class="text-slate-600 mb-6 leading-relaxed">
		We do not sell or share mobile opt-in information or phone numbers with third parties for
		marketing purposes. See our <a href="{base}/privacy" class="text-teal-700 hover:text-teal-800 no-underline hover:underline">Privacy Policy</a>.
	</p>

	<h2 class="text-2xl font-semibold mt-12 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">
		Confirmation message
	</h2>

	<p class="text-slate-600 mb-4 leading-relaxed">
		After a consent form is received and the number is provisioned, we send exactly one confirmation
		text before any service messages:
	</p>

	<blockquote class="border-l-4 border-teal-700 pl-4 py-2 my-6 bg-slate-100 text-slate-700 italic">
		LxMerit LLC: Thanks for subscribing to account notifications. Reply HELP for help. Msg frequency
		may vary. Msg &amp; data rates may apply. Reply STOP to opt out.
	</blockquote>

	<!-- ═══════════════════════════════════════════════════════════════════
	     Written consent form — the artifact carriers and messaging providers
	     require us to publish for the paper opt-in path. Printable: the
	     print stylesheet below drops the site chrome so this section prints
	     as a standalone one-page form.
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2 class="text-2xl font-semibold mt-16 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">
		Written consent form
	</h2>

	<p class="text-slate-600 mb-6 leading-relaxed">
		This is the form signed by a client business owner to authorize service notifications. Print this
		page to produce a blank copy.
	</p>

	<section class="consent-form border-2 border-slate-400 rounded-lg p-8 bg-white mb-10">
		<h3 class="text-xl font-semibold text-slate-900 mb-1 text-center" style="font-family: 'Cinzel', serif;">
			SMS Notification Consent
		</h3>
		<p class="text-center text-sm text-slate-500 mb-8">LxMerit LLC &middot; www.lxmerit.com</p>

		<div class="space-y-6 mb-8">
			<div>
				<span class="block text-sm font-semibold text-slate-700 mb-1">Business name</span>
				<div class="border-b border-slate-400 h-8"></div>
			</div>
			<div>
				<span class="block text-sm font-semibold text-slate-700 mb-1">Authorized signer (printed name)</span>
				<div class="border-b border-slate-400 h-8"></div>
			</div>
			<div>
				<span class="block text-sm font-semibold text-slate-700 mb-1">
					Mobile phone number to receive text messages
				</span>
				<div class="border-b border-slate-400 h-8"></div>
			</div>
		</div>

		<p class="text-sm text-slate-700 leading-relaxed mb-8 border-t border-slate-300 pt-6">
			By signing this form and providing your phone number, you agree to receive SMS account
			notification and customer care messages from <strong>LxMerit LLC</strong> regarding the
			lead-response automation service provided to your business. Message frequency may vary
			(typically fewer than 10 messages per day). Standard message and data rates may apply. Reply
			STOP to opt out at any time. Reply HELP for help. Consent is not a condition of purchase. Our
			privacy policy is available at www.lxmerit.com/privacy.
		</p>

		<div class="grid grid-cols-3 gap-6">
			<div class="col-span-2">
				<div class="border-b border-slate-400 h-10"></div>
				<span class="block text-sm font-semibold text-slate-700 mt-1">Signature</span>
			</div>
			<div>
				<div class="border-b border-slate-400 h-10"></div>
				<span class="block text-sm font-semibold text-slate-700 mt-1">Date</span>
			</div>
		</div>
	</section>

	<h2 class="text-2xl font-semibold mt-12 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">
		Contact
	</h2>

	<p class="text-slate-600">
		<strong class="text-slate-800">LxMerit LLC</strong><br />
		<a href="mailto:patrick@lxmerit.com" class="text-teal-700 hover:text-teal-800 no-underline hover:underline">patrick@lxmerit.com</a>
	</p>
</div>

<style>
	/* Print the consent form as a clean standalone sheet. */
	@media print {
		:global(header),
		:global(footer) {
			display: none !important;
		}
		.consent-form {
			border-width: 1px;
			page-break-inside: avoid;
		}
	}
</style>
