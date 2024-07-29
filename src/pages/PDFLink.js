import React from 'react';

const PDFLink = () => {
  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/Service Provider.pdf'; // Ensure this path is correct
    link.download = 'Service Provider.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPdf2 = () => {
    const link = document.createElement('a');
    link.href = '/Freelancer Application form.pdf'; // Ensure this path is correct
    link.download = 'Freelancer Application form.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <>
    <button
    onClick={downloadPdf2}
    style={{
      color: '#fff', 
      float: 'right', 
      background: '#ff0066', 
      borderStyle: 'none', 
      fontWeight: 'bold', 
      fontFamily: 'poppins', 
      padding: '8px', 
      borderRadius: '10px', 
      marginRight: '40px',
      marginTop: '20px',
    }}
  >
       Download Freelancer Form
    </button>
    <button 
    onClick={downloadPdf}
    style={{
      color: '#fff', 
      float: 'right', 
      background: '#ff0066', 
      borderStyle: 'none', 
      fontWeight: 'bold', 
      fontFamily: 'poppins', 
      padding: '8px', 
      borderRadius: '10px', 
      marginRight: '40px',
      marginTop: '20px',
    }}
  >
       Download Application Form
      </button>
    </>
  );
};

export default PDFLink;


{/*const PDFLink = () => {
    return (
      <div className='filler'>
        <div className= 'pdf'>
          <a href="/Service Provider.pdf" download>
            Click here to download the form
          </a>
        

        <style>{`
        .pdf{
          margin-left: 930px;
          background-color: #ff0066;
          color:fff;
        }

        .filler{
          margin-left: 930px;
          background-color: #ff0066;
          color:fff;
        }

        a {
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          font-family: Poppins, sans-serif;
        }

        a:hover {
          text-decoration: underline;
        }

        
        
        `}</style>
</div>
        </div>
      );

      
};


export default PDFLink;*/}