document.getElementById('planForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let idade = parseInt(document.getElementById('idade').value);
    let peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value);

    let imc = peso / (altura * altura);

    // Operadora A
    let planoBasicoA = 100 + (idade * 10 * (imc / 10));
    let planoStandardA = (150 + (idade * 15)) * (imc / 10);
    let planoPremiumA = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    // Operadora B - fator de comorbidade
    let fatorComorbidade;
    if (imc < 18.5) {
        fatorComorbidade = 10;
    } else if (imc < 24.9) {
        fatorComorbidade = 1;
    } else if (imc < 29.9) {
        fatorComorbidade = 6;
    } else if (imc < 34.9) {
        fatorComorbidade = 10;
    } else if (imc < 39.9) {
        fatorComorbidade = 20;
    } else {
        fatorComorbidade = 30;
    }

    let planoBasicoB = 100 + (fatorComorbidade * 10 * (imc / 10));
    let planoStandardB = (150 + (fatorComorbidade * 15)) * (imc / 10);
    let planoPremiumB = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

    // Determinação do melhor custo-benefício
    let planos = [
        { operadora: 'A', tipo: 'Básico', preco: planoBasicoA },
        { operadora: 'A', tipo: 'Standard', preco: planoStandardA },
        { operadora: 'A', tipo: 'Premium', preco: planoPremiumA },
        { operadora: 'B', tipo: 'Básico', preco: planoBasicoB },
        { operadora: 'B', tipo: 'Standard', preco: planoStandardB },
        { operadora: 'B', tipo: 'Premium', preco: planoPremiumB }
    ];

    let melhorPlano = planos.reduce((prev, curr) => prev.preco < curr.preco ? prev : curr);

    // Criação da tabela de resultados
    let resultadoHTML = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Operadora</th>
                    <th>Tipo de Plano</th>
                    <th>Preço (R$)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Operadora A</td>
                    <td>Básico</td>
                    <td>${planoBasicoA.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Operadora A</td>
                    <td>Standard</td>
                    <td>${planoStandardA.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Operadora A</td>
                    <td>Premium</td>
                    <td>${planoPremiumA.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Operadora B</td>
                    <td>Básico</td>
                    <td>${planoBasicoB.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Operadora B</td>
                    <td>Standard</td>
                    <td>${planoStandardB.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Operadora B</td>
                    <td>Premium</td>
                    <td>${planoPremiumB.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        <div class="alert alert-success mt-3">
            O melhor plano é o ${melhorPlano.tipo} da Operadora ${melhorPlano.operadora} com o preço de R$ ${melhorPlano.preco.toFixed(2)}.
        </div>
    `;

    document.getElementById('resultadoContainer').innerHTML = resultadoHTML;
});
