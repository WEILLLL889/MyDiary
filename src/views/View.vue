<template>
  <div class="view-diary">
    <h2>查看日记详情</h2>
    <div v-if="diary">
      <h3>{{ diary.title }}</h3>
      <p>{{ diary.date }}</p>
      <p>分类: {{ diary.category }}</p>
      <div v-html="diary.content" class="diary-html-content"></div>
    </div>
    <div v-else>
      <p>未找到该日记。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const diary = ref(null);

onMounted(() => {
  const diaryId = parseInt(route.params.id, 10);
  const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
  const foundDiary = diaries.find((d) => d.id === diaryId);

  if (foundDiary) {
    diary.value = foundDiary;
  } else {
    console.error(`Diary with id ${diaryId} not found`);
  }
});
</script>

<style scoped>
.diary-html-content {
  line-height: 1.8;
  padding: 1em 0;
}
</style>

  <style scoped>
  .view-diary {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    font-family: 'San Francisco', Arial, sans-serif;
    background-color: #f5f5f7;
    color: #1d1d1f;
  }
  
  h2 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  p {
    color: #8e8e93;
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  div[v-html] {
    white-space: pre-wrap;
    line-height: 1.5;
  }
  </style>