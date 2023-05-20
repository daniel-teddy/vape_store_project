const PORT = process.env.PORT || 4005
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()



const links = [
    /* disposable vapes */
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori/disposable-vape-puffbar'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/2'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/3'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/4'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/5'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/6'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/7'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/8'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/9'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/10'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/11'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/12'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/13'
    },
    {
        type: 'disposable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-disposable-vape-puffbar/14'
    },
    /* rechrageables */
    {
        type: 'rechargeable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori/vape-cihazlari',
    },
    {
        type: 'rechargeable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-vape-cihazlari/2',
    },
    {
        type: 'rechargeable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-vape-cihazlari/3',
    },
    {
        type: 'rechargeable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-vape-cihazlari/4',
    },
    {
        type: 'rechargeable-vapes',
        address: 'https://vapenationcyprus.com/urun-kategori-vape-cihazlari/5',
    },
    /* free base liquids */
    {
        type: 'free-base-liquids',
        address: 'https://vapenationcyprus.com/urun-kategori/freebase-likitler-60-120ml',
    },
    {
        type: 'free-base-liquids',
        address: 'https://vapenationcyprus.com/urun-kategori-freebase-likitler-60-120ml/2',
    },
    /* salt liquids */
    {
        type: 'salt-liquid',
        address: 'https://vapenationcyprus.com/urun-kategori/salt-likitler-30-50-mg',
    },
    {
        type: 'salt-liquid',
        address: 'https://vapenationcyprus.com/urun-kategori-salt-likitler-30-50-mg/2',
    },
    /* coil and pods */
    {
        type: 'coils-pods',
        address: 'https://vapenationcyprus.com/urun-kategori/coil-ve-pod',
    },
    {
        type: 'coils-pods',
        address: 'https://vapenationcyprus.com/urun-kategori-coil-ve-pod/2',
    },
    {
        type: 'coils-pods',
        address: 'https://vapenationcyprus.com/urun-kategori-coil-ve-pod/3',
    },
    {
        type: 'coils-pods',
        address: 'https://vapenationcyprus.com/urun-kategori-coil-ve-pod/4',
    },
    {
        type: 'coils-pods',
        address: 'https://vapenationcyprus.com/urun-kategori-coil-ve-pod/5',
    }
]
const base = 'https://vapenationcyprus.com/'

const products = []

links.forEach(link => {
    axios.get(link.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html);
            
            $('div[class*=shop-item]').each((index, element) => {
                const href = $(element).find('a').attr('href');
                const img_link = $(element).find('img').attr('src')
                const item_name = $(element).find('div[class*=features]').find('span').text()
                const item_price = $(element).find('div[class*=price]').find('span').text()
                products.push(
                    {
                        item: item_name,
                        price: item_price,
                        type: link.type,
                        item_url: base+href,
                        item_image: base + img_link
                    }
                );    
              });
            
        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my API')
    
})

app.get('/items', (req, res) => {
    res.json(products)
})
// console.log(links.length)

app.listen(PORT, () => console.log(`server running on PORT http://localhost:${PORT}`))
