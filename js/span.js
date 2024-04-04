document.addEventListener('DOMContentLoaded', function() {
    // Ottiengo tutti gli input e select all'interno del form
    const inputsAndSelects = document.querySelectorAll('#formRegister input, #formRegister select');

    // Aggiungo un listener di evento di focus a ciascun input e select
    inputsAndSelects.forEach(function(element) {
        element.addEventListener('focus', function() {
            // Nascondo tutti gli span
            hideAllSpans();

            // Trovo lo span corrispondente e lo mostro in display
            const span = this.parentNode.querySelector('span');
            if (span) {
                span.style.display = 'inline';
            }
        });
    });

    // Evento clic al documento
    document.addEventListener('click', function(event) {
        const clickedElement = event.target;

        // Nascondi gli span se viene cliccato un punto qualsiasi dello schermo
        if (!clickedElement.matches('span') && !clickedElement.matches('input') && !clickedElement.matches('select')) {
            hideAllSpans();
        }
    });

    // Funzione per nascondere tutti gli span
    function hideAllSpans() {
        const spans = document.querySelectorAll('#formRegister span');
        spans.forEach(function(span) {
            span.style.display = 'none';
        });
    }
});


