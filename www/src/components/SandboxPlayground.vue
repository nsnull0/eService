<template>
    <sandbox-playground class="flex playground">
        <span class="box">Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.</span>
        <button class="ctrl btn" @click="increment">+</button>
        <button class="ctrl btn" @click="decrement">-</button>
        <button class="ctrl btn" @click="incrementIfOdd">Increment if odd</button>
        <button class="ctrl btn" @click="incrementAsync">Increment async</button>
    </sandbox-playground>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters([
        'evenOrOdd'
    ]),
    methods: mapActions([
        'increment',
        'decrement',
        'incrementIfOdd',
        'incrementAsync'
    ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
sandbox-playground {
    display: block
}
</style>