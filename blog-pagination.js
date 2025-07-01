let postsPerPage = calculatePostsPerPage();
let currentPage = 1;
const blogContainer = document.getElementById("blog-posts");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

const blogPosts = [
  {
    title: "Nouveaux locaux",
    text: "Le club aura des locaux à Fontaine-Lestangs à la rentrée 2025",
    img: "images/henridesbals.webp",
  },
  {
    title: "WRC 2025",
    text: "Allez les français.",
    img: "images/francewrc2025.webp",
  },
  {
    title: "Résultats tournoi Montpellier",
    text: "Tournoi des pradettes",
    img: "images/pradettes.jpg",
  },
  {
    title: "Mini-quiz",
    text: "La plupart des attentes récurrentes ont des noms, y compris certaines attentes complexes.",
    img: "images/question-mark.jpg",
  },
  {
    title: "Festival du jeu de Toulouse",
    text: "MEET alchimie du jeu.",
    img: "images/alchimie.jpg",
  },
  {
    title: "Mahjong Souls",
    text: "Retrouvez-nous sur Mahjong Souls",
    img: "images/majsoul.jpg",
  },
  {
    title: "Le site est en ligne",
    text: "Pour l'instant la section blog est nulle à chier",
    img: "images/kanchan.png",
  }
];

const totalPages = Math.ceil(blogPosts.length / postsPerPage);

function renderPosts() {
  blogContainer.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  blogPosts.slice(start, end).forEach(post => {
    const article = document.createElement("article");
    article.className = "blog-post";

    if (post.img) {
      const img = document.createElement("img");
      img.src = post.img;
      img.alt = post.title;
      article.appendChild(img);
    }

    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    article.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = post.text;
    article.appendChild(p);

    blogContainer.appendChild(article);
  });

  pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function shouldPaginate() {
  blogContainer.innerHTML = '';
  blogPosts.forEach(post => {
    const temp = document.createElement("article");
    temp.className = "blog-post";
    temp.innerHTML = `<h2>${post.title}</h2><p>${post.text}</p>`;
    blogContainer.appendChild(temp);
  });

  const should = blogContainer.scrollHeight > window.innerHeight * 2;
  blogContainer.innerHTML = '';
  return should;
}

function initPagination() {
  //const paginate = shouldPaginate();
  const paginate = true;
  if (paginate) {
    document.querySelector(".pagination").style.display = "flex";
    renderPosts();
  } else {
    blogContainer.innerHTML = '';
    blogPosts.forEach(post => {
      const article = document.createElement("article");
      article.className = "blog-post";
      if (post.img) {
        const img = document.createElement("img");
        img.src = post.img;
        img.alt = post.title;
        article.appendChild(img);
      }
      const h2 = document.createElement("h2");
      h2.textContent = post.title;
      article.appendChild(h2);
      const p = document.createElement("p");
      p.textContent = post.text;
      article.appendChild(p);
      blogContainer.appendChild(article);
    });

    document.querySelector(".pagination").style.display = "none";
  }
}

function calculatePostsPerPage() {
  const estimatedPostHeight = 400; // average post height in px
  const visibleHeight = window.innerHeight * 2;
  return Math.floor(visibleHeight / estimatedPostHeight);
}


prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
};

nextBtn.onclick = () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
  }
};

window.addEventListener("load", initPagination);
window.addEventListener("resize", initPagination);
