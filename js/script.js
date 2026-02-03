// Mengambil elemen DOM
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoTableBody = document.getElementById('todoTableBody');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterBtn = document.getElementById('filterBtn');
const emptyMessage = document.getElementById('emptyMessage');

// Array untuk menyimpan data todos
let todos = [];

// Event Listener untuk tombol Add
addBtn.addEventListener('click', () => {
    const taskValue = taskInput.value.trim();
    const dateValue = dateInput.value;

    // 2. Validate Input Form (Sesuai instruksi)
    if (taskValue === '' || dateValue === '') {
        alert("Please fill in both Task and Due Date!");
        return;
    }

    const newTodo = {
        id: Date.now(), // unik ID
        task: taskValue,
        date: dateValue,
        completed: false
    };

    todos.push(newTodo);
    saveAndRender(); // Simpan & Tampilkan
    
    // Reset form
    taskInput.value = '';
    dateInput.value = '';
});

// Event Listener untuk tombol Delete All
deleteAllBtn.addEventListener('click', () => {
    if(confirm("Are you sure you want to delete all tasks?")) {
        todos = [];
        saveAndRender();
    }
});

// Event Listener untuk Filter
filterBtn.addEventListener('change', () => {
    renderTodos();
});

// Fungsi Utama Render (Menampilkan) Data
function renderTodos() {
    todoTableBody.innerHTML = ''; // Bersihkan tabel sebelum render ulang
    
    const filterValue = filterBtn.value;
    
    // Filter logika
    let filteredTodos = todos;
    if (filterValue === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filterValue === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    // Cek jika kosong
    if (filteredTodos.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }

    // Loop data dan buat elemen HTML
    filteredTodos.forEach(todo => {
        const row = document.createElement('tr');
        
        // Status Badge logic
        const statusBadge = todo.completed 
            ? '<span class="status-badge status-completed">Completed</span>' 
            : '<span class="status-badge status-pending">Pending</span>';
        
        // Coret teks jika selesai
        const textDecoration = todo.completed ? 'text-decoration: line-through; color: #777;' : '';

        row.innerHTML = `
            <td style="${textDecoration}">${todo.task}</td>
            <td>${todo.date}</td>
            <td>${statusBadge}</td>
            <td>
                <button onclick="toggleComplete(${todo.id})" class="action-btn check-btn">
                    <i class="fas fa-check"></i>
                </button>
                <button onclick="deleteTodo(${todo.id})" class="action-btn delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        todoTableBody.appendChild(row);
    });
}

// Fungsi Hapus Satu Item (Harus global agar bisa dipanggil onclick di HTML)
window.deleteTodo = function(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRender();
}

// Fungsi Tandai Selesai (Toggle)
window.toggleComplete = function(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveAndRender();
    }
}

// Fungsi bantu untuk menyimpan (jika ingin pakai LocalStorage nanti) dan render
function saveAndRender() {
    // Opsional: localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Initial render
renderTodos();