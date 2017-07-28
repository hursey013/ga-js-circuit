function initMap() {
  var userLocation = {
    lat: 40.8054491,
    lng: -73.9654415
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    center: userLocation,
    zoom: 10,
    scrollwheel: false
  });
}
