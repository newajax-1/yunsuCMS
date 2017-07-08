<template>
    <div class="layoutPage">
        <Vheader></Vheader>
        <Vleftmeau></Vleftmeau>
        <Vcontent></Vcontent>
    </div>
</template>
<script>

    import Vheader from "./common/header"
    import Vleftmeau from "./common/leftmeau"
    import Vcontent from "./common/content"

    export default{
        name : "index",
        components : {
            Vheader,
            Vleftmeau,
            Vcontent
        },
        methods:{
            hashChange(){
                var that = this;
                // window.addEventListener("hashChange",function(){
                //     console.log(that.getCookies("useName"))
                // },false)
                window.onhashChange=function(){
                    console.log(that.getCookies("useName"))
                }
            }
        },
        mounted(){
            this.hashChange();
        }
    }
</script>