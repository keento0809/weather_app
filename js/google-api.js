function googleApi() {
  const input = document.getElementById("pac-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };

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
