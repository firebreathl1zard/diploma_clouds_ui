export const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
    },
    modal: {
      background: 'rgb(39, 38, 51)',
      padding: '5px',
      borderRadius: '20px',
      width: '420px',
      height: 'auto',
      border: '1px solid #7C7A8C'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    okButton: {
      padding: '10px 15px',
      backgroundColor: 'transparent',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    closeButton: {
      color: '#ffffff',
      position: 'flex',
      left: '10px',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      fontSize: '30px',
    },
  };