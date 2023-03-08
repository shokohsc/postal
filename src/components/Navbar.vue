<template>
    <nav id="navbar" class="navbar is-hidden-desktop" role="navigation" aria-label="main navigation">
        <div class="navbar-brand left-burger">
            <a role="button" class="navbar-burger burger js-modal-trigger" aria-label="menu" aria-expanded="false" data-target="mailboxes-mobile">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <div class="navbar-item">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" placeholder="" v-model="query">
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <a class="navbar-item" href="#">
                    <span class="icon">
                        <i class="fa-solid fa-search" />
                    </span>
                </a>
            </div>
        </div>
    </nav>
</template>

<script setup>
import 'virtual:fonts.css'

import { storeToRefs } from 'pinia'
import { useEmailStore } from '../stores/email'

const { query } = storeToRefs(useEmailStore())
</script>

<style scoped>
.navbar-brand.left-burger {
	align-items: flex-start;
}
.navbar-brand.left-burger .navbar-burger {
	margin-left: 0;
	margin-right: 0;
}
</style>
