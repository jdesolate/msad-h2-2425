function showTab(tab) {
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelector(`.tab[onclick*="${tab}"]`).classList.add('active');
    document.getElementById(tab).classList.add('active');
}

function updateBtn()
{
    const btn = document.querySelector('.dark-mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = '🌙 Dark Mode';
    } else {
        btn.textContent = '☀️ Light Mode';
    }
}

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.dark-mode-toggle');
    btn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        updateBtn();
    });
    updateBtn();

    const cameraIcon = document.getElementById('cameraIcon');
    const fileInput = document.getElementById('profileInput');
    const profilePic = document.getElementById('profilePic');

    cameraIcon.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.style.backgroundImage = `url('${e.target.result}')`;
            };
            reader.readAsDataURL(file);
        }
    });

    const editBannerBtn = document.getElementById('editBannerBtn');
    const bannerInput = document.getElementById('bannerInput');
    const bannerImg = document.getElementById('bannerImg');
    editBannerBtn.addEventListener('click', function() {
        bannerInput.click();
    });

    bannerInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                bannerImg.style.backgroundImage = `url('${e.target.result}')`;
                bannerImg.style.backgroundSize = 'cover';
                bannerImg.style.backgroundPosition = 'center';
            };
            reader.readAsDataURL(file);
        }
    });

    // Edit Profile Modal
    const editBtn = document.getElementById('editProfileBtn');
    const modal = document.getElementById('editModal');
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelProfileBtn');
  
    editBtn.addEventListener('click', function() {
    document.getElementById('modalUsername').value = document.getElementById('username').textContent;
    document.getElementById('modalAbout').value = document.getElementById('aboutText').textContent;
    document.getElementById('modalHobbies').value = document.getElementById('hobbiesText').textContent;
    document.getElementById('modalContent').value = document.getElementById('contentText').textContent;
    modal.classList.add('show');
    
    });

    saveBtn.addEventListener('click', function() {
        document.getElementById('username').textContent = document.getElementById('modalUsername').value;
        document.getElementById('aboutText').textContent = document.getElementById('modalAbout').value;
        document.getElementById('hobbiesText').textContent = document.getElementById('modalHobbies').value;
        document.getElementById('contentText').textContent = document.getElementById('modalContent').value;
        modal.classList.remove('show');
    });

    cancelBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    
});