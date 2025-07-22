/**
 * Script para remover seguidores do Instagram de forma humanizada
 *
 * INSTRUÇÕES DE USO:
 * 1. Acesse https://www.instagram.com/[seunome]/followers/
 * 2. Abra o console do navegador (F12 > Console)
 * 3. Cole este script e pressione Enter
 * 4. Configure os parâmetros se necessário
 * 5. Execute a função: iniciarRemocaoSeguidores()
 */

class RemoverSeguidoresInstagram {
  constructor() {
    this.isRunning = false;
    this.removidos = 0;
    this.erros = 0;
    this.maxErrosConsecutivos = 3;
    this.errosConsecutivos = 0;

    // Configurações de timing para humanização
    this.delays = {
      entreCliques: { min: 2000, max: 5000 }, // 2-5 segundos entre cliques
      aposConfirmacao: { min: 1500, max: 3000 }, // 1.5-3 segundos após confirmar
      entreScrolls: { min: 1000, max: 2000 }, // 1-2 segundos entre scrolls
      pausaLonga: { min: 30000, max: 60000 }, // 30-60 segundos a cada 10 remoções
    };

    // Configurações gerais
    this.maxRemocoesPorSessao = 50; // Limite para evitar detecção
    this.pausaACada = 5; // Pausa longa a cada X remoções
  }

  // Gera delay aleatório entre min e max
  gerarDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Aguarda um tempo específico
  async aguardar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Simula clique humano com pequenos delays
  async cliqueHumano(elemento) {
    if (!elemento) return false;

    // Simula movimento do mouse e hover
    elemento.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    await this.aguardar(this.gerarDelay(100, 300));

    // Clique
    elemento.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    await this.aguardar(this.gerarDelay(50, 150));
    elemento.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    elemento.click();

    return true;
  }

  // Encontra botões de "Remover" na lista de seguidores
  encontrarBotoesRemover() {
    // Busca por botões com o texto "Remover" e classes específicas
    const botoes = Array.from(
      document.querySelectorAll('div[role="button"]')
    ).filter((btn) => {
      const texto = btn.textContent.trim();
      return texto === "Remover" && btn.className.includes("x1i10hfl");
    });

    return botoes;
  }

  // Encontra o botão de confirmação no modal
  encontrarBotaoConfirmar() {
    const botaoConfirmar = document.querySelector("button._a9--._ap36._a9-_");
    if (botaoConfirmar && botaoConfirmar.textContent.trim() === "Remover") {
      return botaoConfirmar;
    }
    return null;
  }

  // Aguarda elemento aparecer na tela
  async aguardarElemento(seletor, timeout = 5000) {
    const inicio = Date.now();
    while (Date.now() - inicio < timeout) {
      const elemento = document.querySelector(seletor);
      if (elemento) return elemento;
      await this.aguardar(100);
    }
    return null;
  }

  // Faz scroll suave para carregar mais seguidores
  async scrollParaBaixo() {
    const modal = document.querySelector('div[role="dialog"]');
    if (modal) {
      const scrollContainer =
        modal.querySelector('div[style*="overflow"]') || modal;
      const scrollAntes = scrollContainer.scrollTop;

      scrollContainer.scrollBy({
        top: 300,
        behavior: "smooth",
      });

      await this.aguardar(
        this.gerarDelay(
          this.delays.entreScrolls.min,
          this.delays.entreScrolls.max
        )
      );

      // Verifica se houve scroll
      return scrollContainer.scrollTop > scrollAntes;
    }
    return false;
  }

  // Remove um seguidor específico
  async removerSeguidor(botaoRemover) {
    try {
      console.log(`🎯 Tentando remover seguidor...`);

      // Clica no botão "Remover"
      await this.cliqueHumano(botaoRemover);

      // Aguarda o modal de confirmação aparecer
      await this.aguardar(this.gerarDelay(500, 1000));

      // Procura pelo botão de confirmação
      const botaoConfirmar = await this.aguardarElemento(
        "button._a9--._ap36._a9-_",
        3000
      );

      if (!botaoConfirmar) {
        console.log("❌ Botão de confirmação não encontrado");
        this.errosConsecutivos++;
        return false;
      }

      // Confirma a remoção
      await this.cliqueHumano(botaoConfirmar);

      // Aguarda o modal fechar
      await this.aguardar(
        this.gerarDelay(
          this.delays.aposConfirmacao.min,
          this.delays.aposConfirmacao.max
        )
      );

      this.removidos++;
      this.errosConsecutivos = 0;
      console.log(`✅ Seguidor removido! Total: ${this.removidos}`);

      return true;
    } catch (error) {
      console.error("❌ Erro ao remover seguidor:", error);
      this.erros++;
      this.errosConsecutivos++;
      return false;
    }
  }

  // Função principal de remoção
  async iniciarRemocao() {
    if (this.isRunning) {
      console.log("🚫 Script já está executando!");
      return;
    }

    console.log("🚀 Iniciando remoção de seguidores...");
    console.log(
      `📊 Configurações: Max ${this.maxRemocoesPorSessao} remoções, pausa a cada ${this.pausaACada}`
    );

    this.isRunning = true;
    this.removidos = 0;
    this.erros = 0;
    this.errosConsecutivos = 0;

    try {
      while (this.isRunning && this.removidos < this.maxRemocoesPorSessao) {
        // Verifica se deve parar por muitos erros consecutivos
        if (this.errosConsecutivos >= this.maxErrosConsecutivos) {
          console.log("🛑 Muitos erros consecutivos. Parando por segurança.");
          break;
        }

        // Encontra botões de remover disponíveis
        const botoesRemover = this.encontrarBotoesRemover();

        if (botoesRemover.length === 0) {
          console.log("📜 Fazendo scroll para carregar mais seguidores...");
          const scrollSucesso = await this.scrollParaBaixo();

          if (!scrollSucesso) {
            console.log("🏁 Não há mais seguidores para carregar ou remover.");
            break;
          }
          continue;
        }

        // Remove o primeiro seguidor da lista
        const sucesso = await this.removerSeguidor(botoesRemover[0]);

        if (sucesso) {
          // Pausa longa a cada X remoções
          if (this.removidos % this.pausaACada === 0 && this.removidos > 0) {
            const pausaLonga = this.gerarDelay(
              this.delays.pausaLonga.min,
              this.delays.pausaLonga.max
            );
            console.log(
              `⏸️ Pausa estratégica de ${Math.round(pausaLonga / 1000)}s após ${
                this.removidos
              } remoções...`
            );
            await this.aguardar(pausaLonga);
          }
        }

        // Delay entre tentativas
        const delay = this.gerarDelay(
          this.delays.entreCliques.min,
          this.delays.entreCliques.max
        );
        await this.aguardar(delay);
      }
    } catch (error) {
      console.error("💥 Erro crítico:", error);
    } finally {
      this.isRunning = false;
      console.log("🎉 Processo finalizado!");
      console.log(
        `📈 Relatório: ${this.removidos} removidos, ${this.erros} erros`
      );
    }
  }

  // Para a execução
  parar() {
    this.isRunning = false;
    console.log("🛑 Parando remoção de seguidores...");
  }

  // Configurar parâmetros
  configurar(opcoes = {}) {
    if (opcoes.maxRemocoes) this.maxRemocoesPorSessao = opcoes.maxRemocoes;
    if (opcoes.pausaACada) this.pausaACada = opcoes.pausaACada;
    if (opcoes.delays) Object.assign(this.delays, opcoes.delays);

    console.log("⚙️ Configurações atualizadas:", {
      maxRemocoes: this.maxRemocoesPorSessao,
      pausaACada: this.pausaACada,
      delays: this.delays,
    });
  }
}

// Instância global
const removerSeguidores = new RemoverSeguidoresInstagram();

// Funções de controle globais
function iniciarRemocaoSeguidores() {
  removerSeguidores.iniciarRemocao();
}

function pararRemocaoSeguidores() {
  removerSeguidores.parar();
}

function configurarScript(opcoes) {
  removerSeguidores.configurar(opcoes);
}

// Exemplo de configuração personalizada:
// configurarScript({
//     maxRemocoes: 30,
//     pausaACada: 5,
//     delays: {
//         entreCliques: { min: 3000, max: 6000 }
//     }
// });

console.log("📋 Script carregado! Comandos disponíveis:");
console.log("   iniciarRemocaoSeguidores() - Inicia a remoção");
console.log("   pararRemocaoSeguidores() - Para a execução");
console.log("   configurarScript(opcoes) - Configura parâmetros");
console.log("");
console.log(
  "⚠️ IMPORTANTE: Use com responsabilidade e respeite os termos do Instagram!"
);
