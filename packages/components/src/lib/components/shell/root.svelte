<script>
	import { setSidebarContext } from '../sidebar/sidebar.js';

	setSidebarContext();
</script>

<div
	class="grid min-h-screen grid-cols-[[page-start]_1fr_[nav-start]_min-content_[content-start]_var(--st-content-width,6fr)_[content-end_nav-end]_1fr_[page-end]] grid-rows-[var(--svui-navbar-height)_1fr] gap-y-[var(--svui-navbar-y-gap)] xl:grid-cols-[[page-start]_1fr_[nav-start]_min-content_[content-start]_var(--st-content-width,48rem)_[content-end_nav-end]_1fr_[page-end]]"
>
	<slot />
</div>

<style>
	:root {
		--svui-navbar-height: 4rem;
		--svui-navbar-y-gap: 0.5rem;
		--svui-sidebar-width: 15rem;
	}
</style>
