<script>
	import logo from '../assets/images/logo.webp';
	import menu from '../assets/images/menu.png';
</script>

<header>
	<figure>
		<img src={logo} alt="logo" height="90" />
	</figure>

	<!-- <figure>
        <img src={menu} alt="" width="40">
    </figure> -->
	<nav>
		<a href="#">Inicio</a>
		<a href="#buscador">Verificador</a>
	</nav>
    
	<label for="check" class="fa-solid fa-bars">
        
		<input type="checkbox" name="" id="check" class="input" />
	</label>
</header>

<style>
	header {
		padding: 10px 0;
		border-bottom: 4px solid var(--terciary-red);
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100px;
		gap: 10px;
	}

	figure {
		margin: 0;
		padding: 10px;

		& img {
			border-radius: 20px;
			/* mix-blend-mode: screen; */
		}
	}

	a {
		text-decoration: none;
		color: inherit;
	}
i{
    color: red;
    font-size: 3rem;
}
	label,
	.input {
		display: none;
	}
	@media (width < 500px) {
		header {
			position: relative;
    
		}
		nav {
			position: absolute;
			right: 0;
			bottom: -100px;
            transition: .5s ease-in;
            height: 100px;
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            clip-path: polygon(0 0, 100% 0%, 100% 0, 0 0);
		}

        label {
		display: block;
        font-size: 1.5rem;

		& .input {
			display: none;
		}
	}
    header:has(input:checked) nav {
		background: red;
		display: inline-block;
        position: absolute;
			right: 0;
			bottom: -100px;
            
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 100px;
            width: 40%;
            clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);

            /* height: 200px; */
	}
	}
	
	
</style>
