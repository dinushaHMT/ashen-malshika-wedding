
const data = WEDDING_DATA;

document.getElementById("groomName").textContent = data.groom;
document.getElementById("brideName").textContent = data.bride;
document.getElementById("invitationText").textContent = data.invitation;
document.getElementById("dateText").textContent = data.dateText;
document.getElementById("timeText").textContent = data.timeText;
document.getElementById("venueText").textContent = `${data.venue}, ${data.location}`;
document.getElementById("specialTitle").textContent = data.specialTitle;
document.getElementById("specialMessage").textContent = data.specialMessage;
document.getElementById("detailsDate").textContent = data.dateText;
document.getElementById("detailsTime").textContent = data.timeText;
document.getElementById("detailsVenue").textContent = data.venue;
document.getElementById("detailsLocation").textContent = data.location;
document.getElementById("mapLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.mapQuery)}`;

const countdown = document.getElementById("countdown");
function updateCountdown(){
  const target = new Date(data.dateISO).getTime();
  const now = Date.now();
  const diff = target - now;
  if(diff <= 0){
    countdown.innerHTML = `<div><strong>Today</strong><span>Wedding Day</span></div>`;
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const mins = Math.floor(diff / 60000) % 60;
  const secs = Math.floor(diff / 1000) % 60;
  countdown.innerHTML = `
    <div><strong>${days}</strong><span>Days</span></div>
    <div><strong>${hours}</strong><span>Hours</span></div>
    <div><strong>${mins}</strong><span>Minutes</span></div>
    <div><strong>${secs}</strong><span>Seconds</span></div>`;
}
setInterval(updateCountdown,1000);
updateCountdown();

const scheduleList = document.getElementById("scheduleList");
data.schedule.forEach(item=>{
  scheduleList.innerHTML += `
    <div class="timeline-item">
      <div class="time">${item.time}</div>
      <div><h3>${item.title}</h3><p>${item.note}</p></div>
    </div>`;
});

const slider = document.getElementById("sliderImage");
const caption = document.getElementById("sliderCaption");
const slides = [
  {src:"assets/groom.jpg", text:"Groom"},
  {src:"assets/bride.jpg", text:"Bride"}
];
let idx = 0;
setInterval(()=>{
  slider.classList.add("fade");
  setTimeout(()=>{
    idx = (idx + 1) % slides.length;
    slider.src = slides[idx].src;
    caption.textContent = slides[idx].text;
    slider.classList.remove("fade");
  },500);
},2000);

function sendRSVP(e){
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const guests = document.getElementById("guestCount").value;
  const message = document.getElementById("guestMessage").value.trim();
  const text = `Wedding RSVP%0AName: ${encodeURIComponent(name)}%0AGuests: ${encodeURIComponent(guests)}%0AMessage: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/${data.rsvpPhone}?text=${text}`,"_blank");
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
