<script>
	import { setSidebarContext } from '../sidebar/sidebar.js';

	setSidebarContext();
</script>

<div
	class="grid h-full grid-cols-[[page-start]_1fr_[nav-start]_min-content_[content-start]_var(--st-content-width,6fr)_[content-end_nav-end]_1fr_[page-end]] grid-rows-[var(--st-navbar-height)_1fr] gap-y-[var(--st-navbar-y-gap)] xl:grid-cols-[[page-start]_1fr_[nav-start]_min-content_[content-start]_var(--st-content-width,60rem)_[content-end_nav-end]_1fr_[page-end]]"
>
	<slot />
</div>

<style>
	:root {
		--st-navbar-height: 4rem;
		--st-navbar-y-gap: 0.5rem;
	}
</style>
