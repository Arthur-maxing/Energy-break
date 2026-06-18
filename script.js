document.getElementById('energy-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const showerMin = parseFloat(document.getElementById('shower').value);
    const acHours = parseFloat(document.getElementById('ac').value);
    const electronicsHours = parseFloat(document.getElementById('electronics').value);
    const lightHours = parseFloat(document.getElementById('lights').value);
    const lightType = document.getElementById('light-type').value;
    const washingMachinePerWeek = parseFloat(document.getElementById('washing-machine').value);
    const ironHoursPerWeek = parseFloat(document.getElementById('iron').value);
    const microwaveMinPerDay = parseFloat(document.getElementById('microwave').value);
    const videogameHours = parseFloat(document.getElementById('videogame').value);
    const fanHours = parseFloat(document.getElementById('fan').value);
    const hairdryerMin = parseFloat(document.getElementById('hairdryer').value);

    // Power approximations in Watts
    const powerShower = 4500; // Eletric shower average
    const powerAC = 1500; // Air conditioner average
    const powerElectronics = 150; // TV + Laptop average
    const powerWashingMachine = 500; // Average
    const powerIron = 1000; // Average
    const powerMicrowave = 1200; // Average
    const powerVideogame = 200; // Console average
    const powerFan = 70; // Fan average
    const powerHairdryer = 1500; // Hairdryer average
    
    let powerLight = 9; // LED default
    if (lightType === 'fluorescent') powerLight = 20;
    if (lightType === 'incandescent') powerLight = 60;
    const numLights = 5; // Average number of active lights

    // Calculate daily consumption in kWh = (Power(W) * Hours) / 1000
    const dailyShowerKWh = (powerShower * (showerMin / 60)) / 1000;
    const dailyACKWh = (powerAC * acHours) / 1000;
    const dailyElectronicsKWh = (powerElectronics * electronicsHours) / 1000;
    const dailyLightsKWh = (powerLight * numLights * lightHours) / 1000;
    const dailyWashingMachineKWh = ((powerWashingMachine * 1.5) / 1000) * (washingMachinePerWeek / 7); // Assuming 1.5h per wash
    const dailyIronKWh = (powerIron * (ironHoursPerWeek / 7)) / 1000;
    const dailyMicrowaveKWh = (powerMicrowave * (microwaveMinPerDay / 60)) / 1000;
    const dailyVideogameKWh = (powerVideogame * videogameHours) / 1000;
    const dailyFanKWh = (powerFan * fanHours) / 1000;
    const dailyHairdryerKWh = (powerHairdryer * (hairdryerMin / 60)) / 1000;

    // Refrigerator average daily consumption (constant approx)
    const dailyFridgeKWh = 1.5; 

    // Total monthly consumption (30 days)
    const totalDaily = dailyShowerKWh + dailyACKWh + dailyElectronicsKWh + dailyLightsKWh + dailyWashingMachineKWh + dailyIronKWh + dailyMicrowaveKWh + dailyVideogameKWh + dailyFanKWh + dailyHairdryerKWh + dailyFridgeKWh;
    const totalMonthly = Math.round(totalDaily * 30);

    displayResult(totalMonthly, showerMin, acHours, lightType);
});

function displayResult(kwh, showerMin, acHours, lightType) {
    // Hide form, show result
    document.getElementById('calculator-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    // Update Score
    document.getElementById('kwh-result').innerText = kwh;

    // Evaluate
    const statusBox = document.getElementById('status-box');
    const statusTitle = document.getElementById('status-title');
    const statusMessage = document.getElementById('status-message');
    
    // Reset classes
    statusBox.className = 'status-box';

    let tips = [];

    if (kwh <= 100) {
        statusBox.classList.add('status-good');
        statusTitle.innerText = "Excelente! 🌍";
        statusMessage.innerText = "Seu consumo está muito consciente e sustentável. Você é um exemplo para o ODS 12!";
    } else if (kwh <= 220) {
        statusBox.classList.add('status-warning');
        statusTitle.innerText = "Bom, mas pode melhorar! 🌱";
        statusMessage.innerText = "Seu consumo está na média, mas com pequenas mudanças você pode ser mais responsável.";
    } else {
        statusBox.classList.add('status-bad');
        statusTitle.innerText = "Atenção ao Consumo! ⚠️";
        statusMessage.innerText = "Seu gasto está alto. Isso impacta negativamente o meio ambiente (e a conta de luz!).";
    }

    // Generate smart tips
    if (showerMin > 10) {
        tips.push("Reduza o tempo de banho para cerca de 5 a 8 minutos. O chuveiro elétrico é um dos maiores vilões da energia.");
    } else {
        tips.push("Ótimo trabalho mantendo banhos rápidos e economizando água e energia!");
    }

    if (acHours > 4) {
        tips.push("Tente usar ventiladores em dias menos quentes ou reduza as horas do Ar Condicionado.");
    }

    if (lightType === 'incandescent' || lightType === 'fluorescent') {
        tips.push("Troque suas lâmpadas antigas por modelos de LED. Elas iluminam igual e gastam até 80% menos energia!");
    }

    if (washingMachinePerWeek > 3) {
        tips.push("Tente acumular mais roupas para lavar de uma só vez. Usar a máquina com capacidade máxima economiza água e energia.");
    }

    if (ironHoursPerWeek > 2) {
        tips.push("Acumule roupas para passar todas de uma vez. O ferro consome muita energia para esquentar repetidas vezes.");
    }

    tips.push("Desligue os aparelhos da tomada quando não estiver usando. O modo stand-by também gasta energia (Consumo Fantasma).");
    tips.push("Lembre-se do ODS 12: Produzir mais usando menos. Cada atitude ajuda a salvar recursos naturais e o planeta!");

    // Display tips
    const tipsList = document.getElementById('tips-list');
    tipsList.innerHTML = '';
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.innerText = tip;
        tipsList.appendChild(li);
    });
}

// Recalculate Button
document.getElementById('recalculate-btn').addEventListener('click', function() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('calculator-section').classList.remove('hidden');
    
    // Add small delay to trigger animation
    const formSection = document.getElementById('calculator-section');
    formSection.style.animation = 'none';
    formSection.offsetHeight; /* trigger reflow */
    formSection.style.animation = null; 
});
