// Elements
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const categoryInput = document.getElementById('category');
const imageUrlInput = document.getElementById('imageUrl');
const postsContainer = document.getElementById('postsContainer');
const feedback = document.getElementById('feedback');
const searchInput = document.getElementById('searchInput');
const modeToggle = document.getElementById('modeToggle');
const cancelEditBtn = document.getElementById('cancelEditBtn');

let posts = [];
let editPostId = null;

// Load posts and theme on page load
window.onload = () => {
  loadPosts();
  loadTheme();
  renderPosts();
};

// Load posts from localStorage
function loadPosts() {
  const saved = localStorage.getItem('blogPosts');
  posts = saved ? JSON.parse(saved) : [];
}

// Save posts to localStorage
function savePosts() {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Render posts to DOM with optional filtering by search term
function renderPosts(filter = '') {
  postsContainer.innerHTML = '';

  let filteredPosts = posts.filter(post => {
    const term = filter.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term)
    );
  });

  if (filteredPosts.length === 0) {
    postsContainer.innerHTML = `<p>No posts found. Try creating some!</p>`;
    return;
  }

  filteredPosts.forEach(post => {
    const postEl = document.createElement('article');
    postEl.classList.add('post');

    postEl.innerHTML = `
      <h3>${escapeHtml(post.title)}</h3>
      <div class="meta">Category: ${escapeHtml(post.category)}</div>
      ${post.imageUrl ? `<img src="${escapeHtml(post.imageUrl)}" alt="Post image" />` : ''}
      <p>${escapeHtml(post.content)}</p>
      <div class="actions">
        <button aria-label="Edit post" title="Edit post" onclick="editPost('${post.id}')">✏️</button>
        <button aria-label="Delete post" title="Delete post" onclick="deletePost('${post.id}')">🗑️</button>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle form submit (create or update)
postForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const category = categoryInput.value;
  const imageUrl = imageUrlInput.value.trim();

  if (!title || !content || !category) {
    showFeedback('Please fill in all required fields.', true);
    return;
  }

  if (editPostId) {
    // Update existing post
    const index = posts.findIndex(p => p.id === editPostId);
    if (index !== -1) {
      posts[index] = { id: editPostId, title, content, category, imageUrl };
      showFeedback('Post updated successfully!');
    }
    editPostId = null;
    cancelEditBtn.style.display = 'none';
    postForm.querySelector('button[type="submit"]').textContent = 'Save Post';
  } else {
    // Create new post
    const newPost = {
      id: generateId(),
      title,
      content,
      category,
      imageUrl
    };
    posts.unshift(newPost); // add to beginning
    showFeedback('Post created successfully!');
  }

  savePosts();
  renderPosts();
  postForm.reset();
});

// Cancel editing
cancelEditBtn.addEventListener('click', () => {
  editPostId = null;
  postForm.reset();
  cancelEditBtn.style.display = 'none';
  postForm.querySelector('button[type="submit"]').textContent = 'Save Post';
  feedback.textContent = '';
});

// Generate simple unique id
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Edit post by id
window.editPost = function(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  editPostId = id;
  titleInput.value = post.title;
  contentInput.value = post.content;
  categoryInput.value = post.category;
  imageUrlInput.value = post.imageUrl || '';
  postForm.querySelector('button[type="submit"]').textContent = 'Update Post';
  cancelEditBtn.style.display = 'inline-block';
  feedback.textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Delete post by id
window.deletePost = function(id) {
  if (!confirm('Are you sure you want to delete this post?')) return;
  posts = posts.filter(p => p.id !== id);
  savePosts();
  renderPosts(searchInput.value.trim());
  showFeedback('Post deleted.', false);
};

// Show feedback message
function showFeedback(msg, isError = false) {
  feedback.textContent = msg;
  feedback.style.color = isError ? 'var(--feedback-error)' : 'var(--feedback-success)';
  setTimeout(() => {
    feedback.textContent = '';
  }, 3500);
}

// Search input handler
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  renderPosts(query);
});

// Dark/Light Mode Toggle
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  modeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
  } else {
    modeToggle.textContent = '🌙';
  }
}
