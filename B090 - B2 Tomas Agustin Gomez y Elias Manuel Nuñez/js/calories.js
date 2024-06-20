document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://667351986ca902ae11b3da1e.mockapi.io/api/recipes/recipes';
    const recipeSelect = document.getElementById('recipeSelect');
    const calorieForm = document.getElementById('calorieForm');
    const quantityInput = document.getElementById('quantityInput');
    const caloriesHistory = document.getElementById('caloriesHistory').getElementsByTagName('tbody')[0];
    const totalCaloriesElement = document.getElementById('totalCalories');
    let historyData = [];

    // recetas desde el API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(recipe => {
                const option = document.createElement('option');
                option.value = recipe.calories_per_serving;
                option.textContent = recipe.name;
                recipeSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar las recetas:', error));

    // calculo de calorias
    calorieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const recipeName = recipeSelect.options[recipeSelect.selectedIndex].textContent;
        const caloriesPerServing = parseFloat(recipeSelect.value);
        const quantity = parseInt(quantityInput.value);
        const total = caloriesPerServing * quantity;

        const newEntry = { id: Date.now(), recipe: recipeName, quantity, calories: total };
        historyData.push(newEntry);
        updateHistoryTable();
        updateTotalCalories();
    });

    // tabla de historial de calorias
    function updateHistoryTable() {
        caloriesHistory.innerHTML = '';
        historyData.forEach(entry => {
            const row = caloriesHistory.insertRow();
            const nameCell = row.insertCell(0);
            const quantityCell = row.insertCell(1);
            const caloriesCell = row.insertCell(2);
            const actionsCell = row.insertCell(3);

            nameCell.textContent = entry.recipe;
            quantityCell.innerHTML = `<span>${entry.quantity}</span> <input type="number" value="${entry.quantity}" style="display:none;" min="1">`;
            caloriesCell.textContent = entry.calories;

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn_table');
            editButton.addEventListener('click', () => {
                const span = quantityCell.querySelector('span');
                const input = quantityCell.querySelector('input');
                const isEditing = input.style.display === 'inline-block';
                if (isEditing) {
                    span.style.display = 'inline';
                    input.style.display = 'none';
                    entry.quantity = parseInt(input.value);
                    entry.calories = parseFloat(recipeSelect.value) * entry.quantity;
                    span.textContent = entry.quantity;
                    caloriesCell.textContent = entry.calories;
                    updateTotalCalories();
                    editButton.textContent = 'Editar';
                } else {
                    span.style.display = 'none';
                    input.style.display = 'inline-block';
                    editButton.textContent = 'Guardar';
                }
            });
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('btn_table');
            deleteButton.addEventListener('click', () => deleteEntry(entry.id));
            actionsCell.appendChild(deleteButton);
        });
    }

    // eliminar una linea de historial
    function deleteEntry(id) {
        historyData = historyData.filter(item => item.id !== id);
        updateHistoryTable();
        updateTotalCalories();
    }

    // suma total
    function updateTotalCalories() {
        const totalCalories = historyData.reduce((sum, entry) => sum + entry.calories, 0);
        totalCaloriesElement.textContent = totalCalories;
    }
});


