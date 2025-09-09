<script>
import AppBar from '@/components/AppBar.vue';
import AboutPage from '@/components/AboutPage.vue';
import Home from '@/components/Home.vue';
import FooterPage from '@/components/FooterPage.vue';
import TeamPage from '@/components/TeamPage.vue';
import ArticlesSection from '@/components/ArticlesSection.vue';
export default{
    components: {
        AppBar,
        FooterPage,
        Home,
        AboutPage,
        ArticlesSection,
        TeamPage,
    }

}
</script>


<template>
    <AppBar/>
    <Home/>
    <AboutPage/>
    <ArticlesSection/>
    <TeamPage/>
    <FooterPage/>


</template>