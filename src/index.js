import 'babel-polyfill'
import 'leaflet/dist/leaflet.css';
import {addOffset,addTileLayer, validateIp,getAddress} from './halpers';
import L from 'leaflet';
import icon from '../images/icon-location.svg'

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [55.7483, 37.5],
    zoom: 14,
});
const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
})
addTileLayer(map)


btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if (validateIp(ipInput.value)) {
        getAddress(ipInput.value).then(setInfo)
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData()
    }
}

function setInfo(mapData) {
    console.log(mapData);
    ipInfo.innerText = mapData.ip_address;
    locationInfo.innerText = `${mapData.region} | ${mapData.city}`;
    timezoneInfo.innerText = mapData.timezone.gmt_offset;
    ispInfo.innerText = mapData.connection.organization_name;

    map.setView([mapData.latitude, mapData.longitude]);
    L.marker([mapData.latitude, mapData.longitude], {icon: markerIcon}).addTo(map)

    if (matchMedia("max-width: 1024px").matches){
    addOffset(map);
    }

}
document.addEventListener('DOMContentLoaded',()=>{
    getAddress('2.16.53.255').then(setInfo)
})