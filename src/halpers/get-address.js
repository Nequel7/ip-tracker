import 'dotenv/config'

export async function getAddress(ip = '8.8.8.8') {
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1?api_key=${process.env.IP_API_KEY}&ip_address=${ip}`)
    return await response.json();
}