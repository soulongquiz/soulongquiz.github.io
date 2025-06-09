const postsPerPage = 2;
const blogPosts = [
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
    img: "images/volunteer.jpg",
  }
];

let currentPage = 1;
const totalPages = Math.ceil(blogPosts.length / postsPerPage);

const blogContainer = document.getElementById("blog-posts");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

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

renderPosts();

window.addEventListener('load', () => {
    const blogSection = document.querySelector('.blog-posts');
    const pagination = document.querySelector('.pagination');
    if (blogSection && pagination) {
        const screenHeight = window.innerHeight;
        if (blogSection.scrollHeight <= screenHeight * 2.5) {
            pagination.style.display = 'none';
        } else {
            pagination.style.display = 'flex';
        }
    }
});
