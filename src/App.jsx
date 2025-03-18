
import React, { useState } from "react";
import axios from "axios";

function App() {
    const [principal, setPrincipal] = useState("");
    const [monthlyInterestRate, setMonthlyInterestRate] = useState("");
    const [loanMonths, setLoanMonths] = useState("");
    const [serviceFee, setServiceFee] = useState(10);
    const [commissionRate, setCommissionRate] = useState(15);
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculatePayment = async () => {
        try {
            const res = await axios.post("https://loanagent-production.up.railway.app/calculate_custom_payment", {
                principal: parseFloat(principal),
                monthly_interest_rate: parseFloat(monthlyInterestRate),
                loan_months: parseInt(loanMonths),
                service_fee: parseFloat(serviceFee),
                commission_rate: parseFloat(commissionRate),
            });
            setMonthlyPayment(res.data.monthly_payment);
        } catch (error) {
            alert(`请求出错: ${error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>贷款计算器</h2>
            <input type="number" placeholder="贷款金额" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            <input type="number" placeholder="月利率（%）" value={monthlyInterestRate} onChange={(e) => setMonthlyInterestRate(e.target.value)} />
            <input type="number" placeholder="贷款月数" value={loanMonths} onChange={(e) => setLoanMonths(e.target.value)} />
            <input type="number" placeholder="服务费（默认10）" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} />
            <input type="number" placeholder="佣金比率（默认15%）" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} />
            <button onClick={calculatePayment}>计算每月还款</button>
            {monthlyPayment && <h3>每月还款: {monthlyPayment} 元</h3>}
        </div>
    );
}

export default App;
