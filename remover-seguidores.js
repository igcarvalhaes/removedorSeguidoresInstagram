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

    // Configurações de timing para humanização
    this.delays = {
      entreCliques: { min: 2000, max: 5000 }, // 2-5 segundos entre cliques
      aposConfirmacao: { min: 1500, max: 3000 }, // 1.5-3 segundos após confirmar
      entreScrolls: { min: 1000, max: 2000 }, // 1-2 segundos entre scrolls
      pausaLonga: { min: 30000, max: 60000 }, // 30-60 segundos a cada 10 remoções
    };

    // Configurações gerais
    this.maxRemocoesPorSessao = Infinity; // Sem limite - processa lista completa
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
      console.log(`✅ Seguidor removido! Total: ${this.removidos}`);

      return true;
    } catch (error) {
      console.error("❌ Erro ao remover seguidor:", error);
      this.erros++;
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

    try {
      while (this.isRunning && this.removidos < this.maxRemocoesPorSessao) {
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

  // Analisa dados do Instagram para encontrar pessoas que não seguem de volta
  async analisarDadosInstagram() {
    console.log("📊 Iniciando análise dos dados do Instagram...");
    console.log(
      "📁 Selecione a pasta 'instagram-[seuusuario]-data' quando solicitado"
    );

    try {
      // Solicita que o usuário selecione a pasta
      const input = document.createElement("input");
      input.type = "file";
      input.webkitdirectory = true;
      input.multiple = true;

      return new Promise((resolve, reject) => {
        input.onchange = async (event) => {
          try {
            const files = Array.from(event.target.files);
            console.log(`📁 ${files.length} arquivos encontrados`);

            // Procura pelos arquivos específicos
            const followersFile = files.find((f) =>
              f.webkitRelativePath.includes(
                "connections/followers_and_following/followers_1.html"
              )
            );

            const followingFile = files.find((f) =>
              f.webkitRelativePath.includes(
                "connections/followers_and_following/following.html"
              )
            );

            if (!followersFile || !followingFile) {
              throw new Error(
                "Arquivos followers_1.html ou following.html não encontrados na estrutura esperada"
              );
            }

            console.log("✅ Arquivos encontrados, analisando...");

            // Lê e analisa os arquivos
            const seguidores = await this.extrairUsuariosDoHTML(followersFile);
            const seguindo = await this.extrairUsuariosDoHTML(followingFile);

            console.log(`👥 Você tem ${seguidores.length} seguidores`);
            console.log(`➡️ Você segue ${seguindo.length} pessoas`);

            // Encontra pessoas que você segue mas que não te seguem
            const naoSeguemDeVolta = seguindo.filter(
              (usuario) => !seguidores.includes(usuario)
            );

            console.log(
              `💔 ${naoSeguemDeVolta.length} pessoas não seguem você de volta:`
            );
            naoSeguemDeVolta.forEach((usuario, index) => {
              console.log(`${index + 1}. ${usuario}`);
            });

            resolve({
              seguidores,
              seguindo,
              naoSeguemDeVolta,
            });
          } catch (error) {
            console.error("❌ Erro ao analisar arquivos:", error);
            reject(error);
          }
        };

        input.click();
      });
    } catch (error) {
      console.error("❌ Erro na análise:", error);
      throw error;
    }
  }

  // Extrai lista de usuários de um arquivo HTML
  async extrairUsuariosDoHTML(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const htmlContent = e.target.result;
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlContent, "text/html");

          // Procura por links de usuários do Instagram
          const links = Array.from(
            doc.querySelectorAll('a[href*="instagram.com"]')
          );
          const usuarios = links
            .map((link) => {
              const href = link.getAttribute("href");
              const match = href.match(/instagram\.com\/([^\/\?]+)/);
              return match ? match[1] : null;
            })
            .filter(
              (usuario) =>
                usuario && !usuario.includes(".") && usuario.length > 0
            )
            .filter(
              (usuario, index, array) => array.indexOf(usuario) === index
            ); // Remove duplicatas

          resolve(usuarios);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
      reader.readAsText(file);
    });
  }

  // Navega para a página de following de um usuário específico
  async irParaPaginaSeguindo(username) {
    const url = `https://www.instagram.com/${username}/following/`;
    console.log(`🔗 Navegando para: ${url}`);
    window.location.href = url;

    // Aguarda a página carregar
    await this.aguardar(3000);
  }

  // Encontra o campo de pesquisa na página de following
  encontrarCampoPesquisa() {
    // Prioriza o seletor mais específico baseado no input fornecido
    const campoPesquisa =
      document.querySelector(
        'input[aria-label="Entrada da pesquisa"][placeholder="Pesquisar"]'
      ) ||
      document.querySelector('input[aria-label="Entrada da pesquisa"]') ||
      document.querySelector('input[placeholder="Pesquisar"]') ||
      document.querySelector("input.x1lugfcp.x1hmx34t.x1obq294");
    return campoPesquisa;
  }

  // Pesquisa por um usuário específico
  async pesquisarUsuario(username) {
    try {
      console.log(`🔍 Pesquisando por ${username}...`);

      const campoPesquisa = this.encontrarCampoPesquisa();
      if (!campoPesquisa) {
        console.log("❌ Campo de pesquisa não encontrado");
        return false;
      }

      console.log("🖱️ Simulando movimento humano para o campo...");

      // Simula movimento do mouse para o campo
      campoPesquisa.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          clientX: Math.random() * 100,
          clientY: Math.random() * 100,
        })
      );
      await this.aguardar(this.gerarDelay(100, 300));

      // Simula hover antes do clique
      campoPesquisa.dispatchEvent(
        new MouseEvent("mouseover", {
          bubbles: true,
          cancelable: true,
        })
      );
      await this.aguardar(this.gerarDelay(150, 250));

      // Simula clique humano muito detalhado
      console.log("🖱️ Clicando no campo de pesquisa...");
      campoPesquisa.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          button: 0,
          buttons: 1,
        })
      );
      await this.aguardar(this.gerarDelay(80, 150));

      campoPesquisa.dispatchEvent(
        new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          button: 0,
          buttons: 0,
        })
      );

      campoPesquisa.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          button: 0,
        })
      );

      // Aguarda após clique
      await this.aguardar(this.gerarDelay(300, 600));

      // Foca no campo de forma mais natural
      campoPesquisa.focus();
      await this.aguardar(this.gerarDelay(100, 200));

      // Dispara evento de foco
      campoPesquisa.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
      await this.aguardar(this.gerarDelay(50, 150));

      // Limpa o campo se tiver conteúdo
      if (campoPesquisa.value.length > 0) {
        console.log("🧹 Limpando campo existente...");

        // Usa o botão de limpar se existir
        const botaoLimpar = document.querySelector(
          'div[aria-label="Limpar a caixa de pesquisa"]'
        );
        if (botaoLimpar) {
          console.log("🖱️ Clicando no botão de limpar...");
          await this.cliqueHumano(botaoLimpar);
          await this.aguardar(this.gerarDelay(500, 1000));
        } else {
          // Seleciona tudo e apaga
          campoPesquisa.select();
          await this.aguardar(this.gerarDelay(100, 200));

          // Simula tecla Delete
          campoPesquisa.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Delete",
              code: "Delete",
              keyCode: 46,
              which: 46,
              bubbles: true,
              cancelable: true,
            })
          );

          campoPesquisa.dispatchEvent(
            new KeyboardEvent("keyup", {
              key: "Delete",
              code: "Delete",
              keyCode: 46,
              which: 46,
              bubbles: true,
              cancelable: true,
            })
          );
        }
      }

      await this.aguardar(this.gerarDelay(300, 500)); // Pausa após limpeza

      console.log(`⌨️ Iniciando digitação REAL de "${username}"...`);

      // DIGITAÇÃO CARACTERE POR CARACTERE SEM ALTERAR .value DIRETAMENTE
      for (let i = 0; i < username.length; i++) {
        const char = username[i];
        const isUpperCase =
          char === char.toUpperCase() && char !== char.toLowerCase();
        const isNumber = /\d/.test(char);
        const isLetter = /[a-zA-Z]/.test(char);

        // Determina o código da tecla baseado no caractere
        let keyCode, code;
        if (isNumber) {
          keyCode = char.charCodeAt(0);
          code = `Digit${char}`;
        } else if (isLetter) {
          keyCode = char.toUpperCase().charCodeAt(0);
          code = `Key${char.toUpperCase()}`;
        } else {
          keyCode = char.charCodeAt(0);
          code = `Key${char.toUpperCase()}`;
        }

        // Simula pressionar Shift se for maiúscula
        if (isUpperCase && isLetter) {
          campoPesquisa.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Shift",
              code: "ShiftLeft",
              keyCode: 16,
              which: 16,
              shiftKey: true,
              bubbles: true,
              cancelable: true,
            })
          );
        }

        // Evento keydown ANTES de alterar o valor
        const keydownEvent = new KeyboardEvent("keydown", {
          key: char,
          code: code,
          keyCode: keyCode,
          which: keyCode,
          shiftKey: isUpperCase && isLetter,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        campoPesquisa.dispatchEvent(keydownEvent);

        // Pequeno delay antes do keypress
        await this.aguardar(this.gerarDelay(10, 30));

        // Evento keypress (importante para entrada de texto)
        const keypressEvent = new KeyboardEvent("keypress", {
          key: char,
          code: code,
          keyCode: keyCode,
          which: keyCode,
          charCode: keyCode,
          shiftKey: isUpperCase && isLetter,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        campoPesquisa.dispatchEvent(keypressEvent);

        // Simula a inserção do caractere de forma mais natural
        // Em vez de alterar .value diretamente, simula a inserção
        const valorAtual = campoPesquisa.value;
        const novoValor = valorAtual + char;

        // Define o valor usando Object.defineProperty para simular melhor
        Object.defineProperty(campoPesquisa, "value", {
          value: novoValor,
          writable: true,
          configurable: true,
        });

        // Simula o cursor se movendo
        campoPesquisa.setSelectionRange(novoValor.length, novoValor.length);

        // Evento input DEPOIS de alterar o valor
        const inputEvent = new InputEvent("input", {
          inputType: "insertText",
          data: char,
          isComposing: false,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        campoPesquisa.dispatchEvent(inputEvent);

        // Pequeno delay antes do keyup
        await this.aguardar(this.gerarDelay(10, 30));

        // Evento keyup
        const keyupEvent = new KeyboardEvent("keyup", {
          key: char,
          code: code,
          keyCode: keyCode,
          which: keyCode,
          shiftKey: isUpperCase && isLetter,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        campoPesquisa.dispatchEvent(keyupEvent);

        // Solta Shift se foi pressionado
        if (isUpperCase && isLetter) {
          campoPesquisa.dispatchEvent(
            new KeyboardEvent("keyup", {
              key: "Shift",
              code: "ShiftLeft",
              keyCode: 16,
              which: 16,
              shiftKey: false,
              bubbles: true,
              cancelable: true,
            })
          );
        }

        // Delay variável entre caracteres para simular digitação humana mais rápida
        const delayDigitacao = this.gerarDelay(60, 150); // Timing mais rápido
        await this.aguardar(delayDigitacao);

        // Simula pequenas pausas ocasionais reduzidas
        if (Math.random() < 0.15) {
          // 15% chance de pausa extra (reduzida)
          await this.aguardar(this.gerarDelay(100, 300)); // Pausas menores
        }

        // Log de progresso apenas no final
        if (i === username.length - 1) {
          console.log(
            `⌨️ Digitação completa (${username.length} caracteres): "${campoPesquisa.value}"`
          );
        }
      }

      console.log(
        `⌨️ Digitação de "${username}" concluída. Valor final: "${campoPesquisa.value}"`
      );

      // Aguarda para simular tempo de leitura/verificação humana (reduzido)
      await this.aguardar(this.gerarDelay(500, 1000)); // Tempo menor

      // Evento change final (importante para alguns sistemas)
      campoPesquisa.dispatchEvent(
        new Event("change", {
          bubbles: true,
          cancelable: true,
        })
      );

      // Eventos adicionais que podem ser necessários
      campoPesquisa.dispatchEvent(
        new Event("input", {
          bubbles: true,
          cancelable: true,
        })
      );

      // Dispara evento personalizado que o Instagram pode estar escutando
      campoPesquisa.dispatchEvent(
        new CustomEvent("search", {
          bubbles: true,
          detail: { query: username },
        })
      );

      console.log(`⏳ Aguardando Instagram processar a pesquisa...`);

      // Tempo otimizado para garantir que o Instagram processe
      await this.aguardar(this.gerarDelay(1500, 2500)); // Tempo reduzido

      // Verifica se o valor ainda está correto
      if (campoPesquisa.value === username) {
        console.log(`✅ Campo confirmado com valor: "${campoPesquisa.value}"`);
      } else {
        console.log(
          `⚠️ Valor no campo: "${campoPesquisa.value}" (esperado: "${username}")`
        );
      }

      console.log(
        `✅ Pesquisa por ${username} finalizada - aguardando filtro da lista`
      );
      return true;
    } catch (error) {
      console.error(`❌ Erro ao pesquisar ${username}:`, error);
      return false;
    }
  }

  // Limpa o campo de pesquisa
  async limparPesquisa() {
    try {
      const campoPesquisa = this.encontrarCampoPesquisa();
      if (campoPesquisa) {
        console.log("🧹 Limpando campo de pesquisa de forma natural...");

        // Primeiro tenta usar o botão de limpar nativo do Instagram
        const botaoLimpar = document.querySelector(
          'div[aria-label="Limpar a caixa de pesquisa"]'
        );
        if (botaoLimpar && campoPesquisa.value.length > 0) {
          console.log("🖱️ Usando botão de limpar nativo do Instagram...");

          // Simula movimento para o botão
          botaoLimpar.dispatchEvent(
            new MouseEvent("mousemove", {
              bubbles: true,
              cancelable: true,
            })
          );
          await this.aguardar(this.gerarDelay(100, 200));

          // Simula hover
          botaoLimpar.dispatchEvent(
            new MouseEvent("mouseover", {
              bubbles: true,
              cancelable: true,
            })
          );
          await this.aguardar(this.gerarDelay(50, 150));

          // Clica no botão de limpar
          await this.cliqueHumano(botaoLimpar);

          await this.aguardar(this.gerarDelay(500, 1000));
          console.log("🧹 Campo limpo usando botão nativo");
          return true;
        }

        // Se não tem botão de limpar ou não tem conteúdo, limpa manualmente
        console.log("🧹 Limpando manualmente...");

        // Movimento do mouse para o campo
        campoPesquisa.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
          })
        );
        await this.aguardar(this.gerarDelay(50, 150));

        // Clica no campo para focar
        await this.cliqueHumano(campoPesquisa);
        await this.aguardar(this.gerarDelay(200, 400));

        // Foca no campo
        campoPesquisa.focus();
        await this.aguardar(this.gerarDelay(50, 100));

        // Seleciona todo o texto com Ctrl+A
        campoPesquisa.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "a",
            code: "KeyA",
            keyCode: 65,
            which: 65,
            ctrlKey: true,
            bubbles: true,
            cancelable: true,
          })
        );

        campoPesquisa.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: "a",
            code: "KeyA",
            keyCode: 65,
            which: 65,
            ctrlKey: true,
            bubbles: true,
            cancelable: true,
          })
        );

        await this.aguardar(this.gerarDelay(100, 200));

        // Simula tecla Delete para apagar seleção
        campoPesquisa.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Delete",
            code: "Delete",
            keyCode: 46,
            which: 46,
            bubbles: true,
            cancelable: true,
          })
        );

        // Limpa o valor usando Object.defineProperty (mais natural)
        Object.defineProperty(campoPesquisa, "value", {
          value: "",
          writable: true,
          configurable: true,
        });

        // Dispara evento input para notificar mudança
        campoPesquisa.dispatchEvent(
          new InputEvent("input", {
            inputType: "deleteContentBackward",
            bubbles: true,
            cancelable: true,
            composed: true,
          })
        );

        campoPesquisa.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: "Delete",
            code: "Delete",
            keyCode: 46,
            which: 46,
            bubbles: true,
            cancelable: true,
          })
        );

        // Dispara eventos de mudança
        campoPesquisa.dispatchEvent(
          new Event("change", {
            bubbles: true,
            cancelable: true,
          })
        );

        // Evento adicional de input
        campoPesquisa.dispatchEvent(
          new Event("input", {
            bubbles: true,
            cancelable: true,
          })
        );

        // Simula evento personalizado de limpeza
        campoPesquisa.dispatchEvent(
          new CustomEvent("clear", {
            bubbles: true,
            detail: { cleared: true },
          })
        );

        await this.aguardar(this.gerarDelay(1000, 2000)); // Tempo para processar limpeza
        console.log(
          "🧹 Campo de pesquisa limpo manualmente e lista restaurada"
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Erro ao limpar pesquisa:", error);
      return false;
    }
  }

  // Encontra e clica no botão "Seguindo" para dar unfollow após pesquisa
  async darUnfollow(username) {
    try {
      console.log(`🎯 Iniciando unfollow de ${username}...`);

      // Primeiro pesquisa pelo usuário
      const pesquisaSucesso = await this.pesquisarUsuario(username);
      if (!pesquisaSucesso) {
        return false;
      }

      // Tempo para garantir que os resultados estejam carregados
      console.log(`🔍 Verificando se ${username} apareceu nos resultados...`);
      await this.aguardar(this.gerarDelay(1000, 1500)); // Tempo otimizado

      // Procura por botões "Seguindo" nos resultados da pesquisa
      const botoesSeguindo = Array.from(
        document.querySelectorAll("button")
      ).filter((btn) => btn.textContent.trim() === "Seguindo");

      if (botoesSeguindo.length === 0) {
        console.log(`❌ Botão "Seguindo" não encontrado para ${username}`);
        console.log(
          `⚠️ Usuário pode não estar sendo seguido ou não apareceu na busca`
        );
        console.log(`🔍 Tentando buscar por seletores alternativos...`);

        // Tenta buscar por outros seletores possíveis
        const botoesAlternativos = Array.from(
          document.querySelectorAll('button[type="button"]')
        ).filter((btn) => btn.textContent.trim() === "Seguindo");

        if (botoesAlternativos.length === 0) {
          await this.limparPesquisa();
          return false;
        } else {
          console.log(`✅ Encontrado botão "Seguindo" com seletor alternativo`);
        }
      }

      const botaoFinal =
        botoesSeguindo.length > 0
          ? botoesSeguindo[0]
          : Array.from(
              document.querySelectorAll('button[type="button"]')
            ).filter((btn) => btn.textContent.trim() === "Seguindo")[0];

      console.log(
        `✅ Encontrado botão "Seguindo" para ${username}, processando...`
      );

      // Clica no botão "Seguindo"
      await this.cliqueHumano(botaoFinal);

      // Aguarda modal de confirmação
      await this.aguardar(this.gerarDelay(1500, 2500));

      // Procura pelo botão "Deixar de seguir"
      const botaoConfirmar = Array.from(
        document.querySelectorAll("button")
      ).find((btn) => btn.textContent.trim() === "Deixar de seguir");

      if (!botaoConfirmar) {
        console.log(
          `❌ Botão "Deixar de seguir" não encontrado para ${username}`
        );
        await this.limparPesquisa();
        return false;
      }

      // Confirma o unfollow
      await this.cliqueHumano(botaoConfirmar);

      // Aguarda o modal fechar
      await this.aguardar(this.gerarDelay(2000, 3000)); // Tempo maior para modal fechar

      // Limpa a pesquisa para a próxima
      await this.limparPesquisa();

      console.log(`✅ Unfollow realizado para ${username}`);
      return true;
    } catch (error) {
      console.error(`❌ Erro ao dar unfollow em ${username}:`, error);
      await this.limparPesquisa();
      return false;
    }
  }

  // Executa unfollow em massa baseado na análise dos dados
  async executarUnfollowInteligente() {
    try {
      console.log("🧠 Iniciando unfollow inteligente...");

      // Primeiro analisa os dados
      const analise = await this.analisarDadosInstagram();

      if (analise.naoSeguemDeVolta.length === 0) {
        console.log("🎉 Todas as pessoas que você segue te seguem de volta!");
        return;
      }

      console.log(
        `🎯 Preparando unfollow de ${analise.naoSeguemDeVolta.length} pessoas...`
      );

      // Verifica se está na página correta
      if (!window.location.href.includes("/following/")) {
        console.log("❌ Você precisa estar na sua página de 'Seguindo'");
        console.log(
          "🔗 Vá para: https://www.instagram.com/[seuusuario]/following/"
        );
        console.log("📋 Depois execute o comando novamente");
        return;
      }

      // Verifica se o campo de pesquisa está disponível
      const campoPesquisa = this.encontrarCampoPesquisa();
      if (!campoPesquisa) {
        console.log("❌ Campo de pesquisa não encontrado na página");
        console.log("🔄 Recarregue a página e tente novamente");
        return;
      }

      console.log("✅ Campo de pesquisa encontrado, iniciando processo...");
      console.log(
        `⚙️ Configuração: ${
          this.pausaACada
        } unfollows por ciclo, pausa de ${Math.round(
          this.delays.pausaLonga.min / 1000
        )}-${Math.round(this.delays.pausaLonga.max / 1000)}s`
      );

      this.isRunning = true;
      this.removidos = 0; // Reutilizando contador para unfollows
      this.erros = 0;

      // Executa unfollow para cada pessoa
      for (const username of analise.naoSeguemDeVolta) {
        if (!this.isRunning) {
          console.log("🛑 Processo interrompido pelo usuário");
          break;
        }

        // Tenta fazer unfollow
        const sucesso = await this.darUnfollow(username);

        if (sucesso) {
          this.removidos++;
          console.log(
            `📊 Progresso: ${this.removidos}/${Math.min(
              analise.naoSeguemDeVolta.length,
              this.maxRemocoesPorSessao
            )}`
          );

          // Pausa estratégica a cada X unfollows (seguindo a regra de 5)
          if (this.removidos % this.pausaACada === 0) {
            const pausaLonga = this.gerarDelay(
              this.delays.pausaLonga.min,
              this.delays.pausaLonga.max
            );
            console.log(
              `⏸️ Pausa estratégica de ${Math.round(pausaLonga / 1000)}s após ${
                this.removidos
              } unfollows...`
            );
            console.log(
              "🛡️ Aplicando regras de segurança para evitar detecção"
            );
            await this.aguardar(pausaLonga);
          }
        } else {
          this.erros++;
          console.log(
            `⚠️ Falha no unfollow de ${username} (${this.erros} erros total)`
          );
        }

        // Delay padrão entre tentativas
        const delay = this.gerarDelay(
          this.delays.entreCliques.min,
          this.delays.entreCliques.max
        );
        await this.aguardar(delay);

        // Verifica limite de sessão
        if (this.removidos >= this.maxRemocoesPorSessao) {
          console.log(
            `🛑 Limite de ${this.maxRemocoesPorSessao} unfollows por sessão atingido`
          );
          console.log("🔄 Execute novamente mais tarde para continuar");
          break;
        }
      }

      this.isRunning = false;
      console.log("🎉 Unfollow inteligente finalizado!");
      console.log(
        `📈 Relatório final: ${this.removidos} unfollows realizados, ${this.erros} erros`
      );

      if (this.removidos < analise.naoSeguemDeVolta.length) {
        const restantes = analise.naoSeguemDeVolta.length - this.removidos;
        console.log(`📋 Ainda restam ${restantes} pessoas para unfollow`);
        console.log("🔄 Execute o comando novamente mais tarde para continuar");
      }
    } catch (error) {
      this.isRunning = false;
      console.error("❌ Erro no unfollow inteligente:", error);
    }
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

// Novas funções para unfollow inteligente
function analisarDadosInstagram() {
  return removerSeguidores.analisarDadosInstagram();
}

function executarUnfollowInteligente() {
  removerSeguidores.isRunning = true;
  return removerSeguidores.executarUnfollowInteligente();
}

function pararUnfollowInteligente() {
  removerSeguidores.parar();
}

// Função para unfollow manual de uma lista específica
function unfollowLista(listaUsuarios) {
  if (!Array.isArray(listaUsuarios)) {
    console.log("❌ Parâmetro deve ser um array de nomes de usuário");
    return;
  }

  console.log(
    `🎯 Iniciando unfollow manual de ${listaUsuarios.length} usuários...`
  );
  removerSeguidores.isRunning = true;
  removerSeguidores.executarUnfollowLista(listaUsuarios);
}

// Adiciona função à classe para unfollow de lista específica
RemoverSeguidoresInstagram.prototype.executarUnfollowLista = async function (
  listaUsuarios
) {
  try {
    if (!window.location.href.includes("/following/")) {
      console.log("❌ Você precisa estar na sua página de 'Seguindo'");
      console.log(
        "🔗 Vá para: https://www.instagram.com/[seuusuario]/following/"
      );
      return;
    }

    const campoPesquisa = this.encontrarCampoPesquisa();
    if (!campoPesquisa) {
      console.log("❌ Campo de pesquisa não encontrado na página");
      return;
    }

    this.removidos = 0;
    this.erros = 0;

    for (const username of listaUsuarios) {
      if (!this.isRunning) break;

      const sucesso = await this.darUnfollow(username);

      if (sucesso) {
        this.removidos++;

        if (this.removidos % this.pausaACada === 0) {
          const pausaLonga = this.gerarDelay(
            this.delays.pausaLonga.min,
            this.delays.pausaLonga.max
          );
          console.log(
            `⏸️ Pausa estratégica de ${Math.round(pausaLonga / 1000)}s...`
          );
          await this.aguardar(pausaLonga);
        }
      }

      const delay = this.gerarDelay(
        this.delays.entreCliques.min,
        this.delays.entreCliques.max
      );
      await this.aguardar(delay);

      if (this.removidos >= this.maxRemocoesPorSessao) {
        console.log(
          `🛑 Limite de ${this.maxRemocoesPorSessao} unfollows atingido`
        );
        break;
      }
    }

    this.isRunning = false;
    console.log(
      `🎉 Unfollow finalizado! ${this.removidos} unfollows realizados, ${this.erros} erros`
    );
  } catch (error) {
    this.isRunning = false;
    console.error("❌ Erro no unfollow:", error);
  }
};

// Exemplo de configuração personalizada:
// configurarScript({
//     maxRemocoes: 30,
//     pausaACada: 5,
//     delays: {
//         entreCliques: { min: 3000, max: 6000 }
//     }
// });

console.log("📋 Script carregado! Comandos disponíveis:");
console.log("   🔹 REMOÇÃO DE SEGUIDORES:");
console.log("     iniciarRemocaoSeguidores() - Inicia a remoção");
console.log("     pararRemocaoSeguidores() - Para a execução");
console.log("");
console.log("   🔹 UNFOLLOW INTELIGENTE:");
console.log(
  "     analisarDadosInstagram() - Analisa dados baixados do Instagram"
);
console.log(
  "     executarUnfollowInteligente() - Executa unfollow de quem não segue de volta"
);
console.log(
  "     unfollowLista(['user1', 'user2']) - Unfollow de lista específica"
);
console.log("     pararUnfollowInteligente() - Para o unfollow inteligente");
console.log("");
console.log("   🔹 CONFIGURAÇÃO:");
console.log("     configurarScript(opcoes) - Configura parâmetros");
console.log("");
console.log("🔍 NOVO v2.4: Simulação de digitação ULTRA-REALÍSTICA!");
console.log("⌨️ NOVO: Eventos keypress, InputEvent e variação de timing!");
console.log("🖱️ NOVO: Movimento de mouse, hover e cliques detalhados!");
console.log("🎯 NOVO: Seletor aprimorado para campo de pesquisa!");
console.log("� NOVO: Simulação de comportamento humano avançado!");
console.log("� NOVO: Suporte a maiúsculas/minúsculas com Shift!");
console.log("🧹 NOVO: Limpeza com triplo clique + eventos personalizados!");
console.log("⏳ NOVO: Tempos variáveis e pausas ocasionais realísticas!");
console.log("🛡️ Regra de segurança: 5 unfollows + pausa de 30-60s");
console.log("");
console.log(
  "⚠️ IMPORTANTE: Use com responsabilidade e respeite os termos do Instagram!"
);
