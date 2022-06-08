function googleApi() {
  const input = document.getElementById("pac-input");
  const options = {
    componentRestrictions: { country: "ca" },
    types: ["(cities)"],
    fields: ["address_components", "geometry", "icon", "name"],
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // const handleCheckPlace = () => {
  //   const test = autocomplete.getPlace();
  //   console.log("event fired.", test);
  // };

  // google.maps.event.addListener(
  //   autocomplete,
  //   "place_changed",
  //   handleCheckPlace
  // );
}
