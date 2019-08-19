<template>
    <div id='login'>
        <canvas id="canvas" class="canvas"></canvas>

        <div class="content" style="color: #ffffff">
            <div class="logo">
                <img src="../assets/img/logo.png"/>
            </div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="user">
                    <Input @keyup.enter.native="handleSubmit('formInline')" type="text" v-model="formInline.user"
                           placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input @keyup.enter.native="handleSubmit('formInline')" type="password"
                           v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: `login`,
        data() {
            return {
                formInline: {
                    user: 'admin',
                    password: '123456'
                },
                ruleInline: {
                    user: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.generateCanvasBj()
        },
        methods: {
            ...mapMutations([`CHANGE_ACTIVE_NAME`, `CHANGE_OPEN_NAME`]),
            //登录函数
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.formInline.user === `admin` && this.formInline.password === `123456`) {
                            this.setSession(`login_ui-id`, `LSA-11`)
                            if (this.getSession(`login_ui-id`)) {
                                this.CHANGE_ACTIVE_NAME(``)
                                this.setSession(`munName`, ``);
                                this.setSession(`localMenuOpen`, 0);
                                this.CHANGE_OPEN_NAME([1])
                                this.$router.push(`/projectManagement`)
                            } else {
                                this.handleSubmit()
                            }
                        } else {
                            this.$Message.error(`用户名或密码错误!`)
                        }
                    }
                })

            },
            //生成 canvas 背景
            generateCanvasBj() {
                let canvas = document.querySelector(`canvas`),
                    ctx = canvas.getContext(`2d`)
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
                ctx.lineWidth = 0.3
                ctx.strokeStyle = new Color(150).style
                let mousePosition = {
                    x: canvas.width - 100,
                    y: canvas.height - 60
                }

                let dots = {
                    nb: 250,
                    distance: 100,
                    d_radius: 150,
                    array: []
                }

                function colorValue(min) {
                    return Math.floor(Math.random() * 255 + min)
                }

                function createColorStyle(r, g, b) {
                    return `rgba(` + r + `,` + g + `,` + b + `, 0.8)`
                }

                function mixComponents(comp1, weight1, comp2, weight2) {
                    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
                }

                function averageColorStyles(dot1, dot2) {
                    let color1 = dot1.color,
                        color2 = dot2.color

                    let r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
                        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
                        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
                    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
                }

                function Color(min) {
                    min = min || 0
                    this.r = colorValue(min)
                    this.g = colorValue(min)
                    this.b = colorValue(min)
                    this.style = createColorStyle(this.r, this.g, this.b)
                }

                function Dot() {
                    this.x = Math.random() * canvas.width
                    this.y = Math.random() * canvas.height

                    this.vx = -0.5 + Math.random()
                    this.vy = -0.5 + Math.random()

                    this.radius = Math.random() * 2

                    this.color = new Color()
                }

                Dot.prototype = {
                    draw: function () {
                        ctx.beginPath()
                        ctx.fillStyle = this.color.style
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
                        ctx.fill()
                    }
                }

                function createDots() {
                    for (let i = 0; i < dots.nb; i++) {
                        dots.array.push(new Dot())
                    }
                }

                function moveDots() {
                    for (let i = 0; i < dots.nb; i++) {
                        let dot = dots.array[i]

                        if (dot.y < 0 || dot.y > canvas.height) {
                            // eslint-disable-next-line no-self-assign
                            dot.vx = dot.vx
                            dot.vy = -dot.vy
                        } else if (dot.x < 0 || dot.x > canvas.width) {
                            dot.vx = -dot.vx
                            // eslint-disable-next-line no-self-assign
                            dot.vy = dot.vy
                        }
                        dot.x += dot.vx
                        dot.y += dot.vy
                    }
                }

                function connectDots() {
                    for (let i = 0; i < dots.nb; i++) {
                        for (let j = 0; j < dots.nb; j++) {
                            let i_dot = dots.array[i]
                            let j_dot = dots.array[j]
                            // 两个点之间的距离不能小于100
                            if (
                                i_dot.x - j_dot.x < dots.distance &&
                                i_dot.y - j_dot.y < dots.distance &&
                                i_dot.x - j_dot.x > -dots.distance &&
                                i_dot.y - j_dot.y > -dots.distance
                            ) {
                                if (
                                    i_dot.x - mousePosition.x < dots.d_radius &&
                                    i_dot.y - mousePosition.y < dots.d_radius &&
                                    i_dot.x - mousePosition.x > -dots.d_radius &&
                                    i_dot.y - mousePosition.y > -dots.d_radius
                                ) {
                                    ctx.beginPath()
                                    ctx.strokeStyle = averageColorStyles(i_dot, j_dot)
                                    ctx.moveTo(i_dot.x, i_dot.y)
                                    ctx.lineTo(j_dot.x, j_dot.y)
                                    ctx.stroke()
                                    ctx.closePath()
                                }
                            }
                        }
                    }
                }

                function drawDots() {
                    for (let i = 0; i < dots.nb; i++) {
                        let dot = dots.array[i]
                        dot.draw()
                    }
                }

                function animateDots() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    moveDots()
                    connectDots()
                    drawDots()

                    requestAnimationFrame(animateDots)
                }

                // ----------------------跟着鼠标动--------------------
                document.getElementById(`login`).addEventListener(`mousemove`, function (e) {
                    mousePosition.x = e.pageX
                    mousePosition.y = e.pageY
                })

                document.getElementById(`login`).addEventListener(`mouseleave`, function () {
                    mousePosition.x = canvas.width / 2
                    mousePosition.y = canvas.height / 2
                })
                // ----------------------跟着鼠标动--------------------
                createDots()
                requestAnimationFrame(animateDots)
            }
        }
    }
</script>

<style lang="less">
    #login {
        width: 100%;
        height: 100%;
        color: #fff;
        overflow-x: hidden;
        background: rgba(255, 255, 255, 0.1);
        .canvas {
            position: fixed;
            z-index: 1;
        }

        .content {
            width: 500px;
            height: 350px;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            margin: auto;
            z-index: 1000;
            background: rgba(7, 17, 27, 0.2);
            border-radius: 10px;
            display: flex;
            flex-direction: column;

            > .logo {
                text-align: center;
                margin: 10px 0;

                > img {
                    width: 120px;
                    vertical-align: middle;
                }
            }
            form {
                width: 60%;
                margin: 0 auto;
                text-align: center;
                position: relative;
                .fade-enter-active, .fade-leave-active {
                    transition: opacity 0.1s;
                }
                .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
                    top: -888888px;
                }
                .ivu-form-item-error-tip {
                    transition: all 0.1s;
                }
            }
        }

        .content section {
            flex: 1;
            z-index: 11;
            margin-left: 200px;
        }

        table {
            position: absolute;
            top: 100px;
            padding: 0 20px;
            width: 100%;
        }

        table thead tr {
            border-bottom: 2px solid #fff;
        }

        table tbody tr {
            border-bottom: 1px solid #fff;
        }

        table tr {
            height: 50px;
        }

        table tr td {
            text-align: center;
            cursor: pointer;
        }

        table tr td:last-child {
            width: 10%;
        }

        table tr th {
            font-weight: normal;
            cursor: pointer;
        }

        .search-bar {
            position: absolute;
            top: 20px;
            left: 10%;
            width: 400px;
            height: 46px;
            line-height: 46px;
        }

        .search-bar .input-wrap {
            float: left;
            width: 270px;
            height: 40px;
            padding: 0 15px;
            line-height: 40px;
            border: none;
            outline: none;
            font-size: 20px;
            border-radius: 20px 0 0 20px;
            background: rgba(255, 255, 255, 0.2);
            transition: all 0.8s;
        }

        .search-bar .input-wrap:focus {
            background: rgba(255, 255, 255, 0.8);
        }

        .search-bar .input-button {
            float: left;
            width: 50px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            font-size: 14px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.8s;
        }

        .search-bar .input-wrap:focus .input-botton {
            border-color: rgba(255, 255, 255, 0.8);
        }

        .fade-enter-active {
            transition: all 0.5s;
        }

        .fade-enter,
        .fade-leave-active {
            opacity: 0;
            transform: rotate(-70deg) translateX(300px);
        }
    }
</style>
