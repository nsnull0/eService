<template>
    <sandbox-lifecycle class="flex lifecycle">
        <button class="ctrl btn" href="#" @click="lifecycle_num++">data +</button>
        <button class="ctrl btn" href="#" @click="lifecycle_num--">data -</button>
        &emsp;
        <button class="ctrl btn" href="#" @click="$_increment">method +</button>
        <button class="ctrl btn" href="#" @click="$_decrement">method -</button>
        &emsp;
        <button class="ctrl btn" href="#" @click="$_asyncIncrement">async +</button>
        <button class="ctrl btn" href="#" @click="$_asyncDecrement">async -</button>
        &emsp;
        <span class="box">({{lifecycle_num}})</span>
    </sandbox-lifecycle>
</template>

<script>
/* eslint require-jsdoc:0 */

const $_late = (fn) => setTimeout(fn, 1000)

export default {
    props: {
        initNum: Number,
    },
    data () {
        return {
            lifecycle_num: this.initNum || 0
        }
    },
    methods: {
        $_increment () {
            this.lifecycle_num++
        },
        $_decrement () {
            this.lifecycle_num--
        },
        $_asyncIncrement () {
            $_late(() => this.lifecycle_num++)
        },
        $_asyncDecrement () {
            $_late(() => this.lifecycle_num--)
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>