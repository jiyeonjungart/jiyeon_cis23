// Function to render your items
function renderItems(collection) {
	// The `ul` where the items will be inserted
	const collectionList = document.getElementById('collection')

	// Loop through each item in the collection array
	collection.forEach(function(item) {
		const listItem = document.createElement('li') // Make the `li`
		// => <li></li>

		// You can make each element inside of that...
		const itemTitle = document.createElement('h2') // Make an `h2`
		itemTitle.innerHTML = item.title // Put the JSON title inside
		// => <h2>Film Title</h2>
		listItem.appendChild(itemTitle) // And add it to the `li`!
		// => <li><h2>Film Title</h2></li>

		const itemImage = document.createElement('img') // And an image
		itemImage.src = item.posterImage // Set the `src` attribute from the JSON
		listItem.appendChild(itemImage) // And add that too
		// => <li><h2>Film Title</h2><img /></li>


		// This can get annoying, so we can use “template literals” instead
		const itemDetails =
			`
				<p>Released in <time>${item.year}</time></p>
				<p><em>${item.runTime}</em></p>
				<a href="${item.imdbLink}">
					<p>${item.imdbRating} / 10 →</p>
				</a>
			`
		listItem.insertAdjacentHTML('beforeend', itemDetails) // Which can we then insert
		/**
		 *  <li>
		 *    <h2>Film Title</h2>
		 *    <img>
		 * 	  <p>Released in <time>${item.year}</time></p>
			  <p><em>${item.runTime}</em></p>
			  <a href="${item.imdbLink}">
				<p>${item.imdbRating} / 10 →</p>
			  </a>
			</li>
		 * */

		// You can build logic from your data, too
		if (!item.alsoWriter) { // If this is `false`
			listItem.classList.add('faded') // Add this class to the whole `li`
		}

		collectionList.appendChild(listItem) // Then add the whole `li` into the `ul`
	})
}



// Fetch gets your JSON file.
fetch('assets/collection.json')
	.then(function(response) {
		return response.json();	
	})
	.then(function(collection){
		// And passes the data to the function, above!
		renderItems(collection.reverse()) // In reverse order
	})
