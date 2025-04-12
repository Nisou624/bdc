document.getElementById('pdfForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 1. Collect form data
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    
    // 2. Load the existing fillable PDF
    const existingPdfBytes = await fetch('BonDeCommande.pdf').then((res) => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  
    // 3. Get the form fields and set values
    const form = pdfDoc.getForm();
    form.getTextField('FullNameField').setText(fullName);
    form.getTextField('EmailField').setText(email);
  
    // 4. Flatten if desired (makes the fields uneditable)
    // form.flatten();
  
    // 5. Save the modified PDF
    const pdfBytes = await pdfDoc.save();
  
    // 6. Trigger a download in the browser
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FilledForm.pdf';
    link.click();
    
    URL.revokeObjectURL(url);
  });
  