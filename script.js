const currentDate = document.querySelector('.current-date');
const daysTag = document.querySelector('.list-days');
const prevNextIcon = document.querySelectorAll('.icons span');
const todayBtn = document.querySelector(".today");
let isRange = true;
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// border: '2px solid #003D67'

const listEvents = [
    {
        date: '2024-10-02',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
        border: '2px solid #0EA5E9'
    },
    {
        date: '2024-10-05',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
    },
    {
        date: '2024-10-06',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
    },
    {
        date: '2024-10-07',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
    },
    {
        date: '2024-10-08',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
    },
    {
        date: '2024-10-09',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
        border: '2px solid #003D67'
    },
    {
        date: '2024-10-10',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
    },
    {
        date: '2024-10-12',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
    },
    {
        date: '2024-10-16',
        textColor: '#000',
        border: '2px solid #003D67'
    },
    {
        date: '2024-10-21',
        textColor: '#000',
        border: '2px solid #003D67'
    },
    {
        date: '2024-11-01',
        textColor: '#000',
        border: '2px solid #003D67'
    }
];

const renderCalendar = () => {
    const firstDateofMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let liTag = "";

    for (let index = firstDateofMonth; index > 0; index--) {
        liTag += `<li class="list-item-days inactive"><span class="day">${lastDateofLastMonth - index + 1}</span></li>`;
    }

    for (let index = 1; index <= lastDateofMonth; index++) {
        let isToday = index === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? 'active' : '';
        let fullDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${index.toString().padStart(2, '0')}`;
        liTag += `<li class="list-item-days ${isToday}" data-date="${fullDate}"><span class="day" data-date="${fullDate}">${index}</span</li>`;
    }

    for (let index = lastDayofMonth; index < 6; index++) {
        liTag += `<li class="list-item-days inactive"><span class="day">${index - lastDayofMonth + 1}</span></li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;

    // Aplica os estilos dos eventos
    applyEventStyles();
    applyDateRangeStyles('2024-10-01', '2024-10-05');

}

const applyEventStyles = () => {
    if (isRange) {
        const dayElements = document.querySelectorAll('.list-item-days .day');

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
}

// Função para aplicar o estilo do intervalo de datas
const applyDateRangeStyles = (startDate, endDate) => {
    if (!isRange) {        
        const dayElements = document.querySelectorAll('.list-item-days');
        
        let startFound = false;

        dayElements.forEach(day => {
            const dayDate = day.getAttribute('data-date');
            
            // Limpar classes antigas de seleção
            day.classList.remove('startSelection', 'endSelection', 'inRange');

            // Verifica se a data atual é o início ou o fim do range
            if (dayDate === startDate) {
                day.classList.add('startSelection');
                startFound = true;
            } else if (dayDate === endDate) {
                day.classList.add('endSelection');
                startFound = false;
            }

            // Adiciona classe de intervalo para os dias entre start e end
            if (startFound && dayDate !== startDate) {
                day.classList.add('inRange');
            }
        });
    }
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
    wrapper.classList.remove('material-style', 'bootstrap-style', 'tce-style', 'default-style');

    // Verifica o estilo a ser aplicado com base no parâmetro
    if (styleConfig.material) {
        wrapper.classList.add('material-style');
    } else if (styleConfig.bootstrap) {
        wrapper.classList.add('bootstrap-style');
    } else if (styleConfig.tce) {
        wrapper.classList.add('tce-style');
    } else {
        // Aplica o estilo default se não houver outro valor informado
        wrapper.classList.add('default-style');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        isRange = true;
        renderCalendar();

      } else {
        isRange = false;
        renderCalendar();
      }
    });
  });


renderCalendar();
