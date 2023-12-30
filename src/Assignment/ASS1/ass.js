const companies = [
    {name: 'Intelliswift', hq: 'Newark, CA', indiaLocations: ['Pune', 'Bengaluru']},
    {name: 'Salesforce', hq: 'San Francisco, CA', indiaLocations: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Gurugram', 'Jaipur']}
  ];

  
  //Task 1 Solution
  console.log(companies.length);
  companies.forEach(function(company) {
    console.log(company.name + ': ' + company.hq);
  });





  //MY SOLUTION
  // console.log(companies.length);
  // for(let i=0;i<companies.length;i++)
  //     console.log(companies[i].name);
  // for(let i=0;i<companies.length;i++)
  //     console.log("headquarter of "+companies[i].name+" is "+companies[i].hq);
  
  
  //Task 2 Solution
  function showInfo() {
    //Step 1
    const companyInfoDiv = document.getElementById('companyInformation');
  
    //Step 2 - Business Logic
    let outputHtmlSnippet = '';
    outputHtmlSnippet += '<h3>Number of companies: ' + companies.length + '</h3>';
    outputHtmlSnippet += '<ol>'
  
    //One way to iterate
    for (let i = 0; i < companies.length; i++) {
      let company = companies[i];
      outputHtmlSnippet += '<li>' + company.name + ' - ' + company.hq + ' - ' + company.indiaLocations.join(', ') + '</li>';
    }
  
    //Better way to iterate
    companies.forEach(function(company) {
      outputHtmlSnippet += '<li>' + company.name + ' - ' + company.hq + ' - ' + company.indiaLocations.join(', ') + '</li>';
    });
  
    outputHtmlSnippet += '</ol>'
  
    //Step 3
    companyInfoDiv.innerHTML = outputHtmlSnippet;
  }