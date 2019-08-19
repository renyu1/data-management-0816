<template>
    <div class="taskManagement">
        <header>
            任务管理(Task management)
        </header>
        <section>
            <header>
                <Button size="large" type="primary" @click="taskAdd">新建(Create)</Button>
            </header>
            <section>
                <Table border :columns="columns7" :data="taskList"></Table>
            </section>
        </section>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "taskManagement",
        data() {
            return {
                columns7: [
                    {
                        title: '序号(NO.)',
                        type: `index`
                    },
                    {
                        title: '任务名称(Task Name)',
                        key: 'taskName'
                    },
                    {
                        title: '任务ID(Task ID)',
                        key: 'taskID'
                    },
                    {
                        title: '创建人(Creator)',
                        key: 'createPeople'
                    },
                    {
                        title: '任务类型(Task Type)',
                        key: 'taskType'
                    },
                    {
                        title: '任务优先级(Priority)',
                        key: 'taskPriority'
                    },
                    {
                        title: '任务描述(Description)',
                        key: 'taskDes'
                    },
                    {
                        title: '任务时限(Time Limit)',
                        key: 'queryTime'
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
                                            this.$router.push(`/addTask`)
                                            this.TASK_DETAIL(params.row)
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
            ...mapState([`taskList`]),
        },
        created() {
            console.log(this.taskList)
        },
        methods: {
            ...mapMutations([`TASK_DETAIL`]),
            taskAdd() {
                this.TASK_DETAIL(null)
                this.$router.push(`/addTask`)
            }
        }
    }
</script>

<style lang="less" scoped>
    .taskManagement {
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
