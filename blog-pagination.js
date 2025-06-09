let postsPerPage = calculatePostsPerPage();
let currentPage = 1;
const blogContainer = document.getElementById("blog-posts");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

const blogPosts = [
  {
    title: "Upcoming Mahjong Tournament",
    text: "Stay tuned for our annual Mahjong tournament with exciting prizes and challenges!",
    img: "images/mahjong-tournament.jpg",
  },
  {
    title: "Upcoming Mahjong Tournament",
    text: "Stay tuned for our annual Mahjong tournament with exciting prizes and challenges!",
    img: "images/mahjong-tournament.jpg",
  },
  {
    title: "Upcoming Mahjong Tournament",
    text: "Stay tuned for our annual Mahjong tournament with exciting prizes and challenges!",
    img: "images/mahjong-tournament.jpg",
  },
  {
    title: "Weekly Game Nights",
    text: "Join us every Friday evening for board games, card games, and fun with friends.",
    img: "images/game-night.jpg",
  },
  {
    title: "New Members Welcome",
    text: "We are always happy to welcome new players of all skill levels. Come join the fun!",
    img: "images/new-members.jpg",
  },
  {
    title: "Community Outreach",
    text: "Learn how we bring Mahjong to local schools and libraries.",
    img: "images/community.jpg",
  },
  {
    title: "Volunteer Opportunities",
    text: "Get involved and help organize events and tournaments.",
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

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
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
