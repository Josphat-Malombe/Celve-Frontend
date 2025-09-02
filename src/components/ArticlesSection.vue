                  
<template>
    <section id="article-post">
        <div class="article-section">
            <h1 style="color:#1a237e; "> See our latest posts.</h1>
            <div class="article-grid">
                <div v-for="article in articles" :key="article.id" class="article-card">
                    <img :src="article.image || defaultImage" alt="Article cover image" class="cover-image"/>
                    <h2 class="title">{{ article.title }}</h2>
                    <p class="content">{{ stripHtml(article.content).slice(0, 100) }}...</p>

                    <p class="date">Published on {{ formatDate(article.created_at) }}</p>
                    <router-link to="/login" class="read-more">Read More</router-link>
                  
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ArticleService from '@/services/ArticleService';

export default{
    data(){
        return{
            articles: [],
            defaultImage: require('@/assets/celvelogo.jpeg')
        }
    },
    methods: {
        async fetchArticles(){
            try{
                const res = await ArticleService.fetchArticles()
                this.articles=res.data
            }catch(err){
                console.error("an error occurred", err)
            }
        },
        formatDate(datestr){
            const options = {year: 'numeric', month: 'long', day: 'numeric'}
            return new Date(datestr).toLocaleDateString(undefined, options)
        },
        stripHtml(html) {
            const div = document.createElement("div");
            div.innerHTML = html;
            return div.textContent || div.innerText || "";
  }
    },
    mounted(){
        this.fetchArticles()
    }
}
</script>

<style scoped>
.article-section {
  max-width: 100%;
  margin: 0 auto;
  padding: 160px 20px;
  background-color: #b4b7bb; 
}

h1 {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 2.2rem;
  color: #1a202c;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.article-card {
  background: #f9fafb;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.2s ease;
  
}

.article-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cover-image {
  width: 20%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 15px;
}

.title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 10px;
  font-weight: 700;
}

.content {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 10px;
  line-height: 1.5;
}

.date {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 15px;
}

.read-more {
  display: inline-block;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  color: #2b6cb0;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}


@media (max-width: 600px) {
  h1 {
    font-size: 1.8rem;
  }

  .article-card {
    padding: 15px;
  }

  .title {
    font-size: 1.3rem;
  }

  .cover-image {
    height: 140px;
  }
}
</style>