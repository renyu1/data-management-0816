<template>
    <div class="gjbEstablish" v-if="flag">
        <div class="goBack">
            <Button @click="goBack">返回</Button>
        </div>
        <div class="gjbCreateCont" v-if="tabChangeData.list.length>0">
            <h5>表名: {{tabChangeData.name}}</h5>
            <div class="tableCont" v-for="(item,index) in tabChangeData.list" :key="index">
                <!--表单名字:<Input class="tableName" v-model="item.tableName" placeholder="请输入表单名字(选填)"/>-->
                <Table border :columns="item.tableHeader" :data="item.tableBody"></Table>
                <div v-if="item.tableInfo" class="tableInfo">{{item.tableInfo}}</div>
                <div class="addRow" v-if="!item.addRowFlag" @click="addRow(index)">
                    添加
                </div>
            </div>
        </div>
        <div class="submit">
            <Button size="large" type="primary" @click="submit">提交</Button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getTableContent, sentTableContent} from '../../ajax/ajax'

    export default {
        name: `gjbCreate`,
        data() {
            return {
                tableID: ``,
                addRowData: null,
                tableDataInfo: null,
                flag: true
            }
        },
        async created() {
            this.tableID = this.$route.params.tableID
            if (!this.tableData && this.tableID) {
                await this.getTableContentReq()
            }
            if (this.tableData) {
                this.upNewData()
            }
        },
        computed: {
            ...mapState([`tableData`]),
            tabChangeData() {
                if (this.tableDataInfo && this.tableDataInfo.list.length > 0) {
                    return this.tableDataInfo
                } else {
                    return {
                        name: ``,
                        tableId: ``,
                        list: []
                    }
                }
            }
        },
        methods: {
            ...mapMutations([`TABLE_DATA`]),
            goBack() {
                this.$router.push(`/gjbList/${this.tableID}`)
            },
            upNewData() {
                const obj = JSON.parse(JSON.stringify(this.tableData))
                let objTable = {
                    name: obj.tableList[0].content.name,
                    tableId: this.tableID,
                    list: []
                }
                obj.tableList[0].content.list.forEach((r, i) => {
                    const tableBodySome = {}
                    const tableBody = []
                    const tableHeader = r.tableHeader
                    tableHeader.forEach(h => {
                        h.xIndex = i
                        h.render = (h, p) => {
                            return h(`input`, {
                                props: {
                                    type: `text`,
                                },
                                on: {
                                    input: (event) => {
                                        this.tableDataInfo.list[p.column.xIndex].tableBody[p.index][p.column.key] = event.target.value;
                                    }
                                }
                            })
                        }
                    })
                    Object.keys(r.tableBody[0]).forEach(n => {
                        tableBodySome[n] = ``
                    })
                    this.addRowData = tableBodySome
                    tableBody.push(tableBodySome)
                    const objData = {
                        tableName: ``,
                        tableHeader: tableHeader,
                        tableBody: tableBody,
                        tableInfo: ``
                    }
                    if (r.addRowFlag) {
                        objData.addRowFlag = r.addRowFlag
                    }
                    if (!r.addRowFlag) {
                        objData.tableHeader.push({
                            title: '操作',
                            key: 'action',
                            fixed: 'right',
                            width: 80,
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: `error`,
                                            size: `small`,
                                            style: `margin-right: 5px`
                                        },
                                        class: `delBtn`,
                                        on: {
                                            click: () => {
                                                if (this.tableDataInfo.list[i].tableBody.length <= 1) {
                                                    this.$Message.warning(`不能删除最后一行！`)
                                                } else {
                                                    this.del(i, params)
                                                }
                                            }
                                        }
                                    }, `删除`)
                                ]);
                            }
                        })

                    }
                    objTable.list.push(objData)
                })
                this.tableDataInfo = objTable
            },
            async submit() {
                const sentData = JSON.parse(JSON.stringify(this.tableData))
                this.tableDataInfo.list.forEach(r => {
                    if (!r.addRowFlag) {
                        r.tableHeader = r.tableHeader.filter(f => f.key !== `action`)
                    }
                })
                sentData.tableList.push({
                    formID: `${this.tableID}-${sentData.tableList.length + 1}`,
                    content: JSON.parse(JSON.stringify(this.tableDataInfo)),
                    createTime: +new Date()
                })
                await sentTableContent(sentData).then(async res => {
                    if (res.succ) {
                        await this.TABLE_DATA(res.content)
                        this.$Message.success(`创建成功！`);
                        this.$router.push(`/gjbList/${this.tableID}`)
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.error(err)
                    this.$Message.success(`创建失败！`);
                })
            },
            addRow(i) {
                let addRow = JSON.parse(JSON.stringify(this.addRowData))
                Object.keys(addRow).forEach(n => {
                    addRow[n] = ``
                })
                this.tableDataInfo.list[i].tableBody.push(addRow)
            },
            async del(i, opt) {
                const obj = Object.assign({}, this.tableDataInfo.list[i])
                obj.tableBody.splice(opt.index, 1)
                this.tableDataInfo.list.splice(i, 1)
                this.tableDataInfo.list.push(obj)
                this.$set(this.tableDataInfo.list, 1, obj)
            },
            async getTableContentReq() {
                await getTableContent({tableID: this.tableID}).then(async res => {
                    if (res.succ) {
                        await this.TABLE_DATA(res.content)
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.error(err)
                    this.$Message.success(`数据获取失败！`);
                })
            } //页面刷新 获取数据
        }
    }
</script>

<style lang="less">
    .gjbEstablish {
        padding: 10px;
        > .gjbCreateCont {
            margin: 5px 0;
            padding: 10px;
            background: #fff;
            h5 {
                padding: 0 10px;
                height: 35px;
                line-height: 35px;
                margin-bottom: 10px;
                font-size: 14px;
            }
            .tableCont {
                width: 93%;
                border-radius: 3px;
                border: none;
                position: relative;
                .tableName {
                    font-size: 14px;
                    width: 200px;
                    height: 35px;
                    line-height: 35px;
                    margin: 10px 0;
                }
                .tableInfo {
                    font-size: 14px;
                    padding: 10px;
                }
                .addRow {
                    width: 60px;
                    font-size: 12px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 3px;
                    color: #fff;
                    position: absolute;
                    right: -70px;
                    bottom: 8px;
                    text-align: center;
                    cursor: pointer;
                    background: #19be6b;
                    &:hover {
                        background: #19B363;
                    }
                }
                .ivu-table {
                    th {
                        text-align: center;
                    }
                    .delBtn {
                        outline: none !important;
                        box-shadow: none !important;
                    }
                }
                .ivu-table-row {
                    td {
                        .ivu-table-cell {
                            input {
                                width: 100%;
                            }
                        }
                    }
                }
                /* .ivu-table-wrapper {
                     !*border: none;*!
                 }*/
                .ivu-table:before {
                    height: 0;
                }
                .ivu-table:after {
                    width: 0
                }
            }
            .ivu-table-wrapper {
                border-bottom: none;
                border-top: none;
            }
        }
        > .submit {
            text-align: center;
            button {
                padding: 5px 40px;
            }
        }
    }
</style>
