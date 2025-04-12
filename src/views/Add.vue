<template>
  <div class="add-diary">
    <h1>添加新日记</h1>
    <form @submit.prevent="addDiary">
      <label for="title">标题</label>
      <input v-model="title" type="text" id="title" placeholder="请输入日记标题" required />

      <label for="content">内容</label>
      <!-- 🔽 在这里使用 quill-editor，确保 contentType 设置正确 -->
      <quill-editor
        v-model:content="content"
        contentType="html"
        id="content"
        placeholder="请输入日记内容"
      ></quill-editor>

      <label for="category">分类</label>
      <select v-model="category" id="category">
        <option value="工作">工作</option>
        <option value="生活">生活</option>
        <option value="学习">学习</option>
      </select>

      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      title: '',
      content: '',
      category: '生活',
    };
  },
  methods: {
    addDiary() {
      console.log("Title:", this.title);
      console.log("Content:", this.content);
      console.log("Category:", this.category);

      const newDiary = {
        id: Date.now(),
        title: this.title,
        content: this.content,
        category: this.category,
        date: new Date().toLocaleString(),
      };

      let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
      diaries.push(newDiary);
      localStorage.setItem('diaries', JSON.stringify(diaries));

      this.$router.push('/');
    },
  },
};
</script>


<style scoped>
.add-diary {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'San Francisco', Arial, sans-serif;
  background-color: #f5f5f7;
  color: #1d1d1f;
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  font-size: 16px;
  color: #1d1d1f;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  font-size: 16px;
  color: #1d1d1f;
  background-color: #ffffff;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #007aff;
  outline: none;
}

button {
  background-color: #007aff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #006aff;
}
</style>