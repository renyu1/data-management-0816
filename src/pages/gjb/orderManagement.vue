<template>
    <div class="orderManagement">
        <header>
            订单管理(OrderManagement)
        </header>
        <section>
            <header>
                <Button size="large" type="primary" @click="addOrder">新建(Create)</Button>
            </header>
            <section>
                <Table border :columns="columns7" :data="oderList"></Table>
            </section>
        </section>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "orderManagement",
        data() {
            return {
                columns7: [
                    {
                        title: '序号(NO.)',
                        type: `index`
                    },
                    {
                        title: '订单名称(Order Name)',
                        key: 'oderName'
                    },
                    {
                        title: '申请人(Applicant)',
                        key: 'applePeople'
                    },
                    {
                        title: '创建时间(Create Time)',
                        key: 'createTime',
                        render: (h, p) => {
                            return h(`span`, this.conversionTime(new Date(p.row.createTime))(`yyyy-MM-dd`))
                        }
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
                                            this.$router.push(`/addOrder`)
                                            this.ODER_DETAIL(params.row)
                                        }
                                    }
                                }, '查看(View)')
                            ]);
                        }
                    }
                ]
            }
        },
        computed: {
            ...mapState([`oderList`]),
        },
        methods: {
            ...mapMutations([`ODER_DETAIL`]),
            addOrder() {
                this.ODER_DETAIL(null)
                this.$router.push(`/addOrder`)
            }
        }
    }
</script>

<style lang="less" scoped>
    .orderManagement {
        width: 100%;
        height: 100%;
        padding: 20px;
        > header {
            height: 40px;
            line-height: 40px;
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
                text-align: right;
                padding-right: 60px;
                padding-top: 20px;
                .ivu-btn-large {
                    padding: 6px 30px;
                }
            }
            > section {
                display: flex;
                flex-direction: column;
                padding: 10px 20px 30px;
            }
        }
    }
</style>
