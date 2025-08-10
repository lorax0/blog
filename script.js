const API_KEY = 'AIzaSyCtpo0HAb8Ie_G_z9iDX4-4av3BpTSgTnU'; 
  const FOLDER_ID = '1wE92DxeQcdq9DkCUm9lqVWVjmcQ1EGFE'; 

  async function fetchPosts() {
    try {
      const listUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+trashed=false&key=${API_KEY}&fields=files(id,name,mimeType,createdTime)&orderBy=createdTime desc`;

      const res = await fetch(listUrl);
      const data = await res.json();

      const postsDiv = document.getElementById('posts');
      postsDiv.innerHTML = '';

      for (const file of data.files) 
      {
        const contentRes = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`);
        const content = await contentRes.text();

        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.innerHTML = `
          <h2>${file.name}</h2>
          <p><small>Dodano: ${new Date(file.createdTime).toLocaleDateString('pl-PL')}</small></p>
          <pre>${content}</pre>
        `;

        postsDiv.appendChild(postEl);
      }
    } catch (error) {
      postsDiv.innerText = 'Błąd podczas ładowania wpisów 😢';
      console.error('Błąd:', error);
    }
  }

  fetchPosts();