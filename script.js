document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const courseForm = document.getElementById("courseForm");
    const displayTasksBtn = document.getElementById("displayTasksBtn");
    const displayCoursesBtn = document.getElementById("displayCoursesBtn");
    const taskList = document.getElementById("taskList");
    const courseList = document.getElementById("courseList");

    taskForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(taskForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/courses/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Task added successfully!");
            taskForm.reset();
        } else {
            alert("Error adding task.");
        }
    });

    courseForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(courseForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Course added successfully!");
            courseForm.reset();
        } else {
            alert("Error adding course.");
        }
    });

    displayTasksBtn.addEventListener("click", async () => {
        const response = await fetch("/courses/tasks");
        const tasks = await response.json();
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `${task.taskName} (Due: ${new Date(task.dueDate).toLocaleDateString()}) 
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>`;
            taskList.appendChild(li);
        });
    });

    displayCoursesBtn.addEventListener("click", async () => {
        const response = await fetch("/courses");
        const courses = await response.json();
        courseList.innerHTML = "";
        courses.forEach(course => {
            const li = document.createElement("li");
            li.innerHTML = `${course.courseName} (${course.courseId}) 
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>`;
            courseList.appendChild(li);
        });
    });

    taskList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
            // Handle delete
        } else if (e.target.classList.contains("edit-btn")) {
            // Handle edit
        }
    });

    courseList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
            // Handle delete
        } else if (e.target.classList.contains("edit-btn")) {
            // Handle edit
        }
    });
});
