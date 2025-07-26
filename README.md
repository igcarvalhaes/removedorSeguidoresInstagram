# Script Remover Seguidores Instagram v2.7

Script JavaScript avançado para remover seguidores e executar unfollow inteligente no Instagram de forma automatizada e humanizada, evitando detecção pelos sistemas anti-bot da Meta.

## ⚠️ AVISO IMPORTANTE

- **Use este script por sua própria conta e risco**
- **Respeite os termos de uso do Instagram**
- **O uso excessivo pode resultar em limitações na sua conta**
- **Teste primeiro com poucos seguidores**
- **Este script é fornecido apenas para fins educacionais**

## 🚀 Recursos Principais

### 📊 **Duas Funcionalidades Principais:**

1. **🔥 Remoção de Seguidores** - Remove seguidores da sua lista
2. **🧠 Unfollow Inteligente** - Para de seguir pessoas que não te seguem de volta

### 🛡️ **Recursos Anti-Detecção:**

- ✅ **Simulação humana completa** - Movimentos de mouse, hover, cliques detalhados
- ⌨️ **Digitação ultra-realística** - Eventos de teclado completos (keydown → keypress → input → keyup)
- 🎯 **Timing humanizado** - Delays aleatórios e pausas ocasionais
- 🔧 **Eventos nativos** - Usa Object.defineProperty para simular entrada natural
- 📱 **Compatibilidade total** - Funciona em desktop e mobile

### ⚙️ **Configurações Inteligentes:**

- 🔄 **Sem limite de sessão** - Processa lista completa automaticamente
- ⏸️ **Pausas estratégicas** - 30-60 segundos a cada 5 ações
- 🛡️ **Cooldown de segurança** - 10 minutos obrigatórios a cada 50 ações
- 🧹 **Limpeza automática** - Usa botão nativo do Instagram quando disponível
- 📊 **Logs detalhados** - Acompanhe todo o progresso em tempo real

## 📋 Instalação e Uso

### 🎯 **Remoção de Seguidores**

1. **Acesse a página de seguidores:**

   ```
   https://www.instagram.com/[seuusuario]/followers/
   ```

2. **Abra o console do navegador:**

   - Pressione `F12`
   - Vá para a aba "Console"

3. **Execute o script:**
   ```javascript
   // Cole o conteúdo completo do arquivo remover-seguidores.js
   // Depois execute:
   iniciarRemocaoSeguidores();
   ```

### 🧠 **Unfollow Inteligente**

1. **Baixe seus dados do Instagram:**

   - Acesse Instagram → Configurações → Privacidade e Segurança
   - Clique em "Baixar dados"
   - Escolha formato **HTML** e solicite o download
   - Aguarde o email com o link para download
   - Baixe e extraia o arquivo ZIP

2. **Acesse a página de following:**

   ```
   https://www.instagram.com/[seuusuario]/following/
   ```

3. **Execute o script:**

   ```javascript
   // Cole o script no console e execute:
   executarUnfollowInteligente();
   ```

4. **Selecione a pasta de dados:**
   - Quando solicitado, selecione a pasta `instagram-[seuusuario]-data`
   - O script analisará automaticamente e iniciará o unfollow

## 🎮 Comandos Disponíveis

### 📊 **Remoção de Seguidores:**

```javascript
// Iniciar remoção de seguidores
iniciarRemocaoSeguidores();

// Parar execução
pararRemocaoSeguidores();
```

### 🧠 **Unfollow Inteligente:**

```javascript
// Processo completo: análise + unfollow automático
executarUnfollowInteligente();

// Apenas analisar dados (sem fazer unfollow)
analisarDadosInstagram();

// Parar unfollow inteligente
pararUnfollowInteligente();

// Unfollow de lista específica
unfollowLista(["usuario1", "usuario2", "usuario3"]);
```

### ⚙️ **Configuração:**

```javascript
// Configurar parâmetros
configurarScript({
  maxRemocoes: Infinity, // Sem limite (padrão)
  pausaACada: 5, // Pausa a cada X ações
  cooldownACada: 50, // Cooldown de segurança a cada X ações
  cooldownDuracao: 10 * 60 * 1000, // Duração do cooldown (10 min)
  delays: {
    entreCliques: { min: 2000, max: 5000 }, // Entre cliques
    aposConfirmacao: { min: 1500, max: 3000 }, // Após confirmação
    pausaLonga: { min: 30000, max: 60000 }, // Pausa estratégica
  },
});
```

## 📖 Exemplos Práticos

### 🚀 **Exemplo 1: Unfollow Inteligente Básico**

```javascript
// Configuração conservadora para iniciantes
configurarScript({
  pausaACada: 3,
  delays: {
    entreCliques: { min: 3000, max: 6000 },
    pausaLonga: { min: 60000, max: 120000 },
  },
});

// Executar unfollow inteligente
executarUnfollowInteligente();
```

### 🔍 **Exemplo 2: Apenas Análise (sem unfollow)**

```javascript
// Analisar dados sem fazer unfollow
analisarDadosInstagram().then((resultado) => {
  console.log(`👥 Você tem ${resultado.seguidores.length} seguidores`);
  console.log(`➡️ Você segue ${resultado.seguindo.length} pessoas`);
  console.log(`💔 ${resultado.naoSeguemDeVolta.length} não seguem de volta`);

  // Salvar lista para uso posterior
  window.listaNaoSegueDeVolta = resultado.naoSeguemDeVolta;
});
```

### 📋 **Exemplo 3: Unfollow de Lista Específica**

```javascript
// Unfollow apenas de usuários específicos
const usuariosParaUnfollow = ["usuario1", "usuario2", "usuario3"];

unfollowLista(usuariosParaUnfollow);
```

### ⚡ **Exemplo 4: Configuração Rápida**

```javascript
// Para usuários experientes (use com cuidado!)
configurarScript({
  pausaACada: 10,
  delays: {
    entreCliques: { min: 1500, max: 3000 },
    pausaLonga: { min: 20000, max: 40000 },
  },
});

executarUnfollowInteligente();
```

### 🛡️ **Exemplo 5: Configuração Ultra-Segura**

```javascript
// Máxima segurança para contas sensíveis
configurarScript({
  pausaACada: 2,
  cooldownACada: 25, // Cooldown mais frequente
  delays: {
    entreCliques: { min: 5000, max: 10000 },
    pausaLonga: { min: 120000, max: 180000 }, // 2-3 minutos
  },
});

executarUnfollowInteligente();
```

## 🔧 Configurações Detalhadas

### ⚙️ **Parâmetros Principais:**

| Parâmetro         | Padrão          | Descrição                               |
| ----------------- | --------------- | --------------------------------------- |
| `maxRemocoes`     | `Infinity`      | Máximo de ações por sessão (sem limite) |
| `pausaACada`      | `5`             | Pausa longa a cada X ações              |
| `cooldownACada`   | `50`            | Cooldown de segurança a cada X ações    |
| `cooldownDuracao` | `600000ms`      | Duração do cooldown (10 minutos)        |
| `entreCliques`    | `2000-5000ms`   | Delay entre cliques                     |
| `aposConfirmacao` | `1500-3000ms`   | Delay após confirmação                  |
| `pausaLonga`      | `30000-60000ms` | Pausa estratégica (30-60s)              |

### 🎯 **Configurações Recomendadas:**

**Para iniciantes:**

```javascript
{
  pausaACada: 3,
  delays: {
    entreCliques: { min: 3000, max: 6000 },
    pausaLonga: { min: 60000, max: 120000 }
  }
}
```

**Para usuários experientes:**

```javascript
{
  pausaACada: 5,
  delays: {
    entreCliques: { min: 2000, max: 4000 },
    pausaLonga: { min: 30000, max: 60000 }
  }
}
```

## �️ Sistema de Cooldown de Segurança

### 🔒 **Proteção Automática contra Detecção**

O script implementa um **sistema de cooldown obrigatório** que pausa automaticamente a cada 50 ações por 10 minutos. Este é um mecanismo crucial de segurança:

#### ⚙️ **Como Funciona:**

1. **Contador Automático:** A cada ação (unfollow/remoção), incrementa contador
2. **Trigger de Segurança:** Ao atingir 50 ações, pausa obrigatória
3. **Cooldown Progressivo:** 10 minutos com progresso visual em 20 intervalos
4. **Retomada Automática:** Continua processo após cooldown completo

#### 🎯 **Configurações de Cooldown:**

```javascript
configurarScript({
  cooldownACada: 50, // Trigger: pausa a cada 50 ações
  cooldownDuracao: 10 * 60 * 1000, // Duração: 10 minutos
});

// Configuração conservadora (mais segura)
configurarScript({
  cooldownACada: 25, // Pausa a cada 25 ações
  cooldownDuracao: 15 * 60 * 1000, // 15 minutos de pausa
});
```

#### 🚫 **Interrupção Durante Cooldown:**

```javascript
// Para interromper durante cooldown
pararRemocaoSeguidores();
// ou
pararUnfollowInteligente();

// Verificação: "🛑 Cooldown interrompido pelo usuário"
```

#### 📊 **Exemplo de Log de Cooldown:**

```
🛡️ COOLDOWN DE SEGURANÇA: Aguardando 10 minutos após 50 unfollows...
⏰ Isso ajuda a evitar detecção pela Meta
🕐 Início do cooldown: 14:32:15
⏳ Cooldown: 5% completo (9 min restantes)
⏳ Cooldown: 25% completo (7 min restantes)
⏳ Cooldown: 50% completo (5 min restantes)
⏳ Cooldown: 75% completo (2 min restantes)
⏳ Cooldown: 100% completo (0 min restantes)
✅ Cooldown finalizado às 14:42:15
🔄 Retomando processo de unfollow...
```

### 🎯 **Por que o Cooldown é Importante:**

- **🛡️ Evita Rate Limiting:** Instagram tem limites de ações por tempo
- **🤖 Simula Comportamento Humano:** Pausas longas são naturais
- **⚠️ Previne Banimento:** Reduz chances de detecção automática
- **📈 Maior Taxa de Sucesso:** Contas protegidas duram mais

## �📊 Monitoramento e Logs

### 🎯 **Logs do Unfollow Inteligente:**

```
🧠 Iniciando unfollow inteligente...
📁 37 arquivos encontrados
✅ Arquivos encontrados, analisando...
👥 Você tem 1250 seguidores
➡️ Você segue 890 pessoas
💔 156 pessoas não seguem você de volta:
1. usuario_exemplo1
2. usuario_exemplo2
...

🎯 Preparando unfollow de 156 pessoas...
✅ Campo de pesquisa encontrado, iniciando processo...

🔍 Pesquisando por usuario_exemplo1...
⌨️ Digitação completa (15 caracteres): "usuario_exemplo1"
✅ Encontrado botão "Seguindo" para usuario_exemplo1, processando...
✅ Unfollow realizado para usuario_exemplo1
📊 Progresso: 1/156

⏸️ Pausa estratégica de 45s após 5 unfollows...
🛡️ Aplicando regras de segurança para evitar detecção

🛡️ COOLDOWN DE SEGURANÇA: Aguardando 10 minutos após 50 unfollows...
⏰ Isso ajuda a evitar detecção pela Meta
🕐 Início do cooldown: 14:32:15
⏳ Cooldown: 5% completo (9 min restantes)
⏳ Cooldown: 10% completo (9 min restantes)
⏳ Cooldown: 15% completo (8 min restantes)
...
⏳ Cooldown: 95% completo (0 min restantes)
⏳ Cooldown: 100% completo (0 min restantes)
✅ Cooldown finalizado às 14:42:15
🔄 Retomando processo de unfollow...

🎉 Unfollow inteligente finalizado!
📈 Relatório final: 156 unfollows realizados, 3 erros
```

### 🔍 **Logs da Remoção de Seguidores:**

```
🚀 Iniciando remoção de seguidores...
📊 Configurações: Max ∞ remoções, pausa a cada 5

🎯 Tentando remover seguidor...
✅ Seguidor removido! Total: 1

⏸️ Pausa estratégica de 52s após 5 remoções...

🛡️ COOLDOWN DE SEGURANÇA: Aguardando 10 minutos após 50 unfollows...
⏰ Isso ajuda a evitar detecção pela Meta
🕐 Início do cooldown: 15:45:30
⏳ Cooldown: 25% completo (7 min restantes)
⏳ Cooldown: 50% completo (5 min restantes)
⏳ Cooldown: 75% completo (2 min restantes)
⏳ Cooldown: 100% completo (0 min restantes)
✅ Cooldown finalizado às 15:55:30
🔄 Retomando processo de unfollow...

🎉 Processo finalizado!
📈 Relatório: 25 removidos, 0 erros
```

## 🛠️ Solução de Problemas

### ❌ **Problemas Comuns:**

**Script não encontra botões:**

- ✅ Verifique se está na página correta
- ✅ Aguarde a página carregar completamente
- ✅ Recarregue a página se necessário

**Campo de pesquisa não funciona:**

- ✅ Verifique se está na página `/following/`
- ✅ Certifique-se que a lista carregou
- ✅ Teste pesquisar manualmente primeiro

**Instagram detecta atividade suspeita:**

- ✅ Pare o script imediatamente
- ✅ Aguarde algumas horas antes de tentar novamente
- ✅ Use configurações mais conservadoras
- ✅ Reduza o `cooldownACada` para pausas mais frequentes

**Cooldown muito longo ou frequente:**

- ✅ Aumente `cooldownACada` para menos pausas (ex: 75 ou 100)
- ✅ Reduza `cooldownDuracao` para pausas mais curtas (ex: 5 minutos)
- ⚠️ **Cuidado:** Configurações muito agressivas aumentam o risco

**Script parou durante cooldown:**

- ✅ É normal - cooldown é obrigatório para segurança
- ✅ Aguarde o progresso chegar a 100%
- ✅ Para interromper, use `pararRemocaoSeguidores()`

**Dados do Instagram não encontrados:**

- ✅ Certifique-se que baixou no formato HTML
- ✅ Extraia completamente o arquivo ZIP
- ✅ Procure pelos arquivos `followers_1.html` e `following.html`

### 🔧 **Comandos de Emergência:**

```javascript
// Parar qualquer execução imediatamente
pararRemocaoSeguidores();
pararUnfollowInteligente();

// Verificar se algo está executando
console.log(removerSeguidores.isRunning);

// Limpar campo de pesquisa manualmente
removerSeguidores.limparPesquisa();
```

## 💡 Dicas Importantes

### 🎯 **Melhores Práticas:**

1. **🧪 Comece devagar** - Use configurações conservadoras
2. **📊 Monitore sempre** - Acompanhe os logs durante execução
3. **⏸️ Faça pausas** - Pausas longas entre sessões
4. **🔍 Teste primeiro** - Teste com poucos itens
5. **💾 Faça backup** - Salve listas importantes antes de usar
6. **🛡️ Respeite o cooldown** - NÃO interrompa durante cooldowns
7. **📈 Configure limites** - Use `cooldownACada` menor para mais segurança

### ⚠️ **Uso Responsável:**

- **Não abuse** - Não execute várias vezes seguidas
- **Seja paciente** - Deixe o script trabalhar devagar
- **Monitore limites** - Instagram pode aplicar rate limits
- **Use com moderação** - Ações excessivas chamam atenção

### 🚫 **Evite:**

- ❌ Executar múltiplas instâncias simultaneamente
- ❌ Usar em contas comerciais importantes sem teste
- ❌ Modificar configurações durante execução
- ❌ Usar configurações muito agressivas

## 🔒 Segurança e Privacidade

### 🛡️ **Garantias de Segurança:**

- ✅ **100% Local** - Roda apenas no seu navegador
- ✅ **Sem servidores** - Não envia dados para lugar nenhum
- ✅ **Sem coleta** - Não armazena informações da sua conta
- ✅ **Código aberto** - Você pode verificar todo o código
- ✅ **Sem instalação** - Não instala nada no seu sistema

### 🔐 **Proteção de Dados:**

- Seus dados do Instagram permanecem no seu computador
- Nenhuma informação é transmitida pela internet
- O script apenas automatiza ações que você faria manualmente
- Não armazena senhas ou tokens de acesso

## 📱 Compatibilidade

### 🌐 **Navegadores Suportados:**

- ✅ Chrome (Recomendado)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ✅ Opera

### 💻 **Sistemas Operacionais:**

- ✅ Windows
- ✅ macOS
- ✅ Linux
- ✅ Chrome OS

### 📱 **Dispositivos:**

- ✅ Desktop/Laptop (Recomendado)
- ⚠️ Tablet (Funciona, mas pode ser instável)
- ❌ Smartphone (Não recomendado - tela pequena)

## 🆕 Novidades da Versão 2.7

### ⚡ **v2.7 - Sem Limites + Cooldown de Segurança:**

- 🔄 **Sem limite de sessão** - Processa lista completa automaticamente
- �️ **Sistema de Cooldown** - 10 minutos obrigatórios a cada 50 ações
- �🚫 **Removida verificação de erros consecutivos** - Continua mesmo com falhas pontuais
- ⚙️ **Configuração padrão otimizada** - Melhor experiência out-of-the-box
- 📊 **Progresso visual do cooldown** - 20 intervalos com tempo restante

### 🎯 **v2.6 - Otimizado:**

- ⚡ **Digitação 2x mais rápida** (60-150ms entre caracteres)
- 🚫 **Removida verificação desnecessária** de lista filtrada
- ⏱️ **Tempos de espera otimizados** para máxima eficiência
- 📈 **Logs reduzidos** para melhor performance

### 🔥 **v2.5 - Anti-Detecção Avançada:**

- 🚫 **Evita alterar .value diretamente** - Instagram não detecta
- ⌨️ **Sequência keydown → keypress → input → keyup** PERFEITA
- 🖱️ **Usa botão de limpar nativo** do Instagram quando disponível
- 🔧 **Object.defineProperty** para simular entrada natural

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. **Leia esta documentação completamente**
2. **Verifique a seção "Solução de Problemas"**
3. **Teste com configurações mais conservadoras**
4. **Verifique se está na página correta**

## ⚖️ Disclaimer Legal

- Este script é fornecido **"como está"** sem garantias
- O uso é de **total responsabilidade do usuário**
- Não nos responsabilizamos por **qualquer consequência** do uso
- **Respeite sempre** os termos de serviço do Instagram
- Use apenas para **fins educacionais e pessoais**

---

**Versão atual: 2.7** | **Última atualização: Julho 2025**
