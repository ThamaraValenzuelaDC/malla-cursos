const courses = document.querySelectorAll(".course");
const selectedCourses = new Set();

function actualizarDesbloqueos() {
  courses.forEach(course => {
    const courseName = course.dataset.name;
    const prereqs = course.dataset.prereq
      ? course.dataset.prereq.split(",").map(p => p.trim())
      : [];

    const cumplidos = prereqs.every(p => selectedCourses.has(p));

    if (selectedCourses.has(courseName)) {
      course.classList.remove("locked", "unlocked");
      course.classList.add("highlight");
    } else if (cumplidos) {
      course.classList.remove("locked", "highlight");
      course.classList.add("unlocked");
    } else {
      course.classList.remove("unlocked", "highlight");
      course.classList.add("locked");
    }
  });
}

function desmarcarCurso(nombre) {
  selectedCourses.delete(nombre);

  courses.forEach(c => {
    const prereqs = c.dataset.prereq
      ? c.dataset.prereq.split(",").map(p => p.trim())
      : [];
    if (prereqs.includes(nombre) && selectedCourses.has(c.dataset.name)) {
      desmarcarCurso(c.dataset.name);
    }
  });
}

courses.forEach(course => {
  course.addEventListener("click", () => {
    const courseName = course.dataset.name;

    if (selectedCourses.has(courseName)) {
      desmarcarCurso(courseName);
    } else {
      if (course.classList.contains("unlocked")) {
        selectedCourses.add(courseName);
      }
    }

    actualizarDesbloqueos();
  });
});

actualizarDesbloqueos();

const themeToggle = document.getElementById("toggle-theme");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
});
