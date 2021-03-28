<template>
  <div class="user">

        <header>
            <div class="barra-img">
                <div class="img" :style="{ 'background-image': 'url('+ backgroundUrl +')', 'background-color' : backgroundColor }"></div>
            </div>
            <img :src="user.picture.large" class="img-user" alt="" />
            <div class="barra-btn flex">
                <button v-show="!this.$store.state.isFollow" @click="following">Follow</button>
                <button v-show="this.$store.state.isFollow" @click="unFollow(user.login.uuid)" class="btn-unfollow">Unfollow</button>

                <button @click="getUser">Try the next one</button>
            </div>
            <h2>
                {{ user.name.title }}
                {{ user.name.first }}
                {{ user.name.last }}
            </h2>
            <h4>
                {{ user.location.city }}, {{ user.location.state }}
            </h4>
        </header>
        <section>
            <div class="grid">
                <div class="info">
                    <h3>Personal info</h3>
                    <p><b>Born at:</b> {{ user.location.country }}</p>
                    <p><b>Age:</b> {{ user.registered.age }} age old</p>
                </div>
                <div class="Contact">
                    <h3>Contact info</h3>
                    <p><b>E-mail:</b> {{ user.email }}</p>
                    <p><b>Phone:</b> {{ user.phone }}</p>
                    <p><b>Cell:</b> {{ user.cell }}</p>
                </div>
            </div>
        </section>
  </div>
</template>

<script>
//import { createClient } from 'pexels';
import store from "../store";

const axios = require('axios');
export default {
    store,
    data(){
        return{
            follow: this.$store.state.following,
            user: {},
            backgroundUrl: {} | null,
            backgroundColor: {} | null,
        }
    },
    mounted(){
        this.getUser(),
        this.getBackground()
    },
    methods:{
        async getUser(){
            // CONSULTA API
            this.getBackground()
            
            //https://randomuser.me/api/
            let userDados =await axios.get('https://randomuser.me/api/')
                .then(response => (this.user = response.data.results[0] ))

            this.checkFollower()

            return userDados
        },
        checkFollower(){
            // COLOCA O BOTÃO COMO FALSE PARA CARREGAR NOVO USUÁRIO
            this.$store.commit('setUnFollowBtn', false)
        },
        getBackground(){            
            // GERA COR HEXA RANDOMICA PARA BACKGROUND DE FUNDO
            const color = (Math.random()*0xfFFFFF<<0).toString(16)
            this.backgroundUrl = ""
            this.backgroundColor = `#${color}`
        },
        async getBackground1(){
            // GERA IMAGEM RANDOMICA PARA BACKGROUND DE FUNDO
            // PAROU DE FUNCIONAR
            

            // const client = createClient('563492ad6f91700001000001545f2274bfc34f959da17984b8a7531f')
            // const arrayQuery = ['business', 'success', 'work', 'office','computer','design' ,'abstract', 'nature']
            // const query = arrayQuery[ Math.floor(Math.random() * arrayQuery.length) ] //'business'
            // const arrayColors = ['blue', 'yellow', 'orange', 'red', 'turquoise', 'pink', 'violet', 'brown', 'black', 'gray' ]
            // const color = arrayColors[ Math.floor(Math.random() * arrayColors.length) ] //'blue'
            
            // client.photos.search({ query, color, per_page: 1 }).then(photos => { this.backgroundUrl = photos.photos[0].src.landscape });

            // cores randomicamentes geradas
        },
        async getBackground2(){
            // GERA IMAGEM RANDOMICA PARA BACKGROUND DE FUNDO
            // PRECISO DE API KEY

            //const client = createClient('API_KEY');
            // const options = {
            //     method: 'GET',
            //     url: 'https://wordsapiv1.p.rapidapi.com/words/home',
            //     headers: {
            //         'x-rapidapi-key': 'SIGN-UP-FOR-KEY',
            //         'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
            //     }
            // };

            // return await axios.request(options)
            // .then(response => {
            //     this.background = response.data
            //     console.log('background', response)
            // })
            // .catch(function (error) { console.error(error); });
        },
        following(){
            // COLOCO O USUÁRIO EM UMA LISTA PARA SER EXIBIDA NO TOPO DA PÁGINA
            this.$store.commit('setUnFollowBtn', true)

            this.$store.commit('setFollowing', {
                id: this.user.login.uuid, 
                name: this.user.name.first +" "+ this.user.name.last,
                img: this.user.picture.large,
                local: this.user.location.city +", "+ this.user.location.state,
                color: this.backgroundColor
            })

            this.$store.state.userCurrent = this.user.login.uuid
        },
        unFollow(id){
            // RESET NO BOTÃO FOLLOW
            this.$store.commit('setUnFollowBtn', false )
            this.unFollowRemove(id)
        },
        unFollowRemove(id){
            // REMOVO O USUÁRIO
            this.$store.commit('setUnFollowRemove', id)
        }
    
    }    
}
</script>

<style scoped>
header,
section .grid > div{
    box-shadow:0 0 5px rgba(0,0,0,.5);
}
header{
    text-align: center;
    padding:0 0 40px;
}
header .barra-img{
    overflow: hidden;
    height:210px;
}
header .barra-img div{
    margin:-5px;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    background-color:#CCC;
    height:220px;
}
header .img-user{
    border-radius: 50%;
    width:200px;
    height:200px;
    margin-top:-100px;
    position:relative;
    z-index:2;
}
header h2{
    margin:5px 0 15px;
}
section{
    position: relative;
}
.barra-btn{
    position:relative;
    margin:10px 0;
    justify-content: center;
}
.barra-btn button:first-child{
    background:var(--cor1);
    color:var(--branco);
}
.barra-btn button:last-child{
    position:absolute;
    top:0px;
    right:20px;
}
.barra-btn .btn-unfollow{
    background-image:linear-gradient(90deg, var(--cor2), var(--cor2a));
    color:var(--branco);
}

section{
    margin:10px 0 20px;
}
section .grid{
    grid-template-columns: 1fr 1fr;
    grid-gap:10px;
}
section .grid > div{
    padding:25px;
    line-height: 180%;
}
@media(max-width:730px){
    section .grid{
        grid-template-columns: 1fr;
    }
    section .grid > div{
        text-align: center;
    }
    .barra-btn{
        flex-direction: column;
        max-width:300px;
        width:95%;
        margin:15px auto;
    }
    .barra-btn button:last-child{
        position: initial;
        margin-top:10px;
    }
}
</style>