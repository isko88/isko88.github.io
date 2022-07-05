// The object
var obj = {
    a: 5,
    b: function (param) {
        return param;
    }
};

// Convert to JSON using a replacer function to output
// the string version of a function with /Function(
// in front and )/ at the end.
var json = JSON.stringify(obj, function(key, value) {
  if (typeof value === "function") {
    return "/Function(" + value.toString() + ")/";
  }
  return value;
});

// Convert to an object using a reviver function that
// recognizes the /Function(...)/ value and converts it
// into a function via -shudder- `eval`.
var obj2 = JSON.parse(json, function(key, value) {
  if (typeof value === "string" &&
      value.startsWith("/Function(") &&
      value.endsWith(")/")) {
    value = value.substring(10, value.length - 2);
    return (0, eval)("(" + value + ")");
  }
  return value;
});
document.body.innerHTML = obj2.b(42);
