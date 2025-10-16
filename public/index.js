async function loadStudents() {
  const res = await fetch('/getStudents');
  const students = await res.json();

  const academicTable = document.getElementById('academicTableBody');
  const profileTable = document.getElementById('profileTableBody');
  academicTable.innerHTML = '';
  profileTable.innerHTML = '';

  students.forEach(student => {
    academicTable.innerHTML += `
      <tr>
        <td>${student.name || ''}</td>
        <td>${student.class || ''}</td>
        <td>${student.subject || ''}</td>
        <td>${student.sem1 || ''}</td>
        <td>${student.sem2 || ''}</td>
        <td>${student.final || ''}</td>
        <td>${student.improvements || ''}</td>
      </tr>
    `;
    profileTable.innerHTML += `
      <tr>
        <td>${student.name || ''}</td>
        <td>${student.fees || ''}</td>
        <td>${student.attendance || ''}</td>
      </tr>
    `;
  });
}

// Helper to merge both forms' data
function getCombinedFormData() {
  const academicForm = document.getElementById('academicForm');
  const profileForm = document.getElementById('profileForm');
  const academicData = Object.fromEntries(new FormData(academicForm).entries());
  const profileData = Object.fromEntries(new FormData(profileForm).entries());
  return { ...academicData, ...profileData };
}

document.getElementById('academicForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = getCombinedFormData();
  await fetch('/addStudent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  academicForm.reset();
  profileForm.reset();
  loadStudents();
});

document.getElementById('profileForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = getCombinedFormData();
  await fetch('/addStudent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  academicForm.reset();
  profileForm.reset();
  loadStudents();
});

loadStudents();