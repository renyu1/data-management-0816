<template>
    <div class="gjbList">
        <div class="opt">
            <Button size="large" type="primary" @click="createGjb">新建</Button>
        </div>
        <h4 v-if="tableData">{{tableData.tableList[0].content.name}} 总共 <span style="color: red">{{tableData.tableList.length-1}}</span>
            条</h4>
        <Table v-if="tableDataInfo" border :columns="columns" :data="tableDataInfo"></Table>
        <Modal
                v-model="modal1.show"
                :title="modal1.title"
                @on-ok="modal1.okFn"
                @on-cancel="modal1.cancelFn">
            <p>是否删除数据？</p>
        </Modal>
    </div>
</template>

<script>
    import {getTableContent, sentTableContent} from '../../ajax/ajax'
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: `gjbList`,
        data() {
            return {
                tableID: ``,
                columns: [
                    {
                        title: '序号',
                        type: `index`
                    },
                    {
                        title: '记录信息',
                        key: 'tableName',
                        render: (h, params) => {
                            return h(`span`, {}, `${params.row.tableName}-${params.index + 1}`)
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        render: (h, params) => {
                            return h(`span`, {}, this.conversionTime(params.row.createTime)(`yyyy-MM-dd :hh-mm-ss`))
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
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
                                            if (this.tableID) {
                                                this.$router.push(`/gjbDetail/${this.tableID}/${params.row.formID}`)
                                            } else {
                                                this.$Message.warning(`数据有误！`)
                                            }
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal1.index = params.index + 1
                                            this.modal1.show = true
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                modal1: {
                    show: false,
                    title: `Delete form data`,
                    index: 0,
                    okFn: async () => {
                        const tabData = JSON.parse(JSON.stringify(this.tableData))
                        tabData.tableList.splice(this.modal1.index, 1)
                        await sentTableContent(tabData).then(async res => {
                            if (res.succ) {
                                await this.TABLE_DATA(res.content)
                                this.$Message.success(`删除成功！`);
                            } else {
                                this.$Message.error(res.msg);
                            }
                        }).catch(err => {
                            console.error(err)
                            this.$Message.success(`删除失败！`);
                        })
                        this.modal1.show = false
                    },
                    cancelFn: () => {
                        this.modal1.show = false
                    }
                }
            }
        },
        async created() {
            this.tableID = this.$route.params.tableID
            if (this.tableID) {
                await this.getTableContentReq()
            }
        },
        computed: {
            ...mapState([`tableData`]),
            tableDataInfo() {
                if (this.tableData && this.tableData.tableList.length > 0) {
                    let arr = []
                    this.tableData.tableList.forEach(r => {
                        if (r.formID) {
                            arr.push({
                                formID: r.formID,
                                createTime: r.createTime,
                                tableName: r.content.name
                            })
                        }
                    })
                    return arr
                }
            }
        },
        methods: {
            ...mapMutations([`TABLE_DATA`]),
            async createGjb() {
                this.$router.push(`/gjbEstablish/${this.tableID }`)
            }, //创建。。。
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
            }
        },
        watch: {
            $route(to) {
                this.tableID = to.params.tableID
            }
        }
    }
</script>

<style lang="less" scoped>
    .gjbList {
        padding: 20px;
        h4 {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
        }
        .opt {
            text-align: right;
            padding-right: 50px;
            margin-bottom: 20px;
        }
    }
</style>
