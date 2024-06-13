<template lang="">
    <div>
        <button 
            type="button"
            class="register-button">
            <img 
                src="/public/AddButton.png" 
                alt="거래내역 등록하러 가기" 
                @click.stop="$emit('showRegistComponent', true)">
        </button>
    </div>
</template>
<script>
export default {
    name: 'ToRegisterButton',
    setup() {
    }
}
</script>
<style scoped>
    .register-button {
        z-index:2;
        position: fixed;
        right: 0;
        top: 80%;
        transform: translateV(-50%);
        border-radius:50%;
        border: none;
        box-shadow: 0px 0px 15px #00000029;
    }
</style>