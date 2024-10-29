const downloadPdf = (e, cvLink) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = cvLink;
    link.download = 'cv.pdf';
    link.click();
  };

  export default downloadPdf