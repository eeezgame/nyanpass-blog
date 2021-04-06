const fs = require("mz/fs");
const globby = require("globby");
const matter = require("gray-matter");
const config = require('../config')

function rTime(date) {
  const json_date = new Date(date).toJSON();
  return json_date.split("T")[0];
}

var compareDate = function (obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
};

module.exports = async () => {
  const paths = await globby(["note/**.md"]);
  let pages = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, "utf-8");
      const { data } = matter(content);
      data.date = rTime(data.date);
      return {
        frontMatter: data,
        path: `${config.base}${item.replace(".md", ".html")}`,
      };
    })
  );
  pages.sort(compareDate);

  return pages;
};
