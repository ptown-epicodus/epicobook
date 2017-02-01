// Business logic
var accounts = [ ];

function Account(firstName, lastName, email, githubPage, hobbies, favColor, favDestination, codingExp, previousJob, whereFrom, location) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.gitHubHandle = githubPage;
  this.hobbies = hobbies;
  this.favoriteColor = favColor;
  this.favoriteDestination = favDestination;
  this.codingExperience = codingExp;
  this.previousJob = previousJob;
  this.whereFrom = whereFrom;
  this.location = location;
}

Account.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
};

var alphabeticalSort = function() {
  accounts.sort(function(a, b) {
    var nameA = a.lastName.toUpperCase();
    var nameB = b.lastName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  });
};

var sortByExperience = function() {
  accounts.sort(function(a, b) {
    var expA = 0;
    var expB = 0;
    var experienceLevels = [
      ["None", 0],
      ["Between 1-4 weeks", 1],
      ["Between 1-4 months", 2],
      ["More than a year", 3],
      ["Over 5 years", 4]
    ];

    experienceLevels.forEach(function(keyValue) {
      if (keyValue[0] === a.codingExperience) {
        expA = keyValue[1];
      }
      if (keyValue[0] === b.codingExperience) {
        expB = keyValue[1];
      }
    });

    if (expA < expB) {
      return -1;
    }
    if (expA > expB) {
      return 1;
    }
  });
};


// Front-end logic
$(document).ready(function() {
  alphabeticalSort();
  displayStudents();

  $("#sort-tabs li").click(function(event) {
    event.preventDefault();
    $("li").removeClass("active");
    $(this).addClass("active");
  });

  $("#one").click(function() {
    alphabeticalSort();
    displayStudents();
  });
  $("#two").click(function() {
    sortByExperience();
    displayStudents();
  });

  $("#form-panel").submit(function(event) {
    event.preventDefault();
    $("#thanks").show();

    $("#form-panel").hide();
    var userFirstName = $("#first-name").val();
    var userLastName = $("#last-name").val();
    var email, gitHub, hobbies, favColor, favDestination, codingExp, job, whereFrom, location;

    email = $("#email").val();
    gitHub = $("#git-repo").val();
    hobbies = $("#hobbies").val().split(/\s,\s/);
    favColor = $("#fav-color").val();
    favDestination = $("#favorite-destination").val();
    codingExp = $("#experience").val();
    job = $("#job").val();
    whereFrom = $("#user-from").val();
    location = $("#location").val();


    var account = new Account(userFirstName, userLastName, email, gitHub, hobbies, favColor, favDestination, codingExp, job, whereFrom, location);
    accounts.push(account);

    displayStudents();
  });

  document.getElementById("homelink").onclick = function() {
    location.href = "index.html";
  };
  document.getElementById("joinlink").onclick = function() {
    location.href = "join.html";
  };
  document.getElementById("matchlink").onclick = function() {
    location.href = "match.html";
  };
  document.getElementById("forumlink").onclick = function() {
    location.href = "http://forum.epicodus.com/login";
  };
});

var displayStudents = function() {
  $("#student-list").empty();
  $("#accounts-list").empty();
  accounts.forEach(function(element) {
    addStudent(element);
  });
};

var addStudent = function(student) {
  $("#student-list").append("<li><span class='students'>" + student.fullName() + "</span></li>");
  $("#accounts-list").append("<li><span class='students'>" + student.fullName() + "</span></li>");

  $("#accounts-list li").last().click(function() {
    $("#accounts-info .first-name").text(student.firstName);
    $("#accounts-info .last-name").text(student.lastName);
    $("#student-info .email").text(student.email);
    $("#accounts-info .hobbies").text(student.hobbies.join(", "));
    $("#accounts-info .experience").text(student.codingExperience);
    $("#accounts-info .favorite-destination").text(student.favoriteDestination);
    $("#accounts-info .user-from").text(student.whereFrom);
    $("#accounts-info .job").text(student.previousJob);
    $("#accounts-info .location").text(student.location);
    var userGitHubURL = 'https://github.com/' + student.gitHubHandle;

    $("#repo-link").text(userGitHubURL);
    $("#repo-link").attr('href', userGitHubURL);

    $("#accounts-info").css("color", student.favoriteColor);
    $("#accounts-info").show();
  });
};
