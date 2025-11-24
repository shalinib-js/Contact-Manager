let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

function renderContacts() {
  const list = document.getElementById("contacts");
  list.innerHTML = "";
  contacts.forEach((c, i) => {
    const item = document.createElement("div");
    item.className = "contact-item";
    item.innerHTML = `
            <div>
                <strong>${c.name}</strong><br>
                ${c.email} | ${c.phone}
            </div>
            <div class="actions">
                <button onclick="editContact(${i})"><span class="material-icons">edit</span></button>
                <button onclick="deleteContact(${i})"><span class="material-icons">delete</span></button>
            </div>
        `;
    list.appendChild(item);
  });
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

document.getElementById("saveBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  if (editIndex !== null) {
    contacts[editIndex] = { name, email, phone };
    editIndex = null;
  } else {
    contacts.push({ name, email, phone });
  }

  clearForm();
  renderContacts();
});

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  editIndex = null;
}

function editContact(index) {
  const c = contacts[index];
  document.getElementById("name").value = c.name;
  document.getElementById("email").value = c.email;
  document.getElementById("phone").value = c.phone;
  editIndex = index;
}

function deleteContact(index) {
  if (confirm("Delete this contact?")) {
    contacts.splice(index, 1);
    renderContacts();
  }
}

renderContacts();
