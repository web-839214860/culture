<template>
    <div class="rule">

        <van-nav-bar title="用户条例" left-arrow @click-left="onClickLeft"/>

        <div id="content">
            <div class="content-page">
                <div class="item">
                    <div class="item-title">背景</div>
                    <div class="item-content">建立非物质文化遗产代表性项目名录，对保护对象予以确认，以便集中有限资源，对体现中华民族优秀传统文化，具有历史、文学、艺术、科学价值的非物质文化遗产项目进行重点保护，是非物质文化遗产保护的重要基础性工作之一。联合国教科文组织《保护非物质文化遗产公约》（以下简称《公约》）要求“各缔约国应根据自己的国情”拟订非物质文化遗产清单。建立国家级非物质文化遗产名录，是我国履行《公约》缔约国义务的必要举措。《中华人民共和国非物质文化遗产法》明确规定：“国家对非物质文化遗产采取认定、记录、建档等措施予以保存，对体现中华民族优秀传统文化，具有历史、文学、艺术、科学价值的非物质文化遗产采取传承、传播等措施予以保护。”“国务院建立国家级非物质文化遗产代表性项目名录，将体现中华民族优秀传统文化，具有重大历史、文学、艺术、科学价值的非物质文化遗产项目列入名录予以保护。”</div>
                    <div class="item-content">国家级名录将非物质文化遗产分为十大门类，其中五个门类的名称在2008年有所调整，并沿用至今。十大门类分别为：民间文学，传统音乐，传统舞蹈，传统戏剧，曲艺，传统体育、游艺与杂技，传统美术，传统技艺，传统医药，民俗。</div>
                </div>
                <div class="item">
                    <div class="item-title">总则</div>
                    <div class="item-content">1.用户应当同意本协议的条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击"注册"按钮即表示用户与本平台达成协议，完全接受本协议项下的全部条款。</div>
                    <div class="item-content">2.用户注册成功后，平台将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</div>
                    <div class="item-content">3.用户可以使用本平台各个频道单项服务，当用户使用平台各单项服务时，用户的使用行为视为其对该单项服务的服务条款以及平台在该单项服务中发出的各类公告的同意。</div>
                    <div class="item-content">4.服务协议以及各个频道单项服务条款和公告可由本平台随时更新，且无需另行通知。您在使用相关服务时,应关注并遵守其所适用的相关条款。</div>
                    <div class="item-content">您在使用平台提供的各项服务之前，应仔细阅读本服务协议。如您不同意本服务协议，您可以主动取消平台提供的服务；您一旦使用了本平台提供的服务，即视为您已了解并完全同意本服务协议各项内容(包括平台对服务协议随时所做的任何修改)，并成为我们的用户。</div>
                </div>
                <div class="item">
                    <div class="item-title">知识产权</div>
                    <div class="item-content">本平台所提供的作品及资料，其著作权、商标专用权、商业秘密权及其它知识产权，均为本平台或授权本平台使用的合法权利人所有，除非事先经本平台或其权利人的书面授权，任何人皆不得擅自以任何形式使用，否则本平台可立即终止向该用户提供产品和服务，并依法追究其法律责任，赔偿本公司一切损失。</div>
                </div>
                <div class="item">
                    <div class="item-title">免责声明</div>
                    <div class="item-content">1.因网络信息传播需要，本平台使用的信息是从互联网搜索的，或从第三方或免费资源提供方摘编获得，在授权方面难免出现遗漏。如您对本平台相关内容的版权问题存有异议，请您及时与我们联系，并提供您对相关内容拥有著作权的证明文件，我们将及时妥善处理。</div>
                    <div class="item-content">2.本平台如因系统维护或升级而需暂停服务时，将事先公告。若因线路及非本平台控制范围外的硬件故障或其他不可抗力而导致暂停服务，对于暂停服务期间造成的一切不便，请您见谅。</div>
                </div>
                <div class="item">
                    <div class="item-title">法律适用及管辖</div>
                    <div class="item-content">1.本用户条款适用中华人民共和国的法律。</div>
                    <div class="item-content">2.如本平台服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款法律效力不变。</div>
                    <div class="item-content">3.如出现纠纷，用户和本平台一致同意交由人民法院管辖。</div>
                    <div class="item-content">4.最终解释权由本平台所有。</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('content').style.height = winHeight-46 +'px'
        }, 
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
        },
    }
</script>

<style lang="less" scoped>

.rule{
    width: 100%;
}

#content{
    overflow: scroll;

    .content-page{
        padding: 10px 15px;
        background: #F7F8FA;

        .item{
            margin-bottom: 12px;

            &:last-child{
                margin-bottom: 0px;
            }

            .item-title{
                font-size: 31px;
                font-weight: bold;
                color: #333333;
                margin-bottom: 10px;
            }

            .item-content{
                font-size: 27px;
                color: rgb(48, 48, 48);
                text-indent: 55px;
                line-height: 45px;
                text-align: justify;
                margin-bottom: 3px;

                &:last-child{
                    margin-bottom: 0px;
                }
            }
        }
    }
}

</style>