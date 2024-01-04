const rootElement = document.querySelector('#root')

const fetchUrl = async (url) => {
	const response = await fetch(url)
	const data = await response.json()
	return data
}

const dropdownComponent = () => `
	<div class="dropdown">
		<span>select user</span>
		<ul>
			
		</ul>
	</div>
`

const userCardPlaceholder = () => `
	<div class="user">
		<p>id:</p>
		<p>name:</p>
		<p>address:</p>
	</div>
`

const userCardComponent = (user) => `
	<div class="user">
		<p>id: ${user.id}</p>
		<p>name: ${user.name.first} ${user.name.last}</p>
		<p>address: ${user.shipping.country} ${user.shipping.zip} ${user.shipping.city} ${user.shipping.address}</p>
	</div>
`

const newUserFormComponent = () => `
	<form>
		<input type="text" name="first-name" placeholder="first name">
		<input type="text" name="middle-name" placeholder="middle name">
		<input type="text" name="last-name" placeholder="last name">
		<input type="email" name="email" placeholder="email">
		<input type="text" name="country" placeholder="country">
		<input type="number" name="zip" placeholder="zip">
		<input type="text" name="city" placeholder="city">
		<input type="text" name="address" placeholder="address">
		<button>send</button>
	</form>
`

const init = async () => {
	rootElement.insertAdjacentHTML("beforeend", dropdownComponent())
	const selectElement = document.querySelector(".dropdown span")
	selectElement.addEventListener('click', (event) => {
		const dropdownElement = event.target.parentElement
		const ulElement = dropdownElement.querySelector('ul')
		ulElement.classList.toggle('show')
	})

	
	const usersData = await fetchUrl('/api/users')
	console.log(usersData)
	
	usersData.forEach(userData => 
		document.querySelector('.dropdown ul')
		.insertAdjacentHTML("beforeend", `
		<li>
		<span class="user-id">id: ${userData.id}</span> 
		<span>name: ${userData.name.first} ${userData.name.last}</span>
		</li>
		`)
		)

	rootElement.insertAdjacentHTML("beforeend", newUserFormComponent())
	const newUserFormElement = document.querySelector("form")
	newUserFormElement.addEventListener('submit', async (event) => {
		event.preventDefault()

		const response = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: {
					first: newUserFormElement.querySelector('input[name="first-name"]').value,
					middle: newUserFormElement.querySelector('input[name="middle-name"]').value,
					last: newUserFormElement.querySelector('input[name="last-name"]').value
				},
				email: newUserFormElement.querySelector('input[name="email"]').value,
				shipping: {
					country: newUserFormElement.querySelector('input[name="country"]').value,
					city: newUserFormElement.querySelector('input[name="city"]').value,
					zip: newUserFormElement.querySelector('input[name="zip"]').value,
					address: newUserFormElement.querySelector('input[name="address"]').value
				},
				invoice: {
					country: newUserFormElement.querySelector('input[name="country"]').value,
					city: newUserFormElement.querySelector('input[name="city"]').value,
					zip: newUserFormElement.querySelector('input[name="zip"]').value,
					address: newUserFormElement.querySelector('input[name="address"]').value
				}
			})
		})

		const newUser = await response.json()
		console.log(newUser)

		document.querySelector('.dropdown ul')
			.insertAdjacentHTML("beforeend", `
				<li>
				<span class="user-id">id: ${newUser.id}</span> 
				<span>name: ${newUser.name.first} ${newUser.name.last}</span>
				</li>
			`)
	})
		
	rootElement.insertAdjacentHTML("beforeend", userCardPlaceholder())

	const liElements = document.querySelectorAll('.dropdown ul li')
	liElements.forEach(liElement => liElement.addEventListener("click", () => {
		const selectedId = parseInt(liElement.querySelector('.user-id').innerText.substring(3))
		const selectedUser = usersData.find(user => user.id === selectedId)
		//console.log(selectedUser)

		document.querySelector(".user").remove()
		rootElement.insertAdjacentHTML("beforeend", userCardComponent(selectedUser))
	}))

}

init()