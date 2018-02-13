<template>
     <div class="autocomplete">
        <input
        type="text"
        @input="onChange"
        v-model="search"
        @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter"
        class="ctrl"
        />
        <ul
        id="autocomplete-results"
        v-show="isOpen"
        class="autocomplete-results"
        >
            <li
            class="loading"
            v-if="isLoading"
            >
                Loading results...
            </li>
            <li
            v-else
            v-for="(result, i) in results"
            :key="i"
            @click="setResult(result)"
            class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }"
            >
                {{ result }}
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint require-jsdoc:0 */
export default {
    name: 'autocomplete',

    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        },
        isAsync: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data () {
        return {
            isOpen: false,
            results: [],
            search: '',
            isLoading: false,
            arrowCounter: 0
        }
    },

    methods: {
        onChange () {
            // Let's warn the parent that a change was made
            this.$emit('input', this.search)

            // Is the data given by an outside ajax request?
            if (this.isAsync) {
                this.isLoading = true
            } else {
                // Let's  our flat array
                this.filterResults()
                this.isOpen = true
            }
        },

        filterResults () {
            // first uncapitalize all the things
            this.results = this.items.filter((item) => {
                return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        },
        setResult (result) {
            this.search = result
            this.isOpen = false
        },
        onArrowDown () {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1
            }
        },
        onArrowUp () {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1
            }
        },
        onEnter () {
            this.search = this.results[this.arrowCounter]
            this.isOpen = false
            this.arrowCounter = -1
        },
        handleClickOutside (evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false
                this.arrowCounter = -1
            }
        }
    },
    watch: {
        items (val, oldValue) {
            // actually compare them
            if (val.length !== oldValue.length) {
                this.results = val
                this.isLoading = false
            }
        }
    },
    mounted () {
        document.addEventListener('click', this.handleClickOutside)
    },
    destroyed () {
        document.removeEventListener('click', this.handleClickOutside)
    }
}
</script>

<style scoped>
    .autocomplete {
        position: relative;
        display: inline-block;
    }

    .autocomplete-results {
        padding: 0;
        margin: 0 auto.25em;
        border: 1px solid #999;
        overflow: auto;
        width: calc(100% - .5em);
        border-radius: .25em;
    }

    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: .25em;
        cursor: pointer;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background-color: #4aae9b;
        color: white;
    }
</style>