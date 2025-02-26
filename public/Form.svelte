<script>
    let { formData, numeross, seleccionados } = $props();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevo = numeross.filter((el) => el.value !== value);
		numeross = [...nuevo];
        alert('Form submitted');
        console.log(seleccionados, numeross, formData)
        formData = { files: null };    
      
    }
    
</script>

<form onsubmit={handleSubmit}>
	<label for="nombre"
		>Nombre
		<input type="text" name="name" id="nombre" placeholder="Ingresa tu nombre" required bind:value={formData.name} />
	</label>
	<label for="lastname"
		>Apellido
		<input type="text" name="lastname" id="lastname" placeholder="Ingresa tu apellido" required bind:value={formData.lastname} />
	</label>

	<input type="number" name="lastname" id="phone" placeholder="Número de telefono" required  bind:value={formData.phone} />

    <input type="file" name="file" id="file" placeholder="Ingresa tu foto" required   bind:files={formData.files} />

	<button>Sortear</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
	}
	input {
		padding: 10px;
		border: 1px solid;
		border-radius: 20px;
	}
</style>
