<template>
  <div class="edit">
    <h1>编辑日记</h1>
    <form @submit.prevent="saveDiary">
      <label for="title">标题</label>
      <input
        v-model="diary.title"
        type="text"
        id="title"
        placeholder="请输入日记标题"
        required
      />

      <label for="content">内容</label>
      <quill-editor
    v-if="diary.content !== undefined && diary.content !== null"
    v-model:content="diary.content"
    contentType="html"
    id="content"
    placeholder="请输入日记内容"
  />
      <label for="category">分类</label>
      <select v-model="diary.category" id="category">
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
      diary: {
        id: '',
        title: '',
        content: null,
        category: '生活',
        date: '',
      },
    };
  },
  mounted() {
    const diaryId = parseInt(this.$route.params.id, 10);
    const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    const foundDiary = diaries.find((d) => d.id === diaryId);

    if (foundDiary) {
      this.diary = { ...foundDiary };
    } else {
      this.$router.push('/');
    }
    console.log("载入的日记内容为:", this.diary.content);

  },
  methods: {
    saveDiary() {
      const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
      const index = diaries.findIndex((d) => d.id === parseInt(this.diary.id, 10));

      if (index !== -1) {
        diaries[index] = { ...this.diary };
        localStorage.setItem('diaries', JSON.stringify(diaries));
        this.$router.push('/');
      } else {
        console.error('Diary not found');
      }
    },
  },
};
</script>



<style scoped>
.edit {
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