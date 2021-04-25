<template>
    <div class="data">

        <div class="item">
            <div class="item-content" style="background: #996F65">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/1.png" alt=""></div>
                    <div class="item-text">传统技艺（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[0].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #84A790">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/2.png" alt=""></div>
                    <div class="item-text">传统美术（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[1].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #B43737">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/3.png" alt=""></div>
                    <div class="item-text" style="cursor: pointer" title="传统体育、游艺与杂技（个）">传统体育、游艺与杂技（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[2].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #AD8985">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/4.png" alt=""></div>
                    <div class="item-text">传统舞蹈（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[3].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #475281">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/5.png" alt=""></div>
                    <div class="item-text">传统戏剧（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[4].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #B23434">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/6.png" alt=""></div>
                    <div class="item-text">传统医药（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[5].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #8A302C">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/7.png" alt=""></div>
                    <div class="item-text">传统音乐（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[6].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #BDAF98">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/8.png" alt=""></div>
                    <div class="item-text">民间文学（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[7].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #929BBB">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/9.png" alt=""></div>
                    <div class="item-text">民俗（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[8].num' :duration='3000'></countTo></div>
                </div>
            </div>
            <div class="item-content" style="background: #717993">
                <div class="item-title">
                    <div class="item-icon"><img src="../assets/10.png" alt=""></div>
                    <div class="item-text">曲艺（个）</div>
                </div>
                <div class="item-number">
                    <div v-if="typeNum.length === 0" style="opacity: 0">-</div>
                    <div v-else><countTo :startVal='0' :endVal='typeNum[9].num' :duration='3000'></countTo></div>
                </div>
            </div>
        </div>

        <div class="map">
            <div id="map"></div>
        </div>

        <div class="modal">
            <el-dialog :title="provinceName" :visible.sync="dialogVisible" @close="handleClose">
                <div class="content-item">
                    <div class="content-wrapper" v-if="pieData.length >0">
                        <div class="content-head">
                            <div class="num">序号</div>
                            <div class="type">分类</div>
                            <div class="number">数量</div>
                        </div>
                        <div class="content-body">
                            <div class="content" v-for="(item, index) in pieData" :key="index">
                                <div class="num"><span class="icon" :style="{background: item.color}"></span>{{index+1}}</div>
                                <div class="type">{{item.type_name}}</div>
                                <div class="number">{{item.num}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="content-wrapper" v-if="pieData.length <=0">
                        <div class="noData">
                            <div class="item">
                                <img src="../assets/noData.png" />
                                <div class="text">暂无数据</div>
                            </div>
                        </div>
                    </div> -->
                    <div class="chart" id="chart"></div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import { Scene } from '@antv/l7';
import { CountryLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';
import { Pie } from '@antv/g2plot';
import countTo from 'vue-count-to';

    export default {
        components: { countTo },
        data() {
            return {
                typeNum: [],
                provinceNum: [],
                dialogVisible: false,
                provinceName: '',
                colorList: ['#1890FF', '#3DD4D4', '#7ADDA3', '#67E167', '#FFE600', '#FFCE0E', '#FF9457', '#FC6C87', '#F44D6B', '#F251F2'],

                //环图
				pieData: [],
				piePlot: null,
				piePlotOption: {
					padding: 5,
					angleField: 'num',
					colorField: 'type_name',
					innerRadius: 0.65,
					radius: 0.84,
                    color: ['#1890FF', '#3DD4D4', '#7ADDA3', '#67E167', '#FFE600', '#FFCE0E', '#FF9457', '#FC6C87', '#F44D6B', '#F251F2'],
					xAxis: {
						label: {
							autoRotate: false,
						},
					},
					label: false,
					legend: false,
					statistic: {
						title: {
							offsetY: 12,
							style: {
								fill: '#9A9DB1',
								fontSize: 24
							},
                            formatter: () => {
								let sum = 0
								for (let item of this.pieData) {
									sum += parseInt(item.num)
								}
                                return sum
							},
						},
						content: {
							offsetX: 40,
							offsetY: -4,
							style: {
								fill: '#9A9DB1',
								fontSize: 14,
							},
                            // formatter: (datum) => (datum ? datum.type : '个'),
                            formatter: () => {
                                if(this.pieData.length === 0){
                                    return '暂无数据'
                                } else {
                                    return '个'
                                }
							},
						},
					},
				},
            }
        },
        created () {
            this.getTypeNum();
            this.getProvinceNum();
        },
        methods: {
            showMessage(type, message) {
                this.$message({
                    type: type,
                    message: message
                });
            },
            getTypeNum() {
                this.$api.data.getTypeNum().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.typeNum = res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            getProvinceNum() {
                this.$api.data.getProvinceNum().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.provinceNum = res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            map() {
                const scene = new Scene({
                    id: 'map',
                    logoVisible: false,
                    map: new Mapbox({
                        center: [ 116.2825, 39.9 ],
                        pitch: 0,
                        style: 'blank',
                        zoom: 3,
                        minZoom: 0,
                        maxZoom: 10
                    })
                });
                const attachMapContainer = document.createElement('div');
                attachMapContainer.id = 'attach';
                attachMapContainer.style.cssText = `position: absolute;
                    height: 125px;
                    width: 95px;
                    left: 150px;
                    bottom: 20px;
                    border: 0.5px solid #000000;`;
                document.getElementById('map').parentElement.append(attachMapContainer);

                scene.on('loaded', () => {
                    const layer = new CountryLayer(scene, {
                        data: this.provinceNum,
                        joinBy: [ 'NAME_CHN', 'province_name' ],
                        depth: 1,
                        provinceStroke: '#fff',
                        // provinceStrokeWidth: 0.4,
                        chinaNationalStroke:'#ddd',
                        chinaNationalWidth: 0.5,
                        coastlineStroke:'#ddd',
                        label: {
                            enable: false
                        },
                        fill: {
                            color: {
                                field: 'num',
                                values: (num) => {
                                    if (num <= 0) {
                                        return '#B8E1FF'
                                    } else if (num > 0 && num <= 10) {
                                        return 'rgba(0,71,165,0.2)'
                                    } else if (num > 10 && num <= 50) {
                                        return 'rgba(0,71,165,0.4)'
                                    } else if (num > 50 && num <= 100) {
                                        return 'rgba(0,71,165,0.6)'
                                    } else if (num > 100 && num <= 150) {
                                        return 'rgba(0,71,165,0.8)'
                                    } else if (num > 150 && num <= 250) {
                                        return 'rgba(0,71,165,0.95)'
                                    } else if (num > 250 && num <= 500) {
                                        return 'rgba(0,71,165,1)'
                                    } else {
                                        return '#001D70'
                                    }
                                }
                            }
                        },
                        popup: {
                            enable: true,
                            Html: props => {
                                // console.log(props)
                                return `<span>${props.NAME_CHN}</span><br/><span>${props.num || "0"} 个</span>`;
                            }
                        }
                    });

                    layer.on('click', (e) => {
                        // console.log(e)
                        const provinceId = e.feature.properties.province_id
                        const province = e.feature.properties.province_name
                        // console.log(provinceId)
                        this.dialogVisible = true
                        this.provinceName = province

                        this.$api.data.getProvinceTypeNum(provinceId).then(res =>{
                            if(res.code === 1){
                                // console.log(res.data)
                                let arr = res.data;
                                arr = arr.filter((item) => { 
                                    return item.num !== 0
                                })
                                arr = arr.map((item, index) => {
                                    item.color = this.colorList[index]
                                    return item
                                })
                                this.pieData = arr
                                // console.log(this.pieData)
                                this.initPiePlot()
                            } else {
                                this.$message.error("未知错误")
                            }
                        })
                    });
                });

                // 添加附图，附图需要和主图保持一致
                const scene2 = new Scene({
                    id: 'attach',
                    logoVisible: false,
                    map: new Mapbox({
                        center: [ 113.60540108435657, 12.833692637803168 ],
                        pitch: 0,
                        style: 'blank',
                        zoom: 1.93,
                        minZoom: 0,
                        maxZoom: 3,
                        interactive: false
                    })
                });
                scene2.on('loaded', () => {
                    new CountryLayer(scene2, {
                        data: this.provinceNum,
                        joinBy: [ 'NAME_CHN', 'province_name' ],
                        provinceStroke: '#fff',
                        chinaNationalStroke:'#ccc',
                        chinaNationalWidth: 0.6,
                        coastlineStroke:'#ddd',
                        label: {
                            enable: false
                        },
                        popup: {
                            enable: false
                        },
                        autoFit: false,
                        depth: 1,
                        fill: {
                            color: {
                                field: 'num',
                                values: (num) => {
                                    if (num <= 0) {
                                        return '#B8E1FF'
                                    } else if (num > 0 && num <= 10) {
                                        return 'rgba(0,71,165,0.2)'
                                    } else if (num > 10 && num <= 50) {
                                        return 'rgba(0,71,165,0.4)'
                                    } else if (num > 50 && num <= 100) {
                                        return 'rgba(0,71,165,0.6)'
                                    } else if (num > 100 && num <= 150) {
                                        return 'rgba(0,71,165,0.8)'
                                    } else if (num > 150 && num <= 250) {
                                        return 'rgba(0,71,165,0.95)'
                                    } else if (num > 250 && num <= 500) {
                                        return 'rgba(0,71,165,1)'
                                    } else {
                                        return '#001D70'
                                    }
                                }
                            }
                        }
                    });
                });
            },
            initPiePlot() {
				this.piePlot = new Pie('chart', {
					...this.piePlotOption,
					data: this.pieData
				});
				this.piePlot.render();
			},
            handleClose() {
                this.pieData = []
                this.piePlot.destroy();
            }
        },
        watch: {
			provinceNum: {
				handler() {
					if (this.provinceNum) {
						this.$nextTick(() => {
                            this.map();
						})
					}
				},
				deep: true
			},
        } 
    }
</script>

<style lang="less" scoped>

.data{
    width: 100%;
    height: 90%;
}

.item{
    // height: 32%;
    padding: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .item-content{
        // min-width: 16.9%;
        width: 16.9%;
        padding: 8px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        margin-right: 18px;
        margin-bottom: 15px;

        &:last-child{
            margin-right: 0px;
        }

        .item-title{
            display: flex;
            flex-direction: row;
            align-items: baseline;

            .item-icon{
                width: 30px;
                height: 30px;
                margin-right: 12px;

                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .item-text{
                max-width: 145px;
                font-size: 13px;
                color: #ffffff;
                letter-spacing: 1px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .item-number{
            font-size: 15px;
            color: #ffffff;
            margin-top: 10px;
        }
    }
}

.map{
    position: relative;
    justify-content: center;
    padding: 15px;
    height: 64%;
}

.modal{
    .content-item{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        .content-wrapper{
            width: 55%;
            padding: 5px;
            background: #FFFFFF;
            border-radius: 6px;
            border: 1px solid #E3E6F0;

            .content-head{
                padding: 10px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;

                .num{
                    width: 22%;
                    color: #9A9DB1;
                }

                .type{
                    width: 50%;
                    color: #9A9DB1;
                }
            }
            
            .content-body{
                .content {
                    padding: 10px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.09);

                    &:hover {
                        background: rgba(126, 137, 237, 0.1);
                    }
                    &:last-child {
                        border-bottom: none;
                    }

                    .num {
                        width: 22%;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        font-size: 12px;
                        color: #3F4466;

                        .icon {
                            flex-shrink: 0;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            margin-right: 6px;
                        }
                    }

                    .type {
                        width: 50%;
                        font-size: 12px;
                        color: #3F4466;
                    }
                }
            }

            /*.noData{
                height: 100%;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: space-around;

                .item{
                    display: flex;
                    flex-direction: column;

                    img{
                        width: 100%;
                        height: 100%;
                    }

                    .text{
                        font-size: 13px;
                        color: #9a9db1;
                        margin-top: 20px;
                    }
                }
            }*/
        }

        .chart{
            flex-shrink: 0;
            width: 45%;
            height: 100%;
            text-align: center;
            align-self: center;
        }
    }
}

</style>