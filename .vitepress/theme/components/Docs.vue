<template>
  <div class="docs">
    <div class="years" v-for="(year, index) in data" :key='index'>
      <h3 class="year">
        {{ year[0].frontMatter.date.split("-")[0] }}
      </h3>
      <p class="article" v-for="(article, el) in year" :key="el">
        <a class="title" :href="article.path || ''">{{ article.frontMatter.title || "" }}</a>
        <span class="date">{{ article.frontMatter.date.slice(5) || "" }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useSiteData } from "vitepress";

function useYearSort(pages) {
    const data = [];
    let year = 0;
    let num = -1;
        for (let index = 0; index < pages.length; index++) {
            const element = pages[index];
            const y = element.frontMatter.date.split("-")[0];
            if (y == year) {
                data[num].push(element);
            } else {
                num++;
                data[num] = [];
                data[num].push(element);
                year = y;
            }
        }
    return data;
}

export default defineComponent({
    setup() {
        const siteData = useSiteData();

        const data = computed(() =>
            useYearSort(siteData.value.themeConfig.pages)
        );

        return {
            data,
        };
    },
});
</script>

<style scoped>

.article {
    display:flex;
    justify-content: space-between;
}

</style>
