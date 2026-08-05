// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sidebar Toggle & Mobile Responsiveness
       ========================================================================== */
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');

    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            if (sidebar.classList.contains('collapsed')) {
                sidebar.style.width = '70px';
            } else {
                sidebar.style.width = '280px';
            }
        });
    }

    /* ==========================================================================
       2. Dynamic Theme Switcher (Dark, Rainbow, Cyberpunk, Emerald)
       ========================================================================== */
    const themeDropdown = document.getElementById('themeDropdown');

    if (themeDropdown) {
        themeDropdown.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            // Remove existing theme classes
            document.body.className = '';
            // Apply selected theme
            document.body.classList.add(selectedTheme);
        });
    }

    /* ==========================================================================
       3. New Chat, Edit Title & Merge Chat Actions
       ========================================================================== */
    const newChatBtn = document.getElementById('newChatBtn');
    const editChatBtn = document.getElementById('editChatBtn');
    const mergeChatBtn = document.getElementById('mergeChatBtn');
    const activeChatTitle = document.getElementById('activeChatTitle');
    const chatList = document.getElementById('chatList');
    const chatMessages = document.getElementById('chatMessages');

    // Create New Chat
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            const newTitle = `New Chat ${chatList.children.length + 1}`;
            const li = document.createElement('li');
            li.className = 'chat-item active';
            li.innerHTML = `<i class="fa-regular fa-message"></i><span class="chat-title">${newTitle}</span>`;
            
            // Remove active status from other list items
            document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
            chatList.prepend(li);

            activeChatTitle.textContent = newTitle;
            chatMessages.innerHTML = `
                <div class="message ai-message">
                    <div class="avatar"><i class="fa-solid fa-microchip"></i></div>
                    <div class="message-content">
                        <h3>New Session Started</h3>
                        <p>How can SravanAI assist you with your DevOps tasks today?</p>
                    </div>
                </div>
            `;
            attachChatItemClickHandlers();
        });
    }

    // Edit Active Chat Title
    if (editChatBtn) {
        editChatBtn.addEventListener('click', () => {
            const currentTitle = activeChatTitle.textContent;
            const updatedTitle = prompt('Edit Chat Title:', currentTitle);
            if (updatedTitle && updatedTitle.trim() !== '') {
                activeChatTitle.textContent = updatedTitle.trim();
                const activeListItem = document.querySelector('.chat-item.active .chat-title');
                if (activeListItem) activeListItem.textContent = updatedTitle.trim();
            }
        });
    }

    // Merge Chats Placeholder Action
    if (mergeChatBtn) {
        mergeChatBtn.addEventListener('click', () => {
            alert('Merge Chat Mode Activated: Select multiple recent chats from the sidebar to consolidate prompt history.');
        });
    }

    // Chat Item Click Switcher
    function attachChatItemClickHandlers() {
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', function () {
                document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                const title = this.querySelector('.chat-title').textContent;
                activeChatTitle.textContent = title;
            });
        });
    }
    attachChatItemClickHandlers();

    /* ==========================================================================
       4. Multi-Media Attachments & Input Handlers
       ========================================================================== */
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const imageInput = document.getElementById('imageInput');
    const fileInput = document.getElementById('fileInput');
    const addTextBtn = document.getElementById('addTextBtn');
    const addDateBtn = document.getElementById('addDateBtn');

    // Auto-expand input textarea on typing
    if (userInput) {
        userInput.addEventListener('input', () => {
            userInput.style.height = 'auto';
            userInput.style.height = `${userInput.scrollHeight}px`;
        });

        // Send message on Enter key (without Shift)
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (!messageText) return;

        // Render User Message
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'message user-message';
        userMsgDiv.style.alignSelf = 'flex-end';
        userMsgDiv.innerHTML = `
            <div class="message-content" style="background: rgba(0, 242, 254, 0.15); border-color: #00f2fe;">
                <p>${escapeHTML(messageText)}</p>
            </div>
        `;
        chatMessages.appendChild(userMsgDiv);

        // Clear Input
        userInput.value = '';
        userInput.style.height = 'auto';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate AI Response
        setTimeout(() => {
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'message ai-message';
            aiMsgDiv.innerHTML = `
                <div class="avatar"><i class="fa-solid fa-microchip"></i></div>
                <div class="message-content">
                    <p>Received your request: <em>"${escapeHTML(messageText)}"</em>. Processing AWS/DevOps logs...</p>
                </div>
            `;
            chatMessages.appendChild(aiMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            apply3DTiltEffect();
        }, 800);
    }

    // Attachment Helpers
    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                userInput.value += ` [Image Attached: ${fileName}] `;
            }
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                userInput.value += ` [Document Attached: ${fileName}] `;
            }
        });
    }

    if (addTextBtn) {
        addTextBtn.addEventListener('click', () => {
            userInput.value += `\n\`\`\`\n// Paste Code / Logs Here\n\`\`\`\n`;
            userInput.focus();
        });
    }

    if (addDateBtn) {
        addDateBtn.addEventListener('click', () => {
            const timestamp = new Date().toLocaleString();
            userInput.value += ` [Timestamp: ${timestamp}] `;
            userInput.focus();
        });
    }

    /* ==========================================================================
       5. 3D Card Hover Tilt Effect
       ========================================================================== */
    function apply3DTiltEffect() {
        const cards = document.querySelectorAll('.message-content');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const rotateX = (-y / 12).toFixed(2);
                const rotateY = (x / 12).toFixed(2);

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }
    apply3DTiltEffect();

    /* ==========================================================================
       6. Search Bar Filter
       ========================================================================== */
    const searchInput = document.getElementById('toolSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const messages = document.querySelectorAll('.message');

            messages.forEach(msg => {
                const text = msg.textContent.toLowerCase();
                msg.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }

    // Utility: HTML Escaper
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});

/* ==========================================================================
   7. Modal Open & Close Handler Functions
   ========================================================================== */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
