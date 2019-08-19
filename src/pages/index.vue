<template>
    <div class="gjb">
        <Layout>
            <Header>
                <h3>综合保障包</h3>
                <div class="HRight">
                    <div class="search">
                        <label for="search">
                            搜索：<Input id="search" search enter-button placeholder="请输入想要搜索的内容"/>
                        </label>
                    </div>
                    <div class="userInfo">
                        <div class="img">
                            <img src="../assets/img/userDefault.png" alt="">
                        </div>
                        <h4><span>admin</span></h4>
                    </div>
                    <div class="log-out" @click="logOutFn">
                        <Icon type="md-log-out"/>
                    </div>
                    <div class="gqImg">
                        <Dropdown @on-click="onClick">
                            <a href="javascript:void(0)">
                                语言:
                                <img v-if="lang==='c'" src="../assets/img/china.png">
                                <img v-else src="../assets/img/bjst.png">
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="c">
                                    <img src="../assets/img/china.png">
                                </DropdownItem>
                                <DropdownItem name="b">
                                    <img src="../assets/img/bjst.png">
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger>
                    <Menu
                            ref="menus"
                            theme="light"
                            width="200px"
                            :open-names="openNamesLocal"
                            :accordion="true"
                            :active-name="activeNameLocal"
                            @on-select="selectRouter">
                        <!--  @on-open-change="onOpenChange"  -->
                        <Submenu v-for="(item,index) in navList" :key="index" :name="index+1"
                                 :class="{'activeMenu':(localMenuOpen===index&&(index===0||index===10))&&!activeNameLocal}">
                            <template slot="title">
                                <span @click="onOpenChange([index+1])" :title="item.title">
                                    <Icon :type="item.icon"/>
                                    <span>
                                         {{item.name}}
                                    </span>
                                </span>
                            </template>
                            <template v-if="item.children&&item.children.length>0">
                                <MenuItem v-for="cld in item.children"
                                          :key="cld.id"
                                          :name="cld.id">
                                    <span :title="cld.title">{{cld.name}}</span>
                                </MenuItem>
                            </template>
                        </Submenu>
                    </Menu>
                </Sider>
                <Content>
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import {getTableContent, getConfigUrl} from '../ajax/ajax'
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "index",
        data() {
            return {
                navList: [
                    {
                        name: `配置管理`,
                        title: `Project Management`,
                        icon: `ios-home-outline`,
                        id: ``,
                        children: [
                            {
                                name: `产品零部件分解目录`,
                                title: `Order Management`,
                                id: `LSA-11`
                            },
                            {
                                name: `装备基本信息`,
                                title: `Task Management`,
                                id: `LSA-12`
                            },
                            {
                                name: `配置变更`,
                                title: `Code Management`,
                                id: `LSA-13`
                            },
                            {
                                name: `技术状态分析`,
                                title: `Code Management`,
                                id: `LSA-14`
                            }
                        ]
                    },
                    {
                        name: `维修管理`,
                        title: `Configuration Management`,
                        icon: `ios-construct-outline`,
                        id: ``,
                        children: [
                            {
                                name: `预防性维修大纲`,
                                title: `Configuration Status Report`,
                                id: `LSA-21`
                            },
                            {
                                name: `计划修理标准工程单`,
                                title: `Configuration Identification Data`,
                                id: `LSA-22`
                            },
                            {
                                name: `艇员日常维护保养条例`,
                                title: `Emc Of Equipment List`,
                                id: `LSA-23`
                            },
                            {
                                name: `维修计划及监控`,
                                title: `Emc Of Equipment List`,
                                id: `LSA-24`
                            },
                            {
                                name: `故障及维修记录`,
                                title: `Emc Of Equipment List`,
                                id: `LSA-25`
                            }
                        ] //二级
                    }, //配置管理
                    {
                        name: `供应保障`,
                        title: `Maintenance Management`,
                        icon: `ios-build-outline`,
                        id: ``,
                        children: [
                            {
                                name: `器材及寿命件配置清单`,
                                title: `Maintenance Management System Index`,
                                id: `LSA-31`
                            },
                            {
                                name: `器材及寿命件基本信息`,
                                title: `Preventive Maintenance Schedule`,// 预防性维修清单
                                id: `LSA-32`
                            },
                            {
                                name: `器材出入库管理`,
                                title: `Equipment Log Contents List`,// 设备日志目录表
                                id: `LSA-33`
                            },
                            {
                                name: `寿命件使用更换记录`,
                                title: `Performance And Servicing Schedule Form`,// 操作和保养计划表
                                id: `LSA-34`
                            },
                            {
                                name: `器材消耗规律分析`,
                                title: `Performance And Servicing Record`,// 操作和保养记录表
                                id: `LSA-35`
                            },
                            {
                                name: `寿命件过期预警`,
                                title: `Defect Log Form`,// 缺陷日志表
                                id: `LSA-36`
                            }
                        ] //二级
                    }, //维修管理
                    {
                        name: '技术资料',
                        title: `Supply Plan Management`,
                        icon: 'ios-train-outline',
                        id: ' ',
                        children: [
                            {
                                name: '完工文件',
                                title: 'Summary Index Of Allowance Parts/Equipage Lists',
                                id: 'LSA-41'
                            },
                            {
                                name: '使用与维修手册',
                                title: 'Allowance Parts List',
                                id: 'LSA-42'
                            },
                            {
                                name: "修理标准及工艺",
                                title: 'Allowance Equipage List',
                                id: 'LSA-43'
                            },
                            {
                                name: "技术资料更新",
                                title: 'Stock Number Sequence List(Section A)',
                                id: 'LSA-44'
                            }
                        ] //二级
                    }, //供应计划管理
                    {
                        name: '训练保障',
                        title: 'Stock Management',
                        icon: 'ios-albums-outline',
                        id: ' ',
                        children: [
                            {
                                name: '培训教材及课件',
                                title: 'Receipt Of Supplies',
                                id: 'LSA-51'
                            },
                            {
                                name: '培训与考核题库',
                                title: 'Supplies Issued Record',// 供应品出库记录
                                id: 'LSA-52'
                            },
                            {
                                name: '虚拟训练',
                                title: 'Information For Items Received In Store',// 供应品入库管理表
                                id: 'LSA-53'
                            },
                            {
                                name: '培训与考核记录',
                                title: 'Information For Items Issued',// 供应品出库管理表
                                id: 'LSA-54'
                            }
                        ] //二级
                    }, //库存管理
                    {
                        name: '设备设施',
                        title: 'Technical Document Management',
                        icon: 'ios-list-box-outline',
                        id: ' ',
                        children: [
                            {
                                name: '保障设备与设施清单',
                                title: 'Technical Publications Index of the systems',// 系统技术出版物索引表
                                id: 'LSA-61'
                            },
                            {
                                name: '设备设施基本信息',
                                title: 'The catalog of technical manuals of the systems',// 系统技术手册目录
                                id: 'LSA-62'
                            },
                            {
                                name: '设备设施使用维修记录',
                                title: 'The catalog of technical manuals of the systems',// 系统技术手册目录
                                id: 'LSA-63'
                            }
                        ]
                    }, //技术资料管理
                    {
                        name: `保障性分析+数字化加工`,
                        title: `Human Resource Management`,
                        icon: `ios-people-outline`,
                        id: ``,
                        children: [
                            {
                                name: `主页`,
                                title: `Summary Of Personnel`,
                                id: `LSA-71`
                            }
                        ]
                    }
                ],
                flag: true,
                lang: `c`,
                localMenuOpen: 0
            }
        },
        async created() {
            const loginID = this.getSession(`login_ui-id`)
            if (!loginID) {
                this.$router.push(`/login`)
            }
            const munName = this.getSession(`munName`)
            const localMenuOpen = this.getSession(`localMenuOpen`)
            if (localMenuOpen !== null) {
                this.localMenuOpen = parseInt(localMenuOpen)
                this.CHANGE_OPEN_NAME([parseInt(localMenuOpen) + 1])
            }
            if (munName) {
                this.CHANGE_ACTIVE_NAME(munName)
            }
            //获取配置Url
            await this.getConfigUrlFn()
        },
        computed: {
            ...mapState([`openNames`, `activeName`, `configUrl`]),
            openNamesLocal() {
                return this.openNames
            },
            activeNameLocal() {
                return this.activeName
            }
        },
        methods: {
            ...mapMutations([`TABLE_DATA`, `CHANGE_OPEN_NAME`, `CHANGE_ACTIVE_NAME`, `CONFIG_URL`]),
            onClick(i) {
                this.lang = i
            },
            async onOpenChange(t) {
                if (t[0] === 1) {
                    this.$router.push(`/projectManagement`)
                    this.CHANGE_ACTIVE_NAME(``)
                    this.setSession(`munName`, ``);
                } else if (t[0] === 11) {
                    this.$router.push(`/Lms`)
                    this.CHANGE_ACTIVE_NAME(``)
                    this.setSession(`munName`, ``);
                } else if (t[0] === 9) {
                    window.open(`${this.configUrl[`Equipment Management`]}`);
                } else if (t[0] === 10) {
                    window.open(`${this.configUrl[`IETM`]}`);
                }
                this.localMenuOpen = t[0] - 1;
                this.setSession(`localMenuOpen`, this.localMenuOpen);
            },
            async selectRouter(t) {
                const num = t.split(`-`)[1]
                this.setSession(`munName`, t)
                this.CHANGE_ACTIVE_NAME(t)
                if (parseInt(num) > 600) {
                    this.$router.push(`/gjbImg/${t}`)
                } else if (parseInt(num) === 1) {
                    this.$router.push(`/orderManagement`)
                } else if (parseInt(num) === 2) {
                    this.$router.push(`/taskManagement`)
                } else if (parseInt(num) === 3) {
                    this.$router.push(`/codingManagement`)
                } else if (parseInt(num) === 4) {
                    this.$router.push(`/gjbImg/${t}`)
                } else {
                    await this.getTableContentReq(t)
                    this.$router.push(`/gjbList/${t}`)
                }
            },
            async getTableContentReq(t) {
                await getTableContent({tableID: t}).then(async res => {
                    if (res.succ) {
                        await this.TABLE_DATA(res.content)
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.error(err)
                    this.$Message.success(`数据获取失败！`);
                })
            },
            async getConfigUrlFn() {
                await getConfigUrl().then(res => {
                    if (res.succ) {
                        this.CONFIG_URL(res.content)
                    }
                }).catch(err => {
                    console.error(err)
                })
            },
            logOutFn() {
                this.$Modal.confirm({
                    title: '是否确定登出？',
                    onOk: () => {
                        this.setSession(`login_ui-id`, null)
                        this.$router.push(`/login`)
                    }
                })
            }
        },
        watch: {
            openNamesLocal() {
                this.$nextTick(() => {
                    this.$refs.menus.updateOpened();
                })
            },
            activeNameLocal() {
                this.$nextTick(() => {
                    this.$refs.menus.updateActiveName();
                })
            },
            $route(to) {
                if (to.fullPath === `/projectManagement`) {
                    const munName = this.getSession(`munName`)
                    const localMenuOpen = this.getSession(`localMenuOpen`)
                    if (localMenuOpen !== null) {
                        this.localMenuOpen = parseInt(localMenuOpen)
                        this.CHANGE_OPEN_NAME([parseInt(localMenuOpen) + 1])
                    }
                    if (munName) {
                        this.CHANGE_ACTIVE_NAME(munName)
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    .gjb {
        width: 100%;
        height: 100%;
        .ivu-layout {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .ivu-layout-header {
                background: #fff;
                color: #5b595a;
                display: flex;
                justify-content: space-between;
                align-content: center;
                margin-bottom: 18px;
                box-shadow: 3px 5px 11px 0 rgba(175, 206, 245, 0.3);
                padding: 0 60px 0 50px;
                position: relative;
                h3 {
                    font-size: 20px;
                }
                .HRight {
                    display: flex;
                    .userInfo {
                        width: 150px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        > .img {
                            width: 30px;
                            height: 30px;
                            border: 1px solid #eee;
                            background: rgba(0, 0, 0, 0.1);
                            font-size: 0;
                            overflow: hidden;
                            border-radius: 50%;
                            > img {
                                width: 30px;
                                vertical-align: top;
                            }
                        }
                        > h4 {
                            margin-left: 5px;
                            font-weight: 500;
                            span {
                                padding: 2px 4px;
                                &:hover {
                                    border-radius: 5px;
                                    background: rgba(0, 0, 0, 0.1);
                                }
                            }
                        }
                    }
                    .gqImg {
                        width: 60px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        position: absolute;
                        right: 0;
                        top: 0;
                        font-size: 12px;
                        .ivu-dropdown-rel {
                            line-height: 30px;
                        }
                        a {
                            display: inline-block;
                            height: 28px;
                            line-height: 28px;
                            vertical-align: middle;
                        }
                        img {
                            width: 28px;
                            cursor: pointer;
                            vertical-align: middle;
                            border: 1px solid #CBCBCB;
                        }
                    }
                    .log-out {
                        width: 50px;
                        text-align: center;
                        font-size: 20px;
                        cursor: pointer;
                        &:hover {
                            > i {
                                background: rgba(0, 0, 0, 0.1);
                                border-radius: 5px;
                            }
                        }
                    }
                    .search {
                        width: 320px;
                        margin-right: 50px;
                        > label {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            > .ivu-input-group {
                                width: 75%;
                            }
                        }
                    }
                }
            }
            .ivu-layout-sider {
                background: #F0F7FF;
                overflow-x: hidden;
                overflow-y: auto;
                -moz-user-select: none;

                -webkit-user-select: none;

                -ms-user-select: none;

                -khtml-user-select: none;

                user-select: none;
                .ivu-layout-sider-children {
                    > ul {
                        &:after {
                            background: none
                        }
                    }
                }
                .ivu-menu-light {
                    background: transparent;
                }
                .ivu-menu {
                    .ivu-menu-submenu {
                        &:nth-child(10) {
                            .ivu-menu-submenu-title {
                                .ivu-menu-submenu-title-icon {
                                    display: none;
                                }

                            }
                        }
                        &:nth-child(11) {
                            .ivu-menu-submenu-title {
                                .ivu-menu-submenu-title-icon {
                                    display: none;
                                }

                            }
                        }
                        &:nth-child(9) {
                            .ivu-menu-submenu-title {
                                .ivu-menu-submenu-title-icon {
                                    display: none;
                                }

                            }
                        }
                        .ivu-menu-submenu-title {
                            padding: 5px 10px !important;
                            span {
                                display: inline-block;
                                height: 35px;
                                line-height: 35px;
                                width: 158px;
                                border-radius: 20px;
                                font-size: 13px;
                                color: #333;
                                white-space: nowrap;
                                word-break: break-all;
                                > i {
                                    display: inline-block;
                                    width: 20px;
                                    text-align: center;
                                    margin-right: 0;
                                    font-size: 16px;
                                    line-height: 35px;
                                }
                                > span {
                                    display: inline-block;
                                    width: 90%;
                                    text-indent: 0;
                                }
                            }
                        }
                    }
                    .activeMenu {
                        .ivu-menu-submenu-title {
                            > span {
                                background: #01a5ff;
                                box-shadow: 3px 3px 1px 1px #aed1fd;
                                > span, > i {
                                    color: #fff;
                                }
                                &:hover {
                                    background: #01a5ff;
                                    color: #fff;
                                }
                            }
                        }
                    }
                    .ivu-menu-item {
                        padding: 5px 0 5px 29px !important;
                        > span {
                            width: 145px;
                            display: inline-block;
                            height: 30px;
                            line-height: 30px;
                            border-radius: 20px;
                            text-indent: 10px;
                            font-size: 13px;
                            font-weight: 500;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            color: #333;
                        }
                    }
                    .ivu-menu-item-active {
                        > span {
                            background: #01a5ff;
                            color: #fff;
                            box-shadow: 3px 3px 1px 1px #aed1fd;
                            &:hover {
                                background: #01a5ff;
                                color: #fff;
                            }
                        }
                        &:after {
                            background: transparent;
                        }
                    }
                }

            }
            .ivu-layout-content {
                overflow: auto;
                background: #F0F7FF;
            }
        }
    }

</style>
