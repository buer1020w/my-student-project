<template>
    <div>
      <!-- ECharts 图表 -->
      <div ref="chartContainer" class="chart-container"></div>
      
      
      <canvas ref="canvasRef" style="width: 100%; height: 100vh;"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as BABYLON from '@babylonjs/core';
  import '@babylonjs/loaders';
  import earcut from 'earcut';
  import * as echarts from 'echarts';
  import { store } from '../store';
  
  const canvasRef = ref(null);
  const chartContainer = ref(null);
  let chartInstance = null;
  
  const initEngine = async () => {
    if (canvasRef.value) {
      const engine = new BABYLON.Engine(canvasRef.value, true);
      const scene = new BABYLON.Scene(engine);
  
      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(45),
        10,
        BABYLON.Vector3.Zero(),
        scene
      );
  
      camera.attachControl(canvasRef.value, true);
      camera.position = new BABYLON.Vector3(0, 6, -6);
  
      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      light.intensity = 1;
  
      // Create ground and other objects
    //   const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  
    //   const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 0.2, diameter: 2 }, scene);
    //   cylinder.position.set(3, 1, 0);
  
    //   const cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder1", { height: 0.9, diameter: 0.2 }, scene);
    //   cylinder1.position.set(2.5, 0.45, 0.5);
  
    //   const cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder2", { height: 0.9, diameter: 0.2 }, scene);
    //   cylinder2.position.set(3.6, 0.45, -0.5);
  
    //   const cylinder3 = BABYLON.MeshBuilder.CreateCylinder("cylinder3", { height: 0.9, diameter: 0.2 }, scene);
    //   cylinder3.position.set(3.6, 0.45, 0.5);
  
    //   const cylinder4 = BABYLON.MeshBuilder.CreateCylinder("cylinder4", { height: 0.9, diameter: 0.2 }, scene);
    //   cylinder4.position.set(2.5, 0.45, -0.5);
  
      
      BABYLON.SceneLoader.Append(
        "/",
        "library_draco.glb", 
        scene,
        function (scene) {
          console.log("GLB file loaded");
        },
        null,
        function (scene, message) {
          console.error("Failed to load GLB file:", message);
        }
      );
  
      engine.runRenderLoop(() => {
        scene.render();
      });
  
      window.addEventListener('resize', () => {
        engine.resize();
      });
    }
  };
  
  const updateChart = () => {
    if (chartInstance) {
      const option = {
        title: {
          text: '学生年龄分布',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          data: store.students.map(student => student.name),
          axisLabel: {
            color: '#fff'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          }
        },
        series: [
          {
            data: store.students.map(student => student.age),
            type: 'bar'
          }
        ],
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      };
  
      chartInstance.setOption(option);
    }
  };
  
  onMounted(() => {
    // Initialize ECharts
    chartInstance = echarts.init(chartContainer.value);
    updateChart();
  
    // Initialize Babylon.js
    initEngine();
  });
  
  watch(() => store.students, updateChart);
  </script>
  
  <style scoped>
  .chart-container {
    position: absolute;
    top: 204px;
    left: 40px;
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.5); /* Transparent black background */
  }
  canvas {
    display: block;
  }
  </style>
  