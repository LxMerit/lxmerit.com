<script lang="ts">
	export let totals: {
		allTime: number;
		core: number;
		docs: number;
		ccli: number;
		since: string;
		trackingBegan: string;
		daysTracked: number;
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

	// Calculate days since project inception
	function daysSince(dateStr: string): number {
		const start = new Date(dateStr);
		const now = new Date();
		return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	}

	$: projectDays = daysSince(totals.since);
	$: avgPerDay = Math.round(totals.allTime / projectDays);
</script>

<div class="velocity-counter">
	<h3 class="velocity-title">Total Lines Shipped</h3>

	<div class="velocity-hero">
		<span class="velocity-number">{formatNumber(totals.allTime)}</span>
		<span class="velocity-unit">lines</span>
	</div>

	<p class="velocity-meta">
		Since {formatDate(totals.since)} &bull; {projectDays} days &bull; ~{formatNumber(avgPerDay)}/day
	</p>

	<div class="velocity-divider"></div>

	<div class="velocity-breakdown">
		<div class="breakdown-items">
			<span class="breakdown-item">Core: {formatNumber(totals.core)}</span>
			<span class="breakdown-item">Docs: {formatNumber(totals.docs)}</span>
			<span class="breakdown-item">CCLI: {formatNumber(totals.ccli)}</span>
		</div>
	</div>

	<p class="velocity-footer">
		Audited repo state &bull; No churn, no lies
	</p>
</div>

<style>
	.velocity-counter {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #3d5f5f;
		border-radius: 8px;
		padding: 1.25rem 1.5rem;
		margin-bottom: 2rem;
		max-width: 360px;
	}

	.velocity-title {
		font-family: 'Cinzel', serif;
		font-size: 0.875rem;
		font-weight: 600;
		color: #5a7a7a;
		margin: 0 0 0.5rem 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.velocity-hero {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.velocity-number {
		font-family: 'Cinzel', serif;
		font-size: 2.5rem;
		font-weight: 700;
		color: #1a2f2f;
		line-height: 1;
	}

	.velocity-unit {
		font-size: 1rem;
		color: #5a7a7a;
	}

	.velocity-meta {
		font-size: 0.8rem;
		color: #5a7a7a;
		margin: 0;
	}

	.velocity-divider {
		height: 1px;
		background: #3d5f5f;
		opacity: 0.3;
		margin: 0.75rem 0;
	}

	.velocity-breakdown {
		font-size: 0.8rem;
	}

	.breakdown-items {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.breakdown-item {
		color: #5a7a7a;
	}

	.velocity-footer {
		font-size: 0.7rem;
		color: #8fa8a8;
		margin: 0.75rem 0 0 0;
		font-style: italic;
	}
</style>
