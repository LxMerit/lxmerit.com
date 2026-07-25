<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Features | LxMerit</title>
	<meta name="description" content="Inside L(earn)² — the classical library, Advanced Learning Tools with drills and lesson plans, and the LxLedger merit record. A product map for parents." />
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-12 font-sans">
	<h1 class="text-4xl font-semibold mb-8 text-slate-900" style="font-family: 'Cinzel', serif;">What's inside L<span style="font-size: 0.65em; vertical-align: baseline; position: relative; top: 0.15em;">x</span>Merit</h1>

	<p class="text-xl text-slate-700 mb-10 leading-relaxed">
		A product map for parents. Think of L(earn)² as a well-kept schoolhouse: a
		library you can actually read, guided practice that shows what's solid, an honest
		record of the work, and the household tools to run it all — with you still at the
		front of the room.
	</p>

	<h2 class="text-2xl font-semibold mt-12 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">The Classical Library</h2>

	<p class="text-slate-600 mb-4 leading-relaxed">
		The public-domain books that built American literacy, digitized page-for-page and
		ready to read in the browser — original woodcuts and all, not melted down into
		modern worksheets.
	</p>

	<ul class="list-disc list-inside mb-6 space-y-2 text-slate-600 ml-4">
		<li><strong class="text-slate-800">McGuffey Readers</strong> (Primer through Sixth) — America's original reading curriculum, with page-by-page audio narration and word-by-word highlighting for early readers</li>
		<li><strong class="text-slate-800">Ray's Arithmetic</strong> — the math that educated generations, Primary through Intellectual</li>
		<li><strong class="text-slate-800">Euclid's Elements &amp; Ray's Geometry</strong> — real geometry, worked the classical way</li>
		<li><strong class="text-slate-800">Latin</strong> — a full sequence from grammar foundations through Caesar's <em>Gallic War</em></li>
		<li><strong class="text-slate-800">History</strong> — Ancient Greece, Ancient Rome, and American history</li>
	</ul>

	<h2 class="text-2xl font-semibold mt-12 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">Advanced Learning Tools</h2>

	<p class="text-slate-600 mb-4 leading-relaxed">
		When you're ready to go past reading, Advanced Learning Tools open the practice and the
		lesson plans — and keep the record of how each pupil is doing.
	</p>

	<ul class="list-disc list-inside mb-6 space-y-2 text-slate-600 ml-4">
		<li><strong class="text-slate-800">Guidance for parents, from the source</strong> — the original readers carried their own instructions to the teacher; we bring that guidance forward, so you're never guessing at the method the book was written for</li>
		<li><strong class="text-slate-800">Structured lesson plans</strong> — 36 weeks per subject, four days a week: Read, Exercise, Drill, Review</li>
		<li><strong class="text-slate-800">Adaptive drills</strong> — letters, sounds, sight words, and subject skills, with immediate right/wrong feedback and a clear results screen</li>
		<li><strong class="text-slate-800">Mastery, not trophies</strong> — every skill reads as Emerging, Strong, or Mastered, so you can see a pupil names most letters cleanly but still confuses <em>b</em> and <em>d</em> — the map that's more useful than one Tuesday quiz</li>
	</ul>

	<h2 class="text-2xl font-semibold mt-12 mb-4 text-slate-800" style="font-family: 'Cinzel', serif;">The L<span style="font-size: 0.65em; vertical-align: baseline; position: relative; top: 0.15em;">x</span>Ledger</h2>

	<p class="text-slate-600 mb-10 leading-relaxed">
		The long record of a pupil's learning — practice, mastery, and how understanding
		holds over time. It measures <strong class="text-slate-800">velocity</strong> (how
		quickly real mastery is forming) rather than minutes on a timer. Owned by the pupil,
		with the family as steward — honest proof of work, kept for good.
	</p>

	<div class="my-12 py-8 border-t border-b border-slate-200">
		<p class="text-xl font-medium text-center" style="color: #1a2f2f;">
			The tools do the filing.<br>
			You do the teaching.
		</p>
	</div>

	<p class="text-slate-600 mb-8">
		More on the why behind all of it on the
		<a href="{base}/about" class="text-teal-700 hover:text-teal-800 no-underline hover:underline">About page</a>.
	</p>

	<p class="text-sm text-slate-500 italic border-t border-slate-200 pt-6 leading-relaxed">
		L(earn)² is growing. Some features shown here are fully live today — the McGuffey Primer
		reader and its drills lead the way — while others across the wider library are in active
		development and rolling out as we expand.
	</p>
</div>
