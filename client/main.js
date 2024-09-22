var courseApi = 'http://localhost:3000/courses';

function start() {
  getCourses(renderCourses);
  handleCreate();
}

start();

function getCourses(callback) {
  fetch(courseApi)
    .then(response => response.json())
    .then(callback);
}

function renderCourses(courses) {
  var htmls = courses.map(function(course) {
    return `<li class="item-${course.id}">
      <h4>${course.name}</h4>
      <p>${course.description}</p>
      <button onclick="handleDeleteCourse('${course.id}')">Delete</button>
      <button onclick="handleEditCourse('${course.id}', '${course.name}', '${course.description}')">Edit</button>
    </li>`;
  });
  document.getElementById("course-list").innerHTML = htmls.join('');
}

function createCourse(data, callback) {
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(courseApi, options)
    .then(response => response.json())
    .then(callback);
}

function handleDeleteCourse(id) {
  var options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  fetch(`${courseApi}/${id}`, options)
    .then(response => response.json())
    .then(() => {
      var courseItem = document.querySelector('.item-' + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

function handleEditCourse(id, name, description) {
  document.getElementById('course-name').value = name;
  document.getElementById('course-description').value = description;
  document.getElementById('create-btn').textContent='Update';
  document.getElementById('create-btn').onclick = function() {
    updateCourse(id, {
      name: document.getElementById('course-name').value,
      description: document.getElementById('course-description').value
    });
  };
}

function updateCourse(id, data) {
  var options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(`${courseApi}/${id}`, options)
    .then(response => response.json())
    .then(() => {
      getCourses(renderCourses);
    });
}

function handleCreate() {
  var createBtn = document.getElementById("create-btn");
  createBtn.onclick = function() {
    var name = document.getElementById('course-name').value;
    var description = document.getElementById('course-description').value;
    var formData = {
      name: name,
      description: description
    }
    createCourse(formData, function() {
      getCourses(renderCourses);
    });
  }
}
