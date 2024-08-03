const feedbackBtn = document.getElementById('feedbackBtn')
const feedbackBox = document.getElementById('feedbackBox')
feedbackBtn.addEventListener('click', () => {
    if(feedbackBox.classList.contains('flex')){
        feedbackBox.classList.remove('flex')
        feedbackBox.classList.add('hidden')
        feedbackBtn.innerHTML = 'see feedbacks'
    }
    else{
        feedbackBox.classList.remove('hidden')
        feedbackBox.classList.add('flex')
        feedbackBtn.innerHTML = 'hide feedbacks'
    }
})