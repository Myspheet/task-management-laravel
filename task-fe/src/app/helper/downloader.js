export const pdfDownloader = (data, filename = "tasks.pdf") => {
    const pdfBlob = new Blob([data], {
        type: "application/pdf",
    });
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(pdfBlob);

    // Create a temporary <a> element to trigger the download
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", filename); // Set the desired filename for the downloaded file

    // Append the <a> element to the body and click it to trigger the download
    document.body.appendChild(tempLink);
    tempLink.click();

    // Clean up the temporary elements and URL
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);
};
