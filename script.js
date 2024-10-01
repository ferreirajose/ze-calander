const currentDate = document.querySelector('.current-date');
const daysTag = document.querySelector('.list-days');
const prevNextIcon = document.querySelectorAll('.icons span');
const todayBtn = document.querySelector(".today");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const listEvents = [
    {
        date: '2024-10-15',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
        border: '2px solid #003D67'
    },
    {
        date: '2024-06-06',
        textColor: '#ffffff',
        backgroundColor: '#42f554',
        border: '2px solid #42f554'
    },
    {
        date: '2024-10-20',
        textColor: '#ffffff',
        backgroundColor: '#42f554',
        border: '2px solid #42f554'
    }
];

const renderCalendar = () => {
    const firstDateofMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let liTag = "";

    for (let index = firstDateofMonth; index > 0; index--) {
        liTag += `<li class="list-item-days inactive">${lastDateofLastMonth - index + 1}</li>`;
    }

    for (let index = 1; index <= lastDateofMonth; index++) {
        let isToday = index === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? 'active' : '';
        let fullDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${index.toString().padStart(2, '0')}`;
        liTag += `<li class="list-item-days ${isToday}" data-date="${fullDate}">${index}</li>`;
    }

    for (let index = lastDayofMonth; index < 6; index++) {
        liTag += `<li class="list-item-days inactive">${index - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;

    // Aplica os estilos dos eventos
    applyEventStyles();
}

const applyEventStyles = () => {
    const dayElements = document.querySelectorAll('.list-item-days');

    dayElements.forEach(day => {
        const dayDate = day.getAttribute('data-date');
        listEvents.forEach(event => {
            if (event.date === dayDate) {
                day.style.color = event.textColor;
                day.style.backgroundColor = event.backgroundColor;
                day.style.border = event.border;
            }
        });
    });
}

function applyDynamicStyles(datesWithStyle) {
    const dayElements = document.querySelectorAll('.list-item-days');
    
    // Percorre todos os dias renderizados
    dayElements.forEach(day => {
        const dayDate = day.innerText;  // Captura o número do dia

        // Verifica se existe uma correspondência de estilo para o dia atual
        datesWithStyle.forEach(event => {
            const eventDate = new Date(event.date).getDate().toString(); // Extrai o número do dia do evento
            if (eventDate === dayDate) {
                // Aplica as classes de estilo dinamicamente
                day.classList.add(event.styleClass);
            }
        });
    });
}

prevNextIcon.forEach(icon => {
    icon.addEventListener('click', () => {
        currentMonth = icon.id === 'prev' ? currentMonth - 1 : currentMonth + 1;

        if (currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();
    });
});

todayBtn.addEventListener("click", () => {
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    renderCalendar();
});

function changeStyle(styleConfig = { default: true }) {
    const wrapper = document.querySelector('.wrapper');

    // Remove todas as classes de estilo existentes
    wrapper.classList.remove('material-style', 'bootstrap-style', 'default-style');

    // Verifica o estilo a ser aplicado com base no parâmetro
    if (styleConfig.material) {
        wrapper.classList.add('material-style');
    } else if (styleConfig.bootstrap) {
        wrapper.classList.add('bootstrap-style');
    } else {
        // Aplica o estilo default se não houver outro valor informado
        wrapper.classList.add('default-style');
    }
}



renderCalendar();
