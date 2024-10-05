<script>
	import '../../css/size.css';
</script>

<li><slot /></li>

<style>
	li {
		display: flex;
		flex-direction: column;
		gap: var(--st-size-1);
	}
</style>
