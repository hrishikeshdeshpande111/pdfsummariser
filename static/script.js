const uploadArea = document.querySelector('.upload-area');
const resetButton = document.getElementById('reset-button');
const loadingIndicator = document.getElementById('loading');
const summaryElement = document.querySelector('.summary');
const fileInput = document.getElementById('file-input');
const fileInfo = document.querySelector('.file-info');
const form = document.querySelector('form'); // Get the form element

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    fileInput.files = e.dataTransfer.files;
    uploadArea.classList.add('selected');
    fileInfo.textContent = `File selected: ${fileInput.files[0].name}`;
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        uploadArea.classList.add('selected');
        fileInfo.textContent = `File selected: ${fileInput.files[0].name}`;
    } else {
        uploadArea.classList.remove('selected');
        fileInfo.textContent = 'Drag and drop a PDF file here, or click to choose a file.';
    }
});

resetButton.addEventListener('click', () => {
    summaryElement.textContent = '';
    uploadArea.classList.remove('selected');
    fileInput.value = '';
    fileInfo.textContent = 'Drag and drop a PDF file here, or click to choose a file.';
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
    loadingIndicator.style.display = 'block'; // Show loading indicator
    setTimeout(() => {
        form.submit(); // Manually submit the form after a delay (for demonstration purposes)
    }, 1000); // Simulate a delay of 1 second (adjust as needed)
});