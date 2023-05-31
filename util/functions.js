export function number_format(number, decimals, dec_point, thousands_sep) {
  // Strip all characters but numerical ones.
  number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

export function roundNearest(value, nearest) {
  return Math.round(value / nearest) * nearest;
}

export function findSingleData(dataId, array) {
  if (array.findIndex((element) => element.id === dataId) === -1) {
    return 0;
  } else {
    return array.find(({ id }) => id === dataId);
  }
}

export function calculateMinMax(object, mainInsurance, surface, surfaceValue, mainPolicy) {
  const { id, formula, min, max, recommended, maxValue, minValue } = object;

  let minimum = 0;
  let maximum = 0;
  let ideal = 0;

  switch (formula) {
    case "main":
      minimum = Math.min(
        roundNearest(surfaceValue * parseFloat(min) * surface, 10000),
        maxValue
      );

      maximum = Math.min(
        roundNearest(surfaceValue * max * surface, 10000),
        maxValue
      );
      ideal = Math.min(
        roundNearest(surfaceValue * recommended * surface, 10000),
        maximum
      );
      break;
    case "coefficients":
      minimum = mainInsurance * min;
      maximum = mainInsurance * max;
      ideal = mainInsurance * recommended;
      break;
    case "fixed-1":
      minimum = minValue;
      maximum = Math.min(
        roundNearest(surfaceValue * mainPolicy.max * surface, 10000),
        mainPolicy.maxValue
      );
      ideal = Math.max(mainInsurance * recommended, minimum);
      break;
  }
  return { minimum, maximum, ideal };
}
