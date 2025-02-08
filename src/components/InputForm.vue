<template>
	<div class="form-group">
		<label :for="name">{{ label }}</label>
		<input :style="'margin-bottom: ' + marginBottom" :type="type" class="form-control" :id="name" v-model="$parent[name]"  />
	</div>
</template>

<script>
export default {
    name: 'InputForm',

    props: {
        label: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        marginBottom: {
            type: String,
            required: false,
            default: '0px'
        },

        type: {
            type: String,
            required: false,
            default: 'text'
        }
    }
}
</script>


<style scoped>

label {
    font-size: 13px;
}

.form-group {
    margin-bottom: 5px;
}
</style>