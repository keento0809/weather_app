function saveLatLon(locationObj) {}

function googleApi() {
  const input = document.getElementById("pac-input");
  const options = {
    types: ["(cities)"],
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  window.addEventListener("DOMContentLoaded", () => {
    // Try HTML5 geolocation.
    console.log("Geolocationやでえ〜");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(pos);
        },
        () => {
          console.log("Failed to get location data.");
        }
      );
    }
  });
}
