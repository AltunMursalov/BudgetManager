require('module-alias/register');
const http = require('http')
const BudgetManager = require('@BudgetManagerAPI')
const BudgetManagerServer = http.Server(BudgetManager)
const BudgetManagerPort = process.env.PORT || 3001
const LOCAL = '0.0.0.0'
BudgetManagerServer.listen(BudgetManagerPort, LOCAL, () => {
    console.log(`Budget Manager running on ${BudgetManagerPort}`);
});