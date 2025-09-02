

<template>
  <section id="article-view" aria-labelledby="article-title">
    <div class="article-container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        Loading article...
      </div>
      <div v-else-if="error" class="error" role="alert">{{ error }}</div>
      <div v-else-if="!article" class="no-article">Article not found.</div>
      <div v-else class="article-content">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <router-link to="/dashboard">Home</router-link>
          <span class="separator">/</span>
          <router-link to="/dashboard/articles-list">Articles</router-link>
          <span class="separator">/</span>
          <span>{{ article.title }}</span>
        </nav>

        <header class="article-header">
          <span v-if="article.category" class="category-tag">{{ article.category }}</span>
          <h1 id="article-title">{{ article.title }}</h1>
          <div class="meta">
            <p v-if="article.author" class="author">By {{ article.author }}</p>
            <p class="date">Published on {{ formatDate(article.created_at) }}</p>
          </div>
          <img
            v-if="article.image"
            :src="article.image"
            :alt="`Cover image for ${article.title}`"
            class="cover-image"
            loading="lazy"
          />
        </header>

        <div class="article-body" v-html="formattedContent"></div>

        <div class="article-actions">
          <router-link :to="{name: 'Article-List'}" class="back-button" aria-label="Back to articles list">
            <svg
              class="back-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Articles
          </router-link>
          <button class="share-button" @click="shareArticle" aria-label="Share this article">
            <svg
              class="share-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C9.375 12.651 10.341 12.651 11.032 13.342L15.658 17.968C16.349 18.659 16.349 19.625 15.658 20.316C14.967 21.007 14.001 21.007 13.31 20.316L10.987 17.993L8.684 20.316C7.993 21.007 7.027 21.007 6.336 20.316C5.645 19.625 5.645 18.659 6.336 17.968L10.962 13.342C11.653 12.651 12.619 12.651 13.31 13.342L15.633 15.665M3 7.5C3 6.672 3.672 6 4.5 6C5.328 6 6 6.672 6 7.5C6 8.328 5.328 9 4.5 9C3.672 9 3 8.328 3 7.5ZM18 7.5C18 6.672 18.672 6 19.5 6C20.328 6 21 6.672 21 7.5C21 8.328 20.328 9 19.5 9C18.672 9 18 8.328 18 7.5Z"
              ></path>
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getArticleById } from '@/services/ArticleService';

export default {
  name: 'ArticleView',
  data() {
    return {
      article: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    formattedContent() {
      if (!this.article || !this.article.content) return '';
      return this.article.content
        .split('\n')
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
    },
  },
  methods: {
    async fetchArticle() {
      this.loading = true;
      this.error = null;
      const slug = this.$route.params.slug;
      console.log("slug is", slug)
      

      try {
        const response = await getArticleById(slug);
        this.article = response.data;
      } catch (err) {
        this.error = 'Failed to load the article. Please try again later.';
        console.error('Error fetching article:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    shareArticle() {
      const url = window.location.href;
      const title = this.article?.title || 'Check out this article!';
      if (navigator.share) {
        navigator.share({
          title,
          url,
        }).catch(err => console.error('Share failed:', err));
      } else {
      
        navigator.clipboard.write(url).then(() => {
          alert('Article URL copied to clipboard!');
        }).catch(err => console.error('Clipboard copy failed:', err));
      }
    },
  },
  mounted() {
    this.fetchArticle();
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.article-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8fafc;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover {
  color: #1e40af;
}

.separator {
  color: #d1d5db;
}


.article-header {
  margin-bottom: 2rem;
}

.category-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #3b82f6;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

h1#article-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.author,
.date {
  font-size: 0.875rem;
  color: #6b7280;
}

.cover-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}


.article-body {
  font-size: 1.125rem;
  color: #374151;
  line-height: 1.75;
  margin-bottom: 2rem;
}

.article-body p {
  margin-bottom: 1.5rem;
}

.article-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.back-button,
.share-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-button {
  background-color: #e5e7eb;
  color: #1e293b;
}

.back-button:hover {
  background-color: #d1d5db;
  transform: translateX(-4px);
}

.share-button {
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.share-button:hover {
  background-color: #1e40af;
  transform: translateX(4px);
}

.back-icon,
.share-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.125rem;
  color: #475569;
  padding: 3rem;
}

.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid #d1d5db;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error,
.no-article {
  text-align: center;
  font-size: 1.125rem;
  color: #475569;
  padding: 3rem;
  background-color: #fef2f2;
  border-radius: 8px;
}

.error {
  color: #dc2626;
}

@media (max-width: 768px) {
  .article-container {
    padding: 2rem 1rem;
  }

  h1#article-title {
    font-size: 1.75rem;
  }

  .cover-image {
    max-height: 300px;
  }

  .article-body {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .article-container {
    padding: 1.5rem 0.75rem;
  }

  h1#article-title {
    font-size: 1.5rem;
  }

  .cover-image {
    max-height: 250px;
  }

  .article-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .back-button,
  .share-button {
    justify-content: center;
  }
}
</style>