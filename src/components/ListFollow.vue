<template>
<div class="flex follow">
    <div @click="isActive = !isActive">
    following {{ lists.length }} {{ usersText() }}  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48"><path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/><path d="M0-.75h48v48h-48z" fill="none"/></svg>
    </div>
    <ul v-show="isActive">
        <li><h3 @click="isActive = !isActive">
            following {{ lists.length }} {{ usersText() }}
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" id="Layer_1" viewBox="0 0 64 64"><title/><path d="M8.25,0,32,23.75,55.75,0,64,8.25,40.25,32,64,55.75,55.75,64,32,40.25,8.25,64,0,55.75,23.75,32,0,8.25Z" /></svg>
            </h3></li>
        <li>
            <ol>
            <li v-for="(list, index) in lists" :key="index" class="user grid">
                <img :src="list.img" :alt="list.name" :class="'img'+ index" :style="{ 'border-color' : list.color }">
                <div>  
                    <h4>{{ list.name }}</h4>
                    <small>{{ list.local }} <br/>
                    </small>
                </div>
                <button @click="unfollow({ index, id : list.id })">Unfollow</button>
            </li>
            </ol>
        </li>
    </ul>
</div>
</template>

<script>
import store from '../store'
export default {
    store,
    props:{
        lists: { type: Array, default: null }
    },
    data(){
        return{
            isActive: false
        }
    },
    methods : {
         usersText(){
            return this.lists.length < 2 ? 'user' : 'users'
        },
        unfollow(id){
            // para desmarcar o botão
            this.unfollowBtn(id.id)

            this.$store.commit('setUnFollow', id.index)
        },
        unfollowBtn(id){
            let userCurrent = this.$store.state.userCurrent
            
            if(id === userCurrent){
                this.$store.commit('setUnFollowBtn', false)
            }   
        }
    }
}
</script>

<style scoped>
svg{
    position:absolute;
    top:50%;
    right:0px;
    transform:translateY(-50%);
}
.follow{
    cursor: pointer;
    position: relative;
    padding-right:40px;
}
.follow div svg{
    width:32px;
    height:32px;
    fill:var(--branco);
}
ul{
    list-style: none;
    position:absolute;
    z-index:90;
    background:var(--branco);
    color:var(--cor1);
    top:-10px;
    right:0px;
    box-shadow:0 0 5px rgba(0,0,0,.5);
}
ul > li:first-child{
    padding:10px 25px;
    border-bottom:1px solid var(--cinza);
}
ol{
    margin-bottom:10px;
    width:370px;
    max-height: 367px;
    border-bottom:20px solid var(--branco);
    overflow-y:scroll ;
}
ol::-webkit-scrollbar-track {
    background-color: rgba(255,255,255,.5);
}
ol::-webkit-scrollbar {
    width: 7px;
}
ol::-webkit-scrollbar-thumb {
    background: var(--cinza);
    border-radius:5px;
}
ol li.user{
    padding:10px 10px;
    grid-template-columns:45px 1fr 70px;
    grid-gap: 20px;
    margin:0 10px;
    align-items: center;
    line-height: 80%;
}
ol li.user + li.user{
    border-top:1px solid var(--cinza1);
}

img{
    display:block;
    width:100%;
    height: auto;
    border-radius:50%;
    border:2px solid var(--cinza);
}
h3{
    cursor:pointer;
    color:var(--cor1);
    text-align:right;
    position:relative;
    padding-right:30px;
}
h3 svg{
    width:14px;
    height:14px;
    fill:var(--cor1);
}
h4{
    font-size:1rem;
    line-height:120%;
    margin:5px 0;
}
small{
    font-size:.75rem;
    color:var(--preto);
    line-height:120%;
}
button{
    padding:8px 0px;
    font-size:.75rem;
    font-weight:400;
    width:100%;
    background-image:linear-gradient(0deg, var(--cor2), var(--cor2a));
    color:var(--branco);
}
@media(max-width:730px){
    ol{
        width:220px;
        max-height: 417px;
    }
    ol li.user{
        grid-template-columns:1fr;
        text-align:center;
    }
    img{
        width:50px;
        margin:auto;
    }
    button{
        width:100px;
        margin:auto;
    }
}
</style>