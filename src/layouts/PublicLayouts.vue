<script>
import AppBar from '@/components/AppBar.vue';
import AboutPage from '@/components/AboutPage.vue';
import Home from '@/components/Home.vue';
import FooterPage from '@/components/FooterPage.vue';
import TeamPage from '@/components/TeamPage.vue';
export default{
    components: {
        AppBar,
        FooterPage,
        Home,
        TeamPage,
        AboutPage
    }

}
</script>


<template>
    <AppBar/>
    <Home/>
    <AboutPage/>
    <TeamPage/>
    <FooterPage/>


</template>