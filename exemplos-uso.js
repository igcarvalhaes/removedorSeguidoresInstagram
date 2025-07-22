/**
 * EXEMPLO DE USO SIMPLES
 *
 * 1. Vá para https://www.instagram.com/[seunome]/followers/
 * 2. Abra o console (F12 > Console)
 * 3. Cole o script principal (remover-seguidores.js)
 * 4. Cole e execute um dos exemplos abaixo:
 */

// EXEMPLO 1: Uso básico (configurações padrão)
console.log("🟢 Iniciando com configurações padrão...");
iniciarRemocaoSeguidores();

// EXEMPLO 2: Configuração conservadora (mais segura)
/*
console.log('🟡 Configurando modo conservador...');
configurarScript({
    maxRemocoes: 15,        // Remove apenas 15 seguidores
    pausaACada: 3,          // Pausa a cada 3 remoções
    delays: {
        entreCliques: { min: 5000, max: 8000 },      // 5-8 segundos entre cliques
        pausaLonga: { min: 90000, max: 180000 }      // 1.5-3 minutos de pausa
    }
});
iniciarRemocaoSeguidores();
*/

// EXEMPLO 3: Configuração rápida (use com cuidado)
/*
console.log('🔴 Configurando modo rápido (cuidado!)...');
configurarScript({
    maxRemocoes: 80,        // Remove até 80 seguidores
    pausaACada: 20,         // Pausa a cada 20 remoções
    delays: {
        entreCliques: { min: 1000, max: 2500 },      // 1-2.5 segundos entre cliques
        pausaLonga: { min: 15000, max: 30000 }       // 15-30 segundos de pausa
    }
});
iniciarRemocaoSeguidores();
*/

// EXEMPLO 4: Teste com poucos seguidores
/*
console.log('🧪 Modo teste - apenas 5 seguidores...');
configurarScript({
    maxRemocoes: 5,         // Remove apenas 5 para testar
    pausaACada: 2,          // Pausa a cada 2 remoções
    delays: {
        entreCliques: { min: 3000, max: 5000 }       // 3-5 segundos entre cliques
    }
});
iniciarRemocaoSeguidores();
*/

// PARA PARAR A QUALQUER MOMENTO:
// pararRemocaoSeguidores();
