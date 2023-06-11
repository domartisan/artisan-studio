import { LoremIpsum } from "lorem-ipsum";

export default WireFrameProcess = ($, elementSelectors) => {
  const lorem = new LoremIpsum();

  $(
    "p, h1, h2, h3, h4, h5, h6, li, span, b, strong, i, em, mark, small, del, ins, sub, sup"
  ).each(function () {
    const text = $(this).text();
    if (!text.toLowerCase().includes("artisan")) {
      const words = text.trim().split(/\s+/).length;
      const loripsum = lorem.generateWords(words);
      $(this).text(loripsum);
    }
    $(this).attr("contenteditable", "true");
  });

  /*
      --- TODO ---
    1. Replace Images with placeholders
    2. Replace Links with placeholders
    3. Replace Forms with placeholders
    4. Replace Tables with placeholders
    5. Replace Videos with placeholders
    6. Replace Audio with placeholders
    7. Replace SVG with placeholders
    */
};
