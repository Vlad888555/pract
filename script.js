// JavaScript
document.addEventListener("DOMContentLoaded", function() {
    const postsContainer = document.getElementById('postsContainer');
    let startIndex = 0;
    const postsPerPage = 5;
    let loading = false;


    function loadPosts(searchTerm = '') {
        if (loading) return;
        loading = true;
        let postsURL = 'https://jsonplaceholder.typicode.com/posts';
        if (searchTerm) {
            postsURL += `?q=${searchTerm}`;
            startIndex = 0; // Сброс индекса начала загрузки после поиска
            postsContainer.innerHTML = ''; // Очистка контейнера перед новым поиском
            startIndex = 0; // Сброс индекса начала загрузки после поиска
            scrollHandler()
        }

        fetch(postsURL)
            .then(response => response.json())
            .then(posts => {
                const remainingPosts = posts.slice(startIndex, startIndex + postsPerPage);
                remainingPosts.forEach(post => {
                    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                        .then(response => response.json())
                        .then(user => {
                            const postElement = document.createElement('div');
                            postElement.innerHTML = `
                                <h1 class="post">${post.title}</h1>
                                <p class="post">${post.body}</p>
                                <p class="info-user"
                                    data-tooltip="
                                    ID: ${user.id}\n
                                    id-post${post.id}\n
                                    Email: ${user.email}\n
                                    Phone: ${user.phone}\n">
                                    User: ${user.name}
                                </p>
                                <hr>
                            `;
                            postsContainer.appendChild(postElement);
                        })
                        .catch(error => {
                            console.error('34 строка', error);
                        });
                });

                if (startIndex + postsPerPage >= posts.length) {
                    window.removeEventListener('scroll', scrollHandler);
                    
                }
                startIndex += postsPerPage;
                loading = false;
            })
            .catch(error => {
                console.error('45 строка:', error);
            });
    }

    function scrollHandler() {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadPosts();
        }
    }

    function searchHandler() {
        const searchTerm = document.getElementById('searchInput').value;
        loadPosts(searchTerm);
    }

    loadPosts();
    window.addEventListener('scroll', scrollHandler);
    document.getElementById('searchInput').addEventListener('input', searchHandler);
});
