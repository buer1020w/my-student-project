<template>
  <div id="app">
    <div class="container">
      <router-link to="/students">
        <button class="nav-button">进入学生列表</button>
      </router-link>
      
      <router-link to="/web">
        <button class="nav-button">进入web3d</button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* 全局样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

#app {
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.nav-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #83bde5;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #538bbf;
  transform: scale(1.05);
}

.nav-button:active {
  transform: scale(0.95);
}
</style>
