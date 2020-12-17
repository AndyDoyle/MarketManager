<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>
            <div class="content" :style="{minHeight:200+'px'}">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
            
        </div>
        <v-foot></v-foot>
    </div>
</template>


<script>
import vHead from './Header.vue';
import vFoot from './Footer.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            menulist:[],
            collapse: false,
            
        };
    },
    components: {
        vFoot,
        vHead,
        vSidebar,
        vTags
    },
    created() {
            this.getmenulist();
        bus.$on('collapse-content', (msg) => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', (msg) => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    },
    methods:{
        getmenulist(){
                this.axios({
                method:"get",
                url:"user/menu",
                headers:{'authorization':window.sessionStorage.getItem('token')}
            })
            .then(res => { 
                console.log(res)
                console.log(res.data)
                this.menulist = res.data
            })
        },
    },
    mounted() {
        this.minHeight = document.documentElement.clientHeight - 290;
        var that = this;
        window.onresize = function () {
            this.minHeight = document.documentElement.clientHeight - 290;
        };
    }
};
</script>
