<script lang="ts">
	export let totals: {
		core: number;
		docs: number;
		ccli: number;
		total: number;
		since: string;
	};

	function formatNumber(n: number): string {
		return n.toLocaleString();
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="velocity-counter">
	<h3 class="velocity-title">LxMerit Dev Velocity</h3>
	<p class="velocity-since">Since: {formatDate(totals.since)}</p>

	<div class="velocity-divider"></div>

	<div class="velocity-rows">
		<div class="velocity-row">
			<span class="velocity-label">Core Code:</span>
			<span class="velocity-value">{formatNumber(totals.core)} lines</span>
		</div>
		<div class="velocity-row">
			<span class="velocity-label">Docs:</span>
			<span class="velocity-value">{formatNumber(totals.docs)} lines</span>
		</div>
		<div class="velocity-row">
			<span class="velocity-label">CCLI Infra:</span>
			<span class="velocity-value">{formatNumber(totals.ccli)} lines</span>
		</div>
	</div>

	<div class="velocity-divider"></div>

	<div class="velocity-row velocity-total">
		<span class="velocity-label">Total:</span>
		<span class="velocity-value">{formatNumber(totals.total)} lines</span>
	</div>
</div>

<style>
	.velocity-counter {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #3d5f5f;
		border-radius: 8px;
		padding: 1.25rem 1.5rem;
		margin-bottom: 2rem;
		max-width: 320px;
	}

	.velocity-title {
		font-family: 'Cinzel', serif;
		font-size: 1.125rem;
		font-weight: 600;
		color: #1a2f2f;
		margin: 0 0 0.25rem 0;
	}

	.velocity-since {
		font-size: 0.875rem;
		color: #8fa8a8;
		margin: 0 0 0.75rem 0;
	}

	.velocity-divider {
		height: 1px;
		background: #3d5f5f;
		opacity: 0.5;
		margin: 0.75rem 0;
	}

	.velocity-rows {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.velocity-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.velocity-label {
		font-size: 0.875rem;
		color: #8fa8a8;
	}

	.velocity-value {
		font-size: 0.875rem;
		color: #d4dada;
		font-variant-numeric: tabular-nums;
	}

	.velocity-total .velocity-label,
	.velocity-total .velocity-value {
		font-weight: 600;
		color: #2d5a5a;
	}
</style>
