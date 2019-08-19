<template>
    <div class="projectManagement">
        <header>
            项目信息
        </header>
        <section>
            <header>
                <Button size="large" type="primary" @click="btnFn(type)">{{type!==1?'修改':'保存'}}</Button>
            </header>
            <section>
                <label for="name">
                    <span>项目名称:</span>
                    <Input id="name" :disabled="type===0" v-model="projectManagement.name" placeholder="请输入项目名称"
                           style="width: 450px"/>
                </label>
                <label for="number">
                    <span>项目编码:</span>
                    <Input :disabled="type===0" id="number" v-model="projectManagement.number" placeholder="请输入项目编码"
                           style="width: 450px"/>

                </label>
                <label for="person">
                    <span>创建人:</span>
                    <Input :disabled="type===0" id="person" v-model="projectManagement.person" placeholder="请输入创建人"
                           style="width: 450px"/>

                </label>
                <label for="createTime">
                    <span>创建时间:</span>
                    <DatePicker :disabled="type===0" id="createTime" type="date" v-model="projectManagement.createTime"
                                placeholder="请选择创建时间"
                                style="width: 450px"></DatePicker>

                </label>
                <label>
                    <span>进度:</span>
                    <Progress :disabled="type===0" :percent="45" status="active"/>
                </label>
                <label>
                    <span>位置:</span>
                    <Select :disabled="type===0" v-model="projectManagement.tim" style="width:450px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </label>
                <label for="des">
                    <span>项目描述:</span>
                    <Input :disabled="type===0" id="des" type="textarea" v-model="projectManagement.des"
                           :rows="4"
                           placeholder="请输入项目描述"
                           style="width: 450px"/>
                </label>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        name: "projectManagement",
        data() {
            return {
                type: 0, //0 详情 1 修改
                projectManagement: {
                    name: `GJB ILSS`,
                    number: `SDDS454824sdw`,
                    des: `描述文本`,
                    tim: `A 地区`,
                    createTime: new Date(),
                    person: `admin`,
                },
                cityList: [
                    {
                        value: 'A 地区',
                        label: 'A 地区'
                    },
                    {
                        value: 'B 地区',
                        label: 'B 地区'
                    },
                    {
                        value: 'C 地区',
                        label: 'C 地区'
                    }
                ]
            }
        },
        methods: {
            btnFn(type) {
                this.type = type === 0 ? 1 : 0
            }
        }
    }
</script>

<style lang="less">
    .projectManagement {
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
                label {
                    margin: 15px 50px 0;
                    display: flex;
                    > span {
                        display: inline-block;
                        width: 90px;
                        height: 36px;
                        line-height: 36px;
                        text-align: right;
                        margin-right: 10px;
                        vertical-align: top;
                        font-size: 14px;
                    }
                    .ivu-progress {
                        width: 450px;
                        margin-left: 5px;
                        height: 36px;
                        line-height: 36px;
                    }
                    .ivu-input {
                        height: 36px;
                    }
                    textarea.ivu-input {
                        height: auto;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
