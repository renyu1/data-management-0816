<template>
    <div class="gjbImg">
        <div v-if="tableID===`LSA-661`||tableID===`LSA-662`" class="boat">
            <header>
                <div class="type">
                    <span>模式选择：</span>
                    <RadioGroup v-model="moduleType">
                        <Radio label="单件模式"></Radio>
                        <Radio label="整箱模式"></Radio>
                    </RadioGroup>
                </div>
                <Select v-model="cangNum" style="width:120px">
                    <Option v-for="item in cangList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="layer" style="width:120px">
                    <Option v-for="item in layerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="spare" style="width:120px">
                    <Option v-for="item in spareList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <label class="label" for="stock">
                    库存数量：<Input id="stock" v-model="stock"/>
                </label>
                <label class="label disembarked" for="disembarked">
                    已下船：<Input id="disembarked" v-model="disembarked"/>
                </label>
                <label class="label" for="toDisembarked">
                    待下船：<Input id="toDisembarked" v-model="toDisembarked"/>
                </label>
                <label class="label labelQRCode" for="QRCode">
                    二维码扫描：<Input id="QRCode" v-model="QRCode"/>
                </label>
                <div class="btn">
                    <Button type="primary" label="small">移除</Button>
                    <Button type="primary" label="small">下船</Button>
                </div>
            </header>
            <section>
                <Table v-if="tableID==='LSA-661'" border :columns="columns1" :data="LSA661"></Table>
                <Table v-if="tableID==='LSA-662'" border :columns="columns1" :data="LSA662"></Table>
            </section>
        </div>
        <div v-else-if="tableID===`LSA-667`" class="upData">
            <h4>数据更新</h4>
            <Upload
                    :before-upload="handleUpload"
                    action="">
                <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
            </Upload>
        </div>
        <div v-else-if="tableID===`LSA-668`" class="config">
            <h4>配置Url</h4>
            <div class="detail">
                <h5>当前配置URl</h5>
                <div v-if="configUrl">
                    <div>器材管理：{{configUrl[`Equipment Management`]}}</div>
                    <div>IETM：{{configUrl[`IETM`]}}</div>
                </div>
            </div>
            <div class="modify detail">
                <h5>配置URl</h5>
                <div>
                    <div>器材管理：<Input v-model="modifyUrl[`Equipment Management`]" placeholder="请输入配置URl"/></div>
                    <div>IETM：<Input v-model="modifyUrl[`IETM`]" placeholder="请输入配置URl"/></div>
                </div>
                <div class="btn">
                    <Button type="primary" @click="submitConfig">提交</Button>
                </div>
            </div>
        </div>
        <img v-else :src="imgObj[tableID]" alt="">
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import {setConfigUrl} from '../../ajax/ajax'

    export default {
        name: "gjbImg",
        data() {
            return {
                tableID: ``,
                imgObj: {
                    "LSA-660": require('../../assets/img/LSA-660.png'),
                    "LSA-661": require('../../assets/img/LSA-661.png'),
                    "LSA-662": require('../../assets/img/LSA-662.png'),
                    "LSA-663": require('../../assets/img/LSA-663.png'),
                    "LSA-664": require('../../assets/img/LSA-664.png'),
                    "LSA-665": require('../../assets/img/LSA-665.png')
                },
                moduleType: `单件模式`,
                cangNum: `I-CANG`,
                cangList: [
                    {
                        value: 'I-CANG',
                        label: 'I-CANG'
                    },
                    {
                        value: 'II-CANG',
                        label: 'II-CANG'
                    },
                    {
                        value: 'III-CANG',
                        label: 'III-CANG'
                    },
                    {
                        value: 'IV-CANG',
                        label: 'IV-CANG'
                    },
                    {
                        value: 'V-CANG',
                        label: 'V-CANG'
                    }
                ],
                layer: `I-CANG`,
                layerList: [
                    {
                        value: 'I-CANG',
                        label: '上层'
                    },
                    {
                        value: 'II-CANG',
                        label: '中层'
                    },
                    {
                        value: 'III-CANG',
                        label: '下层'
                    }
                ],
                spare: `I-CANG`,
                spareList: [
                    {
                        value: 'I-CANG',
                        label: '备件箱1'
                    },
                    {
                        value: 'II-CANG',
                        label: '备件箱2'
                    },
                    {
                        value: 'III-CANG',
                        label: '备件箱3'
                    }
                ],
                disembarked: `85`,
                toDisembarked: `5`,
                QRCode: ``,
                stock: `85`,
                "LSA661": [
                    {
                        "id": 6955,
                        "eqptNumber": "B00011102011000100001",
                        "eqptName": "泵体",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50037",
                        "rfTagNumber": null,
                        "typeSpec": "BT-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "台",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "海水泵"
                    },
                    {
                        "id": 6953,
                        "eqptNumber": "B00011102031200100001",
                        "eqptName": "润滑轴承",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50040",
                        "rfTagNumber": null,
                        "typeSpec": "ZC-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "海水泵"
                    },
                    {
                        "id": 6951,
                        "eqptNumber": "B00011102041400100001",
                        "eqptName": "电机",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50020",
                        "rfTagNumber": null,
                        "typeSpec": "DJ-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "海水泵"
                    },
                    {
                        "id": 6950,
                        "eqptNumber": "B00011102031300100002",
                        "eqptName": "联轴器",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50005",
                        "rfTagNumber": null,
                        "typeSpec": "LG-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6949,
                        "eqptNumber": "B00011102091200100001",
                        "eqptName": "机械密封",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50007",
                        "rfTagNumber": null,
                        "typeSpec": "JM-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6945,
                        "eqptNumber": "J00011102011000100001",
                        "eqptName": "扳手",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50016",
                        "rfTagNumber": null,
                        "typeSpec": "BS99-HBC",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6944,
                        "eqptNumber": "J00011102011500100001",
                        "eqptName": "起子",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50011",
                        "rfTagNumber": null,
                        "typeSpec": "QZ99-HBC",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6958,
                        "eqptNumber": "B00012202061400100002",
                        "eqptName": "接触开关",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q40036",
                        "rfTagNumber": null,
                        "typeSpec": "QWX1",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 1,
                        "facilityname": "主变控制屏"
                    }, {
                        "id": 6954,
                        "eqptNumber": "B00011102101200100001",
                        "eqptName": "叶片",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50004",
                        "rfTagNumber": null,
                        "typeSpec": "YP-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 4,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 1,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 4,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6952,
                        "eqptNumber": "B00011102031300100001",
                        "eqptName": "轴套",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50041",
                        "rfTagNumber": null,
                        "typeSpec": "ZT-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 2,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 1,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 2,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6966,
                        "eqptNumber": null,
                        "eqptName": "熔断器",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": null,
                        "rfTagNumber": null,
                        "typeSpec": "FU-sml",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 9,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 1,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 9,
                        "facilityname": "主变控制屏"
                    }, {
                        "id": 6965,
                        "eqptNumber": "B00012202061100100001",
                        "eqptName": "熔断器",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q40023",
                        "rfTagNumber": null,
                        "typeSpec": "FU-sml",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 2,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 1,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 2,
                        "facilityname": "主变控制屏"
                    }, {
                        "id": 6964,
                        "eqptNumber": "B00012202061500100002",
                        "eqptName": "继电器",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q40044",
                        "rfTagNumber": null,
                        "typeSpec": "KA43",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 5,
                        "upDownStatus": 2,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 1,
                        "loadNum": 0,
                        "stockNum": 0,
                        "num": 5,
                        "facilityname": "主变控制屏"
                    }],
                "LSA662": [
                    {
                        "id": 6955,
                        "eqptNumber": "B00011102011000100001",
                        "eqptName": "泵体",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50037",
                        "rfTagNumber": null,
                        "typeSpec": "BT-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "台",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6954,
                        "eqptNumber": "B00011102101200100001",
                        "eqptName": "叶片",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50004",
                        "rfTagNumber": null,
                        "typeSpec": "YP-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 4,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 1,
                        "loadNum": 4,
                        "stockNum": 4,
                        "num": 4,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6953,
                        "eqptNumber": "B00011102031200100001",
                        "eqptName": "润滑轴承",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50040",
                        "rfTagNumber": null,
                        "typeSpec": "ZC-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6952,
                        "eqptNumber": "B00011102031300100001",
                        "eqptName": "轴套",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50041",
                        "rfTagNumber": null,
                        "typeSpec": "ZT-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 2,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 1,
                        "loadNum": 2,
                        "stockNum": 2,
                        "num": 2,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6951,
                        "eqptNumber": "B00011102041400100001",
                        "eqptName": "电机",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50020",
                        "rfTagNumber": null,
                        "typeSpec": "DJ-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6950,
                        "eqptNumber": "B00011102031300100002",
                        "eqptName": "联轴器",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50005",
                        "rfTagNumber": null,
                        "typeSpec": "LG-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6949,
                        "eqptNumber": "B00011102091200100001",
                        "eqptName": "机械密封",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50007",
                        "rfTagNumber": null,
                        "typeSpec": "JM-HSB",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6945,
                        "eqptNumber": "J00011102011000100001",
                        "eqptName": "扳手",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50016",
                        "rfTagNumber": null,
                        "typeSpec": "BS99-HBC",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6944,
                        "eqptNumber": "J00011102011500100001",
                        "eqptName": "起子",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q50011",
                        "rfTagNumber": null,
                        "typeSpec": "QZ99-HBC",
                        "manufacturer": "沪泵厂",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "海水泵"
                    }, {
                        "id": 6961,
                        "eqptNumber": "B00012202061900100002",
                        "eqptName": "直流断路器",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q40020",
                        "rfTagNumber": null,
                        "typeSpec": "QZ83",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "主变控制屏"
                    }, {
                        "id": 6960,
                        "eqptNumber": "B00012202061900100003",
                        "eqptName": "交流断路器",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q40041",
                        "rfTagNumber": null,
                        "typeSpec": "QJ03",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "主变控制屏"
                    }, {
                        "id": 6959,
                        "eqptNumber": "B00012202061400100001",
                        "eqptName": "接触开关",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q40042",
                        "rfTagNumber": null,
                        "typeSpec": "KW91",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "主变控制屏"
                    }, {
                        "id": 6958,
                        "eqptNumber": "B00012202061400100002",
                        "eqptName": "接触开关",
                        "eqptTypeNumber": null,
                        "baseName": null,
                        "qrcodeNumber": "Q40036",
                        "rfTagNumber": null,
                        "typeSpec": "QWX1",
                        "manufacturer": "海工大",
                        "prodBatch": null,
                        "versatile": 0,
                        "measureUnit": "件",
                        "standard": null,
                        "texture": null,
                        "features": null,
                        "usage": null,
                        "protectionGrade": null,
                        "storageRange": null,
                        "serviceLife": null,
                        "storedLife": null,
                        "createdate": null,
                        "updatedate": null,
                        "status": 1,
                        "imagePath": null,
                        "mounted": null,
                        "remarkA": null,
                        "remarkB": null,
                        "remarkC": null,
                        "amount": 1,
                        "upDownStatus": 1,
                        "revertReceiveStatus": null,
                        "hotspot": null,
                        "isLife": null,
                        "purchaseDepartment": null,
                        "purchaseDate": null,
                        "eqptboxnumber": "91001001",
                        "eqptSpec": 0,
                        "loadNum": 1,
                        "stockNum": 1,
                        "num": 1,
                        "facilityname": "主变控制屏"
                    }
                ],
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        width: 60,
                        title: '序号'
                    },
                    {
                        title: '器材名称',
                        key: 'eqptName'
                    },
                    {
                        title: '规格型号',
                        key: 'typeSpec'
                    },
                    {
                        title: '器材编码',
                        key: 'eqptNumber'
                    },
                    {
                        title: '二维码序列号',
                        key: 'qrcodeNumber'
                    },
                    {
                        title: '计量单位',
                        key: 'measureUnit'
                    },

                    {
                        title: '是否套装',
                        key: 'eqptSpec'
                    },
                    {
                        title: '上船数量',
                        key: 'loadNum'
                    },
                    {
                        title: '生产厂家',
                        key: 'manufacturer'
                    },
                    {
                        title: '所属设备',
                        key: 'facilityname'
                    },
                    {
                        title: '存放箱号',
                        key: 'eqptNumber'
                    }
                ],
                file: null,
                loadingStatus: false,
                modifyUrl: {
                    "Equipment Management": ``,
                    "IETM": ``
                }
            }
        },
        created() {
            this.tableID = this.$route.params.tableID
        },
        computed: {
            ...mapState([`configUrl`])
        },
        methods: {
            ...mapMutations([`CHANGE_ACTIVE_NAME`, `CHANGE_OPEN_NAME`, `CONFIG_URL`]),
            handleUpload(file) {
                this.file = file;
                this.$Message.success('数据更新成功！')
                setTimeout(async () => {
                    await this.CHANGE_ACTIVE_NAME(``)
                    this.setSession(`munName`, ``);
                    this.setSession(`localMenuOpen`, 0);
                    await this.CHANGE_OPEN_NAME([1])
                    this.$router.push(`/projectManagement`)
                }, 200);
                return false;
            },
            upload() {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            },
            async submitConfig() {
                console.log();
                if (!this.modifyUrl[`IETM`] || !this.modifyUrl[`Equipment Management`]) {
                    this.$Message.error(`请输入配置URL！`)
                } else {
                    await setConfigUrl(this.modifyUrl).then(res => {
                        if (res.succ) {
                            this.CONFIG_URL(res.content)
                            this.$Message.success(`设置成功！`)
                            this.modifyUrl = {
                                "Equipment Management": ``,
                                "IETM": ``
                            }
                        }
                    }).catch(err => {
                        console.error(err)
                    })
                }
            }
        },
        watch: {
            $route(to) {
                this.tableID = to.params.tableID
            }
        }
    }
</script>

<style lang="less">
    .gjbImg {
        padding: 10px;
        text-align: center;
        img {
            margin: 0 auto;
            width: 90%;
        }
        .boat {
            background: #fff;
            padding: 0 10px;
            > header {
                height: 60px;
                font-size: 12px;
                overflow: hidden;
                line-height: 60px;
                padding: 0 10px;
                .type {
                    float: left;
                    display: flex;
                    vertical-align: middle;
                    > span {
                        display: inline-block;
                        width: 60px;
                        font-weight: 600;
                    }
                    .ivu-radio-group {
                        width: 150px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                .ivu-select {
                    margin-right: 5px;
                    float: left;
                    vertical-align: middle;
                    height: 32px;
                    line-height: 32px;
                    margin-top: 14px;
                }
                > .label {
                    vertical-align: middle;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    width: 100px;
                    .ivu-input-wrapper {
                        width: 40%;
                    }
                }
                .labelQRCode {
                    width: 130px;

                }
                .btn {
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    width: 100px;
                    height: 38px;
                    line-height: 38px;
                    margin-top: 11px;
                    vertical-align: middle;
                    button {
                        width: 40px;
                        padding: 0;
                        > span {
                            display: inline-block;
                            width: 100%;
                            padding: 0;
                            text-align: center;
                        }
                        &:last-child {
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
        .upData {
            padding: 20px;
            > h4 {
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
            .ivu-upload > .ivu-upload {
                width: 100%;
                margin: 0 auto;
                border: 1px solid #e5e6e8;
                border-radius: 5px;
                box-shadow: 0 0 3px #dddddd;
                background: #ffffff;
                padding: 50px 0;
            }
        }
        .config {
            padding: 20px;
            > h4 {
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
            .detail {
                display: flex;
                flex-direction: column;
                border: 1px solid #e5e6e8;
                border-radius: 5px;
                box-shadow: 0 0 3px #dddddd;
                background: #ffffff;
                padding: 10px 30px 20px 20px;
                margin-bottom: 10px;
                font-size: 14px;
                h5 {
                    text-align: left;
                    height: 30px;
                    line-height: 30px;
                }
                > div {
                    height: 30px;
                    line-height: 30px;
                    display: flex;
                    align-items: center;
                    > div {
                        display: inline-block;
                        width: 368px;
                        text-align: left;
                        .ivu-input-wrapper {
                            width: 80%;
                        }
                    }

                }
                > .btn {
                    height: 50px;
                    line-height: 50px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>
