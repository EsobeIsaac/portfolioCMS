const downloadPdf = (cvLink) => {
    const link = document.createElement('a');
    link.href = cvLink;
    link.setAttribute('download', 'cv.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  export default downloadPdf