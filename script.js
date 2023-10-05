// Получение списка постов
fetch('http://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    // Получение списка пользователей
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        // Формирование итогового массива пользователей
        const result = users.slice(0, 10).map(user => {
          const userPosts = posts.filter(post => post.userId === user.id).slice(0, 5).map(post => {
            // Обрезание заголовка до 20 символов
            const titleCrop = post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title;
            return {
              id: post.id,
              title: post.title,
              title_crop: titleCrop,
              body: post.body
            };
          });
          // Объединение полей адреса
          const address = `${user.address.city}, ${user.address.street}, ${user.address.suite}`;
          // Добавление статичного протокола "https://"
          const website = user.website.startsWith('http') ? user.website : `https://${user.website}`;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: address,
            website: website,
            company: user.company.name,
            posts: userPosts
          };
        });
        console.log(result);
      });
  });