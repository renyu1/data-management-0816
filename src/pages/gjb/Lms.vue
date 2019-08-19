<template>
    <div class="gjbEstablish">
        <div class="divOne">
            <div class="gjbCreateCont">
                <span class="spanOne"></span><span class="spanTwo">My Courseware</span>
            </div>
            <div class="borderBox">
                <ul class="borderUl">
                    <li>
                        <h2>数据获取和预处理：Flume</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>数据库系统原理</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li class="check">
                        <h2>数据获取和预处理：Sqoop</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>SPSS数据处理统计分析</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>聚类和集成算法&nbsp;(第10课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>SPSS数据处理统计分析</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>聚类和集成算法&nbsp;(第9课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>聚类和集成算法&nbsp;(第8课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>聚类和集成算法&nbsp;(第7课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>聚类和集成算法&nbsp;(第6课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>聚类和集成算法&nbsp;(第5课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>神经网络模型(第七课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>决策树和随即森林(第四课)</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>R语言数据分析</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>图表可视化</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                    <li>
                        <h2>爬虫入门</h2>
                        <p>已学习&nbsp;<span>23.5</span>&nbsp;小时</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="divTwo">
            <div class="gjbCreateContTwo">
                <span class="spanLastone"></span><span class="spanLastTwo">My exam</span>
            </div>
            <div class="borderShow">
                <ul class="borderPink">
                    <li class="first">
                        <h3>2019年上半年系统分析师考试</h3>
                        <p>考试时间:2019-05-29</p>
                        <div class="errColor firstColor">错题卷</div>
                        <div class="three">
                            <span>86</span>
                        </div>
                    </li>
                    <li>
                        <h3>2018年下半年系统架构设计师考试</h3>
                        <p>考试时间:2019-05-29</p>
                        <div class="errColor">错题卷</div>
                        <div class="three">
                            <span>88</span>
                        </div>
                    </li>
                    <li>
                        <h3>2019年上半年软件设计师考试</h3>
                        <p>考试时间:2019-05-29</p>
                        <div class="errColor">错题卷</div>
                        <div class="three">
                            <span>87</span>
                        </div>
                    </li>
                    <li>
                        <h3>2019年上半年信息安全工程师考试</h3>
                        <p>考试时间:2019-05-29</p>
                        <div class="errColor">错题卷</div>
                        <div class="three">
                            <span>95</span>
                        </div>
                    </li>
                    <li>
                        <h3>2019年上半年网络工程师考试</h3>
                        <p>考试时间:2019-05-29</p>
                        <div class="errColor">错题卷</div>
                        <div class="three">
                            <span>79</span>
                        </div>
                    </li>
                    <li>
                        <h3>2016年上半年网络规划设计师考试</h3>
                        <p>考试时间:2019-05-29</p>
                        <div class="errColor">错题卷</div>
                        <div class="three">
                            <span>88</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Lms"
    }
</script>

<style scoped lang="less">
    .gjbEstablish {
        width: 98%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        > .divOne {
            background: #fff;
            padding: 10px 0 20px 0;
            > .gjbCreateCont {
                .spanOne {
                    border: 2px solid #69A4F6;
                    height: 8px;
                }
                .spanTwo {
                    font-weight: bold;
                    font-size: 15px;
                    margin-left: 10px;
                }
            }
            > .borderBox {
                height: 100%;
                > .borderUl {
                    width: 100%;
                    height: 100%;
                    > li {
                        background-image: url(../../assets/img/CoursewareBJ.png);
                        float: left;
                        margin-left: 13px;
                        width: 134px;
                        height: 157px;
                        margin-top: 20px;
                        > h2 {
                            width: 120px;
                            height: 60px;
                            margin: 0 auto;
                            margin-top: 15px;
                            color: cornflowerblue;
                        }
                        > p {
                            width: 120px;
                            margin: 0 auto;
                            margin-top: 50px;
                            color: gray;
                            > span {
                                color: cornflowerblue;
                            }
                        }
                    }
                    > .check {
                        background-image: url(../../assets/img/CoursewareBJChange.png) !important;
                        > h2 {
                            color: snow;
                        }
                        >
                        p {
                            color: gainsboro;
                            span {
                                color: snow;
                            }
                        }
                    }
                }
            }
        }
        > .divTwo {
            background: #fff;
            padding: 10px 0 20px 0;
            margin-top: 20px;
            > .gjbCreateContTwo {
                .spanLastone {
                    border: 2px solid palevioletred;
                    height: 8px;
                }
                .spanLastTwo {
                    font-weight: bold;
                    font-size: 15px;
                    margin-left: 10px;
                }
            }
            > .borderShow {
                > .borderPink {

                    > li {
                        position: relative;
                        width: 150px;
                        height: 190px;
                        float: left;
                        margin-left: 13px;
                        margin-top: 10px;
                        background: #F2F2F2;
                        padding: 10px;
                        &:nth-child(1) {
                            background: #fff;
                        }
                        > .errColor {
                            margin-left: 15px;
                            margin-top: 5px;
                            color: gray;
                        }
                        > h3 {
                            width: 128px;
                            margin: 0 auto;
                            font-weight: bold;
                        }
                        > p {
                            width: 128px;
                            margin: 0 auto;
                            margin-top: 86px;
                            color: gray;
                        }
                        > .firstColor {
                            width: 50px;
                            text-align: center;
                            border-radius: 3px;
                            color: #D37F83;
                            background-color: #FDD6D6;;
                        }

                        > .three {
                            width: 0;
                            height: 0;
                            border-width: 0px 0px 60px 60px;
                            border-style: none solid solid;
                            border-color: transparent transparent #FD6C6E;
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            text-align: center;
                            line-height: 50px;
                            > span {
                                position: absolute;
                                top: 17px;
                                right: 3px;
                                font-size: 20px;
                                color: white;
                            }
                        }
                    }
                    > .first {
                        border: 2px solid #FD6C6E;
                        > .errColor {
                            margin-left: 15px;
                            margin-top: 5px;
                            color: #D37F83;
                        }
                    }
                }
            }
        }

    }

</style>
