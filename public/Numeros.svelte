<script>
	let { rangoValue, onrago , numeross} = $props();

	

	let seleccionados = $state([]);

	$effect(() => {
		console.log(onrago);
	});

	const clicker = (valor) => {
		console.log(valor);
		const nuevo = numeross.filter((el) => el.valor !== valor);
		numeross = [...nuevo];
		console.log(numeross);

		// const newAr = numeross.filter((el) => el.valor !== valor);
		// numeross = [...numeross,newAr];
		// console.log(numeross,);
	};
</script>

<article class="numeros">
	{#each numeross as item}
		<p class="numero" onclick={() => clicker(item.valor)}>{item.valor}</p>
	{/each}
</article>

{#if rangoValue === 100}
	<h2 style="text-align: center;">Se han agotado todos los tickets. Atento al sorteo</h2>
{/if}
<!-- {#if seleccionados.length === 0}
	
{:else}
	{#each seleccionados as item}
		<p>{(item.valor)}</p>
        <p>{seleccionados.length}</p>
	{/each}
{/if} -->

<style>
	.numeros {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		place-items: center;

		& p {
			border: 1px solid;
			padding: 10px;
			cursor: pointer;
		}
	}
</style>
