<template>
    <footer class="footer container">
        <p class="text-center py-3" >Copyright &copy; <strong>{{ getYear() }}</strong> ProShop</p>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',

    methods: {
        getYear() {
            return new Date().getFullYear()
        }
    }
}
</script>