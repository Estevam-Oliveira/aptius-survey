// script.js

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-item');
    const confirmButton = document.getElementById('confirmButton');
    const messageDiv = document.getElementById('message');
    const shareButton = document.getElementById('shareButton');

    let correctImages = [
        'img1.png',
        'img3.png',
        'img5.png',
        'img6.png',
        'img8.png',
        'img9.png'
    ];

    const instagramColors = [
        '#feda75', '#fa7e1e', '#d62976', '#4f5bd5',
        '#3b8d99', '#e1306c', '#405de6', '#5851db',
        '#833ab4', '#c13584'
    ];

    // Selecionar/desselecionar imagens
    images.forEach(image => {
        image.addEventListener('click', () => {
            if (image.classList.contains('selected')) {
                // Remover seleção e borda
                image.classList.remove('selected');
                image.style.borderColor = 'transparent';
            } else {
                // Adicionar seleção e borda colorida
                image.classList.add('selected');
                const randomColor = instagramColors[
                    Math.floor(Math.random() * instagramColors.length)
                ];
                image.style.borderColor = randomColor;
                image.style.borderWidth = '12px';
            }
        });
    });

    // Verificar resposta ao clicar em CONFIRMAR
    confirmButton.addEventListener('click', () => {
        const selectedImages = Array.from(images)
            .filter(img => img.classList.contains('selected'))
            .map(img => img.src.split('/').pop()); // Extrair apenas o nome do arquivo

        if (
            selectedImages.length === correctImages.length &&
            selectedImages.every(img => correctImages.includes(img))
        ) {
            window.location.href = 'home.html';
        } else {
            messageDiv.textContent = 'Você errou. Tente novamente.';
        }
    });

    // Função de compartilhar via Web Share API
    if (navigator.share) {
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Autenticação por Imagens',
                    text: 'Tente acessar esta página respondendo corretamente às imagens!',
                    url: window.location.href // ou coloque um URL específico
                });
                console.log('Página compartilhada com sucesso!');
            } catch (error) {
                console.error('Erro ao tentar compartilhar:', error);
                alert('Ocorreu um erro ao compartilhar. Tente novamente.');
            }
        });
    } else {
        // Caso o navegador não suporte Web Share API
        shareButton.addEventListener('click', () => {
            alert('Seu navegador não suporta a função de compartilhamento. Copie o link abaixo para compartilhar:');
            copyToClipboard(window.location.href);
        });
    }

    // Função alternativa para copiar o link para a área de transferência
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copiado para a área de transferência!');
        }, () => {
            alert('Falha ao copiar o link.');
        });
    }
});