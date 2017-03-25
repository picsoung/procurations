$(function() {

  var consulatSelectize = $('#consulat-input').selectize({
    // load: function(query, callback) {},
    // http://localhost:3000/public/bureaux_etranger.json
    load: function(query, callback) {
      if (!query.length) return callback();
      $.ajax({
        url: '/public/bureaux_etranger.json',
        dataType: 'json',
        success: function(res) {
          var list = res.consulats.map(function(feature) {
            return {
              country: capitalize(feature.country),
              consulat: capitalize(feature.consulat),
              key: btoa(feature.country+"::"+feature.consulat)
            };
          });
          console.log(list);
          return callback(list);
        }
      });
    },
    // options:  getConsultatsArray(),
    render: {
       item: function(item, escape) {
           return '<div>' +
               (item.consulat ? '<span class="consulat">' + capitalize(escape(item.consulat)) + '</span>' : '') + ", "+
               (item.consulat ? '<span class="country">' + capitalize(escape(item.country)) + '</span>' : '') +
           '</div>';
       },
       option: function(item, escape) {
            var label = item.consulat || item.country;
            var caption = item.consulat ? item.country : null;
            return '<div>' +
                '<span>' + escape(label) + '</span>, ' +
                (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
            '</div>';
        }
   },
    valueField: 'consulat',
    labelField: 'consulat',
    searchField: ['country', 'consulat'],
    maxItems: 1,
    create:false
  })
})

function capitalize(str) {
  return str.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
}

function getConsultatsArray(){
  return $.getJSON('/public/bureaux_etranger.json').then( function(data) {
    console.log("data1",data)
   return data.consulats;
  }).then(function(consulats){
   return consulats.map(function(feature) {
     return {
       country: capitalize(feature.country),
       consulat: capitalize(feature.consulat),
       key: btoa(feature.country+"::"+feature.consulat)
     };
   });
 }).then(function(data){
   console.log("DAAATA",data);
   return data
 })
}

function getArray(){
  return [{
		"country": "MADAGASCAR",
		"consulat": "TANANARIVE",
		"BUREAU": "Nosy Be"
	}, {
		"country": "MADAGASCAR",
		"consulat": "TANANARIVE",
		"BUREAU": "Sainte Marie"
	}, {
		"country": "MADAGASCAR",
		"consulat": "TANANARIVE",
		"BUREAU": "Consulat général Tananarive 1Consulat général Tananarive 2"
	}]
}