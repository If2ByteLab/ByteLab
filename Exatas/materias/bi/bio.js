document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de enviar o formulário
    
    var searchTerm = document.getElementById('search-bar').value.toLowerCase();
    
    // Percorre todas as seções e mostra aquelas que correspondem ao termo de pesquisa ou são semelhantes
    var sections = document.querySelectorAll('main section');
    sections.forEach(function(section) {
        var sectionTitle = section.querySelector('h2').textContent.toLowerCase();
        var similarity = calculateSimilarity(searchTerm, sectionTitle);
        if (sectionTitle.includes(searchTerm) || searchTerm === '' || similarity > 0.5) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});

// Adiciona um evento de entrada ao campo de pesquisa para atualizar dinamicamente os resultados
document.getElementById('search-bar').addEventListener('input', function(event) {
    var searchTerm = event.target.value.toLowerCase();
    var sections = document.querySelectorAll('main section');
    sections.forEach(function(section) {
        var sectionTitle = section.querySelector('h2').textContent.toLowerCase();
        var similarity = calculateSimilarity(searchTerm, sectionTitle);
        if (sectionTitle.includes(searchTerm) || searchTerm === '' || similarity > 0.5) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});

// Função para calcular a similaridade entre duas strings
function calculateSimilarity(string1, string2) {
    var longer = string1;
    var shorter = string2;
    if (string1.length < string2.length) {
        longer = string2;
        shorter = string1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

// Função para calcular a distância de edição entre duas strings
function editDistance(string1, string2) {
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();

    var costs = [];
    for (var i = 0; i <= string1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= string2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (string1.charAt(i - 1) != string2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[string2.length] = lastValue;
    }
    return costs[string2.length];
}
windows.alert ("Não há material no momento!")