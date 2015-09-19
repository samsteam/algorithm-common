module.exports = {
//HACK: string like "a1r"
//      or also     "bf"
//  First char is name.
//  Second char is page nummber or finished flag.
//  In case of a page number, a mode is required.
rf: function (string) {
  string = string.toLowerCase();
  var req = {};
  req.process = string[0];
  if (string[1] == "f") {
    req.pageNumber = 0;
    req.mode = "finish";
  } else {
    req.pageNumber = string[1];
    switch (string[2]) {
      case "r":
        req.mode = "read";
        break;
      case "m":
        req.mode = "write";
        break;
      default:
        req.mode = "read";
    }
  }
  return req;
  },

//HACK: string like "a1premfb"
//  First char is name.
//  Second is page number.
//  Next chars are all optional with this meaning:
//  p: Pagefault.
//  r: Required.
//  e: rEferenced.
//  m: Modified.
//  f: Finished.
//  b: reservedforpageBuffering.

ff: function (string) {
  string = string.toLowerCase();
  var frame = {};
  frame.process = string[0];
  frame.pageNumber = string[1];
  string = string.slice(2, string.length);
  frame.pageFault = string.match(/p/) === null ? false : true;
  frame.required = string.match(/r/) === null ? false : true;
  frame.referenced = string.match(/e/) === null ? false : true;
  frame.modified = string.match(/m/) === null ? false : true;
  frame.finished = string.match(/f/) === null ? false : true;
  frame.reservedForPageBuffering = false;

  return frame;
},

pb: function () {
  string = string.toLowerCase();
  var frame = {};
  frame.process = "";
  frame.pageNumber = 0;
  frame.pageFault = false;
  frame.required = false;
  frame.referenced = false;
  frame.modified = false;
  frame.finished = false;
  frame.reservedForPageBuffering = true;
},

//HACK: string like "a1emf"
//  First char is name.
//  Second is page number.
//  Next chars are all optional with this meaning:
//  e: rEferenced.
//  m: Modified.
//  f: Finished.
vf: function (string) {
  string = string.toLowerCase();
  var frame = {};
  frame.process = string[0];
  frame.pageNumber = string[1];
  string = string.slice(2, string.length);
  frame.referenced = string.match(/e/);
  frame.modified = string.match(/m/);
  frame.finished = string.match(/f/);

  return frame;
}
};