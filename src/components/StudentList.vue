<template>
  <div class="m-5 p-10 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 shadow-lg max-w-3xl mx-auto transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <StudentForm @add-student="addStudent" ref="studentForm" />
    <ul class="list-none p-0">
      <li v-for="(student, index) in students" :key="student.id" class="flex items-center justify-between mb-2 p-2 rounded-lg bg-gray-100 shadow-sm transition-background duration-300 hover:bg-gray-200 hover:shadow-md">
        <span class="flex-grow text-lg text-gray-800">{{ index + 1 }}. 姓名: {{ student.name }}, 学号: {{ student.number }}, 年龄: {{ student.age }}</span>
        <button @click="editStudent(index)" class="ml-2 px-4 py-2 bg-yellow-400 text-black rounded-full transition-transform duration-300 hover:scale-105 active:scale-95">编辑</button>
        <button @click="removeStudent(index)" class="ml-2 px-4 py-2 bg-red-500 text-white rounded-full transition-transform duration-300 hover:scale-105 active:scale-95">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StudentForm from './StudentForm.vue';

const students = ref([]);
const currentStudentIndex = ref(null);
const studentFormRef = ref(null);

// 加载数据
const loadStudents = () => {
  const savedStudents = localStorage.getItem('students');
  if (savedStudents) {
    students.value = JSON.parse(savedStudents);
  }
};

// 保存数据
const saveStudents = () => {
  localStorage.setItem('students', JSON.stringify(students.value));
};

// 添加
const addStudent = (student) => {
  if (currentStudentIndex.value !== null) {
    students.value.splice(currentStudentIndex.value, 1);
  }
  students.value.unshift(student);
  saveStudents();
  currentStudentIndex.value = null;
};

// 编辑
const editStudent = (index) => {
  const student = students.value[index];
  studentFormRef.value.setStudent(student);
  currentStudentIndex.value = index;
};

// 删除
const removeStudent = (index) => {
  students.value.splice(index, 1);
  saveStudents();
};

onMounted(() => {
  loadStudents();
});
</script>
