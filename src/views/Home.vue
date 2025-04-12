<template>
  <div class="home">
    <h1>我的日记</h1>

    <div class="search-container">
  <input type="text" v-model="searchQuery" placeholder="搜索日记..." />
  <select v-model="selectedCategory">
    <option value="">全部分类</option>
    <option v-for="category in uniqueCategories" :key="category" :value="category">
      {{ category }}
    </option>
  </select>
</div>


    <button @click="goToAddPage">添加新日记</button>

    <ul class="diary-list">
      <li v-for="diary in filteredDiaries" :key="diary.id" class="diary-item">
        <div class="diary-header">
          <h3>{{ diary.title }}</h3>
          <small>{{ diary.date }}</small>
        </div>
        <p class="diary-category">分类: {{ diary.category }}</p>
        <div class="diary-content" v-html="shortenedContent(diary.content)"></div>

        <div class="diary-actions">
          <router-link :to="'/view/' + diary.id" class="action-link">查看详情</router-link>
          <router-link :to="'/edit/' + diary.id" class="action-link">编辑</router-link>
          <button @click="deleteDiary(diary.id)" class="delete-button">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      diaries: JSON.parse(localStorage.getItem('diaries')) || [],
      searchQuery: '',
      selectedCategory: '',
    };
  },
  computed: {
    uniqueCategories() {
      const categories = this.diaries.map(d => d.category);
      return [...new Set(categories)].filter(c => c); // 过滤空值
    },
    filteredDiaries() {
      return this.diaries.filter(diary => {
        const matchesSearch = diary.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                              diary.content.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory ? diary.category === this.selectedCategory : true;
        return matchesSearch && matchesCategory;
      });
    }
  },
  methods: {
    goToAddPage() {
      this.$router.push('/add');
    },
    deleteDiary(id) {
      let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
      diaries = diaries.filter(diary => diary.id !== id);
      localStorage.setItem('diaries', JSON.stringify(diaries));
      this.diaries = diaries;
    },
    shortenedContent(content) {
      const maxLength = 100;
      if (content.length <= maxLength) {
        return content;
      }
      return content.substring(0, maxLength) + '...';
    }
  }
};
</script>

  
  <style scoped>
  .home {
    padding: 20px;
    max-width: 800px;
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
  
  .search-container {
    margin-bottom: 20px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #e5e5ea;
    border-radius: 8px;
    font-size: 16px;
    background-color: white;
    transition: border-color 0.3s;
  }
  
  input[type="text"]:focus {
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
    margin-bottom: 20px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #006aff;
  }
  
  .diary-list {
    list-style-type: none;
    padding: 0;
  }
  
  .diary-item {
    background-color: white;
    border: 1px solid #e5e5ea;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .diary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .diary-header h3 {
    margin: 0;
    font-size: 18px;
    color: #1d1d1f;
  }
  
  .diary-header small {
    color: #8e8e93;
    font-size: 14px;
  }
  
  .diary-category {
    color: #8e8e93;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .diary-content {
    margin: 0;
    color: #555;
    font-size: 16px;
  }
  
  .diary-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  
  .action-link {
    text-decoration: none;
    color: #007aff;
    font-size: 14px;
    margin-right: 10px;
    transition: color 0.3s;
  }
  
  .action-link:hover {
    color: #006aff;
  }
  
  .delete-button {
    background-color: #ff3b30;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .delete-button:hover {
    background-color: #e0312c;
  }
  select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  color: #1d1d1f;
  margin-top: 10px;
  transition: border-color 0.3s;
}

select:focus {
  border-color: #007aff;
  outline: none;
}

  </style>