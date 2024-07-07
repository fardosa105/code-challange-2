document.addEventListener('DOMContentLoaded', () => 
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const shoppingListContainer = document.getElementById('shopping-list');
    const clearButton = document.getElementById('clear-button');

    function renderList() {
        shoppingListContainer.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.text;
            li.classList.toggle('purchased', item.purchased);
            
            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('item-actions');

            const toggleButton = document.createElement('button');
            toggleButton.textContent = item.purchased ? 'Unmark' : 'Mark';
            toggleButton.addEventListener('click', () => togglePurchased(index));

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editItem(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteItem(index));

            actionsDiv.appendChild(toggleButton);
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);

            li.appendChild(actionsDiv);
            shoppingListContainer.appendChild(li);
        });
    }

    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText) {
            shoppingList.push({ text: itemText, purchased: false });
            itemInput.value = '';
            updateList();
        }
    }

    function togglePurchased(index) {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        updateList();
    }

    function editItem(index) {
        const newText = prompt('Edit item:', shoppingList[index].text);
        if (newText !== null && newText.trim() !== '') {
            shoppingList[index].text = newText.trim();
            updateList();
        }
    }

    function deleteItem(index) {
        shoppingList.splice(index, 1);
        updateList();
    }

    function clearList() {
        shoppingList = [];
        updateList();
    }

    function updateList() {
        renderList();
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItem();
    });

    renderList();
});
