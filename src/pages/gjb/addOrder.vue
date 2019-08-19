<template>
    <div class="addOrder">
        <header>
            创建订单(Create Order)
            <Button type="primary" @click="goBack">返回(Back)</Button>
        </header>
        <section>
            <header>
                <label for="groupName">
                   <span>
                      Project Name:
                   </span>
                    <Input :disabled="true" id="groupName" v-model="stepData.groupName" placeholder="请输入项目名称"/>
                </label>
                <span>
                    <Icon type="md-arrow-forward"/>
                </span>
                <label for="groupName">
                    Level 1:
                    <Select :disabled="!stepData.groupName||oderDetail!==null" v-model="stepData.firstNav"
                            style="width:120px">
                        <Option v-for="item in firstNavList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </label>
                <span>
                    <Icon type="md-arrow-forward"/>
                </span>
                <label for="groupName">
                    Level 2：
                    <Select :disabled="!stepData.firstNav||oderDetail!==null" v-model="stepData.secondNav"
                            :label-in-value="true"
                            @on-change="onChange"
                            style="width:120px">
                        <Option v-for="item in secondNavList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </label>
                <span v-if="!oderDetail">
                    <Button :disabled="!stepData.secondNav" type="primary" class="sureFn" @click="sureFn">Confirm</Button>
                </span>
            </header>
            <section>
                <div class="oderInfo">
                    <label for="name">
                        Order Name：
                        <Input :disabled="oderDetail!==null" id="name" v-model="oderName" placeholder="请输入订单名称"/>
                    </label>
                    <label for="name">
                        Applicant：
                        <Input :disabled="oderDetail!==null" id="applePeople" v-model="applePeople"
                               placeholder="请输入申请人"/>
                    </label>
                    <label for="createTime">
                        <span>Create Date:</span>
                        <DatePicker :disabled="oderDetail!==null" id="createTime" type="date" v-model="createTime"
                                    placeholder="请选择创建时间"></DatePicker>

                    </label>
                </div>
                <div class="oderList">
                    <Table border ref="selection" :columns="columns" :data="dataInfo"
                           @on-selection-change="onSelect"></Table>
                </div>
                <div class="btn" v-if="!oderDetail">
                    <Button type="primary" @click="submit">提交(submit)</Button>
                    <Button @click="goBack">取消(cancel)</Button>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import {getTableContent} from '../../ajax/ajax'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "addOrder",
        data() {
            return {
                navList: [
                    {
                        name: `CM(配置管理)`,
                        title: `Configuration Management`,
                        icon: `ios-construct-outline`,
                        id: ``,
                        children: [
                            {
                                name: `CSR(配置状态报表)`,
                                title: `Configuration Status Report`,
                                id: `LSA-11`
                            },
                            {
                                name: `CID(配置识别信息)`,
                                title: `Configuration Identification Data`,
                                id: `LSA-12`
                            },
                            {
                                name: `MECL(配置MEC清单)`,
                                title: `Emc Of Equipment List`,
                                id: `LSA-13`
                            }
                        ] //二级
                    }, //配置管理
                    {
                        name: `MM(维修管理)`,
                        title: `Maintenance Management`,
                        icon: `ios-build-outline`,
                        id: ``,
                        children: [
                            {
                                name: `MMSI(维修管理系统索引)`,
                                title: `Maintenance Management System Index`,
                                id: `LSA-21`
                            },
                            {
                                name: `PMS(预防性维修清单)`,
                                title: `Preventive Maintenance Schedule`,// 预防性维修清单
                                id: `LSA-22`
                            },
                            {
                                name: `ELCL(设备日志目录表)`,
                                title: `Equipment Log Contents List`,// 设备日志目录表
                                id: `LSA-23`
                            },
                            {
                                name: `PASSF(操作和保养计划表)`,
                                title: `Performance And Servicing Schedule Form`,// 操作和保养计划表
                                id: `LSA-24`
                            },
                            {
                                name: `PASR(操作和保养记录表)`,
                                title: `Performance And Servicing Record`,// 操作和保养记录表
                                id: `LSA-25`
                            },
                            {
                                name: `DLF(缺陷日志表)`,
                                title: `Defect Log Form`,// 缺陷日志表
                                id: `LSA-26`
                            },
                            {
                                name: `CMSF(中央计划表)`,
                                title: `Central Maintenance Schedule Form`,// 中央计划表
                                id: `LSA-27`
                            },
                            {
                                name: `CMPRF(中央计划记录表)`,
                                title: `Central Maintenance Plan Record Form`,// 中央计划记录表(OEM
                                id: `LSA-28`
                            },
                            {
                                name: `MPC(维修计划卡)`,
                                title: `Maintenance Planning Card`,// MMS4-维修计划卡
                                id: `LSA-29`
                            },
                            {
                                name: `JIC(维修工作信息卡)`,
                                title: `Job Information Card`,// 维修工作信息卡(首页)
                                id: `LSA-210`
                            },
                            {
                                name: `MRC(维修记录卡)`,
                                title: `Maintenance Record Card`,// 维修记录卡
                                id: `LSA-211`
                            },
                            {
                                name: `CMSF(中央计划表(OEM))`,
                                title: `Central Maintenance Schedule Form(OEM)`,// 中央计划表(OEM)
                                id: `LSA-212`
                            },
                            {
                                name: `CMPRF(中央计划记录表(OEM))`,
                                title: `Central Maintenance Plan Record Form(OEM)`,// 中央计划记录表(OEM)
                                id: `LSA-213`
                            }
                        ] //二级
                    }, //维修管理
                    {
                        name: 'SPM(供应计划管理)',
                        title: `Supply Plan Management`,
                        icon: 'ios-train-outline',
                        id: ' ',
                        children: [
                            {
                                name: 'APL/AEL(代码总索引表)',
                                title: 'Summary Index Of Allowance Parts/Equipage Lists',
                                id: 'LSA-31'
                            },
                            {
                                name: 'APL(定额零件表)',
                                title: 'Allowance Parts List',
                                id: 'LSA-34'
                            },
                            {
                                name: "AEL(定额用具表)",
                                title: 'Allowance Equipage List',
                                id: 'LSA-35'
                            },
                            {
                                name: "SNSL A(库存代码顺序清单(A节))",
                                title: 'Stock Number Sequence List(Section A)',
                                id: 'LSA-36'
                            },
                            {
                                name: "SNSL B(库存代码顺序清单(B节))",
                                title: 'Stock Number Sequence List(Section B)',
                                id: 'LSA-37'
                            },
                            {
                                name: "SNSL(库存代码顺序清单)",
                                title: 'Stock Number Sequence List',
                                id: 'LSA-38'
                            },
                            {
                                name: 'Index(Section A)',
                                title: '索引（A节）',
                                id: 'LSA-32'
                            },
                            {
                                name: 'Index(Section B)',
                                title: '索引（B节）',
                                id: 'LSA-33'
                            }
                        ] //二级
                    }, //供应计划管理
                    {
                        name: 'SM(库存管理)',
                        title: 'Stock Management',
                        icon: 'ios-albums-outline',
                        id: ' ',
                        children: [
                            {
                                name: 'ROS(供应品入库验收单)',
                                title: 'Receipt Of Supplies',
                                id: 'LSA-51'
                            },
                            {
                                name: 'SIR(供应品出库记录)',
                                title: 'Supplies Issued Record',// 供应品出库记录
                                id: 'LSA-52'
                            },
                            {
                                name: 'IFIRIS(供应品入库管理表)',
                                title: 'Information For Items Received In Store',// 供应品入库管理表
                                id: 'LSA-53'
                            },
                            {
                                name: 'IFII(供应品出库管理表)',
                                title: 'Information For Items Issued',// 供应品出库管理表
                                id: 'LSA-54'
                            },
                            {
                                name: "SFIOSI(库存供应品(备件)领用报表)",
                                title: "Statistics For Information Of Supplies Issue",// 库存供应品(备件)领用报表
                                id: 'LSA-55'
                            },
                            {
                                name: "SIL(供应品库存情况表)",
                                title: "Supplies Inventory List",// 供应品库存情况表
                                id: 'LSA-56'
                            },
                            {
                                name: "SFIC(供应品库存状态表)",
                                title: "Statistics For Items Conditions",// 供应品库存状态表
                                id: 'LSA-57'
                            },
                            {
                                name: "SSRR(供应品补充请求单)",
                                title: "Supplies Supplement Requirement Report",// 供应品补充请求单
                                id: 'LSA-58'
                            }
                        ] //二级
                    }, //库存管理
                    {
                        name: 'TDM(技术资料管理)',
                        title: 'Technical Document Management',
                        icon: 'ios-list-box-outline',
                        id: ' ',
                        children: [
                            {
                                name: 'TPI(系统技术出版物索引表)',
                                title: 'Technical Publications Index of the systems',// 系统技术出版物索引表
                                id: 'LSA-61'
                            },
                            {
                                name: 'STM(系统技术手册目录)',
                                title: 'The catalog of technical manuals of the systems',// 系统技术手册目录
                                id: 'LSA-62'
                            }
                        ]
                    }, //技术资料管理
                    {
                        name: `HRM(人力资源管理)`,
                        title: `Human Resource Management`,
                        icon: `ios-people-outline`,
                        id: ``,
                        children: [
                            {
                                name: `SOP(人员汇总)`,
                                title: `Summary Of Personnel`,
                                id: `LSA-71`
                            }
                        ]
                    },
                    {
                        name: `TM(培训管理)`,
                        title: `Training Management`,
                        icon: `ios-easel-outline`,
                        id: ``,
                        children: [
                            {
                                name: `STR(技能和培训要求)`,
                                title: `Skills And Training Requirements`,
                                id: `LSA-72`
                            }
                        ]
                    }
                ],

                tableInfo: {},
                stepData: {
                    groupName: `XXX项目`,
                    firstNav: ``,
                    secondNav: ``,
                    tableID: ``
                },
                oderName: ``,
                applePeople: `admin`,
                createTime: new Date(),
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号(Number)',
                        type: `index`
                    },
                    {
                        title: '记录名(Record name)',
                        key: 'tableName',
                        render: (h, params) => {
                            console.log(params.row);
                            return h(`span`, {}, `${params.row.content.name}-${params.index + 1}`)
                        }
                    },
                    {
                        title: '创建时间(CreateTime)',
                        key: 'createTime',
                        render: (h, params) => {
                            return h(`span`, {}, this.conversionTime(params.row.createTime)(`yyyy-MM-dd :hh-mm-ss`))
                        }
                    }
                ],
                dataInfo: [],
                selectList: []
            }
        },
        created() {
            if (this.oderDetail) {
                this.stepData = {
                    groupName: `XXX项目`,
                    firstNav: this.oderDetail.firstNav,
                    secondNav: this.oderDetail.secondNav,
                    tableID: this.oderDetail.tableID
                }
                this.oderName = this.oderDetail.oderName
                this.applePeople = this.oderDetail.applePeople
                this.createTime = new Date(this.oderDetail.createTime)
                this.dataInfo = this.oderDetail.oderChangeList
                this.columns.splice(0, 1)
            }
        },
        computed: {
            ...mapState([`oderList`, `oderDetail`]),
            firstNavList() {
                const arr = []
                this.navList.forEach(r => {
                    arr.push({
                        value: r.title,
                        label: r.title,
                    })
                })
                return arr
            },
            secondNavList() {
                const arr = []
                this.navList.forEach(r => {
                    if (this.stepData.firstNav === r.title) {
                        if (r.children.length > 0) {
                            r.children.forEach(f => {
                                arr.push({
                                    value: f.id,
                                    label: f.title,
                                })
                            })
                        }
                    }
                })
                return arr
            }
        },
        methods: {
            ...mapMutations([`ODER_LIST`]),
            async sureFn() {
                if (this.stepData.secondNav) {
                    await this.getTableContentReq(this.TRIM(this.TRIM(this.stepData.secondNav)))
                }
            },
            submit() {
                if (!this.dataInfo.length) {
                    this.$Message.warning(`请筛选表格内容！`)
                } else if (this.oderName === ``) {
                    this.$Message.warning(`请填写订单名称！`)
                } else if (!this.selectList.length) {
                    this.$Message.warning(`请选择表单list！`)
                } else {
                    const list = this.oderList
                    list.push(
                        {
                            oderChangeList: this.selectList,
                            oderName: this.oderName,
                            applePeople: this.applePeople,
                            createTime: this.createTime,
                            ...this.stepData
                        }
                    )
                    this.ODER_LIST(list)
                    this.$router.push(`orderManagement`)
                }
            }, //提交
            goBack() {
                this.$router.push(`orderManagement`)
            }, //返回
            onSelect(list) {
                this.selectList = list
            },
            onChange(opt) {
                this.stepData.secondNavName = opt.label
            },
            async getTableContentReq(tableID) {
                await getTableContent({tableID: tableID}).then(async res => {
                    if (res.succ) {
                        this.dataInfo = res.content.tableList.filter(r => r.formID)
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.error(err)
                    this.$Message.success(`数据获取失败！`);
                })
            }
        }
    }
</script>

<style lang="less">
    .addOrder {
        width: 100%;
        height: 100%;
        padding: 20px;
        > header {
            height: 50px;
            line-height: 50px;
            font-weight: 600;
            width: 100%;
            margin: 0 auto;
            border: 1px solid #e5e6e8;
            border-radius: 5px;
            box-shadow: 0 0 3px #dddddd;
            background: #ffffff;
            padding: 0 20px;
            margin-bottom: 10px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        > section {
            width: 100%;
            margin: 0 auto;
            border: 1px solid #e5e6e8;
            border-radius: 5px;
            box-shadow: 0 0 3px #dddddd;
            background: #ffffff;
            min-height: 300px;
            > header {
                display: flex;
                align-items: center;
                padding: 10px 20px;
                > label {
                    display: inline-block;
                    width: 200px;
                    .ivu-input-wrapper {
                        width: 60%;
                    }
                }
                > span {
                    display: inline-block;
                    width: 40px;
                    font-size: 20px;
                    color: #01a5ff;
                }
            }
            > section {
                padding: 5px 20px;
                > .oderInfo {
                    display: flex;
                    > label {
                        flex: 1;
                        .ivu-input-wrapper {
                            width: 75%;
                        }
                    }
                }
                > .oderList {
                    padding: 20px;
                }
                > .btn {
                    text-align: center;
                    > button {
                        margin: 0 5px;
                    }
                }
            }
        }
    }
</style>
