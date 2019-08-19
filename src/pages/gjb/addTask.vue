<template>
    <div class="addTask">
        <header>
            {{ taskDetail?'Task Detail':'Create Task'}}
            <Button type="primary" @click="goBack">返回</Button>
        </header>
        <section>
            <div class="top">
                <label for="taskName">
                    <i>*</i>Task Name：
                    <Input :disabled="taskDetail!==null" id="taskName" v-model="taskInfo.taskName"
                           placeholder="请输入任务名称"/>
                </label>
                <label for="taskID">
                    <i>*</i>Task ID：
                    <Input :disabled="taskDetail!==null" id="taskID" v-model="taskInfo.taskID" placeholder="请输入任务ID"/>
                </label>
                <label for="createPeople">
                    <i>*</i>Creator：
                    <Input :disabled="true" id="createPeople" v-model="taskInfo.createPeople"
                           placeholder="请输入创建人"/>
                </label>
            </div>
            <div class="middle">
                <label>
                    <i>*</i>Task Type：
                    <Select :disabled="taskDetail!==null" v-model="taskInfo.taskType" style="width:200px">
                        <Option v-for="item in taskTypeList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </label>
                <label>
                    <i>*</i>Task Priority：
                    <Select :disabled="taskDetail!==null" v-model="taskInfo.taskPriority" style="width:200px">
                        <Option v-for="item in taskPriorityList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </label>
            </div>
            <div class="bottom">
                <label>
                    <i>*</i>Start-End：
                    <DatePicker :disabled="taskDetail!==null" format="yyyy-MM-dd" v-model="taskInfo.queryTime"
                                type="datetimerange"
                                placeholder="选择起止时间"
                                style="width: 200px"></DatePicker>
                </label>
            </div>
            <div class="des">
                <label>
                    <i>*</i>Task Detail：
                    <Input :disabled="taskDetail!==null" type="textarea" v-model="taskInfo.taskDes"
                           :rows="4"
                           placeholder="请输入任务名称"/>
                </label>
            </div>
            <div class="btn" v-if="!taskDetail">
                <Button type="primary" @click="submit">提交(submit)</Button>
                <Button @click="goBack">取消(cancel)</Button>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "addTask",
        data() {
            return {
                taskInfo: {
                    taskName: '',
                    taskID: '',
                    createPeople: `admin`,
                    taskType: `type1`,
                    taskPriority: `SS级`,
                    taskDes: ``,
                    queryTime: ``
                },
                taskTypeList: [
                    {
                        value: 'type1',
                        label: 'type1'
                    },
                    {
                        value: 'type2',
                        label: 'type2'
                    },
                    {
                        value: 'type3',
                        label: 'type3'
                    },
                    {
                        value: 'type4',
                        label: 'type4'
                    }
                ],
                taskPriorityList: [
                    {
                        value: 'SS Level',
                        label: 'SS Level'
                    },
                    {
                        value: 'S Level',
                        label: 'S Level'
                    },
                    {
                        value: 'A Level',
                        label: 'A Level'
                    }
                ]

            }
        },
        created() {
            if (this.taskDetail) {
                const obj = Object.assign({}, this.taskDetail)
                const time = this.taskDetail.queryTime.split(`-`)
                obj.queryTime = []
                obj.queryTime.push(new Date(time[0]))
                obj.queryTime.push(new Date(time[1]))
                this.taskInfo = obj
            }
        },
        computed: {
            ...mapState([`taskDetail`, `taskList`]),
        },
        methods: {
            ...mapMutations([`TASK_LIST`]),
            goBack() {
                this.$router.push(`taskManagement`)
            },
            submit() {
                console.log(this.taskInfo);
                if (!this.taskInfo.taskName) {
                    this.$Message.warning(`请输入任务名称`)
                } else if (!this.taskInfo.taskID) {
                    this.$Message.warning(`请输入任务ID`)
                } else if (!this.taskInfo.queryTime[0] || !this.taskInfo.queryTime[1]) {
                    this.$Message.warning(`请选择起止时间`)
                } else if (!this.taskInfo.taskDes) {
                    this.$Message.warning(`请输入任务描述`)
                } else {
                    const obj = Object.assign({}, this.taskInfo)
                    const queryTime = this.conversionTime(+new Date(this.taskInfo.queryTime[0]))(`yyyy/MM/dd`) + `-` + this.conversionTime(+new Date(this.taskInfo.queryTime[1]))(`yyyy/MM/dd`)
                    obj.queryTime = queryTime
                    const arr = this.taskList
                    arr.push(obj)
                    this.TASK_LIST(arr)
                    this.$router.push(`taskManagement`)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .addTask {
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
            padding: 20px;
            > div {
                display: flex;
                align-items: center;
                margin: 15px 0;
                label {
                    flex: 0.33;
                    .ivu-input-wrapper {
                        width: 66%;
                    }
                    i {
                        color: red;
                        margin-right: 2px;
                    }
                }
            }
            > .btn {
                margin-top: 40px;
                text-align: center;
                display: flex;
                justify-content: center;
                button {
                    margin: 0 10px;
                }
            }
        }
    }
</style>
