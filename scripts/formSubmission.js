function formLoading() {
    document.getElementById('submit').disabled = true;
    document.getElementById('contact').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    return true;
}

function formSubmitted() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('message').style.display = 'block';
    document.getElementById('submit').disabled = false;
    return true;
    
}