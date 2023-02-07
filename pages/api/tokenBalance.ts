// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
const web3key = "fdQs7LFOiXuhLVImnaBI9EK30GMN2a8n5JZ6skaCihEc8j7taBoafXsBvOnvq4oD"

const token_list = [
  {
    chain: "eth",
    address: "0xf0f9d895aca5c8678f706fb8216fa22957685a13",
    token_name:"CULT" 
  },
  {
    chain: "eth",
    address: "0x2d77b594b9bbaed03221f7c63af8c4307432daf1",
    token_name:"dCULT" 
  },
  {
    chain: "eth",
    address: "0x93eeb426782bd88fcd4b48d7b0368cf061044928",
    token_name:"TRG" 
  },
  {
    chain: "eth",
    address: "0x5b985b4f827072febe33091b42729522b557bba1",
    token_name:"T" 
  },
  {
    chain: "eth",
    address: "0xc6956b78e036b87ba2ab9810bf081eb76eedd17a",
    token_name:"H" 
  },
  {
    chain: "eth",
    address: "0x27D395e7C5727DeAE1ff7CcFc0D4163307491b9C",
    token_name:"E" 
  },
  {
    chain: "eth",
    address: "0x832eCd622d8C15716152eE60Ae281956B9219532",
    token_name:"R" 
  },
  {
    chain: "eth",
    address: "0xdE1C6d3719E42A31aEBe7f6a7DC9B25Faa1C93a4",
    token_name:"U" 
  },
  {
    chain: "eth",
    address: "0x1F0b80225e5d2e97358963a99bD5e3Ddd50B18B7",
    token_name:"G" 
  },
  {
    chain: "eth",
    address: "0x97e19e2a5458294842036404e6a05571d8bc2fa3",
    token_name:"G*" 
  },
  {
    chain: "eth",
    address: "0x9835E9345F3dC64C2771aFDBc535806e901341BD",
    token_name:"A" 
  },
  {
    chain: "eth",
    address: "0xc3e486f614e297d8e016ac2805e81707c627b2d5",
    token_name:"M" 
  },
  {
    chain: "eth",
    address: "0xA4069FF76F178465b2De16F3c7597cC06Ec8191B",
    token_name:"E*" 
  },
  {
    chain: "polygon",
    address: "0xf0f9d895aca5c8678f706fb8216fa22957685a13",
    token_name:"RVLT" 
  },
  {
    chain: "polygon",
    address: "0x55AC81186E1A8454c79aD78C615c43f54F87403B",
    token_name:"uRVLT" 
  }
]
const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const res_eth = await fetch(`https://deep-index.moralis.io/api/v2/${req.query.address}/erc20?chain=eth&token_addresses%5B0%5D=0xf0f9d895aca5c8678f706fb8216fa22957685a13&token_addresses%5B1%5D=0x2d77b594b9bbaed03221f7c63af8c4307432daf1&token_addresses%5B2%5D=0x93eeb426782bd88fcd4b48d7b0368cf061044928&token_addresses%5B3%5D=0x5b985b4f827072febe33091b42729522b557bba1&token_addresses%5B4%5D=0xc6956b78e036b87ba2ab9810bf081eb76eedd17a&token_addresses%5B5%5D=0x27D395e7C5727DeAE1ff7CcFc0D4163307491b9C&token_addresses%5B6%5D=0x832eCd622d8C15716152eE60Ae281956B9219532&token_addresses%5B7%5D=0xdE1C6d3719E42A31aEBe7f6a7DC9B25Faa1C93a4&token_addresses%5B8%5D=0x1F0b80225e5d2e97358963a99bD5e3Ddd50B18B7&token_addresses%5B9%5D=0x97e19e2a5458294842036404e6a05571d8bc2fa3&token_addresses%5B10%5D=0x9835E9345F3dC64C2771aFDBc535806e901341BD&token_addresses%5B11%5D=0xc3e486f614e297d8e016ac2805e81707c627b2d5&token_addresses%5B12%5D=0xc3e486f614e297d8e016ac2805e81707c627b2d5&token_addresses%5B13%5D=0xA4069FF76F178465b2De16F3c7597cC06Ec8191B`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': web3key
    }
  })
  const data_eth = await res_eth.json();

  const res_polygon = await fetch(`https://deep-index.moralis.io/api/v2/${req.query.address}/erc20?chain=polygon&token_addresses%5B0%5D=0xf0f9d895aca5c8678f706fb8216fa22957685a13&token_addresses%5B1%5D=0x55AC81186E1A8454c79aD78C615c43f54F87403B`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': web3key
    }
  })
  const data_polygon = await res_polygon.json();
  const token_bal = [...data_eth, ...data_polygon]
  const tmpBal = [];
  token_list.map((token, index) => {
    const fIndex = token_bal.findIndex((bal) => bal.token_address == token.address);
    if( fIndex === -1) {
      tmpBal.push({
        id:index+1,
        chain: token.chain,
        address: token.address,
        token_name: token.token_name,
        balance: 0 
      })
    } else {
      tmpBal.push({
        id:index+1,
        chain: token.chain,
        address: token.address,
        token_name: token.token_name,
        balance: token_bal[fIndex].balance / Math.pow(10, token_bal[fIndex].decimals)
      })
    }
  })
  res.status(200).json(tmpBal)
}

export default handler
