const server = ``

async function getLeaderboard () {
    const res = await fetch(`${server}/api/leaderboard`, { credentials: 'same-origin' });
    const { data } = await res.json();

    const board = document.getElementById('board');

    data.forEach((item) => {
        const element = document.createElement('li');
        const textNode = document.createTextNode(`${item.username} - ${item.gcl}`);
        element.appendChild(textNode);
        board.appendChild(element);
    })
}

getLeaderboard();

