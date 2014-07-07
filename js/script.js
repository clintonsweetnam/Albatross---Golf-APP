function signUp()
{   
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var loginData = {"Email": email,"Password": password}; 

    // var test = true
    // if(!fname.match(/\S/)) {
    //      document.getElementById("fName").style.borderColor = "#FF4D4D";
    //      document.getElementById("fName").style.borderWidth = "1px";
    //     test = false;
    // }
    // else{
    //    document.getElementById("fName").style.borderColor = "#7ACC29";
    //     document.getElementById("fName").style.borderWidth = "1px";
    // }
    //  if(!lname.match(/\S/)) {
    //      document.getElementById("lName").style.borderColor = "#FF4D4D";
    //      document.getElementById("lName").style.borderWidth = "1px";
    //     test = false;
    // }else{
    //    document.getElementById("lName").style.borderColor = "#7ACC29";
    //     document.getElementById("lName").style.borderWidth = "1px";
    // }
    //  if(!email.match(/\S/)) {
    //      document.getElementById("email").style.borderColor = "#FF4D4D";
    //      document.getElementById("email").style.borderWidth = "1px";
    //     test = false;
    // }else{
    //    document.getElementById("email").style.borderColor = "#7ACC29";
    //     document.getElementById("email").style.borderWidth = "1px";
    // }
    //  if(!password.match(/\S/)) {
    //      document.getElementById("password").style.borderColor = "#FF4D4D";
    //      document.getElementById("password").style.borderWidth = "1px";
    //     return false;
    // }else{
    //    document.getElementById("password").style.borderColor = "#7ACC29";
    //     document.getElementById("password").style.borderWidth = "1px";
    // }
    
    // if(test == false)
    //     return false;
    
     $.ajax({
                type: 'POST',
                //contentType : 'application/json',
                url: 'http://localhost:44806/api/login',
                async: false,
                dataType : 'json',
                data: JSON.stringify(loginData),
                contentType: 'application/json',
                statusCode: {
                    200: function (response) {
                        window.location = "success.html";
                        var obj = JSON.stringify(response);
                        //document.write("Congrates + " + obj);
                    },
                    401: function (response) {
                        alert("Failure");
                        window.location = "success.html";
                    }
           },

        });

}

function getRound()
{    
    var course;
     $.ajax({
                type: 'GET',
                //contentType : 'application/json',
                url: 'http://localhost:44806/api/course/f5143187-832d-4fee-899a-2eb942de792c',
                async: false,
                dataType : 'json',
                contentType: 'application/json',
                statusCode: {
                    200: function (response) {
                        window.location = "success.html";
                        course = response;
                    },
                    401: function (response) {
                        alert("Failure");
                        window.location = "success.html";
                    }
           },

        });
    var output = ("<h1> Course : " + course.Course.Coursename + "</h1><hr />");
    for(var i = 0; i < course.CourseHoles.length; i++)
    {
        output += "<h2> Number : " + JSON.stringify(course.CourseHoles[i].Holenumber) + "</h2>";
        output += "<h3> Par : " + JSON.stringify(course.CourseHoles[i].Par) + "</h2>";
        output += "<h3> Index : " + JSON.stringify(course.CourseHoles[i].Courseindex) + "</h2>";
        output += "<h3> Length : " + JSON.stringify(course.CourseHoles[i].Length) + "</h2>";
        output += "<hr />"
    }
    document.write(output);
}