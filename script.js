// Load existing goals from localStorage
document.addEventListener('DOMContentLoaded', () => {
    loadGoals();
});

// Function to load goals from localStorage
function loadGoals() {
    const goalList = document.getElementById('goalList');
    const progressBar = document.getElementById('progressBar');
    goalList.innerHTML = '';
    progressBar.innerHTML = '';

    // Get stored goals from localStorage
    const goals = JSON.parse(localStorage.getItem('goals')) || [];

    // Display goals in list and progress bars
    goals.forEach((goal, index) => {
        const goalItem = document.createElement('li');
        goalItem.innerHTML = `
            <strong>${goal.name}</strong> - ${goal.progress}% completed
            <input type="number" min="0" max="100" value="${goal.progress}" onchange="updateProgress(${index}, this.value)">
            <button onclick="deleteGoal(${index})">Delete</button>
        `;
        goalList.appendChild(goalItem);

        const progressItem = document.createElement('div');
        progressItem.innerHTML = `
            <label for="goal${index}">${goal.name}</label>
            <progress id="goal${index}" value="${goal.progress}" max="100"></progress>
            <p>${goal.progress}% completed</p>
        `;
        progressBar.appendChild(progressItem);
    });
}

// Function to handle adding new goal
document.getElementById('goalForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const goalName = document.getElementById('goalName').value;
    const goalProgress = parseInt(document.getElementById('goalProgress').value);

    if (goalName && !isNaN(goalProgress) && goalProgress >= 0 && goalProgress <= 100) {
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push({ name: goalName, progress: goalProgress });
        localStorage.setItem('goals', JSON.stringify(goals));

        // Reset form and reload goals
        document.getElementById('goalForm').reset();
        loadGoals();
    }
});

// Function to update the progress of a goal
function updateProgress(index, progress) {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals[index].progress = progress;
    localStorage.setItem('goals', JSON.stringify(goals));
    loadGoals();
}

// Function to delete a goal
function deleteGoal(index) {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    loadGoals();
}
