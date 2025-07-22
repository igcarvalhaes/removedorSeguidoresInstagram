# Script Remover Seguidores Instagram

Este script JavaScript permite remover seguidores do Instagram de forma automatizada e humanizada, evitando detecção pelos sistemas anti-bot da Meta.

## ⚠️ AVISO IMPORTANTE

- Use este script por sua própria conta e risco
- Respeite os termos de uso do Instagram
- O uso excessivo pode resultar em limitações na sua conta
- Teste primeiro com poucos seguidores

## 🚀 Como Usar

### 1. Preparação

1. Acesse sua conta do Instagram no navegador
2. Vá para `https://www.instagram.com/[seunome]/followers/`
3. Aguarde o modal com a lista de seguidores carregar

### 2. Execução

1. Abra o console do navegador (pressione `F12` e vá para a aba "Console")
2. Copie todo o conteúdo do arquivo `remover-seguidores.js`
3. Cole no console e pressione `Enter`
4. Execute o comando: `iniciarRemocaoSeguidores()`

### 3. Comandos Disponíveis

```javascript
// Iniciar remoção
iniciarRemocaoSeguidores();

// Parar execução
pararRemocaoSeguidores();

// Configurar parâmetros
configurarScript({
  maxRemocoes: 30, // Máximo de remoções por sessão
  pausaACada: 5, // Pausa longa a cada X remoções
  delays: {
    entreCliques: { min: 3000, max: 6000 }, // Delay entre cliques
  },
});
```

## ⚙️ Configurações Padrão

- **Máximo de remoções por sessão**: 50
- **Pausa longa a cada**: 10 remoções
- **Delay entre cliques**: 2-5 segundos
- **Delay após confirmação**: 1.5-3 segundos
- **Pausa longa**: 30-60 segundos

## 🛡️ Recursos de Proteção

### Humanização

- Delays aleatórios entre ações
- Simulação de movimento do mouse
- Pausas estratégicas durante a execução
- Scroll suave para carregar mais seguidores

### Detecção de Erros

- Para automaticamente após 3 erros consecutivos
- Limite de remoções por sessão
- Log detalhado de todas as ações

### Configurabilidade

- Todos os timings são configuráveis
- Limites ajustáveis conforme necessidade
- Possibilidade de parar a qualquer momento

## 📊 Monitoramento

O script fornece feedback em tempo real:

```
🚀 Iniciando remoção de seguidores...
🎯 Tentando remover seguidor...
✅ Seguidor removido! Total: 1
⏸️ Pausa estratégica de 45s após 10 remoções...
🎉 Processo finalizado!
📈 Relatório: 25 removidos, 0 erros
```

## 🔧 Personalização Avançada

### Exemplo de configuração conservadora:

```javascript
configurarScript({
  maxRemocoes: 20,
  pausaACada: 3,
  delays: {
    entreCliques: { min: 4000, max: 8000 },
    pausaLonga: { min: 60000, max: 120000 },
  },
});
```

### Exemplo de configuração mais rápida:

```javascript
configurarScript({
  maxRemocoes: 100,
  pausaACada: 15,
  delays: {
    entreCliques: { min: 1500, max: 3000 },
    pausaLonga: { min: 20000, max: 40000 },
  },
});
```

## 🐛 Solução de Problemas

### Script não encontra botões

- Verifique se está na página correta de seguidores
- Aguarde a página carregar completamente
- Recarregue a página se necessário

### Muitos erros consecutivos

- Diminua a velocidade aumentando os delays
- Reduza o número máximo de remoções
- Faça pausas mais longas

### Instagram detecta atividade suspeita

- Pare o script imediatamente
- Aguarde algumas horas antes de tentar novamente
- Use configurações mais conservadoras

## 📝 Notas Técnicas

- O script usa seletores CSS específicos para encontrar os botões
- Implementa delays aleatórios para simular comportamento humano
- Faz scroll automático para carregar mais seguidores
- Monitora erros e para automaticamente se necessário

## 🔒 Segurança e Privacidade

- O script roda apenas no seu navegador
- Não coleta nem envia dados para servidores externos
- Não armazena informações da sua conta
- Todo o processamento é local

## 💡 Dicas de Uso

1. **Comece devagar**: Use configurações conservadoras no início
2. **Monitore**: Acompanhe os logs durante a execução
3. **Pausas**: Faça pausas longas entre sessões
4. **Teste**: Teste com poucos seguidores primeiro
5. **Backup**: Considere fazer backup da lista de seguidores antes

---

**Disclaimer**: Este script é fornecido apenas para fins educacionais. O uso é de total responsabilidade do usuário.
