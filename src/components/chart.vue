<template>
    <div :style="{width:`100%`,height:`100%`}" v-chart="chartData"
         :data-chartType="type"
         :data-chartKey="key">
    </div>
</template>

<script>
    export default {
        props: {
            chartData: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            type: {
                type: String,
                default: `svg`
            }
        },
        data() {
            return {
                key: `eChart${Math.random().toString(36)}`
            }
        }
    }
</script>
