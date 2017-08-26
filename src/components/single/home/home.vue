<template>
  <div class="_home">
      <div class="top clearfix">
        <div class="machine clearfix" >
            <p class="title">注塑机：</p>
            <div class="machine_wrap">
                <div class="task_message" v-for="item in machine_item" :key="item.math">
                    <div class="circle"></div>
                    <div class="content">{{item.title}}</div>
                    <div class="num">{{item.math}}</div>
                </div>
            </div>
        </div>
        <div class="management clearfix">
            <p class="title">我的管理：</p>
            <div class="manage_wrap">
                <div class="task_message" v-for="item in manage_item" :key="item.math">
                    <div class="message_inner" @click="$goRoute(item.path)">
                        <i class="iconList"></i>
                        <p class="content">{{item.title}}</p>
                    </div>
                </div>
            </div>
            <div class="manage_wrap">
                <div class="task_message_next" v-for="item in manage_item_2" :key="item.math">
                    <div class="message_inner" @click="$goRoute(item.path)">
                        <i class="iconList_next"></i>
                        <p class="content">{{item.title}}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="productInfo clearfix">
          <p class="title">产能概况：</p>
          <div class="flexgroup">
              <div class="flex-item">
                <div id="echartsWrap_1">

                </div>                  
              </div>
              <div class="flex-item">
                <div id="echartsWrap_2">

                </div>                  
              </div>
              <div class="flex-item">
                <div id="echartsWrap_3">

                </div>                  
              </div>
          </div>
      </div>
  </div>
</template>
<script src='./_home.js'></script>
<style lang="stylus">
// @media screen and (max-width: 1920px)
// @media screen and (max-width: 1366px)

._home
    display:block
    margin: 0 10px
    padding-top: 10px 
    .title
        color: #333
        font-size: 16px
        font-weight: bold
        text-indent: 1em
        line-height: 40px
        box-sizing: border-box
    .top
        display: flex
        height: 240px
        margin-bottom: 10px 
    .machine_wrap
        display: flex
        height: 180px
        align-items:center
        justify-content:center
    .machine
        flex: 2
        height:100%
        background:#fff
        .task_message                    
            flex:1;
            height :140px
            text-align : center;
            cursor:pointer
            .circle
                width 76px
                height 76px
                margin: 0 auto;
                border-radius:50%
                position:relative
                &::before
                    content: ''
                    position: absolute
                    left: 0
                    top: 0
                    display: block
                    width: 76px
                    height: 76px 
                    background: url(../../../../static/images/icon.png) no-repeat -3px -290px
            .content,
            .num
                margin-top: 10px
            .content
                font-size:12px
                color:#9f9f9f
            .num
                display:inline-block
                font-size:20px
                color:#666            
            &:hover{
                .num{
                    border-bottom:2px solid #666
                }
            }
            &:nth-child(2)
                .circle
                    &::before
                        background-position: -3px -370px
            &:nth-child(3)
                .circle
                    &::before
                        background-position: -3px -450px
    .management
        flex: 3
        height:100%
        margin-left: 10px
        background: #fff
        .manage_wrap
            display: flex
            height: 90px;
            align-items:center
            justify-content:center
            .message_inner
                width: 80px;
                height: 80px;
                margin: 0 auto
                font-size: 12px
                &:hover{
                    background-color #f4f4f4
                }                
                .content
                    margin-top: 25px
            .task_message 
                flex:1;
                text-align : center;
                cursor: pointer
                .iconList
                    &::before
                        content:''
                        position: relative
                        top: 15px
                        left : 50%
                        display: block
                        width:24px
                        height:24px 
                        background:url(../../../../static/images/icon.png) no-repeat -3px -1px
                        transform: translateX(-50%)
                &:nth-child(2)
                    .iconList
                        &::before
                            background-position:-3px -33px
                &:nth-child(3)
                    .iconList
                        &::before
                            background-position: -3px -65px
                &:nth-child(4)
                    .iconList
                        &::before
                            background-position: -3px -92px
                &:nth-child(5)
                    .iconList
                        &::before
                            background-position: -3px -121px
            .task_message_next 
                flex:1;
                text-align : center;
                cursor: pointer
                .iconList_next
                    &::before
                        content:''
                        position: relative
                        top: 15px
                        left : 50%
                        display: block
                        width:24px
                        height:24px 
                        background:url(../../../../static/images/icon.png) no-repeat -3px -149px
                        transform: translateX(-50%)
                &:nth-child(2)
                    .iconList_next
                        &::before
                            background:url(../../../../static/images/icon.png) no-repeat -3px -176px
                &:nth-child(3)
                    .iconList_next
                        &::before
                            background:url(../../../../static/images/icon.png) no-repeat -3px -199px
                &:nth-child(4)
                    .iconList_next
                        &::before
                            background:url(../../../../static/images/icon.png) no-repeat -3px -222px
                &:nth-child(5)
                    .iconList_next
                        &::before
                            background:url(../../../../static/images/icon.png) no-repeat -3px -252px
    .productInfo
        height:55%
        background:#fff
        padding-bottom: 10px
        p
            width:100%
            font-size:16px
            color:#333
            font-weight:700

#echartsWrap_1,
#echartsWrap_2,
#echartsWrap_3
    width: 320px
    height : 320px
    margin: 0 auto;
.flexgroup
    display: flex
    height: 100%
    .flex-item  
        flex: 1
        border-right: 1px solid #e1e1e1
</style>
