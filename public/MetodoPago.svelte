<script>
	import bdv from '../assets/images/bdv.png';
	import zelle from '../assets/images/zelle.png';

	let detectState = $state(false);
	let detectState2 = $state(false);

	let handleZelleSelect = $state(false);

	let { selectedTicket, ticketValue, totalZelle } = $props();

	const dataPago = [
		{
			nombre: 'bdv',
			imagen: bdv,
			telefono: '04127631825',
			cedula: '20681512',
			titular: 'Alberto Gonzalez'
		},
		{ nombre: 'Zelle', imagen: zelle, telefono: `+13179660928`, correo: 'serviciosgospel@gmail.com', name: 'Ronald Sukdhai' }
	];

	const detectClick = (id) => {
		if (id === 'bdv') {
			ticketValue = 20;
			detectState = true;
			detectState2 = false;
		}
		if (id === 'zelle') {
			ticketValue = 0.33;
			totalZelle = selectedTicket.length * ticketValue;
			detectState = false;
			detectState2 = true;
			// console.log(selectedTicket)

			if (selectedTicket.length > 14) {
				handleZelleSelect = true;
				console.log(`se detecta que haya 4 tickets o menos`);
			}
		}
	};

	const handleCopyData = (e) => {
		navigator.clipboard.writeText(e.target.textContent);
		console.log(`Se copió el texto: ${e.target.textContent}`);
	};
</script>

<h1>Seleccione su método de pago</h1>
<section class="metodo-pago">
	<article class="bdv-box">
		<figure>
			<img id="bdv" onclick={() => detectClick('bdv')} src={bdv} alt="bdv" />
		</figure>
		{#if detectState}
	<h3>Titular:</h3>
		<h4 onclick={handleCopyData}>{dataPago[0].titular}</h4>
		<h4 onclick={handleCopyData}>{dataPago[0].telefono}</h4>
		<h4 onclick={handleCopyData}>{dataPago[0].cedula}</h4>
		<p>{ticketValue * selectedTicket.length} BS</p>
	{/if}
	</article>
	
	<article class="zelle-box">
		<figure>
			<img id="zelle" onclick={() => detectClick('zelle')} src={zelle} alt="Zelle" />
		</figure>
		{#if detectState2}
		<h4 onclick={handleCopyData}>{dataPago[1].correo}</h4>
		<h4 onclick={handleCopyData}>{dataPago[1].telefono}</h4>
		<h4 onclick={handleCopyData}>{dataPago[1].name}</h4>
		<p>{Math.round(totalZelle * 10) / 10} $</p>
	{/if}

	</article>
	
</section>

{#if handleZelleSelect}
	<h4>La compra minima por zelle es de 15 tickets</h4>
	<!-- content here -->
{/if}

<article class="data-pago">
	
	
</article>

<style>
	h1 {
		text-align: center;
		margin-top: 30px;
		
	}
	.metodo-pago {
		display: flex;
		justify-content: center;
		align-items: start;
		width: 70%;
		margin: 0 auto;
		flex-wrap: wrap;
		height: 400px;
	}

	.bdv-box {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		font-size: 24px;
		height: 300px;
		line-height: 24px;
		width: 40%;
	}
	.zelle-box {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		font-size: 24px;
		height: 300px;
		line-height: 24px;
		/* text-wrap: balance; */
		width: 40%;
		/* padding: 0; */
		/* margin: 0; */
	}

	img {
		height: 100%;
		cursor: pointer;
		width: 200px;
		aspect-ratio: 1 / auto;
		object-fit: contain;
	}

	.data-pago {
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		height: 100px;
		line-height: 20px;
	}
h4{
	text-wrap: balance;
	font-size: 1.3rem;
}
	@media (width <= 990px){
		.metodo-pago{
			height: auto;
		}
		.bdv-box , .zelle-box{

			display: flex;
			justify-content: start;
			align-items: center;
			width: 100%;
			/* height: 300px; */
		}
	}
</style>
