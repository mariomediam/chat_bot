import axios from 'axios';

const URL = `http://127.0.0.1:8085`;

const crearChatSession = async () => {
    try {
        const { data: { content } } = await axios.post(`${URL}/chatbot/chat-session/`, {});
        return content;
    } catch (error) {
        throw error;
    }
};

const preguntarAlChatbot = async (chatSessionId, consulta) => {
    try {
        const { data: { message } } = await axios.post(`${URL}/chatbot/conversar`, { chatSessionId, consulta });
        return message;
    } catch (error) {
        throw error;
    }
};

const obtenerChatMessages = async (chatSessionId) => {
    try {
        const { data: { content } } = await axios.get(`${URL}/chatbot/chat-session-message?id=${chatSessionId}`);
        return content;
    } catch (error) {
        throw error;
    }
};


// const obtenerPlanillaDetalle = async (anio, mes, tipo, numero) => {
//     try {
//         let api = UseAxios();

//         let URLPlanilla = `${URL}/lista-planilla-detalle?anio=${anio}&mes=${mes}&tipo=${tipo}&numero=${numero}`;

//         let {
//             data: { content },
//         } = await api.get(`${URLPlanilla}`);

//         return content;
//     } catch (error) {
//         throw error;
//     }
// };

// const generaBoletasPdf = async (anio, mes, tipo, numero) => {
//     try {
//         let api = UseAxios();

//         let credenciales = {
//             anio,
//             mes,
//             tipo,
//             numero,
//         };

//         const headers = {
//             "Content-Type": "application/json",
//         };

//         let URLGeneraBoletas = `${URL}/genera-boletas/`;

//         let {
//             data: { message },
//         } = await api.post(`${URLGeneraBoletas}`, credenciales, {
//             headers,
//         });

//         return message;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerPlanillaBoletasYaGeneradas = async (
//     anio,
//     mes,
//     tipo = undefined,
//     numero = undefined
// ) => {
//     try {
//         let api = UseAxios();

//         let URLPlanillas = `${URL}/lista-planilla-generado?anio=${anio}&mes=${mes}`;

//         if (tipo) {
//             URLPlanillas += `&tipo=${tipo}`;
//         }

//         if (numero) {
//             URLPlanillas += `&numero=${numero}`;
//         }

//         let {
//             data: { content },
//         } = await api.get(`${URLPlanillas}`);

//         if (tipo && numero) {
//             if (content.length === 0) {
//                 return {};
//             }
//             if (content.length === 1) {
//                 return content[0];
//             }
//         }

//         return content;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerPlanillaCorreos = async (anio, mes, tipo, numero) => {
//     try {
//         let api = UseAxios();

//         let URLPlanillasCorreo = `${URL}/lista-planilla-correo?anio=${anio}&mes=${mes}&tipo=${tipo}&numero=${numero}`;

//         let {
//             data: { content },
//         } = await api.get(`${URLPlanillasCorreo}`);

//         return content;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerTipoPlanillaXTipo = async (tipo) => {
//     try {
//         let api = UseAxios();

//         let URLTipoPlanilla = `${URL}/tipo-planilla-xtipo?tipo=${tipo}`;

//         let {
//             data: { content },
//         } = await api.get(`${URLTipoPlanilla}`);

//         if (content.length === 0) {
//             return {};
//         }
//         if (content.length === 1) {
//             return content[0];
//         }
//         return content;
//     } catch (error) {
//         throw error;
//     }
// };

// const enviarBoletas = async (anio, mes, tipo, numero, destinatarios) => {
//     try {
//         let api = UseAxios();

//         let credenciales = {
//             anio,
//             mes,
//             tipo,
//             numero,
//             destinatarios,
//         };

//         const headers = {
//             "Content-Type": "application/json",
//         };

//         let URLEnviarBoletas = `${URL}/enviar-boletas/`;

//         let {
//             data: { message },
//         } = await api.post(`${URLEnviarBoletas}`, credenciales, {
//             headers,
//         });

//         return message;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerBoletaEnvio = async (anio, mes, tipo, numero) => {
//     try {
//         let api = UseAxios();

//         let URLBoletaEnvio = `${URL}/lista-boleta-envio?anio=${anio}&mes=${mes}&tipo=${tipo}&numero=${numero}`;

//         let {
//             data: { content },
//         } = await api.get(`${URLBoletaEnvio}`);

//         return content;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerTrabajadorCorreoPagination = async (URLTrabajadorCorreo) => {
//     try {
//         let api = UseAxios();

//         let { data } = await api.get(`${URLTrabajadorCorreo}&page_size=20`);

//         return data;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerTrabajadorCorreo = async (valor) => {
//     try {
//         let api = UseAxios();

//         let URLTrabajadorCorreo = `${URL}/lista-trabajador-correo?valor=${valor}`;

//         let {
//             data: { content },
//         } = await api.get(`${URLTrabajadorCorreo}`);

//         return content;
//     } catch (error) {
//         throw error;
//     }
// };

// const actualizarTrabajadorCorreo = async (dni, correo) => {
//     try {
//         let api = UseAxios();

//         let credenciales = {
//             dni,
//             correo,
//         };

//         const headers = {
//             "Content-Type": "application/json",
//         };

//         let URLUpdateTrabajadorCorreo = `${URL}/update-trabajador-correo/`;

//         let {
//             data: { message },
//         } = await api.post(`${URLUpdateTrabajadorCorreo}`, credenciales, {
//             headers,
//         });

//         return message;
//     } catch (error) {
//         throw error;
//     }
// };

// const eliminarTrabajadorCorreo = async (dni) => {
//     try {
//         let api = UseAxios();

//         let URLDeleteTrabajadorCorreo = `${URL}/delete-trabajador-correo/${dni}}`;

//         let {
//             data: { message },
//         } = await api.delete(`${URLDeleteTrabajadorCorreo}`);

//         return message;
//     } catch (error) {
//         throw error;
//     }
// };

export {
    crearChatSession,
    preguntarAlChatbot,
    obtenerChatMessages
};
