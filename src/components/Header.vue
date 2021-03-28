<template>
<div>
    <header>    
        <div class="container flex">
            <div id="nav">
                <router-link to="/">social.me</router-link> |
                <router-link to="/about">about</router-link>
            </div>

            <list-follow :lists="follow" />
        </div>
    </header>

    <h1>find new users like you</h1>
</div>
</template>

<script>
import store from '../store'
import ListFollow from './ListFollow.vue'

export default {
    components:{
        ListFollow
    },
    store,
    data(){
        return{
            follow: this.$store.state.following,
        }
    }
}
</script>

<style scoped>
header{
    background:var(--cor1);
    color:var(--branco);
    box-shadow: 0 0 10px rgba(0,0,0,.5);
}
header > div{
    justify-content: space-between;
    padding:20px 25px;
    
}
header a{
    font-weight:bold;
    color:var(--branco);
    display:inline-flex;
    text-decoration:none;
}
h1{
    text-transform:uppercase;
    position:relative;
    padding:20px 0;
    text-align:center;
    font-size:1.4rem;
    color:var(--branco)
}
h1:after{
    content:'';
    position:absolute;
    top:0px;
    left:0px;
    z-index:-1;
    width:100%;
    height:200px;
    background:var(--cor1);
}
@media(max-width:730px){
    header > div{
        padding:20px 0;
    }
    header{
        font-size:.8rem;
    }
}
</style>