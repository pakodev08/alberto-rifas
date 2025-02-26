<section class="spinner">
    <span class="loader"></span>
    <p>Cargando números disponibles</p>
</section>



<style>
    .spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
.loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid var(--green);
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    /* width: 100%; */
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
</style>
