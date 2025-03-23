// Example for updating progress dynamically
document.getElementById('goal1').addEventListener('input', function() {
    let value = this.value;
    document.querySelector('#goal1 + p').textContent = value + '% completed';
});
