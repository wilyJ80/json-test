const endpoint = './fungos.json';

const data = {
  SpeciesName: [],
  AssemblyName: [],
  AssemblyAccession: []
};

// Fetch grabs the local JSON file
fetch(endpoint)
  .then(response => response.json())
  .then(jsonData => {
    data.SpeciesName = jsonData.SpeciesName;
    data.AssemblyName = jsonData.AssemblyName;
    data.AssemblyAccession = jsonData.AssemblyAccession;
  });

function findMatches(keyword, speciesNames) {
  const regex = new RegExp(keyword, 'gi');
  return speciesNames.map((speciesName, index) => {
    if (speciesName.match(regex)) {
      return {
        speciesName: speciesName,
        assemblyName: data.AssemblyName[index],
        assemblyAccession: data.AssemblyAccession[index]
      };
    }
    return null;
  }).filter(entry => entry !== null);
}

// Add results to HTML li
function displayMatches() {
  const matchArray = findMatches(this.value, data.SpeciesName);
  const html = matchArray.map(entry => {
    const regex = new RegExp(this.value, 'gi');
    const speciesName = entry.speciesName.replace(regex, `<span class="highlight">${this.value}</span>`);
    const assemblyName = entry.assemblyName;
    const assemblyAccession = entry.assemblyAccession;

    return `
      <li>
        <span class="name">${speciesName}</span>
        <span class="assembly">Assembly: ${assemblyName}</span>
        <span class="accession">Accession: ${assemblyAccession}</span>
      </li>
    `;
  }).join('');
  
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search-input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
