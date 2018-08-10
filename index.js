const { slugs } = require("./dinoSlugs"),
  cheerio = require("cheerio"),
  axios = require("axios");

let testSlugs = [];
for (let i = 0; i < 50; i++) {
  testSlugs.push(slugs[i]);
}

const baseUrl = "http://dinosaurpictures.org";

// axios.get(baseUrl + testSlugs[0]).then(doc => console.log(doc.data));

const promises = testSlugs.map(slug => axios.get(baseUrl + slug));

Promise.all(promises).then(docs => {
  let intros = [];
  docs.map(doc => {
    let $ = cheerio.load(doc.data);
    let dino = $(".prev-next-dino strong").text();
    let timePeriod = [];
    $(".intro+div li")
      .filter((i, el) =>
        $(el)
          .text()
          .includes("More from")
      )
      .each((i, el) =>
        timePeriod.push(
          $(el)
            .children("a")
            .text()
        )
      );
    let locations = [];
    $(".intro+div li")
      .filter((i, el) =>
        $(el)
          .text()
          .includes("More in")
      )
      .each((i, el) =>
        locations.push(
          $(el)
            .children("a")
            .text()
        )
      );
    console.log(locations);

    let intro = $(".intro")
      .text()
      .replace(/\n/g, "")
      .replace(/Enjoy and explore:/, "");
  });
  //   console.log(intros);
});
