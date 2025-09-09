const extensionCard = document.querySelector('.extension-card');
const allActive = document.querySelector('.activeList')
const allInActive = document.querySelector('.inActiveList')
const allList = document.querySelector('.allList')
const sunIcon = document.querySelector('.sun-icon')
const moonIcon = document.querySelector('.moon-icon')
const body = document.querySelector('body')
const themeToggle = document.getElementById('themeToggle')

const updateList = (items) => {
  extensionCard.innerHTML = ""; // clear old cards
  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-log">
        <img src="${item.logo}" alt="icon">
        <div class="card-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
        </div>
        <div class="card-action">
        <button class="card-button">Remove</button>
        <label class="switch">
          <input type="checkbox" class="toggleCheckbox">
          <span class="slider"></span>
        </label>
      </div>
    `;

    const checkbox = card.querySelectorAll(".toggleCheckbox");
    checkbox.forEach((box) =>{
      if(item.isActive){
        box.checked = true;
      }else{
        box.checked = false;
      }
    });
    extensionCard.appendChild(card);
  });
};

// ---- Filter functions ----
const showAll = (data) => updateList(data);

const showActive = (data) => {
  const filtered = data.filter(ext => ext.isActive === true);
  updateList(filtered);
};

const showInactive = (data) => {
  const filtered = data.filter(ext => ext.isActive === false);
  updateList(filtered);
};

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    updateIcon(newTheme);
})

const updateIcon = (theme) =>{
    if(theme === 'light'){
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }else{
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }
}

fetch('./data.json')
  .then(response => response.json())
  .then(data =>{
    extensions = data;
    showAll(extensions); // default load
  })
  .catch(err => console.log(err));

  // ---- Event listeners ----
allList.addEventListener('click', e => {
  e.preventDefault();
  showAll(extensions);
});

allActive.addEventListener('click', e => {
  e.preventDefault();
  showActive(extensions);
});

allInActive.addEventListener('click', e => {
  e.preventDefault();
  showInactive(extensions);
});