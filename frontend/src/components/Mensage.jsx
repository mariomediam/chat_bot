export const Mensaje = ({setIrAChat}) => {
    return (
        <div className="inicio-container">            

            <p>¡Hola! Quería compartir contigo un proyecto en el que he estado trabajando: ¡un chatbot asistente desarrollado con tecnología de Inteligencia Artificial para brindar información y orientar a los ciudadanos sobre los servicios que ofrece la Municipalidad Provincial de Piura de acuerdo al TUPA</p>

            <p>Aquí está la lista de los servicios que actualmente están incorporados en el chatbot:</p>

            <ul>
                <li>Expedición de Carné de Sanidad</li>
                <li>Emisión de Licencia de Conducir de Vehículo Menor Categoría B IIB y B IIC</li>
                <li>Permiso de ingreso para el transporte especial de carga y descarga de mercancías que circulan dentro y fuera del anillo vial centro de Piura</li>
                <li>Expedición de Título de Propiedad a Posesionarios con Antigüedad Mayor a Dos Años</li>
                <li>Revalidación de Licencia de Conducir de Vehículo Menor</li>
                <li>Acceso a la Información Pública creada u obtenida por la entidad, que se encuentre en su posesión o bajo su control</li>
                <li>Licencia de funcionamiento para edificaciones calificadas con nivel de riesgo medio (con itse posterior)</li>
                <li>Certificado de Zonificación y Vías, con Plan de Ordenamiento Urbano</li>
                <li>Tarjeta Única de Circulación- TUC para el servicio especial y regular de transporte de personas</li>
            </ul>


            <p>Me gustaría que pruebes el chatbot y me ayudes a identificar posibles fallas o áreas de mejora. Este chatbot ha sido desarrollado con IA, lo que significa que aprende y mejora con el tiempo a través de la interacción con los usuarios.</p>

            <p>Para probar el chatbot, simplemente envía cualquier pregunta o consulta relacionada con los servicios antes mencionados. Si tienen alguna otra idea o sugerencia para mejorar la experiencia del chatbot, también son bienvenidas.</p>

            <p>¡Gracias por tu colaboración!</p>            
            
            <button className="button-irAChat" onClick={() => setIrAChat(true)}>Ir al chatbot</button>
            
            
        </div>
    );
}
