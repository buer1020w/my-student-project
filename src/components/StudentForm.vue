<template>
  <div class="flex items-center mb-5 p-10 rounded-lg bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <input v-model="name" placeholder="输入姓名" class="w-32 p-2 text-lg mr-2 border border-gray-300 rounded-full transition-border-color duration-300" />
    <input v-model="number" placeholder="输入学号" class="w-32 p-2 text-lg mr-2 border border-gray-300 rounded-full transition-border-color duration-300" />
    <input v-model="age" type="number" placeholder="输入年龄" class="w-32 p-2 text-lg mr-2 border border-gray-300 rounded-full transition-border-color duration-300" />
    <button @click="submit" class="px-5 py-2 text-lg text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      id: null,
      number: '',
      age: ''
    };
  },
  methods: {
    submit() {
      if (!this.name || !this.number || !this.age) return;
      this.$emit('add-student', {
        name: this.name,
        id: this.id || Date.now(),
        number: this.number,
        age: this.age
      });
      this.resetForm();
    },
    setStudent(student) {
      this.name = student.name;
      this.id = student.id;
      this.number = student.number;
      this.age = student.age;
    },
    resetForm() {
      this.name = '';
      this.id = null;
      this.number = '';
      this.age = '';
    }
  }
};
</script>
