<template>
  <div id="app">
    <Header />
    <main class="container">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default {
  components: {
    Header,
    Footer
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
*{ padding:0px; margin:0px; box-sizing: border-box; }
:root{
  --branco:#FFF;
  --preto:#000;
  --cinza:#CCC;
  --cinza1:#e6e6e6;

  --cor1:#31479C;

  --cor2:#E25B55;
  --cor2a:#E66C69;
}
body{
  font-family: 'Roboto', sans-serif;
  font-size:18px;
}
.flex{ display:flex; }
.grid{ display:grid; }
#app{
  display: grid;
  height:100vh;
  grid-template-rows:130px 1fr 40px ;
}
.container{
  width:95%;
  max-width:1100px;
  margin:0 auto;
}
button{
  cursor: pointer;
  font-size:1.2rem;
  font-weight:bold;
  display:inlin-flex;
  text-align:center;
  justify-content:center;
  text-align:center;
  padding:15px 40px;
  border:0px;
  outline:0px;
  border-radius:8px;
  transition:.2s;
}
button:hover{
  opacity:.8;
}
</style>
