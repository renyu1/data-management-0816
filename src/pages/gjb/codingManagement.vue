<template>
    <div class="codingManagement">
        <header>
            <h4>编码管理(Coding management)</h4>
            <div class="filter">
                <div class="content">
                    <label for="codingName">
                        Code Name：
                        <Input id="codingName" v-model="filterData.codingName" placeholder="enter" clearable/>
                    </label>
                    <label>
                        Code Type：
                        <Select v-model="filterData.codingType">
                            <Option v-for="item in codeTypeList" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </label>
                    <label>
                        Category I：
                        <Select v-model="filterData.firstClassify" @on-change="firstOnChange">
                            <Option v-for="item in firstClassifyList" :value="item.value" :key="item.value">{{
                                item.label }}
                            </Option>
                        </Select>
                    </label>
                    <label>
                        Category II：
                        <Select :disabled="!filterData.firstClassify" v-model="filterData.secondClassify">
                            <Option v-for="item in secondClassifyList" :value="item.value" :key="item.value">{{
                                item.label }}
                            </Option>
                        </Select>
                    </label>
                </div>
                <div class="btn">
                    <Button type="primary" @click="filterBtn">Query</Button>
                    <Button type="primary" @click="resultFn">Reset</Button>
                </div>
            </div>
        </header>
        <section>
            <header>
                <Button size="large" type="primary" @click="addOrder">新建(Create)</Button>
                <Button size="large" type="error" @click="batchDeletion">批量删除(Batch Deletion)</Button>
            </header>
            <section>
                <Table border :columns="columns7" :data="codingList"></Table>
            </section>
        </section>
        <Drawer :title="createInfo.title" :closable="true" :width="600" @on-close="onClose" v-model="createInfo.show">
            <div class="drawerContent">
                <div>
                    <label for="codingNameAdd">
                        <span>Code Name:</span>
                        <Input :disabled="createInfo.type===1" id="codingNameAdd" v-model="createInfo.codingName"
                               placeholder="请输入编码名称" clearable/>
                    </label>
                    <label>
                        <span>Category I:</span>
                        <Select :disabled="createInfo.type===1" v-model="createInfo.firstClassify"
                                @on-change="firstOnChangeAdd">
                            <Option v-for="item in firstClassifyList" :value="item.value" :key="item.value">{{
                                item.label }}
                            </Option>
                        </Select>
                    </label>
                </div>
                <div>
                    <label>
                        <span> Category II:</span>
                        <Select :disabled="!createInfo.firstClassify||createInfo.type===1"
                                v-model="createInfo.secondClassify">
                            <Option v-for="item in secondClassifyList" :value="item.value" :key="item.value">{{
                                item.label }}
                            </Option>
                        </Select>
                    </label>
                    <label>
                        <span>Code Type:</span>
                        <Select :disabled="createInfo.type===1" v-model="createInfo.codingType">
                            <Option v-for="item in codeTypeList" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Description:</span>
                        <Input v-model="createInfo.codingDes" type="textarea"
                               :autosize="{maxRows: 3,minRows: 3}"
                               placeholder="编码描述"/>
                    </label>
                    <label>
                        <span>Code Length:</span>
                        <Input v-model="createInfo.codingLength" type="number"
                               placeholder="编码描述"/>
                    </label>
                </div>
                <div>
                    <label class="last">
                        <span>Remarks:</span>
                        <Input v-model="createInfo.codingRemarks" type="textarea"
                               :autosize="{maxRows: 3,minRows: 3}"
                               placeholder="编码描述"/>
                    </label>
                </div>
            </div>
            <div class="drawerSubmit">
                <Button size="large" type="primary" @click="addSubmit">提交(submit)</Button>
                <Button size="large" @click="cancle">取消(cancel)</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: `codingManagement`,
        data() {
            return {
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '(NO.)',
                        type: `index`,
                        width: 80,
                    },
                    {
                        title: 'Code Name',
                        key: 'codingName'
                    },
                    {
                        title: 'Category I',
                        key: 'firstClassify'
                    },
                    {
                        title: 'Category II',
                        key: 'secondClassify'
                    },
                    {
                        title: 'Description',
                        key: 'codingDes'
                    },
                    {
                        title: 'Coded Data Type',
                        key: 'codingType'
                    },
                    {
                        title: 'Code Length',
                        key: 'codingLength'
                    },
                    {
                        title: 'Remarks',
                        key: 'codingRemarks'
                    },
                    {
                        title: 'Create Time',
                        key: 'createDate'
                    },
                    {
                        title: 'Creator',
                        key: 'createPeople'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row);
                                            this.createInfo = {
                                                show: true,
                                                type: 1, //0 新建 1 编辑
                                                title: `Edit Code`,
                                                index: params.index,
                                                codingName: params.row.codingName,
                                                firstClassify: params.row.firstClassify,
                                                secondClassify: params.row.secondClassify,
                                                codingType: params.row.codingType,
                                                codingDes: params.row.codingDes,
                                                codingLength: params.row.codingLength,
                                                codingRemarks: params.row.codingRemarks
                                            }
                                        }
                                    }
                                }, 'Edit'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row);
                                        }
                                    }
                                }, 'Del')
                            ]);
                        }
                    }
                ],
                createInfo: {
                    show: false,
                    type: 0, //0 新建 1 编辑
                    title: `Create Code`,
                    codingName: ``,
                    firstClassify: ``,
                    secondClassify: ``,
                    codingType: ``,
                    codingDes: ``,
                    codingLength: ``,
                    codingRemarks: ``
                },
                classifyList: [
                    {
                        name: `Power System`,
                        id: `1`,
                        children: [
                            {
                                name: `Steam Turbine`,
                                id: `1.1`,
                            },
                            {
                                name: `Sea Water Pump`,
                                id: `1.2`,
                            },
                            {
                                name: `Main Gate Valve`,
                                id: `1.3`,
                            },
                            {
                                name: `Controller`,
                                id: `1.4`,
                            }
                        ]
                    },
                    {
                        name: `Electric Power Systems`,
                        id: `2`,
                        children: [
                            {
                                name: `Switchboard`,
                                id: `2.1`,
                            },
                            {
                                name: `Main Transformer Control Screen`,
                                id: `2.2`,
                            }
                        ]
                    },
                    {
                        name: `Support System`,
                        id: `3`,
                        children: [
                            {
                                name: `Support Console`,
                                id: `3.1`,
                            },
                            {
                                name: `Hydraulic Station`,
                                id: `3.2`,
                            },
                            {
                                name: `Fire Extinguishing Equipment`,
                                id: `3.3`,
                            }
                        ]
                    },
                    {
                        name: `Communication Systems`,
                        id: `4`,
                        children: [
                            {
                                name: `Transmitter`,
                                id: `4.1`,
                            },
                            {
                                name: `Receiver`,
                                id: `4.2`,
                            }
                        ]
                    }
                ],
                filterData: {
                    codingName: ``,
                    codingType: ``,
                    firstClassify: ``,
                    secondClassify: ``
                },
                codeTypeList: [
                    {
                        value: 'Alphanumeric',
                        label: 'Alphanumeric'
                    },
                    {
                        value: 'Apha',
                        label: 'Apha'
                    },
                    {
                        value: 'Numeric',
                        label: 'Numeric'
                    }
                ],
                firstClassifyList: [],
                secondClassifyList: []
            }
        },
        created() {
            this.classifyList.forEach(r => {
                this.firstClassifyList.push({
                    value: r.name,
                    label: r.name
                })
            })
        },
        computed: {
            ...mapState([`codingList`]),
        },
        methods: {
            ...mapMutations([`CODING_LIST`]),
            addOrder() {
                this.secondClassifyList = []
                this.createInfo = {
                    show: true,
                    type: 0, //0 新建 1 编辑
                    title: `Create Code`,
                    codingName: ``,
                    firstClassify: ``,
                    secondClassify: ``,
                    codingType: ``,
                    codingDes: ``,
                    codingLength: ``,
                    codingRemarks: ``
                }
            },
            batchDeletion() {

            }, //批量删除
            onClose() {
                this.secondClassifyList = []
                this.filterData = {
                    codingName: ``,
                    codingType: ``,
                    firstClassify: ``,
                    secondClassify: ``
                }
            },
            filterBtn() {

            }, //查询
            resultFn() {
                this.secondClassifyList = []
                this.filterData = {
                    codingName: ``,
                    codingType: ``,
                    firstClassify: ``,
                    secondClassify: ``
                }
            },
            firstOnChange(id) {
                this.secondClassifyList = []
                this.classifyList.filter(r => r.name === id)[0].children.forEach(f => {
                    this.secondClassifyList.push({
                        value: f.name,
                        label: f.name
                    })
                })
            },
            firstOnChangeAdd(id) {
                this.secondClassifyList = []
                this.classifyList.filter(r => r.name === id)[0].children.forEach(f => {
                    this.secondClassifyList.push({
                        value: f.name,
                        label: f.name
                    })
                })
            },
            addSubmit() {
                console.log(this.createInfo)
                const sentData = JSON.parse(JSON.stringify(this.createInfo))
                delete sentData.show
                delete sentData.title
                console.log(sentData);
                if (sentData.codingDes !== `` && sentData.codingLength !== `` && sentData.codingName !== `` && sentData.codingRemarks !== `` && sentData.codingType !== `` && sentData.firstClassify !== `` && sentData.secondClassify !== ``) {
                    const newList = JSON.parse(JSON.stringify(this.codingList))
                    if (this.createInfo.type === 0) {
                        newList.push({
                            ...sentData,
                            createDate: this.conversionTime(+new Date())(`yyyy/MM/dd`),
                            createPeople: `admin`,
                        })
                        this.CODING_LIST(newList)
                        this.$Message.success(`新建成功！`)
                    } else {
                        newList[sentData.index] = {
                            ...sentData,
                            createDate: this.conversionTime(+new Date())(`yyyy/MM/dd`),
                            createPeople: `admin`,
                        }
                        this.CODING_LIST(newList)
                        this.$Message.success(`修改成功！`)
                    }
                    this.cancle()
                } else {
                    this.$Message.warning(`请填写内容！`)
                }
            },
            cancle() {
                this.secondClassifyList = []
                this.filterData = {
                    codingName: ``,
                    codingType: ``,
                    firstClassify: ``,
                    secondClassify: ``
                }
                this.createInfo.show = false
            }
        }
    }
</script>

<style lang="less">
    .codingManagement {
        width: 100%;
        height: 100%;
        padding: 20px;
        > header {
            width: 100%;
            margin: 0 auto;
            border: 1px solid #e5e6e8;
            border-radius: 5px;
            box-shadow: 0 0 3px #dddddd;
            background: #ffffff;
            padding: 10px 20px;
            margin-bottom: 10px;
            font-size: 14px;
            > .filter {
                display: flex;
                .content {
                    flex: 0.8;
                    padding: 0 10px;

                    > label {
                        width: 50%;
                        display: inline-block;
                        margin: 10px 0;
                        font-size: 12px;
                        .ivu-input-wrapper, .ivu-select {
                            width: 60%;
                        }
                    }
                }
                .btn {
                    flex: 0.2;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    > button {
                        margin: 5px 0;
                    }
                }
            }
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
                padding-left: 20px;
                padding-top: 20px;
                .ivu-btn-large {
                    padding: 6px 10px;
                    margin: 0 10px;
                }
            }
            > section {
                display: flex;
                flex-direction: column;
                padding: 10px 20px 30px;
            }
        }
    }

    .drawerContent {
        > div {
            label {
                width: 50%;
                display: inline-block;
                margin: 10px 0;
                .ivu-input-wrapper, .ivu-select {
                    width: 60%;
                }
                textarea.ivu-input {
                     font-size: 12px;
                }
                > span {
                    display: inline-block;
                    width: 76px;
                    text-align: left;
                }
            }
            .last {
                width: 90%;
            }
        }
    }

    .drawerSubmit {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        > button {
            margin: 0 10px;
        }
    }
</style>
