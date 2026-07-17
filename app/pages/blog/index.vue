<script setup>
const site = useSiteContent(); usePageSeo('blog')
</script>
<template><div><PageHero :eyebrow="site.blog.eyebrow" :title="site.blog.title" :lead="site.blog.lead"/><section class="section" style="padding-top:20px"><div class="container"><div class="blog-grid"><BlogCard v-for="(post,index) in site.blog.posts" :key="post[0]" :post="post" :index="index"/></div></div></section></div></template>
