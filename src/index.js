const tags = [
  { title: "Крутой", id: 1 },
  { title: "Модный", id: 2 },
  { title: "Молодёжный", id: 3 },
];
const categories = [
  { title: "Кат 1", count: 0, tagId: 1 },
  { title: "Кат 2", count: 5, tagId: 2 },
  { title: "Кат 3", count: 13 },
  { title: "Кат 4", count: 0, tagId: 3 },
  { title: "Кат 5", count: 2, tagId: 3 },
];

// Где-то здесь пишем код
let result = [];

const categoryDom = document.createElement("div");
const xmp = document.querySelector("xmp");

const createResults = () => {
  result.push(
    ...[...categories].filter((category) => {
      if (category.count) {
        const { tagId } = category;
        if (tagId) {
          category.tag = tags.find((tag) => tag.id === tagId);
        }
        delete category.tagId;
        return true;
      }
      return false;
    })
  );

  const showResult = result.map((category, index) => {
    const newDomElement = categoryDom.cloneNode(true);
    newDomElement.className = `category category-${index}`;
    newDomElement.innerHTML = `${category.title}${
      category.tag ? ", #" + category.tag.title : ""
    }`;

    return newDomElement;
  });
  xmp.after(...showResult);
};

createResults();

const resultGolden = [
  { title: "Кат 2", count: 5, tag: { title: "Модный", id: 2 } },
  { title: "Кат 3", count: 13 },
  { title: "Кат 5", count: 2, tag: { title: "Молодёжный", id: 3 } },
];

document.body.insertAdjacentHTML(
  "beforeend",
  "<hr>" +
    "Целевой результат: <pre>" +
    JSON.stringify(resultGolden, null, 4) +
    "</pre>"
);

document.body.insertAdjacentHTML(
  "beforeend",
  "<hr>" +
    "Текущий результат: <pre>" +
    JSON.stringify(result, null, 4) +
    "</pre>"
);

document.body.insertAdjacentHTML(
  "beforeend",
  "<hr>" +
    "Текущий и целевой полностью совпадают? " +
    (JSON.stringify(resultGolden) === JSON.stringify(result))
);

const unexpectedResult = function (value) {
  setTimeout(() => {
    value = "Задерживаются " + value;
  });

  return value;
};

console.log(unexpectedResult("Пончики"));
