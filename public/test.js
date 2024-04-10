document.addEventListener("DOMContentLoaded", function() {
    const postsContainer = document.getElementById('postsContainer');
    let currentPage = 1;
    const postsPerPage = 10;
    let loading = false;

    function loadPosts(page) {
        if (loading) return;
        loading = true;
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`)
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой новых постов
                posts.forEach(post => {
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
                loading = false;
            })
            .catch(error => {
                console.error('Ошибка при загрузке постов:', error);
            });
    }

    // Загружаем посты при загрузке страницы
    loadPosts(currentPage);

    // Обработчик для кнопки "Предыдущий"
    document.getElementById('previous').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            window.location.href = `/page/${currentPage}`; // замените ссылку на вашу
        }
    });

    // Обработчик для кнопки "Дальше"
    document.getElementById('next').addEventListener('click', function() {
        currentPage++;
        window.location.href = `/page/${currentPage}`; // замените ссылку на вашу
    });

});
