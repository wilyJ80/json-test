// import { autocompleter } from "autocompleter";

fetch('array.json')  // Replace 'data.json' with the path to your JSON file
    .then(response => {
        // Check if the response is ok (status 200)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();  // Parse JSON from the response
    })
    .then(data => {
        console.log(data);  // Log the data
    })
    .catch(error => {
        console.error('There was a problem fetching the data: ', error);
    });

