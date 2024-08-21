document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form")

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const users = event.target.search.value
        const ul = document.querySelector('#user-list')
        ul.innerHTML = null

        fetch(`https://api.github.com/search/users?q=${users}`)
            .then((response) => response.json())
            .then( (objects) => {

                for (let i = 0; i < objects.items.length; i++) {
                    const userName = document.createElement('a')
                    userName.id = 'username'
                    const avatar = document.createElement('img')
                    const li = document.createElement('li')

                    userName.textContent = `${objects.items[i].login}`
                    avatar.src = `${objects.items[i].avatar_url}`
                    avatar.alt = `user_avatar`

                    ul.appendChild(li)
                    li.appendChild(userName)
                    li.appendChild(avatar)
                }
            })

        ul.addEventListener('click', (event) => {
            const username = event.target.parentNode.firstChild.textContent

            fetch(`https://api.github.com/users/${username}/repos`)
                .then((response) => response.json())
                .then(array => {
                    let repoList;
                    let ul_repo = document.querySelector('#repos-list')
                    ul_repo.innerHTML = ''

                    for (const iterator in array) {
                        repoList = array[iterator].name
                        const li_repo = document.createElement('li')
                        ul_repo.appendChild(li_repo)
                        li_repo.textContent = repoList
                    }
                    const p = document.createElement('p')
                    p.textContent = `${username}\'s RESPOSITORIES:`
                    p.style = 'color: #6082B6'
                    ul_repo.prepend(p)
                })
        })
        form.reset()
    })
})

