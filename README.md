# Expense Tracker CLI

Uma aplicação de linha de comando feita em Node.js para gerenciar suas finanças pessoais. Registre, visualize, atualize e remova despesas diretamente pelo terminal, com persistência de dados em arquivo CSV.

## Funcionalidades

- **Adicionar despesa** — registre uma despesa com valor e descrição
- **Visualizar despesas** — liste todas as despesas ou busque por ID
- **Atualizar despesa** — edite o valor ou descrição de uma despesa existente
- **Deletar despesa** — remova uma despesa pelo ID
- **Resumo total** — veja o total gasto em todas as despesas
- **Resumo por mês** — filtre o total de gastos por mês

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Commander.js](https://www.npmjs.com/package/commander) — para criação dos comandos CLI
- [csv-writer](https://www.npmjs.com/package/csv-writer) — para escrita no arquivo CSV
- [csv-parser](https://www.npmjs.com/package/csv-parser) — para leitura do arquivo CSV

## Estrutura do Projeto

```
expense-tracker/
├── expense-tracker.js   # Ponto de entrada e definição dos comandos CLI
├── Expense.js           # Lógica de negócio das despesas
├── CSV.js               # Camada de acesso e persistência em CSV
├── expenses.csv         # Arquivo de armazenamento das despesas
└── package.json
```

## Como usar

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)

### Instalação

```bash
git clone https://github.com/AlvesKZ/expense-tracker.git
cd expense-tracker
npm install
```

### Comandos disponíveis

#### Adicionar uma despesa

```bash
node expense-tracker.js add --amount <valor> --description <descrição>
```

```bash
node expense-tracker.js add -a 50 -d "Almoço"
# Expense added successfully (ID: 1)
```

#### Listar todas as despesas

```bash
node expense-tracker.js view
```

```
# ID   Date         Description            Amount
# 1    2025-01-15   Almoço                 50
# 2    2025-01-16   Transporte             20
```

#### Buscar despesa por ID

```bash
node expense-tracker.js view --id <id>
```

#### Atualizar uma despesa

```bash
node expense-tracker.js update --id <id> --amount <novo_valor> --description <nova_descrição>
```

#### Deletar uma despesa

```bash
node expense-tracker.js delete --id <id>
```

#### Ver resumo total de gastos

```bash
node expense-tracker.js summary
# Total expenses: $70
```

#### Ver resumo por mês

```bash
node expense-tracker.js summary --month <número_do_mês>
```

```bash
node expense-tracker.js summary --month 1
# Total expenses for January: $70
```

## Persistência de dados

As despesas são salvas automaticamente no arquivo `expenses.csv`. Cada registro contém:

| Campo         | Descrição                                      |
|---------------|------------------------------------------------|
| `id`          | Identificador único gerado automaticamente     |
| `amount`      | Valor da despesa                               |
| `description` | Descrição da despesa                           |
| `date`        | Data de criação (gerada automaticamente)       |

## Licença

Este projeto está licenciado sob a licença **ISC**.

---

Feito por [AlvesKZ](https://github.com/AlvesKZ)
