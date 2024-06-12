<template>
    <div>
        <header class="header">
            <div class="container-fluid">
                <div class="title">Money Tracker</div>
            </div>
        </header>
        <nav class="navigation navbar navbar-expand-lg">
            <div class="container-fluid">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">홈</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/list" class="nav-link">내역</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/calendar" class="nav-link">달력</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/settings" class="nav-link">설정</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header {
    background-color: #D8EFD3;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 90px;
    width: 100%;
}

.title {
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
    margin: 0;
}

.navigation {
    background-color: #95D2B3;
    height: 60px;
    width: 100%;
}

.navbar-nav {
    display: flex;
    font-size: 20px;
    flex-direction: row;
    align-items: center;
    text-align: center;
}

.nav-item {
    margin: 0 40px;
}

.nav-link {
    color: #ffffff !important;
    font-weight: bold;
}

.nav-link:hover {
    color: #166152 !important;
}
</style>