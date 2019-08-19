<template>
    <div class="gjbDetail" v-if="tableDataInfo">
        <div class="goBack">
            <Button @click="goBack">返回</Button>
        </div>
        <div class="gjbDetailCont">
            <h4 class="detailName">
                {{tableDataInfo.name}}
            </h4>
            <div class="tableCont" v-for="(item,index) in tableDataInfo.list" :key="index">
                <h6 class="tableName">{{item.tableName}}</h6>
                <Table border :columns="item.tableHeader" :data="item.tableBody" on-row-click="rowClick(row)"></Table>
                <div class="tableInfo">{{item.tableInfo}}</div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getTableContent} from '../../ajax/ajax'

    export default {
        name: `gjbDetail`,
        data() {
            return {
                formID: ``,
                tableID: ``,
                tableDataInfo: null
            }
        },
        async created() {
            this.tableID = this.$route.params.tableID;
            this.formID = this.$route.params.formID;
            if (this.tableID && this.formID) {
                if (!this.tableData) {
                    await this.getTableContentReq()
                }
                this.tableDataInfo = this.tableData.tableList.filter(r => r.formID === this.formID)[0].content
            }
        },
        computed: {
            ...mapState([`tableData`]),
        },
        methods: {
            ...mapMutations([`TABLE_DATA`]),
            goBack() {
                this.$router.push(`/gjbList/${this.tableID}`)
            },
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
        }
    }
</script>

<style lang="less" scoped>
    .gjbDetail {
        padding: 10px;
        .gjbDetailCont {
            margin: 5px 0;
            padding: 10px;
            background: #fff;
            .detailName {
                text-align: center;
                padding: 10px 0;
            }
            .tableCont {
                .tableInfo {
                    font-size: 14px;
                    padding: 10px;
                }
            }
        }
    }
</style>
