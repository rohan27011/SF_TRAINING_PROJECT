let data

import('/src/moviesPlay.js')
.then(res => {
	console.log('data imported into data constant');
	data = res;
	run()
});

function run() {
	
}

//part of task 2
function getLanguagesMap(languages) {
	const languageMap = new Map();
	languages.forEach(lang => {
		languageMap.set(lang.iso_639_1, `${lang.english_name} (${lang.name})`);
	})
	// console.log(languageMap.get('hi'));
	return languageMap;
}


//part of task 1
function getMovieCountByLanguage(movies){
	const movieLangMap = new Map();
	for(let i=0;i<movies.length;i++){
		const key = movies[i].originalLanguage;
		if(!movieLangMap.get(key)){
			movieLangMap.set(key,0);
		}
		const newVal = movieLangMap.get(key)+1;
		movieLangMap.set(key,newVal);
	}
	return movieLangMap;
}

 //part of task 3 & 4
function showMovieCountByLanguage() {
	const movies = data.movies;
	const languages = data.languages

	const moviesByLangCount = getMovieCountByLanguage(movies);


	const languageMap = getLanguagesMap(languages);

	let htmlContent = `
	<table class="ui celled table">
		<thead>
			<tr>
				<th>Language</th>
				<th>Count</th>
			</tr>
		</thead>
	<tbody>`;

	const moviesCountByLangArray = [];
	for (const [key,value] of moviesByLangCount) {
		moviesCountByLangArray.push({
			language:languageMap.get(key), count: value
		});
	}

	//part of taks 4
	moviesCountByLangArray.sort((a,b) => {
		return (b.count-a.count);
	})

	moviesCountByLangArray.forEach(item => {
		htmlContent += `
		<tr>
			<td>${item.language}</td>
			<td>${item.count}</td>
		</tr>`;
	})

	htmlContent +='</tbody></table>'
	document.getElementById('content').innerHTML = htmlContent;
}
    