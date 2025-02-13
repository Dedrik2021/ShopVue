<template>
    <nav class="nav d-flex justify-content-center mb-3">
        <div class="nav-item mx-2 p-1">
            <router-link v-if="step1" class="nav-link " to="/login">Login</router-link>
            <router-link to="/login" v-else class="nav-link disabled">Login</router-link>
        </div>


        <div class="nav-item mx-2 p-1">
            <router-link v-if="step2" class="nav-link" to="/shipping">Shipping</router-link>
            <router-link to="/shipping" v-else class="nav-link disabled" >Shipping</router-link>
        </div>


        <div class="nav-item mx-2 p-1">
            <router-link v-if="step3" class="nav-link" to="/payment">Payment</router-link>
            <router-link to="/payment" v-else class="nav-link disabled" >Payment</router-link>
        </div>


        <div class="nav-item mx-2 p-1">
            <router-link v-if="step4" class="nav-link" to="/place-order">Place Order</router-link>
            <router-link to="/place-order" v-else class="nav-link disabled" >Place Order</router-link>
        </div>
    </nav>

</template>

<script>

export default {
    name: 'CheckoutPage',

    props: {
        step1: {
            type: Boolean,
            default: false,
        },
        step2: {
            type: Boolean,
            default: false,
        },
        step3: {
            type: Boolean,
            default: false,
        },
        step4: {
            type: Boolean,
            default: false,
        },
    }
}
</script>