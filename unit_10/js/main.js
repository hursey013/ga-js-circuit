// Options

var vehicleOptions = [
  {feature: 'cadenza', price: 35000},
  {feature: 'forte', price: 20000},
  {feature: 'optima', price: 29050},
  {feature: 'sedona', price: 38650},
  {feature: 'soul', price: 42200}
];

var colorOptions = [
  {feature: 'black', price: 50},
  {feature: 'white', price: 100},
  {feature: 'silver', price: 250}
];

var packageOptions = [
  {feature: 'Rear Camera', price: 150},
  {feature: 'LED Positioning Light', price: 150},
  {feature: 'Rear Camera and LED Positioning Light', price: 200}
];

var carSelection = {
  vehicle: {choice: 'Not Selected', price: 0},
  color: {choice: 'Not Selected', price: 0},
  package: {choice: 'Not Selected', price: 0}
};

// Navigation

$('.navigation li a').on( 'click', function() {
  $('.navigation li a').parent().removeClass('active');
  $(this).parent().addClass('active');

  $('#options-display').empty();
  var currentTab = $(this).parent().data('tab');
  // This started as switch statement, but I saw an opportunity to DRY it up a bit
  updateTabContent(currentTab);
});

// Tab content

function updateTabContent(currentTab) {
  if (currentTab == 'summary') {
    var source = $("#summary-options-template").html();
    var template = Handlebars.compile(source);

    $('#options-display').html(template(carSelection));
  } else {
    var array = window[currentTab + 'Options'];

    for(var option in array){
      var context = {
        feature: array[option].feature,
        price: array[option].price
      };
      var source = $("#" + currentTab + "-options-template").html();
      var template = Handlebars.compile(source);

      $('#options-display').append(template(context));
    }
  }
}

// User selection

$('#options-display').on('click', 'div[class*="option"]', function() {
  var category = $(this).data('panel');

  if (category){
    var price = $(this).data('price');
    var option = $(this).data('option');

    carSelection[category].choice = option;
    carSelection[category].price = price;

    if (carSelection['vehicle'].choice !== 'Not Selected' && carSelection['color'].choice !== 'Not Selected') {
      $('.vehicle-display').attr('src', 'assets/' + carSelection['vehicle'].choice + '-' + carSelection['color'].choice + '.jpg');
    } else if (carSelection.vehicle.choice !== 'Not Selected') {
      $('.vehicle-display').attr('src', 'assets/' + carSelection['vehicle'].choice + '.jpg');
    }

    updateCost();
  }
});

// Update cost

function updateCost () {
  var totalCost = 0;

  for (var option in carSelection) {
    if (!carSelection.hasOwnProperty(option)) continue;
    totalCost += carSelection[option].price;
  }

  $('.cost-display').html('$' + numberWithCommas(totalCost));
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Init

updateTabContent('vehicle');
