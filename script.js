// Event Listener
document.querySelector('#animal-form').addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  let animalObj = {
    name: e.target.name.value,
    imageUrl: e.target.image_url.value,
    description: e.target.description.value,
    donations: 0
  }
  renderOneAnimal(animalObj)
  adoptAnimal(animalObj)
}
// http://127.0.0.1:5555/data.js
// DOM Render Function
function renderOneAnimal(animal) {
  // Build Animal
  let card = document.createElement('li');
  card.className = 'card';
  card.innerHTML = `
  <img src="${animal.imageUrl}" class="users">
  <br>
  <div class="content">
      <h4>${animal.name}</h3>
          <p>
              $<span class="donation-count">${animal.donations}</span> Donations
          </p>
          <br>
          <p>${animal.description}</p>
          <hr>
  </div>
  <div class="buttons">
      <button id="donate">Donate $10</button>
      <button id="set_free">Set free</button>
  </div>
    `;
  card.querySelector('#donate').addEventListener('click', () => {
    animal.donations += 10
    card.querySelector('span').textContent = animal.donations;
    updateDonation(animal);
  })

  card.querySelector('#set_free').addEventListener('click', () => {
    card.remove();
    deleteAnimal(animal.id)
  })
  // Add animal card to DOM
  document.querySelector('#animal-list').appendChild(card);
}

// Fetch Request
// Get Fetch for all animal resources
function getAllAnimals() {
  fetch('http://localhost:3000/animalsData')
    // .then(res => console.log(res))
    .then(res => res.json())
    .then(animalData => animalData.forEach(animal => renderOneAnimal(animal)))
}

function adoptAnimal(animalObj) {
  fetch('http://localhost:3000/animalsData', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(animalObj)
  })
    .then(res => res.json())
    .then(animal => console.log(animal))
}

// It Affect btn for donation
function updateDonation(animalObj) {
  fetch(`http://localhost:3000/animalsData/${animalObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(animalObj)
  })
    .then(res => res.json())
    .then(animal => console.log(animal))
}


function deleteAnimal(id) {
  fetch(`http://localhost:3000/animalsData/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(animal => console.log(animal))
}
// Initial Render
// Get Data and Render our animals to the DOM
function initialize() {
  getAllAnimals();
  // animalData.forEach(animal => renderOneAnimal(animal))
}
initialize();