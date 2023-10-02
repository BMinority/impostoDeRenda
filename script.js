
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.getElementById('rendimento').addEventListener('input', function() {
    let valor = this.value.replace(/[^\d]/g, '');
    this.value = formatarMoeda(parseFloat(valor / 100).toFixed(2));
});

document.getElementById('deducoes').addEventListener('input', function() {
    let valor = this.value.replace(/[^\d]/g, '');
    this.value = formatarMoeda(parseFloat(valor / 100).toFixed(2))
});

function formatarValor(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    input.value = valor;
}

//-----------------------------------------------------------

document.getElementById('calcular').addEventListener('click', function() {
    // Obter os valores dos inputs e converter para números
    let rendimento = parseFloat(document.getElementById('rendimento').value.replace('R$', '').replace(',', '.'));
    let deducoes = parseFloat(document.getElementById('deducoes').value.replace('R$', '').replace(',', '.'));

    // Calcular o rendimento tributável
    let rendimentoTributavel = rendimento - deducoes;

    // Calcular o imposto devido com base nas faixas de renda
    let impostoDevido;
    if (rendimentoTributavel <= 1903.98) {
        impostoDevido = 0;
    } else if (rendimentoTributavel <= 2826.65) {
        impostoDevido = rendimentoTributavel * 0.075 - 142.80;
    } else if (rendimentoTributavel <= 3751.05) {
        impostoDevido = rendimentoTributavel * 0.15 - 354.80;
    } else if (rendimentoTributavel <= 4664.68) {
        impostoDevido = rendimentoTributavel * 0.225 - 636.13;
    } else {
        impostoDevido = rendimentoTributavel * 0.275 - 869.36;
    }

    if (isNaN(rendimento) || isNaN(deducoes)) {
        document.getElementById('impostoDevido').textContent = "Nenhum valor encontrado.";
        return;
    }

    // Atualizar o resultado na página
    document.getElementById('impostoDevido').textContent = 'R$ ' + impostoDevido.toFixed(2);
});

document.getElementById('clean').addEventListener('click', function() {
    document.getElementById('rendimento').value = '';
    document.getElementById('deducoes').value = '';
    document.getElementById('impostoDevido').textContent = '';
});
