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
