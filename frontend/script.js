document.addEventListener('DOMContentLoaded', () => {
    // API Base URL ကို dynamic ဖြစ်အောင် သတ်မှတ်တယ်။ Docker မှာ backend က service name နဲ့ ချိတ်မယ်။
    //const API_BASE_URL = window.API_BASE_URL || 'http://backend:8000';

    const API_BASE_URL = 'https://f579104d-001e-464e-8845-b2494aa7cd70.mock.pstmn.io';

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Form က ဒေတာတွေကို စုဆောင်းတယ်။ "omeeting" ကို သုံးပြီး Backend နဲ့ ကိုက်အောင်လုပ်တယ်။
            const data = {
                name: document.getElementById('name').value,
                designation: document.getElementById('designation').value,
                company: document.getElementById('company').value,
                business_type: document.getElementById('business-type').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                city: document.getElementById('city').value,
                country: document.getElementById('country').value,
                service_type: document.getElementById('service-type').value,
                computer: document.getElementById('computer').value,
                address: document.getElementById('address').value,
                remark: document.getElementById('remark').value,
                omeeting: document.querySelector('input[name="omeeting"]:checked').value, // "presentation" အစား "omeeting" သုံးတယ်
            };

            try {
                const response = await fetch(`${API_BASE_URL}/api/register/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Registration successful!');
                    window.parent.location.reload();
                } else {
                    alert('Registration failed!');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong!');
            }
        });
    }

    const userList = document.getElementById('userList');
    if (userList) {
        fetch(`${API_BASE_URL}/api/users/`)
            .then(response => response.json())
            .then(data => {
                userList.innerHTML = '';
                data.forEach(user => {
                    const row = `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.designation}</td>
                            <td>${user.company}</td>
                            <td>${user.business_type}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.city}</td>
                            <td>${user.country}</td>
                            <td>${user.service_type}</td>
                            <td>${user.computer}</td>
                            <td>${user.address}</td>
                            <td>${user.remark}</td>
                            <td>${user.omeeting}</td>
                        </tr>`;
                    userList.innerHTML += row;
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // အောက်က code တွေက သင့်ရဲ့ အရင်လုပ်ထားတာတွေ။ မထိပါဘူး။
    const grokText = document.querySelectorAll('.grok-text');
    grokText.forEach(text => { text.style.opacity = 1; });

    const svg = document.getElementById('grokSvg');
    const circle = document.getElementById('hover-circle');
    if (svg && circle) {
        svg.addEventListener("mousemove", (event) => {
            let svgRect = svg.getBoundingClientRect();
            let x = event.clientX - svgRect.left;
            let y = event.clientY - svgRect.top;
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
        });
        svg.addEventListener("mouseleave", () => {
            circle.setAttribute("cx", "-50");
            circle.setAttribute("cy", "-50");
        });
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    const cancelButton = document.getElementById('cancelRegister');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            window.parent.postMessage('closeModal', '*');
        });
    }
});