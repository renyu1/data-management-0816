<template>
    <div class="gjbHome" v-if="flag">
        <div class="top">
            <ul>
                <li @click="goPage(`/gjbImg/LSA-664`)">
                    <p>
                        <span class="topIcon1"></span>
                    </p>
                    <h3>交互式电子技术手册</h3>
                    <div>
                        <span>手册数量：56</span>
                        <span>手册种类：12</span>
                    </div>

                </li>
                <li @click="goPage(`/gjbImg/LSA-660`)">
                    <p>
                        <span class="topIcon2"></span>
                    </p>
                    <h3>器材设备管理系统</h3>
                    <div>
                        <span>手册数量：56</span>
                        <span>手册种类：12</span>
                    </div>
                </li>

                <li @click="goPage(`/gjbImg/LSA-665`)">
                    <p>
                        <span class="topIcon3"></span>
                    </p>
                    <h3>LMS学习管理系统</h3>
                    <div>
                        <span>手册数量：56</span>
                        <span>手册种类：12</span>
                    </div>
                </li>
            </ul>
            <div id="lineECharts">
                <EChart :chartData="lineECharts"></EChart>
            </div>
        </div>
        <div class="bottom">
            <div id="barECharts">
                <EChart :chartData="barECharts"></EChart>
            </div>
            <div id="pieECharts">
                <EChart :chartData="pieECharts"></EChart>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import EChart from '../../components/chart'
    import {mapMutations} from 'vuex'

    var datas = [
        {
            'name': 'A类',
            'value': 675
        }, {
            'name': 'B类',
            'value': 1397
        }, {
            'name': 'C类',
            'value': 318
        }, {
            'name': 'C类',
            'value': 101
        }, {
            'name': 'D类',
            'value': 110
        }, {
            'name': 'E类',
            'value': 111
        }, {
            'name': 'F类',
            'value': 110
        }]
    var total_datas = 0;
    for (var i = 0; i < datas.length; i++) {
        total_datas += datas[i].value
    }
    export default {
        name: "gjbHome",
        data() {
            return {
                lineECharts: {
                    backgroundColor: '#ffffff',
                    title: {
                        text: '设备维修',
                        left: '20',
                        top: '10',
                        textStyle: {
                            color: '#666',
                            fontSize: 15
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        color: ["#D1D6FA", "#F19EC2", "#F9A589"],
                        data: ['设备A', '设备B', '设备C'],
                        left: 'center',
                        bottom: 'bottom'
                    },
                    grid: {
                        top: 'middle',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        height: '70%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: [100, 200, 20, 30, 60, 89],
                        axisLine: {
                            lineStyle: {
                                color: "#999"
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',

                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#DDD'
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#333"
                            },
                        },
                        nameTextStyle: {
                            color: "#999"
                        },
                        splitArea: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '设备A',
                            type: 'line',
                            data: [800, 900, 220, 130, 660, 289],
                            color: "#7A89FF",
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#D1D6FA' // 0% 处的颜色
                                        }, {
                                            offset: 0.4,
                                            color: '#7A89FF' // 100% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#7A89FF' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(209,214,250, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#76BFFF',
                                    borderWidth: 10,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                     shadowBlur: 100,*/
                                    borderColor: "#76BFFF"
                                }
                            },
                            smooth: true
                        },
                        {
                            name: '设备B',
                            type: 'line',
                            data: [123, 568, 111, 222, 123, 56],
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#FBE2ED' // 0% 处的颜色
                                        },
                                            {
                                                offset: 0.4,
                                                color: '#F19EC2' // 100% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#F19EC2' // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(251,226,237, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#E583C6',
                                    borderWidth: 10,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                     shadowBlur: 100,*/
                                    borderColor: "#E583C6"
                                }
                            },
                            smooth: true
                        },
                        {
                            name: '设备C',
                            type: 'line',
                            data: [70, 248, 25, 36, 784, 56],
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#B2E9FA' // 0% 处的颜色
                                        },
                                            {
                                                offset: 0.4,
                                                color: '#44CFF9' // 100% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#44CFF9' // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(178,233,250, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#B2E9FA',
                                    borderWidth: 10,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                     shadowBlur: 100,*/
                                    borderColor: "#B2E9FA"
                                }
                            },
                            smooth: true
                        }
                    ]
                },
                pieECharts: {
                    color: ['#A2E473', '#FFC072', '#09C7F9', '#5FECDF', '#44B1CD', '#2C81D7', '#039EAA'],
                    backgroundColor: '#ffffff',
                    title: [
                        {
                            text: '供应计划',
                            left: '20',
                            top: '10',
                            textStyle: {
                                color: '#666',
                                fontSize: 15
                            }
                        },
                        {
                            text: '总数',
                            subtext: total_datas,
                            textStyle: {
                                color: '#555555',
                                fontSize: 30,
                                align: 'center'
                            },
                            subtextStyle: {
                                fontSize: 30,
                                color: ['#ff9d19']
                            },
                            x: 'center',
                            y: 'center',
                        },
                    ],
                    grid: {
                        bottom: '20px',
                        left: '20px',
                        right: '20px',
                        top: '20px'
                    },
                    legend: {
                        bottom: "10px",
                        textStyle: {
                            color: '#555555',
                            fontSize: 16,

                        },
                        icon: 'roundRect',
                        data: datas,
                    },
                    tooltip: {
                        formatter: "{a}：<br/>{b}: {c}件"
                    },
                    series: [
                        // 主要展示层的
                        {
                            radius: ['30%', '61%'],
                            center: ['50%', '50%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: true,
                                    formatter: "{c}件",
                                    textStyle: {
                                        fontSize: 16,

                                    },
                                    position: 'outside'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 30,
                                    length2: 55
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            name: "信息统计",
                            data: datas,

                        },
                        // 边框的设置
                        {
                            radius: ['30%', '34%'],
                            center: ['50%', '50%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            animation: false,
                            tooltip: {
                                show: false
                            },
                            data: [{
                                value: 1,
                                itemStyle: {
                                    color: "rgba(250,250,250,0.3)",
                                },
                            }],
                        }, {
                            name: '外边框',
                            type: 'pie',
                            clockWise: false, //顺时加载
                            hoverAnimation: false, //鼠标移入变大
                            center: ['50%', '50%'],
                            radius: ['65%', '65%'],
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 9,
                                name: '',
                                itemStyle: {
                                    normal: {
                                        borderWidth: 15,
                                        borderColor: 'rgba(170,242,255,0.6)'
                                    }
                                }
                            }]
                        },
                    ]
                },
                barECharts: {
                    title: {
                        text: '库存管理',
                        left: '20',
                        top: '10',
                        textStyle: {
                            color: '#666',
                            fontSize: 15
                        }
                    },
                    backgroundColor: '#ffffff',
                    xAxis: {
                        data: ['A类', 'B类', 'C类', 'D类', 'E类', 'F类', 'G类', 'H类'],
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                //debugger
                                var ret = ""; //拼接加\n返回的类目项
                                var maxLength = 2; //每项显示文字个数
                                var valLength = value.length; //X轴类目项的文字个数
                                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                if (rowN > 1) //如果类目项的文字大于3,
                                {
                                    for (var i = 0; i < rowN; i++) {
                                        var temp = ""; //每次截取的字符串
                                        var start = i * maxLength; //开始截取的位置
                                        var end = start + maxLength; //结束截取的位置
                                        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                        temp = value.substring(start, end) + "\n";
                                        ret += temp; //凭借最终的字符串
                                    }
                                    return ret;
                                } else {
                                    return value;
                                }
                            },
                            textStyle: {
                                color: '#4f9ccf'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },

                        /*z: 10*/
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#4f9ccf'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#013168'],
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    series: [{ // For shadow
                        type: 'bar',

                        itemStyle: {
                            normal: {
                                color: 'rgba(224,237,237,0.3)'
                            }
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: [120, 120, 120, 120, 120, 120, 120, 120],
                        animation: false
                    },
                        {
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,//是否在柱状顶部显示数值
                                    position: "top",
                                    distance: 12,
                                    formatter: function (params) {
                                        return params.data.value;
                                    },
                                    textStyle: {
                                        color: "#33C0F8",
                                        fontSize: 12
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(51,192,248,0.8)'
                                    }, {
                                        offset: 1,
                                        color: '#33C0F8'
                                    }]),

                                },

                            },
                            data: [65, 104, 83, 83, 83, 78, 67, 83]
                        }
                    ]
                },
                flag: false
            }
        },
        mounted() {
            this.flag = true
        },
        components: {
            EChart
        },
        methods: {
            ...mapMutations([`CHANGE_OPEN_NAME`, `CHANGE_ACTIVE_NAME`]),
            goPage(str) {
                switch (str) {
                    case `/gjbImg/LSA-664`:
                        this.setSession(`munNum`, [10])
                        this.setSession(`munName`, `LSA-664`)
                        this.CHANGE_OPEN_NAME([10])
                        this.CHANGE_ACTIVE_NAME(`LSA-664`)
                        break
                    case `/gjbImg/LSA-660`:
                        this.setSession(`munNum`, [9])
                        this.setSession(`munName`, `LSA-660`)
                        this.CHANGE_OPEN_NAME([9])
                        this.CHANGE_ACTIVE_NAME(`LSA-660`)
                        break
                    case `/gjbImg/LSA-665`:
                        this.setSession(`munNum`, [11])
                        this.setSession(`munName`, `LSA-665`)
                        this.CHANGE_OPEN_NAME([11])
                        this.CHANGE_ACTIVE_NAME(`LSA-665`)
                        break
                    default:
                        break
                }
                this.$router.push(str)
            }
        }
    }
</script>

<style lang="less" scoped>
    .gjbHome {
        width: 100%;
        height: 100%;
        /*background: #EDF4FC;*/
        overflow-y: hidden;
        > .top {
            width: 98%;
            height: 40%;
            display: flex;
            margin: 20px;
            margin-top: 7px;
            > ul {
                flex: 0.6;
                display: flex;
                justify-content: center;
                align-items: center;
                > li {
                    background: #fff;
                    flex: 1;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    margin-right: 20px;
                    -moz-box-shadow: 0 0 3px 0 #ddd;
                    -webkit-box-shadow: 0 0 3px 0 #ddd;
                    box-shadow: 0 0 3px 0 #ddd;
                    border-radius: 10px;
                    > p {
                        flex: 1;
                        height: 150px;
                        text-align: center;
                        padding-top: 50px;
                        > span {
                            display: inline-block;
                            width: 99px;
                            height: 99px;

                        }
                        > .topIcon1 {
                            background: url(../../assets/img/IETM.png) no-repeat;
                        }
                        > .topIcon2 {
                            background: url(../../assets/img/eqpt.png) no-repeat;
                        }
                        > .topIcon3 {
                            background: url(../../assets/img/LMS.png) no-repeat;
                        }
                    }
                    > h3 {
                        flex: 1;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;

                    }
                    > div {
                        height: calc(100% - 200px);
                        > span {
                            display: block;
                            height: 30px;
                            line-height: 30px;
                            color: #999;
                            width: 100%;
                            text-align: center;
                            font-size: 14px;
                        }

                    }
                }

            }
            > #lineECharts {
                flex: 0.4;
                height: 100%;
                background: #fff;
                -moz-box-shadow: 0 0 3px 0 #ddd;
                -webkit-box-shadow: 0 0 3px 0 #ddd;
                box-shadow: 0 0 3px 0 #ddd;
                border-radius: 10px;
                padding: 5px;
                > h3 {
                    padding: 10px;
                }
            }
        }
        > .bottom {
            width: 98%;
            height: 54%;
            overflow: hidden;
            margin: 20px;
            margin-top: 0;
            div {
                /*width: 50%;*/
                height: 100%;
            }
            #barECharts {
                float: left;
                width: 49%;
                background: #fff;
                margin-right: 20px;
                -moz-box-shadow: 0 0 3px 0 #ddd;
                -webkit-box-shadow: 0 0 3px 0 #ddd;
                box-shadow: 0 0 3px 0 #ddd;
                border-radius: 10px;
                padding: 5px;
                > h3 {
                    padding: 10px;
                }
            }
            #pieECharts {
                width: 49%;
                float: right;
                background: #fff;
                -moz-box-shadow: 0 0 3px 0 #ddd;
                -webkit-box-shadow: 0 0 3px 0 #ddd;
                box-shadow: 0 0 3px 0 #ddd;
                border-radius: 10px;
                padding: 5px;
                > h3 {
                    padding: 10px;
                }
            }
        }

    }
</style>