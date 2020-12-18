<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:290px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2020-12-17</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>成都</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:290px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:480px;">
                    <!-- 描绘柱状图 -->
                    <!-- <div style="width: 100%;height: 100%;border:1px solid rgb(180,180,180);top: 0px" id="echartss"></div> -->

                    <!-- 描绘饼状图 -->
                    <div id="chartPie" class="pie-wrap"></div>
                    <!-- <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div> -->
                    <!-- <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table> -->
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <!-- <div id="chartPie" class="pie-wrap"></div> -->
                    <!-- 描绘折线图 -->
                    <!-- <div id="chartLine" class="line-wrap"></div> -->
                    <!-- <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart> -->
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover">
                    <!-- <schart ref="line" class="schart" canvasId="line" :options="options2"></schart> -->
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import * as echarts from 'echarts';
require('echarts/theme/macarons');//引入饼状图主题
require('echarts/theme/shine');//引入折线图主题

export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            chartPie: null,
            chartLine: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.drawPieChart();
            //this.drawLineChart();
        })
    },
    // mounted: function () {
    //     // 基于准备好的dom，初始化echarts实例
    //     let myChart = echarts.init(document.getElementById('echartss'))
    //     // 绘制图表，this.echarts1_option是数据
    //     myChart.setOption(this.echarts1_option);
    // },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    echarts1_option: {
        title: {
            text: '基本信息',
            subtext: '虚假数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        color: ['rgba(31,13,230,0.95)', '#ff475d', '#49ef18', '#efeb23'],
        legend: [
            {
                data: ['学历层次', '职业技能'],
            },
            {
                top: 20,
                data: ['业绩成果', '专业经历'],
            }
    
            ],
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        show: true, readOnly: true,
                        optionToContent: function (opt) {
                            let axisData = opt.xAxis[0].data; //坐标数据
                            let series = opt.series; //折线图数据
                            let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
                            let tdBodys = ''; //数据
                            series.forEach(function (item) {
                                //组装表头
                                tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                            });
                            let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
                            for (let i = 0, l = axisData.length; i < l; i++) {
                                for (let j = 0; j < series.length; j++) {
                                    //组装表数据
                                    tdBodys += `<td>${series[j].data[i]}</td>`;
                                }
                                table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
                                tdBodys = '';
                            }
                        table += '</tbody></table>';
                        return table;
                    }
                },
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '学历层次',
                type: 'bar',
                stack: '个人信息',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
                },
                markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
                }
            },
            {
                name: '职业技能',
                type: 'bar',
                stack: '个人信息',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint: {
                data: [
                    {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                    {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name: '业绩成果',
                type: 'bar',
                stack: '个人信息',
                data: [2.0, 6.0, 7.0, 20.4, 21.7, 60.7, 135.6, 152.2, 56.7, 15.8, 7.0, 2.3],
                markPoint: {
                data: [
                    {name: '年最高', value: 152.2, xAxis: 7, yAxis: 153},
                    {name: '年最低', value: 2.0, xAxis: 1, yAxis: 2}
                ]
                },
                markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
                }
            },
            {
                name: '专业经历',
                type: 'bar',
                stack: '个人信息',
                data: [1.0, 6.9, 9.0, 36.4, 48.7, 90.7, 100.6, 122.2, 40.7, 8.8, 6.0, 2.3],
                markPoint: {
                data: [
                    {name: '年最高', value: 122.2, xAxis: 7, yAxis: 123},
                    {name: '年最低', value: 1.0, xAxis: 1, yAxis: 1}
                ]
                },
                markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
                }
            }
        ]
    },
    
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // },
        drawPieChart() {
            let mytextStyle = {
                color: "#333",                          
                fontSize: 18,                            
            };
            let mylabel = {
                show: true,
                position: "right",
                offset: [30, 40],
                formatter: '{b} : {c} ({d}%)',      
                textStyle: mytextStyle//主标题样式
            };
            this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
            this.chartPie.setOption({
            //标题组件
            title: {
                text: '库存量',//主标题文本
                //subtext: '纯属虚构',//副标题文本
                x: 'center'
            },
            //提示框组件
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",//模板变量有 `{a}`, `{b}`，`{c}`，`{d}`，`{e}`，分别表示系列名，数据名，数据值等
            },
            //图例组件
            legend: {
                data: ['零食', '家用电器', '饮品', '生活用品', '玩具'],//图例的数据数组
                left:"center",//图例组件离容器左侧的距离                        
                top:"bottom",//图例组件离容器上侧的距离                            
                orient:"horizontal", //图例列表的布局朝向                       
            },
            series: [
                {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],//饼图的半径,数组的第一项是内半径，第二项是外半径
                center: ['50%', '50%'],//饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                roseType: false,//是否展示成南丁格尔图，通过半径区分数据大小
                data: [//系列中的数据内容数组
                    {value: 1335, name: '零食'},
                    {value: 610, name: '家用电器'},
                    {value: 834, name: '饮品'},
                    {value: 1635, name: '生活用品'},
                    {value: 348, name: '玩具'}
                ],
                animationEasing: 'cubicInOut',//初始动画的缓动效果
                animationDuration: 2600,//初始动画的时长
                label: {           
                    emphasis: mylabel//高亮的扇区和标签样式
                }
                }
            ]
            });
        },
        drawLineChart() {
            this.chartLine = echarts.init(this.$el,'shine');// 基于准备好的dom，初始化echarts实例
            let option = {
                //提示框组件
                tooltip : {
                    trigger: 'axis'//触发类型,'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                },
                legend: {
                    data:['零食','家用电器','生活用品','饮品','玩具']//图例的数据数组
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',//坐标轴类型
                        boundaryGap : false,
                        axisTick: {//坐标轴刻度相关设置
                            show: false
                        },
                        data : ['周一','周二','周三','周四','周五','周六','周日']//类目数据
                    }
                ],
                yAxis : [
                    {
                        type : 'value',//坐标轴类型,`'value'` 数值轴，适用于连续数据
                        axisTick: {
                            show: false
                        },
                        name: '（人）'
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表
            this.chartLine.setOption(option);
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.pie-wrap{
    width:100%;
    height:400px;
}
.line-wrap{
    width:100%;
    height:400px;
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

</style>
