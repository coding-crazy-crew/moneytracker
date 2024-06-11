<template lang="">
    <div>
        <form :class="register" @submit.prevent="registFormSubmitHandler">
            <label for="date" class="form-label">날짜</label>
            <div class="input-group date">
                <input
                    id="date"
                    type="text"
                    onfocus="this.select()"
                    class="form-control bootstrap-datepicker"
                    value="<%= DateTime.Now.ToString("yyyy-MM-dd")%>" 
                    placeholder="날짜를 입력하세요."
                    required
                    v-model="addressData.first_name"
                />
            </div>
            <div>
                <label for="last" class="form-label">last-name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="last" 
                    placeholder="last-name 입력하세요." 
                    required
                    v-model="addressData.last_name"
                />
                <label for="email" class="form-label">email</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    placeholder="email 입력하세요." 
                    required
                    v-model="addressData.email"
                />
                <label for="Gender" class="form-label">Gender</label>
                <select class="form-select" v-model="addressData.gender">
                    <option>Unknown</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>