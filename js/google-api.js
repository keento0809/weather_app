function googleApi() {
  const input = document.getElementById("pac-input");
  const options = {
    types: ["(cities)"],
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);
}
