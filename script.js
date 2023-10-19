const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '81e3a20580msh3642f8a99acbb0fp1b6a8djsn7be6d578e02b',
    'X-RapidAPI-Host': 'ip-reputation-geoip-and-detect-vpn.p.rapidapi.com'
  }
};

const fetchIpInfo = ip => {
    return fetch(`https://ip-reputation-geoip-and-detect-vpn.p.rapidapi.com/?ip=${ip}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.log(err))
}



const $ = selector => document.querySelector(selector)

const $form = $('#form')
const $input = $('#input')
const $submit = $('#submit')
const $results = $('#results')
const $theme = $('#theme')
const htmlElement = document.documentElement
const icon = $('#icon')
const $map = $('#map')
const $mapContainer = $('#map')

let map = null
$form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const {value} = $input
    if(!value) return
    

    $submit.setAttribute('disabled', '')
    $submit.setAttribute('aria-busy', 'true')
    validateIpAddres()


    const ipInfo = await fetchIpInfo(value)
    

    if($mapContainer._leaflet_id){
      $mapContainer._leaflet_id = null;
      $mapContainer.innerHTML = '';
    }

    if(ipInfo){
        $results.innerHTML = JSON.stringify(ipInfo, null, 2)
        const latitude = ipInfo.latitude;
        const longitude = ipInfo.longitude;

        if(validateIpAddres()===true){
          const map = L.map('map').setView([latitude, longitude], 5);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);
        }
        

        

    }

    $submit.removeAttribute('disabled')
    $submit.removeAttribute('aria-busy')

    

})

$theme.addEventListener('click', () => {
  if(htmlElement.getAttribute('data-theme') === 'dark'){
    htmlElement.setAttribute('data-theme', 'ligth')
    icon.setAttribute('name', 'moon-outline')
  }else{
    htmlElement.setAttribute('data-theme', 'dark')
    icon.setAttribute('name', 'sunny-outline')
  }
})

function validateIpAddres(){
      const ipPatter = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ip = $input.value;
      const isValid = ipPatter.test(ip);
      if(!isValid){
        $submit.removeAttribute('disabled')
        $submit.removeAttribute('aria-busy')
        return false;
      }else{
        return true;
      }
    }


