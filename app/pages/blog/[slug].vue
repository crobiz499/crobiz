<script setup>
const site = useSiteContent(); const route = useRoute(); const { t, locale } = useI18n(); const localePath = useLocalePath()
const localizedSlugs = {
  cs: ['koupe-nemovitosti', 'zalozeni-firmy', 'zivot-v-chorvatsku', 'turisticky-pronajem', 'pojisteni', 'cesko-chorvatsko'],
  hr: ['kupnja-nekretnine', 'osnivanje-tvrtke', 'zivot-u-hrvatskoj', 'turisticki-najam', 'osiguranja', 'ceska-hrvatska'],
  en: ['buying-property', 'starting-company', 'living-croatia', 'tourism-rental', 'insurance-croatia', 'czech-croatian-business'],
}
const postIndex = site.value.blog.posts.findIndex((item) => item[0] === route.params.slug)
if (postIndex < 0) throw createError({ statusCode:404, statusMessage:'Article not found' })
const post = computed(() => site.value.blog.posts[postIndex])
const setI18nParams = useSetI18nParams()
setI18nParams({
  cs: { slug: localizedSlugs.cs[postIndex] },
  hr: { slug: localizedSlugs.hr[postIndex] },
  en: { slug: localizedSlugs.en[postIndex] },
})
const articleCopy = computed(() => ({
  cs: ['Dobré rozhodnutí začíná správnými informacemi.', 'Každý proces v Chorvatsku má své administrativní, finanční a praktické kroky. Než se zavážete, je důležité definovat cíl, rozpočet a časový rámec a ověřit, kteří odborníci musí být zapojeni.', 'Jak postupovat', 'Začněte úvodní konzultací, připravte dostupnou dokumentaci a nespoléhejte na neověřené informace. Místní znalost pomáhá odhalit rizika dříve, než se promění v nákladný problém.', 'CROBIZ vám pomůže vytvořit jasný plán, propojí vás s prověřenými partnery a koordinuje komunikaci po celou dobu.'],
  hr: ['Dobra odluka počinje pravim informacijama.', 'Svaki postupak u Hrvatskoj ima svoje administrativne, financijske i praktične korake. Prije obveze važno je definirati cilj, budžet i vremenski okvir te provjeriti koje stručnjake treba uključiti.', 'Kako pristupiti postupku', 'Počnite uvodnim razgovorom, pripremite dostupnu dokumentaciju i ne oslanjajte se na neprovjerene informacije. Lokalno znanje pomaže prepoznati rizike prije nego postanu skup problem.', 'CROBIZ pomaže izraditi jasan plan, povezuje vas s provjerenim partnerima i koordinira komunikaciju tijekom cijelog procesa.'],
  en: ['A good decision starts with the right information.', 'Every process in Croatia has administrative, financial and practical steps. Before committing, define your goal, budget and timeline, and confirm which professionals need to be involved.', 'How to approach the process', 'Start with an initial consultation, prepare the documents you already have and avoid relying on unverified information. Local knowledge helps identify risk before it becomes an expensive problem.', 'CROBIZ helps create a clear plan, introduces trusted partners and coordinates communication throughout the process.'],
})[locale.value] || [])
useCustomPageSeo({
  section:'article',
  title:() => post.value[1],
  description:() => post.value[3],
  pageType:'WebPage',
  ogType:'article',
  schema:() => ({
    '@type':'Article',
    '@id':`https://www.crobiz.cz${route.path}#article`,
    headline:post.value[1],
    description:post.value[3],
    inLanguage:locale.value === 'cs' ? 'cs-CZ' : locale.value === 'hr' ? 'hr-HR' : 'en-GB',
    mainEntityOfPage:{ '@id':`https://www.crobiz.cz${route.path}#webpage` },
    author:{ '@id':'https://www.crobiz.cz/#organization' },
    publisher:{ '@id':'https://www.crobiz.cz/#organization' },
  }),
})
</script>
<template><article><section class="section surface-sand"><div class="container article-shell"><p class="eyebrow">{{ post[2] }}</p><h1 class="page-title">{{ post[1] }}</h1><p class="page-lead">{{ post[3] }}</p><div class="article-hero-image"><ImagePlaceholder :label="`${t('common.placeholder')} · ${post[2]}`" tall/></div></div></section><section class="section"><div class="container article-shell article-content"><h2>{{ articleCopy[0] }}</h2><p>{{ articleCopy[1] }}</p><h2>{{ articleCopy[2] }}</h2><p>{{ articleCopy[3] }}</p><aside class="notice"><strong>i</strong><div><h2>CROBIZ</h2><p>{{ articleCopy[4] }}</p></div></aside><div class="button-row"><NuxtLink class="button button--primary" :to="localePath('/contact')">{{ t('actions.consultation') }}</NuxtLink><NuxtLink class="button button--outline" :to="localePath('/blog')">{{ t('actions.allPosts') }}</NuxtLink></div></div></section></article></template>
