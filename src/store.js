import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tableData: null,
        openNames: [],
        activeName: ``,
        oderList: [
            {
                applePeople: `admin`,
                firstNav: "SUPPLY PLAN",
                oderChangeList: [{
                    content: {
                        name: "COSMAL(||)-定额零件表(APL) (SP5)",
                        tableId: "LSA-34",
                        list: []
                    },
                    createTime: 1560933129154,
                    formID: "LSA-34-2",
                }],
                groupName: "XXX项目",
                oderName: "1",
                secondNav: "LSA-34",
                secondNavName: "定额零件表(APL)(SP5) ",
                createTime: 1560932032349,
                tableID: ""
            }
        ],
        oderDetail: null,
        taskList: [
            {
                taskName: 'XXXXX 单',
                taskID: 'XXXXX456',
                createPeople: `admin`,
                taskType: `类型1`,
                taskDes: `wqeqweqwewe`,
                queryTime: `2019/10/12-2020/4/5`,
                taskPriority: `S级`,
            }
        ],
        taskDetail: null,
        configUrl: null,
        codingList: [
            {
                codingName: 'Serial Number',
                firstClassify: 'Power System',
                secondClassify: `Sea Water Pump`,
                codingType: `Alphanumeric`,
                codingDes: `电源组件信号`,
                codingLength: 50,
                codingRemarks: ``,
                createDate: `2019/10/12`,
                createPeople: `admin`,
            },
            {
                codingName: 'EST_RET_CAGE_CODE',
                firstClassify: 'Support System',
                secondClassify: `Support Console`,
                codingType: `Apha`,
                codingDes: `炮塔动力运动识别码`,
                codingLength: 20,
                codingRemarks: ``,
                createDate: `2019/10/02`,
                createPeople: `admin`,
            }
        ]

    },
    mutations: {
        TABLE_DATA(state, obj) {
            state.tableData = obj
        }, //获取table数据
        CHANGE_OPEN_NAME(state, obj) {
            state.openNames = obj
        }, //
        CHANGE_ACTIVE_NAME(state, obj) {
            state.activeName = obj
        },
        ODER_LIST(state, obj) {
            state.oderList = obj
        },
        ODER_DETAIL(state, obj) {
            state.oderDetail = obj
        },
        TASK_LIST(state, obj) {
            state.taskList = obj
        },
        TASK_DETAIL(state, obj) {
            state.taskDetail = obj
        },
        CONFIG_URL(state, obj) {
            state.configUrl = obj
        },
        CODING_LIST(state, list) {
            state.codingList = list
        }
    },
    actions: {}
})
