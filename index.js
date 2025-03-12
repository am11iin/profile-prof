document.addEventListener("DOMContentLoaded", function () {
    // 🟢 GESTION DE L'IMAGE DE PROFIL (ZOOM)
    const profilePic = document.querySelector(".profile-pic");
    if (profilePic) {
        profilePic.addEventListener("click", function () {
            if (document.getElementById("profile-overlay")) return;

            const overlay = document.createElement("div");
            overlay.id = "profile-overlay";
            overlay.style.cssText = `
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            `;

            const enlargedImg = document.createElement("img");
            enlargedImg.src = profilePic.src;
            enlargedImg.style.cssText = `
                width: 200px; height: 200px;
                border-radius: 50%;
                border: 5px solid white;
                cursor: pointer;
            `;

            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", function () {
                document.body.removeChild(overlay);
            });
        });
    }

    // 🟢 MODIFIER / SUPPRIMER PHOTO DE PROFIL
    const uploadInput = document.getElementById("uploadProfilePic");
    const changePicBtn = document.getElementById("changePicBtn");
    const deletePicBtn = document.getElementById("deletePicBtn");
    const defaultImage = "./profil-pic.png";

    if (profilePic && uploadInput && changePicBtn && deletePicBtn) {
        changePicBtn.addEventListener("click", () => uploadInput.click());

        uploadInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    profilePic.src = e.target.result;
                    localStorage.setItem("profileImage", e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        deletePicBtn.addEventListener("click", function () {
            profilePic.src = defaultImage;
            localStorage.removeItem("profileImage");
        });

        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) profilePic.src = savedImage;
    }

    // 🟢 ENREGISTRER / ANNULER LES INFOS DU PROFIL
    const saveBtn = document.querySelector(".save-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const inputs = document.querySelectorAll(".input-box input");

    function loadProfileData() {
        inputs.forEach(input => {
            const savedValue = localStorage.getItem(input.id);
            if (savedValue) input.value = savedValue;
        });
    }

    if (saveBtn && cancelBtn) {
        saveBtn.addEventListener("click", function () {
            inputs.forEach(input => localStorage.setItem(input.id, input.value));
            alert("Informations enregistrées !");
        });

        cancelBtn.addEventListener("click", function () {
            loadProfileData();
            alert("Modifications annulées !");
        });

        loadProfileData();
    }

    // 🟢 AFFICHER / CACHER LE MOT DE PASSE
    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", function () {
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        });
    }

    // 🟢 DÉSACTIVER LES BOUTONS "site-mzl"
    document.querySelectorAll(".site-mzl").forEach(button => {
        button.addEventListener("click", () => {
            alert("Cette page n'est pas accessible pour le moment !");
        });
    });
});
// Gestion de la Sidebar
const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("toggleSidebar");
const closeBtn = document.getElementById("closeSidebar");

if (openBtn && closeBtn && sidebar) {
    openBtn.addEventListener("click", function () {
        sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !openBtn.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
}
