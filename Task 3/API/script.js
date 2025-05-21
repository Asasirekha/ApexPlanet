const jokeBox = document.getElementById('joke');
const jokeBtn = document.getElementById('joke-btn');
const loadingText = document.getElementById('loading');
const errorText = document.getElementById('error');

async function fetchJoke() {
  loadingText.classList.remove('hide');
  errorText.classList.add('hide');
  jokeBox.textContent = "";

  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    jokeBox.textContent = data.joke;
  } catch (err) {
    errorText.classList.remove('hide');
  } finally {
    loadingText.classList.add('hide');
  }
}

jokeBtn.addEventListener('click', fetchJoke);
