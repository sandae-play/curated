import { SellerRepository } from '../persistence/seller-repository'
import { Seller } from '../domain/model/seller'
import uuid from 'uuid'

const repo = new SellerRepository()

export async function index(event: any) {
  const sellers = await repo.findAll()

  return {
    statusCode: 200,
    body: JSON.stringify(sellers)
  }
}

export async function create(event: any) {
  const data = JSON.parse(event.body)
  const seller = new Seller(uuid.v4(), data.name)

  await repo.add(seller)
  return {
    statusCode: 200,
    body: JSON.stringify(seller)
  }
}

export async function update(event: any) {
  const { sellerId } = event.pathParameters
  const data = JSON.parse(event.body)
  const seller = new Seller(sellerId, data.name)
  const result = await repo.update(seller)

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}

export async function remove(event: any) {
  const { sellerId } = event.pathParameters
  await repo.delete(sellerId)

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}
