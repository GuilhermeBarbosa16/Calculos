# Cálculos Trabalhistas - README

Este documento detalha como os cálculos trabalhistas foram implementados no site **Cálculos Trabalhistas**. Cada cálculo foi projetado com base na legislação vigente, utilizando métodos que garantem precisão e clareza.

---

## **1. Cálculo de Salário Anual**
### **Fórmula Utilizada:**
- Salário Anual = Salário Mensal x 12 + Valor Total de Gratificações (13º salário e outros adicionais).

### **Implementação:**
1. O usuário informa o salário mensal e, se houver, as gratificações adicionais.
2. O sistema calcula o total somando 12 meses de salário e incluindo os valores adicionais.

### **Exemplo de Uso:**
Um usuário com salário mensal de R$ 2.500 e um 13º salário receberá:
R$ 2.500 x 12 + R$ 2.500 = R$ 32.500 anuais.

---

## **2. Cálculo de Horas Extras**
### **Fórmula Utilizada:**
- Valor da Hora Extra = (Salário Mensal / Horas Mensais) x Percentual de Adicional.

### **Implementação:**
1. O usuário informa:
   - Salário mensal.
   - Quantidade de horas extras realizadas.
   - Percentual de adicional (ex.: 50% ou 100%).
2. O sistema calcula o valor de cada hora extra e multiplica pelo total de horas realizadas.

### **Exemplo de Uso:**
Um usuário com salário de R$ 3.000, jornada mensal de 220 horas e 10 horas extras a 50% receberá:
Valor da Hora Extra = (R$ 3.000 / 220) x 1,5 = R$ 20,45 por hora extra.
Total = R$ 20,45 x 10 = R$ 204,50.

---

## **3. Cálculo do Seguro-Desemprego**
### **Critérios Considerados:**
- Faixa salarial.
- Tempo de contribuição.
- Número de solicitações anteriores.

### **Fórmula Utilizada:**
- Valor Base = Média Salarial dos últimos 3 meses.
- Aplica-se o percentual correspondente à faixa salarial.

### **Implementação:**
1. O usuário informa os últimos três salários recebidos e o sistema calcula a média.
2. Baseado na tabela vigente, é aplicado o percentual correto para determinar o valor das parcelas.

---

## **4. Cálculo da Previdência (INSS)**
### **Fórmula Utilizada:**
- O desconto é calculado com base nas faixas de alíquotas progressivas do INSS.

### **Implementação:**
1. O sistema utiliza a tabela de alíquotas progressivas vigente.
2. O salário informado é dividido pelas faixas, e o desconto é calculado somando os valores proporcionais de cada faixa.

### **Exemplo de Uso:**
Para um salário de R$ 3.000:
- Faixa 1: R$ 1.320 x 7,5% = R$ 99,00
- Faixa 2: R$ 1.320 x 9% = R$ 118,80
- Faixa 3: R$ 360 x 12% = R$ 43,20
Total: R$ 261,00.

---

## **5. Cálculo do Imposto de Renda**
### **Fórmula Utilizada:**
- Base de Cálculo = Salário Bruto - Descontos (INSS e Dependentes).
- Aplicação das alíquotas e deduções conforme a tabela vigente.

### **Implementação:**
1. O sistema calcula a base de cálculo subtraindo o INSS e os descontos por dependentes.
2. Aplica as alíquotas progressivas e deduz o valor fixo conforme a faixa.

### **Exemplo de Uso:**
Para um salário bruto de R$ 4.000 com INSS de R$ 261 e sem dependentes:
Base = R$ 4.000 - R$ 261 = R$ 3.739.
Imposto: Aplicação das faixas resulta em R$ 196,98 de imposto devido.

---

## **6. Cálculo de Rescisão CLT**
### **Itens Considerados:**
- Salário proporcional.
- Aviso prévio.
- 13º proporcional.
- Férias vencidas e proporcionais.
- Multa do FGTS (se aplicável).

### **Implementação:**
1. O usuário informa:
   - Salário base.
   - Data de admissão e demissão.
   - Valores depositados no FGTS.
2. O sistema calcula cada item separadamente, soma os valores e exibe o total.

### **Exemplo de Uso:**
Um usuário com salário de R$ 2.500, demitido após 6 meses de trabalho:
- Salário proporcional: R$ 1.250
- 13º proporcional: R$ 1.250
- Férias proporcionais: R$ 2.083,33
- Multa FGTS: R$ 2.000.
Total: R$ 6.583,33.

---

## **Contato e Sugestões**
Se tiver dúvidas ou sugestões sobre os cálculos, entre em contato através do email: [seuemail@exemplo.com](mailto:seuemail@exemplo.com).

Obrigado por utilizar nosso sistema!

