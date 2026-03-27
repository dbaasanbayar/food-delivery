const data = [
  {
    title: "Үндэсний брэнд “Жүр Үр”-ийн шинэ үйлдвэр ашиглалтад орлоо",
    text: "Гэр бүл, хамт олон бүрийн баяр жаргалтай мөчид хамт байж, амтат бялуу болон бэйкери бүтээгдэхүүнийг үйлдвэрлэгч “Жүр Үр” ХХК олон улсын стандартыг хангасан шинэ үйлдвэрээ ашиглалтад орууллаа.",
    imgUrl:
      "https://mgl.gogo.mn/newsn/thumbnail/1000/images/c/2025/09/335185-27092025-1758944210-1747565903-3.jpeg",
    genre: "politics",
  },
  {
    title: "Үндэсний брэнд “Жүр Үр”-ийн шинэ үйлдвэр ашиглалтад орлоо",
    text: "Гэр бүл, хамт олон бүрийн баяр жаргалтай мөчид хамт байж, амтат бялуу болон бэйкери бүтээгдэхүүнийг үйлдвэрлэгч “Жүр Үр” ХХК олон улсын стандартыг хангасан шинэ үйлдвэрээ ашиглалтад орууллаа.",
    imgUrl:
      "https://mgl.gogo.mn/newsn/thumbnail/1000/images/c/2025/09/335185-27092025-1758944210-1747565903-3.jpeg",
    genre: "sports",
  },
  {
    title: "Үндэсний брэнд “Жүр Үр”-ийн шинэ үйлдвэр ашиглалтад орлоо",
    text: "Гэр бүл, хамт олон бүрийн баяр жаргалтай мөчид хамт байж, амтат бялуу болон бэйкери бүтээгдэхүүнийг үйлдвэрлэгч “Жүр Үр” ХХК олон улсын стандартыг хангасан шинэ үйлдвэрээ ашиглалтад орууллаа.",
    imgUrl:
      "https://mgl.gogo.mn/newsn/thumbnail/1000/images/c/2025/09/335185-27092025-1758944210-1747565903-3.jpeg",
    genre: "politics",
  },
  {
    title: "Үндэсний брэнд “Жүр Үр”-ийн шинэ үйлдвэр ашиглалтад орлоо",
    text: "Гэр бүл, хамт олон бүрийн баяр жаргалтай мөчид хамт байж, амтат бялуу болон бэйкери бүтээгдэхүүнийг үйлдвэрлэгч “Жүр Үр” ХХК олон улсын стандартыг хангасан шинэ үйлдвэрээ ашиглалтад орууллаа.",
    imgUrl:
      "https://mgl.gogo.mn/newsn/thumbnail/1000/images/c/2025/09/335185-27092025-1758944210-1747565903-3.jpeg",
    genre: "sports",
  },
  {
    title: "Үндэсний брэнд “Жүр Үр”-ийн шинэ үйлдвэр ашиглалтад орлоо",
    text: "Гэр бүл, хамт олон бүрийн баяр жаргалтай мөчид хамт байж, амтат бялуу болон бэйкери бүтээгдэхүүнийг үйлдвэрлэгч “Жүр Үр” ХХК олон улсын стандартыг хангасан шинэ үйлдвэрээ ашиглалтад орууллаа.",
    imgUrl:
      "https://mgl.gogo.mn/newsn/thumbnail/1000/images/c/2025/09/335185-27092025-1758944210-1747565903-3.jpeg",
    genre: "politics",
  },
];

const politicsBtn = document.getElementById("politicBtn");
politicsBtn.addEventListener("click", () => {
  const politicsPost = data.filter((post) => post.genre == "politics");
  document.getElementById("app").innerHTML = "";
  renderPosts(politicsPost);
});

const sportsBtn = document.getElementById("sportBtn");
sportsBtn.addEventListener("click", () => {
  const sportsPost = data.filter((post) => post.genre == "sports");
  document.getElementById("app").innerHTML = "";
  renderPosts(sportsPost);
});

function renderPosts(postObjects) {
  const postsDiv = document.createElement("div");

  for (const postObject of postObjects) {
    const postDiv = document.createElement("div");
    postsDiv.setAttribute("class", "posts");
    //starts

    postDiv.style.height = "200px";
    postDiv.style.width = "700px";
    postDiv.style.backgroundColor = "gray";
    postDiv.style.display = "flex";
    postDiv.style.borderRadius = "10px";
    postDiv.style.overflow = "hidden";

    //ends
    const postImg = document.createElement("img");
    postImg.setAttribute(
      "src",
      "https://mgl.gogo.mn/newsn/thumbnail/1000/images/c/2025/09/335185-27092025-1758944210-1747565903-3.jpeg"
    );
    postImg.setAttribute("class", "postImg");
    const postDetailDiv = document.createElement("div");
    const postTitleH2 = document.createElement("h2");
    postTitleH2.setAttribute("class", "postTitle");
    postTitleH2.innerText = `Үндэсний брэнд “Жүр Үр”-ийн шинэ үйлдвэр ашиглалтад орлоо`;
    const postDescP = document.createElement("p");
    postDescP.innerText = `Гэр бүл, хамт олон бүрийн баяр жаргалтай мөчид хамт байж, амтат бялуу болон бэйкери бүтээгдэхүүнийг үйлдвэрлэгч “Жүр Үр” ХХК олон улсын стандартыг хангасан шинэ үйлдвэрээ ашиглалтад орууллаа.`;
    postDetailDiv.appendChild(postTitleH2);
    postDetailDiv.appendChild(postDescP);
    postDiv.appendChild(postImg);
    postDiv.appendChild(postDetailDiv);
    postsDiv.appendChild(postDiv);
  }
  document.getElementById("app").appendChild(postsDiv);
}
