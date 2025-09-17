
<template>
  <section id="article-post" aria-labelledby="article-heading">
    <div class="article-section">
      <h1 id="article-heading">Latest Articles</h1>

   
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search articles..."
        class="search-bar"
      />

 
      <div v-if="loading" class="loading">Loading articles...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="filteredArticles.length === 0" class="no-articles">No articles found.</div>

    
      <div v-else class="article-list">
        <article
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-entry"
          role="article"
        >
          <h2 class="title">{{ article.title }}</h2>
          <p class="content">{{ article.content }}</p>
          <p class="date">Published on {{ formatDate(article.created_at) }}</p>
          <router-link :to="`/dashboard/articles/${article.slug}`" class="read-more-link">Read more</router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import ArticleService from '@/services/ArticleService';

export default {
  name: 'ArticlePost',
  data() {
    return {
      articles: [],
      loading: false,
      error: null,
      searchTerm: '',
    };
  },
  computed: {
    filteredArticles() {
      const term = this.searchTerm.toLowerCase();
      return this.articles.filter(article =>
        article.title.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    async getArticles() {
      this.loading = true;
      this.error = null;
      try {
        const res = await ArticleService.getArticles();
        this.articles = res.data;
      } catch (err) {
        this.error = 'Failed to load articles. Please try again later.';
        console.error('Error fetching articles:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.article-section {
  max-width: 920px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}


h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color:#4c1d95;
  text-align: center;
  margin-bottom: 2rem;
}


.search-bar {
  width: 100%;
  max-width: 920px;
  margin: 0 auto 2rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  display: block;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-entry {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(12, 7, 60, 0.08);
  padding: 1.5rem;
  transition: box-shadow 0.3s ease;
}

.article-entry:hover {
  box-shadow: 0 6px 12px rgba(102, 7, 225, 0.1)1;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.content {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}


.read-more-link {
  color: #4c1d95;
  text-decoration: none;
 
}

.read-more:hover {
  background-color: #111827;
}

.loading,
.error,
.no-articles {
  text-align: center;
  font-size: 1.125rem;
  color: #4b5563;
  padding: 2rem;
}

.error {
  color: #dc2626;
}

@media (max-width: 768px) {
  .article-section {
    padding: 1.5rem 1rem;
  }

  h1 {
    font-size: 1.75rem;
  }

  .search-bar {
    width: 100%;
  }
}

</style>
