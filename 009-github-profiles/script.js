const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");

// 获取user后对数据进行处理
const createUserCard = (user) => {
    console.log(user);
    const cardHTML = `
        <div class = "card">
            <div>
                <img 
                    src = "${user.avatar_url}"
                    alt = "${user.name}"
                    class = "avatar"
            </div>
            <div class = "user-info">
                <h2>${user.name}</h2>
                <p>
                    ${user.bio}
                </p>
                <ul>
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id = "repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
};
// 数据获取错误的数据处理
const createErrorCard = (message) => {
    const cardHTML = `
        <div class = "card"><h1>${message}</h1></div>
    `
    main.innerHTML = cardHTML;
}
// 渲染用户仓库的信息
const addReposToCard = (repos) => {
        const reposElement = document.getElementById("repos");
        console.log(repos);
}
// 获取数据：使用async 和 await 语法糖
const getUser = async (username) => {
    try {
        const {data} = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    }catch(error) {
        if(error.response.status == 404){
            createErrorCard("No profile with this username")
        }
    }
}
// 获取用户的仓库数据
const getRepos = async(username) => {
    try {
        const data = await axios(APIURL + username + "/repos?sort=created");
        addReposToCard(data);
    }catch(error){
        createErrorCard("Problem fetching repos");
    }
}
// 监听事件，触发数据
form.addEventListener("submit",(e) => {
    e.preventDefault();
    const user = search.value;
    if(user){
        getUser(user);
        search.value = "";
    }
})