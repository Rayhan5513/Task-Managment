<script>
    let tasks = [];

    function renderTasks(parent, taskArray) {
      parent.innerHTML = ''; // Clear existing content

      taskArray.forEach((task, index) => {
        const taskElement = createTaskElement(task, index, taskArray);
        parent.appendChild(taskElement);
      });
    }

    function addTask() {
      const taskName = document.getElementById("task-name").value;
      const deadline = document.getElementById("deadline").value;
      const errorMessageDiv = document.getElementById("error-message");

      if (!taskName || !deadline) {
        errorMessageDiv.textContent = "Please enter both task name and deadline.";
        return;
      }

      errorMessageDiv.textContent = ""; // Clear any previous error messages

      const newTask = {
        name: taskName,
        deadline: deadline,
        subtasks: []
      };

      tasks.push(newTask);
      document.getElementById("task-name").value = ''; // Clear input field
      document.getElementById("deadline").value = ''; // Clear deadline field

      renderTasks(document.getElementById("task-list"), tasks);
    }

    function createTaskElement(task, index, taskArray) {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      taskDiv.draggable = true; // Enable drag on task

      const taskTitle = document.createElement("h3");
      taskTitle.textContent = task.name;
      taskDiv.appendChild(taskTitle);

      const deadline = document.createElement("small");
      deadline.className = "deadline";
      deadline.textContent = `Deadline: ${task.deadline}`;
      taskDiv.appendChild(deadline);

      const subTaskList = document.createElement("ul");

      task.subtasks.forEach((subtask, subIndex) => {
        const subtaskElement = createTaskElement(subtask, subIndex, task.subtasks);
        const listItem = document.createElement("li");
        listItem.appendChild(subtaskElement);
        subTaskList.appendChild(listItem);
      });

      taskDiv.appendChild(subTaskList);

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "task-actions";
      
      const addSubTaskBtn = document.createElement("button");
      addSubTaskBtn.textContent = "Add Subtask";
      addSubTaskBtn.onclick = () => toggleSubtaskInput(task, taskDiv);
      actionsDiv.appendChild(addSubTaskBtn);

      const removeTaskBtn = document.createElement("button");
      removeTaskBtn.textContent = "Remove Task";
      removeTaskBtn.onclick = () => removeTask(taskArray, index);
      actionsDiv.appendChild(removeTaskBtn);

      taskDiv.appendChild(actionsDiv);

      return taskDiv;
    }

    function removeTask(taskArray, index) {
      taskArray.splice(index, 1);
      renderTasks(document.getElementById("task-list"), tasks);
    }

    function toggleSubtaskInput(parentTask, taskDiv) {
      let subtaskInputContainer = taskDiv.querySelector('.subtask-input');
      
      if (subtaskInputContainer) {
        subtaskInputContainer.remove(); // Toggle off if already visible
      } else {
        subtaskInputContainer = document.createElement("div");
        subtaskInputContainer.className = "subtask-input";
        
        const subTaskNameInput = document.createElement("input");
        subTaskNameInput.type = "text";
        subTaskNameInput.placeholder = "Enter Subtask Name";
        subtaskInputContainer.appendChild(subTaskNameInput);

        const subTaskDeadlineInput = document.createElement("input");
        subTaskDeadlineInput.type = "date";
        subtaskInputContainer.appendChild(subTaskDeadlineInput);

        const subTaskAddBtn = document.createElement("button");
        subTaskAddBtn.textContent = "Add Subtask";
        subTaskAddBtn.onclick = () => {
          const subTaskName = subTaskNameInput.value;
          const subTaskDeadline = subTaskDeadlineInput.value;

          if (!subTaskName || !subTaskDeadline) {
            alert("Please enter both subtask name and deadline.");
            return;
          }

          const newSubTask = {
            name: subTaskName,
            deadline: subTaskDeadline,
            subtasks: []
          };

          parentTask.subtasks.push(newSubTask);
          renderTasks(document.getElementById("task-list"), tasks); // Re-render tasks
        };

        subtaskInputContainer.appendChild(subTaskAddBtn);
        taskDiv.appendChild(subtaskInputContainer); // Append subtask input fields to task div
      }
    }

    renderTasks(document.getElementById("task-list"), tasks);
  </script>