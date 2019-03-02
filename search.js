const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultsTag = document.querySelector("section.results")

const accessKey = "4a2fb01e7fc7d0ddb276a9794248f69e120a2ecf8b48a8e1eb2a940097402155"
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="

const searchUnsplash = function(term) {
  return fetch(apiUrl + term, {
    method: "GET",
    headers: {
    	"Authorization": "Client-ID " + accessKey
  	}
  }).then(response => response.json()).then(data => {
    //format unsplash results
    return data.results.map(result => {
      return {
        color: result.color,
        imageSrc: result.urls.regular,
        width: result.width,
        height: result.height,
        name: result.user.name,
        title: (result.description || "&mdash;")
      }
    })
  })
}

// Add results to the page
const addResults = function (results) {
  //clear
  resultsTag.innerHTML = ""

  //results
  results.forEach(result => {
    resultsTag.innerHTML = resultsTag.innerHTML + `
			<div class="single-result">
				<div class="image">
          <a href=${result.imageSrc} target="_blank"><img src="${result.imageSrc}"></a>
				</div>
				<h2>${result.title}</h2>
				<p>by ${result.name} - ${result.width} x ${result.height}</p>
			</div>
		`
  })

}

formTag.addEventListener("submit", function(event) {
  const searchTerm = inputTag.value
  searchUnsplash(searchTerm).then(results => {
    addResults(results)
  })
  // Stop form from going to the next page
  event.preventDefault()
})
