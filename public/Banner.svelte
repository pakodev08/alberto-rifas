<script>
	import { onMount } from 'svelte';
	import MetodoPago from './MetodoPago.svelte';
	import mainPoster from '../assets/images/banneer.webp';
	import Spinner from './Spinner.svelte';
  import Form from './Form.svelte';

	let mostrarDialogo = $state(false);
	let mostrarFactura = $state(false);

	let findedValue = $state('');

	let loadingSpinner = $state(true);
	let {
		rangoValue = $bindable(),
		ticketValue,
		formData,
		fechaSorteo,
		premioMayor,
		totalZelle,
		findNumber,

		numbersAvailable,
		selectedTicket,
		mainPhone
	} = $props();


let nameError = $state('');
	let usuariosFinded = $state([]);
	let findNumberTicket = $state('');
	let sussessFind = $state(false);
	let bodyFindTicket = $state([]);
	let showNumberResponse = $state('');
	let realNumbers = $state([]);

	let alm = $state([]);

	// FUNCION BOTON BUSCADOR DE TICKETS
	const findTicket = async () => {
		try {
			const response = await fetch('https://tests-production-151a.up.railway.app/ticketselected'); // Asegúrate de que la URL sea correcta

			const users = await response.json(); // Convierte la respuesta a JSON
			bodyFindTicket = [...users];

			const ticketValue = bodyFindTicket.find((item) =>
				item.tickets.map((item) => item.value).includes(findNumberTicket)
			);

			bodyFindTicket = ticketValue;
			showNumberResponse = findNumberTicket;
			sussessFind = true;
		} catch (error) {
			console.error('Error al obtener usuarios:', error);
		}
	};

	const printNumbers = async () => {
		try {
        const generate = await fetch('https://tests-production-151a.up.railway.app/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // No necesitas incluir 'Access-Control-Allow-Origin' en la solicitud
            }
        });
		const resultado = await generate.json();
		realNumbers = resultado;
		// console.log(realNumbers)
		numbersAvailable = realNumbers.slice(0, -1);
		loadingSpinner = false;
    } catch (error) {
        console.log(`Se ha producido un error: ${error}`);
    }

	};
// 	const otherRequest = () => {
// 		fetch('https://albertorifas.com/generate-items')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });
// 	}
	

// otherRequest()
	// AQUI VA EL COMIENZO DE LOS SCRIPTS
	onMount(() => {
		printNumbers()
	});
	let clickNumber = $state({});
const verifyNumbers =  async() => {
	try {
const respuestaa = await fetch('https://tests-production-151a.up.railway.app/api/users');
 const data = await respuestaa.json();
	const requestTicket=  data.map((item) => (item.tickets.map((item) => item.value)));
const allPurchasedNumber = requestTicket.flat()
		const vww = selectedTicket.map((item) => item.value)

		const alreadyPurchased = vww.some(value => allPurchasedNumber.includes(value));
        
        if (alreadyPurchased) {
            alert('Otra persona ha comprado este ticket');
			loadingSpinner = true;
			printNumbers();
			selectedTicket  = []
            return;
        }

	} catch (error) {
			console.error('Error al obtener usuarios:', error);
		}
}

	const handleClick = async(id, value, item) => {
		
		
		
	clickNumber[id] = !clickNumber[id];
		const existingItem = selectedTicket.find((selected) => selected.value === value);
		console.log(existingItem);

		if (existingItem) {
			// Filtra los elementos que no son iguales al existingItem
			const cannotAdd = selectedTicket.filter((selected) => selected.value !== value);
			selectedTicket = [...cannotAdd]; // Actualiza selectedTicket
			return;
		}
		selectedTicket = [...selectedTicket, item];
		totalZelle = selectedTicket.length * ticketValue;
		console.log(totalZelle);
		formData.amount = totalZelle;
		
		await verifyNumbers()
		
	};

	const handleSelectRemove = (id, itemRemove) => {
		clickNumber[id] = !clickNumber[id];
		const removeSelected = selectedTicket.filter((item) => item !== itemRemove);
		selectedTicket = [...removeSelected];

		console.log(selectedTicket, `removido`);
	};

	// ENVIAR TODOS LOS TICKETS SELECCIONADOS FRAO NO BORRAR FUNCIONANDO
	// const enviarSelect = async () => {
	// 	try {
	// 		const response = await fetch('http://localhost:4000/api/data', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				selectedTicket // Asegúrate de que 'selectedTicket' esté definido
	// 			})
	// 		});

	// 		if (!response.ok) {
	// 			throw new Error(`Error en la solicitud: ${response.statusText}`);
	// 		}

	// 		const data = await response.json();
	// 		console.log(data);
	// 		console.log(selectedTicket);
	// 		// selectedTicket = [];
	// 		// seleccionadosFrao = []
	// 	} catch (error) {
	// 		console.error('Error al enviar datos:', error);
	// 	}
	// };

	const handleForm = (e) => {
	  e.preventDefault();
	}
	

	//FUNCION QUE SE ENVIA A LA BASE DE DATOS TAMBIEN ESTA FUNCIONANDO NO TOCAR
	const handleSubmit = async() => {


		// verifyNumbers()
		try {
			const response = await fetch('https://tests-production-151a.up.railway.app/alo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					phone: formData.phone,
					amount: formData.amount,
					tickets: selectedTicket,
					reference: formData.reference
				})
			});

		} catch (error) {
			console.error('Error al realizar la petición:', error);
		}
		printNumbers();
	};

	// Función para actualizar los elementos de Item en el frontend
	const updateItems = (selectedTickets) => {
		// Filtra los elementos de Item para eliminar los que fueron seleccionados
		items = items.filter((item) => !selectedTickets.includes(item.id));
	};

	const handleReadyBtn = () => {
		mostrarDialogo = false;
		formData = {};
		selectedTicket = [];
		window.location.reload();

	};
// AQUI ESTA EL RANGO VALUE NO BORRAR
	$effect(() => {
		if (numbersAvailable.length > 0) {
			rangoValue = Math.floor((1 - numbersAvailable.length / 9999) * 100);
			rangoValue = Math.max(rangoValue, 0);
		}
	});
	const onFilterNumber = () => {
		findedValue = numbersAvailable.filter((item) => item.value.includes(findNumber));
	};
 const handleShareWs = () => {
	// verifyNumbers()
	console.log(`clic`)
	mostrarFactura = true;

	// 	mostrarDialogo = true;

   
 }
 const handleName = () => {
    if (formData.name.length < 4) {
            nameError = 'El nombre debe tener al menos 4 caracteres.';
        } 
	if (formData.phone.length < 10) {
            nameError = 'El número de teléfono debe tener al menos 10 caracteres.';
        }

		else {
            nameError = '';
        }
 }
 
 const handleChangeInput = () => {
	if(formData.name.length < 4){
		nameError = 'El nombre debe tener al menos 4 caracteres.';
	}
	if(formData.name.length > 4){
		nameError = null
	}


	if(formData.phone.length < 11){
		nameError = 'El número de telefono debe tener al menos 11 caracteres.';
	}
	if(formData.phone.length > 11){
		nameError = null
	}
   
 }
 
	
</script>

<article class="banner">
	<figure>
		<img class="main-poster" src={mainPoster} alt="main poster" />
	</figure>

	<section>
		<h1>
			La fecha del sorteo se dará a conocer cuando alcancemos el 60% de los números vendidos.
		</h1>
		<input
			disabled
			class="range"
			type="range"
			name="rango"
			min="0"
			max="100"
			bind:value={rangoValue}
		/>
		<h1>Se han vendido {rangoValue}% de los números</h1>

		<article class="banner-item">
			<h1 class="title">GRAN RIFA !!!</h1>
		</article>
		<h1><strong>JUEGA POR LA LOTERIA SUPER GANA 4 CIFRAS</strong></h1>
		<h1 class="premio-mayor">PREMIO MAYOR</h1>
		<h1>{premioMayor}</h1>
		<p class="text-bold">
			<strong>10:00 PM</strong>
		</p>

		<h1 >Segundo Premio</h1>
		<p> <strong>500$</strong> en efectivo o pago movil.</p>  <strong>4:00 PM</strong>

		<h1 >Tercer premio</h1>
		<p>
			<strong>200$ </strong> en efectivo o pago movil. </p> <strong>1:00 PM</strong>
		
		<h1 >Cuarto premio</h1>
		<p>
			<strong>100$ </strong> en efectivo o pago movil a la persona con mas números comprados
		</p>

		<h1>Valor de cada ticket {ticketValue} Bs. ( Compra mínima 3 tickets {ticketValue * 3} Bs. O 1$ )</h1>
		<h4>Whatsapp de soporte</h4>
		<p class="whatsapp"> +{mainPhone}</p>
	</section>
</article>

<br />
<br />
<section class="find-number">
	<input
		class="input-finder"
		type="text"
		name=""
		id=""
		bind:value={findNumber}
		oninput={onFilterNumber}
		placeholder="Buscar numero"
	/>
</section>

{#if loadingSpinner}
	<Spinner />
{:else}
	<section class="números-container">
		{#if findNumber.length > 0}
			<article class="find-number-box">
				<section class="generate-numbers números">
					{#each findedValue as item}
						<p
							class={clickNumber[item.id] ? 'clickeado' : 'numero-click'}
							onclick={() => handleClick(item.id, item.value, item)}
						>
							{item.value}
						</p>
					{/each}
				</section>

				<!-- <section class="flotante">
					<section class="data-selected">
						{#if selectedTicket.length > 1}
							<p class="selected-content">
								{selectedTicket.length} de {selectedTicket.length} selectedTicket {selectedTicket.length *
									ticketValue} BS
							</p>
						{/if}
						{#if selectedTicket.length === 1}
							<p class="selected-content">Agrega otro ticket</p>
						{/if}
						{#if selectedTicket.length === 0}
							<p class="selected-content">LALALA</p>
						{/if}
						<button disabled={selectedTicket.length < 2}>Comprar</button>
					</section>
	
					<section class="selectedTicket">
						{#each selectedTicket as item}
							<p class="tickets-selected">{item}</p>
						{/each}
					</section>
				</section> -->
			</article>
		{/if}

		{#if numbersAvailable.length > 0}
			<article class="números numbers-available-container">
				{#each numbersAvailable as item}
					<p
						class={clickNumber[item.id] ? 'clickeado' : 'numero-click'}
						onclick={() => handleClick(item.id, item.value, item)}
					>
						{item.value}
					</p>
				{/each}
			</article>
		{/if}

		{#if selectedTicket.length > 0}
			<section class="flotante">
				<section class="data-selected">
					{#if selectedTicket.length > 2}
						<p class="selected-content">
							{selectedTicket.length} de {selectedTicket.length} selectedTicket {selectedTicket.length *
								ticketValue} BS
						</p>
					{/if}
					{#if selectedTicket.length === 2}
						<p class="selected-content">Agrega otro ticket</p>
					{/if}
				</section>

				<section class="selectedTicket">
					{#each selectedTicket as item}
						<p
							class={`tickets-selected ${clickNumber[item.id] ? 'clickeado' : 'numero-click'}`}
							onclick={() => handleSelectRemove(item.id, item)}
						>
							{item.value}
						</p>
					{/each}
				</section>
			</section>
		{/if}
		{#if numbersAvailable.length === 0}
			<h2 class="notificacion" style="text-align: center;">
				Se han agotado todos los tickets. Atento al sorteo
			</h2>
		{/if}
	</section>
{/if}

{#each usuariosFinded as item}
	<p>tickets {item.tickets.map((item) => item.value)} {item.name} {item.amount}</p>
{/each}

<section class="find-ticket-container" id="buscador">
	<input type="text" placeholder="BUSCAR TICKET " bind:value={findNumberTicket} />

	<button type="submit" onclick={findTicket}>🔍 Buscar ticket</button>
</section>

{#if sussessFind}
	<section class="data-finded">
		<p>Nombre: {bodyFindTicket.name}</p>
		<p class="data-finded-phone">Telefono: {bodyFindTicket.phone}</p>
		<p>Ticket: {showNumberResponse}</p>
	</section>
{/if}
<MetodoPago {selectedTicket} {ticketValue} {totalZelle} />

<form onsubmit={handleForm} class="payment-form">
	{#if nameError}
    <p style="color: red;">{nameError}</p>
{/if}
<!-- <div class="input-field col s12">
	<input type="text" name="ciudad" id="ciudad" >
	<label for="ciudad">Ciudad: </label>
</div>   -->
	<section>
		<label for="name"
			>Nombre y apellido
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Ingresa tu nombre y apellido"
				minlength="4"
				required
				bind:value={formData.name}
			
				onchange={handleChangeInput}
			/>
		
		</label>
	</section>

	<section>
		<label for="phone">Telefono
			<input
			type="text"
			name="phone"
			id="phone"
			placeholder="Número de teléfono sin el +"
			minlength="10"
			required
			bind:value={formData.phone}
			onchange={handleChangeInput}
		/>
		</label>
	</section>

	<section>
		<label for="reference">
			Referencia
			<input
		type="text"
		name="reference"
		id="reference"
		placeholder="Referencia de su pago"
		required
		bind:value={formData.reference}
		
	/>
		</label>
	</section>
	<section>
		<label for="amount">Monto
			<input
		type="text"
		name="amount"
		id="amount"
		placeholder="Monto a pagar"
		required
		bind:value={formData.amount}
	/>
		</label>
		
	</section>
	
	
	<button
		disabled={selectedTicket.length < 3}
		onclick={handleShareWs}
		class="submit-button">Confirmar y enviar por whatsapp</button
	>

	{#if mostrarFactura}
		<dialog open={mostrarFactura}>
			<h2>Tus datos ingresados son:</h2>
			<article>
				<p>Nombre: {formData.name}</p>
				<p>Numero: {formData.phone}</p>
				<p>Monto: {formData.amount}</p>
				<p>Referencia: {formData.reference}</p>
			</article>

			<h2>Desea continuar?</h2>
			<article class="button-dialogs">
				<p onclick={() => {
					mostrarFactura = false,
					handleSubmit()
					mostrarDialogo = true
				}}>Si</p>
				<p onclick={() => mostrarFactura = false}>No</p>

			</article>
		</dialog>
	{/if}

	{#if mostrarDialogo}
	
		<dialog open={mostrarDialogo}>
			<h1 style="padding: 10px;">!Felicidades! Estas participando.</h1>
			<h2>En 24hrs será verificado tu pago y te llegará un whatsapp de confirmación. Para aumentar tus posibilidades sigue comprando mas boletos</h2>
			<h1>Datos de tu compra: </h1>
			<p>Nombre: {formData.name}</p>
			<p>Número: {formData.phone}</p>
			<p>Monto: {formData.amount}</p>
			<p>Referencia: {formData.reference}</p>
			<section style="display: flex; flex-direction: row; gap: 10px; width: auto; flex-wrap: wrap; max-width: 300px;">
				{#each selectedTicket as ticket}
				<p style=" height: max-content; padding: 0;">{ticket.value} ,</p>
				{/each}
			</section>
		
			<p style="padding: 10px; text-wrap: pretty;">Para mayor seguridad envia tu comprobante de pago por whatsapp</p>

			<article class="dialog-contact">
				<a onclick={handleReadyBtn}
					href="https://api.whatsapp.com/send?phone=50761190062&text=Hola%20Alberto.%20Me%20comunico%20contigo%20para%20"
					target="_blank"
					><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"
						><path
							fill="#fff"
							d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
						/></svg
					> +50761190062</a
				>
			</article>

			<button onclick={handleReadyBtn}>✔ Listo</button>
		</dialog>
	{/if}
</form>

<style>
	.banner {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		place-content: center;
		font-family: "Montserrat", serif;
	}
	figure {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
		flex-direction: column;
		padding: 10px;

		margin: 0;
		box-sizing: border-box;

		& img {
			height: 700px;
			border-radius: 10px;
			aspect-ratio: 16/28;
			/* width: 100%; */
		}
	}
	.premio-mayor {
		display: inline-block;
		font-size: 34px;
		/* animation: premiomayor 2s infinite ease-in alternate; */
		/* background: red; */
		/* font-size: 40px; */
	}
	.text-bold {
		margin-top: -15px;
	}
	.whatsapp {
		font-weight: 800;
		margin-top: -60px;
		letter-spacing: 1px;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 20px;
		justify-content: space-evenly;
		align-items: center;
		padding: 10px;

		& .range {
			width: 95%;
		}
		& .banner-item {
			display: flex;
			align-items: center;
			font-size: 30px;
			padding: 10px;
			/* background: red; */
		}
		& .title {
			font-family: "Montserrat", serif;
			font-size: 2.5rem;
			font-style: italic;
			color: inherit;
			font-weight: 800;
			/* -webkit-text-fill-color: transparent; */
			/* background: linear-gradient(to left, rgb(5, 112, 53) 50%, rgb(160, 11, 11) 70%); */
			/* background-clip: text; */
			/* mix-blend-mode: screen; */
			width: max-content;
			/* animation: colorify 3s infinite linear; */
		}
	}

	.notificacion {
		/* background: #fff; */
		height: 100px;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: max-content;
		margin: 0 auto;
		color: red;
	}

	@keyframes colorify {
		0% {
			-webkit-text-fill-color: transparent;
			color: transparent;
			background: linear-gradient(to left, rgb(5, 112, 53) 50%, rgb(160, 11, 11) 80%);
			background-clip: text;
			/* mix-blend-mode: screen; */
		}

		100% {
			-webkit-text-fill-color: transparent;
			color: transparent;
			background: linear-gradient(to left, rgb(160, 11, 11) 50%, rgb(5, 112, 53) 100%);
			background-clip: text;
		}
	}

	@keyframes premiomayor {
		0% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1.2);
		}
	}
	.números-container {
		width: 95%;
		margin: 0 auto;
	}

	.números {
		display: grid;
		width: 100%;
		margin: 0 auto;
		grid-template-columns: repeat(auto-fit, minmax(min(40px, 100%), 1fr));
		gap: 20px;
		/* place-items: center; */
		/* justify-content: start; */
		align-items: start;
		height: 70dvh;
		overflow-y: scroll;
		padding: 10px;
		border: 2px solid red;
		border-radius: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		align-items: start;

		& p {
			padding: 10px;
			cursor: pointer;
			border-radius: 10px;
			display: inline-table;
		}
	}

	.input-finder {
		width: 50%;
		height: 40px;
		border-radius: 10px;
		outline: none;
		border: 2px solid var(--terciary-red);
		margin: 0 auto;
		padding-left: 10px;
		background: inherit;

		&:focus {
			border: 2px solid var(--green);
		}
	}
	.find-number-box {
		border-radius: 10px;
		padding: 10px;
	}
	.generate-numbers {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(auto-fill, minmax(min(50px, 80px), 1fr));
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: start;
		border: 1px solid yellow;
		margin: 0;
		padding: 0;
	}

	.clickeado {
		background: var(--terciary-red);
		color: var(--white);
		border: none;
		outline: none;
	}

	.numero-click {
		border: 1px solid;
		padding: 10px;
		cursor: pointer;
		border-radius: 10px;
		width: 50px;
		display: inline-table;
	}
	.flotante {
		width: 80%;
		/* background: #ffffff90; */
		background: #ffffff60;
		border-radius: 20px;
		margin: 0 auto;
		height: auto;

		& .data-selected {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 10px;


			& .selected-content {
				border: none;
				background: red;
				background: transparent;
				color: inherit;
				padding: 10px;
				margin: 0 auto;
			}
		}

		& .selectedTicket {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(min(50px, 100%), 1fr));
			grid-template-columns: repeat(4, 1fr);
			gap: 10px;
			/* width: 80%; */
		}

		.tickets-selected {
			border-radius: 20px;
			gap: 10px;
			height: 30px;
			background: red;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
			color: white;
			width: max-content;
			padding: 10px;
			cursor: pointer;
		}
	}
	/* FORMULARIO DE LA COMPRA */

	.payment-form {
		display: flex;
		border-radius: 20px;
		box-shadow:
			0 0 60px rgba(253, 83, 83, 0.767),
			0 0 10px rgba(248, 248, 248, 0.767);
		width: 40%;
		margin: 0 auto;
		padding: 10px;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 20px;
		align-items: center;
		margin-top: 20px;

		& section {
			display: flex;
			flex-direction: column;
			gap: 10px;
			justify-content: space-evenly;
			align-items: center;
			width: 100%;
		}
		& label {
			display: flex;
			flex-direction: column;
			align-items: start;
			margin: 0 auto;
			font-size: 20px;
			font-weight: 500;
			margin-bottom: 5px;
			width: 60%;

			& input {
				width: 100%;
				padding: 20px;
				border: 1px solid;
				border-radius: 10px;
				height: 40px;
				font-size: 1.2rem;
			}
		}
	}
	form > input {
		padding: 20px;
		border: 1px solid;
		border-radius: 10px;
		height: 40px;
		font-size: 1.2rem;
	}
	form > section > label > input {
		padding: 20px;
		border: 1px solid;
		border-radius: 10px;
		height: 40px;
	}
	.file {
		max-width: 240px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 6px 5px;
	}
	.submit-button:disabled {
		width: 380px;
		padding: 10px;
		border-radius: 20px;
		background: rgb(112, 111, 111);
		color: black;
		font-size: 1.2rem;
		/* outline: none; */
		border: none;
		transition: 0.4s linear;
	}
	.submit-button:enabled {
		width: 380px;
		padding: 10px;
		border-radius: 20px;
		background: var(--terciary-red);
		color: var(--white);
		font-size: 1.2rem;
		/* outline: none; */
		border: none;
		transition: 0.4s linear;
		&:hover {
			background: var(--green);
			color: var(--white);
		}
	}

	dialog {
		width: 80%;
		margin: 0 auto;
		border-radius: 20px;
		/* background: var(--white); */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-wrap: balance;
		text-align: center;
		backdrop-filter: blur(5px);
		background: transparent;

		& button {
			width: 200px;
			height: 40px;
			font-weight: 600;
			letter-spacing: 1.2px;
			border-radius: 20px;
			background:lightblue;
			border: 3px solid var(--green);
			outline: none;
			margin: 10px 0;
			transition: 0.6 ease-in-out;
			cursor: pointer;

			&:hover {
				/* background: var(--green); */
				color: var(--white);
			}
		}
	}

	.dialog-contact {
		display: flex;
		flex-direction: columns;
		gap: 10px;
		background: var(--green);
		height: auto;
		border-radius: 20px;
		padding: 5px;
		margin: 10px 0;

		a {
			text-decoration: none;
			color: inherit;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 700;
			padding: 2px;
			letter-spacing: 1.2px;
		}
	}

	.find-ticket-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		& input {
			width: 50%;
			height: 40px;
			border-radius: 10px;
			outline: none;
			border: 2px solid var(--terciary-red);
			margin: 0 auto;
			padding-left: 10px;
			background: inherit;

			&:focus {
				border: 2px solid var(--green);
			}
		}

		& button {
			width: max-content;
			padding: 10px;
			background: transparent;
			border-radius: 20px;
		}
	}
	.data-finded {
		display: flex;
		width: 70%;
		flex-direction: column;
		padding: 10px;
		margin: 0 auto;
		line-height: 1px;
		/* height: 100px; */
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		box-shadow:
			0 0 60px rgba(253, 83, 83, 0.767),
			0 0 10px rgba(248, 248, 248, 0.767);

		& p {
			padding: 10px;
			margin: 0;
			text-align: center;
			color: inherit;
			font-size: 1.2rem;
		}

		& .data-finded-phone {
			width: 180px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space:nowrap;
		}
	}

	.button-dialogs {
		display: flex;
		gap: 20px;
		padding: 10px;
		width: 30%;
		justify-content: space-evenly;
		align-items: center;

		& p {
			padding: 10px;
			border-radius: 30%;
			background: var(--terciary-red);
			color: var(--white);
			font-size: 1.2rem;
			/* outline: none; */
			border: none;
			transition: 0.4s linear;
			width: max-content;
			background: lightskyblue;
			cursor: pointer;
		}
		& p:hover {
			background: var(--green);
			color: var(--white);
			border-radius: 20px;
			/* padding: 10px; */
		}
	}
	@media (width <= 990px) {
		.banner {
			grid-template-columns: 1fr;
			height: auto;
			gap: 20px;
		}

		section {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 40px 80px;
			text-wrap: balance;

			& h1 {
				text-align: center;
				text-wrap: balance;
			}

			& p {
				margin: 0;
				padding: 40px;
				text-align: center;
				text-wrap: balance;
			}
		}

		.números-container {
			width: 95%;
			padding: 0;
		}
		.números {
			width: 100%;
		}

		.payment-form {
			/* background: red; */
			width: 80%;

			& section {
				padding: 0;
				/* background: red; */
				width: 100%;
			}
		}
		.submit-button:disabled {
			width: 80%;
		}
		.submit-button:enabled {
			width: 80%;
			/* width: 300px; */
		}
		form > input {
			width: 80%;
		}
	}
</style>
