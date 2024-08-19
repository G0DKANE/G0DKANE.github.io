var userName = "";
var userId = generateUniqueID();

function setName() {
  userName = document.getElementById("name_input").value;
  document.getElementById("name_input").disabled = true;
}

function generateUniqueID() {
  const length = Math.floor(Math.random() * 9) + 11;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/?#!@';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function postText() {
  if (userName === "") {
    setName();
  }

  var text = document.getElementById("text_input").value;
  var timestamp = new Date().toLocaleString();
  var posts = localStorage.getItem('posts');
  if (posts) {
    posts = JSON.parse(posts);
  } else {
    posts = [];
  }
  var nameToDisplay = userName === "" ? "<b>名無し</b>" : userName;
  posts.push({
    name: nameToDisplay,
    id: userId,
    text: text,
    timestamp: timestamp,
    replies: []
  });
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

function displayPosts() {
  var posts = localStorage.getItem('posts');
  if (posts) {
    posts = JSON.parse(posts);
    var postList = document.getElementById("post_list");
    postList.innerHTML = '';
    for (var i = 0; i < posts.length; i++) {
      var postDiv = document.createElement('div');
      postDiv.className = 'post';

      var nameP = document.createElement('p');
      nameP.innerHTML = posts[i].name + ' (<span style="color: green;">ID: ' + posts[i].id + '</span>) (' + posts[i].timestamp + ')';

      var textP = document.createElement('p');
      textP.textContent = posts[i].text;

      postDiv.appendChild(nameP);
      postDiv.appendChild(textP);

      const replyForm = document.createElement('div');
      replyForm.className = 'reply-form';

      const replyInput = document.createElement('textarea');
      replyInput.className = 'reply-input';
      replyInput.id = `reply_input_${posts[i].id}`;
      replyInput.rows = 5;
      replyInput.cols = 40;

      const replyButton = document.createElement('button');
      replyButton.onclick = function() { replyToPost(posts[i].id); };
      replyButton.textContent = '返信';

      replyForm.appendChild(replyInput);
      replyForm.appendChild(replyButton);

      postDiv.appendChild(replyForm);
      postList.appendChild(postDiv);
    }
  }
}

// ページ読み込み時に投稿を表示
displayPosts();

