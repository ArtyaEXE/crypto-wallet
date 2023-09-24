<script>
  import Loader from "../utils/Loader.svelte";
</script>

<div class="loader">
  <img
    width="64"
    height="64"
    src="https://img.icons8.com/nolan/64/metamask-logo.png"
    alt="metamask-logo"
  />
  <Loader />
</div>

<style>
  .loader {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #525252;
    gap: 20px;
  }
</style>
