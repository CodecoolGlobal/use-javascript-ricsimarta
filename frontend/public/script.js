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

const init = async () => {
	rootElement.insertAdjacentHTML("beforeend", dropdownComponent())
	const selectElement = document.querySelector(".dropdown span")
	selectElement.addEventListener('click', (event) => {
		const dropdownElement = event.target.parentElement
		const ulElement = dropdownElement.querySelector('ul')
		ulElement.classList.add('show')
	})

	const usersData = await fetchUrl('/api/users')
	console.log(usersData)

	usersData.forEach(userData => 
		document.querySelector('.dropdown ul')
			.insertAdjacentHTML("beforeend", `
				<li>
					id: ${userData.id} 
					name: ${JSON.stringify(userData.name)}
				</li>
			`)
	)
}

init()