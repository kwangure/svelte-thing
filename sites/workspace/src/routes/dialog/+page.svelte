<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Dialog Examples</h1>

<p>
	This section demonstrates the two types of dialogs available in the
	component library:
</p>

<div class="examples">
	<a href="{base}/dialog/modal" class="example-card">
		<h2>Modal Dialog</h2>
		<p>
			A modal dialog that requires immediate attention. The rest of the
			page becomes inert while the dialog is open.
		</p>
		<ul>
			<li>Uses <code>showModal()</code></li>
			<li>Blocks interaction with page</li>
			<li>Has backdrop</li>
			<li>ESC to close</li>
		</ul>
	</a>

	<a href="{base}/dialog/non-modal" class="example-card">
		<h2>Non-Modal Dialog</h2>
		<p>
			A non-modal dialog (popover) for supplementary content. The page
			remains interactive while open.
		</p>
		<ul>
			<li>Uses Popover API</li>
			<li>Page remains interactive</li>
			<li>No backdrop</li>
			<li>Click outside to close</li>
		</ul>
	</a>
</div>

<style>
	.examples {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.example-card {
		padding: 1.5rem;
		border-radius: 8px;
		color: inherit;
		text-decoration: none;
		transition: all 0.2s ease;
		border: 1px solid #e2e8f0;
	}

	.example-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	h2 {
		margin: 0 0 1rem 0;
	}

	ul {
		margin: 1rem 0 0 0;
		padding-left: 1.5rem;
	}

	li {
		margin: 0.5rem 0;
	}

	code {
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-size: 0.9em;
	}
</style>
