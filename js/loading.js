
(function () {

    document.addEventListener('DOMContentLoaded', function () {

        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loader);


        document.body.style.opacity = '0';


        window.setTimeout(function () {
            const typingElements = document.querySelectorAll('.typing-effect');
            if (typingElements.length > 0) {
                const firstElement = typingElements[0];
                if (firstElement) {
                    const text = firstElement.textContent;
                    firstElement.textContent = '';
                    firstElement.style.borderRight = '0.1em solid var(--accent-light-blue)';
                }
            }
        }, 100);
    });

    window.addEventListener('load', function () {
        setTimeout(function () {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.classList.add('hidden');
                document.body.style.opacity = '1';
            }
        }, 500);
    });

    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #010409;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s, visibility 0.5s;
        }
        
        .page-loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .loader {
            width: 40px;
            height: 40px;
            border: 3px solid #30363d;
            border-top-color: #58a6ff;
            border-radius: 50%;
            animation: loader-spin 1s linear infinite;
        }
        
        @keyframes loader-spin {
            to { transform: rotate(360deg); }
        }
        
        body {
            transition: opacity 0.5s ease-in;
        }
    `;
    document.head.appendChild(style);
})();