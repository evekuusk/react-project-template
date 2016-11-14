// ***** CONVERT OBJECT TO ARRAY ***** //
function toArray(obj) {
  var result = []
  Object.keys(obj).forEach(function(key) {
    result.push(obj[key]);
  });
  return result
}

// ***** CONVERT KEYS AND VALUES TO OBJECT ***** //
function toObject(keys, values) {
    result = {};
    for (var i = 0; i < keys.length; i++)
         result[keys[i]] = values[i];
    return result;
}

// ***** DEFINE WHETHER A NUMBER IS BETWEEN A SPECIFIED MINIMUM AND MAXIMUM ***** //
// call .between(min, max) on any integer number variable and returns a boolean whether or not the variable number exists between the defined minimum and maximum values
  // example usage:
    // var num = 42
    // num.between(41, 43) => true
    // num.between(45, 50) => false
Number.prototype.between = function (min, max) {
    return this > min && this < max;
};

// ***** PAD AN INTEGER CONVERTED TO STRING WITH A SPECIFIED NUMBER OF LEADING zeros ***** //
Number.prototype.pad = function(num) {
  var str = String(this);
  while (str.length < (num || 2)) {
    str = "0" + str;
  }
  return str;
}

// ***** REFORMAT DATE STRING IN YYYY-MM-DD ***** //
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  if (mm <= 9) {
     mm = mm.pad()
  }
  if (dd <= 9) {
    dd = dd.pad()
  }
  return [this.getFullYear(), mm, dd].join('-');
};

// ***** REFORMAT DATE STRING IN DD-MM-YYYY ***** //
Date.prototype.ddmmyyyy = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  if (mm <= 9) {
     mm = mm.pad()
  }
  if (dd <= 9) {
    dd = dd.pad()
  }
  return [dd, mm, this.getFullYear()].join('-');
};

// ***** SEARCH FOR EXISTENCE OF ITEM INSIDE NESTED ARRAY ***** //
// for the search of an item inside of an array of arrays
  // return true if item is found, false if item is not found
function searchInNestedArray(haystack, needle) {
  for (i = 0; i < haystack.length; i++) {
    for (j = 0; j < haystack[i].length; j++) {
      if (haystack[i][j] == needle) {
        return true
      } else {
        continue
      }
    }
  }
  return false
}

// ***** SEARCH FOR INDEX OF ITEM INSIDE NESTED ARRAY ***** //
// for the search of an item inside of an array of arrays
  // return index if item is found, -1 if item is not found
function searchInNestedArrayIndex(haystack, needle) {
  for (i = 0; i < haystack.length; i++) {
    for (j = 0; j < haystack[i].length; j++) {
      if (haystack[i][j] == needle) {
        return i
      } else {
        continue
      }
    }
  }
  return -1
}

// ***** MANIPULATE STRING TO TITLE CASE ***** //
// returns a string with the first letter of each word in uppercase format
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}



// ***** MANIPULATE URL ENCODED STRING TO JS OBJECT (DEPARAM) ***** //
// NOT MINE, EXTRACTED FROM OPEN SOURCE PLUGIN
/*
  jQuery deparam is an extraction of the deparam method from Ben Alman's jQuery BBQ
  http://benalman.com/projects/jquery-bbq-plugin/
*/
(function ($) {
  $.deparam = function (params, coerce) {
    var obj = {},
        coerce_types = { 'true': !0, 'false': !1, 'null': null };

    // Iterate over all name=value pairs.
    $.each(params.replace(/\+/g, ' ').split('&'), function (j,v) {
      var param = v.split('='),
          key = decodeURIComponent(param[0]),
          val,
          cur = obj,
          i = 0,

          // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
          // into its component parts.
          keys = key.split(']['),
          keys_last = keys.length - 1;

      // If the first keys part contains [ and the last ends with ], then []
      // are correctly balanced.
      if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
        // Remove the trailing ] from the last keys part.
        keys[keys_last] = keys[keys_last].replace(/\]$/, '');

        // Split first keys part into two parts on the [ and add them back onto
        // the beginning of the keys array.
        keys = keys.shift().split('[').concat(keys);

        keys_last = keys.length - 1;
      } else {
        // Basic 'foo' style key.
        keys_last = 0;
      }

      // Are we dealing with a name=value pair, or just a name?
      if (param.length === 2) {
        val = decodeURIComponent(param[1]);

        // Coerce values.
        if (coerce) {
          val = val && !isNaN(val)              ? +val              // number
              : val === 'undefined'             ? undefined         // undefined
              : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
              : val;                                                // string
        }

        if ( keys_last ) {
          // Complex key, build deep object structure based on a few rules:
          // * The 'cur' pointer starts at the object top-level.
          // * [] = array push (n is set to array length), [n] = array if n is
          //   numeric, otherwise object.
          // * If at the last keys part, set the value.
          // * For each keys part, if the current level is undefined create an
          //   object or array based on the type of the next keys part.
          // * Move the 'cur' pointer to the next level.
          // * Rinse & repeat.
          for (; i <= keys_last; i++) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last
              ? cur[key] || (keys[i+1] && isNaN(keys[i+1]) ? {} : [])
              : val;
          }

        } else {
          // Simple key, even simpler rules, since only scalars and shallow
          // arrays are allowed.

          if ($.isArray(obj[key])) {
            // val is already an array, so push on the next value.
            obj[key].push( val );

          } else if (obj[key] !== undefined) {
            // val isn't an array, but since a second value has been specified,
            // convert val into an array.
            obj[key] = [obj[key], val];

          } else {
            // val is a scalar.
            obj[key] = val;
          }
        }

      } else if (key) {
        // No value was defined, so set something meaningful.
        obj[key] = coerce
          ? undefined
          : '';
      }
    });

    return obj;
  };
})(jQuery);

// COUNT ITEMS IN AN OBJECT
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// GET SINGLE OBJECT KEY-VALUE PAIRS
// looks inside an object and in cases where a key's value is an array, recreates object to have only the last item from array as single string value
function objectArrayValueToStringValue(obj) {
  var newObj = {}
  Object.keys(obj).forEach(function(key) {
    if (obj[key] instanceof Array) {
      var i = obj[key].length - 1
      newObj[key] = obj[key][i]
    } else if (typeof(obj[key]) == 'string') {
      newObj[key] = obj[key]
    } else {
      console.log('ERROR:  Invalid object value type.  Type: ', typeof(obj[key]))
    }
  })
  return newObj
}

// CREATE A SEQUENTIAL PROMISE
function sequentialPromise(functionsArr) {
  if (functionsArr instanceof Array) {

  } else {
    console.log('ERROR:  Array of minimum two functions not present in sequentialPromise() parameters')
  }
}


// REMOVE SPACES FROM STRING
function removeSpacesFromString(str) {
  return str.replace(/\s+/g, '');
}


// GET COMPONENT DATA
function getComponentData(name) {
  name = name.toString()
  // console.log('name: ', name)
  // console.log('saved data: ', formAnswersObj[name])
  return formAnswersObj != undefined ? formAnswersObj.hasOwnProperty(name) ? formAnswersObj[name] : null : null
}
