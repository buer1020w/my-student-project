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

<script>
import StudentForm from './StudentForm.vue';

export default {
  components: { StudentForm },
  data() {
    return {
      students: [],
      currentStudentIndex: null
    };
  },
  mounted() {
    this.loadStudents();
  },
  methods: {
    addStudent(student) {
      if (this.currentStudentIndex !== null) {
        this.students.splice(this.currentStudentIndex, 1);
      }
      this.students.unshift(student);
      this.saveStudents();
      this.currentStudentIndex = null;
    },
    editStudent(index) {
      const student = this.students[index];
      this.$refs.studentForm.setStudent(student);
      this.currentStudentIndex = index;
    },
    removeStudent(index) {
      this.students.splice(index, 1);
      this.saveStudents();
    },
    saveStudents() {
      localStorage.setItem('students', JSON.stringify(this.students));
    },
    loadStudents() {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        this.students = JSON.parse(savedStudents);
      }
    }
  }
};
</script>
