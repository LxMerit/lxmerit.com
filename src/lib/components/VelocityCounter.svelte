<script lang="ts">
	export let totals: {
		allTime: number;
		core: number;
		docs: number;
		ccli: number;
		since: string;
		trackingBegan: string;
		daysTracked: number;
		deployedAt?: string;
		daily?: {
			total: number;
			core: number;
			docs: number;
			ccli: number;
		};
	};

	function formatNumber(n: number): string {
		return n.toLocaleString();
	}

	function formatDate(dateStr: string): string {
		// Parse as local date (not UTC) to avoid timezone shift
		const [year, month, day] = dateStr.split('-').map(Number);
		const date = new Date(year, month - 1, day);
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
	$: hasDaily = totals.daily && totals.daily.total !== 0;

	function formatTimestamp(isoStr: string | undefined): string {
		if (!isoStr) return '';
		const date = new Date(isoStr);
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}
</script>

<div class="velocity-cards">
	<div class="velocity-counter">
		<h3 class="velocity-title">{totals.daysTracked === 1 ? 'Lines Shipped' : 'Total Lines Shipped'}</h3>

		<div class="velocity-hero">
			<span class="velocity-number">{formatNumber(totals.allTime)}</span>
			<span class="velocity-unit">lines</span>
		</div>

		<p class="velocity-meta">
			{#if totals.daysTracked === 1}
				{formatDate(totals.since)}
			{:else}
				Since {formatDate(totals.since)} &bull; {projectDays} days &bull; ~{formatNumber(avgPerDay)}/day
			{/if}
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
			Audited repo state
		</p>
	</div>

	{#if hasDaily}
	<div class="velocity-counter velocity-daily">
		<h3 class="velocity-title">Today</h3>

		<div class="velocity-hero">
			<span class="velocity-number velocity-delta">+{formatNumber(totals.daily.total)}</span>
			<span class="velocity-unit">lines</span>
		</div>

		<div class="velocity-divider"></div>

		<div class="velocity-breakdown">
			<div class="breakdown-items">
				<span class="breakdown-item">Core: +{formatNumber(totals.daily.core)}</span>
				<span class="breakdown-item">Docs: +{formatNumber(totals.daily.docs)}</span>
				<span class="breakdown-item">CCLI: +{formatNumber(totals.daily.ccli)}</span>
			</div>
		</div>

	</div>
	{/if}
</div>

{#if totals.deployedAt}
<p class="velocity-deployed">Last deployed: {formatTimestamp(totals.deployedAt)}</p>
{/if}

<style>
	.velocity-cards {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.velocity-counter {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #3d5f5f;
		border-radius: 8px;
		padding: 1.25rem 1.5rem;
		max-width: 360px;
		flex: 1;
		min-width: 200px;
	}

	.velocity-daily {
		max-width: 220px;
		overflow: hidden;
	}

	.velocity-delta {
		color: #2d6a4f;
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

	.velocity-deployed {
		font-family: 'Cormorant Garamond', serif;
		font-size: 0.8rem;
		color: #8fa8a8;
		margin: -0.5rem 0 2rem 0;
		font-style: italic;
	}
</style>
