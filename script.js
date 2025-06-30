const feeData = {
  1: { monthly: 200, annual: 1500 },
  2: { monthly: 300, annual: 2000 },
  3: { monthly: 400, annual: 2500 },
  4: { monthly: 500, annual: 3000 },
  5: { monthly: 600, annual: 3500 },
  6: { monthly: 700, annual: 4000 },
  7: { monthly: 800, annual: 4500 },
  8: { monthly: 900, annual: 5000 },
  9: { monthly: 1000, annual: 5500 },
  10: { monthly: 1200, annual: 6000 },
  11: { monthly: 1300, annual: 6500 },
  12: { monthly: 1400, annual: 7000 },
};

function updateFees() {
  const selectedClass = document.getElementById("classSelect").value;
  const feeInfo = feeData[selectedClass];
  const feeDiv = document.getElementById("feeDetails");

  if (feeInfo) {
    feeDiv.innerHTML = `
      <p><strong>Monthly Fee:</strong> ₹${feeInfo.monthly}</p>
      <p><strong>Annual Fee (Till Exam):</strong> ₹${feeInfo.annual} <span style="color:green">(Discounted)</span></p>
    `;
  } else {
    feeDiv.innerHTML = "";
  }

  updateFeeAmounts();
}

function updateFeeAmounts() {
  const selectedClass = document.getElementById("classSelect").value;
  const selectedFeeType = document.querySelector("select[name='feeType']").value;
  const feeInfo = feeData[selectedClass];

  const monthlyInput = document.getElementById("monthlyFee");
  const annualInput = document.getElementById("annualFee");

  monthlyInput.value = "";
  annualInput.value = "";

  if (feeInfo) {
    if (selectedFeeType === "Monthly") {
      monthlyInput.value = feeInfo.monthly;
    } else if (selectedFeeType === "Annual") {
      annualInput.value = feeInfo.annual;
    }
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("admissionForm");
  const data = {
    studentName: form.studentName.value,
    fatherName: form.fatherName.value,
    class: form.class.value,
    contact: form.contact.value,
    feeType: form.feeType.value,
    monthlyFee: form.monthlyFee.value,
    annualFee: form.annualFee.value
  };

  console.log(data);

  const response = await fetch("https://sheetdb.io/api/v1/yhoeccgpx3pzz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });

  const message = document.getElementById("form-message");
  if (response.ok) {
    message.textContent = "✅ Thank you! Your details have been submitted.";
    message.style.color = "green";
    form.reset();
    document.getElementById("feeDetails").innerHTML = "";
  } else {
    message.textContent = "❌ Failed to submit. Please try again.";
    message.style.color = "red";
  }

  return false;
}
