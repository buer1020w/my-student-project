<template>
  <div class="flex items-center mb-5 p-10 rounded-lg bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <input v-model="name" placeholder="输入姓名" class="w-32 p-2 text-lg mr-2 border border-gray-300 rounded-full transition-border-color duration-300" />
    <input v-model="number" placeholder="输入学号" class="w-32 p-2 text-lg mr-2 border border-gray-300 rounded-full transition-border-color duration-300" />
    <input v-model="age" type="number" placeholder="输入年龄" class="w-32 p-2 text-lg mr-2 border border-gray-300 rounded-full transition-border-color duration-300" />
    <button @click="submit" class="px-5 py-2 text-lg text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95">提交</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const id = ref(null);
const number = ref('');
const age = ref('');

// 提交表单
const submit = () => {
  if (!name.value || !number.value || !age.value) return;
  const student = {
    name: name.value,
    id: id.value || Date.now(),
    number: number.value,
    age: age.value
  };
  // 触发 'add-student' 事件，传递学生对象
  emit('add-student', student);
  resetForm();
};

// 设置学生数据
const setStudent = (student) => {
  name.value = student.name;
  id.value = student.id;
  number.value = student.number;
  age.value = student.age;
};

// 重置表单
const resetForm = () => {
  name.value = '';
  id.value = null;
  number.value = '';
  age.value = '';
};

// 获取上下文对象中的 emit 函数，用于触发自定义事件
const emit = defineEmits(['add-student']);

// 暴露 setStudent 方法，以便父组件调用
defineExpose({ setStudent });
</script>
