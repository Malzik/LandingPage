import { toast } from 'react-toastify';

const style = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const toastAxiosError = baseMessage => error => {
  if (error.response !== undefined) {
    let message = `${baseMessage} : Erreur lors de l'appel (${
      error.response.status
    } : ${
      error.response.responseText
        ? error.response.responseText
        : error.response.statusText
    } sur [${error.config.method.toLocaleUpperCase()}] ${
      error.request.responseURL
    })`;

    if (error.response.status === 520) {
      message = `${baseMessage} : Erreur remontée par le serveur`;
    }
    if (error.response.status === 500) {
      message = `${baseMessage} : Impossible de contacter le serveur`;
    }
    toast.error(message, style);
    return message;
  }
  const message = `Erreur: ${JSON.stringify(error)}`;
  toast.error(message, style);
  return message;
};

export { toastAxiosError };
