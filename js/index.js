
// Start of CONSTANTS

    var BASE_URL = "http://albatrosstest.azurewebsites.net//api/";

//end of CONSTANTS



// SetUp Functions

function loadHeaderAndFooter(){
  document.getElementById("header").innerHTML = '<span class="glyphicon glyphicon-th-list"></span>';
}

// End SetUp Function



// Round Functions
var ROUND;

function addRoundSetup(){

  var courses;

  $.ajax({
      type: 'GET',
      url: BASE_URL + 'course',
      async: false,
      contentType: "application/json", 
      success: function (response) {
        courses = response;
      },
      statusCode: {
        400: function (response) {
          
        }
       },
    });
  var courseSelect = document.getElementById("courseSelect");

  for(var i = 0;i<courses.length;i++){
    var newOption = document.createElement("option");
    newOption.text = courses[i].CourseName;
    newOption.value = courses[i].Id;
    courseSelect.appendChild(newOption);
  }
}

function addRound(){
  var courseSelect = document.getElementById("courseSelect");

  var id = generateUUID();
  localStorage.setItem("RoundId", id);
  var round = {"Id": id ,"CourseId": courseSelect.options[courseSelect.selectedIndex].value, "UserId": localStorage["UserId"]};
  
  $.ajax({
      type: 'POST',
      url: BASE_URL + 'round',
      async: false,
      data: JSON.stringify(round),
      contentType: "application/json", 
      success: function (response) {
        window.location.href = "roundView.html";
      },
      statusCode: {
        400: function (response) {
          
        }
       },
    });
}

function roundSetUp(RoundModal){
  var round;

  if(RoundModal == null){
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'round/' + localStorage["RoundId"],
        async: false,
        contentType: "application/json", 
        success: function (response) {
          round = response;
        },
        statusCode: {
          400: function (response) {
            
          }
         },
      });
    ROUND = round;
  }
  else
  {
    round = RoundModal;
    ROUND = round;
  }
  var roundView = document.getElementById("roundView");
  roundView.innerHTML = "";
  var roundHeader = document.getElementById("roundHeader");

  var frontShots = 0;
  var backShots = 0;

  for(var i = 0; i < round.RoundHoles.length;i++){
    if(i < 9){
    frontShots += (round.RoundHoles[i].Shots);
    }
    else{
      backShots += (round.RoundHoles[i].Shots);
    }
  }

  if(frontShots == 0) frontShots = " - ";
  if(backShots == 0) backShots = " - ";

  roundHeader.innerHTML = '<h2>' + round.Course.Name + '</h2>';
  
  roundView.appendChild(generateRowFront("Number", 9, round.Course.Holes, 1, "Out"));
  roundView.appendChild(generateRowFront("Par", 9, round.Course.Holes, 2, "36"));
  roundView.appendChild(generateRowFront("Score", round.RoundHoles.length, round.RoundHoles, 3, frontShots));
  roundView.appendChild(generateRowBack("Number", 9, round.Course.Holes, 1, "In"));
  roundView.appendChild(generateRowBack("Par", 9, round.Course.Holes, 2, "35"));
  roundView.appendChild(generateRowBack("Score", round.RoundHoles.length - 9, round.RoundHoles, 3, backShots));

}

function viewRound(){
  localStorage.setItem("RoundId", "3E65A7DB-CCA8-369C-C4D3-7E51B61A851F");
  window.location.href = "../Round/roundView.html";
}

function generateRowBack(rowName, size, list, listValue, LastColumn){
  var row = document.createElement("div");
  if(size < 0){
    size = 0;
  }
  row.className = "row";
  row.appendChild(generateBox(rowName, 'col-xs-2 Legend ' + rowName));
  for(var i = 0;i< size ;i++){
    switch(listValue) {
    case 1:
        row.appendChild(generateBox(list[9 + i].HoleNumber, "col-xs-1 Number"));
        break;
    case 2:
        row.appendChild(generateBox(list[9 + i].Par, "col-xs-1 Par"));
        break;
    case 3:
    var holeScore = checkScore(i + 9);
        row.appendChild(generateBox(list[9 + i].Shots, "col-xs-1 Score " + holeScore));
        break;
    } 
  }
  for(var i = 0;i<(9-size);i++)
  {
    switch(listValue) {
      case 1:
          row.appendChild(generateBox(" - ", "col-xs-1 Number"));
          break;
      case 2:
          row.appendChild(generateBox(" - ", "col-xs-1 Par"));
          break;
      case 3:
          row.appendChild(generateBox(" - ", "col-xs-1 Score"));
          break;
    }
  }
  row.appendChild(generateBox(LastColumn, 'col-xs-1 Total'));
  return row;
}

function generateRowFront(rowName, size, list, listValue, LastColumn){
  var row = document.createElement("div");
  if(size > 9){
    size = 9;
  }
  row.className = "row";
  row.appendChild(generateBox(rowName, 'col-xs-2 Legend ' + rowName));
  for(var i = 0;i< size ;i++){
    switch(listValue) {
    case 1:
        row.appendChild(generateBox(list[i].HoleNumber, "col-xs-1 Number"));
        break;
    case 2:
        row.appendChild(generateBox(list[i].Par, "col-xs-1 Par"));
        break;
    case 3:
        var holeScore = checkScore(i);
        row.appendChild(generateBox(list[i].Shots, "col-xs-1 Score " + holeScore));
        break;
    } 
  }
  for(var i = 0;i<(9-size);i++)
  {
    switch(listValue) {
      case 1:
          row.appendChild(generateBox(" - ", "col-xs-1 Number"));
          break;
      case 2:
          row.appendChild(generateBox(" - ", "col-xs-1 Par"));
          break;
      case 3:
          row.appendChild(generateBox(" - ", "col-xs-1 Score"));
          break;
    }
  }
  row.appendChild(generateBox(LastColumn, 'col-xs-1 Total'));
  return row;
}

function generateBox(content, className){
  var box = document.createElement("div"); 
  box.className = className;
  box.innerHTML = content;
  return box;
}

function addHole(){
  var score = document.getElementById("shots").value;
  var roundHole = {"HoleNumber": (ROUND.RoundHoles.length + 1), "Shots": score, "HoleId": ROUND.Course.Holes[ROUND.RoundHoles.length].Id ,"RoundId": localStorage["RoundId"], "UserId": localStorage["UserId"]};

  $.ajax({
      type: 'POST',
      url: BASE_URL + 'round/1',
      async: false,
      data: JSON.stringify(roundHole),
      contentType: "application/json", 
      success: function (response) {
        roundModel = response;
      },
      statusCode: {
        400: function (response) {
          
        }
       },
    });

  roundSetUp(roundModel);
  $('#myModal').modal('hide');
}

function checkScore(i){
  if(ROUND.RoundHoles[i].Shots < ROUND.Course.Holes[i].Par){
    return "UnderPar";
  }
  else if(ROUND.RoundHoles[i].Shots > ROUND.Course.Holes[i].Par)
  {
    return "OverPar";
  }
}

//End of Round Functions



//User Functions

function checkPasswordMatch(){
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    if(password.value != confirmPassword.value)
    {
      confirmPassword.style.border = "2px solid #D43F3F";
    }
    else
    {
      confirmPassword.style.border = "2px solid #6A9A1F";
    }
}

function signUp(){
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirmPassword");
  var loginData = {"Name": name.value, "Email": email.value, "Password": Sha256.hash(password.value) }; 

  if (email.value == "") {
    document.getElementById("alert").innerHTML = '<span class="label label-danger">Oh-Oh</span> Email cannot be empty!!';
    return 0;
  }
  else if (password.value == "") {
    document.getElementById("alert").innerHTML = '<span class="label label-danger">Oh-Oh</span> Password cannot be empty!!';
    return 0;
  }
  else if(password.value != confirmPassword.value)
  {
    document.getElementById("alert").innerHTML = '<span class="label label-danger">Oh-Oh</span> Your Passwords Dont Match!!';
    return 0;
  }

    $.ajax({
      type: 'POST',
      url: BASE_URL + 'login/1',
      async: false,
      data: JSON.stringify(loginData),
      contentType: "application/json", 
      success: function (response) {
        window.location.href = "../home/index.html";
      },
      statusCode: {
        400: function (response) {
          document.getElementById("alert").innerHTML = '<span class="label label-danger">Oh-Oh</span> That Email Already has and Account!!';
        }
       },
    });
}

function logIn(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var loginData = { "Email": email.value, "Password": Sha256.hash(password.value) }; 

  $.ajax({
      type: 'POST',
      url: BASE_URL + 'login',
      async: false,
      data: JSON.stringify(loginData),
      contentType: "application/json", 
      success: function (response) {
        if(response == "NotFound")
        {
          document.getElementById("alert").innerHTML = '<span class="label label-danger">Oh-Oh</span> That Email doesn\'t have and Account!!';
        }
        else if(response == "Unauthorized")
        {
          document.getElementById("alert").innerHTML = '<span class="label label-danger">Oh-Oh</span> That Email and Password don\'t Match!!';
        }
        else
        {
          localStorage.setItem("UserId", response);
          localStorage.setItem("xkkjJjasdK", "SignedIn");
          window.location.href = "home/index.html";
        }
      }
    });
}

function checkIfLoggedIn(){
  var status = localStorage["xkkjJjasdK"];
  if(status == "SignedIn"){
    window.location.href = "home/index.html";
  }
}

//End of User Functions



//Global Functions

var Sha256 = {};  // Sha256 namespace

Sha256.hash = function(msg, utf8encode) {
    utf8encode =  (typeof utf8encode == 'undefined') ? true : utf8encode;
    
    // convert string to UTF-8, as SHA only deals with byte-streams
    if (utf8encode) msg = Utf8.encode(msg);
    
    // constants [§4.2.2]
    var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
             0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
             0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
             0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
             0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
             0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
             0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
             0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    // initial hash value [§5.3.1]
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

    // PREPROCESSING 
 
    msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

    // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
    var l = msg.length/4 + 2;  // length (in 32-bit integers) of msg + ‘1’ + appended length
    var N = Math.ceil(l/16);   // number of 16-integer-blocks required to hold 'l' ints
    var M = new Array(N);

    for (var i=0; i<N; i++) {
        M[i] = new Array(16);
        for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
            M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | 
                      (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
        } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
    }
    // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
    // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
    // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
    M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
    M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;


    // HASH COMPUTATION [§6.1.2]

    var W = new Array(64); var a, b, c, d, e, f, g, h;
    for (var i=0; i<N; i++) {

        // 1 - prepare message schedule 'W'
        for (var t=0;  t<16; t++) W[t] = M[i][t];
        for (var t=16; t<64; t++) W[t] = (Sha256.sigma1(W[t-2]) + W[t-7] + Sha256.sigma0(W[t-15]) + W[t-16]) & 0xffffffff;

        // 2 - initialise working variables a, b, c, d, e, f, g, h with previous hash value
        a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];

        // 3 - main loop (note 'addition modulo 2^32')
        for (var t=0; t<64; t++) {
            var T1 = h + Sha256.Sigma1(e) + Sha256.Ch(e, f, g) + K[t] + W[t];
            var T2 = Sha256.Sigma0(a) + Sha256.Maj(a, b, c);
            h = g;
            g = f;
            f = e;
            e = (d + T1) & 0xffffffff;
            d = c;
            c = b;
            b = a;
            a = (T1 + T2) & 0xffffffff;
        }
         // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
        H[0] = (H[0]+a) & 0xffffffff;
        H[1] = (H[1]+b) & 0xffffffff; 
        H[2] = (H[2]+c) & 0xffffffff; 
        H[3] = (H[3]+d) & 0xffffffff; 
        H[4] = (H[4]+e) & 0xffffffff;
        H[5] = (H[5]+f) & 0xffffffff;
        H[6] = (H[6]+g) & 0xffffffff; 
        H[7] = (H[7]+h) & 0xffffffff; 
    }

    return Sha256.toHexStr(H[0]) + Sha256.toHexStr(H[1]) + Sha256.toHexStr(H[2]) + Sha256.toHexStr(H[3]) + 
           Sha256.toHexStr(H[4]) + Sha256.toHexStr(H[5]) + Sha256.toHexStr(H[6]) + Sha256.toHexStr(H[7]);
}

Sha256.ROTR = function(n, x) { return (x >>> n) | (x << (32-n)); }
Sha256.Sigma0 = function(x) { return Sha256.ROTR(2,  x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x); }
Sha256.Sigma1 = function(x) { return Sha256.ROTR(6,  x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x); }
Sha256.sigma0 = function(x) { return Sha256.ROTR(7,  x) ^ Sha256.ROTR(18, x) ^ (x>>>3);  }
Sha256.sigma1 = function(x) { return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ (x>>>10); }
Sha256.Ch = function(x, y, z)  { return (x & y) ^ (~x & z); }
Sha256.Maj = function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); }

Sha256.toHexStr = function(n) {
  var s="", v;
  for (var i=7; i>=0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); }
  return s;
}

var Utf8 = {};  // Utf8 namespace

Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}

Utf8.decode = function(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  return strUni;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};