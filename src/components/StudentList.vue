<template>
  <div>
    <div class="test">
      <button @click="showModal" type="primary">新增</button>
    </div>
    <a-table :columns="columns" :data-source="students">
      <template v-slot:headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            姓名
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>操作</span>
        </template>
      </template>

      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="['name', 'number', 'age'].includes(column.key)">
          <div>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.key]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ record[column.key] }}
            </template>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.id]">
              <a-typography-link @click="save(record.id)">保存</a-typography-link>
              <a-popconfirm title="确定取消吗?" @confirm="cancel(record.id)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.id)">行内编辑</a>
              <a-divider type="vertical" />
              <a @click="showModalForEdit(record, index)">弹窗编辑</a>
              <a-divider type="vertical" />
              <a @click="removeStudent(index)">删除</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="isModalVisible" title="学生信息" @cancel="handleCancel">
      <a-form ref="formRef" :model="modalStudent" name="student_form">
        <a-form-item
          label="姓名"
          name="name"
          :rules="[{ required: true, message: '姓名不能为空!' }]"
        >
          <a-input v-model:value="modalStudent.name" placeholder="输入姓名" />
        </a-form-item>
        <a-form-item
          label="学号"
          name="number"
          :rules="[
            { required: true, message: '学号不能为空!' },
            { pattern: /^\d+$/, message: '学号只能是数字!' }
          ]"
        >
          <a-input v-model:value="modalStudent.number" placeholder="输入学号" />
        </a-form-item>
        <a-form-item
          label="年龄"
          name="age"
          :rules="[
            { required: true, message: '年龄不能为空!' },
            { pattern: /^\d+$/, message: '年龄只能是数字!' }
          ]"
        >
          <a-input v-model:value="modalStudent.age" type="number" placeholder="输入年龄" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="submitModalStudent">提交</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { store } from '../store';

const students = ref(store.students);

const currentStudentIndex = ref(null);
const isModalVisible = ref(false);
const modalStudent = reactive({ name: '', number: '', age: '' });
const editableData = reactive({});
const formRef = ref(null);

const addStudent = (student) => {
  const existingIndex = store.students.findIndex((s) => s.number === student.number);
  if (existingIndex !== -1) {
    store.students.splice(existingIndex, 1, student);
  } else {
    student.id = store.students.length + 1;
    store.students.unshift(student);
  }
  saveStudents();
  currentStudentIndex.value = null;
};

const saveStudents = () => {
  localStorage.setItem('students', JSON.stringify(store.students));
};

const submitModalStudent = async () => {
  try {
    await formRef.value.validateFields();
    addStudent({ ...modalStudent });
    handleCancel();
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
  }
};

const showModalForEdit = (record, index) => {
  modalStudent.name = record.name;
  modalStudent.number = record.number;
  modalStudent.age = record.age;
  currentStudentIndex.value = index;
  isModalVisible.value = true;
};

const removeStudent = (index) => {
  store.students.splice(index, 1);
  saveStudents();
};

const showModal = () => {
  isModalVisible.value = true;
  modalStudent.name = '';
  modalStudent.number = '';
  modalStudent.age = '';
};

const handleCancel = () => {
  isModalVisible.value = false;
  modalStudent.name = '';
  modalStudent.number = '';
  modalStudent.age = '';
};

const edit = (key) => {
  editableData[key] = cloneDeep(store.students.find(item => key === item.id));
};

const save = (key) => {
  Object.assign(store.students.find(item => key === item.id), editableData[key]);
  delete editableData[key];
  saveStudents();
};

const cancel = (key) => {
  delete editableData[key];
};

onMounted(() => {
  const savedStudents = localStorage.getItem('students');
  if (savedStudents) {
    store.students.push(...JSON.parse(savedStudents));
  }
});

const columns = ref([
  {
    key: 'name',
    dataIndex: 'name',
    title: '姓名',
  },
  {
    key: 'number',
    dataIndex: 'number',
    title: '学号',
  },
  {
    key: 'age',
    dataIndex: 'age',
    title: '年龄',
  },
  {
    key: 'action',
    title: '操作',
  },
]);
</script>

<style scoped>
.test {
  margin-bottom: 20px;
}

.editable-row-operations a {
  margin-right: 8px;
}
</style>
