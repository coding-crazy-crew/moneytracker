<template lang="">
    <div>
        <button 
            type="button"
            class="register-button">
            <img 
                src="/public/AddButton.png" 
                alt="거래내역 등록하러 가기" 
                @click="toRegisterPage">
        </button>
    </div>
</template>
<script>
import {useRouter} from 'vue-router'
export default {
    name: 'ToRegisterButton',
    setup() {
        const router = useRouter()

        const toRegisterPage = () => {
            router.push('/register')
        }
        return { toRegisterPage}
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