const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbot-close');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');
const commonQuestions = document.querySelectorAll('.common-question');

const botResponses = {
    "es": {
        "¿Qué servicios ofrecen?": "En NimbusCore ofrecemos una gama completa de servicios cloud:\n\n1. Infraestructura: Soluciones robustas y escalables en AWS y Azure.\n2. Seguridad: Protección avanzada para tus datos y sistemas.\n3. FinOps: Optimización de costos en la nube.\n\nPara más detalles, no dudes en contactarnos en contact@nimbuscore.io",
        "¿Cómo puedo contactarlos?": "Puedes contactarnos de varias formas:\n\n1. Email: contact@nimbuscore.io\n2. LinkedIn: <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>link</a>\n3. WhatsApp: <a href='https://wa.me/34672003043?text=%C2%A1Hola!%20Estoy%20interesado%20en%20los%20servicios%20de%20NimbusCore.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' target='_blank' rel='noopener noreferrer'>WhatsApp</a>\n\nEstaremos encantados de atender tus consultas y ofrecerte soluciones personalizadas.",
        "¿Qué es FinOps?": "FinOps, o Cloud Financial Operations, es una práctica que combina finanzas, tecnología y negocios para optimizar los costos en la nube. En NimbusCore, nuestro enfoque FinOps incluye:\n\n1. Análisis detallado del gasto en la nube\n2. Optimización de recursos\n3. Previsión de costos\n4. Implementación de mejores prácticas\n\nPara saber cómo podemos ayudarte a reducir tus costos en la nube, contáctanos en contact@nimbuscore.io",
        "¿Trabajan con AWS y Azure?": "¡Sí! En NimbusCore tenemos amplia experiencia tanto en AWS como en Azure:\n\n1. Equipo de profesionales certificados en ambas plataformas\n2. Implementación de soluciones multi-cloud\n3. Migración entre plataformas\n4. Optimización de costos en ambos entornos\n\nSíguenos en LinkedIn para estar al día de nuestras últimas certificaciones y proyectos: <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>link</a>"
    },
    "en": {
        "What services do you offer?": "At NimbusCore, we offer a comprehensive range of cloud services:\n\n1. Infrastructure: Robust and scalable solutions on AWS and Azure.\n2. Security: Advanced protection for your data and systems.\n3. FinOps: Cloud cost optimization.\n\nFor more details, don't hesitate to contact us at contact@nimbuscore.io",
        "How can I contact you?": "You can contact us in several ways:\n\n1. Email: contact@nimbuscore.io\n2. LinkedIn: <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>link</a>\n3. WhatsApp: <a href='https://wa.me/34672003043?text=Hello!%20I%27m%20interested%20in%20NimbusCore%27s%20services.%20Can%20you%20provide%20more%20information%3F' target='_blank' rel='noopener noreferrer'>WhatsApp</a>\n\nWe'll be happy to address your inquiries and offer you personalized solutions.",
        "What is FinOps?": "FinOps, or Cloud Financial Operations, is a practice that combines finance, technology, and business to optimize cloud costs. At NimbusCore, our FinOps approach includes:\n\n1. Detailed analysis of cloud spending\n2. Resource optimization\n3. Cost forecasting\n4. Implementation of best practices\n\nTo learn how we can help you reduce your cloud costs, contact us at contact@nimbuscore.io",
        "Do you work with AWS and Azure?": "Yes, we do! At NimbusCore, we have extensive experience with both AWS and Azure:\n\n1. Team of certified professionals on both platforms\n2. Implementation of multi-cloud solutions\n3. Migration between platforms\n4. Cost optimization in both environments\n\nFollow us on LinkedIn to stay updated on our latest certifications and projects: <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>link</a>"
    }
};

function getCurrentLanguage() {
    return document.documentElement.lang;
}

function addMessage(message, isBot = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isBot ? 'bot-message' : 'user-message');
    // Replace links with properly formatted anchor tags
    const formattedMessage = message.replace(/<a href='([^']+)'>/g, "<a href='$1' target='_blank' rel='noopener noreferrer'>");
    messageElement.innerHTML = formattedMessage.replace(/\n/g, '<br>');
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const lang = getCurrentLanguage();
    return botResponses[lang][message] || (lang === 'es' ? 
        "Lo siento, no puedo responder esa pregunta específica. Para obtener más información, por favor contáctanos en contact@nimbuscore.io, por <a href='https://wa.me/34672003043?text=%C2%A1Hola!%20Estoy%20interesado%20en%20los%20servicios%20de%20NimbusCore.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' target='_blank' rel='noopener noreferrer'>WhatsApp</a> o visita nuestro <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>" : 
        "I'm sorry, I can't answer that specific question. For more information, please contact us at contact@nimbuscore.io, via <a href='https://wa.me/34672003043?text=Hello!%20I%27m%20interested%20in%20NimbusCore%27s%20services.%20Can%20you%20provide%20more%20information%3F' target='_blank' rel='noopener noreferrer'>WhatsApp</a> or visit our <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>");
}

function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message);
        userInput.value = '';
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, true);
        }, 500);
    }
}

sendMessage.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

commonQuestions.forEach(button => {
    button.addEventListener('click', () => {
        const question = button.getAttribute('data-question');
        addMessage(question);
        setTimeout(() => {
            const botResponse = getBotResponse(question);
            addMessage(botResponse, true);
        }, 500);
    });
});

chatbotToggle.addEventListener('click', () => {
    chatbot.classList.add('active');
    chatbotToggle.style.display = 'none';
});

chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('active');
    chatbotToggle.style.display = 'block';
});

window.addEventListener('load', () => {
    const lang = getCurrentLanguage();
    const welcomeMessage = lang === 'es' ? 
        "¡Hola! Soy el asistente virtual de NimbusCore. ¿En qué puedo ayudarte hoy? Si tienes alguna pregunta específica, no dudes en contactarnos por email: contact@nimbuscore.io, <a href='https://wa.me/34672003043?text=%C2%A1Hola!%20Estoy%20interesado%20en%20los%20servicios%20de%20NimbusCore.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' target='_blank' rel='noopener noreferrer'>WhatsApp</a> o visitar nuestro <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>" : 
        "Hello! I'm the NimbusCore virtual assistant. How can I help you today? If you have any specific questions, don't hesitate to contact us at contact@nimbuscore.io, via <a href='https://wa.me/34672003043?text=Hello!%20I%27m%20interested%20in%20NimbusCore%27s%20services.%20Can%20you%20provide%20more%20information%3F' target='_blank' rel='noopener noreferrer'>WhatsApp</a> or visit our <a href='https://www.linkedin.com/company/nimbuscoreio/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>";
    addMessage(welcomeMessage, true);
});