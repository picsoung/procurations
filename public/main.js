/* eslint-env browser, jquery */
$(function() {
  var communeSelectize = $('#commune-input').selectize({
    load: function(query, callback) {
      if (!query.length) return callback();
      var url = 'https://api-adresse.data.gouv.fr/search/?q=' + query + '&type=municipality&limit=20';
      url = $('#zipcode').length > 0 ? (url + '&postcode=' + $('#zipcode').val()) : url;
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(res) {
          var list = res.features.map(function(feature) {
            return {
              citycode: feature.properties.citycode,
              label: feature.properties.city + ', ' + feature.properties.context
            };
          });
          return callback(list);
        }
      });
    },
    searchField: 'label',
    valueField: 'citycode',
    labelField: 'label',
    maxItems: 1,
    create: false
  });

  if ($('#zipcode').length > 0) {
    $('#zipcode').change(updateCommuneField);
    updateCommuneField();
  }

  function updateCommuneField() {
    if (!$('#zipcode').val() || $('#zipcode').val().length !== 5) {
      communeSelectize[0].selectize.disable();
    } else {
      communeSelectize[0].selectize.enable();
    }
  }


  var consulatSelectize = $('#consulat-input').selectize({
    // load: function(query, callback) {},
    // http://localhost:3000/public/bureaux_etrangers.json
    load: function(query, callback) {
      if (!query.length) return callback();
      var url = './polls/search?q='+query;
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(res) {
          var list = res.map(function(feature) {
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
    valueField: 'key',
    labelField: 'consulat',
    searchField: ['country', 'consulat'],
    maxItems: 1,
    create:false
  })
})

function capitalize(str) {
  return str.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
}
